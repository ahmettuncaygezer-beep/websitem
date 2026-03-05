import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

/**
 * POST /api/email/test
 * Sends a test email to verify SMTP/Resend configuration.
 * Body: { to }
 */
export async function POST(req: Request) {
    try {
        const { to } = await req.json();

        if (!to) {
            return NextResponse.json({ error: 'Alıcı e-posta adresi gereklidir.' }, { status: 400 });
        }

        const subject = 'SELIS — Test E-postası ✓';
        const html = `
        <div style="font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="text-align: center; padding: 32px 20px 24px; border-bottom: 1px solid #E8E2DB;">
                <h1 style="font-family: Georgia, 'Times New Roman', serif; color: #1C1C1E; font-size: 28px; letter-spacing: 4px; margin: 0;">SELIS</h1>
                <p style="color: #C9A96E; font-size: 10px; letter-spacing: 3px; margin: 4px 0 0; text-transform: uppercase;">Premium Mobilya & Dekorasyon</p>
            </div>
            <div style="padding: 32px 24px;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #E8F5E9, #C8E6C9); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 32px;">✓</div>
                </div>
                <h2 style="color: #1C1C1E; font-size: 22px; text-align: center; margin: 0 0 12px;">Test E-postası Başarılı!</h2>
                <p style="color: #6B6560; font-size: 14px; text-align: center; line-height: 1.6;">
                    Bu mesaj, SELIS e-posta sisteminizin düzgün çalıştığını doğrulamak için gönderilmiştir.
                </p>
                <div style="background: #FAF8F5; border-radius: 12px; padding: 20px; margin: 24px 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="color: #6B6560; font-size: 13px; padding: 6px 0;">Alıcı</td>
                            <td style="color: #1C1C1E; font-size: 13px; padding: 6px 0; text-align: right; font-weight: bold;">${to}</td>
                        </tr>
                        <tr>
                            <td style="color: #6B6560; font-size: 13px; padding: 6px 0;">Gönderim Zamanı</td>
                            <td style="color: #1C1C1E; font-size: 13px; padding: 6px 0; text-align: right; font-weight: bold;">${new Date().toLocaleString('tr-TR')}</td>
                        </tr>
                        <tr>
                            <td style="color: #6B6560; font-size: 13px; padding: 6px 0;">API</td>
                            <td style="color: #C9A96E; font-size: 13px; padding: 6px 0; text-align: right; font-weight: bold;">${resend ? 'Resend' : 'Simüle'}</td>
                        </tr>
                    </table>
                </div>
                <p style="color: #9C9590; font-size: 12px; text-align: center;">
                    Bu otomatik bir test mesajıdır. Yanıtlamanız gerekmez.
                </p>
            </div>
            <div style="padding: 24px; border-top: 1px solid #E8E2DB; text-align: center;">
                <p style="color: #9C9590; font-size: 11px; margin: 0;">SELIS HOME CONCEPT — Premium Mobilya & Ev Dekorasyonu</p>
            </div>
        </div>`;

        let status = 'sent';
        let errorMessage: string | null = null;

        if (resend) {
            const { error } = await resend.emails.send({
                from: 'SELIS <onboarding@resend.dev>',
                to: [to],
                subject,
                html,
            });

            if (error) {
                status = 'failed';
                errorMessage = typeof error === 'string' ? error : (error as any).message || JSON.stringify(error);
            }
        } else {
            status = 'simulated';
            console.log(`[Email Test] ⚠️ No RESEND_API_KEY. Simulating test email to: ${to}`);
        }

        // Log to history
        try {
            const supabase = await createSupabaseServerClient();
            await supabase.from('email_send_history').insert({
                type: 'test',
                to_email: to,
                subject,
                status,
                error_message: errorMessage,
                metadata: { source: 'admin_test' }
            });
        } catch (historyErr) {
            console.warn('[Email Test] Could not log to history:', historyErr);
        }

        if (status === 'failed') {
            return NextResponse.json({
                success: false,
                error: 'Test maili gönderilemedi.',
                details: errorMessage
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: status === 'simulated'
                ? 'Test maili simüle edildi (RESEND_API_KEY tanımlı değil).'
                : 'Test maili başarıyla gönderildi!',
            status
        });
    } catch (err: any) {
        console.error('[Email Test] Error:', err);
        return NextResponse.json({ error: 'Test maili gönderilemedi.' }, { status: 500 });
    }
}
