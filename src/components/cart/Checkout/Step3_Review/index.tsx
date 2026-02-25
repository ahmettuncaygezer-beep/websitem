'use client';

import { MapPin, CreditCard, ChevronRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { TermsCheckbox } from './TermsCheckbox';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Props {
    onPrev: () => void;
}

export function Step3_Review({ onPrev }: Props) {
    const { totalPrice, clearCart } = useCart();
    const [agreed, setAgreed] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    const handlePlaceOrder = async () => {
        if (!agreed) return;

        setIsProcessing(true);
        // Simulate order processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const orderId = `MSN-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        router.push(`/siparis-onay/${orderId}`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-8 rounded-xl border border-[#E8E3DC] shadow-sm space-y-8">
                <h2 className="font-serif text-2xl text-[#1C1C1E]">Sipariş Onayı</h2>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Delivery Box */}
                    <div className="p-5 border border-[#F0EDE8] rounded-lg relative group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-[#F5F0EB] rounded-full flex items-center justify-center text-[#C9A96E]">
                                <MapPin size={18} />
                            </div>
                            <h3 className="text-[14px] font-bold text-[#1C1C1E] uppercase tracking-wider">Teslimat Adresi</h3>
                        </div>
                        <p className="text-[13px] font-bold text-[#1C1C1E]">Ali Kaya</p>
                        <p className="text-[12px] text-[#666] mt-1 leading-relaxed">
                            Moda Cad. No:42 D:5 <br /> Kadıköy, İstanbul
                        </p>
                        <button
                            onClick={onPrev}
                            className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#C9A96E] hover:underline uppercase tracking-wider"
                        >
                            DEĞİŞTİR <ChevronRight size={12} />
                        </button>
                    </div>

                    {/* Payment Box */}
                    <div className="p-5 border border-[#F0EDE8] rounded-lg relative group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-[#F5F0EB] rounded-full flex items-center justify-center text-[#C9A96E]">
                                <CreditCard size={18} />
                            </div>
                            <h3 className="text-[14px] font-bold text-[#1C1C1E] uppercase tracking-wider">Ödeme Yöntemi</h3>
                        </div>
                        <p className="text-[13px] font-bold text-[#1C1C1E]">Banka/Kredi Kartı</p>
                        <p className="text-[12px] text-[#666] mt-1 leading-relaxed">
                            Ziraat Bankası •••• 4242 <br /> 12 Taksit Seçeneği
                        </p>
                        <button
                            onClick={onPrev}
                            className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#C9A96E] hover:underline uppercase tracking-wider"
                        >
                            DEĞİŞTİR <ChevronRight size={12} />
                        </button>
                    </div>
                </div>

                <TermsCheckbox checked={agreed} onChange={setAgreed} />

                <button
                    onClick={handlePlaceOrder}
                    disabled={!agreed || isProcessing}
                    className={`
            w-full py-5 rounded-[4px] text-[15px] font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden
            ${agreed && !isProcessing ? 'bg-gradient-to-r from-[#C9A96E] to-[#B8915A] text-[#1C1C1E] shadow-lg hover:shadow-[#C9A96E]/20 hover:-translate-y-0.5' : 'bg-[#E8E3DC] text-[#999] cursor-not-allowed'}
          `}
                >
                    {isProcessing ? (
                        <span className="flex items-center justify-center gap-3">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-[#1C1C1E]/20 border-t-[#1C1C1E] rounded-full"
                            />
                            İŞLENİYOR...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <ShieldCheck size={18} /> SİPARİŞİ TAMAMLA — ₺{totalPrice.toLocaleString('tr-TR')}
                        </span>
                    )}
                </button>

                <p className="text-center text-[11px] text-[#999]">
                    Siparişi tamamlayarak MAISON Satış Sözleşmesi'ni kabul etmiş olursunuz.
                </p>
            </div>
        </div>
    );
}
