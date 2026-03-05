'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Search, Filter, Folder,
    Image as ImageIcon, Film, FileText, CheckCircle2, Loader2
} from 'lucide-react';
import { MediaFile } from '@/types/media';

interface MediaPickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (files: MediaFile[]) => void;
    multiple?: boolean;
    accept?: string[]; // ['image', 'video', 'pdf']
}

export function MediaPickerModal({ isOpen, onClose, onSelect, multiple = false, accept = [] }: MediaPickerModalProps) {
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [activeType, setActiveType] = useState('Tümü');
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
    const [loadingMedia, setLoadingMedia] = useState(true);

    useEffect(() => {
        if (!isOpen) return;
        setLoadingMedia(true);
        fetch('/api/admin/media/all')
            .then(r => r.json())
            .then(data => {
                if (data.files) {
                    setMediaFiles(data.files.map((f: any) => ({
                        id: f.id || f.name,
                        name: f.name,
                        originalName: f.name,
                        type: (f.mimetype || '').startsWith('video') ? 'video' as const : 'image' as const,
                        mimeType: f.mimetype || 'image/jpeg',
                        url: f.publicUrl,
                        thumbnailUrl: f.publicUrl,
                        size: f.size || 0,
                        folderId: '',
                        altText: f.name,
                        tags: [],
                        uploadedBy: { id: '', name: 'Admin', avatar: '' },
                        usages: [],
                        createdAt: f.created_at || '',
                        updatedAt: f.updated_at || '',
                    })));
                }
            })
            .catch(err => console.error('Medya dosyaları yüklenemedi:', err))
            .finally(() => setLoadingMedia(false));
    }, [isOpen]);

    const filteredFiles = useMemo(() => {
        return mediaFiles.filter(f => {
            const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
            const matchesType = activeType === 'Tümü' ||
                (activeType === 'Görsel' && f.type === 'image') ||
                (activeType === 'Video' && f.type === 'video');
            return matchesSearch && matchesType;
        });
    }, [search, activeType, mediaFiles]);

    const handleToggle = (id: string) => {
        if (multiple) {
            setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
        } else {
            setSelectedIds([id]);
        }
    };

    const handleConfirm = () => {
        const selected = mediaFiles.filter(f => selectedIds.includes(f.id));
        onSelect(selected);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
                    zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)', padding: '40px'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    onClick={e => e.stopPropagation()}
                    style={{
                        width: '1000px', height: '80vh', background: '#141416',
                        border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px',
                        display: 'flex', flexDirection: 'column', overflow: 'hidden'
                    }}
                >
                    {/* Header */}
                    <header style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Medya Seç</h2>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}><X size={24} /></button>
                    </header>

                    <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                        {/* Sidebar (Folders) */}
                        <aside style={{ width: '200px', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <button style={{ ...sideBtnActive }}>Tüm Dosyalar</button>
                                <button style={{ ...sideBtn }}>Klasörler</button>
                                <button style={{ ...sideBtn }}>Son Gönderilenler</button>
                            </div>
                        </aside>

                        {/* Main Grid Area */}
                        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            {/* Toolbar */}
                            <div style={{ padding: '16px 24px', display: 'flex', gap: '12px' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <Search size={16} color="#636366" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Medya ara..."
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '8px 12px 8px 40px', color: '#F5F0EB', fontSize: '13px', outline: 'none' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    {['Tümü', 'Görsel', 'Video'].map(t => (
                                        <button key={t} onClick={() => setActiveType(t)} style={{ ...typeBtn, background: activeType === t ? '#C9A96E' : 'transparent', color: activeType === t ? '#141416' : '#636366' }}>{t}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Grid */}
                            <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                                {filteredFiles.map(file => {
                                    const selected = selectedIds.includes(file.id);
                                    return (
                                        <div
                                            key={file.id}
                                            onClick={() => handleToggle(file.id)}
                                            style={{
                                                aspectRatio: '1', borderRadius: '6px', overflow: 'hidden', position: 'relative',
                                                border: `2px solid ${selected ? '#C9A96E' : 'transparent'}`, cursor: 'pointer'
                                            }}>
                                            <img src={file.thumbnailUrl || file.url} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: selected ? 0.5 : 1 }} />
                                            {selected && (
                                                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <div style={{ background: '#C9A96E', color: '#141416', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <CheckCircle2 size={16} strokeWidth={3} />
                                                    </div>
                                                </div>
                                            )}
                                            <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding: '8px', pointerEvents: 'none' }}>
                                                <div style={{ fontSize: '10px', color: '#AEAEB2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </main>
                    </div>

                    {/* Footer */}
                    <footer style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '13px', color: '#AEAEB2' }}>
                            {selectedIds.length} dosya seçildi
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={onClose} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F0EB', padding: '8px 20px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>Vazgeç</button>
                            <button onClick={handleConfirm} style={{ background: '#C9A96E', color: '#141416', border: 'none', padding: '8px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Seçimi Onayla</button>
                        </div>
                    </footer>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

const sideBtn = { width: '100%', textAlign: 'left' as any, padding: '8px 12px', background: 'none', border: 'none', borderRadius: '6px', color: '#636366', fontSize: '13px', cursor: 'pointer' };
const sideBtnActive = { ...sideBtn, background: 'rgba(201,169,110,0.1)', color: '#C9A96E', fontWeight: 600 };
const typeBtn = { border: 'none', borderRadius: '4px', padding: '4px 12px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms' };
