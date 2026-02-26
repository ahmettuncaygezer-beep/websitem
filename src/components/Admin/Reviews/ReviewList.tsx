'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, LayoutGrid, List as ListIcon, MessageSquare } from 'lucide-react';
import { Review } from '@/types/reviews';
import { ReviewCard } from './ReviewCard';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewListProps {
    initialReviews: Review[];
}

export function ReviewList({ initialReviews }: ReviewListProps) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'featured'>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);

    const filteredReviews = useMemo(() => {
        return reviews.filter(rev => {
            const matchesTab = activeTab === 'all' || rev.status === activeTab;
            const matchesSearch = rev.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                rev.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                rev.productName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRating = ratingFilter === null || rev.rating === ratingFilter;

            return matchesTab && matchesSearch && matchesRating;
        });
    }, [reviews, activeTab, searchQuery, ratingFilter]);

    const handleStatusChange = (id: string, newStatus: Review['status']) => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    };

    const tabs = [
        { id: 'all', label: 'Tümü', count: reviews.length },
        { id: 'pending', label: 'Bekleyen', count: reviews.filter(r => r.status === 'pending').length, urgent: true },
        { id: 'approved', label: 'Onaylı', count: reviews.filter(r => r.status === 'approved').length },
        { id: 'rejected', label: 'Reddedilen', count: reviews.filter(r => r.status === 'rejected').length },
        { id: 'featured', label: 'Öne Çıkanlar', count: reviews.filter(r => r.status === 'featured').length },
    ];

    return (
        <div className="space-y-6">
            {/* Tabs & View Mode */}
            <div className="flex items-center justify-between border-b border-white/[0.06] mb-6">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`relative py-4 text-[13px] font-medium transition-all flex items-center gap-2 ${activeTab === tab.id ? 'text-[#C9A96E]' : 'text-[#636366] hover:text-[#AEAEB2]'
                                }`}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${tab.urgent && tab.id === 'pending' ? 'bg-[#FF453A] text-white' : 'bg-white/05 text-[#AEAEB2]'
                                    }`}>
                                    {tab.count}
                                </span>
                            )}
                            {activeTab === tab.id && (
                                <motion.div layoutId="reviewTab" className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#C9A96E]" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex bg-white/[0.04] p-1 rounded-sm border border-white/[0.08]">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-sm transition-all ${viewMode === 'grid' ? 'bg-white/05 text-[#C9A96E]' : 'text-[#636366] hover:text-[#AEAEB2]'}`}
                    >
                        <LayoutGrid size={16} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-sm transition-all ${viewMode === 'list' ? 'bg-white/05 text-[#C9A96E]' : 'text-[#636366] hover:text-[#AEAEB2]'}`}
                    >
                        <ListIcon size={16} />
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-[#1C1C1E]/50 border border-white/[0.06] rounded-sm">
                <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#636366]" />
                    <input
                        type="text"
                        placeholder="Yorum, ürün veya kullanıcı ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-sm pl-10 pr-4 py-2 text-[13px] text-[#F5F0EB] focus:border-[#C9A96E]/40 outline-none"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Star size={14} className="text-[#636366]" />
                        <select
                            className="bg-transparent text-[13px] text-[#AEAEB2] outline-none cursor-pointer"
                            onChange={(e) => setRatingFilter(e.target.value === 'all' ? null : Number(e.target.value))}
                        >
                            <option value="all">Tüm Puanlar</option>
                            <option value="5">5 Yıldız</option>
                            <option value="4">4 Yıldız</option>
                            <option value="3">3 Yıldız</option>
                            <option value="2">2 Yıldız</option>
                            <option value="1">1 Yıldız</option>
                        </select>
                    </div>

                    <div className="w-[1px] h-4 bg-white/[0.08]" />

                    <div className="flex items-center gap-2">
                        <Filter size={14} className="text-[#636366]" />
                        <select className="bg-transparent text-[13px] text-[#AEAEB2] outline-none cursor-pointer">
                            <option value="all">Sıralama: En Yeni</option>
                            <option value="high">En Yüksek Puan</option>
                            <option value="low">En Düşük Puan</option>
                            <option value="helpful">En Faydalı</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Content List/Grid */}
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1' : 'grid-cols-1'}`}>
                <AnimatePresence mode="popLayout">
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map((rev, idx) => (
                            <motion.div
                                key={rev.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2, delay: idx * 0.02 }}
                            >
                                <ReviewCard
                                    review={rev}
                                    onStatusChange={handleStatusChange}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <div className="py-20 text-center bg-[#1C1C1E] border border-white/[0.06] rounded-sm">
                            <MessageSquare className="w-12 h-12 text-[#636366] opacity-20 mx-auto mb-4" />
                            <h3 className="text-[16px] font-semibold text-[#F5F0EB]">Yorum Bulunamadı</h3>
                            <p className="text-sm text-[#636366] mt-1">Kriterlerinize uygun değerlendirme bulunmuyor.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
