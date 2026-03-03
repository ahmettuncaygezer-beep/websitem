'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight, Share2, Star } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';

export default function OrderSuccessPage() {
    const { clearCart } = useCart();
    const [orderId, setOrderId] = useState('');

    // Dynamically compute estimated delivery date range (10-16 days from now)
    const deliveryRange = (() => {
        const fmt = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
        const from = new Date();
        from.setDate(from.getDate() + 10);
        const to = new Date();
        to.setDate(to.getDate() + 16);
        return `${fmt.format(from).replace(' ', ' ')} - ${fmt.format(to)}`;
    })();

    useEffect(() => {
        if (clearCart && typeof clearCart === 'function') {
            clearCart();
        }
        setOrderId(`SLS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-20 bg-[#FBFBFA]">
            <div className="container-premium max-w-2xl text-center">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    className="w-24 h-24 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <CheckCircle2 size={48} strokeWidth={1.5} />
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-display-md font-serif text-charcoal mb-4">Mükemmel Bir Seçim.</h1>
                    <p className="text-lg text-warm-gray mb-12 font-sans font-light tracking-wide">
                        Siparişiniz alındı ve atölyemize iletildi. <br />
                        Sizin için hazırlamaya başlıyoruz.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-8 rounded-3xl shadow-xl border border-border mb-12"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-left">
                            <span className="text-[10px] font-sans font-bold text-warm-gray uppercase tracking-widest">Sipariş Numarası</span>
                            <div className="text-xl font-sans font-bold text-charcoal">{orderId}</div>
                        </div>
                        <div className="h-px md:h-12 w-full md:w-px bg-border" />
                        <div className="text-left">
                            <span className="text-[10px] font-sans font-bold text-warm-gray uppercase tracking-widest">Tahmini Teslimat</span>
                            <div className="text-xl font-sans font-bold text-charcoal">{deliveryRange}</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/siparis-takip"
                        className="flex items-center justify-center gap-2 bg-charcoal text-white px-8 py-4 rounded-2xl font-sans font-bold uppercase tracking-widest text-xs hover:bg-black transition-all group"
                    >
                        Siparişimi Takip Et
                        <Package size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 bg-white border border-border text-charcoal px-8 py-4 rounded-2xl font-sans font-bold uppercase tracking-widest text-xs hover:bg-sand transition-all"
                    >
                        Alışverişe Devam Et
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 pt-8 border-t border-border/50"
                >
                    <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
                        <Share2 size={24} />
                        <Star size={24} />
                        <div className="font-serif italic text-lg tracking-widest">SELIS Excellence</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
