'use client';

import { Star, Share2 } from 'lucide-react';

interface Props { brand?: string; name: string; sku: string; rating?: { average: number; count: number }; slug: string; }

export function ProductTitle({ brand, name, sku, rating, slug }: Props) {
    const average = rating?.average || 4.8;
    const count = rating?.count || 127;
    const full = Math.floor(average);
    const hasHalf = average - full >= 0.3;

    const handleShare = async () => {
        if (navigator.share) {
            await navigator.share({ title: name, url: window.location.href });
        } else {
            await navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div>
            {/* Brand + SKU */}
            <div className="flex items-center justify-between">
                <span className="uppercase font-medium" style={{ fontSize: '11px', letterSpacing: '0.25em', color: '#C9A96E' }}>{brand}</span>
                <span style={{ fontSize: '11px', color: '#999' }}>SKU: {sku}</span>
            </div>

            {/* Name */}
            <h1 className="mt-2 text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)', fontWeight: 400, color: '#1C1C1E', lineHeight: 1.15 }}>
                {name}
            </h1>

            {/* Rating + Share */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14}
                            fill={i < full ? '#C9A96E' : (i === full && hasHalf ? '#C9A96E' : 'transparent')}
                            stroke={i < full || (i === full && hasHalf) ? '#C9A96E' : '#DDD'}
                            strokeWidth={1.5}
                            style={i === full && hasHalf ? { clipPath: 'inset(0 50% 0 0)' } : undefined}
                        />
                    ))}
                </div>
                <span className="text-sm font-bold" style={{ color: '#1C1C1E' }}>{average}</span>
                <a href={`/urun/${slug}#reviews`} className="text-sm transition-colors duration-150" style={{ color: '#999', textDecoration: 'none' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A96E'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#999'; }}>
                    ({count} değerlendirme)
                </a>
                <span style={{ color: '#DDD' }}>|</span>
                <button onClick={handleShare} aria-label="Paylaş" className="flex items-center gap-1 transition-colors duration-150" style={{ color: '#999', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
                    <Share2 size={14} /> Paylaş
                </button>
            </div>
        </div>
    );
}
