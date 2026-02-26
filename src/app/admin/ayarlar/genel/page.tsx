'use client';

import React, { useState } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { SiteInfoForm } from '@/components/Admin/Settings/General/SiteInfoForm';
import { LocalizationForm } from '@/components/Admin/Settings/General/LocalizationForm';
import { MaintenanceToggle } from '@/components/Admin/Settings/General/MaintenanceToggle';
import { AnalyticsForm } from '@/components/Admin/Settings/General/AnalyticsForm';
import { mockGeneralSettings } from '@/lib/mock/settings';

export default function GenelAyarlarPage() {
    const [settings, setSettings] = useState(mockGeneralSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    const handleUpdate = (updates: any) => {
        setSettings(prev => ({ ...prev, ...updates }));
        setIsDirty(true);
    };

    const handleUpdateMaintenance = (updates: any) => {
        setSettings(prev => ({
            ...prev,
            maintenanceMode: { ...prev.maintenanceMode, ...updates }
        }));
        setIsDirty(true);
    };

    const handleUpdateAnalytics = (updates: any) => {
        setSettings(prev => ({
            ...prev,
            analytics: { ...prev.analytics, ...updates }
        }));
        setIsDirty(true);
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setIsDirty(false);
        }, 1500);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsPageHeader
                title="Genel Ayarlar"
                description="Mağazanızın temel yapılandırması ve görsel kimliği."
                isDirty={isDirty}
                isSaving={isSaving}
                onSave={handleSave}
            />

            <SiteInfoForm
                settings={settings}
                onChange={handleUpdate}
            />

            <LocalizationForm
                settings={settings}
                onChange={handleUpdate}
            />

            <MaintenanceToggle
                maintenanceMode={settings.maintenanceMode}
                onChange={handleUpdateMaintenance}
            />

            <AnalyticsForm
                analytics={settings.analytics}
                onChange={handleUpdateAnalytics}
            />
        </div>
    );
}
