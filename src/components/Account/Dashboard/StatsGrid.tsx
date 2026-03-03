'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, Heart, Star } from 'lucide-react';
import Link from 'next/link';

interface StatCardProps {
    icon: React.ReactNode;
    iconBg: string;
    value: number;
    label: string;
    sub: string;
    subColor: string;
    href: string;
    prefix?: string;
}

function AnimatedNumber({ value, prefix = '' }: { value: number; prefix?: string }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const dur = 1500;
                const start = performance.now();
                const animate = (now: number) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / dur, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setDisplay(Math.round(value * eased));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.3 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [value]);

    return (
        <div ref={ref} className="text-2xl font-bold text-foreground">
            {prefix}{display.toLocaleString('tr-TR')}
        </div>
    );
}

function StatCard({ icon, iconBg, value, label, sub, subColor, href, prefix = '' }: StatCardProps) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25 }}
                className="p-5 cursor-pointer bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${iconBg}`}>
                    {icon}
                </div>
                <AnimatedNumber value={value} prefix={prefix} />
                <p className="text-[12px] mt-0.5 text-muted-foreground">{label}</p>
                <p className={`text-[11px] mt-1 ${subColor}`}>{sub}</p>
            </motion.div>
        </Link>
    );
}

export function StatsGrid() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatCard
                icon={<Package size={20} className="text-selis-gold" />}
                iconBg="bg-selis-gold/10"
                value={24}
                label="Toplam Sipariş"
                sub="3 aktif"
                subColor="text-selis-gold"
                href="/hesabim/siparislerim"
            />
            <StatCard
                icon={<TrendingUp size={20} className="text-green-500" />}
                iconBg="bg-green-500/10"
                value={286450}
                label="Toplam Harcama"
                sub="Bu ay: ₺120.050"
                subColor="text-green-500"
                href="/hesabim"
                prefix="₺"
            />
            <StatCard
                icon={<Heart size={20} className="text-red-500" />}
                iconBg="bg-red-500/10"
                value={12}
                label="Favorilerim"
                sub="3 ürün indirime girdi!"
                subColor="text-red-500"
                href="/hesabim/favorilerim"
            />
            <StatCard
                icon={<Star size={20} className="text-selis-gold" />}
                iconBg="bg-selis-gold/10"
                value={8}
                label="Değerlendirmem"
                sub="5 ürün bekleniyor"
                subColor="text-selis-gold"
                href="/hesabim/degerlendirmelerim"
            />
        </div>
    );
}
