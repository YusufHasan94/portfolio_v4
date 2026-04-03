import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { supabaseAdmin } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';
import { readPortfolioData, updateHeroData } from '@/lib/dataManager';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('hero')
            .select('*')
            .single();

        if (error) throw error;

        // Transform database fields to match frontend expectations
        const heroData = {
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            currentStatus: data.current_status,
        };

        return NextResponse.json(heroData);
    } catch (error) {
        console.error('Error fetching hero data from Supabase, falling back to JSON:', error);

        try {
            const fallbackData = await readPortfolioData();
            return NextResponse.json(fallbackData.hero || null);
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to fetch hero data from both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

export async function PUT(request: NextRequest) {
    let heroData: any;
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        heroData = await request.json();

        // Update database
        const { error } = await supabaseAdmin
            .from('hero')
            .update({
                title: heroData.title,
                subtitle: heroData.subtitle,
                description: heroData.description,
                current_status: heroData.currentStatus,
            })
            .eq('id', heroData.id);

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            await updateHeroData({
                title: heroData.title,
                subtitle: heroData.subtitle,
                description: heroData.description,
                currentStatus: heroData.currentStatus,
            });
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        return NextResponse.json({ success: true, source: 'supabase' });
    } catch (error) {
        console.error('Error updating hero data in Supabase, falling back to JSON:', error);

        try {
            await updateHeroData({
                title: heroData.title,
                subtitle: heroData.subtitle,
                description: heroData.description,
                currentStatus: heroData.currentStatus,
            });

            return NextResponse.json({ success: true, source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to update hero data in both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}
