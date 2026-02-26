'use client';

import React, { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { PlannerProduct } from './planner.types';
import { getFallbackSVG } from './FurnitureSVGs';
import { usePlannerStore } from './plannerStore';

export default function FurnitureCard({ product }: { product: PlannerProduct }) {
    const [imageFailed, setImageFailed] = useState(false);
    const addItem = usePlannerStore((state) => state.addItem);
    const room = usePlannerStore((state) => state.room);

    // Dimension formatting
    const dimText = `${product.dimensions.width}×${product.dimensions.depth} cm`;

    // Handle Add via Click
    const handleAddClick = () => {
        const nanoid = Math.random().toString(36).substring(2, 9);
        addItem({
            id: nanoid,
            productId: product.id,
            name: product.name,
            category: product.category,
            // Placed roughly in center of the room initially
            x: room.width / 2,
            y: room.depth / 2,
            width: product.dimensions.width,
            depth: product.dimensions.depth,
            rotation: 0,
            color: '#1C1C1E', // Default dark color 
            isLocked: false,
            zIndex: 10,
            product: product
        });
    };

    // Handle Drag
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        // We set the product JSON to be caught by the Canvas's onDrop
        e.dataTransfer.setData('application/json', JSON.stringify(product));
        e.dataTransfer.effectAllowed = 'copy';

        // Make the drag ghost slightly transparent
        const el = e.currentTarget;
        setTimeout(() => {
            el.style.opacity = '0.5';
        }, 0);
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1';
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="group relative bg-white border border-[#E8E3DC] rounded-sm overflow-hidden flex flex-col cursor-grab active:cursor-grabbing hover:border-[#C9A96E] hover:shadow-sm hover:-translate-y-[1px] transition-all duration-200"
        >
            {/* Image Area */}
            <div className="relative w-full aspect-square bg-[#F5F0EB] flex items-center justify-center p-4">

                {/* Fallback rendering logic inside JSX */}
                {!imageFailed ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain drop-shadow-sm"
                        onError={() => setImageFailed(true)}
                        draggable={false} // Prevent default browser image dragging instead of our div
                    />
                ) : (
                    // SVG Placeholder exactly as requested
                    <div className="w-full h-full flex items-center justify-center opacity-70">
                        {getFallbackSVG(product.category, { width: '80%', height: '80%' })}
                    </div>
                )}

                {/* Dimension Badge */}
                <span className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm border border-white/40 text-[#1C1C1E] text-[10px] font-medium px-2 py-0.5 rounded-full z-10">
                    {dimText}
                </span>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 z-20">
                    <button
                        onClick={handleAddClick}
                        className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white transition-colors"
                        title="Odaya Ekle"
                    >
                        <Plus size={18} />
                    </button>
                    <button
                        className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white transition-colors"
                        title="Önizle"
                    >
                        <Eye size={18} />
                    </button>
                </div>
            </div>

            {/* Info Area */}
            <div className="p-3 bg-white flex flex-col">
                <span className="text-[12px] font-medium text-[#1C1C1E] truncate">{product.name}</span>
                <span className="text-[10px] text-[#999] mt-0.5">{dimText}</span>
                <span className="text-[12px] font-bold text-[#C9A96E] mt-1.5">
                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(product.price)}
                </span>
            </div>
        </div>
    );
}
