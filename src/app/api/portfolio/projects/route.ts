import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { supabaseAdmin } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';
import { readPortfolioData, updateProjects } from '@/lib/dataManager';
import { Project } from '@/types/portfolio';
import { deleteFile } from '@/lib/supabase/storage';

// GET - Fetch all projects
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching projects from Supabase, falling back to JSON:', error);

        try {
            const fallbackData = await readPortfolioData();
            return NextResponse.json(fallbackData.projects || []);
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to fetch projects from both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// POST - Add new project
export async function POST(request: NextRequest) {
    let projectData: any;
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        projectData = await request.json();

        const { data, error } = await supabaseAdmin
            .from('projects')
            .insert({
                name: projectData.name,
                description: projectData.description,
                image: projectData.image,
                preview_url: projectData.preview_url,
                type: projectData.type,
                tech_stack: projectData.tech_stack,
            })
            .select()
            .single();

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            portfolioData.projects.push(data);
            await updateProjects(portfolioData.projects);
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        return NextResponse.json({ success: true, data, source: 'supabase' });
    } catch (error) {
        console.error('Error adding project to Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const newProject: Project = {
                id: crypto.randomUUID(),
                name: projectData.name,
                description: projectData.description,
                image: projectData.image,
                preview_url: projectData.preview_url,
                type: projectData.type,
                tech_stack: projectData.tech_stack,
            };

            data.projects.push(newProject);
            await updateProjects(data.projects);

            return NextResponse.json({ success: true, data: newProject, source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to add project to both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
    let projectData: any;
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        projectData = await request.json();

        if (!projectData.id) {
            return NextResponse.json(
                { error: 'Project ID is required' },
                { status: 400 }
            );
        }

        // Get old project data to delete old image if changed
        const { data: oldProject } = await supabaseAdmin
            .from('projects')
            .select('image')
            .eq('id', projectData.id)
            .single();

        // Update project
        const { data, error } = await supabaseAdmin
            .from('projects')
            .update({
                name: projectData.name,
                description: projectData.description,
                image: projectData.image,
                preview_url: projectData.preview_url,
                type: projectData.type,
                tech_stack: projectData.tech_stack || [],
            })
            .eq('id', projectData.id)
            .select()
            .single();

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            const index = portfolioData.projects.findIndex((p: Project) => p.id === data.id);
            if (index !== -1) {
                portfolioData.projects[index] = data;
                await updateProjects(portfolioData.projects);
            }
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        // Delete old image if it was changed and was from Supabase Storage
        if (oldProject && oldProject.image !== projectData.image && oldProject.image.includes('supabase')) {
            await deleteFile(oldProject.image);
        }

        return NextResponse.json({ success: true, data, source: 'supabase' });
    } catch (error) {
        console.error('Error updating project in Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const index = data.projects.findIndex((p: Project) => p.id === projectData.id);

            if (index === -1) {
                return NextResponse.json({ error: 'Project not found in fallback data' }, { status: 404 });
            }

            data.projects[index] = { ...data.projects[index], ...projectData };
            await updateProjects(data.projects);

            return NextResponse.json({ success: true, data: data.projects[index], source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to update project in both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// DELETE - Delete project
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
                { error: 'Project ID is required' },
                { status: 400 }
            );
        }

        // Try to find project to get image path for deletion
        const { data: project } = await supabase
            .from('projects')
            .select('image')
            .eq('id', id)
            .single();

        const { error } = await supabaseAdmin
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            portfolioData.projects = portfolioData.projects.filter((p: Project) => p.id !== id);
            await updateProjects(portfolioData.projects);
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        // Delete image from storage if it exists
        if (project?.image) {
            await deleteFile(project.image);
        }

        return NextResponse.json({ success: true, source: 'supabase' });
    } catch (error) {
        console.error('Error deleting project from Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const initialLength = data.projects.length;
            data.projects = data.projects.filter((p: Project) => p.id !== id);

            if (data.projects.length === initialLength) {
                return NextResponse.json({ error: 'Project not found in fallback data' }, { status: 404 });
            }

            await updateProjects(data.projects);
            return NextResponse.json({ success: true, source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to delete project from both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}
