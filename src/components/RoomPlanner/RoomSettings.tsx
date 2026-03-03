'use client';

import React, { useState } from 'react';
import { X, Trash2, Copy, MoveDiagonal, RotateCw } from 'lucide-react';
import { usePlannerStore } from './plannerStore';
import { FloorType } from './planner.types';
import { useGlobal } from '@/context/GlobalContext';
import { useCart } from '@/context/CartContext';

const FLOOR_TYPES: { id: FloorType, name: string, nameKey: string, icon: string }[] = [
    { id: 'wood', name: 'Parke', nameKey: 'planner_floor_wood', icon: '🟫' },
    { id: 'marble', name: 'Mermer', nameKey: 'planner_floor_marble', icon: '🩶' },
    { id: 'carpet', name: 'Halı', nameKey: 'planner_floor_carpet', icon: '🟤' },
    { id: 'concrete', name: 'Beton', nameKey: 'planner_floor_concrete', icon: '⬜' },
    { id: 'ceramic', name: 'Seramik', nameKey: 'planner_floor_ceramic', icon: '🟨' },
];

const WALL_COLORS = [
    '#FFFFFF', '#F5F0EB', '#E8E4E0', '#A3A3A3',
    '#D4B896', '#E0F2FE', '#0D9488', '#1E3A8A',
    '#FCE7F3', '#C2410C', '#4D7C0F', '#1C1C1E'
];

