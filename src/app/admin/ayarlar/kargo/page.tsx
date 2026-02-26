'use client';

import React, { useState } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { CarrierList } from '@/components/Admin/Settings/Shipping/CarrierList';
import { ShippingRules } from '@/components/Admin/Settings/Shipping/ShippingRules';
import { mockShippingSettings } from '@/lib/mock/settings';
import { Truck, Clock, MapPin } from 'lucide-react';
import { SettingsCard } from '@/components/Admin/Settings/SettingsCard';

export default function KargoAyarlarPage() {
    const [settings, setSettings] = useState(mockShippingSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const handleUpdate = (updates: any) => {
        setSettings(prev => ({ ...prev, ...updates }));
        setIsDirty(true);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsDirty(false);
        }, 1500);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsPageHeader
                title="Kargo Ayarlar"
                description="Lojistik süreçlerini, kargo ücretlerini ve teslimat sürelerini yönetin."
                isDirty={isDirty}
                isSaving={isSaving}
                onSave={handleSave}
            />

            <CarrierList
                carriers={settings.carriers}
                onChange={(val) => handleUpdate({ carriers: val })}
            />

            <ShippingRules
                threshold={settings.freeShippingThreshold}
                enabled={settings.freeShippingEnabled}
                rules={settings.weightRules}
                onChange={handleUpdate}
            />

            <SettingsCard title="Tahmini Teslimat Süreleri" description="Müşteriye ürün sayfasında gösterilecek kargo süreleri.">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <DeliveryTimeInput
                        label="İM İÇİ (Şehir İçi)"
                        values={settings.deliveryTimes.inCity}
                        onChange={(v) => handleUpdate({ deliveryTimes: { ...settings.deliveryTimes, inCity: v } })}
                    />
                    <DeliveryTimeInput
                        label="ŞEHİR DIŞI"
                        values={settings.deliveryTimes.outOfCity}
                        onChange={(v) => handleUpdate({ deliveryTimes: { ...settings.deliveryTimes, outOfCity: v } })}
                    />
                    <DeliveryTimeInput
                        label="ÖZEL BÖLGELER / DOĞU"
                        values={settings.deliveryTimes.eastRegion}
                        onChange={(v) => handleUpdate({ deliveryTimes: { ...settings.deliveryTimes, eastRegion: v } })}
                    />
                </div>
            </SettingsCard>

            <SettingsCard title="Kargo Notu" description="Checkout ve sipariş onay ekranında müşteriye gösterilecek not.">
                <textarea
                    value={settings.customerNote}
                    onChange={(e) => handleUpdate({ customerNote: e.target.value })}
                    style={{
                        width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px', padding: '12px', color: '#F5F0EB', fontSize: '14px', outline: 'none', height: '100px', resize: 'none'
                    }}
                />
            </SettingsCard>
        </div>
    );
}

function DeliveryTimeInput({ label, values, onChange }: { label: string, values: [number, number], onChange: (v: [number, number]) => void }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '10px', fontWeight: 600, color: '#636366', letterSpacing: '0.05em' }}>{label}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                    type="number" value={values[0]}
                    onChange={(e) => onChange([Number(e.target.value), values[1]])}
                    style={timeInputStyle}
                />
                <span style={{ color: '#636366' }}>-</span>
                <input
                    type="number" value={values[1]}
                    onChange={(e) => onChange([values[0], Number(e.target.value)])}
                    style={timeInputStyle}
                />
                <span style={{ fontSize: '12px', color: '#AEAEB2' }}>iş günü</span>
            </div>
        </div>
    );
}

const timeInputStyle = {
    width: '50px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '8px', color: '#F5F0EB', fontSize: '13px', textAlign: 'center' as any, outline: 'none'
};
