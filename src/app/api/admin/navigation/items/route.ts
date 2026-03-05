import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Tüm Menü Öğelerini Getir (Genellikle Menü detayından alınır ama gerekebilir) 
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const menuId = searchParams.get('menu_id');

        let query = supabase.from('menu_items').select('*').order('sort_order', { ascending: true });

        if (menuId) {
            query = query.eq('menu_id', menuId);
        }

        const { data, error } = await query;
        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── POST: Yeni Menü Öğesi Ekle ───────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { menu_id, parent_id, title, url, is_external, target, icon, sort_order, is_active } = body;

        if (!menu_id || !title || !url) {
            return NextResponse.json({ error: 'Menü ID, Başlık ve URL zorunludur' }, { status: 400 });
        }

        // Eğer sort_order verilmemişse, en sona ekle
        let finalSortOrder = sort_order;
        if (finalSortOrder === undefined) {
            const { data: maxOrder } = await supabase
                .from('menu_items')
                .select('sort_order')
                .eq('menu_id', menu_id)
                .order('sort_order', { ascending: false })
                .limit(1)
                .single();

            finalSortOrder = maxOrder ? (maxOrder.sort_order || 0) + 1 : 0;
        }

        const { data, error } = await supabase
            .from('menu_items')
            .insert([{
                menu_id,
                parent_id: parent_id || null,
                title,
                url,
                is_external: is_external || false,
                target: target || '_self',
                icon: icon || null,
                sort_order: finalSortOrder,
                is_active: is_active !== undefined ? is_active : true
            }])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── PUT: Menü Öğeleri Sıralaması Güncelleme (Toplu) ──────────────────────────
export async function PUT(req: Request) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { items } = body; // Array of { id, parent_id, sort_order }

        if (!items || !Array.isArray(items)) {
            return NextResponse.json({ error: 'Öğe listesi geçersiz' }, { status: 400 });
        }

        // Perform batch update using promise all
        const promises = items.map((item: any) =>
            supabase
                .from('menu_items')
                .update({
                    parent_id: item.parent_id || null,
                    sort_order: item.sort_order
                })
                .eq('id', item.id)
        );

        await Promise.all(promises);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
