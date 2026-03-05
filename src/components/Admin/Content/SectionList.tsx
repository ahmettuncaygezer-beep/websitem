'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
    GripVertical, Eye, Settings, Trash2, Copy,
    Plus, LayoutTemplate, Zap, Radio, Check
} from 'lucide-react';
import { mockPageSections, PageSection } from '@/lib/default-content';

interface SectionListProps {
    sections: PageSection[];
    onReorder: (newOrder: PageSection[]) => void;
    selectedId: string | null;
    onSelect: (id: string) => void;
    onToggle: (id: string) => void;
}

export function SectionList({ sections, onReorder, selectedId, onSelect, onToggle }: SectionListProps) {
    return (
        <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Sayfanın Bölümleri</h3>
                <button style={{
                    background: 'rgba(201,169,110,0.1)', border: 'none', borderRadius: '4px',
                    padding: '4px 8px', color: '#C9A96E', fontSize: '11px', fontWeight: 600, cursor: 'pointer'
                }}>
                    + Bölüm Ekle
                </button>
            </div>

            <Reorder.Group
                axis="y"
                values={sections}
                onReorder={onReorder}
                style={{ listStyle: 'none', padding: '12px', margin: 0, overflowY: 'auto', flex: 1 }}
            >
                <AnimatePresence initial={false}>
                    {sections.map((section) => (
                        <SectionItem
                            key={section.id}
                            section={section}
                            isSelected={selectedId === section.id}
                            onSelect={() => onSelect(section.id)}
                            onToggle={() => onToggle(section.id)}
                        />
                    ))}
                </AnimatePresence>
            </Reorder.Group>
        </div>
    );
}

function SectionItem({ section, isSelected, onSelect, onToggle }: {
    section: PageSection, isSelected: boolean, onSelect: () => void, onToggle: () => void
}) {
    const Icon = typeIcons[section.type] || LayoutTemplate;

    return (
        <Reorder.Item
            value={section}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileDrag={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.3)', cursor: 'grabbing' }}
            style={{ marginBottom: '8px' }}
        >
            <div
                onClick={onSelect}
                style={{
                    background: isSelected ? '#242426' : '#1C1C1E',
                    border: `1px solid ${isSelected ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    borderLeft: isSelected ? '3px solid #C9A96E' : '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '4px', padding: '12px', cursor: 'pointer', transition: 'all 200ms',
                    display: 'flex', alignItems: 'center', gap: '12px'
                }}
            >
                <GripVertical size={16} color="rgba(255,255,255,0.2)" />

                <div style={{
                    width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Icon size={18} color={isSelected ? '#C9A96E' : '#AEAEB2'} />
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: isSelected ? '#F5F0EB' : '#AEAEB2' }}>{section.title}</div>
                    <div style={{ fontSize: '10px', color: '#636366', textTransform: 'uppercase' }}>{section.type}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={onToggle}
                        style={{
                            width: '32px', height: '18px', borderRadius: '10px', border: 'none',
                            background: section.isActive ? '#C9A96E' : '#3A3A3C',
                            position: 'relative', cursor: 'pointer', transition: 'all 200ms'
                        }}
                    >
                        <motion.div
                            animate={{ x: section.isActive ? 16 : 2 }}
                            style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#F5F0EB', position: 'absolute', top: 2 }}
                        />
                    </button>
                </div>
            </div>
        </Reorder.Item>
    );
}

const typeIcons: Record<string, any> = {
    hero: Zap,
    features: Check,
    'featured-products': LayoutTemplate,
    'lookbook-banner': Eye,
    'campaign-strip': Radio,
};
