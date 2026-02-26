'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MediaFolderTree
} from './MediaFolderTree';
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
import { mockMediaFiles, mockMediaFolders } from '@/lib/mock/media';
import { MediaFile } from '@/types/media';

export default function MediaLibrary() {
    const [activeFolderId, setActiveFolderId] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [files, setFiles] = useState<MediaFile[]>(mockMediaFiles);

    // Filter Logic
    const filteredFiles = useMemo(() => {
        return files.filter(f => {
            const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                f.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

            const matchesFolder = activeFolderId === 'all' ||
                (activeFolderId === 'images' && f.type === 'image') ||
                (activeFolderId === 'videos' && f.type === 'video') ||
                (activeFolderId === 'docs' && (f.type === 'pdf' || f.type === 'document')) ||
                (activeFolderId === 'unused' && f.usages.length === 0) ||
                f.folderId === activeFolderId;

            return matchesSearch && matchesFolder;
        });
    }, [files, activeFolderId, search]);

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

    const handleDeleteSelected = () => {
        if (confirm(`${selectedIds.length} dosyayı silmek istediğinize emin misiniz?`)) {
            setFiles(prev => prev.filter(f => !selectedIds.includes(f.id)));
            setSelectedIds([]);
        }
    };

    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 0px)', background: '#141416', overflow: 'hidden' }}>

            {/* Left: Folder Tree */}
            <MediaFolderTree
                activeFolderId={activeFolderId}
                onSelect={(id) => { setActiveFolderId(id); setSelectedIds([]); }}
            />

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
                                onUploaded={() => { }}
                                onClose={() => setIsUploaderOpen(false)}
                            />
                        )}
                    </AnimatePresence>

                    <MediaGrid
                        files={filteredFiles}
                        selectedIds={selectedIds}
                        onToggleSelect={handleToggleSelect}
                        onPreview={() => { }} // Lightbox later
                    />

                    {filteredFiles.length === 0 && (
                        <div style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#636366' }}>
                            <p>Aradığınız kriterlere uygun dosya bulunamadı.</p>
                        </div>
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
        </div>
    );
}
