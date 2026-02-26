'use client';

import React, { useState } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { ChangePassword } from '@/components/Admin/Settings/Security/ChangePassword';
import { TwoFactorSetup } from '@/components/Admin/Settings/Security/TwoFactorSetup';
import { ActiveSessions } from '@/components/Admin/Settings/Security/ActiveSessions';
import { mockSecuritySessions, mockLoginLogs } from '@/lib/mock/settings';
import { SettingsCard } from '@/components/Admin/Settings/SettingsCard';
import { ShieldAlert } from 'lucide-react';

export default function GuvenlikAyarlarPage() {
    const [isSaving, setIsSaving] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsPageHeader
                title="Güvenlik & Erişim"
                description="Hesap güvenliği, 2FA kurulumu ve giriş loglarını yönetin."
                isDirty={false}
                onSave={() => { }}
            />

            <div style={securityBannerStyle}>
                <ShieldAlert size={20} />
                <div>
                    <div style={{ fontWeight: 600 }}>Güvenlik Durumu: İyi</div>
                    <div style={{ fontSize: '13px', opacity: 0.8 }}>Hesabınızda 2FA aktif değil. Daha yüksek güvenlik için etkinleştirmeniz önerilir.</div>
                </div>
            </div>

            <div style={gridStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <ChangePassword />
                    <ActiveSessions sessions={mockSecuritySessions} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <TwoFactorSetup />

                    <SettingsCard title="Giriş Logları" description="Son 10 giriş girişimi ve durumu.">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {mockLoginLogs.map(log => (
                                <div key={log.id} style={logRowStyle}>
                                    <div style={{
                                        width: '8px', height: '8px', borderRadius: '50%',
                                        background: log.status === 'success' ? '#30D158' : '#FF453A'
                                    }} />
                                    <div style={{ flex: 1, fontSize: '13px', color: '#AEAEB2' }}>{log.status === 'success' ? 'Başarılı Giriş' : 'Hatalı Giriş'}</div>
                                    <div style={{ fontSize: '11px', color: '#636366', fontFamily: 'JetBrains Mono' }}>{log.ip}</div>
                                    <div style={{ fontSize: '11px', color: '#636366' }}>{new Date(log.timestamp).toLocaleTimeString()}</div>
                                </div>
                            ))}
                        </div>
                    </SettingsCard>
                </div>
            </div>
        </div>
    );
}

const securityBannerStyle = {
    display: 'flex', gap: '16px', padding: '20px', borderRadius: '12px',
    background: 'rgba(255,214,10,0.08)', border: '1px solid rgba(255,214,10,0.2)',
    color: '#FFD60A', marginBottom: '32px'
};
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'flex-start' };
const logRowStyle = {
    display: 'flex', alignItems: 'center', gap: '12px', padding: '10px',
    background: 'rgba(255,255,255,0.02)', borderRadius: '6px'
};
