'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface EmailNotificationsProps {
    notifications: Record<string, boolean>;
    onChange: (id: string, val: boolean) => void;
}

const EVENTS = [
    {
        group: 'Siparişler', items: [
            { id: 'new_order', label: 'Yeni sipariş alındı', desc: 'Her yeni sipariş için anında bildir.' },
            { id: 'order_status', label: 'Sipariş durumu güncellendi', desc: 'Durum değişikliklerinde bildir.' },
            { id: 'order_cancel', label: 'Sipariş iptal edildi', desc: 'İptal edilen siparişler için.' }
        ]
    },
    {
        group: 'Ürün & Stok', items: [
            { id: 'low_stock', label: 'Kritik stok uyarısı', desc: 'Belirlenen eşiğin altına düşünce.' },
            { id: 'out_of_stock', label: 'Ürün tükendi', desc: 'Stok 0\'a düşünce.' }
        ]
    },
    {
        group: 'Müşteri', items: [
            { id: 'new_customer', label: 'Yeni müşteri kaydı', desc: 'Her yeni üye için.' },
            { id: 'new_comment', label: 'Yorum onay bekliyor', desc: 'Yeni yorum geldiğinde.' }
        ]
    }
];

export function EmailNotifications({ notifications, onChange }: EmailNotificationsProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {EVENTS.map(group => (
                <div key={group.group}>
                    <h4 style={groupTitleStyle}>{group.group}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {group.items.map(item => (
                            <div key={item.id} style={rowStyle}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#F5F0EB' }}>{item.label}</div>
                                    <div style={{ fontSize: '12px', color: '#636366', marginTop: '2px' }}>{item.desc}</div>
                                </div>
                                <button
                                    onClick={() => onChange(item.id, !notifications[item.id])}
                                    style={{
                                        width: '36px', height: '18px', background: notifications[item.id] ? '#C9A96E' : '#333',
                                        borderRadius: '9px', border: 'none', position: 'relative', cursor: 'pointer'
                                    }}
                                >
                                    <motion.div
                                        animate={{ x: notifications[item.id] ? 20 : 2 }}
                                        style={{
                                            width: '14px', height: '14px', background: '#F5F0EB',
                                            borderRadius: '50%', position: 'absolute', top: '2px'
                                        }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

const groupTitleStyle = {
    fontSize: '11px', fontWeight: 600, color: '#C9A96E',
    letterSpacing: '0.1em', textTransform: 'uppercase' as any, marginBottom: '16px'
};
const rowStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.03)'
};
