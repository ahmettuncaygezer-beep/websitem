'use client';

import Image from 'next/image';
import Link from 'next/link';

const RELATED = [
    { slug: 'atlas-kose-koltuk', name: 'Atlas Köşe Koltuk', brand: 'MAISON', price: 64990, image: '/images/gallery-1.jpg' },
    { slug: 'nova-3lu-koltuk', name: 'Nova 3\'lü Koltuk', brand: 'MAISON', price: 42990, image: '/images/gallery-2.jpg' },
    { slug: 'luna-berjer', name: 'Luna Berjer', brand: 'MAISON', price: 18990, image: '/images/gallery-3.jpg' },
    { slug: 'zen-kose-koltuk', name: 'Zen Köşe Koltuk', brand: 'MAISON', price: 79990, image: '/images/gallery-4.jpg' },
];

export function RelatedProducts() {
    return (
        <section className="mt-16 pt-12" style={{ borderTop: '1px solid #F0EDE8' }}>
            <h2 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-playfair, serif)', fontWeight: 400, color: '#1C1C1E' }}>Benzer Ürünler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {RELATED.map((p) => (
                    <Link key={p.slug} href={`/urun/${p.slug}`}
                        className="group block overflow-hidden transition-shadow duration-200"
                        style={{ textDecoration: 'none', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.06)' }}>
                        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: '#F5F0EB' }}>
                            <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:768px) 50vw, 25vw" />
                        </div>
                        <div className="p-3">
                            <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#C9A96E' }}>{p.brand}</p>
                            <p className="text-[13px] font-medium truncate" style={{ color: '#1C1C1E' }}>{p.name}</p>
                            <p className="text-[14px] font-bold mt-1" style={{ color: '#1C1C1E' }}>₺{p.price.toLocaleString('tr-TR')}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
