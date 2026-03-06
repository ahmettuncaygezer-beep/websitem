import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/** GET /api/admin/customers — List customers from profiles */
export async function GET(req: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const format = searchParams.get('format') || 'json';

        let query = supabase.from('profiles').select('*', { count: 'exact' });
        if (search) query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%`);

        if (format === 'csv') {
            const { data, error } = await query.order('created_at', { ascending: false });
            if (error) throw error;

            const csvHeader = 'Ad,Soyad,Email,Telefon,Şehir,Puan,Harcama\n';
            const csvBody = (data || []).map((c: any) => {
                return `"${c.first_name || ''}","${c.last_name || ''}","${c.email || ''}","${c.phone || ''}","${c.city || ''}","${c.points || 0}","${c.total_spent || 0}"`;
            }).join('\n');

            return new NextResponse(csvHeader + csvBody, {
                headers: {
                    'Content-Type': 'text/csv; charset=utf-8',
                    'Content-Disposition': `attachment; filename="customers_${new Date().toISOString().slice(0, 10)}.csv"`,
                },
            });
        }

        query = query.order('created_at', { ascending: false }).limit(100);

        const { data, error, count } = await query;
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ customers: data || [], total: count || 0 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
