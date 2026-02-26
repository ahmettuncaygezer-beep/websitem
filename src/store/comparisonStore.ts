import { create } from 'zustand';

export interface ComparisonProduct {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    image: string;
    href: string;
    // Karşılaştırma özellikleri
    specs?: {
        dimensions?: string;
        material?: string;
        colors?: string[];
        warranty?: string;
        delivery?: string;
        inStock?: boolean;
        origin?: string;
        fabricType?: string;
        loadCapacity?: string;
        rating?: number;
        ratingCount?: number;
    };
}

interface ComparisonStore {
    products: ComparisonProduct[];
    add: (product: ComparisonProduct) => void;
    remove: (id: string) => void;
    clear: () => void;
    has: (id: string) => boolean;
}

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
    products: [],

    add: (product) => {
        const { products } = get();
        if (products.length >= 4) return; // max 4
        if (products.some(p => p.id === product.id)) return; // duplicate önle
        set({ products: [...products, product] });
    },

    remove: (id) => {
        set({ products: get().products.filter(p => p.id !== id) });
    },

    clear: () => set({ products: [] }),

    has: (id) => get().products.some(p => p.id === id),
}));
