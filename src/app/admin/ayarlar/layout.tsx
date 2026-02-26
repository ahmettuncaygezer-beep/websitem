import React from 'react';
import { SettingsNav } from '@/components/Admin/Settings/SettingsNav';

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: 'flex', height: '100%', background: '#141416' }}>
            <SettingsNav />
            <main style={{
                flex: 1, height: '100%', overflowY: 'auto',
                padding: '40px', position: 'relative'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
