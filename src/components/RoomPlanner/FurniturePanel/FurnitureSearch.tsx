'use client';

import { Search } from 'lucide-react';

interface Props { value: string; onChange: (v: string) => void; }

export function FurnitureSearch({ value, onChange }: Props) {
    return (
        <div className="px-3 py-3">
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#999' }} />
                <input
                    type="text" value={value} onChange={(e) => onChange(e.target.value)}
                    placeholder="Mobilya ara…"
                    className="w-full py-2 pl-9 pr-3 text-[13px] rounded-sm outline-none transition-colors duration-150"
                    style={{ background: '#F5F0EB', border: '1px solid transparent', color: '#1C1C1E' }}
                    onFocus={(e) => (e.target.style.borderColor = '#C9A96E')}
                    onBlur={(e) => (e.target.style.borderColor = 'transparent')}
                />
            </div>
        </div>
    );
}
