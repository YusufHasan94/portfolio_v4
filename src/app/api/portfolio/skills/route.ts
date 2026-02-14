import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';

// GET - Fetch all skills
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('category', { ascending: true })
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching skills:', error);
            return NextResponse.json(
                { error: 'Failed to fetch skills' },
                { status: 500 }
            );
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching skills:', error);
        return NextResponse.json(
            { error: 'Failed to fetch skills' },
            { status: 500 }
        );
    }
}

// POST - Add new skill
export async function POST(request: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const skillData = await request.json();

        const { data, error } = await supabaseAdmin
            .from('skills')
            .insert({
                name: skillData.name,
                image: skillData.image,
                category: skillData.category,
            })
            .select()
            .single();

        if (error) {
            console.error('Error adding skill:', error);
            return NextResponse.json(
                { error: 'Failed to add skill' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error adding skill:', error);
        return NextResponse.json(
            { error: 'Failed to add skill' },
            { status: 500 }
        );
    }
}

// PUT - Update skill
export async function PUT(request: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const skillData = await request.json();

        if (!skillData.id) {
            return NextResponse.json(
                { error: 'Skill ID is required' },
                { status: 400 }
            );
        }

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

        if (error) {
            console.error('Error updating skill:', error);
            return NextResponse.json(
                { error: 'Failed to update skill' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error updating skill:', error);
        return NextResponse.json(
            { error: 'Failed to update skill' },
            { status: 500 }
        );
    }
}

// DELETE - Delete skill
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
                { error: 'Skill ID is required' },
                { status: 400 }
            );
        }

        const { error } = await supabaseAdmin
            .from('skills')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting skill:', error);
            return NextResponse.json(
                { error: 'Failed to delete skill' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting skill:', error);
        return NextResponse.json(
            { error: 'Failed to delete skill' },
            { status: 500 }
        );
    }
}
