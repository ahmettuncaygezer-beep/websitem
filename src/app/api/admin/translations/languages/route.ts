import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Tüm Dilleri Getir ──────────────────────────────────────────────────
export async function GET() {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { data, error } = await supabase
            .from('languages')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── POST: Yeni Dil Ekle ─────────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { code, name, is_active, is_default, sort_order } = body;

        if (!code || !name) {
            return NextResponse.json({ error: 'Dil Kodu ve Adı zorunludur' }, { status: 400 });
        }

        // Eğer yeni dil varsayılan yapılıyorsa, diğerlerinin varsayılanını kaldır (isteğe bağlı eklenebilir, şimdilik basit tutuyoruz)
        const { data, error } = await supabase
            .from('languages')
            .insert([{
                code: code.toLowerCase(),
                name,
                is_active: is_active ?? true,
                is_default: is_default ?? false,
                sort_order: sort_order ?? 0
            }])
            .select()
            .single();

        if (error) {
            if (error.code === '23505') return NextResponse.json({ error: 'Bu dil kodu zaten ekli.' }, { status: 400 });
            throw error;
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
