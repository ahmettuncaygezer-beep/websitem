'use client';

import React from 'react';
import { EmailTemplate } from '@/types/email';
import {
    ShoppingBag, Truck, CheckCircle,
    Key, UserPlus, Mail, Eye, Edit2
} from 'lucide-react';

interface EmailTemplateListProps {
    templates: EmailTemplate[];
    onPreview: (template: EmailTemplate) => void;
}

const iconMap: Record<string, any> = {
    ShoppingBag, Truck, CheckCircle, Key, UserPlus, Mail
};

export function EmailTemplateList({ templates, onPreview }: EmailTemplateListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
                const Icon = iconMap[template.icon] || Mail;
                return (
                    <div key={template.id} className="bg-[#1C1C1E] border border-white/[0.06] p-6 rounded-sm hover:border-[#C9A96E]/30 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E]">
                                <Icon size={24} />
                            </div>
                            <div className="text-[10px] font-bold text-[#636366] uppercase tracking-wider bg-white/05 px-2 py-1 rounded-sm">
                                {template.trigger}
                            </div>
                        </div>

                        <h3 className="text-[16px] font-semibold text-[#F5F0EB] mb-2">{template.name}</h3>
                        <p className="text-[13px] text-[#636366] mb-8 leading-relaxed">
                            {template.description}
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => onPreview(template)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] hover:bg-white/05 text-[#AEAEB2] hover:text-[#F5F0EB] text-[12px] font-semibold rounded-sm transition-all"
                            >
                                <Eye size={14} /> Önizle
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] hover:bg-white/05 text-[#AEAEB2] hover:text-[#F5F0EB] text-[12px] font-semibold rounded-sm transition-all">
                                <Edit2 size={14} /> Düzenle
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
