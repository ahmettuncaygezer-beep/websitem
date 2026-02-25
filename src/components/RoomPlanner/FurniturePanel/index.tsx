'use client';

import { useState, useMemo } from 'react';
import { FurnitureSearch } from './FurnitureSearch';
import { FurnitureCategoryTabs } from './FurnitureCategoryTabs';
import { FurnitureList } from './FurnitureList';
import { FURNITURE_CATALOG, FURNITURE_CATEGORIES } from '../data/furniture.data';
import { usePlannerStore } from '../store/plannerStore';
import type { FurnitureCatalogItem } from '../types/planner.types';

export function FurniturePanel() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<string>('Tümü');
    const addFurniture = usePlannerStore((s) => s.addFurniture);
    const furniture = usePlannerStore((s) => s.furniture);

    const filtered = useMemo(() => {
        let items = FURNITURE_CATALOG;
        if (category !== 'Tümü') items = items.filter((i) => i.category === category);
        if (search.trim()) {
            const q = search.toLowerCase();
            items = items.filter((i) => i.name.toLowerCase().includes(q));
        }
        return items;
    }, [search, category]);

    const totalPrice = furniture.reduce((s, f) => s + f.price, 0);

    const handleAdd = (item: FurnitureCatalogItem) => { addFurniture(item); };

    return (
        <div className="flex flex-col h-full" style={{ background: 'white', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
            {/* Header */}
            <div className="px-4 py-3" style={{ borderBottom: '1px solid #F0EDE8' }}>
                <h2 className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#1C1C1E' }}>Mobilya Kütüphanesi</h2>
            </div>

            <FurnitureSearch value={search} onChange={setSearch} />
            <FurnitureCategoryTabs categories={FURNITURE_CATEGORIES} active={category} onSelect={setCategory} />

            {/* List (scrollable) */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                <FurnitureList items={filtered} onAdd={handleAdd} />
            </div>

            {/* Bottom info */}
            <div className="px-4 py-2" style={{ borderTop: '1px solid #F0EDE8' }}>
                <p className="text-[11px]" style={{ color: '#999' }}>
                    🛋 {furniture.length} mobilya eklendi | Toplam: <span style={{ color: '#C9A96E', fontWeight: 600 }}>₺{totalPrice.toLocaleString('tr-TR')}</span>
                </p>
            </div>
        </div>
    );
}
