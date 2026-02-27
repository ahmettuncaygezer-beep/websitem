'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Truck } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

const FREE_SHIPPING_THRESHOLD = 5000

export default function CartSummary() {
    const { totalPrice, closeCart } = useCart()

    const remaining = FREE_SHIPPING_THRESHOLD - totalPrice
    const hasShipping = totalPrice >= FREE_SHIPPING_THRESHOLD
    const progressPercent = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)

    const formatted = (n: number) =>
        new Intl.NumberFormat('tr-TR').format(Math.round(n))

    return (
        <div className="border-t border-[#E8E3DC] bg-white">

            {/* ÜCRETSİZ KARGO PROGRESS */}
            <div className="px-6 pt-4 pb-3">
                <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-3.5 h-3.5 text-[#C9A96E]" />
                    {hasShipping ? (
                        <p className="text-[12px] text-[#4CAF50] font-medium" data-lang-key="cart_free_shipping_won">
                            Ücretsiz kargo kazandınız! 🎉
                        </p>
                    ) : (
                        <p className="text-[12px] text-[#666]">
                            <span className="font-semibold text-[#1C1C1E]">
                                ₺{formatted(remaining)}
                            </span>
                            {' '}<span data-lang-key="cart_add_more_for_free">daha ekleyin, kargo ücretsiz!</span>
                        </p>
                    )}
                </div>
                <div className="w-full h-1 bg-[#E8E3DC] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#C9A96E] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>
            </div>

            {/* TOPLAM */}
            <div className="px-6 py-3 space-y-2">
                <div className="flex justify-between text-[13px]">
                    <span className="text-[#666]" data-lang-key="cart_subtotal">Ara Toplam</span>
                    <span className="font-medium text-[#1C1C1E]">
                        ₺{formatted(totalPrice)}
                    </span>
                </div>
                <div className="flex justify-between text-[13px]">
                    <span className="text-[#666]" data-lang-key="cart_shipping">Kargo</span>
                    <span className={hasShipping
                        ? 'text-[#4CAF50] font-medium'
                        : 'font-medium text-[#1C1C1E]'}>
                        {hasShipping ? <span data-lang-key="cart_free">Ücretsiz</span> : `₺${formatted(199)}`}
                    </span>
                </div>
                <div className="flex justify-between text-[15px] pt-2
                       border-t border-[#E8E3DC]">
                    <span className="font-semibold text-[#1C1C1E]" data-lang-key="cart_total">Toplam</span>
                    <span className="font-bold text-[#1C1C1E]">
                        ₺{formatted(hasShipping ? totalPrice : totalPrice + 199)}
                    </span>
                </div>
            </div>

            {/* BUTONLAR */}
            <div className="px-6 pb-6 pt-2 space-y-3">
                <Link
                    href="/odeme"
                    onClick={closeCart}
                    className="flex items-center justify-center gap-2
                    w-full py-3.5 bg-[#1C1C1E] text-white
                    text-[13px] font-semibold tracking-wide
                    hover:bg-[#C9A96E] transition-colors duration-300
                    rounded-sm"
                >
                    <ShoppingBag className="w-4 h-4" />
                    <span data-lang-key="cart_checkout">ÖDEMEYİ TAMAMLA</span>
                </Link>
                <button
                    onClick={closeCart}
                    className="w-full py-3 border border-[#E8E3DC]
                    text-[13px] text-[#666] hover:text-[#1C1C1E]
                    hover:border-[#1C1C1E] transition-colors duration-200
                    rounded-sm"
                    data-lang-key="continue_shopping"
                >
                    Alışverişe Devam Et
                </button>
            </div>
        </div>
    )
}
