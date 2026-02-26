'use client';

import React from 'react';

interface SettingsCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    headerAction?: React.ReactNode;
    variant?: 'default' | 'danger';
}

export function SettingsCard({ title, description, children, headerAction, variant = 'default' }: SettingsCardProps) {
    const isDanger = variant === 'danger';

    return (
        <div style={{
            background: isDanger ? 'linear-gradient(to bottom right, rgba(255,69,58,0.05), #1C1C1E)' : '#1C1C1E',
            borderRadius: '12px', padding: '24px',
            border: `1px solid ${isDanger ? 'rgba(255,69,58,0.2)' : 'rgba(255,255,255,0.06)'}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)', marginBottom: '32px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                    <h3 style={{
                        fontSize: '16px', fontWeight: 600, color: '#F5F0EB', margin: 0,
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                        {title}
                    </h3>
                    {description && (
                        <p style={{ fontSize: '13px', color: '#636366', marginTop: '4px', margin: 0 }}>
                            {description}
                        </p>
                    )}
                </div>
                {headerAction}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '20px' }}>
                {children}
            </div>
        </div>
    );
}
