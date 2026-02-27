'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { FilterTab } from './category.types';

const TABS: FilterTab[] = ['Tümü', 'Oturma', 'Yatak', 'Yemek', 'Çalışma', 'Aydınlatma'];

interface FilterTabsProps {
    active: FilterTab;
    onChange: (tab: FilterTab) => void;
}

export function FilterTabs({ active, onChange }: FilterTabsProps) {
    return (
        <div
            className="hidden md:flex items-center justify-center gap-2 mb-10"
            role="tablist"
            aria-label="Kategori filtreleri"
        >
            {TABS.map((tab) => {
                const isActive = active === tab;
                return (
                    <button
                        key={tab}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(tab)}
                        className="relative px-5 py-2 rounded-full text-[12px] tracking-wide font-medium transition-colors duration-[250ms]"
                        style={{
                            color: isActive ? 'white' : 'rgba(28,28,30,0.6)',
                            border: isActive ? 'none' : '1px solid rgba(0,0,0,0.12)',
                            background: 'transparent',
                            zIndex: 1,
                        }}
                        onMouseOver={(e) => {
                            if (!isActive) {
                                (e.currentTarget as HTMLElement).style.background =
                                    'rgba(0,0,0,0.04)';
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
                        {/* Animated background pill */}
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
                        <span data-lang-key={
                            tab === 'Tümü' ? 'cat_filter_all' :
                                tab === 'Oturma' ? 'cat_filter_liv' :
                                    tab === 'Yatak' ? 'cat_filter_bed' :
                                        tab === 'Yemek' ? 'cat_filter_din' :
                                            tab === 'Çalışma' ? 'cat_filter_off' :
                                                'cat_filter_light'
                        }>{tab}</span>
                    </button>
                );
            })}
        </div>
    );
}
