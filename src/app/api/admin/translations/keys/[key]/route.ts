import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAdminServerSession } from '@/lib/admin-auth';

// ── DELETE: Tüm Dillerdeki Bir Key'i Sil ──────────────────────────────────────
export async function DELETE(req: Request, { params }: { params: { key: string } }) {
    try {
        const session = await getAdminServerSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { key } = await params;

        const { error } = await supabase
            .from('translations')
            .delete()
            .eq('key', key);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
