import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

/** PUT /api/admin/categories/reorder — Bulk update categories' sort order and parent_id */
export async function PUT(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const body = await req.json();
        const updates: { id: string; parent_id: string | null; sort_order: number }[] = body.updates || [];

        if (!updates || updates.length === 0) {
            return NextResponse.json({ error: 'Güncellenecek veri bulunamadı' }, { status: 400 });
        }

        const supabase = await createSupabaseServerClient();

        // Perform upsert trick or sequential updates, since standard batch update is slightly complex in simple supabase client
        // Doing sequential for simplicity and reliability, as there aren't thousands of categories
        let successCount = 0;
        for (const update of updates) {
            const { error } = await supabase
                .from('categories')
                .update({ sort_order: update.sort_order, parent_id: update.parent_id })
                .eq('id', update.id);
            if (!error) successCount++;
        }

        return NextResponse.json({ success: true, updatedCount: successCount });
    } catch (err: any) {
        console.error('Category reorder error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
