import React, { useState, useRef, useEffect, memo } from 'react';
import { usePlannerStore } from './plannerStore';
import FurnitureItem from './FurnitureItem';
import { PlacedFurniture, PlannerProduct } from './planner.types';
import { Plus, Minus, Hand, MousePointer2 } from 'lucide-react';

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
    const updateItem = usePlannerStore((s) => s.updateItem);
    const showGrid = usePlannerStore((s) => s.showGrid);
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

    // 50cm grid pattern
    const renderGrid = () => {
        if (!showGrid) return null;
        return (
            <defs>
                <pattern
                    id="grid-pattern"
                    width={50 * scale}
                    height={50 * scale}
                    patternUnits="userSpaceOnUse"
                    x={pan.x % (50 * scale)}
                    y={pan.y % (50 * scale)}
                >
                    <path
                        d={`M ${50 * scale} 0 L 0 0 0 ${50 * scale}`}
                        fill="none"
                        stroke="rgba(0,0,0,0.05)"
                        strokeWidth="1"
                    />
                </pattern>
            </defs>
        );
    };

    const MemoizedFurnitureItems = memo(function MemoizedFurnitureItems({
        items,
        scale,
        selectedItemId,
        setSelectedItem,
        updateItem,
        removeItem,
        duplicateItem
    }: {
        items: PlacedFurniture[];
        scale: number;
        selectedItemId: string | null;
        setSelectedItem: (id: string | null) => void;
        updateItem: (id: string, updates: Partial<PlacedFurniture>) => void;
        removeItem: (id: string) => void;
        duplicateItem: (id: string) => void;
    }) {
        return (
            <>
                {items.map((item) => (
                    <FurnitureItem
                        key={item.id}
                        item={item}
                        scale={scale}
                        isSelected={selectedItemId === item.id}
                        onSelect={() => setSelectedItem(item.id)}
                        onUpdate={(updates: Partial<PlacedFurniture>) => updateItem(item.id, updates)}
                        onRemove={() => removeItem(item.id)}
                        onDuplicate={() => duplicateItem(item.id)}
                    />
                ))}
            </>
        );
    });

    return (
        <div
            ref={containerRef}
            className="flex-1 relative bg-[#F8F6F3] overflow-hidden cursor-grab active:cursor-grabbing h-full"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onWheel={handleWheel}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <div
                ref={workspaceRef}
                className="absolute inset-0 transition-transform duration-75 ease-out"
                style={{
                    transform: `translate(${pan.x}px, ${pan.y}px)`,
                }}
            >
                {/* ROOM AREA */}
                <div
                    className="relative bg-white shadow-2xl transition-all duration-300"
                    style={{
                        width: room.width * scale,
                        height: room.depth * scale,
                        backgroundColor: room.wallColor,
                        // Visual floor style
                        backgroundImage: room.floorType === 'wood' ? 'url(/images/planner/wood-floor.jpg)' : 'none',
                        backgroundSize: '200px',
                    }}
                >
                    {/* SVG LAYER FOR GRID AND SELECTION */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {renderGrid()}
                        {showGrid && <rect width="100%" height="100%" fill="url(#grid-pattern)" />}
                    </svg>

                    {/* FURNITURE ITEMS */}
                    <MemoizedFurnitureItems
                        items={items}
                        scale={scale}
                        selectedItemId={selectedItemId}
                        setSelectedItem={setSelectedItem}
                        updateItem={updateItem}
                        removeItem={removeItem}
                        duplicateItem={duplicateItem}
                    />
                </div>
            </div>

            {/* ZOOM CONTROLS */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-40">
                <button onClick={() => setScale(s => Math.min(s + 0.1, 3))} className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F0EB] transition-colors border border-[#E8E3DC]">
                    <Plus size={20} />
                </button>
                <button onClick={() => setScale(s => Math.max(s - 0.1, 0.2))} className="w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#1C1C1E] hover:bg-[#F5F0EB] transition-colors border border-[#E8E3DC]">
                    <Minus size={20} />
                </button>
                <div className="bg-white px-2 py-1 rounded-sm shadow text-[10px] font-bold text-center border border-[#E8E3DC]">
                    %{Math.round(scale * 100)}
                </div>
            </div>

            {/* GUIDES / HINTS */}
            <div className="absolute bottom-6 left-6 pointer-events-none z-40">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-sm border border-[#E8E3DC] shadow-sm">
                    <p className="text-[10px] text-[#999] uppercase font-bold tracking-widest mb-1" data-lang-key="planner_controls">Kontroller</p>
                    <div className="flex gap-4">
                        <span className="text-[11px] text-[#1C1C1E] flex items-center gap-1.5"><Hand size={12} className="text-[#C9A96E]" /> <span data-lang-key="planner_ctrl_pan">Pan: Orta Tuş / Shift</span></span>
                        <span className="text-[11px] text-[#1C1C1E] flex items-center gap-1.5"><MousePointer2 size={12} className="text-[#C9A96E]" /> <span data-lang-key="planner_ctrl_zoom">Zoom: Mouse Tekerleği</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
