'use client';

import { useState, useCallback, useRef } from 'react';
import type { Product } from '@/components/ProductCard/product.types';

const PAGE_SIZE = 12;

// Mock fetcher — replace with real API call in production
async function fetchProductsPage(page: number, pageSize: number): Promise<Product[]> {
    // Simüle edilmiş gecikme
    await new Promise(r => setTimeout(r, 600));

    // In production: return fetch(`/api/products?page=${page}&pageSize=${pageSize}`).then(r => r.json())
    // Mock: return empty after page 3
    if (page > 3) return [];

    // Return mock products for demo
    return Array.from({ length: page < 3 ? pageSize : 4 }, (_, i) => ({
        id: `product-p${page}-${i}`,
        slug: `product-p${page}-${i}`,
        name: `Ürün ${(page - 1) * pageSize + i + 1}`,
        brand: 'MAISON Atelier',
        price: 15000 + Math.floor(Math.random() * 60000),
        currency: 'TRY',
        category: 'Oturma Odası',
        isNew: i % 3 === 0,
        isFeatured: i % 5 === 0,
        deliveryDays: 5,
        hasQuickShip: false,
        description: 'Premium mobilya ürünü.',
        rating: { average: 4.5, count: 80 },
        badges: [],
        colors: [
            {
                id: 'c1', name: 'Krem', hex: '#F5F0EB',
                image: `/images/gallery-${(i % 6) + 1}.jpg`,
                lifestyleImage: `/images/gallery-${((i + 1) % 6) + 1}.jpg`,
                inStock: true,
            },
        ],
    })) as Product[];
}

export interface UseInfiniteProductsReturn {
    products: Product[];
    page: number;
    hasMore: boolean;
    isLoading: boolean;
    isLoadingMore: boolean;
    totalLoaded: number;
    loadMore: () => Promise<void>;
    reset: () => void;
}

export function useInfiniteProducts(initialProducts: Product[] = []): UseInfiniteProductsReturn {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(initialProducts.length > 0 ? 1 : 0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(initialProducts.length === 0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loadingRef = useRef(false);

    const loadMore = useCallback(async () => {
        if (loadingRef.current || !hasMore) return;
        loadingRef.current = true;

        const nextPage = page + 1;
        const isFirst = page === 0;

        if (isFirst) setIsLoading(true);
        else setIsLoadingMore(true);

        try {
            const newProducts = await fetchProductsPage(nextPage, PAGE_SIZE);
            if (newProducts.length < PAGE_SIZE) setHasMore(false);
            if (newProducts.length === 0) {
                setHasMore(false);
                return;
            }
            setProducts(prev => (isFirst ? newProducts : [...prev, ...newProducts]));
            setPage(nextPage);
        } finally {
            setIsLoading(false);
            setIsLoadingMore(false);
            loadingRef.current = false;
        }
    }, [page, hasMore]);

    const reset = useCallback(() => {
        setProducts([]);
        setPage(0);
        setHasMore(true);
        setIsLoading(true);
        setIsLoadingMore(false);
        loadingRef.current = false;
    }, []);

    return {
        products,
        page,
        hasMore,
        isLoading,
        isLoadingMore,
        totalLoaded: products.length,
        loadMore,
        reset,
    };
}
