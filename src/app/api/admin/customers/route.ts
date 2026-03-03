import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/** GET /api/admin/customers — List customers from profiles */
export async function GET(req: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';

        let query = supabase.from('profiles').select('*', { count: 'exact' });
        if (search) query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%`);
        query = query.order('created_at', { ascending: false }).limit(100);

        const { data, error, count } = await query;
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ customers: data || [], total: count || 0 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
