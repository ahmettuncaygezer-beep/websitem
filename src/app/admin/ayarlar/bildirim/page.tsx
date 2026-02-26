'use client';

import React, { useState } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { SettingsCard } from '@/components/Admin/Settings/SettingsCard';
import { EmailNotifications } from '@/components/Admin/Settings/Notifications/EmailNotifications';
import { NotificationEmails } from '@/components/Admin/Settings/Notifications/NotificationEmails';
import { SmsConfig } from '@/components/Admin/Settings/Notifications/SmsConfig';
import { mockNotificationSettings } from '@/lib/mock/settings';

export default function BildirimAyarlarPage() {
    const [settings, setSettings] = useState(mockNotificationSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const handleUpdate = (updates: any) => {
        setSettings(prev => ({ ...prev, ...updates }));
        setIsDirty(true);
    };

    const handleUpdateEvents = (id: string, val: boolean) => {
        setSettings(prev => ({
            ...prev,
            emailNotifications: { ...prev.emailNotifications, [id]: val }
        }));
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
