import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/test-notification
 * Inserts a test order to trigger Supabase Realtime notification.
 * For development/testing only.
 */
export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();

        const orderNumber = `TEST-${Date.now().toString(36).toUpperCase()}`;
        const testAmount = Math.floor(Math.random() * 50000) + 5000;

        const { data: order, error } = await supabase
            .from('orders')
            .insert({
                order_number: orderNumber,
                status: 'Hazırlanıyor',
                total_amount: testAmount,
                payment_method: 'card',
                shipping_cost: 0,
            })
            .select('id, order_number, total_amount, created_at')
            .single();

        if (error) {
            console.error('[Test Notification] Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Test siparişi oluşturuldu! Admin panelde bildirim gözükmelidir.',
            order
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
