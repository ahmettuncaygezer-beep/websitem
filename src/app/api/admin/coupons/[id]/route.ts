import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Tek Kupon Getir ───────────────────────────────────────────────────
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        const { data, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return NextResponse.json({ error: 'Kupon bulunamadı' }, { status: 404 });
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── PUT: Kupon Güncelle ────────────────────────────────────────────────────
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const body = await req.json();

        // code güncellenirken uniqe constraint'e dikkat edilmeli
        const updateData: any = {
            discount_type: body.discount_type,
            discount_value: body.discount_value,
            min_order_amount: body.min_order_amount,
            max_discount_amount: body.max_discount_amount,
            usage_limit: body.usage_limit,
            usage_limit_per_user: body.usage_limit_per_user,
            valid_category_ids: body.valid_category_ids,
            valid_product_ids: body.valid_product_ids,
            starts_at: body.starts_at,
            ends_at: body.ends_at,
            is_active: body.is_active
        };

        if (body.code) updateData.code = body.code.toUpperCase();

        const { data, error } = await supabase
            .from('coupons')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            if (error.code === '23505') return NextResponse.json({ error: 'Bu kupon kodu zaten kullanılıyor.' }, { status: 400 });
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── DELETE: Kupon Sil ──────────────────────────────────────────────────────
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        const { error } = await supabase
            .from('coupons')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
