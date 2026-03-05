import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Envanter Listesi (Ürünler) ──────────────────────────────────────────
export async function GET() {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { data, error } = await supabase
            .from('products')
            .select(`
                id,
                title,
                category_id,
                price,
                stock,
                is_active,
                created_at,
                categories ( title )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;

        const formatted = data.map((p: any) => ({
            ...p,
            category_name: p.categories?.title || 'Kategorisiz'
        }));

        return NextResponse.json(formatted);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
