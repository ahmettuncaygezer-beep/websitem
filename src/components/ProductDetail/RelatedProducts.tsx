'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/components/ProductCard/product.types';
import { useGlobal } from '@/context/GlobalContext';

interface RelatedProductsProps {
    products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    const { t, formatPrice } = useGlobal();
    if (!products || products.length === 0) return null;

    return (
        <section className="mt-16 pt-12 border-t border-border">
            <h2 data-lang-key="pdp_similar_products" className="text-2xl mb-6 text-foreground font-normal" style={{ fontFamily: 'var(--font-playfair, serif)' }}>{t('pdp_similar_products')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((p) => (
                    <Link key={p.slug} href={`/urun/${p.slug}`}
                        className="group block overflow-hidden transition-shadow duration-200 border border-border rounded-sm"
                        style={{ textDecoration: 'none' }}>
                        <div className="relative overflow-hidden bg-muted aspect-[3/4]">
                            <Image src={p.colors?.[0]?.image || p.images?.[0] || '/images/products/luna-sofa.jpg'} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:768px) 50vw, 25vw" />
                        </div>
                        <div className="p-3">
                            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#C9A96E' }}>{p.brand}</p>
                            <p className="text-[13px] font-medium truncate text-foreground">{p.name}</p>
                            <p className="text-[14px] font-bold mt-1 text-foreground">{formatPrice(p.price)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
