import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Belirli Bir Sayfayı Getir ────────────────────────────────────────────
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        const { data, error } = await supabase
            .from('pages')
            .select(`
                id, 
                title, 
                slug, 
                content, 
                excerpt, 
                meta_title, 
                meta_description, 
                meta_keywords, 
                is_published, 
                published_at, 
                created_at, 
                updated_at,
                author_id
            `)
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return NextResponse.json({ error: 'Sayfa bulunamadı' }, { status: 404 });
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── PUT: Sayfa Düzenle ────────────────────────────────────────────────────────
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;
        const body = await req.json();
        const { title, slug, content, excerpt, meta_title, meta_description, meta_keywords, is_published } = body;

        // Validation
        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Başlık, slug ve içerik zorunludur' }, { status: 400 });
        }

        const updates = {
            title,
            slug,
            content,
            excerpt: excerpt || null,
            meta_title: meta_title || null,
            meta_description: meta_description || null,
            meta_keywords: meta_keywords || null,
            is_published: is_published || false,
            published_at: is_published ? new Date().toISOString() : null, // ideally only set if transitioned to true
        };

        const { data, error } = await supabase
            .from('pages')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            if (error.code === '23505') return NextResponse.json({ error: 'Bu URL (slug) zaten kullanımda.' }, { status: 400 });
            throw error;
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── DELETE: Sayfa Sil ─────────────────────────────────────────────────────────
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        const { error } = await supabase
            .from('pages')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
