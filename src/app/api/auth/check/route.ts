import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
    try {
        const isAuthenticated = await verifyAuth();
        return NextResponse.json({ authenticated: isAuthenticated });
    } catch (error) {
        console.error('Check auth error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
