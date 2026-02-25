'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { FilterTabs } from './FilterTabs';
import { MasonryGrid } from './MasonryGrid';
import { ViewAllButton } from './ViewAllButton';
import { CATEGORIES } from './category.data';
import type { FilterTab } from './category.types';

export function CategorySection() {
    const [activeFilter, setActiveFilter] = useState<FilterTab>('Tümü');

    // Subtle parallax for watermark text
    const { scrollY } = useScroll();
    const watermarkY = useTransform(scrollY, [0, 1000], [0, -80]);

    return (
        <section
            id="categories"
            aria-labelledby="categories-heading"
            className="relative py-24 md:py-32 overflow-hidden"
            style={{ background: '#F5F0EB' }}
        >
            {/* ── Top SVG divider: white → cream ── */}
            <div
                className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none"
                aria-hidden="true"
            >
                <svg
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    className="w-full"
                    style={{ height: 'clamp(48px, 5vw, 80px)', display: 'block' }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* ── Bottom SVG divider: cream → white ── */}
            <div
                className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
                aria-hidden="true"
            >
                <svg
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    className="w-full"
                    style={{ height: 'clamp(48px, 5vw, 80px)', display: 'block' }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* ── Watermark MAISON text ── */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                style={{ y: watermarkY }}
                aria-hidden="true"
            >
                <span
                    className="font-bold text-center leading-none tracking-widest"
                    style={{
                        fontSize: '30vw',
                        opacity: 0.03,
                        color: '#1C1C1E',
                        fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                        whiteSpace: 'nowrap',
                    }}
                >
                    MAISON
                </span>
            </motion.div>

            {/* ── Content ── */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                <SectionHeader />

                <FilterTabs active={activeFilter} onChange={setActiveFilter} />

                <MasonryGrid categories={CATEGORIES} activeFilter={activeFilter} />

                <ViewAllButton />
            </div>
        </section>
    );
}
