'use client';

import React, { useRef, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { PlacedFurniture } from './planner.types';
import { usePlannerStore } from './plannerStore';
import { getFallbackSVG } from './FurnitureSVGs';
import PlacedItemControls from './PlacedItemControls';

export default function FurnitureItem({ item }: { item: PlacedFurniture }) {
    const [imageFailed, setImageFailed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const updateItem = usePlannerStore(s => s.updateItem);
    const setSelectedItem = usePlannerStore(s => s.setSelectedItem);
    const selectedItemId = usePlannerStore(s => s.selectedItemId);
    const duplicateItem = usePlannerStore(s => s.duplicateItem);
    const removeItem = usePlannerStore(s => s.removeItem);
    const saveToHistory = usePlannerStore(s => s.saveToHistory);

    const isSelected = selectedItemId === item.id;
    const dragControls = useDragControls();

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

            updateItem(item.id, { width: newW, depth: newH, x: newX, y: newY });
        };

        const handlePointerUp = () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    return (
        <motion.div
            ref={containerRef}
            drag={!item.isLocked}
            dragControls={dragControls}
            dragMomentum={false}
            onDragStart={() => {
                setSelectedItem(item.id);
                saveToHistory();
            }}
            onDrag={(e, info) => {
                updateItem(item.id, { x: item.x + info.delta.x, y: item.y + info.delta.y });
            }}
            onPointerDown={(e) => {
                e.stopPropagation();
                setSelectedItem(item.id);
            }}
            // We use Framer Motion exactly to just position it absolute
            style={{
                position: 'absolute',
                left: item.x,
                top: item.y,
                width: item.width,
                height: item.depth,
                rotate: item.rotation,
                zIndex: isSelected ? 50 : item.zIndex,
                touchAction: 'none' // prevent scroll while drag
            }}
            className="group"
        // For dropping to center if the user drops via library while dragging
        >
            {/* The Item Visual */}
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
                {!imageFailed ? (
                    <img
                        src={item.product?.image}
                        alt=""
                        className="w-full h-full object-contain drop-shadow-md pointer-events-none"
                        onError={() => setImageFailed(true)}
                        draggable={false}
                    />
                ) : (
                    <div className="w-full h-full opacity-90 pointer-events-none drop-shadow-sm">
                        {getFallbackSVG(item.category, { width: '100%', height: '100%', fillColor: item.color, strokeColor: '#1C1C1E' })}
                    </div>
                )}
            </div>

            {/* Selection Controls overlay */}
            {isSelected && (
                <PlacedItemControls
                    item={item}
                    onRotate={(deg) => updateItem(item.id, { rotation: deg })}
                    onDuplicate={() => duplicateItem(item.id)}
                    onRemove={() => removeItem(item.id)}
                    onResizeStart={handleResizeStart}
                />
            )}
        </motion.div>
    );
}
