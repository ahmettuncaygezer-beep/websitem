'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, GitCompareArrows, Check, Loader2 } from 'lucide-react';

type CartState = 'idle' | 'loading' | 'success';

interface Props {
    productName: string;
    isWishlisted: boolean;
    isCompared: boolean;
    inStock: boolean;
    onAddToCart: () => void;
    onToggleWishlist: () => void;
    onToggleCompare: () => void;
}

export function ActionButtons({ productName, isWishlisted, isCompared, inStock, onAddToCart, onToggleWishlist, onToggleCompare }: Props) {
    const [cartState, setCartState] = useState<CartState>('idle');

    const handleCart = useCallback(() => {
        if (cartState !== 'idle' || !inStock) return;
        setCartState('loading');
        onAddToCart();
        setTimeout(() => { setCartState('success'); setTimeout(() => setCartState('idle'), 1200); }, 1000);
    }, [cartState, inStock, onAddToCart]);

    const cartBg = cartState === 'success' ? '#2E7D32' : inStock ? '#1C1C1E' : '#E0E0E0';
    const cartText = cartState === 'loading' ? 'Ekleniyor...' : cartState === 'success' ? 'Sepete Eklendi ✓' : inStock ? 'Sepete Ekle' : 'Stokta Yok';

    return (
        <div className="mt-5">
            {/* Main CTA */}
            <button onClick={handleCart} disabled={!inStock || cartState !== 'idle'} aria-label={`${productName} sepete ekle`}
                className="w-full py-4 flex items-center justify-center gap-3 font-semibold tracking-wider uppercase transition-all duration-250 rounded-sm"
                style={{ fontSize: '13px', background: cartBg, color: inStock ? 'white' : '#999', border: 'none', cursor: inStock && cartState === 'idle' ? 'pointer' : 'not-allowed', letterSpacing: '0.15em' }}>
                {cartState === 'loading' && <Loader2 size={18} className="animate-spin" />}
                {cartState === 'success' && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}><Check size={18} /></motion.span>}
                {cartState === 'idle' && <ShoppingBag size={18} />}
                {cartText}
            </button>

            {/* Confetti */}
            <AnimatePresence>
                {cartState === 'success' && Array.from({ length: 12 }).map((_, i) => (
                    <motion.span key={i} className="fixed pointer-events-none" style={{ zIndex: 60, left: '50%', bottom: '30%' }}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        animate={{ opacity: 0, x: (Math.random() - 0.5) * 200, y: -(Math.random() * 150 + 50), scale: 0, rotate: Math.random() * 360 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}>
                        <span className="block w-2 h-2 rounded-sm" style={{ background: ['#C9A96E', '#4CAF50', '#F5F0EB', '#1C1C1E'][i % 4] }} />
                    </motion.span>
                ))}
            </AnimatePresence>

            {/* Secondary buttons */}
            <div className="flex gap-3 mt-3">
                <button onClick={(e) => { e.preventDefault(); onToggleWishlist(); }}
                    aria-label={isWishlisted ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                    className="flex-1 py-3.5 flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-sm"
                    style={{ fontSize: '12px', border: `1.5px solid ${isWishlisted ? '#E53935' : '#E0E0E0'}`, background: 'transparent', color: isWishlisted ? '#E53935' : '#1C1C1E', cursor: 'pointer' }}>
                    <Heart size={16} fill={isWishlisted ? '#E53935' : 'transparent'} stroke={isWishlisted ? '#E53935' : 'currentColor'} />
                    {isWishlisted ? 'Favorilerde' : 'Favorilere Ekle'}
                </button>
                <button onClick={(e) => { e.preventDefault(); onToggleCompare(); }}
                    className="flex-1 py-3.5 flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-sm"
                    style={{ fontSize: '12px', border: `1.5px solid ${isCompared ? '#C9A96E' : '#E0E0E0'}`, background: isCompared ? '#FDF8F0' : 'transparent', color: isCompared ? '#C9A96E' : '#1C1C1E', cursor: 'pointer' }}>
                    <GitCompareArrows size={16} />
                    {isCompared ? 'Eklendi ✓' : 'Karşılaştır'}
                </button>
            </div>
        </div>
    );
}
