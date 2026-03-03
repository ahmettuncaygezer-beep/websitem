import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/**
 * POST /api/orders
 * Creates a new order in the database.
 * Body: { items, deliveryAddress, paymentMethod, totalAmount, shippingCost }
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items, deliveryAddress, paymentMethod, totalAmount, shippingCost = 0 } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Sepet boş.' }, { status: 400 });
        }

        const supabase = await createSupabaseServerClient();

        // Check if user is authenticated (optional — guest checkout allowed)
        const { data: { user } } = await supabase.auth.getUser();

        // Generate order number
        const orderNumber = `SLS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

        // Insert order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: user?.id ?? null,
                order_number: orderNumber,
                status: 'Hazırlanıyor',
                total_amount: totalAmount + shippingCost,
                delivery_address: deliveryAddress ?? null,
                payment_method: paymentMethod ?? 'card',
                shipping_cost: shippingCost,
            })
            .select('id, order_number, status, total_amount, created_at')
            .single();

        if (orderError) {
            console.error('[Orders] Insert error:', orderError);
            // Fallback: return a mock order for development
            return NextResponse.json({
                id: `mock-${Date.now()}`,
                orderNumber,
                status: 'Hazırlanıyor',
                totalAmount: totalAmount + shippingCost,
                createdAt: new Date().toISOString(),
                mock: true,
            });
        }

        // Insert order items
        if (order) {
            const orderItems = items.map((item: any) => ({
                order_id: order.id,
                product_id: item.id,
                product_name: item.name,
                product_image: item.image,
                quantity: item.quantity,
                unit_price: item.price,
                selected_color: item.selectedColor ?? null,
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) {
                console.error('[Orders] Items insert error:', itemsError);
            }
        }

        // Trigger order confirmation email (fire-and-forget)
        if (user?.email || deliveryAddress?.email) {
            const emailTarget = user?.email || deliveryAddress?.email;
            fetch(`${req.headers.get('origin')}/api/notify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'order_confirmation',
                    to: emailTarget,
                    data: {
                        orderNumber,
                        totalAmount: totalAmount + shippingCost,
                        items,
                    },
                }),
            }).catch(() => { /* fire-and-forget */ });
        }

        return NextResponse.json({
            id: order.id,
            orderNumber: order.order_number,
            status: order.status,
            totalAmount: order.total_amount,
            createdAt: order.created_at,
        });
    } catch (err: any) {
        console.error('[Orders] Error:', err);
        return NextResponse.json({ error: 'Sipariş oluşturulamadı.' }, { status: 500 });
    }
}

/**
 * GET /api/orders?orderNumber=SLS-xxx
 * Retrieves an order by its number (for tracking page).
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const orderNumber = searchParams.get('orderNumber');

        if (!orderNumber) {
            return NextResponse.json({ error: 'Sipariş numarası gerekli.' }, { status: 400 });
        }

        const supabase = await createSupabaseServerClient();

        const { data: order, error } = await supabase
            .from('orders')
            .select('id, order_number, status, total_amount, shipping_cost, created_at, updated_at')
            .eq('order_number', orderNumber)
            .single();

        if (error || !order) {
            return NextResponse.json({ error: 'Sipariş bulunamadı.' }, { status: 404 });
        }

        // Get order items
        const { data: items } = await supabase
            .from('order_items')
            .select('*')
            .eq('order_id', order.id);

        return NextResponse.json({
            ...order,
            items: items ?? [],
        });
    } catch (err: any) {
        console.error('[Orders] GET Error:', err);
        return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
    }
}
