'use client';

import { create } from 'zustand';
import { FilterState } from '@/types';
import { PRICE_RANGE } from '@/lib/constants';

interface FilterStore {
    filters: FilterState;
    toggleColor: (color: string) => void;
    toggleMaterial: (material: string) => void;
    toggleCategory: (category: string) => void;
    toggleBrand: (brand: string) => void;
    toggleInStock: () => void;
    toggleIsNew: () => void;
    setPriceRange: (range: [number, number]) => void;
    setSortBy: (sort: FilterState['sortBy']) => void;
    clearFilters: () => void;
    removeFilter: (type: 'colors' | 'materials' | 'categories' | 'brands', value: string) => void;
    removeBooleanFilter: (type: 'inStock' | 'isNew') => void;
    hasActiveFilters: () => boolean;
}

const defaultFilters: FilterState = {
    categories: [],
    brands: [],
    inStock: false,
    isNew: false,
    colors: [],
    materials: [],
    priceRange: PRICE_RANGE,
    sortBy: 'featured',
};

export const useFilters = create<FilterStore>((set, get) => {
    console.log("useFilters store initializing with new properties!");
    return {
        filters: { ...defaultFilters },

        toggleColor: (color: string) => {
            const current = get().filters.colors || [];
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
            const current = get().filters.materials || [];
            set({
                filters: {
                    ...get().filters,
                    materials: current.includes(material)
                        ? current.filter((m) => m !== material)
                        : [...current, material],
                },
            });
        },

        toggleCategory: (category: string) => {
            const current = get().filters.categories || [];
            set({
                filters: {
                    ...get().filters,
                    categories: current.includes(category)
                        ? current.filter((c) => c !== category)
                        : [...current, category],
                },
            });
        },

        toggleBrand: (brand: string) => {
            const current = get().filters.brands || [];
            set({
                filters: {
                    ...get().filters,
                    brands: current.includes(brand)
                        ? current.filter((b) => b !== brand)
                        : [...current, brand],
                },
            });
        },

        toggleInStock: () => {
            set({
                filters: {
                    ...get().filters,
                    inStock: !get().filters.inStock,
                },
            });
        },

        toggleIsNew: () => {
            set({
                filters: {
                    ...get().filters,
                    isNew: !get().filters.isNew,
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
            const current = (get().filters[type] || []) as string[];
            set({
                filters: {
                    ...get().filters,
                    [type]: current.filter((item) => item !== value),
                },
            });
        },

        removeBooleanFilter: (type) => {
            set({
                filters: {
                    ...get().filters,
                    [type]: false,
                },
            });
        },

        hasActiveFilters: () => {
            const { colors, materials, categories, brands, inStock, isNew, priceRange } = get().filters;
            return (
                (colors || []).length > 0 ||
                (materials || []).length > 0 ||
                (categories || []).length > 0 ||
                (brands || []).length > 0 ||
                inStock ||
                isNew ||
                (priceRange && priceRange[0] !== PRICE_RANGE[0]) ||
                (priceRange && priceRange[1] !== PRICE_RANGE[1])
            );
        },
    };
});
