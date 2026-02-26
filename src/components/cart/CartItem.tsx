'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import type { CartItem as CartItemType } from '@/store/cartStore'

export default function CartItem({ item }: { item: CartItemType }) {
    const { removeItem, updateQuantity } = useCart()
    const { id, name, price, image, quantity } = item

    const formattedPrice = new Intl.NumberFormat('tr-TR').format(
        price * quantity
    )
    const formattedUnit = new Intl.NumberFormat('tr-TR').format(price)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40, height: 0 }}
            transition={{ duration: 0.25 }}
            className="flex gap-4 py-5"
        >
            {/* ÜRÜN GÖRSELİ */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-sm
                     overflow-hidden bg-[#F5F0EB]">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="80px"
                    className="object-cover"
                />
            </div>

            {/* BİLGİLER */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                    <div>
                        <p className="text-[11px] text-[#999] uppercase tracking-wider
                         mb-0.5">
                            MAISON
                        </p>
                        <p className="text-[13px] font-medium text-[#1C1C1E]
                         leading-snug truncate max-w-[160px]">
                            {name}
                        </p>
                    </div>

                    {/* SİL BUTONU */}
                    <button
                        onClick={() => removeItem(id)}
                        className="flex-shrink-0 w-7 h-7 flex items-center
                       justify-center rounded-full
                       hover:bg-red-50 hover:text-red-500
                       text-[#999] transition-colors duration-200"
                        aria-label={`${name} ürününü sepetten kaldır`}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* MİKTAR + FİYAT */}
                <div className="flex items-center justify-between mt-3">
                    {/* MİKTAR KONTROL */}
                    <div className="flex items-center gap-0 border border-[#E8E3DC]
                         rounded-sm overflow-hidden">
                        <button
                            onClick={() => updateQuantity(id, quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center
                        hover:bg-[#F5F0EB] transition-colors
                        text-[#666] hover:text-[#1C1C1E]"
                            aria-label="Miktarı azalt"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 h-7 flex items-center justify-center
                           text-[13px] font-medium text-[#1C1C1E]
                           border-x border-[#E8E3DC]">
                            {quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(id, quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center
                        hover:bg-[#F5F0EB] transition-colors
                        text-[#666] hover:text-[#1C1C1E]"
                            aria-label="Miktarı artır"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    {/* FİYAT */}
                    <div className="text-right">
                        <p className="text-[14px] font-bold text-[#1C1C1E]">
                            ₺{formattedPrice}
                        </p>
                        {quantity > 1 && (
                            <p className="text-[11px] text-[#999]">
                                ₺{formattedUnit} / adet
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
