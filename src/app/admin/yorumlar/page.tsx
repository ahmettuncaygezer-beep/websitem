'use client';

import React from 'react';
import { ReviewStats } from '@/components/Admin/Reviews/ReviewStats';
import { ReviewList } from '@/components/Admin/Reviews/ReviewList';
import { mockReviews, mockReviewStats } from '@/lib/mock/reviews';
import { RefreshCcw } from 'lucide-react';

export default function ReviewManagementPage() {
    return (
        <div className="p-8 pb-20">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">Yorumlar & Değerlendirmeler</h1>
                    <p className="text-sm text-[#636366] mt-1">Müşterilerinizden gelen ürün geri bildirimlerini yönetin</p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-[12px] font-bold text-[#636366] hover:text-[#C9A96E] transition-all bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-sm">
                        <RefreshCcw size={14} />
                        Otomatik Yenile (30sn)
                    </button>
                </div>
            </div>

            {/* Stats */}
            <ReviewStats stats={mockReviewStats} />

            {/* Main List */}
            <ReviewList initialReviews={mockReviews} />
        </div>
    );
}
