'use client';

import React from 'react';
import { NewsletterEditor } from '@/components/Admin/Email/NewsletterEditor';

export default function NewNewsletterPage() {
    return (
        <div className="flex flex-col h-screen bg-[#0F0F10]">
            <div className="p-8 pt-6 pb-2 border-b border-white/05">
                <h1 className="text-[24px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">Yeni Kampanya Oluştur</h1>
                <p className="text-[13px] text-[#636366]">Abonelerinize özel bültenler hazırlayın</p>
            </div>

            <div className="flex-1 min-h-0">
                <NewsletterEditor />
            </div>
        </div>
    );
}
