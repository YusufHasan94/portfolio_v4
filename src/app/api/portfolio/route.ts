import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

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
        console.error('Error fetching portfolio data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch portfolio data' },
            { status: 500 }
        );
    }
}
