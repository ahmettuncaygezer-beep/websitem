import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/** GET /api/admin/newsletter — List subscribers */
export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();

        const { data, error, count } = await supabase
            .from('newsletter_subscribers')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .limit(500);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ subscribers: data || [], total: count || 0 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
