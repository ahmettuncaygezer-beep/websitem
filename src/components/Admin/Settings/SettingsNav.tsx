'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Settings, CreditCard, Truck,
    Bell, Share2, ShieldCheck, ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
    {
        id: 'genel',
        label: 'Genel',
        desc: 'Site bilgileri',
        icon: Settings,
        href: '/admin/ayarlar/genel'
    },
    {
        id: 'odeme',
        label: 'Ödeme',
        desc: 'Ödeme yöntemleri',
        icon: CreditCard,
        href: '/admin/ayarlar/odeme'
    },
    {
        id: 'kargo',
        label: 'Kargo',
        desc: 'Teslimat kuralları',
        icon: Truck,
        href: '/admin/ayarlar/kargo'
    },
    {
        id: 'bildirim',
        label: 'Bildirimler',
        desc: 'E-posta & SMS',
        icon: Bell,
        href: '/admin/ayarlar/bildirim'
    },
    {
        id: 'entegrasyon',
        label: 'Entegrasyonlar',
        desc: '3. parti servisler',
        icon: Share2,
        href: '/admin/ayarlar/entegrasyon'
    },
    {
        id: 'guvenlik',
        label: 'Güvenlik',
        desc: 'Erişim & oturumlar',
        icon: ShieldCheck,
        href: '/admin/ayarlar/guvenlik'
    },
];

export function SettingsNav() {
    const pathname = usePathname();

    return (
        <aside style={{
            width: '260px', height: '100%', background: '#0F0F10',
            borderRight: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column'
        }}>
            <div style={{ padding: '32px 24px 24px' }}>
                <h2 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: '20px',
                    color: '#F5F0EB', margin: 0
                }}>Ayarlar</h2>
                <p style={{ fontSize: '12px', color: '#636366', marginTop: '4px' }}>Sistem yapılandırması</p>
            </div>

            <nav style={{ flex: 1, padding: '0 12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                style={{ textDecoration: 'none' }}
                            >
                                <motion.div
                                    whileHover={{ background: 'rgba(255,255,255,0.03)' }}
                                    style={{
                                        padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '16px',
                                        background: isActive ? 'rgba(201,169,110,0.1)' : 'transparent',
                                        borderLeft: `2px solid ${isActive ? '#C9A96E' : 'transparent'}`,
                                        transition: 'all 200ms'
                                    }}
                                >
                                    <item.icon
                                        size={20}
                                        color={isActive ? '#C9A96E' : 'rgba(255,255,255,0.4)'}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: '13px', fontWeight: isActive ? 600 : 400,
                                            color: isActive ? '#F5F0EB' : 'rgba(255,255,255,0.6)'
                                        }}>{item.label}</div>
                                        <div style={{
                                            fontSize: '11px',
                                            color: isActive ? 'rgba(201,169,110,0.6)' : 'rgba(255,255,255,0.3)'
                                        }}>{item.desc}</div>
                                    </div>
                                    {isActive && (
                                        <motion.div layoutId="active-indicator">
                                            <ChevronRight size={14} color="#C9A96E" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}
