'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePlannerStore } from './plannerStore';
import GridOverlay from './GridOverlay';
import FurnitureItem from './FurnitureItem';
import { PlacedFurniture, PlannerProduct } from './planner.types';

export default function PlannerCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const workspaceRef = useRef<HTMLDivElement>(null);

    // Store
    const room = usePlannerStore((s) => s.room);
    const items = usePlannerStore((s) => s.items);
    const addItem = usePlannerStore((s) => s.addItem);
    const setSelectedItem = usePlannerStore((s) => s.setSelectedItem);
    const selectedItemId = usePlannerStore((s) => s.selectedItemId);
    const removeItem = usePlannerStore((s) => s.removeItem);
    const duplicateItem = usePlannerStore((s) => s.duplicateItem);
    const undo = usePlannerStore((s) => s.undo);
    const redo = usePlannerStore((s) => s.redo);
    const toggleGrid = usePlannerStore((s) => s.toggleGrid);

    // Pan & Zoom State
    const [scale, setScale] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isPanning, setIsPanning] = useState(false);

    // Initial centering
    useEffect(() => {
        if (containerRef.current) {
            const containerW = containerRef.current.clientWidth;
            const containerH = containerRef.current.clientHeight;
            // Center the room at 100% scale
            setPan({
                x: (containerW - room.width) / 2,
                y: (containerH - room.depth) / 2
            });
            // Try to fit bounds
            const minScaleV = (containerH - 100) / room.depth;
            const minScaleH = (containerW - 100) / room.width;
            const bestScale = Math.min(minScaleV, minScaleH, 1);
            setScale(bestScale);
        }
    }, [room.width, room.depth]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Delete
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedItemId) {
                // Ignore if we are typing in an input
                if (document.activeElement?.tagName === 'INPUT') return;
                removeItem(selectedItemId);
            }
            // Undo / Redo
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
                if (e.shiftKey) redo(); else undo();
            }
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
                redo();
            }
            // Duplicate
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd' && selectedItemId) {
                e.preventDefault();
                duplicateItem(selectedItemId);
            }
            // Grid Toggle
            if (e.key.toLowerCase() === 'g') {
                // Ignore if we are typing in an input
                if (document.activeElement?.tagName === 'INPUT') return;
                toggleGrid();
            }
            // Escape to deselect
            if (e.key === 'Escape') {
                setSelectedItem(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItemId, removeItem, undo, redo, duplicateItem, toggleGrid, setSelectedItem]);

    // Zoom via wheel
    const handleWheel = (e: React.WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
            // Zoom (Pinch or Ctrl+Scroll)
            e.preventDefault();
            const delta = e.deltaY * -0.005;
            let newScale = scale + delta;
            newScale = Math.max(0.25, Math.min(newScale, 4)); // clamp 25% to 400%
            setScale(newScale);
        } else {
            // Pan via trackpad
            setPan((prev) => ({
                x: prev.x - e.deltaX,
                y: prev.y - e.deltaY
            }));
        }
    };

    // Pan via Middle Mouse Button or Space + Drag
    useEffect(() => {
        const handleSpaceDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT') {
                e.preventDefault();
                document.body.style.cursor = 'grab';
            }
        };
        const handleSpaceUp = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                document.body.style.cursor = 'default';
            }
        };
        window.addEventListener('keydown', handleSpaceDown);
        window.addEventListener('keyup', handleSpaceUp);
        return () => {
            window.removeEventListener('keydown', handleSpaceDown);
            window.removeEventListener('keyup', handleSpaceUp);
        };
    }, []);

    const handlePointerDown = (e: React.PointerEvent) => {
        if (e.button === 1 || e.shiftKey) { // Middle click or shift click to pan
            setIsPanning(true);
            e.currentTarget.setPointerCapture(e.pointerId);
        } else {
            // Left click on empty space = deselect
            if (e.target === workspaceRef.current || e.target === containerRef.current) {
                setSelectedItem(null);
            }
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (isPanning) {
            setPan((prev) => ({
                x: prev.x + e.movementX,
                y: prev.y + e.movementY
            }));
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (isPanning) {
            setIsPanning(false);
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    };

    // Handle Drop from Library
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        try {
            const dataStr = e.dataTransfer.getData('application/json');
            if (dataStr) {
                const product = JSON.parse(dataStr) as PlannerProduct;

                // Calculate drop coordinates relative to the ROOM itself, considering scale and pan
                // The e.clientX is relative to the viewport.
                if (workspaceRef.current) {
                    const rect = workspaceRef.current.getBoundingClientRect();
                    // rect.left/top includes the scale and translations

                    const dropX = (e.clientX - rect.left) / scale;
                    const dropY = (e.clientY - rect.top) / scale;

                    const nanoid = Math.random().toString(36).substring(2, 9);
                    addItem({
                        id: nanoid,
                        productId: product.id,
                        name: product.name,
                        category: product.category,
                        // Center the item exactly where the mouse dropped
                        x: dropX - (product.dimensions.width / 2),
                        y: dropY - (product.dimensions.depth / 2),
                        width: product.dimensions.width,
                        depth: product.dimensions.depth,
                        rotation: 0,
                        color: '#1C1C1E',
                        isLocked: false,
                        zIndex: 10,
                        product: product
                    });
                }
            }
        } catch (err) {
            console.error('Invalid drop payload', err);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const floorTextures: Record<string, string> = {
        'wood': 'linear-gradient(rgba(212,184,150,0.8), rgba(212,184,150,0.8)), repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.05) 19px, rgba(0,0,0,0.05) 20px)',
        'marble': 'linear-gradient(rgba(232,228,224,1), rgba(232,228,224,1))', // Complex svg patterns skipped for brevity, base color
        'carpet': 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
        'concrete': 'linear-gradient(rgba(200,196,192,1), rgba(200,196,192,1))',
        'ceramic': 'repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 8px)'
    };

    const floorBg = floorTextures[room.floorType] || floorTextures['wood'];
    const floorColor = room.floorType === 'carpet' ? '#B5A090' : room.floorType === 'ceramic' ? '#E5E0DB' : 'transparent';

    return (
        <div
            ref={containerRef}
            className={`w-full h-full relative overflow-hidden outline-none ${isPanning ? 'cursor-grabbing' : 'cursor-default'}`}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            tabIndex={0} // Makes it focusable to catch keyboard events easily
        >
            <GridOverlay />

            {/* Display Top Left Control Indicator */}
            <div className="absolute top-4 left-4 z-40 flex items-center gap-3 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-[#E8E3DC] pointer-events-none">
                <span className="text-[11px] font-bold text-[#C9A96E]">{Math.round(scale * 100)}%</span>
            </div>

            {/* The Transformable Workspace Plane */}
            <div
                className="absolute top-0 left-0 origin-top-left will-change-transform"
                style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                    transition: isPanning ? 'none' : 'transform 0.05s linear'
                }}
            >
                {/* The Actual Configured Room boundary */}
                <div
                    ref={workspaceRef}
                    className="relative shadow-xl border-4 transition-colors duration-500"
                    style={{
                        width: room.width,
                        height: room.depth,
                        backgroundColor: floorColor, // Base layer
                        backgroundImage: floorBg, // Texture top
                        backgroundSize: room.floorType === 'carpet' ? '4px 4px' : '100% 100%',
                        borderColor: room.wallColor
                    }}
                >
                    {/* Dimension Markers */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-[#666] whitespace-nowrap">
                        &larr; {room.width / 100} m &rarr;
                    </div>
                    <div className="absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90 text-[10px] font-medium text-[#666] whitespace-nowrap">
                        &larr; {room.depth / 100} m &rarr;
                    </div>

                    {/* All Items */}
                    {items.map((item) => (
                        <FurnitureItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
