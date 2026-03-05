import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Tüm Çevirileri Getir ────────────────────────────────────────────────
export async function GET(req: Request) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const langCode = searchParams.get('lang');

        let query = supabase.from('translations').select('*');
        if (category) query = query.eq('category', category);
        if (langCode) query = query.eq('language_code', langCode);

        const { data, error } = await query;

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── POST: Toplu Çeviri Ekle/Güncelle ──────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        // Beklenen format: { translations: [{ key: 'x', language_code: 'tr', value: 'y', category: 'z' }, ...] }
        const { translations } = body;

        if (!translations || !Array.isArray(translations)) {
            return NextResponse.json({ error: 'Geçersiz veri formatı' }, { status: 400 });
        }

        // Upsert işlemi ile var olanlar güncellenir, olmayanlar eklenir (ON CONFLICT (key, language_code))
        const { data, error } = await supabase
            .from('translations')
            .upsert(translations, { onConflict: 'key,language_code' })
            .select();

        if (error) throw error;

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
