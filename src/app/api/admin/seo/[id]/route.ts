import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Belirli Bir SEO Kaydını Getir ───────────────────────────────────────
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        const { data, error } = await supabase
            .from('seo_meta')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return NextResponse.json({ error: 'Kayıt bulunamadı' }, { status: 404 });
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── PUT: SEO Kaydını Düzenle ─────────────────────────────────────────────────
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const body = await req.json();
        const { url_path, title, description, keywords, og_image, og_title, og_description, robots, canonical_url } = body;

        if (!url_path || !title) {
            return NextResponse.json({ error: 'URL Yolu ve SEO Başlığı zorunludur' }, { status: 400 });
        }

        let formattedUrl = url_path.trim();
        if (!formattedUrl.startsWith('/') && formattedUrl !== '') {
            formattedUrl = `/${formattedUrl}`;
        }

        const { data, error } = await supabase
            .from('seo_meta')
            .update({
                url_path: formattedUrl,
                title,
                description,
                keywords,
                og_image,
                og_title,
                og_description,
                robots,
                canonical_url
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            if (error.code === '23505') return NextResponse.json({ error: 'Bu URL için zaten bir SEO kaydı var.' }, { status: 400 });
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── DELETE: SEO Kaydını Sil ──────────────────────────────────────────────────
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        const { error } = await supabase
            .from('seo_meta')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
