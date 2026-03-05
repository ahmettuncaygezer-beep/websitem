import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { requireAdminAuth } from '@/lib/admin-auth';
import { hasPermission } from '@/lib/permissions';

export const dynamic = 'force-dynamic';

/** GET /api/admin/users — List admin users */
export async function GET(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    if (!hasPermission(authResult.role, 'users.view')) {
        return NextResponse.json({ error: 'Forbidden: Missing users.view permission' }, { status: 403 });
    }

    try {
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from('admin_users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ users: data || [] });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** POST /api/admin/users — Create new admin user (adds to admin_users table) */
export async function POST(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    if (!hasPermission(authResult.role, 'users.manage')) {
        return NextResponse.json({ error: 'Forbidden: Missing users.manage permission' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const supabase = await createSupabaseServerClient();

        const { data, error } = await supabase
            .from('admin_users')
            .insert({
                id: body.id, // must match an existing auth.users id
                email: body.email,
                role: body.role || 'editor',
                is_active: body.is_active ?? true,
                first_name: body.first_name || '',
                last_name: body.last_name || '',
            })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ user: data }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** PUT /api/admin/users — Update admin user (role, is_active) */
export async function PUT(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    if (!hasPermission(authResult.role, 'users.manage')) {
        return NextResponse.json({ error: 'Forbidden: Missing users.manage permission' }, { status: 403 });
    }

    try {
        const { id, role, is_active } = await req.json();
        if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

        const supabase = await createSupabaseServerClient();
        const updateData: any = { updated_at: new Date().toISOString() };
        if (role !== undefined) updateData.role = role;
        if (is_active !== undefined) updateData.is_active = is_active;

        const { data, error } = await supabase
            .from('admin_users')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ user: data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/** DELETE /api/admin/users — Remove admin access (deactivate) */
export async function DELETE(req: Request) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    if (!hasPermission(authResult.role, 'users.delete')) {
        return NextResponse.json({ error: 'Forbidden: Missing users.delete permission' }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

        const supabase = await createSupabaseServerClient();
        // Deactivate rather than hard delete for audit trail
        const { error } = await supabase
            .from('admin_users')
            .update({ is_active: false })
            .eq('id', id);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
