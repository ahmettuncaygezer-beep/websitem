'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MediaFilters
} from './MediaFilters';
import {
    MediaGrid
} from './MediaGrid';
import {
    MediaUploader
} from './MediaUploader';
import {
    MediaDetailPanel
} from './MediaDetailPanel';
import {
    BulkActionsBar
} from './BulkActionsBar';
import { MediaFile, formatFileSize } from '@/types/media';
import { listFiles, deleteImage } from '@/lib/storage';
import { toast } from 'react-hot-toast';
import {
    Image as ImageIcon, Film, FileText, HardDrive,
    Loader2, Package, BookOpen, Layers, FolderOpen
} from 'lucide-react';

// Bucket configuration
const BUCKETS = [
    { id: 'all', label: 'Tüm Dosyalar', icon: HardDrive },
    { id: 'products', label: 'Ürünler', icon: Package },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'categories', label: 'Kategoriler', icon: Layers },
    { id: 'media', label: 'Genel', icon: FolderOpen },
];

function fileToMediaFile(file: { name: string; url: string; size: number; createdAt: string; mimeType: string }, bucket: string): MediaFile {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const isImage = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'].includes(ext);
    const isVideo = ['mp4', 'webm', 'mov'].includes(ext);
    const isPdf = ext === 'pdf';

    return {
        id: `${bucket}/${file.name}`,
        name: file.name,
        originalName: file.name,
        type: isImage ? 'image' : isVideo ? 'video' : isPdf ? 'pdf' : 'other',
        mimeType: file.mimeType || 'application/octet-stream',
        url: file.url,
        thumbnailUrl: isImage ? file.url : undefined,
        size: file.size,
        folderId: bucket,
        altText: '',
        tags: [bucket],
        uploadedBy: { id: 'system', name: 'Admin', avatar: '' },
        usages: [],
        createdAt: file.createdAt || new Date().toISOString(),
        updatedAt: file.createdAt || new Date().toISOString(),
    };
}

