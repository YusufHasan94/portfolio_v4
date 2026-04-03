import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { supabaseAdmin } from '@/lib/supabase/server';
import { supabase } from '@/lib/supabase/client';
import { verifyAuth, unauthorizedResponse } from '@/lib/auth';
import { readPortfolioData, updateServices } from '@/lib/dataManager';
import { Service } from '@/types/portfolio';
import { deleteFile } from '@/lib/supabase/storage';

// GET - Fetch all services
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching services from Supabase, falling back to JSON:', error);

        try {
            const fallbackData = await readPortfolioData();
            return NextResponse.json(fallbackData.services || []);
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to fetch services from both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// POST - Add new service
export async function POST(request: NextRequest) {
    let serviceData: any;
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        serviceData = await request.json();

        const { data, error } = await supabaseAdmin
            .from('services')
            .insert({
                title: serviceData.title,
                description: serviceData.description,
                image: serviceData.image,
            })
            .select()
            .single();

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            portfolioData.services.push(data);
            await updateServices(portfolioData.services);
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        return NextResponse.json({ success: true, data, source: 'supabase' });
    } catch (error) {
        console.error('Error adding service to Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const newService: Service = {
                id: crypto.randomUUID(),
                title: serviceData.title,
                description: serviceData.description,
                image: serviceData.image,
            };

            data.services.push(newService);
            await updateServices(data.services);

            return NextResponse.json({ success: true, data: newService, source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to add service to both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// PUT - Update service
export async function PUT(request: NextRequest) {
    let serviceData: any;
    try {
        const isAuthenticated = await verifyAuth();
        if (!isAuthenticated) {
            return unauthorizedResponse();
        }

        serviceData = await request.json();

        if (!serviceData.id) {
            return NextResponse.json(
                { error: 'Service ID is required' },
                { status: 400 }
            );
        }

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

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            const index = portfolioData.services.findIndex((s: Service) => s.id === data.id);
            if (index !== -1) {
                portfolioData.services[index] = data;
                await updateServices(portfolioData.services);
            }
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        return NextResponse.json({ success: true, data, source: 'supabase' });
    } catch (error) {
        console.error('Error updating service in Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const index = data.services.findIndex((s: Service) => s.id === serviceData.id);

            if (index === -1) {
                return NextResponse.json({ error: 'Service not found in fallback data' }, { status: 404 });
            }

            data.services[index] = {
                ...data.services[index],
                title: serviceData.title,
                description: serviceData.description,
                image: serviceData.image,
            };

            await updateServices(data.services);
            return NextResponse.json({ success: true, data: data.services[index], source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to update service in both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}

// DELETE - Delete service
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
                { error: 'Service ID is required' },
                { status: 400 }
            );
        }

        // Try to find service to get image path for deletion
        const { data: service } = await supabase
            .from('services')
            .select('image')
            .eq('id', id)
            .single();

        const { error } = await supabaseAdmin
            .from('services')
            .delete()
            .eq('id', id);

        if (error) throw error;

        // Dual-Sync: Update JSON backup as well
        try {
            const portfolioData = await readPortfolioData();
            portfolioData.services = portfolioData.services.filter((s: Service) => s.id !== id);
            await updateServices(portfolioData.services);
        } catch (jsonError) {
            console.error('Error updating JSON backup (Supabase succeeded):', jsonError);
        }

        // Delete image from storage if it exists
        if (service?.image) {
            await deleteFile(service.image);
        }

        return NextResponse.json({ success: true, source: 'supabase' });
    } catch (error) {
        console.error('Error deleting service from Supabase, falling back to JSON:', error);

        try {
            const data = await readPortfolioData();
            const initialLength = data.services.length;
            data.services = data.services.filter((s: Service) => s.id !== id);

            if (data.services.length === initialLength) {
                return NextResponse.json({ error: 'Service not found in fallback data' }, { status: 404 });
            }

            await updateServices(data.services);
            return NextResponse.json({ success: true, source: 'fallback' });
        } catch (fallbackError) {
            console.error('Fallback to JSON also failed:', fallbackError);
            return NextResponse.json(
                { error: 'Failed to delete service from both Supabase and fallback' },
                { status: 500 }
            );
        }
    }
}
