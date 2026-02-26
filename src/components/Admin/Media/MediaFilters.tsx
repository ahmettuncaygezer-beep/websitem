'use client';

import React from 'react';
import {
    Search, Filter, ChevronRight, Upload,
    LayoutGrid, List, X, Clock, ArrowDownAZ
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MediaFiltersProps {
    viewMode: 'grid' | 'list';
    setViewMode: (v: 'grid' | 'list') => void;
    search: string;
    setSearch: (v: string) => void;
    onUploadClick: () => void;
}

export function MediaFilters({ viewMode, setViewMode, search, setSearch, onUploadClick }: MediaFiltersProps) {
    return (
        <div style={{
            position: 'sticky', top: 0, zIndex: 10, background: 'rgba(20,20,22,0.95)',
            backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
            {/* Top Bar: Breadcrumb & Upload */}
            <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#636366' }}>Medya</span>
                    <ChevronRight size={12} color="#333" />
                    <span style={{ fontSize: '12px', color: '#636366' }}>Ürün Görselleri</span>
                    <ChevronRight size={12} color="#333" />
                    <span style={{ fontSize: '12px', color: '#F5F0EB' }}>Koltuklar</span>
                </div>

                <button
                    onClick={onUploadClick}
                    style={{
                        background: '#C9A96E', color: '#0F0F10', border: 'none', borderRadius: '6px',
                        padding: '8px 16px', fontSize: '13px', fontWeight: 600, display: 'flex',
                        alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 200ms'
                    }}>
                    <Upload size={16} /> Dosya Yükle
                </button>
            </div>

            {/* Filters Bar */}
            <div style={{ padding: '0 24px 16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Search */}
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={16} color="#636366" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Dosya adı veya etiket ara..."
                        style={{
                            width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px', padding: '10px 14px 10px 40px', color: '#F5F0EB', fontSize: '13px', outline: 'none'
                        }}
                    />
                    {search && (
                        <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={14} color="#636366" />
                        </button>
                    )}
                </div>

                {/* Type Filter Pills */}
                <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {['Tümü', 'Görsel', 'Video', 'PDF'].map((type) => (
                        <button
                            key={type}
                            style={{
                                padding: '6px 14px', borderRadius: '6px', border: 'none', fontSize: '12px', fontWeight: 500,
                                background: type === 'Tümü' ? 'rgba(201,169,110,0.15)' : 'transparent',
                                color: type === 'Tümü' ? '#C9A96E' : '#636366', cursor: 'pointer'
                            }}>
                            {type}
                        </button>
                    ))}
                </div>

                {/* View Mode Toggle */}
                <div style={{ display: 'flex', gap: '1px', background: 'rgba(255,255,255,0.06)', padding: '1px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <button
                        onClick={() => setViewMode('grid')}
                        style={{
                            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: '5px',
                            background: viewMode === 'grid' ? '#1C1C1E' : 'transparent', color: viewMode === 'grid' ? '#C9A96E' : '#636366', cursor: 'pointer'
                        }}>
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        style={{
                            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: '5px',
                            background: viewMode === 'list' ? '#1C1C1E' : 'transparent', color: viewMode === 'list' ? '#C9A96E' : '#636366', cursor: 'pointer'
                        }}>
                        <List size={18} />
                    </button>
                </div>

                {/* Sort */}
                <button style={secondaryBtnStyle}>
                    <ArrowDownAZ size={16} /> En Yeni
                </button>
            </div>

            {/* Stats Line */}
            <div style={{ padding: '0 24px 8px', display: 'flex', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '11px', color: '#636366' }}>1.247 dosya · 8.4 GB kullanıldı</span>
            </div>
        </div>
    );
}

const secondaryBtnStyle = {
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '10px 16px', color: '#AEAEB2', fontSize: '13px',
    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 200ms'
};
