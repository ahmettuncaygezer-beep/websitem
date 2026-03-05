import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
    const authResult = await requireAdminAuth(request);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const supabase = await createSupabaseServerClient();
        const { searchParams } = new URL(request.url);

        const status = searchParams.get('status'); // 'all' | 'published' | 'draft' | 'scheduled'
        const search = searchParams.get('search') || '';
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '50', 10);
        const offset = (page - 1) * limit;

        let query = supabase
            .from('blog_posts')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (status && status !== 'all') {
            query = query.eq('status', status);
        }

        if (search) {
            query = query.ilike('title', `%${search}%`);
        }

        const { data, error, count } = await query;

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Also get counts per status for tabs
        const { data: countData } = await supabase
            .from('blog_posts')
            .select('status');

        const counts = {
            all: countData?.length || 0,
            published: countData?.filter(r => r.status === 'published').length || 0,
            draft: countData?.filter(r => r.status === 'draft').length || 0,
            scheduled: countData?.filter(r => r.status === 'scheduled').length || 0,
        };

        return NextResponse.json({ data, count, counts });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const authResult = await requireAdminAuth(request);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const supabase = await createSupabaseServerClient();
        const body = await request.json();

        const now = new Date().toISOString();

        const payload = {
            title: body.title || '',
            slug: body.slug || '',
            content: body.content || '',
            excerpt: body.excerpt || '',
            cover_image: body.cover_image || '',
            author: body.author || '',
            category: body.category || '',
            status: body.status || 'draft',
            published_at: body.status === 'published' ? now : body.published_at || null,
            meta_title: body.meta_title || '',
            meta_description: body.meta_description || '',
            read_time: body.read_time || 0,
            view_count: 0,
            created_at: now,
            updated_at: now,
        };

        const { data, error } = await supabase
            .from('blog_posts')
            .insert(payload)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
