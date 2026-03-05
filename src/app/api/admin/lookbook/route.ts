import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
    try {
        const supabase = await createSupabaseServerClient();

        // Return sorted by sort_order
        const { data, error } = await supabase
            .from('lookbook_items')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const supabase = await createSupabaseServerClient();

        // Automatically set sort_order to MAX + 1
        const { data: maxData } = await supabase
            .from('lookbook_items')
            .select('sort_order')
            .order('sort_order', { ascending: false })
            .limit(1)
            .single();

        const nextOrder = (maxData?.sort_order ?? -1) + 1;

        const { data, error } = await supabase
            .from('lookbook_items')
            .insert({ ...payload, sort_order: nextOrder })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT handler for reordering items in bulk
export async function PUT(request: Request) {
    try {
        const { items } = await request.json();
        // Expected format: { items: [ { id: 'uuid', sort_order: 1 }, ... ] }
        if (!Array.isArray(items)) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        const supabase = await createSupabaseServerClient();

        const promises = items.map(item =>
            supabase
                .from('lookbook_items')
                .update({ sort_order: item.sort_order })
                .eq('id', item.id)
        );

        await Promise.all(promises);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
