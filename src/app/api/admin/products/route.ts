import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/products
 * List all products for admin panel.
 */
export async function GET(req: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '50');
        const search = searchParams.get('search') || '';
        const category = searchParams.get('category') || '';

        let query = supabase.from('products').select('*', { count: 'exact' });

        if (search) {
            query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%,brand.ilike.%${search}%`);
        }
        if (category) {
            query = query.eq('category_slug', category);
        }

        query = query.order('created_at', { ascending: false })
            .range((page - 1) * perPage, page * perPage - 1);

        const { data, error, count } = await query;

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ products: data, total: count });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/**
 * POST /api/admin/products
 * Create a new product.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from('products')
            .insert({
                name: body.name,
                slug: body.slug,
                description: body.description || null,
                price: body.price || 0,
                sale_price: body.salePrice || null,
                category_id: body.categoryId || null,
                category_slug: body.categorySlug || null,
                images: body.images || [],
                lifestyle_image: body.lifestyleImage || null,
                colors: (body.colors || []).map((c: any) => JSON.stringify(c)),
                materials: body.materials || [],
                dimensions: body.dimensions || null,
                stock: body.stock || 0,
                featured: !!body.featured,
                is_new: !!body.isNew,
                brand: body.brand || 'SelisHome',
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ product: data }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
