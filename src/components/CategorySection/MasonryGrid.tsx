'use client';

import { useRef, useState, useEffect } from 'react';
import { CategoryCard } from './CategoryCard';
import { useIntersectionStagger } from './useIntersectionStagger';
import { useMasonry } from './useMasonry';
import type { CategoryItem, FilterTab } from './category.types';

interface MasonryGridProps {
    categories: CategoryItem[];
    activeFilter: FilterTab;
}

// ─── Mobile Carousel ──────────────────────────────────────────────────────────
function MobileCarousel({
    categories,
    activeFilter,
}: {
    categories: CategoryItem[];
    activeFilter: FilterTab;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const onScroll = () => {
            const cardWidth = el.scrollWidth / categories.length;
            setActiveIdx(Math.round(el.scrollLeft / cardWidth));
        };
        el.addEventListener('scroll', onScroll, { passive: true });
        return () => el.removeEventListener('scroll', onScroll);
    }, [categories.length]);

    return (
        <div role="region" aria-label="Kategoriler" className="md:hidden">
            {/* Scrollable track */}
            <div
                ref={trackRef}
                className="flex gap-3 overflow-x-auto pb-4"
                style={{
                    scrollSnapType: 'x mandatory',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                }}
            >
                {categories.map((cat, i) => (
                    <div
                        key={cat.id}
                        className="shrink-0 relative overflow-hidden"
                        style={{
                            scrollSnapAlign: 'start',
                            width: '72vw',
                            aspectRatio: '3/4',
                            borderRadius: '4px',
                        }}
                    >
                        <CategoryCard
                            category={cat}
                            index={i}
                            span={5}
                            isVisible={true}
                            activeFilter={activeFilter}
                        />
                    </div>
                ))}
            </div>

            {/* Dot indicator */}
            <div
                className="flex items-center justify-center gap-2 mt-4"
                role="tablist"
                aria-label="Slider göstergesi"
            >
                {categories.map((_, i) => (
                    <button
                        key={i}
                        role="tab"
                        aria-selected={activeIdx === i}
                        aria-label={`${i + 1}. kategori`}
                        onClick={() => {
                            const el = trackRef.current;
                            if (!el) return;
                            const cardWidth = el.scrollWidth / categories.length;
                            el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
                        }}
                        className="transition-all duration-300"
                        style={{
                            height: '6px',
                            width: activeIdx === i ? '24px' : '6px',
                            borderRadius: '9999px',
                            background:
                                activeIdx === i ? '#1C1C1E' : 'rgba(28,28,30,0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Desktop Masonry ──────────────────────────────────────────────────────────
function DesktopMasonry({
    categories,
    activeFilter,
}: {
    categories: CategoryItem[];
    activeFilter: FilterTab;
}) {
    const { containerRef, visibleItems } = useIntersectionStagger(
        categories.length,
        100
    );
    const { spans, isTablet } = useMasonry(categories.length);

    return (
        <div
            ref={containerRef}
            className="hidden md:grid"
            style={{
                gridTemplateColumns: isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
                gridAutoRows: '80px',
                gap: isTablet ? '12px' : '16px',
            }}
        >
            {categories.map((cat, i) => (
                <CategoryCard
                    key={cat.id}
                    category={cat}
                    index={i}
                    span={spans[i] ?? 5}
                    isVisible={visibleItems[i] ?? false}
                    activeFilter={activeFilter}
                />
            ))}
        </div>
    );
}

// ─── Combined grid ────────────────────────────────────────────────────────────
export function MasonryGrid({ categories, activeFilter }: MasonryGridProps) {
    return (
        <>
            <MobileCarousel categories={categories} activeFilter={activeFilter} />
            <DesktopMasonry categories={categories} activeFilter={activeFilter} />
        </>
    );
}
