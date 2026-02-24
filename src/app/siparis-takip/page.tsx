'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SITE_NAME } from '@/lib/constants';

type OrderStatus = 'Hazırlanıyor' | 'Kargoya Verildi' | 'Teslim Edildi';

interface OrderData {
    order_number: string;
    status: OrderStatus;
    updated_at: string;
}

const statusSteps = [
    { label: 'Hazırlanıyor', icon: Package },
    { label: 'Kargoya Verildi', icon: Truck },
    { label: 'Teslim Edildi', icon: CheckCircle },
];

export default function OrderTrackingPage() {
    const [orderNumber, setOrderNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<OrderData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderNumber.trim()) return;

        setLoading(true);
        setError(null);
        setOrder(null);

        try {
            const { data, error: supabaseError } = await supabase
                .from('orders')
                .select('order_number, status, updated_at')
                .eq('order_number', orderNumber.trim())
                .single();

            if (supabaseError) {
                // Fallback to mock data for demonstration if DB is empty/missing
                if (orderNumber === 'TEST-123') {
                    setOrder({ order_number: 'TEST-123', status: 'Kargoya Verildi', updated_at: new Date().toISOString() });
                    return;
                }
                throw new Error('Sipariş bulunamadı. Lütfen kontrol edip tekrar deneyin.');
            }

            setOrder(data as OrderData);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const currentStepIndex = order ? statusSteps.findIndex(s => s.label === order.status) : -1;

    return (
        <div className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 overflow-hidden">
            {/* Premium Background Image with Blur */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-20 w-full max-w-xl"
            >
                <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20">
                    <div className="p-10 md:p-14 text-center">
                        {/* Brand Logo & Header */}
                        <div className="mb-10">
                            <h2 className="text-charcoal font-serif text-3xl md:text-4xl tracking-[0.2em] mb-4 uppercase">
                                {SITE_NAME}
                            </h2>
                            <h3 className="text-warm-gray font-serif text-xl tracking-widest uppercase">
                                SİPARİŞ TAKİP
                            </h3>
                        </div>

                        <p className="text-warm-gray text-sm font-sans mb-8 leading-relaxed max-w-sm mx-auto">
                            Siparişinizin durumunu öğrenmek için lütfen sipariş numaranızı aşağıdaki alana girin.
                        </p>

                        {/* Tracking Input */}
                        <form onSubmit={handleTrack} className="relative mb-10 max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Örn: ORD-789234"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                                className="w-full pl-6 pr-16 py-5 bg-sand/50 rounded-2xl border-none focus:ring-2 focus:ring-sage/20 text-charcoal font-sans font-medium tracking-wider placeholder:text-warm-gray/50"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-charcoal text-white rounded-xl flex items-center justify-center hover:bg-black transition-all hover:shadow-lg disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <ArrowRight size={20} />
                                )}
                            </button>
                        </form>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center justify-center gap-2 text-red-500 text-xs bg-red-50 p-4 rounded-2xl border border-red-100"
                                >
                                    <AlertCircle size={14} />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            {order && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-10 text-left pt-6"
                                >
                                    <div className="flex justify-between items-end pb-4 border-b border-border">
                                        <div>
                                            <p className="text-[10px] text-warm-gray uppercase tracking-widest font-bold mb-1">Durum</p>
                                            <p className="text-xl font-serif text-charcoal">{order.status}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-warm-gray uppercase tracking-widest font-bold mb-1">No</p>
                                            <p className="text-sm font-sans font-bold text-charcoal">{order.order_number}</p>
                                        </div>
                                    </div>

                                    {/* Animated Vertical/Horizontal Timeline */}
                                    <div className="flex flex-col md:flex-row justify-between items-center relative py-4">
                                        {/* Background Line */}
                                        <div className="absolute left-1/2 md:left-0 md:top-1/2 h-[80%] md:h-0.5 w-0.5 md:w-full bg-border -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2" />

                                        {/* Progress Line */}
                                        <motion.div
                                            initial={{ height: 0, width: 0 }}
                                            animate={{
                                                height: typeof window !== 'undefined' && window.innerWidth < 768 ? `${(currentStepIndex / 2) * 100}%` : '2px',
                                                width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${(currentStepIndex / 2) * 100}%` : '2px'
                                            }}
                                            className="absolute left-1/2 md:left-0 md:top-1/2 bg-sage -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2"
                                            transition={{ duration: 1, ease: 'easeInOut' }}
                                        />

                                        {statusSteps.map((step, idx) => {
                                            const Icon = step.icon;
                                            const isCompleted = idx <= currentStepIndex;
                                            const isActive = idx === currentStepIndex;

                                            return (
                                                <div key={idx} className="relative z-10 flex flex-col items-center gap-3 bg-transparent py-4 md:py-0">
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: idx * 0.2 }}
                                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${isCompleted ? 'bg-sage text-white' : 'bg-white border-2 border-border text-warm-gray'
                                                            } ${isActive ? 'scale-110 shadow-lg' : ''}`}
                                                    >
                                                        <Icon size={20} />
                                                    </motion.div>
                                                    <span className={`text-[10px] font-sans font-bold uppercase tracking-widest text-center max-w-[80px] ${isCompleted ? 'text-charcoal' : 'text-warm-gray'
                                                        }`}>
                                                        {step.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
