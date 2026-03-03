import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

/**
 * POST /api/email
 * Sends transactional emails via Resend.
 * Body: { type, to, data }
 */
export async function POST(req: Request) {
    try {
        const { type, to, data } = await req.json();

        if (!type || !to) {
            return NextResponse.json({ error: 'type and to are required' }, { status: 400 });
        }

        const emailContent = generateEmailContent(type, data);

        if (resend) {
            const { error } = await resend.emails.send({
                from: 'SELIS <onboarding@resend.dev>',
                to: [to],
                subject: emailContent.subject,
                html: emailContent.html,
            });

            if (error) {
                console.error('[Email] Resend error:', error);
                return NextResponse.json({ error: 'E-posta gönderilemedi.' }, { status: 500 });
            }

            console.log(`[Email] ✅ Sent ${type} → ${to}`);
        } else {
            console.log(`[Email] ⚠️ No RESEND_API_KEY, logging: ${type} → ${to}`);
        }

        return NextResponse.json({ success: true, message: 'E-posta gönderildi.' });
    } catch (err: any) {
        console.error('[Email] Error:', err);
        return NextResponse.json({ error: 'E-posta gönderilemedi.' }, { status: 500 });
    }
}

// ── Email Templates ──────────────────────────────────────────────────
function generateEmailContent(type: string, data: any): { subject: string; html: string } {
    const wrapper = (content: string) => `
        <div style="font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="text-align: center; padding: 32px 20px 24px; border-bottom: 1px solid #E8E2DB;">
                <h1 style="font-family: Georgia, 'Times New Roman', serif; color: #1C1C1E; font-size: 28px; letter-spacing: 4px; margin: 0;">SELIS</h1>
                <p style="color: #C9A96E; font-size: 10px; letter-spacing: 3px; margin: 4px 0 0; text-transform: uppercase;">Premium Mobilya & Dekorasyon</p>
            </div>
            <div style="padding: 32px 24px;">${content}</div>
            <div style="padding: 24px; border-top: 1px solid #E8E2DB; text-align: center;">
                <p style="color: #9C9590; font-size: 11px; margin: 0;">SELIS HOME CONCEPT — Premium Mobilya & Ev Dekorasyonu</p>
                <p style="color: #C9A96E; font-size: 10px; margin: 8px 0 0;">selismobilya.com</p>
            </div>
        </div>`;

    switch (type) {
        case 'order_confirmation':
            return {
                subject: `Siparisiniz Alindi — ${data?.orderNumber || ''}`,
                html: wrapper(`
                    <div style="text-align: center; margin-bottom: 24px;">
                        <div style="width: 56px; height: 56px; background: #E8F5E9; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 28px;">✓</div>
                    </div>
                    <h2 style="color: #1C1C1E; font-size: 20px; text-align: center; margin: 0 0 8px;">Siparisiniz Alindi</h2>
                    <p style="color: #6B6560; font-size: 14px; text-align: center;">Siparis numaraniz: <strong style="color: #1C1C1E;">${data?.orderNumber}</strong></p>
                    <div style="background: #FAF8F5; border-radius: 12px; padding: 20px; margin: 24px 0;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="color: #6B6560; font-size: 13px; padding: 6px 0;">Toplam</td>
                                <td style="color: #1C1C1E; font-size: 13px; padding: 6px 0; text-align: right; font-weight: bold;">₺${data?.totalAmount?.toLocaleString?.('tr-TR') || data?.totalAmount}</td>
                            </tr>
                            <tr>
                                <td style="color: #6B6560; font-size: 13px; padding: 6px 0;">Durum</td>
                                <td style="color: #C9A96E; font-size: 13px; padding: 6px 0; text-align: right; font-weight: bold;">Hazirlaniyor</td>
                            </tr>
                        </table>
                    </div>
                    <p style="color: #6B6560; font-size: 13px; text-align: center;">Siparisinizdeki gelismeler icin size e-posta ile bilgi verecegiz.</p>
                `),
            };

        case 'welcome':
            return {
                subject: "SELIS'a Hos Geldiniz!",
                html: wrapper(`
                    <h2 style="color: #1C1C1E; font-size: 20px; text-align: center;">Hos Geldiniz, ${data?.firstName || ''}!</h2>
                    <p style="color: #6B6560; font-size: 14px; text-align: center; line-height: 1.6;">
                        SELIS HOME CONCEPT ailesine katildiginiz icin tesekkurler.<br/>
                        Premium koleksiyonumuzu kesfetmek icin hemen baslayin.
                    </p>
                    <div style="text-align: center; margin-top: 24px;">
                        <a href="https://selismobilya.com" style="display: inline-block; background: #1C1C1E; color: #fff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">Alisverise Basla</a>
                    </div>
                `),
            };

        case 'contact_form':
            return {
                subject: `Yeni Iletisim Mesaji — ${data?.subject || 'Genel'}`,
                html: wrapper(`
                    <h2 style="color: #1C1C1E; font-size: 18px;">Yeni Iletisim Formu</h2>
                    <div style="background: #FAF8F5; border-radius: 12px; padding: 20px; margin: 16px 0;">
                        <p style="margin: 8px 0; font-size: 13px;"><strong>Ad:</strong> ${data?.name}</p>
                        <p style="margin: 8px 0; font-size: 13px;"><strong>E-posta:</strong> ${data?.email}</p>
                        <p style="margin: 8px 0; font-size: 13px;"><strong>Telefon:</strong> ${data?.phone || '-'}</p>
                        <p style="margin: 8px 0; font-size: 13px;"><strong>Konu:</strong> ${data?.subject}</p>
                    </div>
                    <div style="background: #f9f9f9; border-left: 3px solid #C9A96E; padding: 16px; margin: 16px 0; border-radius: 4px;">
                        <p style="margin: 0; font-size: 13px; color: #333; line-height: 1.6;">${data?.message}</p>
                    </div>
                `),
            };

        default:
            return {
                subject: 'SELIS Bildirim',
                html: wrapper(`<p style="color: #6B6560;">${JSON.stringify(data)}</p>`),
            };
    }
}
