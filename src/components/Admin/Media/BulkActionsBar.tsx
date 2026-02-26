'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FolderInput, Link as LinkIcon, Download,
    Trash2, X, CheckSquare
} from 'lucide-react';

interface BulkActionsBarProps {
    selectedCount: number;
    onClear: () => void;
    onDelete: () => void;
    onMove: () => void;
}

export function BulkActionsBar({ selectedCount, onClear, onDelete, onMove }: BulkActionsBarProps) {
    if (selectedCount === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                style={{
                    position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 100, background: '#1C1C1E', border: '1px solid #C9A96E',
                    borderRadius: '12px', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '32px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '24px', height: '24px', background: '#C9A96E', borderRadius: '6px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F0F10'
                    }}>
                        <span style={{ fontSize: '12px', fontWeight: 700 }}>{selectedCount}</span>
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB' }}>{selectedCount} dosya seçildi</div>
                        <button
                            onClick={onClear}
                            style={{ background: 'none', border: 'none', padding: 0, fontSize: '11px', color: '#636366', cursor: 'pointer', textDecoration: 'underline' }}>
                            Seçimi Temizle
                        </button>
                    </div>
                </div>

                <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)' }} />

                <div style={{ display: 'flex', gap: '8px' }}>
                    <ActionButton icon={<FolderInput size={18} />} label="Taşı" onClick={onMove} />
                    <ActionButton icon={<LinkIcon size={18} />} label="Linkleri Kopyala" />
                    <ActionButton icon={<Download size={18} />} label="İndir" />
                    <ActionButton icon={<Trash2 size={18} />} label="Sil" color="#FF453A" onClick={onDelete} />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

function ActionButton({ icon, label, onClick, color = '#F5F0EB' }: { icon: any, label: string, onClick?: () => void, color?: string }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                background: 'none', border: 'none', color, cursor: 'pointer', minWidth: '80px', padding: '4px'
            }}
        >
            {icon}
            <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
        </motion.button>
    );
}
