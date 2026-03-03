'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Check, Loader2 } from 'lucide-react';
import type { CartButtonState } from './product.types';

interface AddToCartButtonProps {
    state: CartButtonState;
    onAdd: () => void;
    isCardHovered: boolean;
    productName: string;
}

export function AddToCartButton({
    state,
    onAdd,
    isCardHovered,
    productName,
}: AddToCartButtonProps) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onAdd();
    };

    const bg = state === 'success' ? '#4CAF50' : '#1C1C1E';
    const icon = state === 'loading' ? <Loader2 size={16} className="animate-spin" /> : state === 'success' ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}><Check size={16} /></motion.span> : <ShoppingBag size={16} />;
    const textKey = state === 'loading' ? 'prod_add_cart_adding' : state === 'success' ? 'prod_add_cart_added' : 'prod_add_cart';
    const text = state === 'loading'
        ? 'Ekleniyor...'
        : state === 'success'
            ? 'Eklendi ✓'
            : 'Sepete Ekle';

    return (
        <motion.div
            className="absolute bottom-0 left-0 right-0"
            style={{ zIndex: 10 }}
            initial={false}
            animate={{ y: isCardHovered ? '0%' : '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <button
                onClick={handleClick}
                disabled={state !== 'idle'}
                aria-label={`${productName} sepete ekle`}
                className="w-full py-3 flex items-center justify-center gap-2 font-semibold tracking-wider uppercase transition-colors duration-200"
                style={{
                    fontSize: '12px',
                    background: bg,
                    color: 'white',
                    border: 'none',
                    cursor: state === 'idle' ? 'pointer' : 'default',
                    opacity: state === 'loading' ? 0.8 : 1,
                }}
            >
                {icon}
                <span data-lang-key={textKey}>{text}</span>
            </button>
        </motion.div>
    );
}
