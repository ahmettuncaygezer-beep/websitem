import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();
        
        // Fetch last 20 orders with their items
        // Since we can't easily join in a single query sometimes without explicit foreign keys in mock setups,
        // let's fetch orders first, then their items
        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select('id, delivery_address, created_at')
            .order('created_at', { ascending: false })
            .limit(20);

        if (ordersError || !orders || orders.length === 0) {
            return NextResponse.json({ notifications: [] });
        }

        const orderIds = orders.map(o => o.id);

        const { data: items, error: itemsError } = await supabase
            .from('order_items')
            .select('order_id, product_name, product_image, product_id')
            .in('order_id', orderIds);

        if (itemsError || !items) {
            return NextResponse.json({ notifications: [] });
        }

        // Combine the data
        const notifications = [];
        
        for (const order of orders) {
            const orderItems = items.filter(i => i.order_id === order.id);
            if (orderItems.length === 0) continue;
            
            // Just use the first item in the order for the notification
            const item = orderItems[0];
            
            // Parse delivery address to get name and city
            let name = 'Müşterimiz';
            let city = 'Türkiye';
            
            try {
                if (typeof order.delivery_address === 'string') {
                    const parsed = JSON.parse(order.delivery_address);
                    if (parsed.fullName) {
                        const parts = parsed.fullName.split(' ');
                        if (parts.length > 1) {
                            name = `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
                        } else {
                            name = `${parts[0]} M.`;
                        }
                    }
                    if (parsed.city) city = parsed.city;
                } else if (order.delivery_address && typeof order.delivery_address === 'object') {
                    const addr: any = order.delivery_address;
                    if (addr.fullName) {
                        const parts = addr.fullName.split(' ');
                        if (parts.length > 1) {
                            name = `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
                        } else {
                            name = `${parts[0]} M.`;
                        }
                    }
                    if (addr.city) city = addr.city;
                }
            } catch (e) {
                // Ignore parse errors, fallback to defaults
            }
            
            // Create a pseudo-slug or default URL for the product
            // Ideally we'd join with the products table to get the true slug, 
            // but for now, we'll construct a likely search URL or use the product id
            const productHref = `/arama?q=${encodeURIComponent(item.product_name)}`;
            
            notifications.push({
                id: order.id,
                name,
                city,
                productName: item.product_name,
                productImage: item.product_image || '/images/products/luna-sofa.jpg',
                productHref,
                emoji: '✨',
                createdAt: order.created_at
            });
        }
        
        return NextResponse.json({ notifications });
        
    } catch (err) {
        console.error('[RecentPurchases] API Error:', err);
        return NextResponse.json({ notifications: [] }, { status: 500 });
    }
}
