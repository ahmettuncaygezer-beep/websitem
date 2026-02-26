'use client';

import React, { useState } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { IyzicoConfig } from '@/components/Admin/Settings/Payment/IyzicoConfig';
import { CashOnDelivery } from '@/components/Admin/Settings/Payment/CashOnDelivery';
import { BankTransfer } from '@/components/Admin/Settings/Payment/BankTransfer';
import { InstallmentConfig } from '@/components/Admin/Settings/Payment/InstallmentConfig';
import { mockPaymentSettings } from '@/lib/mock/settings';
import { AlertCircle } from 'lucide-react';

export default function OdemeAyarlarPage() {
    const [settings, setSettings] = useState(mockPaymentSettings);
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
            <div style={infoBannerStyle}>
                <AlertCircle size={18} />
                <div>
                    <div style={{ fontWeight: 600 }}>Güvenlik Hatırlatması</div>
                    <div style={{ fontSize: '13px', opacity: 0.8 }}>Ödeme API anahtarları şifrelenmiş olarak saklanır. Bilgilerinizi kopyalarken güvenli bir bağlantı kullandığınızdan emin olun.</div>
                </div>
            </div>

            <SettingsPageHeader
                title="Ödeme Ayarları"
                description="Müşterilerinize sunduğunuz ödeme yöntemlerini ve taksit seçeneklerini yönetin."
                isDirty={isDirty}
                isSaving={isSaving}
                onSave={handleSave}
            />

            <IyzicoConfig
                config={settings.iyzico}
                onChange={(val) => handleUpdate({ iyzico: { ...settings.iyzico, ...val } })}
            />

            <InstallmentConfig
                config={settings.installments}
                onChange={(val) => handleUpdate({ installments: val })}
            />

            <CashOnDelivery
                config={settings.cashOnDelivery}
                onChange={(val) => handleUpdate({ cashOnDelivery: { ...settings.cashOnDelivery, ...val } })}
            />

            <BankTransfer
                config={settings.bankTransfer}
                onChange={(val) => handleUpdate({ bankTransfer: { ...settings.bankTransfer, ...val } })}
            />
        </div>
    );
}

const infoBannerStyle = {
    display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px',
    background: 'rgba(255,214,10,0.08)', border: '1px solid rgba(255,214,10,0.2)',
    color: '#FFD60A', marginBottom: '32px'
};
