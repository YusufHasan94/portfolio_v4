import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('hero')
            .select('*')
            .single();

        if (error) {
            console.error('Error fetching hero data:', error);
            return NextResponse.json(
                { error: 'Failed to fetch hero data' },
                { status: 500 }
            );
        }

        // Transform database fields to match frontend expectations
        const heroData = {
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            currentStatus: data.current_status,
        };

        return NextResponse.json(heroData);
    } catch (error) {
        console.error('Error fetching hero data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hero data' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const heroData = await request.json();

        // Get the existing hero record ID
        const { data: existingHero } = await supabaseAdmin
            .from('hero')
            .select('id')
            .single();

        if (!existingHero) {
            return NextResponse.json(
                { error: 'Hero record not found' },
                { status: 404 }
            );
        }

        // Update hero data
        const { data, error } = await supabaseAdmin
            .from('hero')
            .update({
                title: heroData.title,
                subtitle: heroData.subtitle,
                description: heroData.description,
                current_status: heroData.currentStatus,
            })
            .eq('id', existingHero.id)
            .select()
            .single();

        if (error) {
            console.error('Error updating hero data:', error);
            return NextResponse.json(
                { error: 'Failed to update hero data' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data: heroData });
    } catch (error) {
        console.error('Error updating hero data:', error);
        return NextResponse.json(
            { error: 'Failed to update hero data' },
            { status: 500 }
        );
    }
}
