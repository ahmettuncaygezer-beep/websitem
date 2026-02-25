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
        <div className="bg-white p-8 rounded-2xl border border-[#E8E3DC] shadow-sm">
            <h3 className="text-[14px] font-bold text-[#1C1C1E] uppercase tracking-wider mb-8">Sipariş Süreci</h3>

            <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-[#F0EDE8]" />

                {STEPS.map((step, index) => {
                    const isCompleted = step.status === 'completed';
                    const isActive = step.status === 'active';

                    return (
                        <div key={step.id} className="relative flex items-start gap-6 group">
                            <div className={`
                z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
                ${isCompleted ? 'bg-[#C9A96E] text-white shadow-lg' : isActive ? 'bg-[#1C1C1E] text-white scale-110 shadow-xl' : 'bg-white border-2 border-[#F0EDE8] text-[#E0E0E0]'}
              `}>
                                <step.icon size={16} />
                                {isActive && (
                                    <motion.div
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute inset-0 rounded-full border-2 border-[#1C1C1E]"
                                    />
                                )}
                            </div>

                            <div>
                                <p className={`text-[14px] font-bold ${isActive ? 'text-[#1C1C1E]' : isCompleted ? 'text-[#1C1C1E]' : 'text-[#999]'}`}>
                                    {step.title}
                                </p>
                                <p className="text-[12px] text-[#999] mt-0.5">{step.date}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
