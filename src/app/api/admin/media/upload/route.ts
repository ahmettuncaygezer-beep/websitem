import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

const BUCKET = 'product-images';

export async function POST(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const formData = await req.formData();
        const files = formData.getAll('file') as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 });
        }

        const supabase = await createSupabaseServerClient();
        const results = [];

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Generate unique filename to prevent overwriting
            const ext = file.name.split('.').pop() || '';
            const timestamp = Date.now();
            const randomString = Math.random().toString(36).substring(2, 8);
            const fileName = `${timestamp}-${randomString}.${ext}`;
            const path = fileName; // Upload to root of the bucket for now

            const { data, error } = await supabase.storage
                .from(BUCKET)
                .upload(path, buffer, {
                    contentType: file.type,
                    upsert: false,
                });

            if (error) {
                console.error('Supabase upload error:', error);
                throw error;
            }

            const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);

            results.push({
                success: true,
                path: path,
                name: fileName,
                url: urlData.publicUrl,
                size: file.size,
                type: file.type
            });
        }

        return NextResponse.json({ success: true, files: results });
    } catch (err: any) {
        console.error('API /upload error:', err);
        const message = err.message || 'Bilinmeyen bir hata oluştu';

        if (message.includes('bucket not found') || message.includes('Bucket not found')) {
            return NextResponse.json({
                error: `Sistem hatası: "${BUCKET}" depolama alanı (bucket) mevcut değil. Lütfen Supabase panelinden oluşturun.`,
                code: 'BUCKET_NOT_FOUND'
            }, { status: 500 });
        }

        return NextResponse.json({
            error: `Yükleme hatası: ${message}`
        }, { status: 500 });
    }
}
