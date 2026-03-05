import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Tüm Menüleri Getir ──────────────────────────────────────────────────
export async function GET() {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { data, error } = await supabase
            .from('menus')
            .select(`
                id, 
                name, 
                handle, 
                description
            `)
            .order('name', { ascending: true });

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── POST: Yeni Menü Ekle ─────────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { name, handle, description } = body;

        if (!name || !handle) {
            return NextResponse.json({ error: 'Menü adı ve tanıtıcısı (handle) zorunludur' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('menus')
            .insert([{ name, handle, description }])
            .select()
            .single();

        if (error) {
            if (error.code === '23505') return NextResponse.json({ error: 'Bu tanıtıcı (handle) zaten kullanımda.' }, { status: 400 });
            throw error;
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
