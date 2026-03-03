import type { Metadata } from 'next';
import LookbookPageClient from './LookbookPageClient';
import type { LookbookCardData } from '@/components/Marketing/LookbookCard';

import { mockLookbooks } from '@/lib/mock/content';

export const metadata: Metadata = {
    title: 'Lookbook 2026 | SELIS Premium Mobilya',
    description: 'SELIS 2026 Koleksiyon Lookbook\'u — Hayalinizdeki evin ilhamı burada.',
    openGraph: {
        title: 'SELIS Lookbook 2026',
        description: 'Editorial fotoğraflar ve hotspot ürün keşfi.',
        type: 'website',
    },
};

// Derive lookbook cards from mock data
const LOOKBOOK_DATA: LookbookCardData[] = mockLookbooks[0].photos.map(photo => ({
    id: photo.id,
    title: photo.title,
    description: photo.description,
    imageUrl: photo.url,
    category: photo.category,
    hotspots: photo.productTags.map(tag => ({
        id: tag.id,
        x: tag.x,
        y: tag.y,
        productName: tag.productName,
        productPrice: tag.productPrice,
        productImage: tag.productImage,
        productHref: tag.productHref
    }))
}));

const FILTER_TABS = ['Tümü', ...new Set(LOOKBOOK_DATA.map(item => item.category))];

export default function LookbookPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <div
                className="relative py-24 px-6 text-center bg-[#1C1C1E] overflow-hidden"
            >
                <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-[#C9A96E]/20 to-transparent" />
                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="text-[11px] text-[#C9A96E] tracking-[0.35em] uppercase font-medium mb-4" data-lang-key="lookbook_col_subtitle">
                        2026 Koleksiyonu
                    </p>
                    <h1
                        className="text-4xl md:text-5xl font-bold text-white mb-3"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                        data-lang-key="nav_lookbook"
                    >
                        Lookbook
                    </h1>
                    <p className="text-white/60 text-base" data-lang-key="lookbook_hero_desc">
                        Hayalinizdeki evin ilhamı burada
                    </p>
                </div>
            </div>

            <LookbookPageClient lookbooks={LOOKBOOK_DATA} filterTabs={FILTER_TABS} />
        </main>
    );
}
