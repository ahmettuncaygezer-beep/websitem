'use client';

import { X } from 'lucide-react';

export interface ActiveFilter {
    key: string;
    label: string;
    value: string;
}

interface FilterChipsProps {
    filters: ActiveFilter[];
    onRemove: (key: string, value: string) => void;
    onClearAll: () => void;
}

export default function FilterChips({ filters, onRemove, onClearAll }: FilterChipsProps) {
    if (filters.length === 0) return null;

    return (
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
            {filters.map((f) => (
                <button
                    key={`${f.key}-${f.value}`}
                    onClick={() => onRemove(f.key, f.value)}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors"
                    style={{
                        background: '#F5F0EB',
                        color: '#1C1C1E',
                        border: '1px solid #E8E3DC',
                        WebkitTapHighlightColor: 'transparent',
                    }}
                >
                    <span className="text-[#C9A96E] text-[10px] uppercase tracking-wider font-semibold">{f.label}:</span>
                    {f.value}
                    <X size={10} className="text-[#999] ml-0.5" />
                </button>
            ))}
            {filters.length > 1 && (
                <button
                    onClick={onClearAll}
                    className="flex-shrink-0 px-3 py-1.5 text-[12px] font-semibold text-[#C9A96E] whitespace-nowrap"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                    Tümünü Temizle
                </button>
            )}
        </div>
    );
}
