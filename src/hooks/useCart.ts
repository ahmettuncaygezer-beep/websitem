'use client';

import { create } from 'zustand';
import { CartItem, Product, ProductColor } from '@/types';

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, color?: ProductColor) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCart = create<CartStore>((set, get) => ({
    items: [],
    isOpen: false,

    addItem: (product: Product, color?: ProductColor) => {
        const items = get().items;
        const existingItem = items.find(
            (item) => item.product.id === product.id && item.selectedColor?.hex === color?.hex
        );

        if (existingItem) {
            set({
                items: items.map((item) =>
                    item.product.id === product.id && item.selectedColor?.hex === color?.hex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
                isOpen: true,
            });
        } else {
            set({
                items: [...items, { product, quantity: 1, selectedColor: color }],
                isOpen: true,
            });
        }
    },

    removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
    },

    updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
            get().removeItem(productId);
            return;
        }
        set({
            items: get().items.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            ),
        });
    },

    clearCart: () => set({ items: [] }),
    toggleCart: () => set({ isOpen: !get().isOpen }),
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),

    totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: () =>
        get().items.reduce(
            (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity,
            0
        ),
}));
