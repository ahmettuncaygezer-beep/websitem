'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LookbookCard, { type LookbookCardData } from '@/components/Marketing/LookbookCard';

interface LookbookPageClientProps {
    lookbooks: LookbookCardData[];
    filterTabs: string[];
}

export default function LookbookPageClient({ lookbooks, filterTabs }: LookbookPageClientProps) {
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
                        data-lang-key={getTabKey(tab) || undefined}
                    >
                        {tab}
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
    );
}
