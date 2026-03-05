'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { EmailTemplateList } from '@/components/Admin/Email/EmailTemplateList';
import { EmailTemplatePreview } from '@/components/Admin/Email/EmailTemplatePreview';
import type { EmailTemplate } from '@/types/email';

// Default system templates (used as fallback if no templates stored in DB)
const DEFAULT_TEMPLATES: EmailTemplate[] = [
    {
        id: 'order-confirmation',
        name: 'Sipariş Onayı',
        description: 'Yeni sipariş alındığında müşteriye gönderilen onay e-postası',
        trigger: 'Sipariş oluşturulduğunda',
        icon: '📦',
        htmlContent: '<h1>Sipariş Onayı</h1><p>Siparişiniz başarıyla alınmıştır.</p>',
    },
    {
        id: 'shipping-notification',
        name: 'Kargo Bildirimi',
        description: 'Sipariş kargoya verildiğinde müşteriye gönderilen bildirim',
        trigger: 'Kargoya verildiğinde',
        icon: '🚚',
        htmlContent: '<h1>Kargoya Verildi</h1><p>Siparişiniz kargoya verilmiştir.</p>',
    },
    {
        id: 'welcome-email',
        name: 'Hoş Geldiniz',
        description: 'Yeni üye kaydında gönderilen karşılama e-postası',
        trigger: 'Üye kaydı yapıldığında',
        icon: '👋',
        htmlContent: '<h1>Hoş Geldiniz!</h1><p>SELIS ailesine katıldığınız için teşekkür ederiz.</p>',
    },
    {
        id: 'password-reset',
        name: 'Şifre Sıfırlama',
        description: 'Şifre sıfırlama talebinde gönderilen e-posta',
        trigger: 'Şifre sıfırlama talebi',
        icon: '🔑',
        htmlContent: '<h1>Şifre Sıfırlama</h1><p>Şifrenizi sıfırlamak için aşağıdaki bağlantıyı kullanın.</p>',
    },
    {
        id: 'order-cancelled',
        name: 'Sipariş İptali',
        description: 'Sipariş iptal edildiğinde müşteriye gönderilen bildirim',
        trigger: 'Sipariş iptal edildiğinde',
        icon: '❌',
        htmlContent: '<h1>Sipariş İptal Edildi</h1><p>Siparişiniz iptal edilmiştir.</p>',
    },
    {
        id: 'review-request',
        name: 'Değerlendirme Talebi',
        description: 'Teslimat sonrası ürün değerlendirmesi istemek için gönderilir',
        trigger: 'Teslimat sonrası (3 gün)',
        icon: '⭐',
        htmlContent: '<h1>Ürünümüzü Değerlendirin</h1><p>Deneyiminizi paylaşmaktan memnuniyet duyarız.</p>',
    },
];

export default function EmailTemplatesPage() {
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTemplates() {
            try {
                const res = await fetch('/api/admin/settings');
                const settings = await res.json();
                if (settings.email_templates && Array.isArray(settings.email_templates) && settings.email_templates.length > 0) {
                    setTemplates(settings.email_templates);
                } else {
                    // Use default templates
                    setTemplates(DEFAULT_TEMPLATES);
                }
            } catch {
                setTemplates(DEFAULT_TEMPLATES);
            } finally {
                setLoading(false);
            }
        }
        fetchTemplates();
    }, []);

    return (
        <div className="p-8 pb-20 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <Link
                    href="/admin/eposta"
                    className="flex items-center gap-2 text-[13px] text-[#636366] hover:text-[#C9A96E] transition-colors group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    E-posta Merkezine Dön
                </Link>
            </div>

            <div className="mb-12">
                <h1 className="text-[32px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif] mb-2">Sistem Şablonları</h1>
                <p className="text-sm text-[#AEAEB2]">
                    {loading ? 'Yükleniyor...' : 'Otomatik gönderilen işlem e-postalarını düzenleyin ve önizleyin'}
                </p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Loader2 size={24} color="#C9A96E" style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </div>
            ) : (
                <EmailTemplateList
                    templates={templates}
                    onPreview={(tpl) => setSelectedTemplate(tpl)}
                />
            )}

            <EmailTemplatePreview
                template={selectedTemplate}
                onClose={() => setSelectedTemplate(null)}
            />
        </div>
    );
}
