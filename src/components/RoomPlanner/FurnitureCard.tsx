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
            className="group relative bg-white border border-[#E8E3DC]/60 rounded-xl overflow-hidden flex flex-col cursor-grab active:cursor-grabbing hover:border-[#C9A96E]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            {/* Image Area */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#FAFAF9] to-white flex items-center justify-center p-4">

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
                <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-md border border-white/50 text-[#1C1C1E] text-[9px] font-bold px-2 py-1 rounded-full z-10 shadow-sm tracking-wide">
                    {dimText}
                </span>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
                    <button
                        onClick={handleAddClick}
                        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1C1C1E] hover:bg-[#C9A96E] hover:text-white hover:scale-110 transition-all duration-300"
                        title="Odaya Ekle"
                    >
                        <Plus size={18} />
                    </button>
                    <button
                        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white hover:scale-110 transition-all duration-300"
                        title="Önizle"
                    >
                        <Eye size={18} />
                    </button>
                </div>
            </div>

            {/* Info Area */}
            <div className="p-4 bg-white flex flex-col border-t border-[#E8E3DC]/30">
                <span className="text-[13px] font-bold text-[#1C1C1E] truncate mb-0.5">{product.name}</span>
                <span className="text-[11px] text-[#999] font-medium mb-2">{product.category}</span>
                <span className="text-[13px] font-black text-[#C9A96E]">
                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', minimumFractionDigits: 0 }).format(product.price)}
                </span>
            </div>
        </div>
    );
}
