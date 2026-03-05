import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requireAdminAuth } from '@/lib/admin-auth';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const { id } = await params;
        const body = await req.json();

        // Build update object with only provided fields
        const updateData: Record<string, any> = { updated_at: new Date().toISOString() };
        if (body.name !== undefined) updateData.name = body.name;
        if (body.season !== undefined) updateData.season = body.season;
        if (body.is_active !== undefined) updateData.is_active = body.is_active;

        const { data, error } = await supabase
            .from('lookbook_collections')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ data });
    } catch (err: any) {
        console.error('Error updating lookbook collection:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const authResult = await requireAdminAuth(req);
    if (authResult instanceof NextResponse) return authResult;

    try {
        const { id } = await params;

        const { error } = await supabase
            .from('lookbook_collections')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Error deleting lookbook collection:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
