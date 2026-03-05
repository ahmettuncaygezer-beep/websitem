import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function GET(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const { data, error } = await supabase
            .from('lookbook_collections')
            .select('*')
            .order('order_index', { ascending: true });

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (err: any) {
        console.error('Error fetching lookbook collections:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const body = await req.json();
        const { name, season, cover_image, is_active } = body;

        const { data, error } = await supabase
            .from('lookbook_collections')
            .insert([{
                name,
                season,
                cover_image: cover_image || '',
                is_active: is_active ?? true,
                order_index: 0 // Default to top
            }])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (err: any) {
        console.error('Error creating lookbook collection:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
