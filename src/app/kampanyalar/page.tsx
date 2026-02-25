'use client';

import Link from 'next/link';
import { Tag, Percent, ArrowRight, Clock } from 'lucide-react';

const campaigns = [
    {
        id: 1,
        title: 'Luna Köşe Koltuk\'ta %17 İndirim',
        description: 'Bu hafta sınırlı stokla premium Luna koleksiyonunda özel indirim fırsatı.',
        badge: 'Bu Hafta',
        badgeColor: '#C9A96E',
        discount: '%17',
        category: 'Oturma Odası',
        href: '/urun/luna-kose-koltuk',
        endsIn: '3 gün',
    },
    {
        id: 2,
        title: 'Yatak Setlerinde %20 İndirim',
        description: 'Yatak + baza + başlık kombilerinde büyük tasarruf fırsatı.',
        badge: 'Popüler',
        badgeColor: '#C67D5B',
        discount: '%20',
        category: 'Yatak Odası',
        href: '/kategori/yatak-odasi',
        endsIn: '5 gün',
    },
    {
        id: 3,
        title: 'Sandalye Setlerinde %15 İndirim',
        description: 'Yemek odası sandalye setlerinde avantajlı fiyatlar.',
        badge: 'Yeni',
        badgeColor: '#8B9E82',
        discount: '%15',
        category: 'Yemek Odası',
        href: '/kategori/sandalyeler',
        endsIn: '7 gün',
    },
    {
        id: 4,
        title: 'Ev Ofis Setlerinde Ücretsiz Kargo',
        description: 'Çalışma masası ve ofis koltuğu birlikte alımlarında ücretsiz kurulum ve kargo.',
        badge: 'Kargo Bedava',
        badgeColor: '#1C1C1E',
        discount: 'ÜCRETSİZ',
        category: 'Çalışma Odası',
        href: '/kategori/calisma-odasi',
        endsIn: '10 gün',
    },
    {
        id: 5,
        title: 'Aydınlatmada Ücretsiz Montaj',
        description: 'Seçili avize ve lambader alımlarında evinizde ücretsiz montaj hizmeti.',
        badge: 'Hizmet',
        badgeColor: '#C9A96E',
        discount: 'MONTAJ',
        category: 'Aydınlatma',
        href: '/kategori/aydinlatma',
        endsIn: '14 gün',
    },
    {
        id: 6,
        title: 'Dekorasyonda 3 Al 2 Öde',
        description: 'Dekorasyon ürünlerinde 3 ürün al, en ucuzunu ücretsiz kap.',
        badge: 'Fırsat',
        badgeColor: '#C67D5B',
        discount: '3=2',
        category: 'Dekorasyon',
        href: '/kategori/dekorasyon',
        endsIn: '21 gün',
    },
];

export default function KampanyalarPage() {
    return (
        <main id="main-content" className="min-h-screen" style={{ background: '#FAF8F5' }}>
            {/* Hero */}
            <section
                className="py-20 px-6 text-center"
                style={{ background: 'linear-gradient(135deg, #1C1C1E 0%, #2A2A2C 100%)' }}
            >
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Tag size={16} style={{ color: '#C9A96E' }} />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold" style={{ color: '#C9A96E' }}>
                            Fırsatlar & Kampanyalar
                        </span>
                    </div>
                    <h1
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                        style={{ fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)' }}
                    >
                        Özel Teklifler
                    </h1>
                    <p className="text-white/60 text-base max-w-md mx-auto">
                        MAISON&apos;un seçkin kampanyaları ile evinizi premium mobilyalarla donaturken tasarruf edin.
                    </p>
                </div>
            </section>

            {/* Campaign grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => (
                        <Link
                            key={campaign.id}
                            href={campaign.href}
                            className="group bg-white rounded-sm border overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-shadow duration-300"
                            style={{ borderColor: '#E8E3DC' }}
                        >
                            {/* Discount badge area */}
                            <div
                                className="h-[120px] flex items-center justify-center relative overflow-hidden"
                                style={{ background: 'linear-gradient(135deg, #F5F0EB 0%, #EDE8E1 100%)' }}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <Percent size={20} style={{ color: campaign.badgeColor }} />
                                    <span
                                        className="text-4xl font-black tracking-tight"
                                        style={{ color: campaign.badgeColor, fontFamily: 'var(--font-playfair, serif)' }}
                                    >
                                        {campaign.discount}
                                    </span>
                                </div>

                                {/* Category tag */}
                                <span
                                    className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-sm"
                                    style={{ background: campaign.badgeColor }}
                                >
                                    {campaign.badge}
                                </span>

                                {/* Time left */}
                                <div className="absolute bottom-3 right-3 flex items-center gap-1">
                                    <Clock size={11} style={{ color: '#999' }} />
                                    <span className="text-[11px]" style={{ color: '#999' }}>{campaign.endsIn} kaldı</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: '#999' }}>
                                    {campaign.category}
                                </span>
                                <h2 className="text-[15px] font-semibold mt-1 mb-2 leading-snug" style={{ color: '#1C1C1E' }}>
                                    {campaign.title}
                                </h2>
                                <p className="text-[13px] leading-relaxed mb-4" style={{ color: '#6B6560' }}>
                                    {campaign.description}
                                </p>
                                <span
                                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold border-b pb-0.5
                             group-hover:tracking-widest transition-all duration-200"
                                    style={{ color: '#C9A96E', borderColor: '#C9A96E' }}
                                >
                                    Fırsatı İncele <ArrowRight size={11} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div
                    className="mt-16 rounded-sm p-10 text-center"
                    style={{ background: '#1C1C1E' }}
                >
                    <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-playfair, serif)' }}>
                        Tüm Koleksiyonumuzu Keşfedin
                    </h2>
                    <p className="text-white/60 text-sm mb-6">Premium mobilya ve dekorasyon ürünlerinin tamamına göz atın.</p>
                    <Link
                        href="/kategori/oturma-odasi"
                        className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-sm transition-all duration-200 hover:gap-3"
                        style={{ background: '#C9A96E', color: 'white' }}
                    >
                        Alışverişe Başla <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
