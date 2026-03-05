import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

/** GET /api/admin/audit-logs — List audit logs with filtering + CSV export */
export async function GET(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '20');
        const adminEmail = searchParams.get('adminEmail') || '';
        const action = searchParams.get('action') || '';
        const entityType = searchParams.get('entityType') || '';
        const startDate = searchParams.get('startDate') || '';
        const endDate = searchParams.get('endDate') || '';
        const format = searchParams.get('format') || 'json';

        let query = supabase
            .from('audit_logs')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false });

        // Apply filters
        if (adminEmail) {
            query = query.eq('admin_email', adminEmail);
        }
        if (action) {
            query = query.eq('action', action);
        }
        if (entityType) {
            query = query.eq('entity_type', entityType);
        }
        if (startDate) {
            query = query.gte('created_at', startDate);
        }
        if (endDate) {
            // Add 1 day to include the end date fully
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            query = query.lt('created_at', end.toISOString());
        }

        // CSV export — fetch all matching records (no pagination)
        if (format === 'csv') {
            const { data, error } = await query;
            if (error) throw error;

            const rows = data || [];
            const csvHeader = 'Tarih,Admin,İşlem,Tür,Nesne ID,Nesne Adı,IP\n';
            const csvBody = rows.map((r: any) => {
                const date = new Date(r.created_at).toLocaleString('tr-TR');
                return `"${date}","${r.admin_email}","${r.action}","${r.entity_type}","${r.entity_id || ''}","${(r.entity_name || '').replace(/"/g, '""')}","${r.ip_address || ''}"`;
            }).join('\n');

            return new NextResponse(csvHeader + csvBody, {
                headers: {
                    'Content-Type': 'text/csv; charset=utf-8',
                    'Content-Disposition': `attachment; filename="audit_logs_${new Date().toISOString().slice(0, 10)}.csv"`,
                },
            });
        }

        // JSON with pagination
        query = query.range((page - 1) * perPage, page * perPage - 1);

        const { data, error, count } = await query;
        if (error) throw error;

        // Also fetch distinct admin emails and actions for filter dropdowns
        const { data: adminEmails } = await supabase
            .from('audit_logs')
            .select('admin_email')
            .order('admin_email');

        const { data: actions } = await supabase
            .from('audit_logs')
            .select('action')
            .order('action');

        const uniqueAdmins = [...new Set((adminEmails || []).map((r: any) => r.admin_email))];
        const uniqueActions = [...new Set((actions || []).map((r: any) => r.action))];

        return NextResponse.json({
            logs: data || [],
            total: count || 0,
            page,
            perPage,
            filters: {
                adminEmails: uniqueAdmins,
                actions: uniqueActions,
            },
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
