'use client';

import { Check, Package, Truck, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
    { id: 'received', title: 'Sipariş Alındı', date: 'Bugün, 14:32', icon: Check, status: 'completed' },
    { id: 'preparing', title: 'Hazırlanıyor', date: '1-2 iş günü içinde', icon: Package, status: 'active' },
    { id: 'shipped', title: 'Kargoya Verildi', date: 'Tahmini: 28 Şubat', icon: Truck, status: 'pending' },
    { id: 'delivered', title: 'Teslim Edildi', date: 'Tahmini: 04 Mart', icon: Home, status: 'pending' },
];

export function OrderTimeline() {
    return (
        <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-[14px] font-bold text-foreground uppercase tracking-wider mb-8">Sipariş Süreci</h3>

            <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />

                {STEPS.map((step, index) => {
                    const isCompleted = step.status === 'completed';
                    const isActive = step.status === 'active';

                    return (
                        <div key={step.id} className="relative flex items-start gap-6 group">
                            <div className={`
                z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
                ${isCompleted ? 'bg-selis-gold text-white shadow-lg' : isActive ? 'bg-foreground text-background scale-110 shadow-xl' : 'bg-background border-2 border-border text-muted-foreground/30'}
              `}>
                                <step.icon size={16} />
                                {isActive && (
                                    <motion.div
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute inset-0 rounded-full border-2 border-foreground"
                                    />
                                )}
                            </div>

                            <div>
                                <p className={`text-[14px] font-bold ${isActive ? 'text-foreground' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {step.title}
                                </p>
                                <p className="text-[12px] text-muted-foreground mt-0.5">{step.date}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
