'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

import { useGlobal } from '@/context/GlobalContext'

export default function CartItem({ item }: { item: any }) {
    const { removeItem, updateQuantity } = useCart()
    const { formatPrice } = useGlobal()

    // Support both {product, quantity} (Context) and flat properties (Store)
    const productData = item.product || item;
    const { id, name, price, image } = productData;
    const quantity = item.quantity || 1;

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
                     overflow-hidden bg-muted">
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
                        <p className="text-[11px] text-muted-foreground/80 uppercase tracking-wider
                         mb-0.5">
                            SELIS
                        </p>
                        <p className="text-[13px] font-medium text-foreground
                         leading-snug truncate max-w-[160px]">
                            {name}
                        </p>
                    </div>

                    {/* SİL BUTONU */}
                    <button
                        onClick={() => removeItem(id)}
                        className="flex-shrink-0 w-7 h-7 flex items-center
                       justify-center rounded-full
                        hover:bg-red-500/10 hover:text-red-500
                        text-muted-foreground/80 transition-colors duration-200"
                        aria-label={`${name} ürününü sepetten kaldır`}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* MİKTAR + FİYAT */}
                <div className="flex items-center justify-between mt-3">
                    {/* MİKTAR KONTROL */}
                    <div className="flex items-center gap-0 border border-border
                         rounded-sm overflow-hidden">
                        <button
                            onClick={() => updateQuantity(id, quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center
                        hover:bg-accent transition-colors
                        text-muted-foreground hover:text-foreground"
                            aria-label="Miktarı azalt"
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 h-7 flex items-center justify-center
                           text-[13px] font-medium text-foreground
                           border-x border-border">
                            {quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(id, quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center
                        hover:bg-accent transition-colors
                        text-muted-foreground hover:text-foreground"
                            aria-label="Miktarı artır"
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>

                    {/* FİYAT */}
                    <div className="text-right">
                        <p className="text-[14px] font-bold text-foreground">
                            {formatPrice((price || 0) * quantity)}
                        </p>
                        {quantity > 1 && (
                            <p className="text-[11px] text-muted-foreground/80">
                                {formatPrice(price)} / <span data-lang-key="cart_per_item">adet</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