export default function MediaLibrary() {
    const [activeBucket, setActiveBucket] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bucketCounts, setBucketCounts] = useState<Record<string, number>>({});

    const fetchFiles = useCallback(async () => {
        setIsLoading(true);
        try {
            const bucketsToFetch = activeBucket === 'all'
                ? ['products', 'blog', 'categories', 'media']
                : [activeBucket];

            const allFiles: MediaFile[] = [];
            const counts: Record<string, number> = {};

            for (const bucket of bucketsToFetch) {
                try {
                    const result = await listFiles(bucket);
                    const mapped = result.map(f => fileToMediaFile(f, bucket));
                    allFiles.push(...mapped);
                    counts[bucket] = result.length;
                } catch {
                    counts[bucket] = 0;
                }
            }

            // If fetching 'all', also compute individual counts
            if (activeBucket === 'all') {
                setBucketCounts(counts);
            }

            setFiles(allFiles);
        } catch (err: any) {
            toast.error('Dosyalar yüklenemedi');
        } finally {
            setIsLoading(false);
        }
    }, [activeBucket]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const filteredFiles = useMemo(() => {
        return files.filter(f => {
            const matchesSearch = !search || f.name.toLowerCase().includes(search.toLowerCase());
            return matchesSearch;
        });
    }, [files, search]);

    const selectedFile = useMemo(() => {
        if (selectedIds.length !== 1) return null;
        return files.find(f => f.id === selectedIds[0]) || null;
    }, [files, selectedIds]);

    const handleToggleSelect = (id: string, isMulti: boolean) => {
        setSelectedIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(i => i !== id);
            } else {
                return isMulti ? [...prev, id] : [id];
            }
        });
    };

    const handleUpdateFile = (id: string, updates: Partial<MediaFile>) => {
        setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
    };

    const handleDeleteSelected = async () => {
        if (!confirm(`${selectedIds.length} dosyayı silmek istediğinize emin misiniz?`)) return;

        const toDelete = files.filter(f => selectedIds.includes(f.id));
        let deleted = 0;

        for (const file of toDelete) {
            try {
                // Extract bucket from ID: "bucket/filename"
                const bucket = file.folderId;
                await deleteImage(file.url, bucket);
                deleted++;
            } catch {
                // Continue even if one fails
            }
        }

        setFiles(prev => prev.filter(f => !selectedIds.includes(f.id)));
        setSelectedIds([]);
        toast.success(`${deleted} dosya silindi`);
    };

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success('URL kopyalandı');
    };

    const totalCount = Object.values(bucketCounts).reduce((a, b) => a + b, 0) || files.length;

    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 0px)', background: '#141416', overflow: 'hidden' }}>

            {/* Left: Bucket Navigation */}
            <aside style={{
                width: '220px', height: '100%', background: '#0F0F10',
                borderRight: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column'
            }}>
                <div style={{ padding: '20px 12px 12px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 12px 12px' }}>
                        Depolama Alanları
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {BUCKETS.map(b => {
                            const isActive = activeBucket === b.id;
                            const count = b.id === 'all' ? totalCount : (bucketCounts[b.id] ?? '—');
                            return (
                                <button
                                    key={b.id}
                                    onClick={() => { setActiveBucket(b.id); setSelectedIds([]); }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                                        background: isActive ? 'rgba(201,169,110,0.15)' : 'transparent',
                                        border: 'none', borderRadius: '4px', cursor: 'pointer', textAlign: 'left',
                                        transition: 'all 200ms',
                                    }}
                                >
                                    <b.icon size={16} color={isActive ? '#C9A96E' : '#636366'} />
                                    <span style={{ fontSize: '13px', color: isActive ? '#C9A96E' : '#AEAEB2', flex: 1, fontWeight: isActive ? 600 : 400 }}>{b.label}</span>
                                    <span style={{ fontSize: '11px', color: '#636366' }}>{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* Center: Main Content */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <MediaFilters
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    search={search}
                    setSearch={setSearch}
                    onUploadClick={() => setIsUploaderOpen(!isUploaderOpen)}
                />

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <AnimatePresence>
                        {isUploaderOpen && (
                            <MediaUploader
                                bucket={activeBucket === 'all' ? 'media' : activeBucket}
                                onUploaded={() => { fetchFiles(); }}
                                onClose={() => setIsUploaderOpen(false)}
                            />
                        )}
                    </AnimatePresence>

                    {isLoading ? (
                        <div style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                            <Loader2 size={28} color="#C9A96E" style={{ animation: 'spin 1s linear infinite' }} />
                            <span style={{ color: '#636366', fontSize: '13px' }}>Dosyalar yükleniyor...</span>
                        </div>
                    ) : (
                        <>
                            <MediaGrid
                                files={filteredFiles}
                                selectedIds={selectedIds}
                                onToggleSelect={handleToggleSelect}
                                onPreview={() => { }}
                            />

                            {filteredFiles.length === 0 && !isLoading && (
                                <div style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#636366' }}>
                                    <ImageIcon size={48} color="rgba(201,169,110,0.2)" />
                                    <p style={{ marginTop: '16px' }}>Bu alanda henüz dosya yok.</p>
                                    <button
                                        onClick={() => setIsUploaderOpen(true)}
                                        style={{
                                            marginTop: '12px', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)',
                                            borderRadius: '6px', padding: '8px 20px', fontSize: '13px', color: '#C9A96E', cursor: 'pointer'
                                        }}
                                    >
                                        İlk Dosyanızı Yükleyin
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <BulkActionsBar
                    selectedCount={selectedIds.length}
                    onClear={() => setSelectedIds([])}
                    onDelete={handleDeleteSelected}
                    onMove={() => { }}
                />
            </main>

            {/* Right: Detail Panel */}
            <MediaDetailPanel
                file={selectedFile}
                onClose={() => setSelectedIds([])}
                onUpdate={handleUpdateFile}
            />
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
