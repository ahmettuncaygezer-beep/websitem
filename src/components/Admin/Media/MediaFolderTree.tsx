'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Folder, FolderPlus, ChevronRight,
    Image as ImageIcon, Film, FileText,
    Clock, Trash2, Pin, HardDrive
} from 'lucide-react';
import { MediaFolder } from '@/types/media';

interface MediaFolderTreeProps {
    activeFolderId: string;
    onSelect: (id: string) => void;
}

const SMART_FOLDERS = [
    { id: 'all', label: 'Tüm Dosyalar', icon: HardDrive, count: 1247 },
    { id: 'images', label: 'Görseller', icon: ImageIcon, count: 850 },
    { id: 'videos', label: 'Videolar', icon: Film, count: 42 },
    { id: 'docs', label: 'Belgeler', icon: FileText, count: 18 },
    { id: 'recent', label: 'Son Yüklenenler', icon: Clock, count: 12 },
    { id: 'unused', label: 'Kullanılmayanlar', icon: Trash2, count: 5, color: '#FFD60A' },
];

export function MediaFolderTree({ activeFolderId, onSelect }: MediaFolderTreeProps) {
    const [expanded, setExpanded] = useState<string[]>(['f_root', 'f_products']);
    const [folders, setFolders] = useState<MediaFolder[]>([]);

    useEffect(() => {
        // Fetch folders from storage — smart folders are built-in, user folders come from API
        fetch('/api/admin/media/all?folder=')
            .then(r => r.json())
            .then(data => {
                // Build folder structure from file paths
                if (data.files) {
                    const folderSet = new Set<string>();
                    data.files.forEach((f: any) => {
                        const parts = (f.path || f.name || '').split('/');
                        if (parts.length > 1) folderSet.add(parts[0]);
                    });
                    setFolders(Array.from(folderSet).map(name => ({
                        id: `f_${name}`,
                        name,
                        parentId: null,
                        fileCount: data.files.filter((f: any) => (f.path || '').startsWith(name + '/')).length,
                        createdAt: new Date().toISOString(),
                    })));
                }
            })
            .catch(() => { /* keep empty */ });
    }, []);

    const toggleExpand = (id: string) => {
        setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const renderFolder = (folder: MediaFolder, depth = 0) => {
        const isExpanded = expanded.includes(folder.id);
        const isActive = activeFolderId === folder.id;
        const hasChildren = folders.some(f => f.parentId === folder.id);

        return (
            <div key={folder.id}>
                <motion.div
                    onClick={() => onSelect(folder.id)}
                    style={{
                        display: 'flex', alignItems: 'center', padding: `8px 12px 8px ${12 + depth * 16}px`,
                        cursor: 'pointer', position: 'relative', transition: 'all 200ms',
                        background: isActive ? 'rgba(201,169,110,0.1)' : 'transparent',
                        borderLeft: `2px solid ${isActive ? '#C9A96E' : 'transparent'}`
                    }}
                    whileHover={{ background: isActive ? 'rgba(201,169,110,0.1)' : 'rgba(255,255,255,0.03)' }}
                >
                    <div
                        onClick={(e) => { e.stopPropagation(); toggleExpand(folder.id); }}
                        style={{ width: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hasChildren ? 1 : 0 }}
                    >
                        <ChevronRight
                            size={14}
                            color="#636366"
                            style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 200ms' }}
                        />
                    </div>

                    <Folder
                        size={16}
                        color={isActive ? '#C9A96E' : '#AEAEB2'}
                        fill={isActive ? '#C9A96E' : 'none'}
                        style={{ margin: '0 8px' }}
                    />

                    <span style={{ fontSize: '13px', color: isActive ? '#F5F0EB' : '#AEAEB2', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {folder.name}
                    </span>

                    <span style={{ fontSize: '11px', color: '#636366' }}>{folder.fileCount}</span>
                </motion.div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden' }}
                        >
                            {folders
                                .filter(f => f.parentId === folder.id)
                                .map(f => renderFolder(f, depth + 1))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <aside style={{
            width: '220px', height: '100%', background: '#0F0F10',
            borderRight: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column'
        }}>
            {/* Smart Folders */}
            <div style={{ padding: '20px 12px 12px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 12px 12px' }}>
                    Akıllı Klasörler
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {SMART_FOLDERS.map(sf => {
                        const isActive = activeFolderId === sf.id;
                        return (
                            <button
                                key={sf.id}
                                onClick={() => onSelect(sf.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                                    background: isActive ? 'rgba(201,169,110,0.15)' : 'transparent',
                                    border: 'none', borderRadius: '4px', cursor: 'pointer', textAlign: 'left',
                                    transition: 'all 200ms', position: 'relative'
                                }}
                            >
                                <sf.icon size={16} color={isActive ? '#C9A96E' : (sf.color || '#636366')} />
                                <span style={{ fontSize: '13px', color: isActive ? '#C9A96E' : '#AEAEB2', flex: 1, fontWeight: isActive ? 600 : 400 }}>{sf.label}</span>
                                <span style={{ fontSize: '11px', color: '#636366', opacity: isActive ? 1 : 0.5 }}>{sf.count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div style={{ padding: '0 12px', margin: '12px 0' }}>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />
            </div>

            {/* User Folders */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px 12px 24px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
                        Klasörler
                    </h3>
                    <button style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer', padding: '2px' }}>
                        <FolderPlus size={14} />
                    </button>
                </div>

                {folders.filter(f => !f.parentId || f.parentId === 'f_root').map(f => renderFolder(f))}
            </div>
        </aside>
    );
}
