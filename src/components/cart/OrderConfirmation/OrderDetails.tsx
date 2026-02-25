'use client';

import { MapPin, CreditCard } from 'lucide-react';

export function OrderDetails({ orderId }: { orderId: string }) {
    return (
        <div className="bg-white p-8 rounded-2xl border border-[#E8E3DC] shadow-sm">
            <h3 className="text-[14px] font-bold text-[#1C1C1E] uppercase tracking-wider mb-8">Sipariş Detayları</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <div className="flex items-center gap-2 mb-4 text-[#C9A96E]">
                        <MapPin size={16} />
                        <h4 className="text-[12px] font-bold uppercase tracking-wider">Teslimat Adresi</h4>
                    </div>
                    <div className="text-[13px] text-[#666] leading-relaxed">
                        <p className="font-bold text-[#1C1C1E] mb-1">Ali Kaya</p>
                        <p>Moda Cad. No:42 D:5</p>
                        <p>Kadıköy, İstanbul</p>
                        <p className="mt-2">0532 XXX XX XX</p>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-4 text-[#C9A96E]">
                        <CreditCard size={16} />
                        <h4 className="text-[12px] font-bold uppercase tracking-wider">Ödeme Bilgisi</h4>
                    </div>
                    <div className="text-[13px] text-[#666] leading-relaxed">
                        <p className="font-bold text-[#1C1C1E] mb-1">Banka/Kredi Kartı</p>
                        <p>Ziraat Bankası •••• 4242</p>
                        <p>12 Taksit Seçeneği</p>
                        <p className="mt-1 font-bold text-[#1C1C1E]">Toplam: ₺109.031</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[#F0EDE8]">
                <h4 className="text-[12px] font-bold text-[#999] uppercase tracking-[0.15em] mb-6">Satın Alınan Ürünler</h4>
                <div className="space-y-4">
                    {/* Mock items since cart is cleared */}
                    {[1].map((_, i) => (
                        <div key={i} className="flex gap-4 group">
                            <div className="w-16 h-16 bg-[#F5F0EB] rounded border border-black/5" />
                            <div className="flex-1">
                                <p className="text-[13px] font-bold text-[#1C1C1E]">Luna Köşe Koltuk Takımı</p>
                                <p className="text-[11px] text-[#999] mt-0.5">Bulut Beyazı | Adet: 1</p>
                                <p className="text-[12px] font-medium text-[#1C1C1E] mt-1">₺74.990</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
