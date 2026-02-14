import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';
import { deleteFile } from '@/lib/supabase/storage';

// GET - Fetch all projects
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
            return NextResponse.json(
                { error: 'Failed to fetch projects' },
                { status: 500 }
            );
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

// POST - Add new project
export async function POST(request: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const projectData = await request.json();

        const { data, error } = await supabaseAdmin
            .from('projects')
            .insert({
                name: projectData.name,
                description: projectData.description,
                image: projectData.image,
                preview_url: projectData.preview_url,
                type: projectData.type,
                tech_stack: projectData.tech_stack || [],
            })
            .select()
            .single();

        if (error) {
            console.error('Error adding project:', error);
            return NextResponse.json(
                { error: 'Failed to add project' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error adding project:', error);
        return NextResponse.json(
            { error: 'Failed to add project' },
            { status: 500 }
        );
    }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const projectData = await request.json();

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

        if (error) {
            console.error('Error updating project:', error);
            return NextResponse.json(
                { error: 'Failed to update project' },
                { status: 500 }
            );
        }

        // Delete old image if it was changed and was from Supabase Storage
        if (oldProject && oldProject.image !== projectData.image && oldProject.image.includes('supabase')) {
            await deleteFile(oldProject.image);
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        );
    }
}

// DELETE - Delete project
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
                { error: 'Project ID is required' },
                { status: 400 }
            );
        }

        // Get project data to delete image
        const { data: project } = await supabaseAdmin
            .from('projects')
            .select('image')
            .eq('id', id)
            .single();

        // Delete project
        const { error } = await supabaseAdmin
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting project:', error);
            return NextResponse.json(
                { error: 'Failed to delete project' },
                { status: 500 }
            );
        }

        // Delete image from storage if it was from Supabase
        if (project && project.image.includes('supabase')) {
            await deleteFile(project.image);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}
