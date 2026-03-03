'use client';

import { FurnitureItem } from './FurnitureItem';
import type { FurnitureCatalogItem } from '../types/planner.types';

interface Props { items: FurnitureCatalogItem[]; onAdd: (item: FurnitureCatalogItem) => void; }

export function FurnitureList({ items, onAdd }: Props) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <span className="text-3xl mb-3">🔍</span>
                <p className="text-[13px] font-medium" style={{ color: '#1C1C1E' }} data-lang-key="common_no_results">Sonuç bulunamadı</p>
                <p className="text-[11px] text-[#666] mt-2 text-center" data-lang-key="planner_try_search">Başka bir arama yapmayı deneyin</p>
            </div>
        );
    }

    return (
        <div className="p-3 grid grid-cols-2 gap-2">
            {items.map((item) => (
                <FurnitureItem key={item.id} item={item} onAdd={onAdd} />
            ))}
        </div>
    );
}
