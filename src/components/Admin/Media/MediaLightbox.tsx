'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ZoomIn, ZoomOut, RotateCcw,
    Download, ChevronLeft, ChevronRight
} from 'lucide-react';
import { MediaFile } from '@/types/media';

interface MediaLightboxProps {
    file: MediaFile | null;
    onClose: () => void;
    onNext?: () => void;
    onPrev?: () => void;
}

export function MediaLightbox({ file, onClose, onNext, onPrev }: MediaLightboxProps) {
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);

    if (!file) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)',
                    zIndex: 9999, display: 'flex', flexDirection: 'column',
                    backdropFilter: 'blur(10px)'
                }}
                onClick={onClose}
            >
                {/* Header Controls */}
                <header style={{
                    height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 24px', position: 'relative', zIndex: 10
                }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button onClick={() => setZoom(prev => Math.min(prev + 0.5, 4))} style={controlBtnStyle}><ZoomIn size={20} /></button>
                        <button onClick={() => setZoom(prev => Math.max(prev - 0.5, 0.5))} style={controlBtnStyle}><ZoomOut size={20} /></button>
                        <button onClick={() => setRotation(prev => prev + 90)} style={controlBtnStyle}><RotateCcw size={20} /></button>
                    </div>

                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB' }}>{file.name}</div>
                        <div style={{ fontSize: '11px', color: '#636366' }}>{file.width} x {file.height} px</div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button style={controlBtnStyle}><Download size={20} /></button>
                        <button onClick={onClose} style={{ ...controlBtnStyle, color: '#FF453A' }}><X size={24} /></button>
                    </div>
                </header>

                {/* Content Area */}
                <main style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

                    {onPrev && (
                        <button onClick={e => { e.stopPropagation(); onPrev(); }} style={navBtnStyle} className="left-8">
                            <ChevronLeft size={32} />
                        </button>
                    )}

                    <motion.div
                        key={file.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: zoom, rotate: rotation, opacity: 1 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{ position: 'relative' }}
                        onClick={e => e.stopPropagation()}
                    >
                        {file.type === 'image' && (
                            <img
                                src={file.url}
                                style={{ maxHeight: '85vh', maxWidth: '85vw', objectFit: 'contain', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                            />
                        )}
                        {file.type === 'video' && (
                            <video src={file.url} controls autoPlay style={{ maxHeight: '85vh', maxWidth: '85vw' }} />
                        )}
                    </motion.div>

                    {onNext && (
                        <button onClick={e => { e.stopPropagation(); onNext(); }} style={navBtnStyle} className="right-8">
                            <ChevronRight size={32} />
                        </button>
                    )}
                </main>

                {/* Footer Info */}
                <footer style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#636366', fontSize: '12px' }}>
                    {file.altText || 'Alt metin bulunmuyor'}
                </footer>
            </motion.div>
        </AnimatePresence>
    );
}

const controlBtnStyle = {
    background: 'none', border: 'none', color: '#AEAEB2', cursor: 'pointer',
    padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'color 200ms'
};

const navBtnStyle = {
    position: 'absolute' as any, top: '50%', transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.05)', border: 'none', color: '#F5F0EB',
    width: '64px', height: '64px', borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 20,
    transition: 'all 200ms', backdropFilter: 'blur(4px)'
};
