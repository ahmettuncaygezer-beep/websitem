'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import EmptyCart from './EmptyCart'

export default function CartDrawer() {
    const { isOpen, closeCart, items, totalItems } = useCart()

    // Açıkken body scroll kilitlenir
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    // Escape ile kapat
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCart()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [closeCart])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* BACKDROP */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        aria-hidden="true"
                    />

                    {/* DRAWER PANEL */}
                    <motion.div
                        key="drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{
                            type: 'spring',
                            damping: 30,
                            stiffness: 300
                        }}
                        className="fixed right-0 top-0 h-full w-full max-w-[420px]
                       bg-white z-50 flex flex-col shadow-2xl"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Alışveriş sepeti"
                    >
                        {/* BAŞLIK */}
                        <div className="flex items-center justify-between
                           px-6 py-5 border-b border-[#E8E3DC]">
                            <div className="flex items-center gap-3">
                                <h2 className="text-[15px] font-semibold text-[#1C1C1E]
                               tracking-wide">
                                    SEPETİM
                                </h2>
                                {totalItems > 0 && (
                                    <motion.span
                                        key={totalItems}
                                        initial={{ scale: 1.4 }}
                                        animate={{ scale: 1 }}
                                        className="w-5 h-5 rounded-full bg-[#C9A96E]
                              text-white text-[10px] font-bold
                              flex items-center justify-center"
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                            </div>
                            <button
                                onClick={closeCart}
                                className="w-8 h-8 flex items-center justify-center
                          rounded-full hover:bg-[#F5F0EB]
                          transition-colors duration-200"
                                aria-label="Sepeti kapat"
                            >
                                <X className="w-4 h-4 text-[#1C1C1E]" />
                            </button>
                        </div>

                        {/* ÜRÜN LİSTESİ veya BOŞ EKRAN */}
                        <div className="flex-1 overflow-y-auto">
                            {items.length === 0 ? (
                                <EmptyCart onClose={closeCart} />
                            ) : (
                                <div className="px-6 py-4 space-y-0 divide-y
                               divide-[#E8E3DC]">
                                    <AnimatePresence initial={false}>
                                        {items.map(item => (
                                            <CartItem key={item.product.id} item={item} />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* ÖZET & ÖDEME — sadece ürün varsa */}
                        {items.length > 0 && <CartSummary />}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
