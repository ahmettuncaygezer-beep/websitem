'use client';

import { useState, useEffect, useCallback } from 'react';

const KEY = 'maison_recently_viewed';
const MAX = 8;

interface ViewedItem {
    id: string;
    slug: string;
    name: string;
    image: string;
    price: number;
    brand: string;
}

function load(): ViewedItem[] {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}

function save(items: ViewedItem[]) {
    localStorage.setItem(KEY, JSON.stringify(items));
}

export function useRecentlyViewed(current?: ViewedItem) {
    const [items, setItems] = useState<ViewedItem[]>([]);

    useEffect(() => {
        const stored = load();
        if (current) {
            const filtered = stored.filter((i) => i.id !== current.id);
            const next = [current, ...filtered].slice(0, MAX);
            save(next);
            setItems(next.filter((i) => i.id !== current.id));
        } else {
            setItems(stored);
        }
    }, [current?.id]);

    return items;
}
