import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const supabase = await createSupabaseServerClient();

        let query = supabase.from('concierge_requests').select('*', { count: 'exact' });

        if (status && status !== 'all') {
            query = query.eq('status', status);
        }

        const { data, count, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;

        // Let's also fetch counts for KPI if requested or just generally
        const { data: allCountsData } = await supabase
            .from('concierge_requests')
            .select('status');

        const counts = {
            total: allCountsData?.length || 0,
            bekliyor: allCountsData?.filter((r: any) => r.status === 'bekliyor').length || 0,
            inceleniyor: allCountsData?.filter((r: any) => r.status === 'inceleniyor').length || 0,
            tamamlandi: allCountsData?.filter((r: any) => r.status === 'tamamlandi').length || 0,
            iptal: allCountsData?.filter((r: any) => r.status === 'iptal').length || 0,
        };

        return NextResponse.json({ data, counts, total: count });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
