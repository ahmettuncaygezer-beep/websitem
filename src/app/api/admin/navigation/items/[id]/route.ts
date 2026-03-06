import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── PUT: Menü Öğesi Düzenle ──────────────────────────────────────────────────
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const body = await req.json();
        const { title, url, is_external, target, icon, is_active } = body;

        const { data, error } = await supabase
            .from('menu_items')
            .update({ title, url, is_external, target, icon, is_active })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── DELETE: Menü Öğesi Sil ───────────────────────────────────────────────────
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        // Parent menu items delete their children automatically via CASCADE setup in SQL,
        // no need to manually delete children here.
        const { error } = await supabase
            .from('menu_items')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
