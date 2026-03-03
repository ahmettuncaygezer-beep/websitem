'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'selis_wishlist';

function getWishlist(): string[] {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveWishlist(ids: string[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useWishlist(productId: string) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        setIsWishlisted(getWishlist().includes(productId));
    }, [productId]);

    const toggle = useCallback(() => {
        const list = getWishlist();
        let next: string[];
        if (list.includes(productId)) {
            next = list.filter((id) => id !== productId);
        } else {
            next = [...list, productId];
        }
        saveWishlist(next);
        setIsWishlisted(next.includes(productId));
    }, [productId]);

    return { isWishlisted, toggle };
}

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        setFavorites(getWishlist());
        // Listen for storage changes in other tabs
        const handleStorage = () => setFavorites(getWishlist());
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return { favorites };
}
