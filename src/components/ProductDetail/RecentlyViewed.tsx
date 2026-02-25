'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRecentlyViewed } from './hooks/useRecentlyViewed';

interface Props { currentProduct?: { id: string; slug: string; name: string; image: string; price: number; brand: string; }; }

export function RecentlyViewed({ currentProduct }: Props) {
    const items = useRecentlyViewed(currentProduct);
    if (items.length === 0) return null;

    return (
        <section className="mt-16 pt-12" style={{ borderTop: '1px solid #F0EDE8' }}>
            <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-playfair, serif)', fontWeight: 400, color: '#1C1C1E' }}>Son İnceledikleriniz</h2>
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
                {items.map((item) => (
                    <Link key={item.id} href={`/urun/${item.slug}`}
                        className="shrink-0 group block transition-shadow duration-200"
                        style={{ width: 160, textDecoration: 'none', scrollSnapAlign: 'start', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.06)' }}>
                        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: '#F5F0EB' }}>
                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="160px" />
                        </div>
                        <div className="p-3">
                            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#C9A96E' }}>{item.brand}</p>
                            <p className="text-[12px] font-medium truncate" style={{ color: '#1C1C1E' }}>{item.name}</p>
                            <p className="text-[13px] font-bold mt-1" style={{ color: '#1C1C1E' }}>₺{item.price.toLocaleString('tr-TR')}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
