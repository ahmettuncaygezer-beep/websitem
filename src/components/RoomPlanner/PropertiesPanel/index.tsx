'use client';

import { usePlannerStore } from '../store/plannerStore';
import { Trash2, Copy, Lock, Unlock, Eye, EyeOff, ArrowUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function PropertiesPanel() {
    const { room, setRoom, furniture, selectedId, updateFurniture, removeFurniture, rotateFurniture, duplicateFurniture } = usePlannerStore();
    const selected = furniture.find((f) => f.id === selectedId);

    // ── No selection: Room Settings ──
    if (!selected) {
        return (
            <div className="flex flex-col h-full overflow-y-auto" style={{ background: 'white', borderLeft: '1px solid rgba(0,0,0,0.06)', scrollbarWidth: 'thin' }}>
                <div className="px-4 py-3" style={{ borderBottom: '1px solid #F0EDE8' }}>
                    <h2 className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#1C1C1E' }}>Oda Ayarları</h2>
                </div>

                <div className="p-4 space-y-5">
                    {/* Dimensions */}
                    {(['width', 'depth', 'height'] as const).map((k) => {
                        const labels: Record<string, string> = { width: 'En (Genişlik)', depth: 'Boy (Derinlik)', height: 'Yükseklik' };
                        const limits: Record<string, [number, number]> = { width: [1, 15], depth: [1, 15], height: [2, 4] };
                        const [min, max] = limits[k];
                        return (
                            <div key={k}>
                                <label className="text-[11px] font-medium uppercase tracking-wider block mb-1" style={{ color: '#999' }}>{labels[k]}</label>
                                <div className="flex items-center gap-3">
                                    <input type="range" min={min} max={max} step={0.1} value={room[k]}
                                        onChange={(e) => setRoom({ [k]: parseFloat(e.target.value) })}
                                        className="flex-1" style={{ accentColor: '#C9A96E' }} />
                                    <span className="text-[13px] font-medium w-12 text-right" style={{ color: '#1C1C1E' }}>{room[k].toFixed(1)} m</span>
                                </div>
                            </div>
                        );
                    })}

                    {/* Floor type */}
                    <div>
                        <label className="text-[11px] font-medium uppercase tracking-wider block mb-2" style={{ color: '#999' }}>Zemin Türü</label>
                        <div className="flex gap-2 flex-wrap">
                            {(['parquet', 'marble', 'carpet', 'concrete', 'ceramic'] as const).map((t) => {
                                const labels: Record<string, string> = { parquet: 'Parke', marble: 'Mermer', carpet: 'Halı', concrete: 'Beton', ceramic: 'Seramik' };
                                return (
                                    <button key={t} onClick={() => setRoom({ floorType: t })}
                                        className="px-3 py-1.5 text-[11px] font-medium rounded-sm transition-colors duration-150"
                                        style={{
                                            background: room.floorType === t ? '#1C1C1E' : '#F5F0EB',
                                            color: room.floorType === t ? 'white' : '#666',
                                            border: 'none', cursor: 'pointer',
                                        }}>
                                        {labels[t]}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Wall color */}
                    <div>
                        <label className="text-[11px] font-medium uppercase tracking-wider block mb-2" style={{ color: '#999' }}>Duvar Rengi</label>
                        <div className="flex gap-2 flex-wrap">
                            {['#FFFFFF', '#F5F0EB', '#E8E3DC', '#D5CEC5', '#C0B9AF', '#A8D8EA', '#C5E1A5', '#F8BBD0', '#455A64', '#37474F', '#263238', '#1C1C1E'].map((c) => (
                                <button key={c} onClick={() => setRoom({ wallColor: c })}
                                    className="w-7 h-7 rounded-full transition-transform duration-150"
                                    style={{
                                        background: c, border: room.wallColor === c ? '2px solid #C9A96E' : '1px solid #E0E0E0',
                                        transform: room.wallColor === c ? 'scale(1.15)' : 'scale(1)',
                                        cursor: 'pointer', outline: room.wallColor === c ? '2px solid white' : 'none',
                                    }}
                                    title={c} />
                            ))}
                        </div>
                        <input type="color" value={room.wallColor} onChange={(e) => setRoom({ wallColor: e.target.value })}
                            className="mt-2 w-full h-8 rounded-sm cursor-pointer" style={{ border: '1px solid #E8E3DC' }} />
                    </div>
                </div>
            </div>
        );
    }

    // ── Furniture selected: Properties ──
    return (
        <div className="flex flex-col h-full overflow-y-auto" style={{ background: 'white', borderLeft: '1px solid rgba(0,0,0,0.06)', scrollbarWidth: 'thin' }}>
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #F0EDE8' }}>
                <h2 className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#1C1C1E' }}>Özellikler</h2>
                <button onClick={() => removeFurniture(selected.id)} title="Sil"
                    className="w-7 h-7 flex items-center justify-center rounded-md transition-colors duration-150"
                    style={{ background: 'transparent', color: '#999', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#E53935'; e.currentTarget.style.background = '#FEE'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#999'; e.currentTarget.style.background = 'transparent'; }}>
                    <Trash2 size={14} />
                </button>
            </div>

            <div className="p-4 space-y-5">
                {/* Preview */}
                <div className="flex items-center gap-3 p-3 rounded-sm" style={{ background: '#FAFAF8' }}>
                    <div className="w-14 h-14 rounded-sm overflow-hidden" style={{ background: selected.color, flexShrink: 0 }} />
                    <div>
                        <p className="text-[13px] font-medium" style={{ color: '#1C1C1E' }}>{selected.name}</p>
                        <p className="text-[12px] font-bold" style={{ color: '#C9A96E' }}>₺{selected.price.toLocaleString('tr-TR')}</p>
                        <p className="text-[10px]" style={{ color: '#999' }}>{(selected.dimensions.width * 100).toFixed(0)}×{(selected.dimensions.depth * 100).toFixed(0)}×{(selected.dimensions.height * 100).toFixed(0)} cm</p>
                    </div>
                </div>

                {/* Position */}
                <div>
                    <label className="text-[11px] font-medium uppercase tracking-wider block mb-2" style={{ color: '#999' }}>Konum</label>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <span className="text-[10px]" style={{ color: '#999' }}>X</span>
                            <input type="number" step={0.1} value={selected.position.x.toFixed(1)}
                                onChange={(e) => updateFurniture(selected.id, { position: { ...selected.position, x: parseFloat(e.target.value) || 0 } })}
                                className="w-full px-2 py-1.5 text-[12px] rounded-sm outline-none"
                                style={{ border: '1px solid #E8E3DC', color: '#1C1C1E' }} />
                        </div>
                        <div>
                            <span className="text-[10px]" style={{ color: '#999' }}>Z</span>
                            <input type="number" step={0.1} value={selected.position.z.toFixed(1)}
                                onChange={(e) => updateFurniture(selected.id, { position: { ...selected.position, z: parseFloat(e.target.value) || 0 } })}
                                className="w-full px-2 py-1.5 text-[12px] rounded-sm outline-none"
                                style={{ border: '1px solid #E8E3DC', color: '#1C1C1E' }} />
                        </div>
                    </div>
                </div>

                {/* Rotation */}
                <div>
                    <label className="text-[11px] font-medium uppercase tracking-wider block mb-2" style={{ color: '#999' }}>Döndürme</label>
                    <div className="flex gap-1">
                        {[0, 90, 180, 270].map((deg) => (
                            <button key={deg} onClick={() => updateFurniture(selected.id, { rotation: deg })}
                                className="flex-1 py-1.5 text-[11px] font-medium rounded-sm transition-colors duration-150"
                                style={{
                                    background: selected.rotation === deg ? '#1C1C1E' : '#F5F0EB',
                                    color: selected.rotation === deg ? 'white' : '#666',
                                    border: 'none', cursor: 'pointer',
                                }}>
                                {deg}°
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color */}
                <div>
                    <label className="text-[11px] font-medium uppercase tracking-wider block mb-2" style={{ color: '#999' }}>Renk</label>
                    <input type="color" value={selected.color} onChange={(e) => updateFurniture(selected.id, { color: e.target.value })}
                        className="w-full h-8 rounded-sm cursor-pointer" style={{ border: '1px solid #E8E3DC' }} />
                </div>

                {/* Scale */}
                <div>
                    <label className="text-[11px] font-medium uppercase tracking-wider block mb-1" style={{ color: '#999' }}>Boyut Ölçeği</label>
                    <div className="flex items-center gap-3">
                        <input type="range" min={0.8} max={1.2} step={0.05} value={selected.scale}
                            onChange={(e) => updateFurniture(selected.id, { scale: parseFloat(e.target.value) })}
                            className="flex-1" style={{ accentColor: '#C9A96E' }} />
                        <span className="text-[13px] font-medium w-12 text-right" style={{ color: '#1C1C1E' }}>{Math.round(selected.scale * 100)}%</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => duplicateFurniture(selected.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium rounded-sm"
                        style={{ background: '#F5F0EB', color: '#1C1C1E', border: 'none', cursor: 'pointer' }}>
                        <Copy size={12} /> Kopyala
                    </button>
                    <button onClick={() => updateFurniture(selected.id, { isLocked: !selected.isLocked })}
                        className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium rounded-sm"
                        style={{ background: selected.isLocked ? '#C9A96E' : '#F5F0EB', color: selected.isLocked ? 'white' : '#1C1C1E', border: 'none', cursor: 'pointer' }}>
                        {selected.isLocked ? <Lock size={12} /> : <Unlock size={12} />}
                        {selected.isLocked ? 'Kilidi Aç' : 'Kilitle'}
                    </button>
                    <button onClick={() => updateFurniture(selected.id, { isVisible: !selected.isVisible })}
                        className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium rounded-sm"
                        style={{ background: '#F5F0EB', color: '#1C1C1E', border: 'none', cursor: 'pointer' }}>
                        {selected.isVisible ? <EyeOff size={12} /> : <Eye size={12} />}
                        {selected.isVisible ? 'Gizle' : 'Göster'}
                    </button>
                </div>

                {/* Layer list */}
                <div>
                    <label className="text-[11px] font-medium uppercase tracking-wider block mb-2" style={{ color: '#999' }}>Katmanlar</label>
                    <div className="space-y-1 max-h-40 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                        {furniture.map((f) => (
                            <button key={f.id} onClick={() => usePlannerStore.getState().selectFurniture(f.id)}
                                className="w-full flex items-center gap-2 px-2 py-1.5 text-left rounded-sm transition-colors duration-100"
                                style={{
                                    background: f.id === selectedId ? '#F5F0EB' : 'transparent',
                                    border: 'none', cursor: 'pointer',
                                }}>
                                <span style={{ color: f.isVisible ? '#1C1C1E' : '#DDD', fontSize: 12 }}>{f.isVisible ? '👁' : '👁‍🗨'}</span>
                                {f.isLocked && <span style={{ fontSize: 10 }}>🔒</span>}
                                <span className="text-[11px] truncate flex-1" style={{ color: f.id === selectedId ? '#1C1C1E' : '#666' }}>{f.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
