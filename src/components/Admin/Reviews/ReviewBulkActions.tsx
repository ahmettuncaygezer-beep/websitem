'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Trash2, Award } from 'lucide-react';

interface ReviewBulkActionsProps {
    selectedCount: number;
    onAction: (action: string) => void;
    onClear: () => void;
}

export function ReviewBulkActions({ selectedCount, onAction, onClear }: ReviewBulkActionsProps) {
    if (selectedCount === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-[#0F0F10] border border-[#C9A96E]/40 px-6 py-4 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
                <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#C9A96E] text-[#0F0F10] flex items-center justify-center text-[12px] font-bold">
                        {selectedCount}
                    </span>
                    <span className="text-[13px] font-medium text-[#F5F0EB]">Yorum Seçildi</span>
                </div>

                <div className="w-[1px] h-6 bg-white/10" />

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onAction('approve')}
                        className="flex items-center gap-2 text-[12px] font-bold text-[#30D158] hover:bg-[#30D158]/10 px-3 py-2 rounded-sm transition-all"
                    >
                        <Check size={14} /> Tümünü Onayla
                    </button>
                    <button
                        onClick={() => onAction('reject')}
                        className="flex items-center gap-2 text-[12px] font-bold text-[#FF453A] hover:bg-[#FF453A]/10 px-3 py-2 rounded-sm transition-all"
                    >
                        <X size={14} /> Tümünü Reddet
                    </button>
                    <button
                        onClick={() => onAction('feature')}
                        className="flex items-center gap-2 text-[12px] font-bold text-[#C9A96E] hover:bg-[#C9A96E]/10 px-3 py-2 rounded-sm transition-all"
                    >
                        <Award size={14} /> Öne Çıkar
                    </button>
                    <button
                        onClick={() => onAction('delete')}
                        className="flex items-center gap-2 text-[12px] font-bold text-[#636366] hover:text-[#FF453A] px-3 py-2 rounded-sm transition-all"
                    >
                        <Trash2 size={14} /> Sil
                    </button>
                </div>

                <div className="w-[1px] h-6 bg-white/10" />

                <button
                    onClick={onClear}
                    className="text-[12px] font-medium text-[#636366] hover:text-[#AEAEB2] px-2 py-2 transition-all"
                >
                    Seçimi Temizle
                </button>
            </motion.div>
        </AnimatePresence>
    );
}
