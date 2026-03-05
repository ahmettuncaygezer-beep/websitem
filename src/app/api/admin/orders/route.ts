import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { logAction, getAdminInfo } from '@/lib/audit';

export const dynamic = 'force-dynamic';

/** GET /api/admin/orders — List all orders */
export async function GET(req: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status') || '';
        const search = searchParams.get('search') || '';
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '50');

        let query = supabase.from('orders').select('*', { count: 'exact' });

        if (status) query = query.eq('status', status);
        if (search) query = query.or(`order_number.ilike.%${search}%`);

        query = query.order('created_at', { ascending: false })
            .range((page - 1) * perPage, page * perPage - 1);

        const { data, error, count } = await query;
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ orders: data || [], total: count || 0 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** PUT /api/admin/orders — Update order status */
export async function PUT(req: Request) {
    try {
        const { id, status, notes } = await req.json();
        const supabase = await createSupabaseServerClient();

        // Auth check + admin info for audit
        const authResult = await requireAdminAuth(req);
        const adminInfo = authResult instanceof NextResponse
            ? { adminId: null, adminEmail: 'unknown' }
            : getAdminInfo(authResult);

        // Fetch old value before update
        const { data: oldOrder } = await supabase
            .from('orders')
            .select('*')
            .eq('id', id)
            .single();

        const updateData: any = {};
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        const { data, error } = await supabase.from('orders').update(updateData).eq('id', id).select().single();
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        // Audit log (non-blocking)
        logAction(req, supabase, adminInfo, {
            action: 'order.status_change',
            entityType: 'order',
            entityId: id,
            entityName: oldOrder?.order_number || id,
            oldValue: oldOrder,
            newValue: data,
        });

        return NextResponse.json({ order: data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
