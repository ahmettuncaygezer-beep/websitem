import type { Metadata } from 'next';
import LookbookPageClient from './LookbookPageClient';
import type { LookbookCardData } from '@/components/Marketing/LookbookCard';

export const metadata: Metadata = {
    title: 'Lookbook 2026 | MAISON Premium Mobilya',
    description: 'MAISON 2026 Koleksiyon Lookbook\'u — Hayalinizdeki evin ilhamı burada.',
    openGraph: {
        title: 'MAISON Lookbook 2026',
        description: 'Editorial fotoğraflar ve hotspot ürün keşfi.',
        type: 'website',
    },
};

export const LOOKBOOK_DATA: LookbookCardData[] = [
    {
        id: '1',
        title: 'Modern Oturma Odası',
        description: 'Luna ailesinin saf zarafeti ile tanışın. Doğal meşe ve premium kumaşın buluştuğu bu konsept, modernitenin özünü yansıtır.',
        imageUrl: '/images/gallery-1.jpg',
        category: 'Oturma Odası',
        hotspots: [
            { id: 'h1', x: 30, y: 55, productName: 'Luna Köşe Koltuk', productPrice: 74990, productImage: '/images/gallery-1.jpg', productHref: '/urun/luna-kose-koltuk' },
            { id: 'h2', x: 60, y: 70, productName: 'Orbit Sehpa', productPrice: 12990, productImage: '/images/gallery-2.jpg', productHref: '/urun/orbit-sehpa' },
            { id: 'h3', x: 75, y: 30, productName: 'Arc Lambader', productPrice: 8490, productImage: '/images/gallery-3.jpg', productHref: '/urun/arc-lambader' },
        ],
    },
    {
        id: '2',
        title: 'Minimalist Yemek Odası',
        description: 'Nova\'nın temiz çizgileri ve Aria sandalyelerinin yumuşak düzlüğü — yemek saatlerini bir ritüele dönüştürür.',
        imageUrl: '/images/gallery-2.jpg',
        category: 'Yemek Odası',
        hotspots: [
            { id: 'h4', x: 40, y: 50, productName: 'Nova Yemek Masası', productPrice: 34990, productImage: '/images/gallery-4.jpg', productHref: '/urun/nova-yemek-masasi' },
            { id: 'h5', x: 25, y: 65, productName: 'Aria Sandalye', productPrice: 9990, productImage: '/images/gallery-5.jpg', productHref: '/urun/aria-sandalye' },
        ],
    },
    {
        id: '3',
        title: 'Huzurlu Yatak Odası',
        description: 'Gün sona erdiğinde ihtiyacınız olan yer. Serene Platform Yatak ve Mist komodinleri ile mükemmel uyku ortamı.',
        imageUrl: '/images/gallery-3.jpg',
        category: 'Yatak Odası',
        hotspots: [
            { id: 'h6', x: 45, y: 40, productName: 'Serene Platform Yatak', productPrice: 54990, productImage: '/images/gallery-6.jpg', productHref: '/urun/serene-platform-yatak' },
            { id: 'h7', x: 20, y: 60, productName: 'Mist Komodin', productPrice: 7990, productImage: '/images/gallery-1.jpg', productHref: '/urun/mist-komodin' },
        ],
    },
];

export const FILTER_TABS = ['Tümü', 'Oturma Odası', 'Yatak Odası', 'Yemek Odası', 'Minimalist', 'Modern'];

export default function LookbookPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <div
                className="relative py-24 px-6 text-center bg-[#1C1C1E] overflow-hidden"
            >
                <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-[#C9A96E]/20 to-transparent" />
                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="text-[11px] text-[#C9A96E] tracking-[0.35em] uppercase font-medium mb-4">
                        2026 Koleksiyonu
                    </p>
                    <h1
                        className="text-4xl md:text-5xl font-bold text-white mb-3"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                    >
                        Lookbook
                    </h1>
                    <p className="text-white/60 text-base">
                        Hayalinizdeki evin ilhamı burada
                    </p>
                </div>
            </div>

            <LookbookPageClient lookbooks={LOOKBOOK_DATA} filterTabs={FILTER_TABS} />
        </main>
    );
}
