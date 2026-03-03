import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

/**
 * POST /api/contact
 * Saves a contact form submission and optionally sends notification email.
 */
export async function POST(req: Request) {
    try {
        const { name, email, phone, subject, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Ad, e-posta ve mesaj zorunludur.' }, { status: 400 });
        }

        // Try to save to database
        try {
            const supabase = await createSupabaseServerClient();
            await supabase.from('contact_messages').insert({
                name,
                email,
                phone: phone || null,
                subject: subject || null,
                message,
            });
        } catch {
            // DB might not be configured yet — still log
            console.log('[Contact] Message received:', { name, email, subject });
        }

        // Send notification email to admin (fire-and-forget)
        fetch(`${req.headers.get('origin')}/api/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: 'contact_form',
                to: 'info@selismobilya.com',
                data: { name, email, phone, subject, message },
            }),
        }).catch(() => { /* fire-and-forget */ });

        return NextResponse.json({ success: true, message: 'Mesajınız alındı.' });
    } catch (err: any) {
        console.error('[Contact] Error:', err);
        return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
    }
}