export default function RoomSettings({ onClose }: { onClose: () => void }) {
    const [activeTab, setActiveTab] = useState<'room' | 'item'>('room');

    // Store data
    const room = usePlannerStore(s => s.room);
    const updateRoom = usePlannerStore(s => s.updateRoom);
    const selectedItemId = usePlannerStore(s => s.selectedItemId);
    const items = usePlannerStore(s => s.items);
    const updateItem = usePlannerStore(s => s.updateItem);
    const removeItem = usePlannerStore(s => s.removeItem);
    const duplicateItem = usePlannerStore(s => s.duplicateItem);

    const selectedItem = items.find(i => i.id === selectedItemId);

    // If an item is selected, we could auto-switch to 'item' tab, but letting the user switch is fine.
    // For better UX, let's force switch when selectedItem changes to non-null
    React.useEffect(() => {
        if (selectedItemId) setActiveTab('item');
        else setActiveTab('room');
    }, [selectedItemId]);

    const { t, formatPrice } = useGlobal();
    const { addItem } = useCart();

    const handleAddToCart = () => {
        if (!selectedItem || !selectedItem.product) return;
        addItem({
            id: selectedItem.product.id,
            name: selectedItem.product.name,
            brand: selectedItem.product.brand || 'SELIS Exclusive',
            price: selectedItem.product.price,
            image: selectedItem.product.image,
            href: selectedItem.product.originalHref || `/urun/${selectedItem.product.id}`
        });
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header + Tabs */}
            <div className="flex flex-col border-b border-[#E8E3DC] flex-shrink-0">
                <div className="flex items-center justify-between p-4 pb-2">
                    <h2 className="text-[14px] font-bold text-[#1C1C1E]" data-lang-key="planner_properties">{t('planner_properties')}</h2>
                    <button onClick={onClose} className="text-[#999] hover:text-[#1C1C1E] transition-colors">
                        <X size={18} />
                    </button>
                </div>
                <div className="flex px-4 gap-4 mt-2">
                    <button
                        onClick={() => setActiveTab('room')}
                        className={`pb-2 text-[13px] font-medium transition-colors border-b-2 ${activeTab === 'room' ? 'border-[#C9A96E] text-[#1C1C1E]' : 'border-transparent text-[#999] hover:text-[#1C1C1E]'}`}
                    >
                        <span data-lang-key="planner_prop_room">{t('planner_prop_room')}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('item')}
                        className={`pb-2 text-[13px] font-medium transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === 'item' ? 'border-[#C9A96E] text-[#1C1C1E]' : 'border-transparent text-[#999] hover:text-[#1C1C1E]'}`}
                    >
                        <span data-lang-key="planner_prop_selected">{t('planner_prop_selected')}</span>
                        {selectedItem && <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />}
                    </button>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-[#FAFAF9]">

                {activeTab === 'room' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* dimensions */}
                        <div>
                            <h3 className="text-[12px] font-bold tracking-wider text-[#999] uppercase mb-4" data-lang-key="planner_dimensions">{t('planner_dimensions')}</h3>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-[13px] font-medium text-[#1C1C1E]" data-lang-key="planner_width">{t('planner_width')}</label>
                                        <span className="text-[12px] text-[#666]">{room.width / 100} m</span>
                                    </div>
                                    <input
                                        type="range" min="200" max="1500" step="50"
                                        value={room.width}
                                        onChange={(e) => updateRoom({ width: Number(e.target.value) })}
                                        className="w-full h-1 bg-[#E8E3DC] rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-[13px] font-medium text-[#1C1C1E]" data-lang-key="planner_length">{t('planner_length')}</label>
                                        <span className="text-[12px] text-[#666]">{room.depth / 100} m</span>
                                    </div>
                                    <input
                                        type="range" min="200" max="1200" step="50"
                                        value={room.depth}
                                        onChange={(e) => updateRoom({ depth: Number(e.target.value) })}
                                        className="w-full h-1 bg-[#E8E3DC] rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Floor */}
                        <div>
                            <h3 className="text-[12px] font-bold tracking-wider text-[#999] uppercase mb-4" data-lang-key="planner_floor_type">{t('planner_floor_type')}</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {FLOOR_TYPES.map(floor => (
                                    <button
                                        key={floor.id}
                                        onClick={() => updateRoom({ floorType: floor.id })}
                                        className={`flex flex-col items-center justify-center py-3 border rounded-sm transition-all duration-200
                                            ${room.floorType === floor.id ? 'border-[#C9A96E] bg-[#F5F0EB]' : 'border-[#E8E3DC] bg-white hover:border-[#C9A96E] hover:bg-[#F9F9f9]'}
                                        `}
                                    >
                                        <span className="text-xl mb-1">{floor.icon}</span>
                                        <span className={`text-[12px] ${room.floorType === floor.id ? 'font-semibold text-[#1C1C1E]' : 'font-medium text-[#666]'}`} data-lang-key={floor.nameKey}>{t(floor.nameKey) || floor.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Walls */}
                        <div>
                            <h3 className="text-[12px] font-bold tracking-wider text-[#999] uppercase mb-4" data-lang-key="planner_wall_color">{t('planner_wall_color')}</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {WALL_COLORS.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => updateRoom({ wallColor: color })}
                                        style={{ backgroundColor: color }}
                                        className={`w-10 h-10 rounded-full border-2 transition-transform duration-200
                                            ${room.wallColor === color ? 'border-[#1C1C1E] scale-110 shadow-md' : 'border-black/10 hover:scale-105'}
                                        `}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'item' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full">
                        {!selectedItem ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-[#999]">
                                <MoveDiagonal size={32} className="mb-3 opacity-20" />
                                <p className="text-[13px]" data-lang-key="planner_select_item">{t('planner_select_item')}</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Item Header */}
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-16 bg-white border border-[#E8E3DC] rounded-sm flex items-center justify-center p-1">
                                        <img src={selectedItem.product.image} alt="" className="object-contain w-full h-full" />
                                    </div>
                                    <div>
                                        <h3 className="text-[14px] font-bold text-[#1C1C1E]">{selectedItem.name}</h3>
                                        <p className="text-[12px] text-[#666]">{selectedItem.width}×{selectedItem.depth} cm</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button onClick={() => duplicateItem(selectedItem.id)} className="flex-1 flex items-center justify-center gap-2 py-2 border border-[#E8E3DC] rounded-sm text-[12px] font-medium hover:bg-white transition-colors">
                                        <Copy size={14} /> <span data-lang-key="planner_duplicate">{t('planner_duplicate')}</span>
                                    </button>
                                    <button onClick={() => removeItem(selectedItem.id)} className="flex-1 flex items-center justify-center gap-2 py-2 border border-red-100 text-red-600 bg-red-50 rounded-sm text-[12px] font-medium hover:bg-red-100 transition-colors">
                                        <Trash2 size={14} /> <span data-lang-key="planner_delete">{t('planner_delete')}</span>
                                    </button>
                                </div>

                                {/* Transform */}
                                <div>
                                    <h4 className="text-[12px] font-bold tracking-wider text-[#999] uppercase mb-3" data-lang-key="planner_pos_size">{t('planner_pos_size')}</h4>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="text-[11px] text-[#666] mb-1 block" data-lang-key="planner_x_pos">{t('planner_x_pos')}</label>
                                            <input type="number" value={Math.round(selectedItem.x)} onChange={(e) => updateItem(selectedItem.id, { x: Number(e.target.value) })} className="w-full bg-white border border-[#E8E3DC] rounded-sm py-1.5 px-3 text-[13px]" />
                                        </div>
                                        <div>
                                            <label className="text-[11px] text-[#666] mb-1 block" data-lang-key="planner_y_pos">{t('planner_y_pos')}</label>
                                            <input type="number" value={Math.round(selectedItem.y)} onChange={(e) => updateItem(selectedItem.id, { y: Number(e.target.value) })} className="w-full bg-white border border-[#E8E3DC] rounded-sm py-1.5 px-3 text-[13px]" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="text-[11px] text-[#666] mb-1 block" data-lang-key="planner_width_cm">{t('planner_width_cm')}</label>
                                            <input type="number" value={Math.round(selectedItem.width)} onChange={(e) => updateItem(selectedItem.id, { width: Number(e.target.value) })} className="w-full bg-white border border-[#E8E3DC] rounded-sm py-1.5 px-3 text-[13px]" />
                                        </div>
                                        <div>
                                            <label className="text-[11px] text-[#666] mb-1 block" data-lang-key="planner_depth_cm">{t('planner_depth_cm')}</label>
                                            <input type="number" value={Math.round(selectedItem.depth)} onChange={(e) => updateItem(selectedItem.id, { depth: Number(e.target.value) })} className="w-full bg-white border border-[#E8E3DC] rounded-sm py-1.5 px-3 text-[13px]" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-[11px] text-[#666] flex items-center gap-1"><RotateCw size={12} /> <span data-lang-key="planner_rotate">{t('planner_rotate')}</span></label>
                                            <span className="text-[12px]">{Math.round(selectedItem.rotation)}&deg;</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="360"
                                            value={selectedItem.rotation}
                                            onChange={(e) => updateItem(selectedItem.id, { rotation: Number(e.target.value) })}
                                            className="w-full h-1 bg-[#E8E3DC] rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#E8E3DC]">
                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full py-3 bg-[#1C1C1E] text-white rounded-sm text-[13px] font-semibold hover:bg-[#C9A96E] transition-colors"
                                    >
                                        <span data-lang-key="planner_add_cart">{t('planner_add_cart')}</span> — {formatPrice(selectedItem.product.price)}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
