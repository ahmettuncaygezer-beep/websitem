'use client';

import { motion } from 'framer-motion';
import { Check, Hammer, Scissors, Search, Sparkles, Truck } from 'lucide-react';

interface TrackingStep {
    id: number;
    title: string;
    description: string;
    icon: any;
    status: 'completed' | 'current' | 'upcoming';
    date?: string;
}

const steps: TrackingStep[] = [
    {
        id: 1,
        title: 'Sipariş Alındı',
        description: 'Tasarım ekibimiz siparişinizi onayladı ve üretim planına dahil etti.',
        icon: Search,
        status: 'completed',
        date: '18 Şubat 2026'
    },
    {
        id: 2,
        title: 'Ahşap İşleniyor',
        description: 'Birinci sınıf masif ahşap parçalar usta ellerde hayat buluyor.',
        icon: Hammer,
        status: 'completed',
        date: '20 Şubat 2026'
    },
    {
        id: 3,
        title: 'Döşeme & Finishing',
        description: 'Seçtiğiniz lüks kumaşlar özenle kaplanıyor ve son dokunuşlar yapılıyor.',
        icon: Scissors,
        status: 'current',
    },
    {
        id: 4,
        title: 'Kalite Kontrol',
        description: 'Ürününüz 24 noktalı premium kalite standartlarımızdan geçiyor.',
        icon: Check,
        status: 'upcoming',
    },
    {
        id: 5,
        title: 'Sana Geliyor',
        description: 'Beyaz eldiven ekiplerimiz ürününüzü özenle paketledi.',
        icon: Truck,
        status: 'upcoming',
    }
];

export function OrderTracking() {
    return (
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-sand">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                <div>
                    <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-gold mb-2 block">
                        Sipariş Takibi #ORD-2026-8854
                    </span>
                    <h2 className="text-3xl font-serif text-charcoal">Zanaat Yolculuğu</h2>
                </div>
                <div className="px-4 py-2 bg-sage/10 rounded-full flex items-center gap-2">
                    <Sparkles size={16} className="text-sage" />
                    <span className="text-xs font-sans font-semibold text-sage">Üretim Aşamasında</span>
                </div>
            </div>

            <div className="relative">
                {/* Connection Line */}
                <div className="absolute left-[21px] top-0 bottom-0 w-0.5 bg-sand hidden md:block" />

                <div className="space-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-6 relative"
                        >
                            {/* Icon Container */}
                            <div className={`z-10 w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-sm border-4 border-white transition-colors duration-500 ${step.status === 'completed' ? 'bg-sage text-white' :
                                    step.status === 'current' ? 'bg-gold text-white animate-pulse' :
                                        'bg-sand text-warm-gray-light'
                                }`}>
                                <step.icon size={18} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 gap-2">
                                    <h3 className={`font-serif text-lg ${step.status === 'upcoming' ? 'text-warm-gray-light' : 'text-charcoal'
                                        }`}>
                                        {step.title}
                                    </h3>
                                    {step.date && (
                                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-warm-gray-light">
                                            {step.date}
                                        </span>
                                    )}
                                </div>
                                <p className={`text-sm font-sans max-w-lg leading-relaxed ${step.status === 'upcoming' ? 'text-warm-gray-light/60' : 'text-warm-gray'
                                    }`}>
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
