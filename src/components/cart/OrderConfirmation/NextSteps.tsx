'use client';

import { Box, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function NextSteps() {
    const steps = [
        {
            title: 'Siparişi Takip Et',
            desc: 'Hazırlık süreci başladığında takip numaranız SMS ile iletilecek.',
            icon: Box,
            cta: 'Hesabıma Git',
            href: '/hesabim/siparisler'
        },
        {
            title: 'Mağazamızı Gezin',
            desc: 'Yeni koleksiyonlarımıza ve sezonun hit parçalarına göz atın.',
            icon: Star,
            cta: 'Keşfetmeye Devam Et',
            href: '/'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-[#E8E3DC] shadow-sm flex flex-col items-center text-center group">
                    <div className="w-12 h-12 bg-[#F5F0EB] rounded-full flex items-center justify-center text-[#C9A96E] mb-4 group-hover:scale-110 transition-transform">
                        <step.icon size={24} />
                    </div>
                    <h4 className="text-[14px] font-bold text-[#1C1C1E] uppercase tracking-wider mb-2">{step.title}</h4>
                    <p className="text-[12px] text-[#999] leading-relaxed mb-6">
                        {step.desc}
                    </p>
                    <Link
                        href={step.href}
                        className="mt-auto w-full py-3 border border-[#1C1C1E] text-[#1C1C1E] text-[11px] font-bold uppercase tracking-widest rounded-[4px] hover:bg-[#1C1C1E] hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        {step.cta} <ArrowRight size={14} />
                    </Link>
                </div>
            ))}
        </div>
    );
}
