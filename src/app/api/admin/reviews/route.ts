import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/** GET /api/admin/reviews — List reviews */
export async function GET(req: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status') || '';

        let query = supabase.from('reviews').select('*', { count: 'exact' });
        if (status === 'pending') query = query.eq('is_approved', false);
        if (status === 'approved') query = query.eq('is_approved', true);
        query = query.order('created_at', { ascending: false }).limit(100);

        const { data, error, count } = await query;
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ reviews: data || [], total: count || 0 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** PUT /api/admin/reviews — Approve/reject review */
export async function PUT(req: Request) {
    try {
        const { id, is_approved } = await req.json();
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase.from('reviews').update({ is_approved }).eq('id', id).select().single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ review: data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** DELETE /api/admin/reviews — Delete review */
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        const supabase = await createSupabaseServerClient();

        const { error } = await supabase.from('reviews').delete().eq('id', id);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
