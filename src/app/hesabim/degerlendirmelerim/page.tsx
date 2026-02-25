'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { mockReviews } from '@/data/mock-account';
import { AccountHeader } from '@/components/Account/AccountHeader';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function DegerlendirmelerimPage() {
    const [tab, setTab] = useState<'published' | 'pending'>('published');

    const published = mockReviews.filter((r) => r.status === 'published');
    const pending = mockReviews.filter((r) => r.status === 'pending');
    const reviews = tab === 'published' ? published : pending;

    // Star renderer
    const Stars = ({ count }: { count: number }) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={14}
                    fill={i <= count ? '#C9A96E' : 'none'}
                    color={i <= count ? '#C9A96E' : '#E0E0E0'}
                />
            ))}
        </div>
    );

    return (
        <div>
            <AccountHeader title="Değerlendirmelerim" breadcrumbs={[{ label: 'Değerlendirmelerim' }]} />

            {/* Tabs */}
            <div className="flex gap-3 mb-4">
                {[
                    { key: 'published' as const, label: 'Yayında', count: published.length },
                    { key: 'pending' as const, label: 'Bekleyen', count: pending.length },
                ].map((t) => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-medium rounded-full transition-all duration-200"
                        style={{
                            background: tab === t.key ? '#1C1C1E' : 'white',
                            color: tab === t.key ? 'white' : '#666',
                            border: `1px solid ${tab === t.key ? '#1C1C1E' : '#E8E3DC'}`,
                            cursor: 'pointer',
                        }}
                    >
                        {t.label}
                        <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                            style={{ background: tab === t.key ? '#C9A96E' : '#F0EDE8', color: tab === t.key ? '#1C1C1E' : '#999' }}
                        >
                            {t.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Reviews */}
            {reviews.length === 0 ? (
                <div className="text-center py-16" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                    <p className="text-5xl mb-4">💬</p>
                    <p className="text-[15px] font-semibold" style={{ color: '#1C1C1E' }}>Değerlendirme yok</p>
                    <p className="text-[13px]" style={{ color: '#999' }}>Bu kategoride değerlendirmeniz bulunmuyor.</p>
                </div>
            ) : (
                reviews.map((review) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 mb-3"
                        style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}
                    >
                        {/* Product info */}
                        <div className="flex gap-3 mb-3">
                            <div className="w-14 h-14 rounded flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${review.productImage})`, backgroundColor: '#F0EDE8' }} />
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-medium" style={{ color: '#1C1C1E' }}>{review.productName}</p>
                                <Stars count={review.rating} />
                                <p className="text-[11px] mt-1" style={{ color: '#999' }}>
                                    {format(new Date(review.createdAt), 'd MMMM yyyy', { locale: tr })}
                                </p>
                            </div>
                            <span
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full h-fit"
                                style={{
                                    background: review.status === 'published' ? '#E8F5E9' : '#FFF8E1',
                                    color: review.status === 'published' ? '#4CAF50' : '#F59E0B',
                                }}
                            >
                                {review.status === 'published' ? 'Yayında' : 'İnceleniyor'}
                            </span>
                        </div>

                        {/* Title & content */}
                        <h4 className="text-[14px] font-semibold mb-1" style={{ color: '#1C1C1E' }}>{review.title}</h4>
                        <p className="text-[13px] leading-relaxed" style={{ color: '#666' }}>{review.content}</p>

                        {/* Likes */}
                        {review.status === 'published' && (
                            <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid #F5F0EB' }}>
                                <span className="flex items-center gap-1 text-[12px]" style={{ color: '#999' }}>
                                    <ThumbsUp size={12} /> {review.helpfulCount} Beğeni
                                </span>
                            </div>
                        )}
                    </motion.div>
                ))
            )}
        </div>
    );
}
