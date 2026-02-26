import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    slug: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    totalItems: number;
    totalPrice: number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            totalItems: 0,
            totalPrice: 0,

            addItem: (item) => {
                const items = get().items;
                const existingItem = items.find((i) => i.id === item.id);

                let newItems;
                if (existingItem) {
                    newItems = items.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    );
                } else {
                    newItems = [...items, { ...item, quantity: 1 }];
                }

                set({
                    items: newItems,
                    isOpen: true, // Open cart on add
                    totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
                    totalPrice: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
                });
            },

            removeItem: (id) => {
                const newItems = get().items.filter((i) => i.id !== id);
                set({
                    items: newItems,
                    totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
                    totalPrice: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
                });
            },

            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id);
                    return;
                }
                const newItems = get().items.map((i) =>
                    i.id === id ? { ...i, quantity } : i
                );
                set({
                    items: newItems,
                    totalItems: newItems.reduce((acc, i) => acc + i.quantity, 0),
                    totalPrice: newItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
                });
            },

            clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
        }),
        {
            name: 'cart-storage',
            // Omit isOpen from persistence
            partialize: (state) => ({
                items: state.items,
                totalItems: state.totalItems,
                totalPrice: state.totalPrice
            }),
        }
    )
);
