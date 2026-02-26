'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Truck, ShieldCheck, Award, Gem, Star,
    Phone, Globe, Clock, Trash2, Plus, Info
} from 'lucide-react';
import { FeatureItem } from '@/lib/mock/content';

interface FeaturesEditorProps {
    content: FeatureItem[];
    onChange: (content: FeatureItem[]) => void;
}

const ICON_POOL = [
    { id: 'Truck', icon: Truck },
    { id: 'ShieldCheck', icon: ShieldCheck },
    { id: 'Award', icon: Award },
    { id: 'Gem', icon: Gem },
    { id: 'Star', icon: Star },
    { id: 'Phone', icon: Phone },
    { id: 'Globe', icon: Globe },
    { id: 'Clock', icon: Clock }
];

export function FeaturesEditor({ content, onChange }: FeaturesEditorProps) {
    const handleUpdate = (index: number, updates: Partial<FeatureItem>) => {
        const next = [...content];
        next[index] = { ...next[index], ...updates };
        onChange(next);
    };

    const handleAdd = () => {
        if (content.length >= 6) return;
        onChange([...content, { id: Date.now().toString(), icon: 'Star', title: 'Yeni Özellik', description: 'Açıklama giriniz...' }]);
    };

    const handleRemove = (index: number) => {
        if (content.length <= 1) return;
        onChange(content.filter((_, i) => i !== index));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', margin: 0 }}>Özellikler Bölümü</h2>
                    <p style={{ fontSize: '13px', color: '#636366', marginTop: '4px' }}>Markanızın öne çıkan 4-6 değerini burada listeleyin.</p>
                </div>
                <button
                    onClick={handleAdd}
                    disabled={content.length >= 6}
                    style={{
                        background: content.length >= 6 ? 'rgba(255,255,255,0.02)' : '#C9A96E',
                        color: '#0F0F10', border: 'none', borderRadius: '4px', padding: '8px 16px',
                        fontSize: '12px', fontWeight: 600, cursor: content.length >= 6 ? 'not-allowed' : 'pointer'
                    }}
                >
                    <Plus size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Özellik Ekle
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                <AnimatePresence>
                    {content.map((item, idx) => {
                        const CurrentIcon = ICON_POOL.find(i => i.id === item.icon)?.icon || Star;
                        return (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                style={{
                                    background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '8px', padding: '20px', position: 'relative'
                                }}
                            >
                                <button
                                    onClick={() => handleRemove(idx)}
                                    style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#636366' }}
                                >
                                    <Trash2 size={14} />
                                </button>

                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(201,169,110,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px'
                                        }}>
                                            <CurrentIcon size={20} color="#C9A96E" />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                                            {ICON_POOL.slice(0, 8).map(i => {
                                                const Ico = i.icon;
                                                return (
                                                    <button
                                                        key={i.id}
                                                        onClick={() => handleUpdate(idx, { icon: i.id })}
                                                        style={{
                                                            padding: '4px', background: item.icon === i.id ? 'rgba(201,169,110,0.2)' : 'transparent',
                                                            border: 'none', borderRadius: '4px', cursor: 'pointer'
                                                        }}
                                                    >
                                                        <Ico size={12} color={item.icon === i.id ? '#C9A96E' : '#636366'} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <input
                                            type="text" value={item.title}
                                            onChange={(e) => handleUpdate(idx, { title: e.target.value })}
                                            placeholder="Başlık"
                                            style={{
                                                width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)',
                                                color: '#F5F0EB', fontSize: '14px', fontWeight: 600, padding: '4px 0', outline: 'none'
                                            }}
                                        />
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => handleUpdate(idx, { description: e.target.value })}
                                            placeholder="Kısa açıklama..."
                                            style={{
                                                width: '100%', background: 'transparent', border: 'none', color: '#AEAEB2',
                                                fontSize: '12px', resize: 'none', height: '48px', outline: 'none'
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
