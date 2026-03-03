import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Geçerli bir e-posta adresi giriniz.' }, { status: 400 });
        }

        const supabase = await createSupabaseServerClient();

        const { error } = await supabase
            .from('newsletter_subscribers')
            .insert({ email });

        // Ignore conflict errors if already subscribed
        if (error && error.code !== '23505') {
            console.error('[Newsletter] Error:', error);
            // We ignore it silently so user sees success anyway, but we log it
        }

        return NextResponse.json({ success: true, message: 'Bültene başarıyla abone oldunuz.' });
    } catch (err: any) {
        console.error('[Newsletter] Internal Error:', err);
        return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
    }
}
