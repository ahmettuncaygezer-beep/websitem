import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Belirli Bir Dili Getir ─────────────────────────────────────────────
export async function GET(req: Request, { params }: { params: { code: string } }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { code } = await params;

        const { data, error } = await supabase
            .from('languages')
            .select('*')
            .eq('code', code)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return NextResponse.json({ error: 'Dil bulunamadı' }, { status: 404 });
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── PUT: Dili Güncelle ──────────────────────────────────────────────────────
export async function PUT(req: Request, { params }: { params: { code: string } }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { code } = await params;
        const body = await req.json();
        const { name, is_active, is_default, sort_order } = body;

        const { data, error } = await supabase
            .from('languages')
            .update({ name, is_active, is_default, sort_order })
            .eq('code', code)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── DELETE: Dili Sil ────────────────────────────────────────────────────────
export async function DELETE(req: Request, { params }: { params: { code: string } }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { code } = await params;

        // tr silinemez (varsayılan)
        if (code === 'tr') {
            return NextResponse.json({ error: 'Varsayılan dil silinemez.' }, { status: 400 });
        }

        const { error } = await supabase
            .from('languages')
            .delete()
            .eq('code', code);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
