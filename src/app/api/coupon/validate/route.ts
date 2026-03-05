import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/**
 * POST /api/coupon/validate
 * Validates a coupon code against the campaigns table.
 * Body: { code, cartTotal, cartItems: [{ productId, categorySlug, quantity, price }] }
 */
export async function POST(req: Request) {
    try {
        const { code, cartTotal, cartItems } = await req.json();

        if (!code) {
            return NextResponse.json({ valid: false, error: 'Kupon kodu gereklidir.' }, { status: 400 });
        }

        const supabase = await createSupabaseServerClient();

        // Find campaign by coupon code
        const { data: campaign, error } = await supabase
            .from('campaigns')
            .select('*')
            .eq('coupon_code', code.toUpperCase().trim())
            .single();

        if (error || !campaign) {
            return NextResponse.json({ valid: false, error: 'Geçersiz kupon kodu.' });
        }

        // Check status
        if (campaign.status !== 'Aktif') {
            return NextResponse.json({ valid: false, error: 'Bu kampanya artık aktif değil.' });
        }

        // Check date range
        const now = new Date();
        if (campaign.start_date && new Date(campaign.start_date) > now) {
            return NextResponse.json({ valid: false, error: 'Bu kampanya henüz başlamadı.' });
        }
        if (campaign.end_date && new Date(campaign.end_date) < now) {
            return NextResponse.json({ valid: false, error: 'Bu kampanyanın süresi dolmuş.' });
        }

        // Check usage limit
        if (campaign.usage_limit && campaign.usage_count >= campaign.usage_limit) {
            return NextResponse.json({ valid: false, error: 'Bu kupon kullanım limitine ulaşmış.' });
        }

        // Check minimum order amount
        if (campaign.min_order_amount && cartTotal < Number(campaign.min_order_amount)) {
            return NextResponse.json({
                valid: false,
                error: `Minimum sipariş tutarı ₺${Number(campaign.min_order_amount).toLocaleString('tr-TR')} olmalıdır.`
            });
        }

        // Check valid categories (if specified)
        const validCats: string[] = campaign.valid_categories || [];
        if (validCats.length > 0 && cartItems) {
            const hasMatchingCategory = cartItems.some((item: any) =>
                validCats.some(cat =>
                    cat.toLowerCase() === (item.categorySlug || item.category || '').toLowerCase()
                )
            );
            if (!hasMatchingCategory) {
                return NextResponse.json({
                    valid: false,
                    error: `Bu kupon yalnızca ${validCats.join(', ')} kategorilerinde geçerlidir.`
                });
            }
        }

        // Check valid products (if specified)
        const validProds: string[] = campaign.valid_products || [];
        if (validProds.length > 0 && cartItems) {
            const hasMatchingProduct = cartItems.some((item: any) =>
                validProds.some(p =>
                    p.toLowerCase() === (item.productId || item.name || '').toLowerCase()
                )
            );
            if (!hasMatchingProduct) {
                return NextResponse.json({
                    valid: false,
                    error: 'Bu kupon sepetinizdeki ürünler için geçerli değil.'
                });
            }
        }

        // Calculate discount
        let discountAmount = 0;
        const discountValue = Number(campaign.discount_value) || 0;

        switch (campaign.type) {
            case 'PercentDiscount':
            case 'FlashSale':
                discountAmount = (cartTotal * discountValue) / 100;
                break;
            case 'FixedDiscount':
                discountAmount = discountValue;
                break;
            case 'FreeShipping':
                discountAmount = 0; // Handled separately
                break;
            default:
                discountAmount = (cartTotal * discountValue) / 100;
        }

        // Cap discount at cart total
        discountAmount = Math.min(discountAmount, cartTotal);

        return NextResponse.json({
            valid: true,
            campaignId: campaign.id,
            campaignName: campaign.name,
            type: campaign.type,
            discountValue,
            discountUnit: campaign.discount_unit || 'yüzde',
            discountAmount: Math.round(discountAmount * 100) / 100,
            freeShipping: campaign.type === 'FreeShipping',
            message: campaign.type === 'FreeShipping'
                ? 'Ücretsiz kargo uygulandı!'
                : `₺${Math.round(discountAmount).toLocaleString('tr-TR')} indirim uygulandı!`
        });
    } catch (err: any) {
        console.error('[Coupon Validate] Error:', err);
        return NextResponse.json({ valid: false, error: 'Kupon doğrulanamadı.' }, { status: 500 });
    }
}
