'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export default function EmptyCart({ onClose }: { onClose: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center
                   h-full px-8 text-center gap-5 py-20">
            <div className="w-20 h-20 rounded-full bg-[#F5F0EB]
                     flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-[#C9A96E]" />
            </div>
            <div>
                <p className="text-[16px] font-semibold text-[#1C1C1E] mb-2">
                    Sepetiniz boş
                </p>
                <p className="text-[13px] text-[#666] leading-relaxed">
                    Beğendiğiniz ürünleri sepetinize ekleyin,
                    burada görüntüleyin.
                </p>
            </div>
            <Link
                href="/kategori/oturma-odasi"
                onClick={onClose}
                className="mt-2 px-8 py-3 bg-[#1C1C1E] text-white
                  text-[13px] font-semibold tracking-wide
                  hover:bg-[#C9A96E] transition-colors duration-300
                  rounded-sm"
            >
                Ürünleri Keşfet
            </Link>
        </div>
    )
}
