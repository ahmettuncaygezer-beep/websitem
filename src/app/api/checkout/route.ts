import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    apiVersion: '2025-01-27' as any,
});

export async function POST(req: Request) {
    try {
        const { items, currency = 'try', language = 'tr', couponCode } = await req.json();

        let discountAmount = 0;
        let campaignId: string | null = null;

        // Validate coupon if provided
        if (couponCode) {
            try {
                const supabase = await createSupabaseServerClient();
                const { data: campaign } = await supabase
                    .from('campaigns')
                    .select('*')
                    .eq('coupon_code', couponCode.toUpperCase().trim())
                    .single();

                if (campaign && campaign.status === 'Aktif') {
                    const now = new Date();
                    const inDateRange = (!campaign.start_date || new Date(campaign.start_date) <= now) &&
                        (!campaign.end_date || new Date(campaign.end_date) >= now);
                    const withinLimit = !campaign.usage_limit || campaign.usage_count < campaign.usage_limit;

                    if (inDateRange && withinLimit) {
                        const cartTotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
                        const meetsMinimum = !campaign.min_order_amount || cartTotal >= Number(campaign.min_order_amount);

                        if (meetsMinimum) {
                            campaignId = campaign.id;
                            const discountValue = Number(campaign.discount_value) || 0;

                            if (campaign.type === 'PercentDiscount' || campaign.type === 'FlashSale') {
                                discountAmount = (cartTotal * discountValue) / 100;
                            } else if (campaign.type === 'FixedDiscount') {
                                discountAmount = discountValue;
                            }

                            discountAmount = Math.min(discountAmount, cartTotal);

                            // Increment usage count
                            await supabase
                                .from('campaigns')
                                .update({
                                    usage_count: (campaign.usage_count || 0) + 1,
                                    revenue: (Number(campaign.revenue) || 0) + (cartTotal - discountAmount),
                                    orders: (campaign.orders || 0) + 1
                                })
                                .eq('id', campaign.id);
                        }
                    }
                }
            } catch (couponErr) {
                console.warn('[Checkout] Coupon validation error:', couponErr);
            }
        }

        // Check for missing Stripe key
        if (!process.env.STRIPE_SECRET_KEY) {
            console.warn('STRIPE_SECRET_KEY is missing. Using simulated success.');
            return NextResponse.json({
                url: '/odeme/basarili?simulated=true',
                discountAmount,
                campaignId
            });
        }

        const stripe = getStripe();

        // Calculate discounted items
        const lineItems = items.map((item: any) => {
            let unitPrice = item.price;

            // Distribute discount proportionally across items
            if (discountAmount > 0) {
                const cartTotal = items.reduce((sum: number, i: any) => sum + (i.price * i.quantity), 0);
                const itemShare = (item.price * item.quantity) / cartTotal;
                const itemDiscount = (discountAmount * itemShare) / item.quantity;
                unitPrice = Math.max(item.price - itemDiscount, 0);
            }

            return {
                price_data: {
                    currency: currency.toLowerCase(),
                    product_data: {
                        name: item.name,
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: Math.round(unitPrice * 100), // Stripe expects cents/kurus
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/${language}/odeme/basarili?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/sepet`,
            locale: language as any,
            metadata: campaignId ? { campaign_id: campaignId, coupon_code: couponCode } : undefined,
        });

        return NextResponse.json({
            url: session.url,
            discountAmount,
            campaignId
        });
    } catch (err: any) {
        console.error('Stripe Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
