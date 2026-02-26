'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Target, Tag, BarChart3, Percent,
    ChevronDown, Filter, SlidersHorizontal
} from 'lucide-react';
import Link from 'next/link';
import { mockCampaigns, CampaignStatus, CampaignType, formatPrice } from '@/lib/mock/campaigns';
import { CampaignCard } from '@/components/Admin/Campaigns/CampaignCard';

const TABS = [
    { id: 'Tümü', label: 'Tümü' },
    { id: CampaignStatus.Aktif, label: 'Aktif' },
    { id: CampaignStatus.Zamanlanmış, label: 'Zamanlanmış' },
    { id: CampaignStatus.SonaErdi, label: 'Sona Erdi' },
    { id: CampaignStatus.Durduruldu, label: 'Durduruldu' },
];

export default function CampaignsPage() {
    const [activeTab, setActiveTab] = useState('Tümü');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCampaigns = useMemo(() => {
        return mockCampaigns.filter(c => {
            const matchesTab = activeTab === 'Tümü' || c.status === activeTab;
            const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (c.couponCode?.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery]);

    const activeCount = mockCampaigns.filter(c => c.status === CampaignStatus.Aktif).length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ paddingBottom: '40px' }}
        >
            {/* Header Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>Kampanyalar</h1>
                    <div style={{ fontSize: '13px', color: '#AEAEB2', marginTop: '2px' }}>{activeCount} aktif kampanya</div>
                </div>

                <Link href="/admin/kampanyalar/yeni" style={{ textDecoration: 'none' }}>
                    <motion.button
                        whileHover={{ scale: 1.02, y: -1, background: '#D4B87A' }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            background: '#C9A96E', border: 'none', borderRadius: '6px',
                            padding: '10px 20px', fontSize: '13px', fontWeight: 600,
                            color: '#0F0F10', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Plus size={18} /> Yeni Kampanya
                    </motion.button>
                </Link>
            </div>

            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <KpiMiniCard label="Aktif Kampanya" value="4" icon={<Target size={20} color="#C9A96E" />} />
                <KpiMiniCard label="Toplam Kullanım" value="679" icon={<Tag size={20} color="#0A84FF" />} />
                <KpiMiniCard label="Kampanya Geliri" value="₺7.738.050" icon={<BarChart3 size={20} color="#30D158" />} />
                <KpiMiniCard label="Ort. İndirim Oranı" value="%18.4" icon={<Percent size={20} color="#FFD60A" />} />
            </div>

            {/* Filter & Search Bar */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '20px'
            }}>
                <div style={{ display: 'flex', gap: '24px' }}>
                    {TABS.map(tab => {
                        const active = activeTab === tab.id;
                        const count = tab.id === 'Tümü' ? mockCampaigns.length : mockCampaigns.filter(c => c.status === tab.id).length;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '12px 0', fontSize: '13px', border: 'none', background: 'none',
                                    color: active ? '#F5F0EB' : '#636366', cursor: 'pointer',
                                    borderBottom: `2px solid ${active ? '#C9A96E' : 'transparent'}`,
                                    transition: 'all 150ms', position: 'relative'
                                }}
                            >
                                {tab.label} <span style={{ fontSize: '11px', color: '#636366', marginLeft: '4px' }}>({count})</span>
                            </button>
                        );
                    })}
                </div>

                <div style={{ position: 'relative', marginBottom: '8px' }}>
                    <Search size={14} color="#636366" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        placeholder="Kampanya ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '220px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px', padding: '7px 12px 7px 32px', fontSize: '12px', color: '#F5F0EB', outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Campaigns Grid */}
            <div className="campaign-grid">
                <AnimatePresence mode="popLayout">
                    {filteredCampaigns.map((campaign, idx) => (
                        <CampaignCard key={campaign.id} campaign={campaign} index={idx} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredCampaigns.length === 0 && (
                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Filter size={20} color="#636366" />
                    </div>
                    <h3 style={{ fontSize: '16px', color: '#AEAEB2', margin: 0 }}>Uyumlu kampanya bulunamadı</h3>
                    <p style={{ fontSize: '13px', color: '#636366', marginTop: '4px' }}>Filtreleri değiştirmeyi veya başka bir anahtar kelime aramayı deneyin.</p>
                </div>
            )}

            <style jsx>{`
        .campaign-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1280px) {
          .campaign-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .campaign-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </motion.div>
    );
}

function KpiMiniCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <div style={{
            background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '8px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px'
        }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: '#F5F0EB', marginTop: '2px' }}>{value}</div>
            </div>
        </div>
    );
}
