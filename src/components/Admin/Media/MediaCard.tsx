'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Eye, Link as LinkIcon, Edit3,
    Play, FileText, CheckCircle2
} from 'lucide-react';
import { MediaFile, formatFileSize } from '@/types/media';

interface MediaCardProps {
    file: MediaFile;
    isSelected: boolean;
    onSelect: () => void;
    onPreview: (file: MediaFile) => void;
}

export function MediaCard({ file, isSelected, onSelect, onPreview }: MediaCardProps) {
    const isImage = file.type === 'image';
    const isVideo = file.type === 'video';
    const isPdf = file.type === 'pdf';

    return (
        <motion.div
            layout
            onClick={onSelect}
            whileHover={{ y: -4 }}
            style={{
                background: '#1C1C1E', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer',
                border: `1px solid ${isSelected ? '#C9A96E' : 'rgba(255,255,255,0.06)'}`,
                position: 'relative', transition: 'border-color 200ms',
                boxShadow: isSelected ? '0 0 0 1px #C9A96E' : 'none'
            }}
        >
            {/* Thumbnail Area */}
            <div style={{ aspectRatio: '1/1', position: 'relative', background: '#0F0F10', overflow: 'hidden' }}>
                {isImage && (
                    <img
                        src={file.thumbnailUrl || file.url}
                        alt={file.altText}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                )}

                {isVideo && (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <img src={file.thumbnailUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                        <div style={{ position: 'absolute', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', padding: '10px', backdropFilter: 'blur(4px)' }}>
                            <Play size={20} fill="#F5F0EB" stroke="none" />
                        </div>
                        <span style={{ position: 'absolute', bottom: '8px', left: '8px', fontSize: '9px', fontWeight: 700, background: 'rgba(0,0,0,0.6)', padding: '2px 4px', borderRadius: '2px', color: '#F5F0EB' }}>
                            {Math.floor((file.duration || 0) / 60)}:{(file.duration || 0) % 60}
                        </span>
                    </div>
                )}

                {isPdf && (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <FileText size={40} color="#FF453A" />
                        <span style={{ fontSize: '10px', fontWeight: 700, color: '#636366' }}>PDF</span>
                    </div>
                )}

                {/* Hover Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
                    }}
                >
                    <button onClick={(e) => { e.stopPropagation(); onPreview(file); }} style={iconBtnStyle} title="Önizle"><Eye size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); }} style={iconBtnStyle} title="URL Kopyala"><LinkIcon size={16} /></button>
                    <button onClick={(e) => { e.stopPropagation(); }} style={iconBtnStyle} title="Düzenle"><Edit3 size={16} /></button>
                </motion.div>

                {/* Selection Checkbox */}
                <div
                    style={{
                        position: 'absolute', top: '8px', left: '8px', width: '18px', height: '18px',
                        borderRadius: '4px', border: `1px solid ${isSelected ? '#C9A96E' : 'rgba(255,255,255,0.2)'}`,
                        background: isSelected ? '#C9A96E' : 'rgba(0,0,0,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    {isSelected && <CheckCircle2 size={12} color="#0F0F10" strokeWidth={3} />}
                </div>
            </div>

            {/* Info Area */}
            <div style={{ padding: '8px' }}>
                <div style={{ fontSize: '12px', color: isSelected ? '#F5F0EB' : '#AEAEB2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.name}
                </div>
                <div style={{ fontSize: '11px', color: '#636366', marginTop: '2px' }}>
                    {formatSize(file.size)} {isImage && file.width && `· ${file.width}x${file.height}`}
                </div>
            </div>
        </motion.div>
    );
}

function formatSize(bytes: number) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

const iconBtnStyle = {
    width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
    border: 'none', color: '#F5F0EB', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 200ms', backdropFilter: 'blur(4px)'
};
