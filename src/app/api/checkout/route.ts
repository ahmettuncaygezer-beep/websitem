import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
    apiVersion: '2025-01-27' as any,
});

export async function POST(req: Request) {
    try {
        const { items, currency = 'try', language = 'tr' } = await req.json();

        // Check for missing Stripe key
        if (!process.env.STRIPE_SECRET_KEY) {
            console.warn('STRIPE_SECRET_KEY is missing. Using simulated success.');
            return NextResponse.json({ url: '/odeme/basarili?simulated=true' });
        }

        const stripe = getStripe();
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item: any) => ({
                price_data: {
                    currency: currency.toLowerCase(),
                    product_data: {
                        name: item.name,
                        images: item.image ? [item.image] : [],
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe expects cents/kurus
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/${language}/odeme/basarili?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/sepet`,
            locale: language as any,
        });

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Stripe Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
