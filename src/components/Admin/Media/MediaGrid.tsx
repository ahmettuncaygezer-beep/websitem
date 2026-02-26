'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaCard } from './MediaCard';
import { MediaFile } from '@/types/media';

interface MediaGridProps {
    files: MediaFile[];
    selectedIds: string[];
    onToggleSelect: (id: string, isMulti: boolean) => void;
    onPreview: (file: MediaFile) => void;
}

export function MediaGrid({ files, selectedIds, onToggleSelect, onPreview }: MediaGridProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.02 } }
            }}
            style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '16px', padding: '24px'
            }}
        >
            <AnimatePresence mode="popLayout">
                {files.map((file) => (
                    <motion.div
                        key={file.id}
                        variants={{
                            hidden: { opacity: 0, scale: 0.9, y: 10 },
                            visible: { opacity: 1, scale: 1, y: 0 }
                        }}
                        layout
                    >
                        <MediaCard
                            file={file}
                            isSelected={selectedIds.includes(file.id)}
                            onSelect={() => onToggleSelect(file.id, false)}
                            onPreview={onPreview}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
}
