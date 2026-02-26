'use client';

import React from 'react';
import { SettingsCard } from '../SettingsCard';
import { Share2, Activity, BarChart3, Globe } from 'lucide-react';
import { GeneralSettings } from '@/types/settings';

interface AnalyticsFormProps {
    analytics: GeneralSettings['analytics'];
    onChange: (updates: Partial<GeneralSettings['analytics']>) => void;
}

export function AnalyticsForm({ analytics, onChange }: AnalyticsFormProps) {
    return (
        <SettingsCard
            title="Analytics & Takip"
            description="Google Analytics, Pixel ve diğer takip servislerini bağlayın."
        >
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
                <IntegrationRow
                    icon={<Globe color="#4285F4" size={20} />}
                    name="Google Analytics 4"
                    placeholder="G-XXXXXXXXXX"
                    value={analytics.googleAnalyticsId}
                    onChange={(val) => onChange({ googleAnalyticsId: val })}
                />
                <IntegrationRow
                    icon={<Share2 color="#0081FB" size={20} />}
                    name="Facebook Pixel"
                    placeholder="123456789012345"
                    value={analytics.facebookPixelId}
                    onChange={(val) => onChange({ facebookPixelId: val })}
                />
                <IntegrationRow
                    icon={<Activity color="#6D4AFF" size={20} />}
                    name="Microsoft Clarity"
                    placeholder="site-project-id"
                    value={analytics.claritySiteId}
                    onChange={(val) => onChange({ claritySiteId: val })}
                />
                <IntegrationRow
                    icon={<BarChart3 color="#FF4D4D" size={20} />}
                    name="Hotjar"
                    placeholder="site-id"
                    value={analytics.hotjarSiteId}
                    onChange={(val) => onChange({ hotjarSiteId: val })}
                />
            </div>
        </SettingsCard>
    );
}

function IntegrationRow({ icon, name, placeholder, value, onChange }: { icon: React.ReactNode, name: string, placeholder: string, value?: string, onChange: (val: string) => void }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '20px', padding: '16px',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
            borderRadius: '8px'
        }}>
            <div style={{
                width: '40px', height: '40px', background: 'rgba(255,255,255,0.03)',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {icon}
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB' }}>{name}</div>
                <input
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    style={{
                        width: '100%', background: 'transparent', border: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '6px 0',
                        color: '#C9A96E', fontSize: '14px', outline: 'none', marginTop: '4px',
                        fontFamily: "'JetBrains Mono', monospace"
                    }}
                />
            </div>
        </div>
    );
}
