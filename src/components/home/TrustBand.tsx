'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: 'Ücretsiz Kargo',
        description: '₺5.000 üzeri siparişlerde',
        titleKey: 'trust_shipping_title',
        descKey: 'trust_shipping_desc'
    },
    {
        icon: ShieldCheck,
        title: '5 Yıl Garanti',
        description: 'Tüm mobilya ürünlerinde',
        titleKey: 'trust_warranty_title',
        descKey: 'trust_warranty_desc'
    },
    {
        icon: RotateCcw,
        title: '30 Gün İade',
        description: 'Koşulsuz iade garantisi',
        titleKey: 'trust_return_title',
        descKey: 'trust_return_desc'
    },
    {
        icon: Headphones,
        title: 'VIP Destek',
        description: '7/24 kişisel danışmanlık',
        titleKey: 'trust_support_title',
        descKey: 'trust_support_desc'
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
                            <h4 className="font-serif text-base mb-1" data-lang-key={feature.titleKey}>{feature.title}</h4>
                            <p className="text-xs font-sans text-warm-gray" data-lang-key={feature.descKey}>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
