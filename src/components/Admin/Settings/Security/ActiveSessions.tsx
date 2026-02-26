'use client';

import React from 'react';
import { Monitor, Smartphone, Tablet, XCircle } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { SecuritySession } from '@/types/settings';

interface ActiveSessionsProps {
    sessions: SecuritySession[];
}

export function ActiveSessions({ sessions }: ActiveSessionsProps) {
    const getIcon = (device: string) => {
        switch (device) {
            case 'desktop': return <Monitor size={20} />;
            case 'mobile': return <Smartphone size={20} />;
            case 'tablet': return <Tablet size={20} />;
            default: return <Monitor size={20} />;
        }
    };

    return (
        <SettingsCard
            title="Aktif Oturumlar"
            description="Hesabınıza erişimi olan mevcut cihazlar. Şüpheli bir durum fark ederseniz oturumu sonlandırın."
            headerAction={<button style={logoutAllBtnStyle}>Tüm Diğer Oturumlardan Çık</button>}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sessions.map(session => (
                    <div key={session.id} style={sessionCardStyle}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '10px', background: '#0F0F10',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#636366'
                        }}>
                            {getIcon(session.device)}
                        </div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB' }}>{session.browser} · {session.os}</span>
                                {session.isCurrent && <span style={currentBadgeStyle}>Mevcut Cihaz</span>}
                            </div>
                            <div style={{ fontSize: '11px', color: '#636366', marginTop: '2px' }}>
                                {session.ip} · {session.location} · {session.lastActive}
                            </div>
                        </div>

                        {!session.isCurrent && (
                            <button style={terminateBtnStyle} title="Oturumu Sonlandır">
                                <XCircle size={18} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </SettingsCard>
    );
}

const sessionCardStyle = {
    display: 'flex', alignItems: 'center', gap: '16px', padding: '16px',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px'
};
const currentBadgeStyle = {
    fontSize: '9px', fontWeight: 700, background: 'rgba(201,169,110,0.15)',
    color: '#C9A96E', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(201,169,110,0.2)'
};
const terminateBtnStyle = { background: 'none', border: 'none', color: '#636366', cursor: 'pointer', padding: '8px', transition: 'color 200ms' };
const logoutAllBtnStyle = { background: 'none', border: '1px solid rgba(255,69,58,0.2)', color: '#FF453A', fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' };
