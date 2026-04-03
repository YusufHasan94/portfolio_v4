import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { supabaseAdmin } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';
import { readPortfolioData, updateCareer } from '@/lib/dataManager';
import { CareerMilestone } from '@/types/portfolio';

// GET - Fetch all career milestones
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('career')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching career data from Supabase, falling back to JSON:', error);

        try {
            const fallbackData = await readPortfolioData();
            return NextResponse.json(fallbackData.career || []);
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to fetch career data from both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// POST - Add new career milestone
export async function POST(request: NextRequest) {
    let careerData: any;
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        careerData = await request.json();

        const { data, error } = await supabaseAdmin
            .from('career')
            .insert({
                company: careerData.company,
                company_url: careerData.company_url,
                title: careerData.title,
                description: careerData.description,
                starting: careerData.starting,
                ending: careerData.ending,
            })
            .select()
            .single();

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            portfolioData.career.push(data);
            await updateCareer(portfolioData.career);
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        return NextResponse.json({ success: true, data, source: 'supabase' });
    } catch (error) {
        console.error('Error adding career milestone to Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const newCareer: CareerMilestone = {
                id: crypto.randomUUID(),
                company: careerData.company,
                company_url: careerData.company_url,
                title: careerData.title,
                description: careerData.description,
                starting: careerData.starting,
                ending: careerData.ending,
            };

            data.career.push(newCareer);
            await updateCareer(data.career);

            return NextResponse.json({ success: true, data: newCareer, source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to add career milestone to both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// PUT - Update career milestone
export async function PUT(request: NextRequest) {
    let careerData: any;
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        careerData = await request.json();

        if (!careerData.id) {
            return NextResponse.json(
                { error: 'Career ID is required' },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin
            .from('career')
            .update({
                company: careerData.company,
                company_url: careerData.company_url,
                title: careerData.title,
                description: careerData.description,
                starting: careerData.starting,
                ending: careerData.ending,
            })
            .eq('id', careerData.id)
            .select()
            .single();

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            const index = portfolioData.career.findIndex((c: CareerMilestone) => c.id === data.id);
            if (index !== -1) {
                portfolioData.career[index] = data;
                await updateCareer(portfolioData.career);
            }
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        return NextResponse.json({ success: true, data, source: 'supabase' });
    } catch (error) {
        console.error('Error updating career milestone in Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const index = data.career.findIndex((c: CareerMilestone) => c.id === careerData.id);

            if (index === -1) {
                return NextResponse.json({ error: 'Career milestone not found in fallback data' }, { status: 404 });
            }

            data.career[index] = {
                ...data.career[index],
                company: careerData.company,
                company_url: careerData.company_url,
                title: careerData.title,
                description: careerData.description,
                starting: careerData.starting,
                ending: careerData.ending,
            };

            await updateCareer(data.career);
            return NextResponse.json({ success: true, data: data.career[index], source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to update career milestone in both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// DELETE - Delete career milestone
export async function DELETE(request: NextRequest) {
    let id: string | null = null;
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const { searchParams } = new URL(request.url);
        id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Career ID is required' },
                { status: 400 }
            );
        }

        const { error } = await supabaseAdmin
            .from('career')
            .delete()
            .eq('id', id);

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            portfolioData.career = portfolioData.career.filter((c: CareerMilestone) => c.id !== id);
            await updateCareer(portfolioData.career);
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        return NextResponse.json({ success: true, source: 'supabase' });
    } catch (error) {
        console.error('Error deleting career milestone from Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const initialLength = data.career.length;
            data.career = data.career.filter((c: CareerMilestone) => c.id !== id);

            if (data.career.length === initialLength) {
                return NextResponse.json({ error: 'Career milestone not found in fallback data' }, { status: 404 });
            }

            await updateCareer(data.career);
            return NextResponse.json({ success: true, source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to delete career milestone from both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}
