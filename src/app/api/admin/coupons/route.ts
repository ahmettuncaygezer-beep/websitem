import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Tüm Kuponları Getir ───────────────────────────────────────────────
export async function GET() {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── POST: Yeni Kupon Oluştur ───────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();

        // Temel doğrulama
        if (!body.code || !body.discount_type || body.discount_value === undefined) {
            return NextResponse.json({ error: 'Kod, İndirim Tipi ve Değeri zorunludur' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('coupons')
            .insert([{
                code: body.code.toUpperCase(),
                discount_type: body.discount_type,
                discount_value: body.discount_value,
                min_order_amount: body.min_order_amount || 0,
                max_discount_amount: body.max_discount_amount || null,
                usage_limit: body.usage_limit || null,
                usage_limit_per_user: body.usage_limit_per_user || 1,
                valid_category_ids: body.valid_category_ids || null,
                valid_product_ids: body.valid_product_ids || null,
                starts_at: body.starts_at || new Date().toISOString(),
                ends_at: body.ends_at || null,
                is_active: body.is_active !== undefined ? body.is_active : true
            }])
            .select()
            .single();

        if (error) {
            if (error.code === '23505') return NextResponse.json({ error: 'Bu kupon kodu zaten mevcut.' }, { status: 400 });
            throw error;
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
