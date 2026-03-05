'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Upload, Star, X, GripVertical, Loader2 } from 'lucide-react';
import { uploadImage, deleteImage, validateImageFile } from '@/lib/storage';
import { toast } from 'react-hot-toast';

interface UploadedImage {
    id: string;
    url: string;           // Supabase public URL (or local preview while uploading)
    preview: string;       // Local blob preview
    progress: number;
    isPrimary: boolean;
    isUploading: boolean;
}

interface ProductImageUploadProps {
    /** Already-uploaded image URLs (for edit mode) */
    initialUrls?: string[];
    /** Called with the current list of uploaded URLs whenever it changes */
    onImagesChange?: (urls: string[]) => void;
}

export function ProductImageUpload({ initialUrls, onImagesChange }: ProductImageUploadProps) {
    const [images, setImages] = useState<UploadedImage[]>(() =>
        (initialUrls || []).map((url, i) => ({
            id: `existing-${i}`,
            url,
            preview: url,
            progress: 100,
            isPrimary: i === 0,
            isUploading: false,
        }))
    );
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const emitChange = useCallback((imgs: UploadedImage[]) => {
        const urls = imgs.filter(i => !i.isUploading && i.url).map(i => i.url);
        onImagesChange?.(urls);
    }, [onImagesChange]);

    const processFiles = useCallback(async (files: File[]) => {
        const valid = files.filter(f => f.type.startsWith('image/'));
        const remaining = 10 - images.length;
        const toProcess = valid.slice(0, remaining);

        // Validate each file
        const okFiles: File[] = [];
        for (const f of toProcess) {
            const err = validateImageFile(f);
            if (err) {
                toast.error(`${f.name}: ${err}`);
            } else {
                okFiles.push(f);
            }
        }

        if (okFiles.length === 0) return;

        // Create placeholders with local previews
        const newImages: UploadedImage[] = okFiles.map((file, i) => ({
            id: `img-${Date.now()}-${i}`,
            url: '',
            preview: URL.createObjectURL(file),
            progress: 0,
            isPrimary: images.length === 0 && i === 0,
            isUploading: true,
        }));

        setImages(prev => [...prev, ...newImages]);

        // Upload each file to Supabase
        for (let i = 0; i < okFiles.length; i++) {
            const file = okFiles[i];
            const imgId = newImages[i].id;

            // Simulate progress while we upload
            let progressVal = 0;
            const interval = setInterval(() => {
                progressVal += Math.random() * 20;
                if (progressVal > 90) progressVal = 90;
                setImages(prev => prev.map(img =>
                    img.id === imgId ? { ...img, progress: Math.min(progressVal, 90) } : img
                ));
            }, 200);

            try {
                const url = await uploadImage(file, 'products');
                clearInterval(interval);
                setImages(prev => {
                    const updated = prev.map(img =>
                        img.id === imgId ? { ...img, url, progress: 100, isUploading: false } : img
                    );
                    emitChange(updated);
                    return updated;
                });
            } catch (err: any) {
                clearInterval(interval);
                toast.error(`${file.name}: ${err.message}`);
                setImages(prev => {
                    const updated = prev.filter(img => img.id !== imgId);
                    emitChange(updated);
                    return updated;
                });
            }
        }
    }, [images.length, emitChange]);

    async function removeImage(id: string) {
        const img = images.find(i => i.id === id);
        if (img?.url && !img.isUploading) {
            try {
                await deleteImage(img.url, 'products');
            } catch {
                // Continue removing from UI even if storage delete fails
            }
        }
        if (img?.preview) URL.revokeObjectURL(img.preview);

        setImages(prev => {
            const filtered = prev.filter(i => i.id !== id);
            if (filtered.length > 0 && !filtered.some(i => i.isPrimary)) {
                filtered[0].isPrimary = true;
            }
            emitChange(filtered);
            return filtered;
        });
    }

    function makePrimary(id: string) {
        setImages(prev => {
            const updated = prev.map(i => ({ ...i, isPrimary: i.id === id }));
            emitChange(updated);
            return updated;
        });
    }

    function handleDragOver(e: React.DragEvent) { e.preventDefault(); setIsDragOver(true); }
    function handleDragLeave() { setIsDragOver(false); }
    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setIsDragOver(false);
        processFiles(Array.from(e.dataTransfer.files));
    }
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) processFiles(Array.from(e.target.files));
        e.target.value = '';
    }

    return (
        <div>
            {/* Drop zone */}
            <div
                role="button"
                tabIndex={0}
                aria-label="Fotoğraf yükle"
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                    border: `2px dashed ${isDragOver ? 'rgba(201,169,110,0.6)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '8px',
                    padding: '32px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 200ms',
                    background: isDragOver ? 'rgba(201,169,110,0.04)' : 'transparent',
                }}
            >
                <div style={{ fontSize: '32px', color: 'rgba(201,169,110,0.4)', marginBottom: '12px' }}>
                    <Upload size={32} style={{ display: 'inline-block' }} />
                </div>
                <div style={{ fontSize: '13px', color: '#AEAEB2', marginBottom: '4px' }}>
                    Fotoğrafları sürükle bırak veya tıkla
                </div>
                <div style={{ fontSize: '11px', color: '#636366', marginBottom: '4px' }}>
                    JPG, PNG, WebP, AVIF — Max 5MB her görsel, en fazla 10 görsel
                </div>
                <div style={{ fontSize: '10px', color: '#C9A96E', opacity: 0.7 }}>
                    Görseller Supabase Storage&apos;a yüklenir
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                aria-hidden="true"
            />

            {/* Preview grid */}
            {images.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
                    {images.map((img) => (
                        <div
                            key={img.id}
                            style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            <div style={{ height: '120px', background: 'rgba(201,169,110,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img.url || img.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />

                                {/* Primary badge */}
                                {img.isPrimary && (
                                    <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#C9A96E', color: '#0F0F10', fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '3px', letterSpacing: '0.05em', zIndex: 2 }}>
                                        ANA GÖRSEL
                                    </div>
                                )}

                                {/* Uploading overlay */}
                                {img.isUploading && (
                                    <div style={{
                                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 3,
                                    }}>
                                        <Loader2 size={18} color="#C9A96E" style={{ animation: 'spin 1s linear infinite' }} />
                                        <span style={{ fontSize: '10px', color: '#AEAEB2' }}>{Math.round(img.progress)}%</span>
                                    </div>
                                )}

                                {/* Hover overlay */}
                                {!img.isUploading && (
                                    <div
                                        className="img-overlay"
                                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 150ms', zIndex: 1 }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.5)'; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0)'; }}
                                    >
                                        <button
                                            onClick={(e) => { e.stopPropagation(); makePrimary(img.id); }}
                                            title="Ana görsel yap"
                                            className="overlay-btn"
                                            style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(201,169,110,0.9)', border: 'none', color: '#0F0F10', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 150ms' }}
                                        >
                                            <Star size={12} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                                            title="Sil"
                                            className="overlay-btn"
                                            style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,69,58,0.9)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 150ms' }}
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                )}

                                {/* Progress bar */}
                                {img.progress < 100 && (
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.1)', zIndex: 4 }}>
                                        <div style={{ height: '100%', width: `${img.progress}%`, background: '#C9A96E', transition: 'width 200ms linear', borderRadius: '0 2px 2px 0' }} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <style>{`
                .img-overlay:hover .overlay-btn { opacity: 1 !important; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
