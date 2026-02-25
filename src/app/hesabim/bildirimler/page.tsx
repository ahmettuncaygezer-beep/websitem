'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, ShoppingBag, Heart, Star, Check } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { AccountHeader } from '@/components/Account/AccountHeader';

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!value)}
            className="relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
            style={{ background: value ? '#C9A96E' : '#E0E0E0', border: 'none', cursor: 'pointer' }}
        >
            <motion.div
                className="absolute top-0.5 rounded-full"
                style={{ width: '20px', height: '20px', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
                animate={{ left: value ? '22px' : '2px' }}
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
            />
        </button>
    );
}

export default function BildirimlerPage() {
    const notificationPrefs = useAuthStore((s) => s.notificationPrefs);
    const updateNotifications = useAuthStore((s) => s.updateNotificationPrefs);
    const [saved, setSaved] = useState(false);

    const sections = [
        {
            title: 'Sipariş Bildirimleri',
            icon: <ShoppingBag size={18} style={{ color: '#C9A96E' }} />,
            items: [
                { key: 'orderUpdates' as const, label: 'Sipariş durum güncellemeleri', desc: 'Kargo, teslimat ve sipariş değişiklikleri' },
            ],
        },
        {
            title: 'Promosyon & Kampanyalar',
            icon: <Star size={18} style={{ color: '#FF9800' }} />,
            items: [
                { key: 'promotions' as const, label: 'Kampanya ve indirimler', desc: 'Özel fırsatlar ve sezonluk kampanyalar' },
                { key: 'newsletter' as const, label: 'Haftalık bülten', desc: 'Yeni ürünler ve ilham veren içerikler' },
            ],
        },
        {
            title: 'Fiyat & Stok Takibi',
            icon: <Heart size={18} style={{ color: '#E53935' }} />,
            items: [
                { key: 'priceAlerts' as const, label: 'Fiyat düşüş bildirimleri', desc: 'Favorilerinizde fiyat düşünce bilgi alın' },
                { key: 'stockAlerts' as const, label: 'Tekrar stokta bildirimleri', desc: 'Biten ürünler stoka girince haber verin' },
            ],
        },
        {
            title: 'Güvenlik',
            icon: <Bell size={18} style={{ color: '#2196F3' }} />,
            items: [
                { key: 'securityAlerts' as const, label: 'Güvenlik bildirimleri', desc: 'Yeni giriş ve şüpheli aktiviteler' },
            ],
        },
    ];

    const handleToggle = (key: keyof typeof notificationPrefs, value: boolean) => {
        updateNotifications({ [key]: value });
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div>
            <AccountHeader title="Bildirim Tercihleri" breadcrumbs={[{ label: 'Bildirimler' }]} />

            {/* Channel preferences */}
            <div className="p-5 mb-4" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                <h3 className="text-[15px] font-semibold mb-4" style={{ color: '#1C1C1E' }}>Bildirim Kanalları</h3>
                <div className="flex gap-4">
                    {[
                        { key: 'emailNotifications' as const, icon: <Mail size={20} />, label: 'E-posta' },
                        { key: 'smsNotifications' as const, icon: <Bell size={20} />, label: 'SMS' },
                        { key: 'pushNotifications' as const, icon: <Bell size={20} />, label: 'Push' },
                    ].map((ch) => (
                        <div key={ch.key} className="flex-1 p-4 flex flex-col items-center gap-2" style={{ border: notificationPrefs[ch.key] ? '1.5px solid #C9A96E' : '1.5px solid #E8E3DC', borderRadius: '8px', background: notificationPrefs[ch.key] ? '#FDF8F0' : 'white', cursor: 'pointer' }} onClick={() => handleToggle(ch.key, !notificationPrefs[ch.key])}>
                            <div style={{ color: notificationPrefs[ch.key] ? '#C9A96E' : '#CCC' }}>{ch.icon}</div>
                            <span className="text-[12px] font-medium" style={{ color: notificationPrefs[ch.key] ? '#1C1C1E' : '#999' }}>{ch.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sections */}
            {sections.map((section) => (
                <div key={section.title} className="p-5 mb-4" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                    <h3 className="text-[15px] font-semibold mb-4 flex items-center gap-2" style={{ color: '#1C1C1E' }}>
                        {section.icon} {section.title}
                    </h3>
                    {section.items.map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F5F0EB' }}>
                            <div>
                                <p className="text-[13px] font-medium" style={{ color: '#1C1C1E' }}>{item.label}</p>
                                <p className="text-[11px]" style={{ color: '#999' }}>{item.desc}</p>
                            </div>
                            <Toggle value={notificationPrefs[item.key] ?? true} onChange={(v) => handleToggle(item.key, v)} />
                        </div>
                    ))}
                </div>
            ))}

            <motion.button whileTap={{ scale: 0.98 }} onClick={handleSave} className="flex items-center gap-2 px-6 py-3 text-[13px] font-semibold" style={{ background: saved ? '#4CAF50' : '#1C1C1E', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                {saved ? <><Check size={16} /> Kaydedildi!</> : 'Tercihleri Kaydet'}
            </motion.button>
        </div>
    );
}
