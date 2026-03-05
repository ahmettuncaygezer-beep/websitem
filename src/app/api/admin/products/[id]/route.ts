import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { logAction, getAdminInfo } from '@/lib/audit';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/products/[id]
 * Get a single product by ID.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ product: data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/**
 * PUT /api/admin/products/[id]
 * Update a product.
 */
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const supabase = await createSupabaseServerClient();

        // Auth check + admin info for audit
        const authResult = await requireAdminAuth(req);
        const adminInfo = authResult instanceof NextResponse
            ? { adminId: null, adminEmail: 'unknown' }
            : getAdminInfo(authResult);

        // Fetch old value before update
        const { data: oldProduct } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        const updateData: any = {};
        if (body.name !== undefined) updateData.name = body.name;
        if (body.slug !== undefined) updateData.slug = body.slug;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.price !== undefined) updateData.price = body.price;
        if (body.salePrice !== undefined) updateData.sale_price = body.salePrice;
        if (body.categoryId !== undefined) updateData.category_id = body.categoryId;
        if (body.categorySlug !== undefined) updateData.category_slug = body.categorySlug;
        if (body.images !== undefined) updateData.images = body.images;
        if (body.lifestyleImage !== undefined) updateData.lifestyle_image = body.lifestyleImage;
        if (body.colors !== undefined) updateData.colors = body.colors.map((c: any) => JSON.stringify(c));
        if (body.materials !== undefined) updateData.materials = body.materials;
        if (body.dimensions !== undefined) updateData.dimensions = body.dimensions;
        if (body.stock !== undefined) updateData.stock = body.stock;
        if (body.featured !== undefined) updateData.featured = body.featured;
        if (body.isNew !== undefined) updateData.is_new = body.isNew;
        if (body.brand !== undefined) updateData.brand = body.brand;

        const { data, error } = await supabase
            .from('products')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Audit log (non-blocking)
        logAction(req, supabase, adminInfo, {
            action: 'product.update',
            entityType: 'product',
            entityId: id,
            entityName: data?.name || oldProduct?.name || id,
            oldValue: oldProduct,
            newValue: data,
        });

        return NextResponse.json({ product: data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/**
 * DELETE /api/admin/products/[id]
 * Delete a product.
 */
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const supabase = await createSupabaseServerClient();

        // Auth check + admin info for audit
        const authResult = await requireAdminAuth(req);
        const adminInfo = authResult instanceof NextResponse
            ? { adminId: null, adminEmail: 'unknown' }
            : getAdminInfo(authResult);

        // Fetch old value before delete
        const { data: oldProduct } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Audit log (non-blocking)
        logAction(req, supabase, adminInfo, {
            action: 'product.delete',
            entityType: 'product',
            entityId: id,
            entityName: oldProduct?.name || id,
            oldValue: oldProduct,
            newValue: null,
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
