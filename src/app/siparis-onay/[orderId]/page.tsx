'use client';

import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { ConfettiAnimation } from '@/components/cart/OrderConfirmation/ConfettiAnimation';
import { OrderTimeline } from '@/components/cart/OrderConfirmation/OrderTimeline';
import { OrderDetails } from '@/components/cart/OrderConfirmation/OrderDetails';
import { NextSteps } from '@/components/cart/OrderConfirmation/NextSteps';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="bg-background min-h-screen pt-20 pb-20">
            <ConfettiAnimation />

            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                        className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white mx-auto shadow-xl mb-6 relative"
                    >
                        <Check size={40} strokeWidth={3} />
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 rounded-full border-4 border-green-500"
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-4xl text-foreground"
                        style={{ fontFamily: 'var(--font-playfair, serif)' }}
                    >
                        Siparişiniz Alındı! 🎉
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-[15px] text-muted-foreground mt-4 font-medium"
                    >
                        Sipariş No: <span className="text-selis-gold font-bold font-mono tracking-wider">{params.orderId}</span>
                    </motion.p>
                    <p className="text-[13px] text-muted-foreground mt-2">
                        Onay e-postası kayıtlı adresinize gönderildi.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-card p-8 rounded-2xl shadow-sm border border-border text-center mb-10"
                >
                    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">Tahmini Teslimat Tarihiniz:</p>
                    <h2 className="font-serif text-2xl text-foreground" style={{ fontFamily: 'var(--font-playfair, serif)' }}>Salı, 04 Mart 2026</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-12">
                        <OrderTimeline />
                    </div>
                    <div className="md:col-span-12">
                        <OrderDetails orderId={params.orderId} />
                    </div>
                    <div className="md:col-span-12">
                        <NextSteps />
                    </div>
                </div>
            </div>
        </div>
    );
}
