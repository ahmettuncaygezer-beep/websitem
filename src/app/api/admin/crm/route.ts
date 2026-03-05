import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

export async function GET() {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        // Join users and customer_profiles tables
        const { data, error } = await supabase
            .from('users')
            .select(`
                id,
                email,
                first_name,
                last_name,
                created_at,
                customer_profiles (
                    style_preference,
                    tone_preference,
                    total_spent,
                    order_count,
                    last_order_date,
                    is_vip,
                    assigned_designer,
                    ai_insights
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform data
        const formattedData = data.map((user: any) => {
            const profile = user.customer_profiles || {};
            // Default name handling
            const name = (user.first_name || user.last_name)
                ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                : 'İsimsiz Kullanıcı';

            return {
                id: user.id,
                name,
                email: user.email,
                style: profile.style_preference || 'Belirtilmedi',
                tone: profile.tone_preference || 'Belirtilmedi',
                spent: profile.total_spent || 0,
                orders: profile.order_count || 0,
                lastOrder: profile.last_order_date,
                avatar: name.charAt(0).toUpperCase(),
                is_vip: profile.is_vip || false,
                assigned_designer: profile.assigned_designer,
                ai_insights: profile.ai_insights
            };
        });

        return NextResponse.json(formattedData);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
