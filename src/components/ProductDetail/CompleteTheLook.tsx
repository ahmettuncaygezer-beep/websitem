'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

const LOOK_ITEMS = [
    { id: 'l1', name: 'Luna Sehpa', price: 8990, image: '/images/gallery-4.jpg', slug: 'luna-sehpa' },
    { id: 'l2', name: 'Luna Abajur', price: 2490, image: '/images/gallery-5.jpg', slug: 'luna-abajur' },
    { id: 'l3', name: 'Atlas Halı 200×300', price: 12990, image: '/images/gallery-6.jpg', slug: 'atlas-hali' },
];

export function CompleteTheLook() {
    const total = LOOK_ITEMS.reduce((s, i) => s + i.price, 0);
    const { addItem } = useCart();

    const handleAddAll = () => {
        LOOK_ITEMS.forEach((item) => {
            addItem({
                id: item.id,
                name: item.name,
                brand: 'MAISON',
                price: item.price,
                originalPrice: item.price,
                image: item.image,
                href: `/urun/${item.slug}`
            });
        });
    };

    return (
        <section className="mt-16 pt-12" style={{ borderTop: '1px solid #F0EDE8' }}>
            <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-playfair, serif)', fontWeight: 400, color: '#1C1C1E' }}>Bu Ürünle Kombinle</h2>
            <p className="text-[13px] mb-8" style={{ color: '#999' }}>Mükemmel oturma odası için önerilen parçalar</p>

            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {LOOK_ITEMS.map((item) => (
                    <Link key={item.id} href={`/urun/${item.slug}`}
                        className="shrink-0 group block transition-shadow duration-200"
                        style={{ width: 180, textDecoration: 'none', borderRadius: '2px', border: '1px solid rgba(0,0,0,0.06)' }}>
                        <div className="relative overflow-hidden" style={{ aspectRatio: '1', background: '#F5F0EB' }}>
                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="180px" />
                        </div>
                        <div className="p-3">
                            <p className="text-[13px] font-medium truncate" style={{ color: '#1C1C1E' }}>{item.name}</p>
                            <p className="text-[13px] font-bold mt-1" style={{ color: '#1C1C1E' }}>₺{item.price.toLocaleString('tr-TR')}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <button
                onClick={handleAddAll}
                className="mt-4 w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2 font-semibold tracking-wider uppercase transition-colors duration-200 rounded-sm"
                style={{ fontSize: '12px', background: '#C9A96E', color: 'white', border: 'none', cursor: 'pointer' }}>
                Tümünü Sepete Ekle — ₺{total.toLocaleString('tr-TR')}
            </button>
        </section>
    );
}
