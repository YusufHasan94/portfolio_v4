import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { supabaseAdmin } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';
import { readPortfolioData, updateSkills } from '@/lib/dataManager';
import { Skill } from '@/types/portfolio';

// GET - Fetch all skills
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('category', { ascending: true })
            .order('name', { ascending: true });

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching skills from Supabase, falling back to JSON:', error);

        try {
            const fallbackData = await readPortfolioData();
            return NextResponse.json(fallbackData.skills || []);
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to fetch skills from both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// POST - Add new skill
export async function POST(request: NextRequest) {
    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) {
        return unauthorizedResponse();
    }

    let skillData: Skill;
    try {
        skillData = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('skills')
            .insert({
                name: skillData.name,
                image: skillData.image,
                category: skillData.category,
            })
            .select()
            .single();

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            portfolioData.skills.push(data);
            await updateSkills(portfolioData.skills);
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        return NextResponse.json({ success: true, data, source: 'supabase' });
    } catch (error) {
        console.error('Error adding skill to Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const newSkill: Skill = {
                id: crypto.randomUUID(),
                name: skillData.name || '',
                image: skillData.image || '',
                category: skillData.category || 1,
            };

            data.skills.push(newSkill);
            await updateSkills(data.skills);

            return NextResponse.json({ success: true, data: newSkill, source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to add skill to both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// PUT - Update skill
export async function PUT(request: NextRequest) {
    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) {
        return unauthorizedResponse();
    }

    let skillData: Skill;
    try {
        skillData = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (!skillData.id) {
        return NextResponse.json(
            { error: 'Skill ID is required' },
            { status: 400 }
        );
    }

    try {
        const { data, error } = await supabaseAdmin
            .from('skills')
            .update({
                name: skillData.name,
                image: skillData.image,
                category: skillData.category,
            })
            .eq('id', skillData.id)
            .select()
            .single();

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            const index = portfolioData.skills.findIndex((s: Skill) => s.id === data.id);
            if (index !== -1) {
                portfolioData.skills[index] = data;
                await updateSkills(portfolioData.skills);
            }
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        return NextResponse.json({ success: true, data, source: 'supabase' });
    } catch (error) {
        console.error('Error updating skill in Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const index = data.skills.findIndex((s: Skill) => s.id === skillData.id);

            if (index === -1) {
                return NextResponse.json({ error: 'Skill not found in fallback data' }, { status: 404 });
            }

            data.skills[index] = {
                ...data.skills[index],
                name: skillData.name || data.skills[index].name,
                image: skillData.image || data.skills[index].image,
                category: skillData.category || data.skills[index].category,
            };

            await updateSkills(data.skills);
            return NextResponse.json({ success: true, data: data.skills[index], source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to update skill in both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// DELETE - Delete skill
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
                { error: 'Skill ID is required' },
                { status: 400 }
            );
        }

        const { error } = await supabaseAdmin
            .from('skills')
            .delete()
            .eq('id', id);

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            portfolioData.skills = portfolioData.skills.filter((s: Skill) => s.id !== id);
            await updateSkills(portfolioData.skills);
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        return NextResponse.json({ success: true, source: 'supabase' });
    } catch (error) {
        console.error('Error deleting skill from Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const initialLength = data.skills.length;
            data.skills = data.skills.filter((s: Skill) => s.id !== id);

            if (data.skills.length === initialLength) {
                return NextResponse.json({ error: 'Skill not found in fallback data' }, { status: 404 });
            }

            await updateSkills(data.skills);
            return NextResponse.json({ success: true, source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to delete skill from both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}
