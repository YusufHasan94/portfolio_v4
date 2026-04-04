import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { supabase } from '@/lib/supabase/client';
import { readPortfolioData } from '@/lib/dataManager';

export async function GET() {
    try {
        // Fetch all portfolio data from Supabase
        const [heroRes, skillsRes, servicesRes, projectsRes, careerRes] = await Promise.all([
            supabase.from('hero').select('*').single(),
            supabase.from('skills').select('*').order('category', { ascending: true }),
            supabase.from('services').select('*').order('created_at', { ascending: false }),
            supabase.from('projects').select('*').order('created_at', { ascending: false }),
            supabase.from('career').select('*').order('created_at', { ascending: false }),
        ]);

        // Check for errors
        if (heroRes.error) throw heroRes.error;
        if (skillsRes.error) throw skillsRes.error;
        if (servicesRes.error) throw servicesRes.error;
        if (projectsRes.error) throw projectsRes.error;
        if (careerRes.error) throw careerRes.error;

        // Transform hero data to match frontend expectations
        const heroData = heroRes.data ? {
            title: heroRes.data.title,
            subtitle: heroRes.data.subtitle,
            description: heroRes.data.description,
            currentStatus: heroRes.data.current_status,
        } : null;

        const portfolioData = {
            hero: heroData,
            skills: skillsRes.data || [],
            services: servicesRes.data || [],
            projects: projectsRes.data || [],
            career: careerRes.data || [],
        };

        return NextResponse.json(portfolioData);
    } catch (error) {
        console.error('Error fetching portfolio data from Supabase, falling back to JSON:', error);

        try {
            const fallbackData = await readPortfolioData();
            return NextResponse.json(fallbackData);
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to fetch portfolio data from both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}
