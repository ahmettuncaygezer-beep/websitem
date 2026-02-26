'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Unplug, Plus } from 'lucide-react';

interface IntegrationCardProps {
    integration: {
        id: string;
        name: string;
        desc: string;
        logo: string;
        connected: boolean;
        category: string;
    };
    onConnect: (id: string) => void;
    onConfigure: (id: string) => void;
    onDisconnect: (id: string) => void;
}

export function IntegrationCard({ integration, onConnect, onConfigure, onDisconnect }: IntegrationCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4, borderColor: 'rgba(201,169,110,0.3)' }}
            style={{
                background: '#1C1C1E', borderRadius: '12px', padding: '24px',
                border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column',
                gap: '16px', transition: 'border-color 200ms', position: 'relative'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                    width: '50px', height: '50px', background: '#0F0F10', borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
                    border: '1px solid rgba(255,255,255,0.04)'
                }}>
                    {integration.logo}
                </div>
                <span style={{
                    fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px',
                    background: integration.connected ? 'rgba(48,209,88,0.1)' : 'rgba(255,255,255,0.03)',
                    color: integration.connected ? '#30D158' : '#636366',
                    border: `1px solid ${integration.connected ? 'rgba(48,209,88,0.2)' : 'rgba(255,255,255,0.06)'}`
                }}>
                    {integration.connected ? '● BAĞLI' : '○ BAĞLI DEĞİL'}
                </span>
            </div>

            <div>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>{integration.name}</h4>
                <p style={{ fontSize: '12px', color: '#636366', marginTop: '4px', margin: 0, lineHeight: '1.4' }}>{integration.desc}</p>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {integration.connected ? (
                    <>
                        <button
                            onClick={() => onConfigure(integration.id)}
                            style={secondaryBtnStyle}
                        >
                            <Settings size={14} /> Yapılandır
                        </button>
                        <button
                            onClick={() => onDisconnect(integration.id)}
                            style={{ ...secondaryBtnStyle, color: '#FF453A' }}
                        >
                            <Unplug size={14} />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => onConnect(integration.id)}
                        style={primaryBtnStyle}
                    >
                        <Plus size={14} /> Bağlan
                    </button>
                )}
            </div>
        </motion.div>
    );
}

const primaryBtnStyle = {
    flex: 1, background: '#C9A96E', color: '#0F0F10', border: 'none', borderRadius: '6px',
    padding: '8px 12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
};

const secondaryBtnStyle = {
    flex: 1, background: 'rgba(255,255,255,0.03)', color: '#F5F0EB', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '8px 12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 200ms'
};
