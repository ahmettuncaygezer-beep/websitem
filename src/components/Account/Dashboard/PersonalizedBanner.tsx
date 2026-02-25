'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export function PersonalizedBanner() {
    const user = useAuthStore((s) => s.user);
    const style = user?.styleProfile || 'minimalist';

    const banners: Record<string, { title: string; subtitle: string; gradient: string }> = {
        minimalist: {
            title: 'Minimalist Tarzınıza Uygun Yeni Gelenler',
            subtitle: 'Bu hafta 8 yeni ürün eklendi',
            gradient: 'linear-gradient(135deg, #F5F0EB 0%, #E8E3DC 100%)',
        },
        klasik: {
            title: 'Klasik Zarafet Koleksiyonu',
            subtitle: 'Sizin için seçilen 12 ürün',
            gradient: 'linear-gradient(135deg, #FDF8F0 0%, #F0E4CC 100%)',
        },
        modern: {
            title: 'Modern Tasarım Trendleri',
            subtitle: '6 yeni modern ürün keşfedin',
            gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
        },
        bohem: {
            title: 'Bohem Ruhunuza Hitap Eden Parçalar',
            subtitle: 'El yapımı koleksiyonda 5 yeni ürün',
            gradient: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
        },
    };

    const banner = banners[style];

    return (
        <div className="mt-6 p-6 relative overflow-hidden" style={{ background: banner.gradient, borderRadius: '8px' }}>
            <h3 className="text-[15px] font-semibold" style={{ color: '#1C1C1E', fontFamily: 'var(--font-playfair)' }}>
                {banner.title}
            </h3>
            <p className="text-[13px] mt-1" style={{ color: '#666' }}>{banner.subtitle} →</p>
            <Link
                href="/kategori/oturma-odasi"
                className="inline-block mt-3 px-4 py-2 text-[12px] font-semibold"
                style={{ background: '#1C1C1E', color: 'white', borderRadius: '6px' }}
            >
                Keşfet
            </Link>
        </div>
    );
}
