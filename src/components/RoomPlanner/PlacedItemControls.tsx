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
            {/* Elegant Selection Border */}
            <div className="absolute inset-x-[-2px] inset-y-[-2px] border-[1.5px] border-[#C9A96E] rounded-sm ring-4 ring-[#C9A96E]/20" />

            {/* Resize Handles - Corners */}
            <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-[1.5px] border-[#C9A96E] rounded-full shadow-md pointer-events-auto cursor-nwse-resize hover:scale-125 transition-transform" onPointerDown={(e) => onResizeStart('nw', e)} />
            <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-[1.5px] border-[#C9A96E] rounded-full shadow-md pointer-events-auto cursor-nesw-resize hover:scale-125 transition-transform" onPointerDown={(e) => onResizeStart('ne', e)} />
            <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-[1.5px] border-[#C9A96E] rounded-full shadow-md pointer-events-auto cursor-nesw-resize hover:scale-125 transition-transform" onPointerDown={(e) => onResizeStart('sw', e)} />
            <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-[1.5px] border-[#C9A96E] rounded-full shadow-md pointer-events-auto cursor-nwse-resize hover:scale-125 transition-transform" onPointerDown={(e) => onResizeStart('se', e)} />

            {/* Resize Handles - Edges */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-[5px] bg-white border-[1px] border-[#C9A96E] rounded-full pointer-events-auto cursor-ns-resize" onPointerDown={(e) => onResizeStart('n', e)} />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[5px] bg-white border-[1px] border-[#C9A96E] rounded-full pointer-events-auto cursor-ns-resize" onPointerDown={(e) => onResizeStart('s', e)} />
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-[5px] h-4 bg-white border-[1px] border-[#C9A96E] rounded-full pointer-events-auto cursor-ew-resize" onPointerDown={(e) => onResizeStart('w', e)} />
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-[5px] h-4 bg-white border-[1px] border-[#C9A96E] rounded-full pointer-events-auto cursor-ew-resize" onPointerDown={(e) => onResizeStart('e', e)} />

            {/* Rotation Handle */}
            <div
                className="absolute -top-14 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/90 backdrop-blur-md border border-[#E8E3DC] rounded-full flex items-center justify-center text-[#1C1C1E] pointer-events-auto cursor-crosshair shadow-lg hover:scale-110 transition-transform relative group"
                onPointerDown={(e) => {
                    e.stopPropagation();
                    const startY = e.clientY;
                    const startRot = item.rotation;

                    const handleMove = (moveEvent: PointerEvent) => {
                        const dy = moveEvent.clientY - startY;
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
                {/* Connecting Line */}
                <div className="w-px h-[23px] bg-[#C9A96E]/50 absolute top-[100%] left-1/2 -translate-x-1/2 group-hover:bg-[#C9A96E]" />
                <RotateCw size={14} className="group-hover:text-[#C9A96E] transition-colors" />
            </div>

            {/* Float Toolbar */}
            <div className="absolute -top-[80px] left-1/2 -translate-x-1/2 flex bg-[#1C1C1E]/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 overflow-hidden pointer-events-auto transform scale-90 sm:scale-100 origin-center transition-transform">
                <button title="Çoğalt (Ctrl+D)" onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="px-4 py-2.5 hover:bg-[#C9A96E] text-white transition-colors border-r border-white/10 flex items-center justify-center gap-1.5 font-medium text-[11px]">
                    <Copy size={14} /> Çoğalt
                </button>
                <button title="Sil (Delete)" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="px-4 py-2.5 hover:bg-red-500 text-white transition-colors flex items-center justify-center gap-1.5 font-medium text-[11px]">
                    <Trash2 size={14} /> Sil
                </button>
            </div>
        </div>
    );
}
