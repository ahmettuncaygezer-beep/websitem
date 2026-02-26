'use client';

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { EmailTemplateList } from '@/components/Admin/Email/EmailTemplateList';
import { EmailTemplatePreview } from '@/components/Admin/Email/EmailTemplatePreview';
import { mockTemplates } from '@/lib/mock/email';
import { EmailTemplate } from '@/types/email';

export default function EmailTemplatesPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

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
                <p className="text-sm text-[#AEAEB2]">Otomatik gönderilen işlem e-postalarını düzenleyin ve önizleyin</p>
            </div>

            <EmailTemplateList
                templates={mockTemplates}
                onPreview={(tpl) => setSelectedTemplate(tpl)}
            />

            <EmailTemplatePreview
                template={selectedTemplate}
                onClose={() => setSelectedTemplate(null)}
            />
        </div>
    );
}
