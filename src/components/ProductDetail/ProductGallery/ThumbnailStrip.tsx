'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { GalleryItem } from '../hooks/useProductGallery';

interface ThumbnailStripProps {
    items: GalleryItem[];
    activeIndex: number;
    onSelect: (index: number) => void;
}

export function ThumbnailStrip({ items, activeIndex, onSelect }: ThumbnailStripProps) {
    return (
        <div
            className="flex gap-2 mt-3 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none' }}
            role="tablist"
            aria-label="Ürün görselleri"
        >
            {items.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                    <motion.button
                        key={item.id}
                        role="tab"
                        aria-selected={isActive}
                        aria-label={item.alt}
                        onClick={() => onSelect(i)}
                        className="relative shrink-0 overflow-hidden transition-all duration-200"
                        style={{
                            width: 72,
                            height: 90,
                            borderRadius: '2px',
                            border: isActive ? '1.5px solid #C9A96E' : '1.5px solid transparent',
                            opacity: isActive ? 1 : 0.7,
                            boxShadow: isActive ? '0 0 0 2px rgba(201,169,110,0.2)' : 'none',
                            cursor: 'pointer',
                            background: '#F5F0EB',
                        }}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ opacity: 0.9 }}
                    >
                        <Image src={item.thumbnail} alt={item.alt} fill className="object-cover" sizes="72px" />
                        {/* Video play icon overlay */}
                        {item.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
                            </div>
                        )}
                        {/* 360 icon overlay */}
                        {item.type === '360' && (
                            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                                <span className="text-white font-bold" style={{ fontSize: '10px' }}>360°</span>
                            </div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
