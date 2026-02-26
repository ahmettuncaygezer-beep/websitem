'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Monitor, Tablet, Smartphone,
    ExternalLink, RotateCcw, Share2
} from 'lucide-react';

interface ContentPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

export function ContentPreviewModal({ isOpen, onClose, title }: ContentPreviewModalProps) {
    const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const frameWidths = {
        desktop: '100%',
        tablet: '768px',
        mobile: '375px'
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', inset: 0, background: '#0F0F10', zIndex: 1000,
                display: 'flex', flexDirection: 'column'
            }}
        >
            {/* Top Controls */}
            <header style={{
                height: '64px', background: '#141416', borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button onClick={onClose} style={controlBtnStyle}><X size={20} /></button>
                    <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
                    <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Önizleme: {title}</h2>
                </div>

                {/* Device Switcher */}
                <div style={{
                    background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '4px',
                    display: 'flex', gap: '4px', border: '1px solid rgba(255,255,255,0.06)'
                }}>
                    {[
                        { id: 'desktop', icon: Monitor, label: 'Desktop' },
                        { id: 'tablet', icon: Tablet, label: 'Tablet' },
                        { id: 'mobile', icon: Smartphone, label: 'Mobile' }
                    ].map(d => {
                        const active = device === d.id;
                        return (
                            <button
                                key={d.id}
                                onClick={() => setDevice(d.id as any)}
                                style={{
                                    padding: '6px 12px', borderRadius: '6px', border: 'none',
                                    background: active ? '#C9A96E' : 'transparent',
                                    color: active ? '#141416' : '#636366', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 200ms'
                                }}
                            >
                                <d.icon size={16} />
                                <span style={{ fontSize: '11px', fontWeight: 600 }}>{d.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={btnActionStyle}><RotateCcw size={16} /> Yenile</button>
                    <button style={{ ...btnActionStyle, background: '#C9A96E', color: '#141416', border: 'none' }}><ExternalLink size={16} /> Yeni Sekmede Aç</button>
                </div>
            </header>

            {/* Preview Frame */}
            <main style={{ flex: 1, background: '#000', padding: device === 'desktop' ? '0' : '40px 0', overflow: 'auto' }}>
                <motion.div
                    animate={{ width: frameWidths[device] }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{
                        height: '100%', margin: '0 auto', background: '#F5F0EB',
                        borderRadius: device === 'desktop' ? '0' : '16px',
                        overflow: 'hidden', boxShadow: '0 24px 72px rgba(0,0,0,0.5)',
                        position: 'relative'
                    }}
                >
                    {/* Simulation Header for Mobile/Tablet */}
                    {device !== 'desktop' && (
                        <div style={{ height: '32px', background: '#141416', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: '#333' }} />
                        </div>
                    )}

                    {/* Iframe or Render Simulation */}
                    <div style={{ width: '100%', height: 'calc(100% - 32px)', padding: '40px', color: '#141416', textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginTop: '100px' }}>MAISON</div>
                        <p style={{ color: '#666', marginTop: '20px' }}>Site arayüzü bu pencere içerisinde gerçek boyutlarıyla simüle edilir.</p>
                        <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            <div style={{ height: '200px', background: '#eee', borderRadius: '8px' }} />
                            <div style={{ height: '400px', background: '#eee', borderRadius: '8px' }} />
                        </div>
                    </div>

                </motion.div>
            </main>
        </motion.div>
    );
}

const controlBtnStyle = {
    background: 'none', border: 'none', color: '#636366', cursor: 'pointer',
    width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center'
};
const btnActionStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '8px 16px', color: '#F5F0EB', fontSize: '12px',
    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600
};
