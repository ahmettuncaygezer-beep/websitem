'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/components/ProductCard/product.types';
import { useGlobal } from '@/context/GlobalContext';

interface CompleteTheLookProps {
    products: Product[];
}

export function CompleteTheLook({ products }: CompleteTheLookProps) {
    const { addItem } = useCart();
    const { t, formatPrice } = useGlobal();

    if (!products || products.length === 0) return null;

    const total = products.reduce((s, i) => s + i.price, 0);

    const handleAddAll = () => {
        products.forEach((item) => {
            addItem({
                id: item.id,
                name: item.name,
                brand: item.brand || 'SELIS',
                price: item.price,
                originalPrice: item.originalPrice ?? item.price,
                image: item.colors?.[0]?.image || item.images?.[0] || '/images/products/luna-sofa.jpg',
                href: `/urun/${item.slug}`
            });
        });
    };

    return (
        <section className="mt-16 pt-12" style={{ borderTop: '1px solid #F0EDE8' }}>
            <h2 data-lang-key="pdp_combine_with" className="text-2xl mb-1" style={{ fontFamily: 'var(--font-playfair, serif)', fontWeight: 400, color: '#1C1C1E' }}>{t('pdp_combine_with')}</h2>
            <p data-lang-key="pdp_combine_desc" className="text-[13px] mb-8" style={{ color: '#999' }}>{t('pdp_combine_desc')}</p>

            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {products.map((item) => (
                    <Link key={item.id} href={`/urun/${item.slug}`}
                        className="shrink-0 group block transition-shadow duration-200"
                        style={{ width: 180, textDecoration: 'none', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.06)' }}>
                        <div className="relative overflow-hidden" style={{ aspectRatio: '1', background: '#F5F0EB' }}>
                            <Image src={item.colors?.[0]?.image || item.images?.[0] || '/images/products/luna-sofa.jpg'} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="180px" />
                        </div>
                        <div className="p-3">
                            <p className="text-[13px] font-medium truncate" style={{ color: '#1C1C1E' }}>{item.name}</p>
                            <p className="text-[13px] font-bold mt-1" style={{ color: '#1C1C1E' }}>{formatPrice(item.price)}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <button
                onClick={handleAddAll}
                className="mt-4 w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2 font-semibold tracking-wider uppercase transition-colors duration-200 rounded-sm"
                style={{ fontSize: '12px', background: '#C9A96E', color: 'white', border: 'none', cursor: 'pointer' }}>
                <span data-lang-key="bundle_add_all_cart">{t('bundle_add_all_cart')}</span> — {formatPrice(total)}
            </button>
        </section>
    );
}
