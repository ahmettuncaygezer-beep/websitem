'use client';

import { useRef, useEffect } from 'react';

interface Props { categories: readonly string[]; active: string; onSelect: (c: string) => void; }

export function FurnitureCategoryTabs({ categories, active, onSelect }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current?.querySelector('[data-active="true"]') as HTMLElement | null;
        el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }, [active]);

    return (
        <div ref={ref} className="flex overflow-x-auto px-3 gap-1" style={{ scrollbarWidth: 'none', borderBottom: '1px solid #F0EDE8' }}>
            {categories.map((c) => (
                <button key={c} data-active={c === active} onClick={() => onSelect(c)}
                    className="px-3 py-2 whitespace-nowrap text-[11px] tracking-wide font-medium uppercase transition-colors duration-150"
                    style={{
                        color: c === active ? '#1C1C1E' : '#999',
                        background: 'none',
                        border: 'none',
                        borderBottomWidth: '2px',
                        borderBottomStyle: 'solid',
                        borderBottomColor: c === active ? '#C9A96E' : 'transparent',
                        cursor: 'pointer',
                    }}>
                    {c}
                </button>
            ))}
        </div>
    );
}
