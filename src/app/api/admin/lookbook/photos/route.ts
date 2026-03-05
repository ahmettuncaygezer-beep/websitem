import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function GET(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const { searchParams } = new URL(req.url);
        const collectionId = searchParams.get('collectionId');

        if (!collectionId) {
            return NextResponse.json({ error: 'Collection ID is required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('lookbook_photos')
            .select(`
                *,
                productTags:lookbook_product_tags(
                    *,
                    product:products(name)
                )
            `)
            .eq('collection_id', collectionId)
            .order('order_index', { ascending: true });

        if (error) throw error;

        // Flatten product name for easier frontend usage
        const flattenedData = data.map((photo: any) => ({
            ...photo,
            productTags: photo.productTags.map((tag: any) => ({
                ...tag,
                productName: tag.product?.name || 'Bilinmeyen Ürün'
            }))
        }));

        return NextResponse.json({ data: flattenedData });
    } catch (err: any) {
        console.error('Error fetching lookbook photos:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const body = await req.json();
        const { collectionId, url, title, description, category, is_featured } = body;

        if (!collectionId || !url) {
            return NextResponse.json({ error: 'Collection ID and URL are required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('lookbook_photos')
            .insert([{
                collection_id: collectionId,
                url,
                title: title || '',
                description: description || '',
                category: category || '',
                is_featured: is_featured ?? false
            }])
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (err: any) {
        console.error('Error adding lookbook photo:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
