'use client';

import React, { useState, useEffect } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { CMSConfigForm } from '@/components/Admin/Settings/General/CMSConfigForm';
import { SiteInfoForm } from '@/components/Admin/Settings/General/SiteInfoForm';
import { LocalizationForm } from '@/components/Admin/Settings/General/LocalizationForm';
import { MaintenanceToggle } from '@/components/Admin/Settings/General/MaintenanceToggle';
import { AnalyticsForm } from '@/components/Admin/Settings/General/AnalyticsForm';
import { SocialSEOForm } from '@/components/Admin/Settings/General/SocialSEOForm';
import { toast } from 'react-hot-toast';
import { useGlobal } from '@/context/GlobalContext';

export default function GenelAyarlarPage() {
    const [settings, setSettings] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const { refreshSettings } = useGlobal();

    useEffect(() => {
        fetch('/api/admin/settings')
            .then(res => res.json())
            .then(data => {
                setSettings(data);
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

    const handleUpdateChild = (section: string, field: string, value: any) => {
        setSettings((prev: any) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
        setIsDirty(true);
    };

    const handleUpdateSiteInfo = (updates: any) => {
        setSettings((prev: any) => ({
            ...prev,
            site_info: {
                ...prev.site_info,
                ...updates
            }
        }));
        setIsDirty(true);
    };

    const handleUpdateLocalization = (updates: any) => {
        setSettings((prev: any) => ({
            ...prev,
            site_localization: {
                ...prev.site_localization,
                ...updates
            }
        }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const sectionsToSave = [
                'cms_colors',
                'cms_hero',
                'cms_footer',
                'site_info',
                'site_social',
                'site_seo',
                'cms_announcement',
                'site_localization',
                'maintenanceMode',
                'analytics'
            ];

            const savePromises = sectionsToSave.map(key => {
                if (settings[key]) {
                    return fetch('/api/admin/settings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key, value: settings[key] })
                    });
                }
                return Promise.resolve();
            });

            await Promise.all(savePromises);

            await refreshSettings();

            toast.success('Ayarlar başarıyla kaydedildi');
            setIsDirty(false);
        } catch (e) {
            console.error(e);
            toast.error('Ayarlar kaydedilirken bir hata oluştu');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div style={{ color: '#F5F0EB', padding: 32 }}>Yükleniyor...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '64px' }}>
            <SettingsPageHeader
                title="Genel Ayarlar"
                description="Mağazanızın temel yapılandırması ve görsel kimliği."
                isDirty={isDirty}
                isSaving={isSaving}
                onSave={handleSave}
            />

            <CMSConfigForm
                settings={settings}
                onChange={handleUpdateChild}
            />

            <SiteInfoForm
                settings={settings.site_info || {}}
                onChange={handleUpdateSiteInfo}
            />

            <SocialSEOForm
                settings={settings}
                onChange={handleUpdateChild}
            />

            <LocalizationForm
                settings={settings.site_localization || {}}
                onChange={handleUpdateLocalization}
            />

            <MaintenanceToggle
                maintenanceMode={settings.maintenanceMode || { enabled: false, message: '', allowedIps: [] }}
                onChange={(updates) => handleUpdate({ maintenanceMode: { ...settings.maintenanceMode, ...updates } })}
            />

            <AnalyticsForm
                analytics={settings.analytics || {}}
                onChange={(updates) => handleUpdate({ analytics: { ...settings.analytics, ...updates } })}
            />
        </div>
    );
}
