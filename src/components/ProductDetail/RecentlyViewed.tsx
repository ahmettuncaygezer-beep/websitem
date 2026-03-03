'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRecentlyViewed } from './hooks/useRecentlyViewed';
import { useGlobal } from '@/context/GlobalContext';

interface Props { currentProduct?: { id: string; slug: string; name: string; image: string; price: number; brand: string; }; }

export function RecentlyViewed({ currentProduct }: Props) {
    const { t, formatPrice } = useGlobal();
    const items = useRecentlyViewed(currentProduct);
    if (items.length === 0) return null;

    return (
        <section className="mt-16 pt-12 border-t border-border">
            <h2 data-lang-key="pdp_recently_viewed" className="text-2xl mb-6 text-foreground font-normal" style={{ fontFamily: 'var(--font-playfair, serif)' }}>{t('pdp_recently_viewed')}</h2>
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
                {items.map((item) => (
                    <Link key={item.id} href={`/urun/${item.slug}`}
                        className="shrink-0 group block transition-shadow duration-200 border border-border rounded-sm overflow-hidden"
                        style={{ width: 160, textDecoration: 'none', scrollSnapAlign: 'start' }}>
                        <div className="relative overflow-hidden bg-muted aspect-[3/4]">
                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="160px" />
                        </div>
                        <div className="p-3">
                            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#C9A96E' }}>{item.brand}</p>
                            <p className="text-[12px] font-medium truncate text-foreground">{item.name}</p>
                            <p className="text-[13px] font-bold mt-1 text-foreground">{formatPrice(item.price)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
