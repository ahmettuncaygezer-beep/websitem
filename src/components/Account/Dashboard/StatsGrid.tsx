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
        <div ref={ref} className="text-2xl font-bold" style={{ color: '#1C1C1E' }}>
            {prefix}{display.toLocaleString('tr-TR')}
        </div>
    );
}

function StatCard({ icon, iconBg, value, label, sub, subColor, href, prefix = '' }: StatCardProps) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.25 }}
                className="p-5 cursor-pointer"
                style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}
            >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg mb-3" style={{ background: iconBg }}>
                    {icon}
                </div>
                <AnimatedNumber value={value} prefix={prefix} />
                <p className="text-[12px] mt-0.5" style={{ color: '#999' }}>{label}</p>
                <p className="text-[11px] mt-1" style={{ color: subColor }}>{sub}</p>
            </motion.div>
        </Link>
    );
}

export function StatsGrid() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatCard
                icon={<Package size={20} color="#C9A96E" />}
                iconBg="#FDF8F0"
                value={24}
                label="Toplam Sipariş"
                sub="3 aktif"
                subColor="#C9A96E"
                href="/hesabim/siparislerim"
            />
            <StatCard
                icon={<TrendingUp size={20} color="#4CAF50" />}
                iconBg="#E8F5E9"
                value={286450}
                label="Toplam Harcama"
                sub="Bu ay: ₺120.050"
                subColor="#4CAF50"
                href="/hesabim"
                prefix="₺"
            />
            <StatCard
                icon={<Heart size={20} color="#E53935" />}
                iconBg="#FFEBEE"
                value={12}
                label="Favorilerim"
                sub="3 ürün indirime girdi!"
                subColor="#E53935"
                href="/hesabim/favorilerim"
            />
            <StatCard
                icon={<Star size={20} color="#C9A96E" />}
                iconBg="#FDF8F0"
                value={8}
                label="Değerlendirmem"
                sub="5 ürün bekleniyor"
                subColor="#C9A96E"
                href="/hesabim/degerlendirmelerim"
            />
        </div>
    );
}
