import { create } from 'zustand';

interface FavoritesState {
    favorites: string[];
    toggleFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    clearAll: () => void;
    count: () => number;
}

export const useFavorites = create<FavoritesState>((set, get) => ({
    favorites: [],
    toggleFavorite: (productId) =>
        set((state) => ({
            favorites: state.favorites.includes(productId)
                ? state.favorites.filter((id) => id !== productId)
                : [...state.favorites, productId],
        })),
    isFavorite: (productId) => get().favorites.includes(productId),
    clearAll: () => set({ favorites: [] }),
    count: () => get().favorites.length,
}));
