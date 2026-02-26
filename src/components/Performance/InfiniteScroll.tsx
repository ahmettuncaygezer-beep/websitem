'use client';

import { useEffect, useRef } from 'react';
import SkeletonCard from './SkeletonCard';

interface InfiniteScrollProps {
    hasMore: boolean;
    isLoadingMore: boolean;
    loadMore: () => void;
    children: React.ReactNode;
    /** px before bottom to trigger load — default 200 */
    rootMargin?: string;
    skeletonCount?: number;
}

export default function InfiniteScroll({
    hasMore,
    isLoadingMore,
    loadMore,
    children,
    rootMargin = '200px',
    skeletonCount = 4,
}: InfiniteScrollProps) {
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !isLoadingMore) {
                    loadMore();
                }
            },
            { rootMargin }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, loadMore, rootMargin]);

    return (
        <div>
            {children}

            {/* Loading skeletons */}
            {isLoadingMore && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mt-6">
                    {Array.from({ length: skeletonCount }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-in fade-in duration-300"
                            style={{ animationDelay: `${i * 50}ms` }}
                        >
                            <SkeletonCard />
                        </div>
                    ))}
                </div>
            )}

            {/* Sentinel — IntersectionObserver hedefi */}
            {hasMore && !isLoadingMore && (
                <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />
            )}

            {/* Tüm ürünler yüklendi */}
            {!hasMore && (
                <p className="text-center text-[12px] text-[#aaa] py-8">
                    Tüm ürünler listelendi
                </p>
            )}
        </div>
    );
}
