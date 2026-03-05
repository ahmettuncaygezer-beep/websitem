'use client';

import React, { useEffect, useState } from 'react';
import { ReviewStats } from '@/components/Admin/Reviews/ReviewStats';
import { ReviewList } from '@/components/Admin/Reviews/ReviewList';
import { RefreshCcw } from 'lucide-react';
import type { Review } from '@/types/reviews';

export default function ReviewManagementPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, averageRating: 0, total: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch('/api/admin/reviews');
                const data = await res.json();
                if (data.reviews && data.reviews.length > 0) {
                    setReviews(data.reviews.map((r: any) => ({
                        id: r.id,
                        productId: r.product_id,
                        productName: r.product_name || 'Ürün',
                        productImage: '',
                        userId: r.user_id,
                        userName: r.user_name || 'Anonim',
                        isVerifiedPurchase: true,
                        rating: r.rating || 5,
                        content: r.comment || '',
                        status: r.is_approved ? 'approved' : 'pending',
                        helpfulCount: 0,
                        createdAt: r.created_at,
                        updatedAt: r.created_at,
                    })));
                    const approved = data.reviews.filter((r: any) => r.is_approved).length;
                    setStats({
                        pending: data.total - approved,
                        approved,
                        rejected: 0,
                        averageRating: data.reviews.reduce((s: number, r: any) => s + (r.rating || 0), 0) / data.reviews.length || 0,
                        total: data.total,
                    });
                }
            } catch { /* keep mock */ }
            finally { setLoading(false); }
        }
        fetchReviews();
    }, []);

    return (
        <div className="p-8 pb-20">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">Yorumlar & Değerlendirmeler</h1>
                    <p className="text-sm text-[#636366] mt-1">
                        {loading ? 'Yükleniyor...' : 'Müşterilerinizden gelen ürün geri bildirimlerini yönetin'}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-[12px] font-bold text-[#636366] hover:text-[#C9A96E] transition-all bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-sm">
                        <RefreshCcw size={14} />
                        Otomatik Yenile (30sn)
                    </button>
                </div>
            </div>
            <ReviewStats stats={stats} />
            <ReviewList initialReviews={reviews} />
        </div>
    );
}
