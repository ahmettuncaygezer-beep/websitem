'use client';

import { useState, useCallback } from 'react';

export type GalleryMediaType = 'image' | 'video' | '360';

export interface GalleryItem {
    id: string;
    type: GalleryMediaType;
    src: string;
    thumbnail: string;
    alt: string;
}

export function useProductGallery(items: GalleryItem[]) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<GalleryMediaType>('image');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const images = items.filter((i) => i.type === 'image');
    const filtered = activeTab === 'image' ? images : items.filter((i) => i.type === activeTab);
    const activeItem = filtered[activeIndex] ?? filtered[0];

    const goTo = useCallback(
        (idx: number) => {
            setActiveIndex(Math.max(0, Math.min(idx, filtered.length - 1)));
        },
        [filtered.length]
    );

    const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
    const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

    const switchTab = useCallback(
        (tab: GalleryMediaType) => {
            setActiveTab(tab);
            setActiveIndex(0);
        },
        []
    );

    return {
        activeItem,
        activeIndex,
        activeTab,
        filtered,
        images,
        items,
        goTo,
        next,
        prev,
        switchTab,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
    };
}
