'use client'

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useCallback,
    ReactNode
} from 'react'

/* ── TİPLER ─────────────────────────────── */
export interface CartProduct {
    id: string
    name: string
    brand: string
    price: number
    originalPrice?: number
    image: string
    color?: string
    material?: string
    href: string
}

export interface CartItem {
    product: CartProduct
    quantity: number
    selectedColor?: string
    selectedMaterial?: string
}

interface CartState {
    items: CartItem[]
    isOpen: boolean
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'OPEN_CART' }
    | { type: 'CLOSE_CART' }
    | { type: 'LOAD_FROM_STORAGE'; payload: CartItem[] }

interface CartContextValue {
    items: CartItem[]
    isOpen: boolean
    totalItems: number
    totalPrice: number
    addItem: (product: CartProduct, options?: {
        quantity?: number
        selectedColor?: string
        selectedMaterial?: string
    }) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    openCart: () => void
    closeCart: () => void
    isInCart: (productId: string) => boolean
    getItemQuantity: (productId: string) => number
}

/* ── STORAGE KEY ─────────────────────────── */
const STORAGE_KEY = 'selis_cart_v1'

/* ── REDUCER ─────────────────────────────── */
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {

        case 'ADD_ITEM': {
            const existingIndex = state.items.findIndex(
                item => item.product.id === action.payload.product.id &&
                    item.selectedColor === action.payload.selectedColor &&
                    item.selectedMaterial === action.payload.selectedMaterial
            )

            if (existingIndex >= 0) {
                const updatedItems = state.items.map((item, index) =>
                    index === existingIndex
                        ? { ...item, quantity: item.quantity + (action.payload.quantity ?? 1) }
                        : item
                )
                return { ...state, items: updatedItems, isOpen: true }
            }

            return {
                ...state,
                items: [...state.items, action.payload],
                isOpen: true
            }
        }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(
                    item => item.product.id !== action.payload
                )
            }

        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(
                        item => item.product.id !== action.payload.id
                    )
                }
            }
            return {
                ...state,
                items: state.items.map(item =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            }
        }

        case 'CLEAR_CART':
            return { ...state, items: [] }

        case 'OPEN_CART':
            return { ...state, isOpen: true }

        case 'CLOSE_CART':
            return { ...state, isOpen: false }

        case 'LOAD_FROM_STORAGE':
            return { ...state, items: action.payload }

        default:
            return state
    }
}

/* ── CONTEXT OLUŞTUR ─────────────────────── */
const CartContext = createContext<CartContextValue | null>(null)

/* ── PROVIDER ────────────────────────────── */
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        items: [],
        isOpen: false
    })

    // Sayfa ilk yüklenince localStorage'dan sepeti yükle
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                const parsed = JSON.parse(stored) as CartItem[]
                if (Array.isArray(parsed) && parsed.length > 0) {
                    dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed })
                }
            }
        } catch {
            localStorage.removeItem(STORAGE_KEY)
        }
    }, [])

    // Sepet her değişince localStorage'a kaydet
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
        } catch {
            console.warn('Sepet kaydedilemedi')
        }
    }, [state.items])

    /* ── HESAPLAMALAR ── */
    const totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity, 0
    )

    const totalPrice = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    )

    /* ── AKSIYONLAR ── */
    const addItem = useCallback((
        product: CartProduct,
        options?: {
            quantity?: number
            selectedColor?: string
            selectedMaterial?: string
        }
    ) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                product,
                quantity: options?.quantity ?? 1,
                selectedColor: options?.selectedColor,
                selectedMaterial: options?.selectedMaterial
            }
        })
    }, [])

    const removeItem = useCallback((productId: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId })
    }, [])

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
    }, [])

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' })
        localStorage.removeItem(STORAGE_KEY)
    }, [])

    const openCart = useCallback(() => {
        dispatch({ type: 'OPEN_CART' })
    }, [])

    const closeCart = useCallback(() => {
        dispatch({ type: 'CLOSE_CART' })
    }, [])

    const isInCart = useCallback((productId: string) => {
        return state.items.some(item => item.product.id === productId)
    }, [state.items])

    const getItemQuantity = useCallback((productId: string) => {
        return state.items.find(
            item => item.product.id === productId
        )?.quantity ?? 0
    }, [state.items])

    return (
        <CartContext.Provider value={{
            items: state.items,
            isOpen: state.isOpen,
            totalItems,
            totalPrice,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            openCart,
            closeCart,
            isInCart,
            getItemQuantity
        }}>
            {children}
        </CartContext.Provider>
    )
}

/* ── HOOK ─────────────────────────────────── */
export function useCartContext() {
    const ctx = useContext(CartContext)
    if (!ctx) {
        throw new Error(
            'useCartContext, CartProvider içinde kullanılmalıdır. ' +
            'app/layout.tsx dosyasına <CartProvider> ekleyin.'
        )
    }
    return ctx
}

export const useCart = useCartContext
