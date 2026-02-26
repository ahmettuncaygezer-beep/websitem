'use client';

import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
    onLoadMore: () => void;
    isLoading: boolean;
    hasMore: boolean;
    loaded: number;
    total?: number;
}

export default function LoadMoreButton({
    onLoadMore,
    isLoading,
    hasMore,
    loaded,
    total,
}: LoadMoreButtonProps) {
    if (!hasMore) {
        return (
            <p className="text-center text-[12px] text-[#aaa] py-4">
                Tüm ürünler listelendi
            </p>
        );
    }

    const progress = total ? Math.min(100, Math.round((loaded / total) * 100)) : null;

    return (
        <div className="flex flex-col items-center gap-3 py-6">
            {/* Progress bar */}
            {progress !== null && (
                <div className="w-48 h-1 bg-[#E8E3DC] dark:bg-[#3A3A3C] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#C9A96E] rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Count */}
            <p className="text-[11px] text-[#999] dark:text-[#636366]">
                {loaded}{total ? ` / ${total}` : ''} ürün gösteriliyor
            </p>

            {/* Button */}
            <button
                onClick={onLoadMore}
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-3 border border-[#1C1C1E] dark:border-[#F5F0EB]/20 text-[#1C1C1E] dark:text-[#F5F0EB] text-[13px] font-medium hover:bg-[#1C1C1E] hover:text-white dark:hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Yükleniyor...
                    </>
                ) : (
                    'Daha Fazla Ürün Yükle'
                )}
            </button>
        </div>
    );
}
