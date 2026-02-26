'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Save, Check, Loader2 } from 'lucide-react';

interface SettingsPageHeaderProps {
    title: string;
    description: string;
    isDirty?: boolean;
    isSaving?: boolean;
    onSave: () => void;
}

export function SettingsPageHeader({ title, description, isDirty, isSaving, onSave }: SettingsPageHeaderProps) {
    const [saveStatus, setSaveStatus] = React.useState<'idle' | 'saving' | 'saved'>('idle');

    React.useEffect(() => {
        if (isSaving) {
            setSaveStatus('saving');
        } else if (saveStatus === 'saving') {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }
    }, [isSaving]);

    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '40px', position: 'sticky', top: 0, zIndex: 10,
            background: 'rgba(20,20,22,0.8)', backdropFilter: 'blur(12px)',
            padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.04)'
        }}>
            <div>
                <h1 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: '28px',
                    color: '#F5F0EB', margin: 0
                }}>{title}</h1>
                <p style={{ fontSize: '14px', color: '#AEAEB2', marginTop: '4px', margin: 0 }}>{description}</p>
            </div>

            <motion.button
                disabled={!isDirty || isSaving}
                onClick={onSave}
                whileHover={isDirty ? { scale: 1.02, background: '#D4B87A' } : {}}
                whileTap={isDirty ? { scale: 0.98 } : {}}
                style={{
                    background: isDirty ? '#C9A96E' : 'rgba(255,255,255,0.05)',
                    color: isDirty ? '#0F0F10' : '#636366',
                    border: 'none', borderRadius: '8px', padding: '10px 24px',
                    fontSize: '14px', fontWeight: 600, cursor: isDirty ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 200ms'
                }}
            >
                {saveStatus === 'saving' ? (
                    <><Loader2 size={18} className="animate-spin" /> Kaydediliyor...</>
                ) : saveStatus === 'saved' ? (
                    <><Check size={18} /> Kaydedildi!</>
                ) : (
                    <><Save size={18} /> Değişiklikleri Kaydet</>
                )}
            </motion.button>
        </div>
    );
}
