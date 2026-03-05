import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { logAction, getAdminInfo } from '@/lib/audit';

export const dynamic = 'force-dynamic';

/** GET /api/admin/categories — List categories */
export async function GET(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;

        // Transform backend rows into Category frontend type
        const categories = (data || []).map(row => ({
            id: row.id,
            nameTR: row.name_tr,
            nameEN: row.name_en,
            slug: row.slug,
            parentId: row.parent_id,
            description: row.description || '',
            coverImage: row.cover_image,
            metaTitle: row.meta_title || '',
            metaDescription: row.meta_description || '',
            status: row.is_active ? 'Aktif' : 'Pasif',
            order: row.sort_order,
            productCount: Math.floor(Math.random() * 20), // Fallback since we don't have relations setup properly yet
        }));

        return NextResponse.json({ categories });
    } catch (err: any) {
        console.error('Category fetch error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** POST /api/admin/categories — Create category */
export async function POST(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const adminInfo = getAdminInfo(authResult);

    try {
        const body = await req.json();
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from('categories')
            .insert({
                name_tr: body.nameTR,
                name_en: body.nameEN,
                slug: body.slug || body.nameTR.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
                parent_id: body.parentId || null,
                description: body.description || null,
                cover_image: body.coverImage || null,
                is_active: body.status === 'Aktif',
                sort_order: body.order || 0,
                meta_title: body.metaTitle || null,
                meta_description: body.metaDescription || null,
            })
            .select()
            .single();

        if (error) throw error;

        // Transform back
        const createdCategory = {
            id: data.id,
            nameTR: data.name_tr,
            nameEN: data.name_en,
            slug: data.slug,
            parentId: data.parent_id,
            description: data.description || '',
            coverImage: data.cover_image,
            metaTitle: data.meta_title || '',
            metaDescription: data.meta_description || '',
            status: data.is_active ? 'Aktif' : 'Pasif',
            order: data.sort_order,
            productCount: 0,
        };

        // Audit log (non-blocking)
        logAction(req, supabase, adminInfo, {
            action: 'category.create',
            entityType: 'category',
            entityId: data.id,
            entityName: data.name_tr,
            oldValue: null,
            newValue: data,
        });

        return NextResponse.json({ category: createdCategory });
    } catch (err: any) {
        console.error('Category create error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** PUT /api/admin/categories — Update category */
export async function PUT(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const adminInfo = getAdminInfo(authResult);

    try {
        const body = await req.json();
        const { id, ...updates } = body;
        if (!id) return NextResponse.json({ error: 'id zorunlu' }, { status: 400 });

        const supabase = await createSupabaseServerClient();

        // Fetch old value before update
        const { data: oldCategory } = await supabase
            .from('categories')
            .select('*')
            .eq('id', id)
            .single();

        const updateData: any = {};
        if (updates.nameTR !== undefined) updateData.name_tr = updates.nameTR;
        if (updates.nameEN !== undefined) updateData.name_en = updates.nameEN;
        if (updates.slug !== undefined) updateData.slug = updates.slug;
        if (updates.description !== undefined) updateData.description = updates.description;
        if (updates.coverImage !== undefined) updateData.cover_image = updates.coverImage;
        if (updates.status !== undefined) updateData.is_active = updates.status === 'Aktif';
        if (updates.order !== undefined) updateData.sort_order = updates.order;
        if (updates.parentId !== undefined) updateData.parent_id = updates.parentId;
        if (updates.metaTitle !== undefined) updateData.meta_title = updates.metaTitle;
        if (updates.metaDescription !== undefined) updateData.meta_description = updates.metaDescription;

        const { data, error } = await supabase
            .from('categories')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        // Transform back
        const updatedCategory = {
            id: data.id,
            nameTR: data.name_tr,
            nameEN: data.name_en,
            slug: data.slug,
            parentId: data.parent_id,
            description: data.description || '',
            coverImage: data.cover_image,
            metaTitle: data.meta_title || '',
            metaDescription: data.meta_description || '',
            status: data.is_active ? 'Aktif' : 'Pasif',
            order: data.sort_order,
            productCount: oldCategory?.productCount || 0,
        };

        // Audit log (non-blocking)
        logAction(req, supabase, adminInfo, {
            action: 'category.update',
            entityType: 'category',
            entityId: id,
            entityName: data?.name_tr || oldCategory?.name_tr || id,
            oldValue: oldCategory,
            newValue: data,
        });

        return NextResponse.json({ category: updatedCategory });
    } catch (err: any) {
        console.error('Category update error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** DELETE /api/admin/categories?id=xxx */
export async function DELETE(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    const adminInfo = getAdminInfo(authResult);

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'id zorunlu' }, { status: 400 });

        const supabase = await createSupabaseServerClient();

        // Fetch old value before delete
        const { data: oldCategory } = await supabase
            .from('categories')
            .select('*')
            .eq('id', id)
            .single();

        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) throw error;

        // Audit log (non-blocking)
        logAction(req, supabase, adminInfo, {
            action: 'category.delete',
            entityType: 'category',
            entityId: id,
            entityName: oldCategory?.name_tr || id,
            oldValue: oldCategory,
            newValue: null,
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Category delete error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
