'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/constants';

export function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={closeCart}
                        className="fixed inset-0 z-[70] bg-charcoal/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                            <div className="flex items-center gap-2">
                                <ShoppingBag size={20} />
                                <h2 className="font-serif text-xl">Sepetiniz</h2>
                                <span className="text-xs font-sans text-warm-gray-light bg-sand px-2 py-0.5 rounded-full">
                                    {items.length} ürün
                                </span>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:opacity-70 transition-opacity"
                                aria-label="Kapat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag size={48} className="text-border mb-4" />
                                    <p className="font-serif text-xl mb-2">Sepetiniz Boş</p>
                                    <p className="text-sm font-sans text-warm-gray-light mb-6">
                                        Koleksiyonlarımızı keşfederek ilham alın.
                                    </p>
                                    <button
                                        onClick={closeCart}
                                        className="px-6 py-3 bg-gold text-white text-sm font-sans font-semibold uppercase tracking-wider rounded-full hover:bg-gold-dark transition-colors"
                                    >
                                        Alışverişe Başla
                                    </button>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.product.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4 pb-4 border-b border-border/50"
                                        >
                                            {/* Product image */}
                                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-sand flex-shrink-0">
                                                <div className="w-full h-full bg-gradient-to-br from-sand to-linen" />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-xs font-sans text-warm-gray-light uppercase tracking-wider">
                                                            {item.product.brand}
                                                        </p>
                                                        <h4 className="font-serif text-sm mt-0.5 truncate">
                                                            {item.product.name}
                                                        </h4>
                                                        {item.selectedColor && (
                                                            <div className="flex items-center gap-1.5 mt-1">
                                                                <span
                                                                    className="w-3 h-3 rounded-full border border-border"
                                                                    style={{ backgroundColor: item.selectedColor.hex }}
                                                                />
                                                                <span className="text-xs font-sans text-warm-gray-light">
                                                                    {item.selectedColor.name}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.product.id)}
                                                        className="p-1 hover:opacity-50 transition-opacity text-warm-gray-light"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-3">
                                                    {/* Quantity */}
                                                    <div className="flex items-center border border-border rounded-full">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="px-2.5 py-1 hover:bg-sand transition-colors rounded-l-full"
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="px-3 text-sm font-sans font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="px-2.5 py-1 hover:bg-sand transition-colors rounded-r-full"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    {/* Price */}
                                                    <p className="font-sans font-semibold text-sm">
                                                        {formatPrice(
                                                            (item.product.salePrice || item.product.price) * item.quantity
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="px-6 py-5 border-t border-border space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-sans text-warm-gray-light uppercase tracking-wider">
                                            Ara Toplam
                                        </p>
                                        <p className="font-serif text-xl mt-0.5">{formatPrice(totalPrice())}</p>
                                    </div>
                                    <p className="text-xs font-sans text-warm-gray-light">
                                        Kargo hesapta hesaplanır
                                    </p>
                                </div>
                                <Link
                                    href="/odeme"
                                    onClick={closeCart}
                                    className="block w-full py-4 bg-gold text-white text-center text-sm font-sans font-semibold uppercase tracking-widest rounded-full hover:bg-gold-dark transition-colors"
                                >
                                    Ödemeye Geç
                                </Link>
                                <button
                                    onClick={closeCart}
                                    className="block w-full py-3 text-center text-sm font-sans text-warm-gray hover:text-charcoal transition-colors"
                                >
                                    Alışverişe Devam Et
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
