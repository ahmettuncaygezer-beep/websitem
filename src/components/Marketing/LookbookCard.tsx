'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useTranslationStore, translations } from '@/store/translationStore';

export interface Hotspot {
    id: string;
    x: number; // % (left)
    y: number; // % (top)
    productName: string;
    productPrice: number;
    productImage: string;
    productHref: string;
}

export interface LookbookCardData {
    id: string;
    title: string;
    titleKey?: string;
    description: string;
    descriptionKey?: string;
    imageUrl: string;
    category: string;
    hotspots: Hotspot[];
}

function HotspotPin({
    hotspot,
    containerWidth,
}: {
    hotspot: Hotspot;
    containerWidth: number;
}) {
    const [visible, setVisible] = useState(false);
    const pinRef = useRef<HTMLButtonElement>(null);
    const { language } = useTranslationStore();
    const t = (key: string) => translations[language]?.[key];

    // Viewport collision: tooltip sağa mı sola mı açılsın?
    const openLeft = hotspot.x > 55;

    return (
        <div
            className="absolute"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
        >
            {/* Ping halkası */}
            <span className="absolute -inset-3 rounded-full bg-white/30 animate-ping pointer-events-none" />

            {/* Beyaz daire */}
            <button
                ref={pinRef}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                onClick={() => setVisible(v => !v)}
                className="relative w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-125 transition-transform duration-200 focus:outline-none"
                aria-label={hotspot.productName}
            >
                <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
            </button>

            {/* Tooltip */}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute z-20 w-48 bg-white rounded-sm shadow-xl border border-[#E8E3DC]
              ${openLeft ? 'right-8 -translate-y-1/2 top-1/2' : 'left-8 -translate-y-1/2 top-1/2'}`}
                    >
                        <div className="flex gap-2.5 p-2.5">
                            <div className="relative w-12 h-12 flex-shrink-0 rounded-sm overflow-hidden bg-[#F5F0EB]">
                                <Image
                                    src={hotspot.productImage}
                                    alt={hotspot.productName}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-semibold text-[#1C1C1E] leading-tight line-clamp-2">
                                    {hotspot.productName}
                                </p>
                                <p className="text-[12px] text-[#C9A96E] font-bold mt-0.5">
                                    ₺{hotspot.productPrice.toLocaleString('tr-TR')}
                                </p>
                                <Link
                                    href={hotspot.productHref}
                                    className="text-[10px] text-[#C9A96E] font-medium hover:underline inline-flex items-center group/link"
                                >
                                    <span data-lang-key="prod_view_details">{t('prod_view_details') || "İncele"}</span>
                                    <ArrowRight size={12} className="ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function LookbookCard({ card }: { card: LookbookCardData }) {
    const [containerWidth, setContainerWidth] = useState(0);
    const [sheetOpen, setSheetOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { language } = useTranslationStore();
    const t = (key: string) => translations[language]?.[key];

    const measuredRef = useCallback((node: HTMLDivElement | null) => {
        if (node) setContainerWidth(node.offsetWidth);
    }, []);

    const getCategoryKey = (category: string) => {
        switch (category.toLowerCase()) {
            case 'oturma odası': return 'nav_living_room';
            case 'yatak odası': return 'nav_bedroom';
            case 'yemek odası': return 'nav_dining';
            case 'çalışma odası': return 'nav_office';
            default: return '';
        }
    };

    return (
        <div className="mb-16">
            {/* Görsel + Hotspot'lar */}
            <div
                ref={(node) => { measuredRef(node); (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node; }}
                className="relative w-full overflow-hidden rounded-sm bg-[#E8E3DC]"
                style={{ aspectRatio: '16/9' }}
            >
                <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                {/* Hotspot'lar (desktop: hover tooltip) */}
                <div className="hidden md:block">
                    {card.hotspots.map(spot => (
                        <HotspotPin key={spot.id} hotspot={spot} containerWidth={containerWidth} />
                    ))}
                </div>

                {/* Mobil: altın daireler */}
                <div className="md:hidden">
                    {card.hotspots.map(spot => (
                        <button
                            key={spot.id}
                            onClick={() => setSheetOpen(true)}
                            className="absolute w-5 h-5 rounded-full bg-[#C9A96E] border-2 border-white shadow-lg"
                            style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
                            aria-label={spot.productName}
                        />
                    ))}
                </div>
            </div>

            {/* Konsept bilgisi */}
            <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                    {getCategoryKey(card.category) ? (
                        <span className="text-[10px] text-[#C9A96E] uppercase tracking-widest font-medium" data-lang-key={getCategoryKey(card.category)}>
                            {t(getCategoryKey(card.category))}
                        </span>
                    ) : (
                        <span className="text-[10px] text-[#C9A96E] uppercase tracking-widest font-medium">
                            {card.category}
                        </span>
                    )}

                    <h3
                        className="text-xl font-bold text-[#1C1C1E] mt-0.5"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                        data-lang-key={card.titleKey || undefined}
                    >
                        {card.titleKey ? t(card.titleKey) : card.title}
                    </h3>
                    <p
                        className="text-[13px] text-[#666] mt-1 max-w-md"
                        data-lang-key={card.descriptionKey || undefined}
                    >
                        {card.descriptionKey ? t(card.descriptionKey) : card.description}
                    </p>
                </div>

                <button
                    onClick={() => setSheetOpen(true)}
                    className="flex-shrink-0 px-5 py-2.5 border border-[#1C1C1E] text-[13px] font-semibold text-[#1C1C1E] rounded-sm hover:bg-[#1C1C1E] hover:text-white transition-all duration-200"
                    data-lang-key="lookbook_btn_all_products"
                >
                    {t('lookbook_btn_all_products') || "Bu odadaki tüm ürünleri gör →"}
                </button>
            </div>

            {/* Mobil bottom sheet / Desktop drawer */}
            <AnimatePresence>
                {sheetOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-40"
                            onClick={() => setSheetOpen(false)}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl max-h-[70vh] overflow-y-auto md:right-0 md:top-0 md:left-auto md:rounded-none md:max-h-full md:w-80 md:shadow-2xl"
                        >
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-[#1C1C1E] text-base">{card.title}</h4>
                                    <button onClick={() => setSheetOpen(false)} className="p-1 text-[#666] hover:text-[#1C1C1E]">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {card.hotspots.map(spot => (
                                        <Link
                                            key={spot.id}
                                            href={spot.productHref}
                                            className="flex items-center gap-3 p-2.5 rounded-sm border border-[#E8E3DC] hover:border-[#C9A96E] transition-colors group"
                                        >
                                            <div className="relative w-14 h-14 flex-shrink-0 rounded-sm overflow-hidden bg-[#F5F0EB]">
                                                <Image
                                                    src={spot.productImage}
                                                    alt={spot.productName}
                                                    fill
                                                    sizes="56px"
                                                    className="object-cover"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-semibold text-[#1C1C1E]">{spot.productName}</p>
                                                <p className="text-[13px] text-[#C9A96E] font-bold">
                                                    ₺{spot.productPrice.toLocaleString('tr-TR')}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
