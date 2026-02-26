'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Upload, Star, X, GripVertical } from 'lucide-react';

interface UploadedImage {
    id: string;
    file: File;
    preview: string;
    progress: number;
    isPrimary: boolean;
}

interface ProductImageUploadProps {
    onImagesChange?: (images: UploadedImage[]) => void;
}

export function ProductImageUpload({ onImagesChange }: ProductImageUploadProps) {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const processFiles = useCallback((files: File[]) => {
        const valid = files.filter((f) => f.type.startsWith('image/'));
        const remaining = 10 - images.length;
        const toProcess = valid.slice(0, remaining);

        const oversized = toProcess.filter((f) => f.size > 5 * 1024 * 1024);
        if (oversized.length > 0) {
            console.warn(`${oversized.length} görsel 5MB sınırını aşıyor ve eklenmedi.`);
        }

        const okFiles = toProcess.filter((f) => f.size <= 5 * 1024 * 1024);
        const newImages: UploadedImage[] = okFiles.map((file, i) => ({
            id: `img-${Date.now()}-${i}`,
            file,
            preview: URL.createObjectURL(file),
            progress: 0,
            isPrimary: images.length === 0 && i === 0,
        }));

        setImages((prev) => {
            const updated = [...prev, ...newImages];
            onImagesChange?.(updated);

            // Simulate upload progress
            newImages.forEach((img) => {
                let p = 0;
                const interval = setInterval(() => {
                    p += Math.random() * 25;
                    if (p >= 100) { p = 100; clearInterval(interval); }
                    setImages((cur) => cur.map((c) => c.id === img.id ? { ...c, progress: Math.min(p, 100) } : c));
                }, 150);
            });

            return updated;
        });
    }, [images.length, onImagesChange]);

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
        setIsDragOver(true);
    }
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
    function removeImage(id: string) {
        setImages((prev) => {
            const filtered = prev.filter((i) => i.id !== id);
            if (filtered.length > 0 && !filtered.some((i) => i.isPrimary)) {
                filtered[0].isPrimary = true;
            }
            onImagesChange?.(filtered);
            return filtered;
        });
    }
    function makePrimary(id: string) {
        setImages((prev) => {
            const updated = prev.map((i) => ({ ...i, isPrimary: i.id === id }));
            onImagesChange?.(updated);
            return updated;
        });
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
                    JPG, PNG, WEBP — Max 5MB her görsel, en fazla 10 görsel
                </div>
                <div style={{ fontSize: '10px', color: '#C9A96E', opacity: 0.7 }}>
                    Görseller otomatik WEBP formatına dönüştürülür
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/*"
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
                            {/* Image */}
                            <div style={{ height: '120px', background: 'rgba(201,169,110,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={img.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />

                                {/* Primary badge */}
                                {img.isPrimary && (
                                    <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#C9A96E', color: '#0F0F10', fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '3px', letterSpacing: '0.05em', zIndex: 2 }}>
                                        ANA GÖRSEL
                                    </div>
                                )}

                                {/* Drag handle */}
                                <div style={{ position: 'absolute', top: '8px', right: '30px', color: 'white', opacity: 0.6, cursor: 'grab', zIndex: 2 }}>
                                    <GripVertical size={14} />
                                </div>

                                {/* Hover overlay */}
                                <div
                                    className="img-overlay"
                                    style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 150ms', zIndex: 1 }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.5)'; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0)'; }}
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); makePrimary(img.id); }}
                                        title="Ana görsel yap"
                                        style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(201,169,110,0.9)', border: 'none', color: '#0F0F10', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 150ms' }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0'; }}
                                        className="overlay-btn"
                                    >
                                        <Star size={12} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                                        title="Sil"
                                        style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,69,58,0.9)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 150ms' }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0'; }}
                                        className="overlay-btn"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>

                                {/* Progress bar */}
                                {img.progress < 100 && (
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.1)', zIndex: 3 }}>
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
      `}</style>
        </div>
    );
}
