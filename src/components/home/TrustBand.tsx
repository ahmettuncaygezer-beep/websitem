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
        description: '7/24 kişiye özel danışmanlık',
        titleKey: 'trust_support_title',
        descKey: 'trust_support_desc'
    },
];

export function TrustBand() {
    return (
        <section className="bg-background py-16 md:py-24 border-t border-border/40 transition-colors duration-500">
            <div className="container-premium">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                            }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-14 h-14 rounded-full bg-accent/30 flex items-center justify-center mb-5 shadow-sm border border-gold/10 group-hover:border-gold/30 transition-all duration-300">
                                <feature.icon size={22} className="text-selis-gold" />
                            </div>
                            <h4 className="font-serif text-base md:text-lg mb-2 text-foreground" data-lang-key={feature.titleKey}>{feature.title}</h4>
                            <p className="text-xs md:text-sm font-sans text-muted-foreground/80" data-lang-key={feature.descKey}>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
