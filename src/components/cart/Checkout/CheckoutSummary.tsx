'use client';

import Image from 'next/image';
import { ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const FREE_SHIPPING_THRESHOLD = 5000;

export function CheckoutSummary() {
    const { items, totalPrice } = useCart();

    const shippingCost = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : 199;
    const total = totalPrice + shippingCost;

    return (
        <div className="bg-white border border-[#E8E3DC] rounded-lg overflow-hidden shadow-sm">
            <div className="bg-[#FDF8F0] px-5 py-4 border-b border-[#F0EDE8]">
                <h3 className="text-[14px] font-bold text-[#1C1C1E] uppercase tracking-wider">Sipariş Özeti</h3>
                <p className="text-[11px] text-[#999] mt-0.5">{items.length} Farklı Ürün</p>
            </div>

            <div className="max-h-[300px] overflow-y-auto px-5 divide-y divide-[#F5F0EB]">
                {items.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4">
                        <div className="relative w-16 h-16 bg-[#F5F0EB] rounded border border-black/5 flex-shrink-0 overflow-hidden">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] font-medium text-[#1C1C1E] leading-tight line-clamp-2">{item.name}</h4>
                            <p className="text-[11px] text-[#999] mt-1">
                                {item.selectedColor && `${item.selectedColor} | `}Adet: {item.quantity}
                            </p>
                            <p className="text-[13px] font-bold text-[#1C1C1E] mt-1">
                                ₺{(item.price * item.quantity).toLocaleString('tr-TR')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-5 border-t border-[#E8E3DC] bg-white space-y-2">
                <div className="flex justify-between text-[13px]">
                    <span className="text-[#999]">Ara Toplam</span>
                    <span className="font-medium text-[#1C1C1E]">₺{totalPrice.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                    <span className="text-[#999]">Kargo</span>
                    <span className={`font-medium ${shippingCost === 0 ? 'text-[#4CAF50]' : 'text-[#1C1C1E]'}`}>
                        {shippingCost === 0 ? 'Ücretsiz' : `₺${shippingCost.toLocaleString('tr-TR')}`}
                    </span>
                </div>
                <div className="pt-3 border-t border-dashed border-[#F0EDE8] mt-2 flex justify-between items-end">
                    <span className="text-[14px] font-bold text-[#1C1C1E]">TOPLAM</span>
                    <span className="text-xl font-bold text-[#C9A96E]">₺{total.toLocaleString('tr-TR')}</span>
                </div>
            </div>

            {/* Trust Grid */}
            <div className="p-5 border-t border-dashed border-[#F0EDE8] grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#C9A96E]" />
                    <span className="text-[10px] text-[#666] font-medium">SSL Güvenli Ödeme</span>
                </div>
                <div className="flex items-center gap-2">
                    <RefreshCw size={14} className="text-[#C9A96E]" />
                    <span className="text-[10px] text-[#666] font-medium">30 Gün İade</span>
                </div>
                <div className="flex items-center gap-2">
                    <Truck size={14} className="text-[#C9A96E]" />
                    <span className="text-[10px] text-[#666] font-medium">Sigortalı Gönderim</span>
                </div>
                <div className="flex items-center gap-2">
                    <Star size={14} className="text-[#C9A96E]" />
                    <span className="text-[10px] text-[#666] font-medium">5 Yıl Garanti</span>
                </div>
            </div>
        </div>
    );
}
