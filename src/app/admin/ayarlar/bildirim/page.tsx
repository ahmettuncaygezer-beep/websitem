'use client';

import React, { useState, useEffect } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { SettingsCard } from '@/components/Admin/Settings/SettingsCard';
import { EmailNotifications } from '@/components/Admin/Settings/Notifications/EmailNotifications';
import { NotificationEmails } from '@/components/Admin/Settings/Notifications/NotificationEmails';
import { SmsConfig } from '@/components/Admin/Settings/Notifications/SmsConfig';
import { toast } from 'react-hot-toast';
import { useGlobal } from '@/context/GlobalContext';

export default function BildirimAyarlarPage() {
    const [settings, setSettings] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const { refreshSettings } = useGlobal() || {};

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => {
                setSettings(data.notification_settings);
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

    const handleUpdateEvents = (id: string, val: boolean) => {
        setSettings((prev: any) => ({
            ...prev,
            emailNotifications: { ...prev.emailNotifications, [id]: val }
        }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const batchUpdates = [
                { key: 'notification_settings', value: settings }
            ];

            const res = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(batchUpdates)
            });

            if (!res.ok) throw new Error('Save failed');

            if (refreshSettings) await refreshSettings();
            toast.success('Bildirim ayarları başarıyla kaydedildi');
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
            <SettingsPageHeader
                title="Bildirim Ayarları"
                description="Admin ekibi ve müşteriler için e-posta/SMS bildirim kurallarını belirleyin."
                isDirty={isDirty}
                isSaving={isSaving}
                onSave={handleSave}
            />

            <SettingsCard title="E-posta Bildirimleri" description="Admin e-postaları ve tetiklenecek olaylar.">
                <NotificationEmails
                    emails={settings.adminEmails}
                    onChange={(val) => handleUpdate({ adminEmails: val })}
                />
                <div style={{ height: '32px' }} />
                <EmailNotifications
                    notifications={settings.emailNotifications}
                    onChange={handleUpdateEvents}
                />
            </SettingsCard>

            <SmsConfig
                config={settings.sms}
                onChange={(val) => handleUpdate({ sms: { ...settings.sms, ...val } })}
            />
        </div>
    );
}
