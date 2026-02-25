'use client';

import { useState } from 'react';
import { PaymentMethods } from './PaymentMethods';
import { CreditCardForm } from './CreditCardForm';
import { CardPreview } from './CardPreview';
import { InstallmentSelector } from './InstallmentSelector';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    onNext: () => void;
    onPrev: () => void;
}

export function Step2_Payment({ onNext, onPrev }: Props) {
    const [method, setMethod] = useState<'card' | 'bank' | 'cod'>('card');
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: '',
        focused: '',
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white p-8 rounded-xl border border-[#E8E3DC] shadow-sm">
                <h2 className="font-serif text-2xl text-[#1C1C1E] mb-6">Ödeme Yöntemi</h2>

                <PaymentMethods activeMethod={method} onSelect={setMethod} />

                <div className="mt-10">
                    <AnimatePresence mode="wait">
                        {method === 'card' && (
                            <motion.div
                                key="card-form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-10"
                            >
                                <div className="flex flex-col items-center">
                                    <CardPreview data={cardData} />
                                </div>

                                <CreditCardForm
                                    data={cardData}
                                    onChange={(newData) => setCardData({ ...cardData, ...newData })}
                                />

                                <InstallmentSelector />
                            </motion.div>
                        )}

                        {method === 'bank' && (
                            <motion.div
                                key="bank-info"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-6 bg-[#F9F9F9] rounded-lg border border-[#E0E0E0] space-y-4"
                            >
                                <h3 className="text-[14px] font-bold text-[#1C1C1E] uppercase tracking-wider">Banka Hesap Bilgilerimiz</h3>
                                <div className="space-y-3">
                                    <div className="p-4 bg-white border border-[#F0EDE8] rounded-md flex justify-between items-center group">
                                        <div>
                                            <p className="text-[12px] font-bold text-[#1C1C1E]">MAISON MOBİLYA A.Ş. - Ziraat Bankası</p>
                                            <p className="text-[14px] font-mono mt-1">TR42 0001 0000 0000 1234 5678 90</p>
                                        </div>
                                        <button className="text-[11px] font-bold text-[#C9A96E] uppercase tracking-wider hover:underline opacity-0 group-hover:opacity-100 transition-all">
                                            KOPYALA
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 bg-[#FFF9C4] border border-[#FBC02D] rounded-md text-[12px] text-[#7B5E00]">
                                    ⚠️ Lütfen açıklama kısmına <strong>MSN-2026-PREVIEW</strong> sipariş kodunuzu yazmayı unutmayın.
                                </div>
                            </motion.div>
                        )}

                        {method === 'cod' && (
                            <motion.div
                                key="cod-info"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-6 bg-[#FDF8F0] border border-[#FFE0B2] rounded-lg text-center"
                            >
                                <p className="text-[14px] text-[#E65100] font-medium">
                                    Kapıda ödeme seçeneğinde +₺49 hizmet bedeli uygulanır.
                                </p>
                                <p className="text-[12px] text-[#999] mt-2">
                                    Teslimat sırasında nakit veya kredi kartı ile ödeme yapabilirsiniz.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onPrev}
                    className="px-10 py-4 border-2 border-[#1C1C1E] text-[#1C1C1E] text-[13px] font-bold uppercase tracking-[0.1em] rounded-[4px] hover:bg-[#1C1C1E] hover:text-white transition-all"
                >
                    ← GERİ
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 py-4 bg-[#1C1C1E] text-white text-[13px] font-bold uppercase tracking-[0.1em] rounded-[4px] hover:bg-[#2C2C2E] transition-all transform active:scale-[0.98]"
                >
                    DEVAM ET →
                </button>
            </div>
        </div>
    );
}
