'use client';

import React, { useCallback, useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { uploadImage, deleteImage, validateImageFile } from '@/lib/storage';
import { toast } from 'react-hot-toast';

interface ImageUploaderProps {
    bucket: string;
    folder?: string;
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    aspectRatio?: string;
    height?: string;
}

export function ImageUploader({
    bucket,
    folder,
    value,
    onChange,
    label,
    aspectRatio = '21/9',
    height,
}: ImageUploaderProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback(async (file: File) => {
        const err = validateImageFile(file);
        if (err) {
            toast.error(err);
            return;
        }

        // Browser preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setIsUploading(true);
        setProgress(0);

        // Simulate progress while uploading
        const progressInterval = setInterval(() => {
            setProgress(p => {
                if (p >= 90) { clearInterval(progressInterval); return 90; }
                return p + Math.random() * 15;
            });
        }, 200);

        try {
            const url = await uploadImage(file, bucket, folder);
            clearInterval(progressInterval);
            setProgress(100);
            onChange(url);
            toast.success('Görsel yüklendi');
        } catch (err: any) {
            clearInterval(progressInterval);
            setPreview(null);
            setProgress(0);
            toast.error(err.message || 'Yükleme başarısız');
        } finally {
            setIsUploading(false);
            URL.revokeObjectURL(objectUrl);
        }
    }, [bucket, folder, onChange]);

    const handleRemove = useCallback(async () => {
        if (!value) return;
        try {
            await deleteImage(value, bucket);
            onChange('');
            setPreview(null);
            setProgress(0);
            toast.success('Görsel kaldırıldı');
        } catch (err: any) {
            // Even if delete fails from storage, clear the value
            onChange('');
            setPreview(null);
        }
    }, [value, bucket, onChange]);

    const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
    const onDragLeave = () => setIsDragOver(false);
    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
        e.target.value = '';
    };

    const displayUrl = value || preview;

    // If there's an existing or uploading image
    if (displayUrl) {
        return (
            <div style={{ position: 'relative' }}>
                {label && <div style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: 500 }}>{label}</div>}
                <div style={{
                    width: '100%',
                    ...(height ? { height } : { aspectRatio }),
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid rgba(255,255,255,0.06)',
                }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={displayUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                    {/* Progress overlay */}
                    {isUploading && (
                        <div style={{
                            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px',
                        }}>
                            <Loader2 size={24} color="#C9A96E" style={{ animation: 'spin 1s linear infinite' }} />
                            <div style={{ width: '60%', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${progress}%`, background: '#C9A96E', transition: 'width 200ms', borderRadius: '2px' }} />
                            </div>
                            <span style={{ fontSize: '11px', color: '#AEAEB2' }}>{Math.round(progress)}%</span>
                        </div>
                    )}

                    {/* Hover overlay (only when not uploading) */}
                    {!isUploading && value && (
                        <div
                            className="image-uploader-overlay"
                            style={{
                                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                transition: 'background 200ms', cursor: 'pointer',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                                className="img-up-btn"
                                style={{
                                    background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '6px', padding: '8px 16px', fontSize: '12px', fontWeight: 600,
                                    color: '#F5F0EB', cursor: 'pointer', transition: 'all 200ms',
                                    opacity: 0,
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                            >
                                Görseli Değiştir
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                                className="img-up-btn"
                                style={{
                                    background: 'rgba(255,69,58,0.15)', border: '1px solid rgba(255,69,58,0.3)',
                                    borderRadius: '6px', padding: '8px 16px', fontSize: '12px', fontWeight: 600,
                                    color: '#FF453A', cursor: 'pointer', transition: 'all 200ms',
                                    opacity: 0,
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,69,58,0.25)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,69,58,0.15)'; }}
                            >
                                Kaldır
                            </button>
                        </div>
                    )}
                </div>
                <input
                    ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={onFileChange} style={{ display: 'none' }} aria-hidden="true"
                />
                <style>{`
                    .image-uploader-overlay:hover .img-up-btn { opacity: 1 !important; }
                `}</style>
            </div>
        );
    }

    // Empty state — drop zone
    return (
        <div style={{ position: 'relative' }}>
            {label && <div style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: 500 }}>{label}</div>}
            <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                style={{
                    width: '100%',
                    ...(height ? { height } : { aspectRatio }),
                    background: isDragOver ? 'rgba(201,169,110,0.04)' : 'rgba(0,0,0,0.2)',
                    border: `2px dashed ${isDragOver ? 'rgba(201,169,110,0.6)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: '8px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all 200ms', gap: '8px',
                }}
            >
                {isDragOver ? (
                    <ImageIcon size={32} color="#C9A96E" />
                ) : (
                    <Upload size={32} color="#636366" />
                )}
                <div style={{ color: isDragOver ? '#C9A96E' : '#636366', fontSize: '13px' }}>
                    {isDragOver ? 'Bırakın ve yükleyin' : 'Görsel sürükleyin veya seçin'}
                </div>
                <div style={{ fontSize: '10px', color: '#3A3A3C' }}>
                    JPG, PNG, WebP, AVIF — Max 5MB
                </div>
            </div>
            <input
                ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={onFileChange} style={{ display: 'none' }} aria-hidden="true"
            />
        </div>
    );
}
