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
        <div className="py-6 border-b border-border">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-selis-gold text-white">
                        {review.initials}
                    </div>
                    <div>
                        <span className="text-[13px] font-medium text-foreground">{review.author}</span>
                        {review.verified && (
                            <span className="ml-2 text-[11px] text-green-600 dark:text-green-400">✓ Doğrulanmış Satın Alma</span>
                        )}
                    </div>
                </div>
                <span className="text-[11px] text-muted-foreground">{review.date}</span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill={i < review.rating ? 'var(--selis-gold)' : 'transparent'} stroke={i < review.rating ? 'var(--selis-gold)' : 'var(--border)'} strokeWidth={1.5} />
                ))}
            </div>

            {/* Content */}
            <h4 className="text-[14px] font-medium mt-2 text-foreground">{review.title}</h4>
            <p className="text-[13px] leading-relaxed mt-2 text-muted-foreground">{review.text}</p>

            {/* Variant */}
            {review.variant && (
                <p className="text-[11px] mt-2 text-muted-foreground">Satın alınan: {review.variant}</p>
            )}

            {/* Helpful */}
            <div className="flex items-center gap-4 mt-3">
                <span className="text-[12px] text-muted-foreground">Yararlı mıydı?</span>
                <button onClick={() => { if (voted !== 'up') { setVoted('up'); setHelpful((h) => h + 1); } }}
                    className={`flex items-center gap-1 text-[12px] transition-colors duration-150 bg-transparent border-none cursor-pointer
                        ${voted === 'up' ? 'text-selis-gold' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <ThumbsUp size={12} /> Evet ({helpfulCount})
                </button>
                <button onClick={() => { if (voted !== 'down') { setVoted('down'); setUnhelpful((h) => h + 1); } }}
                    className={`flex items-center gap-1 text-[12px] transition-colors duration-150 bg-transparent border-none cursor-pointer
                        ${voted === 'down' ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <ThumbsDown size={12} /> Hayır ({unhelpfulCount})
                </button>
            </div>
        </div>
    );
}
