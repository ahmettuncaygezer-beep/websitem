'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import type { FurnitureCatalogItem } from '../types/planner.types';

interface Props { item: FurnitureCatalogItem; onAdd: (item: FurnitureCatalogItem) => void; }

export function FurnitureItem({ item, onAdd }: Props) {
    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('application/json', JSON.stringify(item));
                e.dataTransfer.effectAllowed = 'copy';
            }}
            className="group relative rounded-sm overflow-hidden transition-all duration-200"
            style={{
                background: '#FAFAF8', border: '1px solid #F0EDE8', padding: 10,
                cursor: 'grab', userSelect: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(201,169,110,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#F0EDE8'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            {/* Thumbnail */}
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '1', background: 'white', padding: 4 }}>
                <Image src={item.thumbnail} alt={item.name} fill className="object-contain" sizes="120px" />
            </div>

            {/* Info */}
            <p className="text-[11px] font-medium mt-2 line-clamp-2" style={{ color: '#1C1C1E' }}>{item.name}</p>
            <p className="text-[10px]" style={{ color: '#999' }}>{(item.dimensions.width * 100).toFixed(0)}×{(item.dimensions.depth * 100).toFixed(0)} cm</p>
            <p className="text-[12px] font-bold mt-0.5" style={{ color: '#C9A96E' }}>₺{item.price.toLocaleString('tr-TR')}</p>

            {/* Quick add */}
            <button onClick={(e) => { e.stopPropagation(); onAdd(item); }}
                className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ background: '#C9A96E', color: 'white', border: 'none', cursor: 'pointer' }}
                title="Odaya ekle">
                <Plus size={14} />
            </button>
        </div>
    );
}
