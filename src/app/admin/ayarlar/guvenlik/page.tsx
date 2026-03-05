'use client';

import React, { useState, useEffect } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { ChangePassword } from '@/components/Admin/Settings/Security/ChangePassword';
import { TwoFactorSetup } from '@/components/Admin/Settings/Security/TwoFactorSetup';
import { ActiveSessions } from '@/components/Admin/Settings/Security/ActiveSessions';
import { AuditLogSection } from '@/components/Admin/Settings/Security/AuditLogSection';
import type { SecuritySession, LoginLog } from '@/types/settings';
import { SettingsCard } from '@/components/Admin/Settings/SettingsCard';
import { ShieldAlert, Loader2 } from 'lucide-react';

export default function GuvenlikAyarlarPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [sessions, setSessions] = useState<SecuritySession[]>([]);
    const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSecurityData() {
            try {
                // Fetch audit logs for login events
                const res = await fetch('/api/admin/audit-logs?limit=10');
                const data = await res.json();
                if (data.logs && Array.isArray(data.logs)) {
                    // Map audit logs to LoginLog format
                    const logs: LoginLog[] = data.logs
                        .filter((log: any) => log.action?.includes('login') || log.action?.includes('auth'))
                        .slice(0, 10)
                        .map((log: any) => ({
                            id: log.id,
                            status: log.action?.includes('fail') ? 'failed' as const : 'success' as const,
                            timestamp: log.created_at,
                            ip: log.ip_address || '0.0.0.0',
                            location: log.metadata?.location || 'Bilinmiyor',
                            browser: log.metadata?.browser || log.user_agent || 'Bilinmiyor',
                        }));
                    setLoginLogs(logs);
                }

                // Current session info
                setSessions([{
                    id: 'current',
                    device: 'desktop',
                    browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : 'Safari',
                    os: navigator.platform || 'Bilinmiyor',
                    ip: '',
                    location: '',
                    lastActive: 'Şu an aktif',
                    isCurrent: true,
                }]);
            } catch {
                /* keep empty */
            } finally {
                setLoading(false);
            }
        }
        fetchSecurityData();
    }, []);

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
                    <ActiveSessions sessions={sessions} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <TwoFactorSetup />

                    <SettingsCard title="Giriş Logları" description="Son giriş girişimleri ve durumu.">
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                <Loader2 size={20} color="#C9A96E" style={{ animation: 'spin 1s linear infinite' }} />
                                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                            </div>
                        ) : loginLogs.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '20px', fontSize: '13px', color: '#636366' }}>
                                Giriş logu bulunamadı
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {loginLogs.map(log => (
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
                        )}
                    </SettingsCard>
                </div>
            </div>

            {/* Audit Log Section — full width */}
            <AuditLogSection />
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
