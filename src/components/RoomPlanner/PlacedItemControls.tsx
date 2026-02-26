import React from 'react';
import { RotateCw, Trash2, Copy } from 'lucide-react';
import { PlacedFurniture } from './planner.types';

interface Props {
    item: PlacedFurniture;
    onRotate: (delta: number) => void;
    onDuplicate: () => void;
    onRemove: () => void;
    onResizeStart: (edge: string, e: React.PointerEvent) => void;
}

export default function PlacedItemControls({ item, onRotate, onDuplicate, onRemove, onResizeStart }: Props) {
    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 100 }}>
            {/* Dashed Selection Border */}
            <div className="absolute inset-x-[-4px] inset-y-[-4px] border-2 border-dashed border-[#2563EB]/60" />

            {/* Resize Handles - Corners */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-[#2563EB] rounded-full pointer-events-auto cursor-nwse-resize" onPointerDown={(e) => onResizeStart('nw', e)} />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-[#2563EB] rounded-full pointer-events-auto cursor-nesw-resize" onPointerDown={(e) => onResizeStart('ne', e)} />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-[#2563EB] rounded-full pointer-events-auto cursor-nesw-resize" onPointerDown={(e) => onResizeStart('sw', e)} />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-[#2563EB] rounded-full pointer-events-auto cursor-nwse-resize" onPointerDown={(e) => onResizeStart('se', e)} />

            {/* Resize Handles - Edges */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-2 bg-white border border-[#2563EB] rounded-sm pointer-events-auto cursor-ns-resize" onPointerDown={(e) => onResizeStart('n', e)} />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-2 bg-white border border-[#2563EB] rounded-sm pointer-events-auto cursor-ns-resize" onPointerDown={(e) => onResizeStart('s', e)} />
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-4 bg-white border border-[#2563EB] rounded-sm pointer-events-auto cursor-ew-resize" onPointerDown={(e) => onResizeStart('w', e)} />
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-4 bg-white border border-[#2563EB] rounded-sm pointer-events-auto cursor-ew-resize" onPointerDown={(e) => onResizeStart('e', e)} />

            {/* Rotation Handle */}
            <div
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-[#2563EB] rounded-full flex items-center justify-center text-[#2563EB] pointer-events-auto cursor-crosshair shadow-sm hover:scale-110 transition-transform"
                onPointerDown={(e) => {
                    e.stopPropagation();
                    const startY = e.clientY;
                    const startRot = item.rotation;

                    const handleMove = (moveEvent: PointerEvent) => {
                        const dy = moveEvent.clientY - startY;
                        // Map vertical mouse movement to horizontal rotation degrees
                        onRotate(startRot + dy);
                    };
                    const handleUp = () => {
                        window.removeEventListener('pointermove', handleMove);
                        window.removeEventListener('pointerup', handleUp);
                    };
                    window.addEventListener('pointermove', handleMove);
                    window.addEventListener('pointerup', handleUp);
                }}
            >
                <div className="w-px h-6 bg-[#2563EB] absolute top-full left-1/2 -translate-x-1/2" />
                <RotateCw size={12} />
            </div>

            {/* Float Toolbar */}
            <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 flex bg-white rounded-full shadow-lg border border-[#E8E3DC] overflow-hidden pointer-events-auto">
                <button title="Çoğalt (Ctrl+D)" onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="px-3 py-1.5 hover:bg-[#F5F0EB] text-[#1C1C1E] transition-colors border-r border-[#E8E3DC]">
                    <Copy size={14} />
                </button>
                <button title="Sil (Delete)" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="px-3 py-1.5 hover:bg-red-50 text-red-500 transition-colors">
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}
