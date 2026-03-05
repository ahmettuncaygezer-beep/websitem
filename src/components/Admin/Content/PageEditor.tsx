'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Eye, Save, Send, ArrowLeft, ArrowRight,
    MousePointer2, HelpCircle, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { PageSection } from '@/lib/default-content';
import { SectionList } from './SectionList';
import { HeroEditor } from './HeroEditor';
import { FeaturesEditor } from './FeaturesEditor';
import { BannerEditor } from './BannerEditor';
import { ProductGridEditor } from './ProductGridEditor';
import { TestimonialsEditor } from './TestimonialsEditor';
import { NewsletterEditor } from './NewsletterEditor';

export default function PageEditor() {
    const [sections, setSections] = useState<PageSection[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState('Henüz kaydedilmedi');

    React.useEffect(() => {
        const fetchSections = async () => {
            try {
                const res = await fetch('/api/admin/content/home');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setSections(data);
                    setSelectedId(data[0]?.id || null);
                }
            } catch (err) {
                console.error('Failed to fetch home sections:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSections();
    }, []);

    const selectedSection = sections.find(s => s.id === selectedId);

    const handleUpdateSection = (id: string, updates: Partial<PageSection>) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/content/home', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sections)
            });
            if (res.ok) {
                setLastSaved('Az önce');
            }
        } catch (err) {
            console.error('Failed to save home sections:', err);
        } finally {
            setIsSaving(false);
        }
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
                                {selectedSection?.type === 'featured-products' && (
                                    <ProductGridEditor
                                        content={selectedSection.content}
                                        onChange={(content) => handleUpdateSection(selectedId, { content })}
                                    />
                                )}
                                {selectedSection?.type === 'testimonials' && (
                                    <TestimonialsEditor
                                        content={selectedSection.content}
                                        onChange={(content) => handleUpdateSection(selectedId, { content })}
                                    />
                                )}
                                {selectedSection?.type === 'newsletter' && (
                                    <NewsletterEditor
                                        content={selectedSection.content}
                                        onChange={(content) => handleUpdateSection(selectedId, { content })}
                                    />
                                )}
                                {['lookbook-banner', 'text-block', 'gallery'].includes(selectedSection?.type || '') && (
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
