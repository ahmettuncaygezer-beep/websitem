'use client';

import type { OrderStatus } from '@/types/account.types';

interface Props {
    filter: OrderStatus | 'all';
    onChange: (f: OrderStatus | 'all') => void;
    counts: Record<string, number>;
}

const TABS: { key: OrderStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'Tümü' },
    { key: 'pending', label: 'Aktif' },
    { key: 'delivered', label: 'Teslim Edildi' },
    { key: 'cancelled', label: 'İptal' },
    { key: 'returned', label: 'İade' },
];

export function OrderFilter({ filter, onChange, counts }: Props) {
    // "pending" tab actually shows all active statuses
    const getCount = (key: string) => {
        if (key === 'all') return counts.all || 0;
        if (key === 'pending') return (counts.pending || 0) + (counts.confirmed || 0) + (counts.preparing || 0) + (counts.shipped || 0);
        return counts[key] || 0;
    };

    return (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {TABS.map((tab) => {
                const isActive = filter === tab.key;
                const c = getCount(tab.key);
                return (
                    <button
                        key={tab.key}
                        onClick={() => onChange(tab.key)}
                        className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-medium whitespace-nowrap transition-all duration-200"
                        style={{
                            borderRadius: '20px',
                            background: isActive ? '#1C1C1E' : 'white',
                            color: isActive ? 'white' : '#666',
                            border: isActive ? '1px solid #1C1C1E' : '1px solid #E8E3DC',
                            cursor: 'pointer',
                        }}
                    >
                        {tab.label}
                        {c > 0 && (
                            <span
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                                style={{ background: isActive ? '#C9A96E' : '#F0EDE8', color: isActive ? '#1C1C1E' : '#999' }}
                            >
                                {c}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
