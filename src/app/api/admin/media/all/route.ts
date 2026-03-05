import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

const BUCKET = 'product-images';

/** GET /api/admin/media — List files in Supabase Storage */
export async function GET(req: Request) {
    console.log('GET /api/admin/media hit');
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(req.url);
        const folder = searchParams.get('folder') || '';

        const { data, error } = await supabase.storage
            .from(BUCKET)
            .list(folder, {
                limit: 200,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' },
            });

        if (error) {
            console.error('Supabase storage list error:', error);
            if (error.message.includes('bucket not found') || error.message.includes('Bucket not found')) {
                return NextResponse.json({
                    error: `Storage bucket "${BUCKET}" not found. Please create it in your Supabase dashboard.`,
                    code: 'BUCKET_NOT_FOUND'
                }, { status: 404 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Build public URLs for each file
        const files = (data || [])
            .filter(f => !f.id?.endsWith('/')) // skip folders
            .map(f => {
                const path = folder ? `${folder}/${f.name}` : f.name;
                const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
                return {
                    id: f.id,
                    name: f.name,
                    path,
                    size: f.metadata?.size || 0,
                    mimetype: f.metadata?.mimetype || 'image/jpeg',
                    created_at: f.created_at,
                    updated_at: f.updated_at,
                    publicUrl: urlData.publicUrl,
                };
            });

        return NextResponse.json({ files, total: files.length });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** DELETE /api/admin/media — Delete a file from storage */
export async function DELETE(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const { path } = await req.json();
        if (!path) return NextResponse.json({ error: 'path required' }, { status: 400 });

        const supabase = await createSupabaseServerClient();
        const { error } = await supabase.storage.from(BUCKET).remove([path]);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
