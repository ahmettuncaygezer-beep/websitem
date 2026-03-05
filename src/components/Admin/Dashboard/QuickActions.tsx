'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Plus, Target, ShoppingCart, PenLine } from 'lucide-react';

const actions = [
    { icon: Plus, label: 'Ürün Ekle', href: '/admin/urunler/yeni' },
    { icon: Target, label: 'Kampanya Oluştur', href: '/admin/kampanyalar/yeni' },
    { icon: ShoppingCart, label: 'Sipariş Yönet', href: '/admin/siparisler' },
    { icon: PenLine, label: 'Blog Yaz', href: '/admin/icerik/blog/yeni' },
];

export function QuickActions() {
    const router = useRouter();

    return (
        <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            role="group"
            aria-label="Hızlı işlemler"
        >
            {actions.map((action) => {
                const Icon = action.icon;
                return (
                    <motion.button
                        key={action.label}
                        onClick={() => router.push(action.href)}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            background: '#1C1C1E',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '8px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            transition: 'background 200ms, border-color 200ms, transform 200ms',
                            fontFamily: 'Inter, system-ui, sans-serif',
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLButtonElement;
                            el.style.background = '#242426';
                            el.style.borderColor = 'rgba(201,169,110,0.25)';
                            el.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLButtonElement;
                            el.style.background = '#1C1C1E';
                            el.style.borderColor = 'rgba(255,255,255,0.06)';
                            el.style.transform = 'none';
                        }}
                        aria-label={action.label}
                    >
                        <Icon size={22} color="#C9A96E" />
                        <span
                            style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#AEAEB2',
                                textAlign: 'center',
                            }}
                        >
                            {action.label}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
}
