import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';
import { deleteFile } from '@/lib/supabase/storage';

// GET - Fetch all services
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching services:', error);
            return NextResponse.json(
                { error: 'Failed to fetch services' },
                { status: 500 }
            );
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching services:', error);
        return NextResponse.json(
            { error: 'Failed to fetch services' },
            { status: 500 }
        );
    }
}

// POST - Add new service
export async function POST(request: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const serviceData = await request.json();

        const { data, error } = await supabaseAdmin
            .from('services')
            .insert({
                title: serviceData.title,
                description: serviceData.description,
                image: serviceData.image,
            })
            .select()
            .single();

        if (error) {
            console.error('Error adding service:', error);
            return NextResponse.json(
                { error: 'Failed to add service' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error adding service:', error);
        return NextResponse.json(
            { error: 'Failed to add service' },
            { status: 500 }
        );
    }
}

// PUT - Update service
export async function PUT(request: NextRequest) {
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        const serviceData = await request.json();

        if (!serviceData.id) {
            return NextResponse.json(
                { error: 'Service ID is required' },
                { status: 400 }
            );
        }

        // Get old service data to delete old image if changed
        const { data: oldService } = await supabaseAdmin
            .from('services')
            .select('image')
            .eq('id', serviceData.id)
            .single();

        // Update service
        const { data, error } = await supabaseAdmin
            .from('services')
            .update({
                title: serviceData.title,
                description: serviceData.description,
                image: serviceData.image,
            })
            .eq('id', serviceData.id)
            .select()
            .single();

        if (error) {
            console.error('Error updating service:', error);
            return NextResponse.json(
                { error: 'Failed to update service' },
                { status: 500 }
            );
        }

        // Delete old image if it was changed and was from Supabase Storage
        if (oldService && oldService.image !== serviceData.image && oldService.image.includes('supabase')) {
            await deleteFile(oldService.image);
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error updating service:', error);
        return NextResponse.json(
            { error: 'Failed to update service' },
            { status: 500 }
        );
    }
}

// DELETE - Delete service
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
                { error: 'Service ID is required' },
                { status: 400 }
            );
        }

        // Get service data to delete image
        const { data: service } = await supabaseAdmin
            .from('services')
            .select('image')
            .eq('id', id)
            .single();

        // Delete service
        const { error } = await supabaseAdmin
            .from('services')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting service:', error);
            return NextResponse.json(
                { error: 'Failed to delete service' },
                { status: 500 }
            );
        }

        // Delete image from storage if it was from Supabase
        if (service && service.image.includes('supabase')) {
            await deleteFile(service.image);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting service:', error);
        return NextResponse.json(
            { error: 'Failed to delete service' },
            { status: 500 }
        );
    }
}
