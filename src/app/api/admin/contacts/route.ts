import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/** GET /api/admin/contacts — List contact messages */
export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();

        const { data, error, count } = await supabase
            .from('contact_messages')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ messages: data || [], total: count || 0 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** PUT /api/admin/contacts — Mark as read */
export async function PUT(req: Request) {
    try {
        const { id } = await req.json();
        const supabase = await createSupabaseServerClient();

        const { error } = await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
