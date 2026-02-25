'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Review {
    id: string;
    author: string;
    initials: string;
    verified: boolean;
    date: string;
    rating: number;
    title: string;
    text: string;
    variant?: string;
    helpful: number;
    unhelpful: number;
}

interface Props { review: Review; }

export function ReviewCard({ review }: Props) {
    const [helpfulCount, setHelpful] = useState(review.helpful);
    const [unhelpfulCount, setUnhelpful] = useState(review.unhelpful);
    const [voted, setVoted] = useState<'up' | 'down' | null>(null);

    return (
        <div className="py-6" style={{ borderBottom: '1px solid #F0EDE8' }}>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium" style={{ background: '#C9A96E', color: 'white' }}>
                        {review.initials}
                    </div>
                    <div>
                        <span className="text-[13px] font-medium" style={{ color: '#1C1C1E' }}>{review.author}</span>
                        {review.verified && (
                            <span className="ml-2 text-[11px]" style={{ color: '#4CAF50' }}>✓ Doğrulanmış Satın Alma</span>
                        )}
                    </div>
                </div>
                <span className="text-[11px]" style={{ color: '#999' }}>{review.date}</span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill={i < review.rating ? '#C9A96E' : 'transparent'} stroke={i < review.rating ? '#C9A96E' : '#DDD'} strokeWidth={1.5} />
                ))}
            </div>

            {/* Content */}
            <h4 className="text-[14px] font-medium mt-2" style={{ color: '#1C1C1E' }}>{review.title}</h4>
            <p className="text-[13px] leading-relaxed mt-2" style={{ color: '#444' }}>{review.text}</p>

            {/* Variant */}
            {review.variant && (
                <p className="text-[11px] mt-2" style={{ color: '#999' }}>Satın alınan: {review.variant}</p>
            )}

            {/* Helpful */}
            <div className="flex items-center gap-4 mt-3">
                <span className="text-[12px]" style={{ color: '#999' }}>Yararlı mıydı?</span>
                <button onClick={() => { if (voted !== 'up') { setVoted('up'); setHelpful((h) => h + 1); } }}
                    className="flex items-center gap-1 text-[12px] transition-colors duration-150"
                    style={{ color: voted === 'up' ? '#C9A96E' : '#999', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <ThumbsUp size={12} /> Evet ({helpfulCount})
                </button>
                <button onClick={() => { if (voted !== 'down') { setVoted('down'); setUnhelpful((h) => h + 1); } }}
                    className="flex items-center gap-1 text-[12px] transition-colors duration-150"
                    style={{ color: voted === 'down' ? '#E53935' : '#999', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <ThumbsDown size={12} /> Hayır ({unhelpfulCount})
                </button>
            </div>
        </div>
    );
}
