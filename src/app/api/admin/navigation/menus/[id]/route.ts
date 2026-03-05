import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Belirli Menüyü Getir (Öğeleriyle Birlikte) ──────────────────────────
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        const { data: menu, error: menuErr } = await supabase
            .from('menus')
            .select('*')
            .eq('id', id)
            .single();

        if (menuErr) throw menuErr;

        const { data: items, error: itemsErr } = await supabase
            .from('menu_items')
            .select('*')
            .eq('menu_id', id)
            .order('sort_order', { ascending: true });

        if (itemsErr) throw itemsErr;

        return NextResponse.json({ ...menu, items: items || [] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── PUT: Menü Düzenle ────────────────────────────────────────────────────────
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const body = await req.json();
        const { name, handle, description } = body;

        const { data, error } = await supabase
            .from('menus')
            .update({ name, handle, description })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            if (error.code === '23505') return NextResponse.json({ error: 'Bu tanıtıcı (handle) zaten kullanımda.' }, { status: 400 });
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── DELETE: Menü Sil ─────────────────────────────────────────────────────────
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        const { error } = await supabase
            .from('menus')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
