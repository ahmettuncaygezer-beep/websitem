import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';

// GET: All press items (for admin)
export async function GET(req: Request) {
    try {
        const authResult = await requireAdminAuth(req);
        if (authResult instanceof NextResponse) return authResult;

        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase
            .from('press_items')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (err) {
        console.error('Press API GET error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST: Create new press item
export async function POST(req: Request) {
    try {
        const authResult = await requireAdminAuth(req);
        if (authResult instanceof NextResponse) return authResult;

        const body = await req.json();
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from('press_items')
            .insert([{
                name: body.name,
                article_title: body.article_title,
                article_url: body.article_url,
                logo_url: body.logo_url,
                is_active: body.is_active ?? false,
                sort_order: body.sort_order ?? 0
            }])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data);
    } catch (err) {
        console.error('Press API POST error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PUT: Update press item
export async function PUT(req: Request) {
    try {
        const authResult = await requireAdminAuth(req);
        if (authResult instanceof NextResponse) return authResult;

        const body = await req.json();
        const { id, ...updateData } = body;

        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase
            .from('press_items')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data);
    } catch (err) {
        console.error('Press API PUT error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE: Remove press item
export async function DELETE(req: Request) {
    try {
        const authResult = await requireAdminAuth(req);
        if (authResult instanceof NextResponse) return authResult;

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        const supabase = await createSupabaseServerClient();
        const { error } = await supabase
            .from('press_items')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Press API DELETE error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

