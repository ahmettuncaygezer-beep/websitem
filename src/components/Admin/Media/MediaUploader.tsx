'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, X,
    Image as ImageIcon, CheckCircle2
} from 'lucide-react';
import { uploadImage, validateImageFile } from '@/lib/storage';
import { toast } from 'react-hot-toast';

interface MediaUploaderProps {
    bucket: string;
    onUploaded: (files: any[]) => void;
    onClose: () => void;
}

interface UploadItem {
    id: string;
    name: string;
    size: string;
    progress: number;
    status: 'uploading' | 'done' | 'error';
    error?: string;
}

export function MediaUploader({ bucket, onUploaded, onClose }: MediaUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploads, setUploads] = useState<UploadItem[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(Array.from(e.dataTransfer.files));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) processFiles(Array.from(e.target.files));
        e.target.value = '';
    };

    const processFiles = async (files: File[]) => {
        const imageFiles = files.filter(f => f.type.startsWith('image/'));
        if (imageFiles.length === 0) {
            toast.error('Yalnızca görsel dosyalar yüklenebilir');
            return;
        }

        const items: UploadItem[] = imageFiles.map(f => ({
            id: Math.random().toString(36),
            name: f.name,
            size: (f.size / 1024 / 1024).toFixed(1) + ' MB',
            progress: 0,
            status: 'uploading' as const,
        }));

        setUploads(prev => [...prev, ...items]);

        let uploadedCount = 0;

        for (let i = 0; i < imageFiles.length; i++) {
            const file = imageFiles[i];
            const itemId = items[i].id;

            // Validate
            const validationErr = validateImageFile(file);
            if (validationErr) {
                setUploads(prev => prev.map(u =>
                    u.id === itemId ? { ...u, status: 'error', error: validationErr, progress: 100 } : u
                ));
                toast.error(`${file.name}: ${validationErr}`);
                continue;
            }

            // Simulate progress during upload
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 25;
                if (progress > 90) progress = 90;
                setUploads(prev => prev.map(u =>
                    u.id === itemId ? { ...u, progress: Math.min(progress, 90) } : u
                ));
            }, 300);

            try {
                await uploadImage(file, bucket);
                clearInterval(interval);
                setUploads(prev => prev.map(u =>
                    u.id === itemId ? { ...u, progress: 100, status: 'done' } : u
                ));
                uploadedCount++;
            } catch (err: any) {
                clearInterval(interval);
                setUploads(prev => prev.map(u =>
                    u.id === itemId ? { ...u, status: 'error', error: err.message, progress: 100 } : u
                ));
                toast.error(`${file.name}: ${err.message}`);
            }
        }

        if (uploadedCount > 0) {
            toast.success(`${uploadedCount} dosya yüklendi`);
            onUploaded([]);
        }

        // Auto-clear completed uploads after delay
        setTimeout(() => {
            setUploads(prev => prev.filter(u => u.status !== 'done'));
        }, 3000);
    };

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ padding: '0 24px 24px' }}
        >
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    background: isDragging ? 'rgba(201,169,110,0.05)' : '#1C1C1E',
                    border: `2px dashed ${isDragging ? '#C9A96E' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '8px', padding: '40px', textAlign: 'center', transition: 'all 200ms',
                    position: 'relative', cursor: 'pointer'
                }}
            >
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}>
                    <X size={20} />
                </button>

                <motion.div animate={{ scale: isDragging ? 1.1 : 1 }} style={{ marginBottom: '16px' }}>
                    <Upload size={48} color={isDragging ? '#C9A96E' : 'rgba(255,255,255,0.1)'} />
                </motion.div>

                <h4 style={{ fontSize: '16px', color: isDragging ? '#C9A96E' : '#F5F0EB', margin: 0 }}>
                    {isDragging ? 'Bırakın ve Yükleyin' : 'Dosyaları buraya sürükleyin'}
                </h4>
                <p style={{ fontSize: '13px', color: '#636366', margin: '8px 0 4px' }}>
                    veya dosya seçmek için tıklayın
                </p>
                <p style={{ fontSize: '11px', color: '#3A3A3C', margin: '4px 0 0' }}>
                    Hedef: <strong style={{ color: '#C9A96E' }}>{bucket}</strong> &nbsp;·&nbsp; JPG, PNG, WebP, AVIF &nbsp;·&nbsp; Max 5MB
                </p>
            </div>

            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

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
                                <ImageIcon size={16} color={u.status === 'error' ? '#FF453A' : '#0A84FF'} />
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '13px', color: '#F5F0EB' }}>{u.name}</span>
                                    <span style={{ fontSize: '11px', color: u.status === 'error' ? '#FF453A' : '#636366' }}>
                                        {u.status === 'done' ? 'Bitti' : u.status === 'error' ? 'Hata' : `${Math.floor(u.progress)}%`}
                                    </span>
                                </div>
                                <div style={{ height: '3px', background: '#242426', borderRadius: '2px', overflow: 'hidden' }}>
                                    <motion.div
                                        animate={{ width: `${u.progress}%` }}
                                        style={{
                                            height: '100%',
                                            background: u.status === 'done' ? '#30D158' : u.status === 'error' ? '#FF453A' : '#C9A96E'
                                        }}
                                    />
                                </div>
                            </div>

                            {u.status === 'done' ? (
                                <CheckCircle2 size={18} color="#30D158" />
                            ) : u.status === 'error' ? (
                                <X size={18} color="#FF453A" />
                            ) : (
                                <button onClick={(e) => { e.stopPropagation(); }} style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}><X size={16} /></button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
