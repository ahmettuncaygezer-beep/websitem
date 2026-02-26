'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BulkActionsProps {
    selectedCount: number;
    onClearSelection: () => void;
    onSetActive: () => void;
    onSetPassive: () => void;
    onDelete: () => void;
}

const actionBtnBase: React.CSSProperties = {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '5px',
    padding: '6px 14px',
    fontSize: '12px',
    color: '#AEAEB2',
    cursor: 'pointer',
    fontFamily: 'Inter, system-ui, sans-serif',
    transition: 'all 150ms',
    whiteSpace: 'nowrap',
};

export function BulkActions({ selectedCount, onClearSelection, onSetActive, onSetPassive, onDelete }: BulkActionsProps) {
    return (
        <AnimatePresence>
            {selectedCount > 0 && (
                <motion.div
                    initial={{ y: -56, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -56, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
                    style={{
                        position: 'sticky',
                        top: '64px',
                        zIndex: 30,
                        background: 'rgba(20,20,22,0.97)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderBottom: '1px solid rgba(201,169,110,0.15)',
                        padding: '10px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                    }}
                    role="toolbar"
                    aria-label="Toplu işlemler"
                >
                    {/* Count */}
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB', whiteSpace: 'nowrap' }}>
                        {selectedCount} ürün seçildi
                    </span>

                    {/* Divider */}
                    <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} aria-hidden="true" />

                    {/* Actions */}
                    <button
                        style={actionBtnBase}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                        onClick={onSetActive}
                    >
                        Aktife Al
                    </button>

                    <button
                        style={actionBtnBase}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                        onClick={onSetPassive}
                    >
                        Pasife Al
                    </button>

                    <button
                        style={{ ...actionBtnBase, border: '1px solid rgba(255,255,255,0.1)', color: '#AEAEB2' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                    >
                        Kategori Değiştir
                    </button>

                    <button
                        style={{ ...actionBtnBase, border: '1px solid rgba(255,69,58,0.2)', color: '#FF453A' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,69,58,0.08)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                        onClick={onDelete}
                    >
                        Sil
                    </button>

                    <div style={{ marginLeft: 'auto' }}>
                        <button
                            onClick={onClearSelection}
                            aria-label="Seçimi temizle"
                            style={{
                                background: 'transparent', border: 'none',
                                color: '#636366', cursor: 'pointer',
                                width: '28px', height: '28px',
                                borderRadius: '4px', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                transition: 'color 150ms, background 150ms',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#636366'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
