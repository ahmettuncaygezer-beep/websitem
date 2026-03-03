'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { CategoryBadge } from './CategoryBadge';
import { CategoryRevealButton } from './CategoryRevealButton';
import type { CategoryItem, FilterTab } from './category.types';
import { CATEGORY_FILTER_MAP } from './category.data';
import { useGlobal } from '@/context/GlobalContext';

const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

interface CategoryCardProps {
    category: CategoryItem;
    index: number;
    span: number;
    isVisible: boolean;
    activeFilter: FilterTab;
}

export function CategoryCard({
    category,
    index,
    span,
    isVisible,
    activeFilter,
}: CategoryCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const reduceMotion = useReducedMotion();
    const { language, t } = useGlobal();

    const isLarge = span >= 7;
    const isPriority = index < 3;

    const match =
        activeFilter === 'Tümü' ||
        CATEGORY_FILTER_MAP[category.id] === activeFilter;

    return (
        <motion.div
            animate={{
                opacity: isVisible ? (match ? 1 : 0.4) : 0,
                y: isVisible ? 0 : reduceMotion ? 0 : 40,
                scale: match ? 1 : 0.97,
            }}
            transition={{
                duration: 0.6,
                ease: EASE_SMOOTH,
                delay: isVisible ? index * 0.08 : 0,
            }}
            style={{
                gridRowEnd: `span ${span}`,
                height: '100%',
                pointerEvents: match ? 'auto' : 'none',
            }}
        >
            <Link
                href={category.href}
                className="group relative block w-full h-full overflow-hidden"
                aria-label={`${category.labelKey ? t(category.labelKey) : category.label} ${t('cat_btn_reveal') || 'kategorisini keşfet'} — ${category.productCount} ${t('common_items') || 'ürün'}`}
                style={{
                    borderRadius: '4px',
                    cursor: 'pointer',
                    outline: isHovered ? '2px solid #C9A96E' : 'none',
                    outlineOffset: '2px',
                    display: 'block',
                }}
                onMouseEnter={(e) => {
                    setIsHovered(true);
                    (e.currentTarget as HTMLElement).style.willChange = 'transform';
                }}
                onMouseLeave={(e) => {
                    setIsHovered(false);
                    (e.currentTarget as HTMLElement).style.willChange = 'auto';
                }}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
            >
                {/* ── Image container ── */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ borderRadius: '4px' }}
                >
                    {/* Fallback dark bg when image not loaded */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(135deg, #2a2520 0%, #1a1814 100%)',
                        }}
                    />
                    <Image
                        src={category.image}
                        alt={`${category.labelKey ? t(category.labelKey) : category.label} ${t('cat_cat') || 'kategorisi'} — ${category.productCount} ${t('common_items') || 'ürün'}`}
                        fill
                        priority={isPriority}
                        loading={isPriority ? 'eager' : 'lazy'}
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{
                            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                            transition: `transform 600ms cubic-bezier(${EASE_SMOOTH.join(',')})`,
                        }}
                        onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </div>

                {/* ── Overlay 1: always visible ── */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 100%)',
                        zIndex: 1,
                    }}
                />

                {/* ── Overlay 2: hover intensifier ── */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 100%)',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 400ms ease',
                        zIndex: 2,
                    }}
                />

                {/* ── Gold inset border ── */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        border: isHovered ? '2px solid #C9A96E' : '0px solid #C9A96E',
                        transition: 'border-width 200ms ease',
                        borderRadius: '4px',
                        zIndex: 4,
                    }}
                    aria-hidden="true"
                />

                {/* ── Content layer ── */}
                <div className="absolute inset-0" style={{ zIndex: 3 }}>
                    {/* Badge — top left */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                        {category.badge ? (
                            <>
                                <CategoryBadge text={category.badge} textKey={category.badgeKey} isHovered={isHovered} />
                                {category.featured && (
                                    <CategoryBadge
                                        text={`${category.productCount} ${t('common_items') || 'parça'}`}
                                        variant="glass"
                                        isHovered={isHovered}
                                    />
                                )}
                            </>
                        ) : (
                            <CategoryBadge
                                text={`${category.productCount} ${t('common_items') || 'parça'}`}
                                isHovered={isHovered}
                            />
                        )}
                    </div>

                    {/* Category info — bottom left */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <p
                            className="uppercase font-medium mb-1"
                            style={{
                                fontSize: '10px',
                                letterSpacing: '0.25em',
                                color: 'rgba(255,255,255,0.6)',
                            }}
                        >
                            {category.subLabelKey ? t(category.subLabelKey) : category.subLabel}
                        </p>
                        <h3
                            style={{
                                fontFamily:
                                    'var(--font-playfair, "Playfair Display", Georgia, serif)',
                                fontWeight: 400,
                                lineHeight: 1.2,
                                color: 'white',
                                fontSize: isLarge
                                    ? 'clamp(1.25rem, 2.5vw, 1.875rem)'
                                    : 'clamp(1.125rem, 2vw, 1.5rem)',
                                marginTop: '2px',
                            }}
                            data-lang-key={category.labelKey}
                        >
                            {category.labelKey ? t(category.labelKey) : category.label}
                        </h3>
                        <p
                            className="mt-1"
                            style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}
                        >
                            {category.productCount} {t('common_items') || 'parça'}
                        </p>
                    </div>

                    {/* Reveal button — bottom right */}
                    <CategoryRevealButton
                        label={`${category.labelKey ? t(category.labelKey) : category.label} ${t('cat_btn_reveal') || 'kategorisini keşfet'}`}
                        isHovered={isHovered}
                    />
                </div>
            </Link>
        </motion.div>
    );
}
