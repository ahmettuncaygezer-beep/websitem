import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// ── Gönderilen kuponu kontrol edip indirim tutarını döner ────────────────────
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { code, cartTotal, productIds, categoryIds, userId } = body;

        if (!code) {
            return NextResponse.json({ error: 'Kupon kodu gerekli' }, { status: 400 });
        }

        // Kuponu veritabanından çek (sadece aktif olanları)
        const { data: coupon, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('code', code.toUpperCase())
            .eq('is_active', true)
            .single();

        if (error || !coupon) {
            return NextResponse.json({ error: 'Geçersiz veya süresi dolmuş kupon kodu' }, { status: 400 });
        }

        // 1. Tarih Kontrolü
        const now = new Date();
        const startsAt = new Date(coupon.starts_at);
        if (now < startsAt) {
            return NextResponse.json({ error: 'Bu kupon henüz aktif değil' }, { status: 400 });
        }
        if (coupon.ends_at) {
            const endsAt = new Date(coupon.ends_at);
            if (now > endsAt) {
                return NextResponse.json({ error: 'Bu kuponun süresi dolmuş' }, { status: 400 });
            }
        }

        // 2. Minimum Sepet Tutarı Kontrolü
        if (coupon.min_order_amount && cartTotal < coupon.min_order_amount) {
            return NextResponse.json({ error: `Bu kupon min. ₺${coupon.min_order_amount} sepet tutarında geçerlidir` }, { status: 400 });
        }

        // 3. Genel Kullanım Limiti Kontrolü
        if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
            return NextResponse.json({ error: 'Bu kuponun kullanım limiti dolmuş' }, { status: 400 });
        }

        // 4. Spesifik Kategori/Ürün Kısıtlaması (Soft Check: Sepette var mı?)
        // Gerçek bir e-ticaret sisteminde indirim sadece uygun ürünlere uygulanır, 
        // burada basitçe sepette en az bir uygun ürün/kategori var mı bakıyoruz.
        let isApplicable = true;

        if (coupon.valid_category_ids && coupon.valid_category_ids.length > 0) {
            const hasValidCategory = categoryIds?.some((id: string) => coupon.valid_category_ids.includes(id));
            if (!hasValidCategory) isApplicable = false;
        }

        if (coupon.valid_product_ids && coupon.valid_product_ids.length > 0) {
            const hasValidProduct = productIds?.some((id: string) => coupon.valid_product_ids.includes(id));
            if (!hasValidProduct) isApplicable = false;
        }

        if (!isApplicable) {
            return NextResponse.json({ error: 'Bu kupon sepetinizdeki ürünler için geçerli değil' }, { status: 400 });
        }

        // İndirim Tutarını Hesaplama
        let discountAmount = 0;
        if (coupon.discount_type === 'percentage') {
            discountAmount = cartTotal * (coupon.discount_value / 100);
            if (coupon.max_discount_amount && discountAmount > coupon.max_discount_amount) {
                discountAmount = coupon.max_discount_amount;
            }
        } else if (coupon.discount_type === 'fixed_amount') {
            discountAmount = coupon.discount_value;
            if (discountAmount > cartTotal) {
                discountAmount = cartTotal; // Sepet tutarından fazla indirim yapılamaz
            }
        } else if (coupon.discount_type === 'free_shipping') {
            // Sepet mantığına göre kargo ücreti ayrı tutulmalıdır, şimdilik indirim=kargo ücreti varsayımı (veya özel bayrak)
            discountAmount = 0; // Kargo ücreti sepette nasıl hesaplanıyorsa ona eklenecektir.
        }

        return NextResponse.json({
            success: true,
            discount_amount: discountAmount,
            discount_type: coupon.discount_type,
            coupon_id: coupon.id
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
