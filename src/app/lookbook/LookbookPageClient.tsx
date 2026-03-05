'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LookbookCard, { type LookbookCardData } from '@/components/Marketing/LookbookCard';
import { useTranslationStore, translations } from '@/store/translationStore';

interface LookbookPageClientProps {
    lookbooks: LookbookCardData[];
    filterTabs: string[];
}

export default function LookbookPageClient({ lookbooks, filterTabs }: LookbookPageClientProps) {
    const { language } = useTranslationStore();
    const t = (key: string) => translations[language]?.[key] || key;
    const [activeFilter, setActiveFilter] = useState('Tümü');

    const getTabKey = (tab: string) => {
        switch (tab) {
            case 'Tümü': return 'cat_filter_all';
            case 'Oturma Odası': return 'nav_living_room';
            case 'Yatak Odası': return 'nav_bedroom';
            case 'Yemek Odası': return 'nav_dining';
            case 'Çalışma Odası': return 'nav_office';
            default: return '';
        }
    };

    const filtered = activeFilter === 'Tümü'
        ? lookbooks
        : lookbooks.filter(l => l.category === activeFilter);

    return (
        <>
            {/* Hero */}
            <div
                className="relative py-24 px-6 text-center bg-[#1C1C1E] overflow-hidden"
            >
                <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-[#C9A96E]/20 to-transparent" />
                <div className="relative z-10 max-w-2xl mx-auto">
                    <p className="text-[11px] text-[#C9A96E] tracking-[0.35em] uppercase font-medium mb-4">
                        {t('lookbook_col_subtitle') || "2026 Koleksiyonu"}
                    </p>
                    <h1
                        className="text-4xl md:text-5xl font-bold text-white mb-3"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                    >
                        {t('nav_lookbook') || "Lookbook"}
                    </h1>
                    <p className="text-white/60 text-base">
                        {t('lookbook_hero_desc') || "Hayalinizdeki evin ilhamı burada"}
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* Filtre chips */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-12 scrollbar-none">
                    {filterTabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 ${activeFilter === tab
                                ? 'bg-[#C9A96E] text-white'
                                : 'bg-[#F5F0EB] text-[#666] hover:bg-[#E8DDD0]'
                                }`}
                        >
                            {getTabKey(tab) ? t(getTabKey(tab)) : tab}
                        </button>
                    ))}
                </div>

                {/* Lookbook kartları */}
                <motion.div layout>
                    {filtered.map(card => (
                        <motion.div
                            key={card.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <LookbookCard card={card} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
}
