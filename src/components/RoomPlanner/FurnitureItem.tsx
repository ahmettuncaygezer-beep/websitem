'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { PlacedFurniture } from './planner.types';
import { usePlannerStore } from './plannerStore';
import { getFallbackSVG } from './FurnitureSVGs';
import PlacedItemControls from './PlacedItemControls';

interface FurnitureItemProps {
    item: PlacedFurniture;
    scale: number;
    isSelected: boolean;
    onSelect: () => void;
    onUpdate: (updates: Partial<PlacedFurniture>) => void;
    onRemove: () => void;
    onDuplicate: () => void;
}

export default function FurnitureItem({
    item,
    scale,
    isSelected,
    onSelect,
    onUpdate,
    onRemove,
    onDuplicate
}: FurnitureItemProps) {
    const [imageFailed, setImageFailed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const saveToHistory = usePlannerStore(s => s.saveToHistory);

    const dragX = useMotionValue(0);
    const dragY = useMotionValue(0);

    // Resize Logic
    const handleResizeStart = (edge: string, e: React.PointerEvent) => {
        e.stopPropagation();
        saveToHistory();

        const startX = e.clientX;
        const startY = e.clientY;
        const startW = item.width;
        const startH = item.depth;
        const startLeft = item.x;
        const startTop = item.y;

        // Note: resizing while rotated requires complex trigonometry.
        // For simplicity in a 2D web planner, we'll implement simple unrotated resizing math here,
        // or let the user reset rotation first. Given constraints, simple math:

        const handlePointerMove = (moveEv: PointerEvent) => {
            const dx = moveEv.clientX - startX;
            const dy = moveEv.clientY - startY;

            let newW = startW;
            let newH = startH;
            let newX = startLeft;
            let newY = startTop;

            if (edge.includes('e')) newW = Math.max(20, startW + dx);
            if (edge.includes('w')) {
                newW = Math.max(20, startW - dx);
                newX = startLeft + (startW - newW);
            }
            if (edge.includes('s')) newH = Math.max(20, startH + dy);
            if (edge.includes('n')) {
                newH = Math.max(20, startH - dy);
                newY = startTop + (startH - newH);
            }

            onUpdate({ width: newW, depth: newH, x: newX, y: newY });
        };

        const handlePointerUp = () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    const handleDragEnd = (e: any, info: any) => {
        // Sürükleme bittiğinde toplam yer değiştirmeyi hesaplayıp store'u güncelliyoruz
        const dx = info.offset.x / scale;
        const dy = info.offset.y / scale;

        onUpdate({
            x: item.x + dx,
            y: item.y + dy
        });

        // Reset transform to avoid double displacement when re-render sets new left/top
        // Framer motion does this by default if we don't bind to motion values
        dragX.set(0);
        dragY.set(0);
    };

    return (
        <motion.div
            ref={containerRef}
            drag={!item.isLocked}
            dragMomentum={false}
            dragElastic={0}
            onDragStart={() => {
                onSelect();
                saveToHistory();
            }}
            onDragEnd={handleDragEnd}
            onPointerDown={(e) => {
                e.stopPropagation();
                onSelect();
            }}
            style={{
                position: 'absolute',
                left: item.x * scale,
                top: item.y * scale,
                width: item.width * scale,
                height: item.depth * scale,
                rotate: item.rotation,
                zIndex: isSelected ? 50 : item.zIndex,
                touchAction: 'none',
                x: dragX,
                y: dragY
            }}
            className="group"
        >
            {/* The Item Visual */}
            <div className={`w-full h-full relative cursor-grab active:cursor-grabbing transition-all duration-300 ${!isSelected && 'group-hover:scale-[1.03]'}`}>
                {!imageFailed ? (
                    <img
                        src={item.product?.image}
                        alt=""
                        className={`w-full h-full object-contain pointer-events-none transition-all duration-300 ${isSelected ? 'drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]' : 'drop-shadow-[0_5px_15px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]'}`}
                        onError={() => setImageFailed(true)}
                        draggable={false}
                    />
                ) : (
                    <div className={`w-full h-full pointer-events-none transition-all duration-300 ${isSelected ? 'drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]' : 'opacity-95 drop-shadow-[0_5px_15px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]'}`}>
                        {getFallbackSVG(item.category, { width: '100%', height: '100%', fillColor: item.color, strokeColor: '#1C1C1E' })}
                    </div>
                )}
            </div>

            {/* Selection Controls overlay */}
            {isSelected && (
                <PlacedItemControls
                    item={item}
                    onRotate={(deg) => onUpdate({ rotation: deg })}
                    onDuplicate={() => onDuplicate()}
                    onRemove={() => onRemove()}
                    onResizeStart={handleResizeStart}
                />
            )}
        </motion.div>
    );
}
