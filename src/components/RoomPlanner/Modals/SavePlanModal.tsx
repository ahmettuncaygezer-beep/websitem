'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { usePlannerStore } from '../plannerStore';

interface SavedPlan { name: string; date: string; state: ReturnType<typeof usePlannerStore.getState>; }

interface Props { open: boolean; onClose: () => void; }

export function SavePlanModal({ open, onClose }: Props) {
    const [name, setName] = useState(usePlannerStore.getState().planName);
    const [saved, setSaved] = useState<SavedPlan[]>([]);

    useEffect(() => {
        if (open) {
            setName(usePlannerStore.getState().planName);
            try { setSaved(JSON.parse(localStorage.getItem('selis_plans') || '[]')); } catch { setSaved([]); }
        }
    }, [open]);

    const handleSave = () => {
        usePlannerStore.getState().setPlanName(name);
        const state = usePlannerStore.getState();
        const plan: SavedPlan = { name, date: new Date().toLocaleString('tr-TR'), state: { room: state.room, items: state.items, planName: name } as any };
        const plans = [plan, ...saved.filter((p) => p.name !== name)].slice(0, 10);
        localStorage.setItem('selis_plans', JSON.stringify(plans));
        setSaved(plans);
        onClose();
    };

    const handleLoad = (plan: SavedPlan) => {
        if (plan.state) {
            usePlannerStore.getState().loadPlan({ room: plan.state.room, furniture: (plan.state as any).items ?? [], planName: plan.name });
        }
        onClose();
    };

    const handleDelete = (planName: string) => {
        const plans = saved.filter((p) => p.name !== planName);
        localStorage.setItem('selis_plans', JSON.stringify(plans));
        setSaved(plans);
    };

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="w-full max-w-md mx-4 rounded-sm" style={{ background: 'white' }}>
                    <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #F0EDE8' }}>
                        <h2 className="text-[16px] font-semibold" style={{ color: '#1C1C1E' }} data-lang-key="plan_save_title">Planı Kaydet</h2>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}><X size={18} /></button>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <label className="text-[12px] font-medium block mb-1" style={{ color: '#999' }} data-lang-key="plan_name_label">Plan Adı</label>
                            <input value={name} onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2.5 text-[14px] rounded-sm outline-none"
                                style={{ border: '1px solid #E8E3DC', color: '#1C1C1E' }}
                                onFocus={(e) => (e.target.style.borderColor = '#C9A96E')}
                                onBlur={(e) => (e.target.style.borderColor = '#E8E3DC')} />
                        </div>

                        <button onClick={handleSave}
                            className="w-full py-2.5 text-[13px] font-semibold rounded-sm transition-colors duration-200"
                            style={{ background: '#1C1C1E', color: 'white', border: 'none', cursor: 'pointer' }}
                            data-lang-key="plan_save_btn">
                            Kaydet
                        </button>

                        {saved.length > 0 && (
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-wider mb-2" style={{ color: '#999' }} data-lang-key="plan_saved_plans">Kayıtlı Planlar</p>
                                <div className="space-y-2 max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                                    {saved.map((p, i) => (
                                        <div key={i} className="flex items-center justify-between p-2 rounded-sm" style={{ background: '#FAFAF8' }}>
                                            <div>
                                                <p className="text-[13px] font-medium" style={{ color: '#1C1C1E' }}>{p.name}</p>
                                                <p className="text-[10px]" style={{ color: '#999' }}>{p.date}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleLoad(p)} className="px-2 py-1 text-[11px] font-medium rounded-sm"
                                                    style={{ background: '#C9A96E', color: '#1C1C1E', border: 'none', cursor: 'pointer' }} data-lang-key="plan_load_btn">Yükle</button>
                                                <button onClick={() => handleDelete(p.name)} className="p-1 rounded-sm"
                                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#999' }}>
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
