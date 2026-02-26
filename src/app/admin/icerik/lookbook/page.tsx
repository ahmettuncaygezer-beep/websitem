'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Camera, Calendar, LayoutGrid,
    Settings, ChevronRight, Eye, Send
} from 'lucide-react';
import { LookbookGrid } from '@/components/Admin/Content/LookbookGrid';
import { useToast } from '@/components/ui/Toast/ToastProvider';

export default function LookbookPage() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('Bahar 2026');

    const tabs = ['Bahar 2026', 'Kış 2025', 'Sonbahar 2025'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '32px' }}
        >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(201,169,110,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Camera size={24} color="#C9A96E" />
                    </div>
                    <div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>Lookbook Galerisi</h1>
                        <div style={{ fontSize: '13px', color: '#AEAEB2', marginTop: '2px' }}>Görsel koleksiyonlar ve ürün etiketleme yönetimi</div>
                    </div>
                </div>

                <button
                    onClick={() => toast.info('Yeni Koleksiyon', 'Koleksiyon oluşturma arayüzü başlatılıyor...')}
                    style={{
                        background: '#C9A96E', color: '#0F0F10', border: 'none', borderRadius: '6px',
                        padding: '12px 24px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                    <Plus size={18} /> Yeni Koleksiyon
                </button>
            </div>

            {/* Collection Tabs */}
            <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '32px' }}>
                {tabs.map(name => {
                    const active = activeTab === name;
                    return (
                        <button
                            key={name}
                            onClick={() => {
                                setActiveTab(name);
                                toast.success('Koleksiyon Değiştirildi', `${name} görüntüleniyor.`);
                            }}
                            style={{
                                padding: '16px 0', background: 'none', border: 'none', fontSize: '14px',
                                fontWeight: active ? 600 : 400, color: active ? '#C9A96E' : '#636366',
                                cursor: 'pointer', transition: 'all 200ms',
                                borderBottom: `2px solid ${active ? '#C9A96E' : 'transparent'}`,
                                position: 'relative'
                            }}
                        >
                            {name}
                        </button>
                    );
                })}
                <button
                    onClick={() => toast.info('Yeni Sezon', 'Yeni sezon sekmesi ekleniyor...')}
                    style={{
                        padding: '16px 0', background: 'none', border: 'none', fontSize: '14px', color: '#3A3A3C', cursor: 'pointer'
                    }}>
                    + Yeni
                </button>
            </div>

            {/* Lookbook Content Area */}
            <LookbookGrid />

        </motion.div>
    );
}
