'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SubscriberStats } from '@/components/Admin/Email/SubscriberStats';
import { CampaignResultCard } from '@/components/Admin/Email/CampaignResultCard';
import { SubscriberList } from '@/components/Admin/Email/SubscriberList';
import { mockSubscribers, mockCampaigns } from '@/lib/mock/email';

export default function EmailCenterPage() {
    const stats = {
        total: 8247,
        active: 7891,
        newThisMonth: 342,
        growth: 12.4
    };

    return (
        <div className="p-8 pb-20">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">E-posta & Bülten Merkezi</h1>
                    <p className="text-sm text-[#636366] mt-1">Abone yönetimi ve e-posta kampanyaları</p>
                </div>

                <Link
                    href="/admin/eposta/yeni-bulten"
                    className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10] px-6 py-2.5 rounded-sm text-[13px] font-bold transition-all shadow-[0_4px_20px_rgba(201,169,110,0.2)]"
                >
                    <Plus size={16} />
                    Yeni Bülten Oluştur
                </Link>
            </div>

            {/* Stats */}
            <SubscriberStats stats={stats} />

            {/* Recent Campaigns */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[16px] font-semibold text-[#F5F0EB]">Son Gönderilenler</h3>
                    <Link href="#" className="text-[12px] text-[#C9A96E] hover:underline font-semibold uppercase tracking-wider">Tüm Kampanyalar →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCampaigns.map(camp => (
                        <CampaignResultCard key={camp.id} campaign={camp} />
                    ))}
                </div>
            </div>

            {/* Subscribers Table */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[16px] font-semibold text-[#F5F0EB]">Abone Listesi</h3>
                    <div className="flex gap-4">
                        <Link href="/admin/eposta/sablonlar" className="text-[12px] text-[#636366] hover:text-[#C9A96E] font-semibold uppercase tracking-wider">Sistem Şablonları</Link>
                    </div>
                </div>
                <SubscriberList subscribers={mockSubscribers} />
            </div>
        </div>
    );
}
