'use client';

import React, { useState, useEffect } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { IyzicoConfig } from '@/components/Admin/Settings/Payment/IyzicoConfig';
import { CashOnDelivery } from '@/components/Admin/Settings/Payment/CashOnDelivery';
import { BankTransfer } from '@/components/Admin/Settings/Payment/BankTransfer';
import { InstallmentConfig } from '@/components/Admin/Settings/Payment/InstallmentConfig';
import { AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function OdemeAyarlarPage() {
    const [settings, setSettings] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => {
                // Map API keys to local state keys
                setSettings({
                    iyzico: data.payment_iyzico,
                    installments: data.payment_installments,
                    cashOnDelivery: data.payment_cash_on_delivery,
                    bankTransfer: data.payment_bank_transfer
                });
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const handleUpdate = (updates: any) => {
        setSettings((prev: any) => ({ ...prev, ...updates }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const batchUpdates = [
                { key: 'payment_iyzico', value: settings.iyzico },
                { key: 'payment_installments', value: settings.installments },
                { key: 'payment_cash_on_delivery', value: settings.cashOnDelivery },
                { key: 'payment_bank_transfer', value: settings.bankTransfer }
            ];

            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(batchUpdates)
            });

            if (!res.ok) throw new Error('Save failed');

            toast.success('Ödeme ayarları kaydedildi');
            setIsDirty(false);
        } catch (error) {
            console.error(error);
            toast.error('Ayarlar kaydedilirken bir hata oluştu');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div style={{ color: '#F5F0EB', padding: 32 }}>Yükleniyor...</div>;

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
