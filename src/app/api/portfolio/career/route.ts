import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';

// GET - Fetch all career milestones
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('career')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching career data:', error);
            return NextResponse.json(
                { error: 'Failed to fetch career data' },
                { status: 500 }
            );
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching career data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch career data' },
            { status: 500 }
        );
    }
}

// POST - Add new career milestone
export async function POST(request: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const careerData = await request.json();

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

        if (error) {
            console.error('Error adding career milestone:', error);
            return NextResponse.json(
                { error: 'Failed to add career milestone' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error adding career milestone:', error);
        return NextResponse.json(
            { error: 'Failed to add career milestone' },
            { status: 500 }
        );
    }
}

// PUT - Update career milestone
export async function PUT(request: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const careerData = await request.json();

        if (!careerData.id) {
            return NextResponse.json(
                { error: 'Career milestone ID is required' },
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

        if (error) {
            console.error('Error updating career milestone:', error);
            return NextResponse.json(
                { error: 'Failed to update career milestone' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error updating career milestone:', error);
        return NextResponse.json(
            { error: 'Failed to update career milestone' },
            { status: 500 }
        );
    }
}

// DELETE - Delete career milestone
export async function DELETE(request: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Career milestone ID is required' },
                { status: 400 }
            );
        }

        const { error } = await supabaseAdmin
            .from('career')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting career milestone:', error);
            return NextResponse.json(
                { error: 'Failed to delete career milestone' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting career milestone:', error);
        return NextResponse.json(
            { error: 'Failed to delete career milestone' },
            { status: 500 }
        );
    }
}
