import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Tüm SEO Kayıtlarını Getir ──────────────────────────────────────────
export async function GET() {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { data, error } = await supabase
            .from('seo_meta')
            .select('*')
            .order('url_path', { ascending: true });

        if (error) throw error;

        return NextResponse.json(data || []);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── POST: Yeni SEO Kaydı Ekle ────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { url_path, title, description, keywords, og_image, og_title, og_description, robots, canonical_url } = body;

        if (!url_path || !title) {
            return NextResponse.json({ error: 'URL Yolu ve SEO Başlığı zorunludur' }, { status: 400 });
        }

        // Format URL Path
        let formattedUrl = url_path.trim();
        if (!formattedUrl.startsWith('/') && formattedUrl !== '') {
            formattedUrl = `/${formattedUrl}`;
        }

        const { data, error } = await supabase
            .from('seo_meta')
            .insert([{
                url_path: formattedUrl,
                title,
                description,
                keywords,
                og_image,
                og_title,
                og_description,
                robots: robots || 'index, follow',
                canonical_url
            }])
            .select()
            .single();

        if (error) {
            if (error.code === '23505') return NextResponse.json({ error: 'Bu URL için zaten bir SEO kaydı var.' }, { status: 400 });
            throw error;
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
