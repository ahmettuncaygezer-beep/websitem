'use client';

import { useState, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, GitCompareArrows, Check, Loader2 } from 'lucide-react';
import { useGlobal } from '@/context/GlobalContext';

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

export const ActionButtons = forwardRef<HTMLButtonElement, Props>(
    ({ productName, isWishlisted, isCompared, inStock, onAddToCart, onToggleWishlist, onToggleCompare }, ref) => {
        const [cartState, setCartState] = useState<CartState>('idle');

        const handleCart = useCallback(() => {
            if (cartState !== 'idle' || !inStock) return;
            setCartState('loading');
            onAddToCart();
            setTimeout(() => { setCartState('success'); setTimeout(() => setCartState('idle'), 1200); }, 1000);
        }, [cartState, inStock, onAddToCart]);

        const { t } = useGlobal();
        const cartBg = cartState === 'success' ? '#2E7D32' : inStock ? 'var(--foreground)' : 'var(--muted)';
        const cartTextKey = cartState === 'loading' ? 'pdp_adding' : cartState === 'success' ? 'cart_success_added' : inStock ? 'pdp_add_to_cart' : 'pdp_out_of_stock';

        return (
            <div className="mt-5">
                <button
                    ref={ref}
                    onClick={handleCart}
                    disabled={cartState === 'loading' || !inStock}
                    aria-label={`${productName} sepete ekle`}
                    className={`flex-1 h-14 flex items-center justify-center gap-3 transition-colors ${!inStock
                        ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                        : cartState === 'success'
                            ? 'bg-[#30D158] text-white'
                            : 'bg-[#1C1C1E] text-[#F5F0EB] hover:bg-[#2C2C2E]'
                        }`}
                >
                    {cartState === 'loading' && <span className="w-4 h-4 rounded-full border-2 border-[#F5F0EB]/30 border-t-[#F5F0EB] animate-spin" />}
                    {cartState === 'success' && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}><Check size={18} /></motion.span>}
                    {cartState === 'idle' && <ShoppingBag size={18} />}
                    <span data-lang-key={cartTextKey}>
                        {t(cartTextKey)}
                    </span>
                </button>

                {/* Confetti */}
                <AnimatePresence>
                    {cartState === 'success' && Array.from({ length: 12 }).map((_, i) => (
                        <motion.span key={i} className="fixed pointer-events-none" style={{ zIndex: 60, left: '50%', bottom: '30%' }}
                            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                            animate={{ opacity: 0, x: (Math.random() - 0.5) * 200, y: -(Math.random() * 150 + 50), scale: 0, rotate: Math.random() * 360 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}>
                            <span className="block w-2 h-2 rounded-sm" style={{ background: ['#C9A96E', '#4CAF50', '#F5F0EB', 'var(--foreground)'][i % 4] }} />
                        </motion.span>
                    ))}
                </AnimatePresence>

                {/* Secondary buttons */}
                <div className="flex gap-3 mt-3">
                    <button onClick={(e) => { e.preventDefault(); onToggleWishlist(); }}
                        aria-label={isWishlisted ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                        className="flex-1 py-3.5 flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-sm"
                        style={{ fontSize: '12px', border: `1.5px solid ${isWishlisted ? '#E53935' : 'var(--border)'}`, background: 'transparent', color: isWishlisted ? '#E53935' : 'var(--foreground)', cursor: 'pointer' }}>
                        <Heart size={16} fill={isWishlisted ? '#E53935' : 'transparent'} stroke={isWishlisted ? '#E53935' : 'currentColor'} />
                        <span data-lang-key={isWishlisted ? 'prod_wishlisted' : 'prod_add_wishlist'}>{isWishlisted ? t('prod_wishlisted') : t('prod_add_wishlist')}</span>
                    </button>
                    <button onClick={(e) => { e.preventDefault(); onToggleCompare(); }}
                        className="flex-1 py-3.5 flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-sm"
                        style={{ fontSize: '12px', border: `1.5px solid ${isCompared ? '#C9A96E' : 'var(--border)'}`, background: isCompared ? 'var(--accent)' : 'transparent', color: isCompared ? '#C9A96E' : 'var(--foreground)', cursor: 'pointer' }}>
                        <GitCompareArrows size={16} />
                        <span data-lang-key={isCompared ? 'prod_compared' : 'prod_add_compare'}>{isCompared ? t('prod_compared') : t('prod_add_compare')}</span>
                    </button>
                </div>
            </div>
        );
    }
);

ActionButtons.displayName = 'ActionButtons';
