'use client';

import { Star } from 'lucide-react';

interface Props { average: number; count: number; distribution: number[]; onFilter?: (stars: number | null) => void; }

export function ReviewSummary({ average, count, distribution, onFilter }: Props) {
    const full = Math.floor(average);

    return (
        <div className="flex flex-col sm:flex-row gap-8 mb-8">
            {/* Left — big score */}
            <div className="text-center sm:text-left">
                <span className="text-6xl font-bold text-foreground">{average}</span>
                <div className="flex items-center justify-center sm:justify-start gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} fill={i < full ? '#C9A96E' : 'transparent'} stroke={i < full ? '#C9A96E' : 'var(--border)'} strokeWidth={1.5} />
                    ))}
                </div>
                <p className="text-sm mt-1 text-muted-foreground">{count} değerlendirme</p>
            </div>

            {/* Right — bar distribution */}
            <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((stars) => {
                    const val = distribution[stars - 1] ?? 0;
                    const pct = count > 0 ? (val / count) * 100 : 0;
                    return (
                        <button key={stars} onClick={() => onFilter?.(stars)} className="flex items-center gap-2 w-full group bg-transparent border-none cursor-pointer py-0.5"
                        >
                            <span className="text-[12px] w-6 text-right text-muted-foreground">{stars} ★</span>
                            <div className="flex-1 h-2 rounded-full overflow-hidden bg-muted">
                                <div className="h-full rounded-full transition-all duration-300 group-hover:opacity-80" style={{ width: `${pct}%`, background: '#C9A96E' }} />
                            </div>
                            <span className="text-[11px] w-8 text-right text-muted-foreground">{val}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
