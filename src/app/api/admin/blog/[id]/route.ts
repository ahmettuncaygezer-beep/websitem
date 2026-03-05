import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';

interface RouteParams {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const authResult = await requireAdminAuth(request);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const { id } = await params;
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }

        return NextResponse.json({ data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const authResult = await requireAdminAuth(request);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const { id } = await params;
        const supabase = await createSupabaseServerClient();
        const body = await request.json();

        const now = new Date().toISOString();

        const payload: Record<string, any> = {
            updated_at: now,
        };

        const allowedFields = [
            'title', 'slug', 'content', 'excerpt', 'cover_image',
            'author', 'category', 'status', 'published_at',
            'meta_title', 'meta_description', 'read_time',
        ];

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                payload[field] = body[field];
            }
        }

        // Auto-set published_at when publishing
        if (body.status === 'published' && !body.published_at) {
            payload.published_at = now;
        }

        const { data, error } = await supabase
            .from('blog_posts')
            .update(payload)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const authResult = await requireAdminAuth(request);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const { id } = await params;
        const supabase = await createSupabaseServerClient();

        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
