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
            <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                <h2 className="font-serif text-2xl text-foreground mb-6" style={{ fontFamily: 'var(--font-playfair, serif)' }}>Ödeme Yöntemi</h2>

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
                                className="p-6 bg-muted border border-border rounded-lg space-y-4"
                            >
                                <h3 className="text-[14px] font-bold text-foreground uppercase tracking-wider">Banka Hesap Bilgilerimiz</h3>
                                <div className="space-y-3">
                                    <div className="p-4 bg-background border border-border rounded-md flex justify-between items-center group">
                                        <div>
                                            <p className="text-[12px] font-bold text-foreground">SELIS MOBİLYA A.Ş. - Ziraat Bankası</p>
                                            <p className="text-[14px] font-mono mt-1 text-foreground">TR42 0001 0000 0000 1234 5678 90</p>
                                        </div>
                                        <button className="text-[11px] font-bold text-selis-gold uppercase tracking-wider hover:underline opacity-0 group-hover:opacity-100 transition-all bg-transparent border-none cursor-pointer">
                                            KOPYALA
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md text-[12px] text-yellow-800 dark:text-yellow-200">
                                    ⚠️ Lütfen açıklama kısmına <strong>SLS-2026-PREVIEW</strong> sipariş kodunuzu yazmayı unutmayın.
                                </div>
                            </motion.div>
                        )}

                        {method === 'cod' && (
                            <motion.div
                                key="cod-info"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-6 bg-muted/30 border border-border rounded-lg text-center"
                            >
                                <p className="text-[14px] text-selis-gold font-medium">
                                    Kapıda ödeme seçeneğinde +₺49 hizmet bedeli uygulanır.
                                </p>
                                <p className="text-[12px] text-muted-foreground mt-2">
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
                    className="px-10 py-4 border-2 border-foreground text-foreground text-[13px] font-bold uppercase tracking-[0.1em] rounded-[4px] hover:bg-foreground hover:text-background transition-all bg-transparent cursor-pointer"
                >
                    ← GERİ
                </button>
                <button
                    onClick={onNext}
                    className="flex-1 py-4 bg-foreground text-background text-[13px] font-bold uppercase tracking-[0.1em] rounded-[4px] hover:opacity-90 transition-all transform active:scale-[0.98] border-none cursor-pointer"
                >
                    DEVAM ET →
                </button>
            </div>
        </div>
    );
}
