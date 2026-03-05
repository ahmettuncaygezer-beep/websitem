'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, Loader2, X } from 'lucide-react';

export interface ConfirmModalItem {
    name: string;
    detail?: string;
}

export interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    title: string;
    message: string;
    items?: ConfirmModalItem[];
    variant?: 'danger' | 'warning';
    confirmText?: string;
    cancelText?: string;
    /** Seconds the confirm button stays disabled (prevents accidental clicks) */
    delaySeconds?: number;
}

export default function ConfirmModal({
    open,
    onClose,
    onConfirm,
    title,
    message,
    items,
    variant = 'danger',
    confirmText = 'Onayla',
    cancelText = 'Vazgeç',
    delaySeconds = 0,
}: ConfirmModalProps) {
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // Start countdown when modal opens
    useEffect(() => {
        if (open && delaySeconds > 0) {
            setCountdown(delaySeconds);
        } else {
            setCountdown(0);
        }
        setLoading(false);
    }, [open, delaySeconds]);

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleConfirm = useCallback(async () => {
        if (countdown > 0 || loading) return;
        setLoading(true);
        try {
            await onConfirm();
        } finally {
            setLoading(false);
        }
    }, [countdown, loading, onConfirm]);

    const isDanger = variant === 'danger';
    const confirmDisabled = countdown > 0 || loading;

    const btnColor = isDanger ? '#FF453A' : '#C9A96E';
    const btnHoverBg = isDanger ? 'rgba(255,69,58,0.15)' : 'rgba(201,169,110,0.15)';
    const iconBg = isDanger ? 'rgba(255,69,58,0.1)' : 'rgba(201,169,110,0.1)';

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '20px',
                    }}
                    onClick={(e) => { if (e.target === e.currentTarget && !loading) onClose(); }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                        style={{
                            background: '#1C1C1E',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '14px',
                            width: '100%', maxWidth: '460px',
                            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                            overflow: 'hidden',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div style={{
                            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                            padding: '24px 24px 0',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '12px',
                                    background: iconBg,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    {isDanger
                                        ? <Trash2 size={22} color={btnColor} />
                                        : <AlertTriangle size={22} color={btnColor} />
                                    }
                                </div>
                                <div>
                                    <h3 style={{
                                        margin: 0, fontSize: '17px', fontWeight: 600,
                                        color: '#F5F0EB', lineHeight: 1.3,
                                        fontFamily: "'Playfair Display', Georgia, serif",
                                    }}>
                                        {title}
                                    </h3>
                                </div>
                            </div>
                            <button
                                onClick={() => { if (!loading) onClose(); }}
                                style={{
                                    background: 'transparent', border: 'none',
                                    color: '#636366', cursor: loading ? 'not-allowed' : 'pointer',
                                    padding: '4px', borderRadius: '6px',
                                    transition: 'color 150ms',
                                }}
                                onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#636366'; }}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body */}
                        <div style={{ padding: '16px 24px 0' }}>
                            <p style={{
                                fontSize: '13px', color: '#AEAEB2', lineHeight: 1.6,
                                margin: '0 0 16px',
                            }}>
                                {message}
                            </p>

                            {/* Items List */}
                            {items && items.length > 0 && (
                                <div style={{
                                    maxHeight: '180px', overflowY: 'auto',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '8px', marginBottom: '4px',
                                }}>
                                    {items.map((item, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                padding: '10px 14px',
                                                borderBottom: i < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                            }}
                                        >
                                            <span style={{ fontSize: '12px', color: '#F5F0EB', fontWeight: 500 }}>
                                                {item.name}
                                            </span>
                                            {item.detail && (
                                                <span style={{
                                                    fontSize: '11px', color: '#636366',
                                                    background: 'rgba(255,255,255,0.04)',
                                                    padding: '2px 8px', borderRadius: '4px',
                                                }}>
                                                    {item.detail}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                            gap: '10px', padding: '20px 24px',
                        }}>
                            {/* Cancel */}
                            <button
                                onClick={() => { if (!loading) onClose(); }}
                                disabled={loading}
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '8px', padding: '9px 20px',
                                    fontSize: '13px', fontWeight: 500,
                                    color: '#AEAEB2', cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 150ms',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) {
                                        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
                                        (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
                                    (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2';
                                }}
                            >
                                {cancelText}
                            </button>

                            {/* Confirm */}
                            <button
                                onClick={handleConfirm}
                                disabled={confirmDisabled}
                                style={{
                                    background: confirmDisabled ? 'rgba(255,255,255,0.04)' : btnColor,
                                    border: confirmDisabled ? '1px solid rgba(255,255,255,0.06)' : `1px solid ${btnColor}`,
                                    borderRadius: '8px', padding: '9px 24px',
                                    fontSize: '13px', fontWeight: 600,
                                    color: confirmDisabled ? '#636366' : (isDanger ? '#fff' : '#0F0F10'),
                                    cursor: confirmDisabled ? 'not-allowed' : 'pointer',
                                    transition: 'all 200ms',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    minWidth: '120px', justifyContent: 'center',
                                }}
                                onMouseEnter={(e) => {
                                    if (!confirmDisabled) {
                                        (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
                                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                                }}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                                        <span>{isDanger ? 'Siliniyor...' : 'İşleniyor...'}</span>
                                    </>
                                ) : countdown > 0 ? (
                                    `${confirmText} (${countdown}s)`
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>

                        <style jsx>{`
                            @keyframes spin {
                                to { transform: rotate(360deg); }
                            }
                        `}</style>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
