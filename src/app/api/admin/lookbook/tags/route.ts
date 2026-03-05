import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function POST(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const body = await req.json();
        const { photoId, productId, x_pos, y_pos } = body;

        if (!photoId || !productId) {
            return NextResponse.json({ error: 'Photo ID and Product ID are required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('lookbook_product_tags')
            .insert([{
                photo_id: photoId,
                product_id: productId,
                x_pos,
                y_pos
            }])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (err: any) {
        console.error('Error adding lookbook tag:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Tag ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('lookbook_product_tags')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Error deleting lookbook tag:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
