'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { RecommendedProduct } from './types/ai.types';

interface Props { products: RecommendedProduct[]; }

export function ChatProductCard({ products }: Props) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 px-1" style={{ scrollbarWidth: 'none' }}>
            {products.map((p) => (
                <Link key={p.id} href={p.href || '#'}
                    className="flex-shrink-0 overflow-hidden transition-all duration-250 block"
                    style={{ width: 160, borderRadius: 8, background: 'white', border: '1px solid #E8E3DC', textDecoration: 'none' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,169,110,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8E3DC'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                    {/* Image */}
                    <div className="relative" style={{ aspectRatio: '4/3' }}>
                        <Image src={p.image} alt={p.name} fill className="object-cover" sizes="160px" />
                        {/* Match badge */}
                        <span className="absolute" style={{ top: 8, left: 8, background: '#FDF8F0', color: '#C9A96E', fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 9999 }}>
                            🎯 %{p.matchScore} Uyum
                        </span>
                    </div>

                    <div style={{ padding: '8px 10px' }}>
                        <p className="line-clamp-2" style={{ fontSize: 12, fontWeight: 500, color: '#1C1C1E', lineHeight: 1.4 }}>{p.name}</p>
                        {p.matchReason && (
                            <p style={{ fontSize: 10, color: '#999', fontStyle: 'italic', marginTop: 2 }}>{p.matchReason}</p>
                        )}
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#1C1C1E', marginTop: 4 }}>₺{p.price.toLocaleString('tr-TR')}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
