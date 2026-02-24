'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: 'Ücretsiz Kargo',
        description: '₺5.000 üzeri siparişlerde',
    },
    {
        icon: ShieldCheck,
        title: '5 Yıl Garanti',
        description: 'Tüm mobilya ürünlerinde',
    },
    {
        icon: RotateCcw,
        title: '30 Gün İade',
        description: 'Koşulsuz iade garantisi',
    },
    {
        icon: Headphones,
        title: 'VIP Destek',
        description: '7/24 kişisel danışmanlık',
    },
];

export function TrustBand() {
    return (
        <section className="bg-sand-dark py-16">
            <div className="container-premium">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                            }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                                <feature.icon size={20} className="text-gold" />
                            </div>
                            <h4 className="font-serif text-base mb-1">{feature.title}</h4>
                            <p className="text-xs font-sans text-warm-gray">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
