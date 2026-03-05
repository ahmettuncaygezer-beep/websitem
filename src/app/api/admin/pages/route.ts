import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── GET: Tüm Sayfaları Getir ──────────────────────────────────────────────────
export async function GET() {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { data, error, count } = await supabase
            .from('pages')
            .select(`
                id, 
                title, 
                slug, 
                excerpt, 
                is_published, 
                published_at, 
                created_at, 
                updated_at,
                author_id
            `, { count: 'exact' })
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({
            pages: data || [],
            total: count || 0
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ── POST: Yeni Sayfa Ekle ─────────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { title, slug, content, excerpt, meta_title, meta_description, meta_keywords, is_published } = body;

        // Validation
        if (!title || !slug || !content) {
            return NextResponse.json({ error: 'Başlık, slug ve içerik zorunludur' }, { status: 400 });
        }

        const newPage = {
            title,
            slug,
            content,
            excerpt: excerpt || null,
            meta_title: meta_title || null,
            meta_description: meta_description || null,
            meta_keywords: meta_keywords || null,
            is_published: is_published || false,
            published_at: is_published ? new Date().toISOString() : null,
            // author_id: session.id TODO: when users table is linked with auth correctly
        };

        const { data, error } = await supabase
            .from('pages')
            .insert([newPage])
            .select()
            .single();

        if (error) {
            // Check for unique slug Error (Postgres Code 23505)
            if (error.code === '23505') {
                return NextResponse.json({ error: 'Bu URL URL (slug) zaten kullanımda.' }, { status: 400 });
            }
            throw error;
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
