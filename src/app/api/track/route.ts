import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { pathname, search, sessionId, userAgent, referrer } = body;

        if (!pathname || !sessionId) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        const supabase = await createSupabaseServerClient();

        // Check for authenticated user (optional)
        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from('page_views')
            .insert({
                pathname,
                query_params: search || '',
                session_id: sessionId,
                user_id: user?.id || null,
                user_agent: userAgent || '',
                referrer: referrer || '',
                ip_address: req.headers.get('x-forwarded-for') || 'unknown'
            });

        if (error) {
            // Note: If the table doesn't exist yet, this will fail.
            // We log it but return 200 to not break the frontend tracker.
            console.error('[Track API] Database error:', error.message);
            return NextResponse.json({ error: error.message }, { status: 200 });
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('[Track API] Error:', err.message);
        return NextResponse.json({ error: err.message }, { status: 200 });
    }
}
