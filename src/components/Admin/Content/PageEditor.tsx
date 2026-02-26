'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Eye, Save, Send, ArrowLeft, ArrowRight,
    MousePointer2, HelpCircle, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { mockPageSections, PageSection } from '@/lib/mock/content';
import { SectionList } from './SectionList';
import { HeroEditor } from './HeroEditor';
import { FeaturesEditor } from './FeaturesEditor';
import { BannerEditor } from './BannerEditor';

export default function PageEditor() {
    const [sections, setSections] = useState<PageSection[]>(mockPageSections);
    const [selectedId, setSelectedId] = useState<string | null>(sections[0]?.id || null);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState('12 dk önce');

    const selectedSection = sections.find(s => s.id === selectedId);

    const handleUpdateSection = (id: string, updates: Partial<PageSection>) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsSaving(false);
        setLastSaved('Az önce');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#141416', color: '#F5F0EB' }}>
            {/* Header Bar */}
            <header style={{
                height: '64px', background: '#0F0F10', borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
                position: 'sticky', top: 0, zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 500, margin: 0 }}>Ana Sayfa Editörü</h1>
                        <div style={{ fontSize: '11px', color: '#636366' }}>Son kayıt: {lastSaved}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={btnOutlineStyle}><Eye size={16} /> Önizle</button>
                    <button style={btnSecondaryStyle} onClick={handleSave}>
                        {isSaving ? <span className="animate-spin mr-2">◌</span> : <Save size={16} />}
                        Kaydet
                    </button>
                    <button style={btnPrimaryStyle}><Send size={16} /> Canlıya Al</button>
                </div>
            </header>

            <div style={{ display: 'flex' }}>
                {/* Left Side: Section List */}
                <aside style={{ width: '320px', borderRight: '1px solid rgba(255,255,255,0.06)', background: '#0F0F10', minHeight: 'calc(100vh - 64px)' }}>
                    <SectionList
                        sections={sections}
                        onReorder={setSections}
                        selectedId={selectedId}
                        onSelect={setSelectedId}
                        onToggle={(id) => handleUpdateSection(id, { isActive: !sections.find(s => s.id === id)?.isActive })}
                    />
                </aside>

                {/* Right Side: Editor Panel */}
                <main style={{ flex: 1, padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
                    <AnimatePresence mode="wait">
                        {!selectedId ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                            >
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                                    <MousePointer2 size={32} color="#636366" />
                                </div>
                                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#C9A96E', margin: 0 }}>Bölüm Seçin</h2>
                                <p style={{ color: '#636366', maxWidth: '300px', fontSize: '14px', marginTop: '12px' }}>Düzenlemek istediğiniz bölümü sol listeden seçerek içerikleri güncellemeye başlayın.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={selectedId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {selectedSection?.type === 'hero' && (
                                    <HeroEditor
                                        content={selectedSection.content}
                                        onChange={(content) => handleUpdateSection(selectedId, { content })}
                                    />
                                )}
                                {selectedSection?.type === 'features' && (
                                    <FeaturesEditor
                                        content={selectedSection.content}
                                        onChange={(content) => handleUpdateSection(selectedId, { content })}
                                    />
                                )}
                                {selectedSection?.type === 'campaign-strip' && (
                                    <BannerEditor
                                        content={selectedSection.content}
                                        onChange={(content) => handleUpdateSection(selectedId, { content })}
                                    />
                                )}
                                {['featured-products', 'lookbook-banner', 'testimonials', 'newsletter', 'text-block', 'gallery'].includes(selectedSection?.type || '') && (
                                    <div style={{ padding: '80px 0', textAlign: 'center' }}>
                                        <div style={{ fontSize: '13px', color: '#636366' }}>Bu bölümün ({selectedSection?.type}) detaylı editörü yapım aşamasında.</div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

const btnBaseStyle = {
    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '6px',
    fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 200ms'
};

const btnPrimaryStyle = { ...btnBaseStyle, background: '#C9A96E', color: '#0F0F10' };
const btnSecondaryStyle = { ...btnBaseStyle, background: 'rgba(255,255,255,0.08)', color: '#F5F0EB' };
const btnOutlineStyle = { ...btnBaseStyle, background: 'transparent', border: '1px solid #C9A96E', color: '#C9A96E' };
