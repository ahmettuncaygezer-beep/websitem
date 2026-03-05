import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { logAction, getAdminInfo } from '@/lib/audit';

export const dynamic = 'force-dynamic';

/** GET /api/admin/campaigns — List campaigns */
export async function GET(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status') || '';

        let query = supabase
            .from('campaigns')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false });

        if (status && status !== 'Tümü') query = query.eq('status', status);

        const { data, error, count } = await query;
        if (error) throw error;

        // Map snake_case DB fields to camelCase for front-end
        const campaigns = (data || []).map(mapCampaign);

        // Aggregate KPIs
        const aktifCount = campaigns.filter(c => c.status === 'Aktif').length;
        const totalUsage = campaigns.reduce((sum, c) => sum + (c.usageCount || 0), 0);
        const totalRevenue = campaigns.reduce((sum, c) => sum + (c.revenue || 0), 0);
        const avgDiscount = campaigns.length > 0
            ? campaigns.reduce((sum, c) => sum + (c.discountValue || 0), 0) / campaigns.length
            : 0;

        return NextResponse.json({
            campaigns,
            total: count || 0,
            kpi: {
                aktifCount,
                totalUsage,
                totalRevenue,
                avgDiscount: Number(avgDiscount.toFixed(1))
            }
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** POST /api/admin/campaigns — Create campaign */
export async function POST(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const adminInfo = getAdminInfo(authResult);

    try {
        const body = await req.json();
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from('campaigns')
            .insert({
                name: body.name,
                type: body.type,
                status: body.status || 'Aktif',
                discount_value: body.discountValue || 0,
                discount_unit: body.discountUnit || 'yüzde',
                coupon_code: body.couponCode || null,
                is_single_use: body.isSingleUse || false,
                usage_limit: body.usageLimit || null,
                usage_count: 0,
                min_order_amount: body.minOrderAmount || null,
                min_product_count: body.minProductCount || null,
                valid_categories: body.validCategories || [],
                valid_products: body.validProducts || [],
                target_segment: body.targetSegment || 'Tümü',
                per_user_limit: body.perUserLimit || null,
                start_date: body.startDate,
                end_date: body.endDate,
                description: body.description || null,
                flash_sale_end_date: body.flashSaleEndDate || null,
                bundle_products: body.bundleProducts || [],
                bundle_condition: body.bundleCondition || null,
            })
            .select()
            .single();

        if (error) throw error;

        // If a coupon code is provided, also create it in the advanced coupons table
        if (body.couponCode) {
            const discountType = body.discountUnit === 'yüzde' ? 'percentage' : 'fixed_amount';
            await supabase.from('coupons').insert({
                code: body.couponCode.toUpperCase(),
                discount_type: discountType,
                discount_value: body.discountValue || 0,
                min_order_amount: body.minOrderAmount || 0,
                usage_limit: body.usageLimit || null,
                usage_limit_per_user: body.perUserLimit || 1,
                valid_category_ids: body.validCategories?.length > 0 ? body.validCategories : null,
                valid_product_ids: body.validProducts?.length > 0 ? body.validProducts : null,
                starts_at: body.startDate || new Date().toISOString(),
                ends_at: body.endDate || null,
                is_active: body.status === 'Aktif'
            });
        }

        // Audit log (non-blocking)
        logAction(req, supabase, adminInfo, {
            action: 'campaign.create',
            entityType: 'campaign',
            entityId: data?.id || '',
            entityName: data?.name || body.name,
            oldValue: null,
            newValue: data,
        });

        return NextResponse.json({ campaign: mapCampaign(data) });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** PUT /api/admin/campaigns — Update campaign */
export async function PUT(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const adminInfo = getAdminInfo(authResult);

    try {
        const body = await req.json();
        const { id, ...updates } = body;
        if (!id) return NextResponse.json({ error: 'id zorunlu' }, { status: 400 });

        const supabase = await createSupabaseServerClient();

        // Fetch old value before update
        const { data: oldCampaign } = await supabase
            .from('campaigns')
            .select('*')
            .eq('id', id)
            .single();

        const updateData: any = { updated_at: new Date().toISOString() };
        if (updates.name !== undefined) updateData.name = updates.name;
        if (updates.status !== undefined) updateData.status = updates.status;
        if (updates.discountValue !== undefined) updateData.discount_value = updates.discountValue;
        if (updates.discountUnit !== undefined) updateData.discount_unit = updates.discountUnit;
        if (updates.couponCode !== undefined) updateData.coupon_code = updates.couponCode;
        if (updates.usageLimit !== undefined) updateData.usage_limit = updates.usageLimit;
        if (updates.startDate !== undefined) updateData.start_date = updates.startDate;
        if (updates.endDate !== undefined) updateData.end_date = updates.endDate;
        if (updates.validCategories !== undefined) updateData.valid_categories = updates.validCategories;
        if (updates.validProducts !== undefined) updateData.valid_products = updates.validProducts;
        if (updates.targetSegment !== undefined) updateData.target_segment = updates.targetSegment;
        if (updates.minOrderAmount !== undefined) updateData.min_order_amount = updates.minOrderAmount;
        if (updates.description !== undefined) updateData.description = updates.description;

        const { data, error } = await supabase
            .from('campaigns')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        // Sync to coupons table if applicable
        if (data.coupon_code) {
            const discountType = data.discount_unit === 'yüzde' ? 'percentage' : 'fixed_amount';
            // Upsert functionality to the coupons table based on code
            await supabase.from('coupons').upsert({
                code: data.coupon_code.toUpperCase(),
                discount_type: discountType,
                discount_value: data.discount_value || 0,
                min_order_amount: data.min_order_amount || 0,
                usage_limit: data.usage_limit || null,
                usage_limit_per_user: data.per_user_limit || 1,
                valid_category_ids: data.valid_categories?.length > 0 ? data.valid_categories : null,
                valid_product_ids: data.valid_products?.length > 0 ? data.valid_products : null,
                starts_at: data.start_date || new Date().toISOString(),
                ends_at: data.end_date || null,
                is_active: data.status === 'Aktif'
            }, { onConflict: 'code' });
        } else if (oldCampaign?.coupon_code && !data.coupon_code) {
            // If a coupon code was removed from the campaign, we should also delete it from the coupons table
            await supabase.from('coupons').delete().eq('code', oldCampaign.coupon_code.toUpperCase());
        }

        // Audit log (non-blocking)
        logAction(req, supabase, adminInfo, {
            action: 'campaign.update',
            entityType: 'campaign',
            entityId: id,
            entityName: data?.name || oldCampaign?.name || id,
            oldValue: oldCampaign,
            newValue: data,
        });

        return NextResponse.json({ campaign: mapCampaign(data) });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** DELETE /api/admin/campaigns?id=xxx */
export async function DELETE(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const adminInfo = getAdminInfo(authResult);

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'id zorunlu' }, { status: 400 });

        const supabase = await createSupabaseServerClient();

        // Fetch old value before delete
        const { data: oldCampaign } = await supabase
            .from('campaigns')
            .select('*')
            .eq('id', id)
            .single();

        const { error } = await supabase.from('campaigns').delete().eq('id', id);
        if (error) throw error;

        // Also delete the associated coupon if it exists
        if (oldCampaign?.coupon_code) {
            await supabase.from('coupons').delete().eq('code', oldCampaign.coupon_code.toUpperCase());
        }

        // Audit log (non-blocking)
        logAction(req, supabase, adminInfo, {
            action: 'campaign.delete',
            entityType: 'campaign',
            entityId: id,
            entityName: oldCampaign?.name || id,
            oldValue: oldCampaign,
            newValue: null,
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** Map DB row to front-end format */
function mapCampaign(row: any) {
    return {
        id: row.id,
        name: row.name,
        type: row.type,
        status: row.status,
        discountValue: Number(row.discount_value) || 0,
        discountUnit: row.discount_unit || 'yüzde',
        couponCode: row.coupon_code,
        isSingleUse: row.is_single_use || false,
        usageCount: row.usage_count || 0,
        usageLimit: row.usage_limit,
        minOrderAmount: row.min_order_amount ? Number(row.min_order_amount) : null,
        minProductCount: row.min_product_count,
        validCategories: row.valid_categories || [],
        validProducts: row.valid_products || [],
        targetSegment: row.target_segment || 'Tümü',
        perUserLimit: row.per_user_limit,
        startDate: row.start_date || '',
        endDate: row.end_date || '',
        createdAt: row.created_at,
        revenue: Number(row.revenue) || 0,
        orders: row.orders || 0,
        description: row.description,
        flashSaleEndDate: row.flash_sale_end_date,
        bundleProducts: row.bundle_products || [],
        bundleCondition: row.bundle_condition,
    };
}
