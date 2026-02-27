'use client';

import { Star } from 'lucide-react';
import type { ProductRating } from './product.types';

interface ProductCardRatingProps {
    rating?: ProductRating;
    slug: string;
}

export function ProductCardRating({ rating, slug }: ProductCardRatingProps) {
    if (!rating || rating.count === 0) {
        return (
            <div className="mt-2">
                <a
                    href={`/urun/${slug}#reviews`}
                    className="text-[11px] italic transition-colors duration-200"
                    style={{ color: '#C9A96E', textDecoration: 'none' }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.textDecoration = 'none';
                    }}
                    onClick={(e) => e.stopPropagation()}
                    data-lang-key="product_write_review"
                >
                    İlk yorumu yaz
                </a>
            </div>
        );
    }

    const full = Math.floor(rating.average);
    const hasHalf = rating.average - full >= 0.3;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    return (
        <div
            className="flex items-center gap-1.5 mt-2"
            aria-label={`5 üzerinden ${rating.average}, ${rating.count} değerlendirme`}
        >
            <div className="flex items-center gap-0.5">
                {/* Full stars */}
                {Array.from({ length: full }).map((_, i) => (
                    <Star
                        key={`f${i}`}
                        size={12}
                        fill="#C9A96E"
                        stroke="#C9A96E"
                        strokeWidth={1}
                    />
                ))}
                {/* Half star */}
                {hasHalf && (
                    <div className="relative" style={{ width: 12, height: 12 }}>
                        <Star size={12} fill="transparent" stroke="#DDD" strokeWidth={1} />
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: '50%' }}
                        >
                            <Star size={12} fill="#C9A96E" stroke="#C9A96E" strokeWidth={1} />
                        </div>
                    </div>
                )}
                {/* Empty stars */}
                {Array.from({ length: empty }).map((_, i) => (
                    <Star
                        key={`e${i}`}
                        size={12}
                        fill="transparent"
                        stroke="#DDD"
                        strokeWidth={1}
                    />
                ))}
            </div>

            <span
                className="font-semibold"
                style={{ fontSize: '12px', color: '#1C1C1E' }}
            >
                {rating.average}
            </span>

            <a
                href={`/urun/${slug}#reviews`}
                className="transition-colors duration-200"
                style={{ fontSize: '11px', color: '#999', textDecoration: 'none' }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#C9A96E';
                    (e.currentTarget as HTMLElement).style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#999';
                    (e.currentTarget as HTMLElement).style.textDecoration = 'none';
                }}
                onClick={(e) => e.stopPropagation()}
            >
                ({rating.count})
            </a>
        </div>
    );
}
