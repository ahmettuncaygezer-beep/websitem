import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase
            .from('newsletter_campaigns')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json(data || []);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const body = await req.json();
        const { id, subject, target_audience, content_blocks, status } = body;

        const campaignData = {
            subject,
            target_audience: target_audience || 'Tüm Aboneler',
            content_blocks: content_blocks || [],
            status: status || 'draft',
            sent_at: status === 'sent' ? new Date().toISOString() : null
        };

        let result;
        if (id) {
            result = await supabase
                .from('newsletter_campaigns')
                .update(campaignData)
                .eq('id', id)
                .select()
                .single();
        } else {
            result = await supabase
                .from('newsletter_campaigns')
                .insert(campaignData)
                .select()
                .single();
        }

        if (result.error) throw result.error;

        // If status is 'sent', mock the sending process
        if (status === 'sent') {
            const { count } = await supabase
                .from('newsletter_subscribers')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'active');

            await supabase
                .from('newsletter_campaigns')
                .update({
                    stats: {
                        sent_count: count || 0,
                        open_rate: 0,
                        click_rate: 0
                    }
                })
                .eq('id', result.data.id);
        }

        return NextResponse.json(result.data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const supabase = await createSupabaseServerClient();
        const { error } = await supabase
            .from('newsletter_campaigns')
            .delete()
            .eq('id', id)
            .eq('status', 'draft'); // Only delete drafts

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
