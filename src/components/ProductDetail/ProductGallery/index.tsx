'use client';

import { useRef } from 'react';
import { useProductGallery, type GalleryItem } from '../hooks/useProductGallery';
import { MainImage } from './MainImage';
import { ThumbnailStrip } from './ThumbnailStrip';
import { ImageModal } from './ImageModal';
import { GalleryBadge } from './GalleryBadge';
import { ARButton } from './ARButton';
import type { ProductBadge } from '@/components/ProductCard/product.types';

interface ProductGalleryProps {
    items: GalleryItem[];
    badges?: ProductBadge[];
}

export function ProductGallery({ items, badges = [] }: ProductGalleryProps) {
    const imageRef = useRef<HTMLDivElement>(null);
    const gallery = useProductGallery(items);

    const imageItems = gallery.filtered;

    return (
        <div className="relative" ref={imageRef}>
            {/* Media type tabs */}
            {items.some((i) => i.type !== 'image') && (
                <div className="flex gap-1 mb-2">
                    {(['image', 'video', '360'] as const).map((tab) => {
                        const count = items.filter((i) => i.type === tab).length;
                        if (count === 0) return null;
                        const isActive = gallery.activeTab === tab;
                        const icons = { image: '📷', video: '▶', '360': '360°' };
                        const labels = { image: `Görseller (${count})`, video: 'Video', '360': '360°' };
                        return (
                            <button
                                key={tab}
                                onClick={() => gallery.switchTab(tab)}
                                className="px-3 py-1.5 text-[11px] font-medium transition-colors duration-200"
                                style={{
                                    color: isActive ? '#1C1C1E' : '#999',
                                    borderBottom: isActive ? '2px solid #C9A96E' : '2px solid transparent',
                                    background: 'none',
                                    border: 'none',
                                    borderBottomWidth: '2px',
                                    borderBottomStyle: 'solid',
                                    borderBottomColor: isActive ? '#C9A96E' : 'transparent',
                                    cursor: 'pointer',
                                }}
                            >
                                {icons[tab]} {labels[tab]}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Main image area */}
            <div className="relative">
                <MainImage
                    item={gallery.activeItem}
                    onOpenModal={gallery.openModal}
                    onSwipe={(dir) => { dir === 'left' ? gallery.next() : gallery.prev(); }}
                />
                <GalleryBadge badges={badges} />
                <ARButton />
            </div>

            {/* Thumbnails */}
            <ThumbnailStrip items={imageItems} activeIndex={gallery.activeIndex} onSelect={gallery.goTo} />

            {/* Mobile dot indicator */}
            <div className="flex md:hidden items-center justify-center gap-1.5 mt-3">
                {imageItems.map((_, i) => (
                    <span key={i} className="rounded-full transition-all duration-200" style={{ width: i === gallery.activeIndex ? 16 : 6, height: 6, background: i === gallery.activeIndex ? '#1C1C1E' : 'rgba(28,28,30,0.25)' }} />
                ))}
            </div>

            {/* Fullscreen modal */}
            <ImageModal
                items={imageItems}
                activeIndex={gallery.activeIndex}
                isOpen={gallery.isModalOpen}
                onClose={gallery.closeModal}
                onNavigate={gallery.goTo}
            />
        </div>
    );
}
