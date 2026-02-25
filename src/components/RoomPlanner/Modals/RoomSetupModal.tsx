'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ROOM_PRESETS } from '../data/room.presets';
import { usePlannerStore } from '../store/plannerStore';
import type { RoomDimensions } from '../types/planner.types';

interface Props { open: boolean; onClose: () => void; }

export function RoomSetupModal({ open, onClose }: Props) {
    const { setRoom, room } = usePlannerStore();
    const [step, setStep] = useState(0);
    const [selectedPreset, setSelectedPreset] = useState<string>('salon');
    const [dims, setDims] = useState<RoomDimensions>(room);

    const handlePreset = (id: string) => {
        setSelectedPreset(id);
        const preset = ROOM_PRESETS.find((p) => p.id === id);
        if (preset) setDims(preset.room);
    };

    const handleFinish = () => {
        setRoom(dims);
        onClose();
    };

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-2xl mx-4 rounded-sm overflow-hidden" style={{ background: 'white' }}>

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #F0EDE8' }}>
                        <h2 className="text-[16px] font-semibold" style={{ color: '#1C1C1E' }}>
                            {step === 0 ? 'Oda Şablonu Seçin' : step === 1 ? 'Oda Boyutları' : step === 2 ? 'Zemin & Duvar' : 'Hazırsınız! 🎉'}
                        </h2>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}><X size={18} /></button>
                    </div>

                    {/* Step dots */}
                    <div className="flex justify-center gap-2 py-3">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="w-2 h-2 rounded-full transition-colors duration-200"
                                style={{ background: i <= step ? '#C9A96E' : '#E8E3DC' }} />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="px-6 py-4" style={{ minHeight: 300 }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={step} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }} transition={{ duration: 0.2 }}>
                                {/* Step 0 — Presets */}
                                {step === 0 && (
                                    <div className="grid grid-cols-3 gap-3">
                                        {ROOM_PRESETS.map((p) => (
                                            <button key={p.id} onClick={() => handlePreset(p.id)}
                                                className="p-4 rounded-sm text-center transition-all duration-200"
                                                style={{
                                                    border: selectedPreset === p.id ? '2px solid #C9A96E' : '1px solid #E8E3DC',
                                                    background: selectedPreset === p.id ? '#FDF8F0' : 'white',
                                                    cursor: 'pointer', transform: selectedPreset === p.id ? 'scale(1.03)' : 'scale(1)',
                                                }}>
                                                <span className="text-2xl block mb-2">{p.icon}</span>
                                                <p className="text-[13px] font-medium" style={{ color: '#1C1C1E' }}>{p.name}</p>
                                                <p className="text-[11px]" style={{ color: '#999' }}>{p.room.width}×{p.room.depth} m</p>
                                                {selectedPreset === p.id && <span className="text-[16px] mt-1 block" style={{ color: '#C9A96E' }}>✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Step 1 — Dimensions */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        {([['width', 'En (Genişlik)', 1, 15], ['depth', 'Boy (Derinlik)', 1, 15], ['height', 'Yükseklik', 2, 4]] as const).map(([k, label, min, max]) => (
                                            <div key={k}>
                                                <label className="text-[13px] font-medium block mb-2" style={{ color: '#1C1C1E' }}>{label}</label>
                                                <div className="flex items-center gap-4">
                                                    <input type="range" min={min} max={max} step={0.1} value={dims[k]}
                                                        onChange={(e) => setDims((d) => ({ ...d, [k]: parseFloat(e.target.value) }))}
                                                        className="flex-1" style={{ accentColor: '#C9A96E' }} />
                                                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-sm" style={{ border: '1px solid #E8E3DC' }}>
                                                        <input type="number" step={0.1} min={min} max={max} value={dims[k]}
                                                            onChange={(e) => setDims((d) => ({ ...d, [k]: Math.min(max, Math.max(min, parseFloat(e.target.value) || min)) }))}
                                                            className="w-12 text-[14px] font-medium text-center outline-none" style={{ color: '#1C1C1E', border: 'none' }} />
                                                        <span className="text-[12px]" style={{ color: '#999' }}>m</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Step 2 — Floor & Wall */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[13px] font-medium block mb-3" style={{ color: '#1C1C1E' }}>Zemin Türü</label>
                                            <div className="flex gap-3">
                                                {(['parquet', 'marble', 'carpet', 'concrete', 'ceramic'] as const).map((t) => {
                                                    const labels: Record<string, string> = { parquet: 'Parke', marble: 'Mermer', carpet: 'Halı', concrete: 'Beton', ceramic: 'Seramik' };
                                                    return (
                                                        <button key={t} onClick={() => setDims((d) => ({ ...d, floorType: t }))}
                                                            className="px-4 py-2 text-[12px] font-medium rounded-sm transition-colors duration-150"
                                                            style={{ background: dims.floorType === t ? '#1C1C1E' : '#F5F0EB', color: dims.floorType === t ? 'white' : '#666', border: 'none', cursor: 'pointer' }}>
                                                            {labels[t]}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[13px] font-medium block mb-3" style={{ color: '#1C1C1E' }}>Duvar Rengi</label>
                                            <div className="flex gap-2 flex-wrap">
                                                {['#FFFFFF', '#F5F0EB', '#E8E3DC', '#D5CEC5', '#A8D8EA', '#C5E1A5', '#F8BBD0', '#455A64', '#37474F', '#263238', '#1C1C1E', '#B39DDB'].map((c) => (
                                                    <button key={c} onClick={() => setDims((d) => ({ ...d, wallColor: c }))}
                                                        className="w-9 h-9 rounded-full transition-transform duration-150"
                                                        style={{ background: c, border: dims.wallColor === c ? '3px solid #C9A96E' : '1px solid #E0E0E0', transform: dims.wallColor === c ? 'scale(1.15)' : 'scale(1)', cursor: 'pointer' }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3 — Done */}
                                {step === 3 && (
                                    <div className="text-center py-8">
                                        <span className="text-5xl block mb-4">🏠</span>
                                        <h3 className="text-xl font-semibold mb-2" style={{ color: '#1C1C1E' }}>Planınız Hazır!</h3>
                                        <p className="text-[14px] mb-2" style={{ color: '#666' }}>Mobilya eklemeye başlayın</p>
                                        <p className="text-[12px]" style={{ color: '#999' }}>{dims.width}×{dims.depth}×{dims.height} m — {(dims.width * dims.depth).toFixed(1)} m²</p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: '1px solid #F0EDE8' }}>
                        <button onClick={() => step > 0 ? setStep(step - 1) : onClose}
                            className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium rounded-sm"
                            style={{ color: '#999', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            <ChevronLeft size={16} /> {step > 0 ? 'Geri' : 'İptal'}
                        </button>
                        <button onClick={() => step < 3 ? setStep(step + 1) : handleFinish()}
                            className="flex items-center gap-1 px-6 py-2 text-[13px] font-semibold rounded-sm transition-colors duration-200"
                            style={{ background: step === 3 ? '#C9A96E' : '#1C1C1E', color: 'white', border: 'none', cursor: 'pointer' }}>
                            {step === 3 ? 'Tasarlamaya Başla →' : 'İleri'} <ChevronRight size={16} />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
