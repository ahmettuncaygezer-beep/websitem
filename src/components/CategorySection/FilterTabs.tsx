'use client';

import { motion } from 'framer-motion';
import type { FilterTab } from './category.types';
import { useGlobal } from '@/context/GlobalContext';
import { translations } from '@/lib/i18n';
import { useDarkMode } from '@/hooks/useDarkMode';

const TABS_DATA = [
    { label: 'Tümü', id: 'Tümü', key: 'cat_filter_all' },
    { label: 'Oturma', id: 'Oturma', key: 'cat_filter_liv' },
    { label: 'Yatak', id: 'Yatak', key: 'cat_filter_bed' },
    { label: 'Yemek', id: 'Yemek', key: 'cat_filter_din' },
    { label: 'Çalışma', id: 'Çalışma', key: 'cat_filter_off' },
    { label: 'Aydınlatma', id: 'Aydınlatma', key: 'cat_filter_light' },
] as const;

interface FilterTabsProps {
    active: FilterTab;
    onChange: (tab: FilterTab) => void;
}

export function FilterTabs({ active, onChange }: FilterTabsProps) {
    const { language } = useGlobal();

    const t = (key: string) => {
        let result: any = translations[language as keyof typeof translations];
        if (result && result[key]) return result[key];
        return null;
    };

    return (
        <div
            className="hidden md:flex items-center justify-center gap-2 mb-10"
            role="tablist"
            aria-label={t('cat_filter_label') || "Kategori filtreleri"}
        >
            {TABS_DATA.map((tab) => {
                const isActive = active === tab.id;
                const displayText = t(tab.key) || tab.label;

                return (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(tab.id as FilterTab)}
                        className="relative px-5 py-2 rounded-full text-[12px] tracking-wide font-bold uppercase transition-colors duration-[250ms]"
                        style={{
                            color: isActive ? 'white' : 'rgba(28,28,30,0.6)',
                            border: isActive ? 'none' : '1px solid rgba(0,0,0,0.12)',
                            background: 'transparent',
                            zIndex: 1,
                        }}
                        onMouseOver={(e) => {
                            if (!isActive) {
                                (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.04)';
                                (e.currentTarget as HTMLElement).style.color = '#1C1C1E';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!isActive) {
                                (e.currentTarget as HTMLElement).style.background = 'transparent';
                                (e.currentTarget as HTMLElement).style.color = 'rgba(28,28,30,0.6)';
                            }
                        }}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="activeTab"
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: '#1C1C1E',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                    zIndex: -1,
                                }}
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                        )}
                        <span>{displayText}</span>
                    </button>
                );
            })}
        </div>
    );
}
