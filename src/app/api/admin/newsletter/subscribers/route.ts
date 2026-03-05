import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();

        // 1. Fetch total stats
        const { count: totalCount } = await supabase
            .from('newsletter_subscribers')
            .select('*', { count: 'exact', head: true });

        const { count: activeCount } = await supabase
            .from('newsletter_subscribers')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'active');

        // New this month (simple approximation)
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const { count: newThisMonth } = await supabase
            .from('newsletter_subscribers')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', startOfMonth.toISOString());

        // 2. Fetch list of subscribers
        const { data: subscribers, error } = await supabase
            .from('newsletter_subscribers')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100);

        if (error) throw error;

        return NextResponse.json({
            stats: {
                total: totalCount || 0,
                active: activeCount || 0,
                newThisMonth: newThisMonth || 0,
                growth: 12.4 // Placeholder for trend
            },
            subscribers: subscribers || []
        });
    } catch (err: any) {
        console.error('[Subscribers API] Error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
