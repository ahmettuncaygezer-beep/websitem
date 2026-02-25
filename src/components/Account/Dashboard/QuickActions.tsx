'use client';

import Link from 'next/link';
import { Package, MapPin, Shield, Star, Settings, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const actions = [
    { icon: Package, label: 'Siparişlerim', href: '/hesabim/siparislerim', color: '#C9A96E' },
    { icon: MapPin, label: 'Adreslerim', href: '/hesabim/adreslerim', color: '#4CAF50' },
    { icon: Shield, label: 'Güvenlik', href: '/hesabim/guvenlik', color: '#2196F3' },
    { icon: Star, label: 'Puanlarım', href: '/hesabim/puan-odullerim', color: '#FF9800' },
    { icon: Settings, label: 'Profilim', href: '/hesabim/profilim', color: '#9C27B0' },
    { icon: CreditCard, label: 'Bildirimler', href: '/hesabim/bildirimler', color: '#E53935' },
];

export function QuickActions() {
    return (
        <div className="mt-6">
            <h3 className="text-[15px] font-semibold mb-3" style={{ color: '#1C1C1E' }}>Hızlı İşlemler</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {actions.map((a) => {
                    const Icon = a.icon;
                    return (
                        <Link key={a.href} href={a.href}>
                            <motion.div
                                whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                                className="flex flex-col items-center gap-2 p-4 cursor-pointer"
                                style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}
                            >
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${a.color}15` }}>
                                    <Icon size={20} color={a.color} />
                                </div>
                                <span className="text-[11px] font-medium text-center" style={{ color: '#666' }}>{a.label}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
