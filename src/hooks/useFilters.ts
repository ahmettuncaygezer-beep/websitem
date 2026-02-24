'use client';

import { create } from 'zustand';
import { FilterState } from '@/types';
import { PRICE_RANGE } from '@/lib/constants';

interface FilterStore {
    filters: FilterState;
    toggleColor: (color: string) => void;
    toggleMaterial: (material: string) => void;
    setPriceRange: (range: [number, number]) => void;
    setSortBy: (sort: FilterState['sortBy']) => void;
    clearFilters: () => void;
    removeFilter: (type: 'colors' | 'materials', value: string) => void;
    hasActiveFilters: () => boolean;
}

const defaultFilters: FilterState = {
    colors: [],
    materials: [],
    priceRange: PRICE_RANGE,
    sortBy: 'featured',
};

export const useFilters = create<FilterStore>((set, get) => ({
    filters: { ...defaultFilters },

    toggleColor: (color: string) => {
        const current = get().filters.colors;
        set({
            filters: {
                ...get().filters,
                colors: current.includes(color)
                    ? current.filter((c) => c !== color)
                    : [...current, color],
            },
        });
    },

    toggleMaterial: (material: string) => {
        const current = get().filters.materials;
        set({
            filters: {
                ...get().filters,
                materials: current.includes(material)
                    ? current.filter((m) => m !== material)
                    : [...current, material],
            },
        });
    },

    setPriceRange: (range: [number, number]) => {
        set({ filters: { ...get().filters, priceRange: range } });
    },

    setSortBy: (sort: FilterState['sortBy']) => {
        set({ filters: { ...get().filters, sortBy: sort } });
    },

    clearFilters: () => {
        set({ filters: { ...defaultFilters } });
    },

    removeFilter: (type, value) => {
        const current = get().filters[type] as string[];
        set({
            filters: {
                ...get().filters,
                [type]: current.filter((item) => item !== value),
            },
        });
    },

    hasActiveFilters: () => {
        const { colors, materials, priceRange } = get().filters;
        return (
            colors.length > 0 ||
            materials.length > 0 ||
            priceRange[0] !== PRICE_RANGE[0] ||
            priceRange[1] !== PRICE_RANGE[1]
        );
    },
}));
