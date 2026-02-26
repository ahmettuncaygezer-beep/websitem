'use client';

import React from 'react';
import { usePlannerStore } from './plannerStore';
import { ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/constants';

export default function PlannerBottomBar() {
    const items = usePlannerStore(s => s.items);
    const room = usePlannerStore(s => s.room);

    const totalPrice = items.reduce((sum, item) => sum + (item.product?.price || 0), 0);
    const totalItems = items.length;

    // Room Area
    const area = ((room.width / 100) * (room.depth / 100)).toFixed(1);

    return (
        <footer className="h-[64px] bg-white border-t border-[#E8E3DC] px-6 flex items-center justify-between flex-shrink-0 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
            {/* LEFT: SUMMARY */}
            <div className="flex flex-col justify-center">
                <span className="text-[13px] text-[#666]">
                    <strong className="text-[#1C1C1E] font-medium">{totalItems} ürün</strong> odada yer alıyor
                </span>
                <span className="text-[15px] font-bold text-[#C9A96E]">
                    Toplam: {formatPrice(totalPrice)}
                </span>
            </div>

            {/* CENTER: ROOM DIMENSIONS */}
            <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 text-[13px] text-[#666] bg-[#F5F0EB] px-4 py-1.5 rounded-full border border-[#E8E3DC]">
                    <span>{room.width / 100}m &times; {room.depth / 100}m</span>
                    <div className="w-1 h-1 bg-[#CCC] rounded-full" />
                    <span className="font-semibold text-[#1C1C1E]">{area} m&sup2;</span>
                </div>
            </div>

            {/* RIGHT: ADD TO CART */}
            <div>
                <button
                    disabled={totalItems === 0}
                    className={`flex items-center gap-2 px-6 py-2.5 text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 rounded-sm
                        ${totalItems > 0
                            ? 'bg-[#C9A96E] text-white hover:bg-[#B8915A] shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                            : 'bg-[#F5F0EB] text-[#CCC] cursor-not-allowed'
                        }
                    `}
                >
                    <ShoppingBag size={16} />
                    Hepsini Sepete Ekle
                </button>
            </div>
        </footer>
    );
}
