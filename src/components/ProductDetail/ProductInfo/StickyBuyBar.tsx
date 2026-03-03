'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useSticky } from '../hooks/useSticky';

interface Props { name: string; image: string; price: number; onAddToCart: () => void; }

export function StickyBuyBar({ name, image, price, onAddToCart }: Props) {
    const isVisible = useSticky(0.4);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed bottom-0 left-0 right-0 flex items-center justify-between gap-4 px-4 md:px-8 py-3"
                    style={{ zIndex: 40, background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}
                >
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="relative shrink-0 overflow-hidden" style={{ width: 40, height: 40, borderRadius: '4px', background: '#F5F0EB' }}>
                            <Image src={image} alt={name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[13px] font-medium truncate" style={{ color: '#1C1C1E' }}>{name}</p>
                            <p className="text-[14px] font-bold" style={{ color: '#1C1C1E' }}>₺{price.toLocaleString('tr-TR')}</p>
                        </div>
                    </div>
                    <button onClick={onAddToCart}
                        className="bg-[#1C1C1E] hover:bg-[#000] text-white px-5 sm:px-8 py-3.5 sm:py-4 rounded-none font-medium flex items-center justify-center gap-3 transition-colors text-[13px] uppercase tracking-widest relative overflow-hidden group">
                        <ShoppingBag size={14} /> <span data-lang-key="prod_add_cart">Sepete Ekle</span>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
