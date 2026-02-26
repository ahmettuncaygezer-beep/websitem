'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, X, FileText, Film,
    Image as ImageIcon, CheckCircle2, AlertCircle
} from 'lucide-react';

interface MediaUploaderProps {
    onUploaded: (files: any[]) => void;
    onClose: () => void;
}

export function MediaUploader({ onUploaded, onClose }: MediaUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploads, setUploads] = useState<any[]>([]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        simulateUploads(Array.from(e.dataTransfer.files));
    };

    const simulateUploads = (files: File[]) => {
        const newUploads = files.map(f => ({
            id: Math.random().toString(36),
            name: f.name,
            size: (f.size / 1024 / 1024).toFixed(1) + ' MB',
            progress: 0,
            status: 'uploading'
        }));

        setUploads(prev => [...prev, ...newUploads]);

        newUploads.forEach(u => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 30;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setUploads(prev => prev.map(item => item.id === u.id ? { ...item, progress: 100, status: 'done' } : item));
                    setTimeout(() => {
                        setUploads(prev => prev.filter(item => item.id !== u.id));
                        if (uploads.length === 1) onClose(); // Auto close if last one
                    }, 2000);
                } else {
                    setUploads(prev => prev.map(item => item.id === u.id ? { ...item, progress } : item));
                }
            }, 500);
        });
    };

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ padding: '0 24px 24px' }}
        >
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    background: isDragging ? 'rgba(201,169,110,0.05)' : '#1C1C1E',
                    border: `2px dashed ${isDragging ? '#C9A96E' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '8px', padding: '40px', textAlign: 'center', transition: 'all 200ms',
                    position: 'relative'
                }}
            >
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}>
                    <X size={20} />
                </button>

                <motion.div animate={{ scale: isDragging ? 1.1 : 1 }} style={{ marginBottom: '16px' }}>
                    <Upload size={48} color={isDragging ? '#C9A96E' : 'rgba(255,255,255,0.1)'} />
                </motion.div>

                <h4 style={{ fontSize: '16px', color: isDragging ? '#C9A96E' : '#F5F0EB', margin: 0 }}>
                    {isDragging ? 'Bırakın ve Yükleyin' : 'Dosyaları buraya sürükleyin'}
                </h4>
                <p style={{ fontSize: '13px', color: '#636366', margin: '8px 0 20px' }}>veya dosya seçmek için tıklayın</p>

                <div style={{ fontSize: '11px', color: '#3A3A3C', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <span>JPG, PNG, WEBP, MP4, PDF</span>
                    <span>Max 50MB</span>
                </div>
            </div>

            {/* Progress List */}
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <AnimatePresence>
                    {uploads.map(u => (
                        <motion.div
                            key={u.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{
                                background: '#1C1C1E', borderRadius: '6px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.04)',
                                display: 'flex', alignItems: 'center', gap: '15px'
                            }}
                        >
                            <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {u.name.endsWith('.pdf') ? <FileText size={16} color="#FF453A" /> : <ImageIcon size={16} color="#0A84FF" />}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '13px', color: '#F5F0EB' }}>{u.name}</span>
                                    <span style={{ fontSize: '11px', color: '#636366' }}>{u.status === 'done' ? 'Bitti' : `${Math.floor(u.progress)}%`}</span>
                                </div>
                                <div style={{ height: '3px', background: '#242426', borderRadius: '2px', overflow: 'hidden' }}>
                                    <motion.div
                                        animate={{ width: `${u.progress}%` }}
                                        style={{ height: '100%', background: u.status === 'done' ? '#30D158' : '#C9A96E' }}
                                    />
                                </div>
                            </div>

                            {u.status === 'done' ? (
                                <CheckCircle2 size={18} color="#30D158" />
                            ) : (
                                <button style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}><X size={16} /></button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
