'use client';

import React, { useState, useMemo } from 'react';
import { SettingsPageHeader } from '@/components/Admin/Settings/SettingsPageHeader';
import { IntegrationCard } from '@/components/Admin/Settings/Integrations/IntegrationCard';
import { IntegrationModal } from '@/components/Admin/Settings/Integrations/IntegrationModal';
import { Search, Filter } from 'lucide-react';

const INTEGRATIONS = [
    { id: 'ga4', name: 'Google Analytics 4', desc: 'Web trafiği ve dönüşüm takibi.', logo: '📈', connected: true, category: 'Analytics' },
    { id: 'sc', name: 'Search Console', desc: 'SEO performansı ve indeksleme izleme.', logo: '🔍', connected: true, category: 'Analytics' },
    { id: 'pixel', name: 'Facebook Pixel', desc: 'Meta reklam verimliliği takibi.', logo: '📸', connected: false, category: 'Marketing' },
    { id: 'mailchimp', name: 'Mailchimp', desc: 'E-posta bülten ve otomasyon.', logo: '🐒', connected: true, category: 'Marketing' },
    { id: 'trendyol', name: 'Trendyol Partner', desc: 'Ürün ve stok senkronizasyonu.', logo: '🧡', connected: false, category: 'Ecommerce' },
    { id: 'whatsapp', name: 'WhatsApp Business', desc: 'Müşteri destek ve bildirimler.', logo: '💬', connected: false, category: 'Communication' },
    { id: 'cloudinary', name: 'Cloudinary', desc: 'Görsel optimizasyon ve CDN.', logo: '☁️', connected: true, category: 'Storage' },
    { id: 'aws', name: 'AWS S3', desc: 'Güvenli dosya depolama çözümü.', logo: '📦', connected: false, category: 'Storage' },
];

const CATEGORIES = ['Tümü', 'Analytics', 'Marketing', 'Ecommerce', 'Communication', 'Storage'];

export default function EntegrasyonAyarlarPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tümü');
    const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredIntegrations = useMemo(() => {
        return INTEGRATIONS.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeCategory === 'Tümü' || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [search, activeCategory]);

    const handleConfigure = (id: string) => {
        const item = INTEGRATIONS.find(i => i.id === id);
        setSelectedIntegration(item);
        setIsModalOpen(true);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SettingsPageHeader
                title="Entegrasyonlar"
                description="Mağazanıza güç veren üçüncü parti servis ve platformlar."
                isDirty={false}
                onSave={() => { }}
            />

            <div style={filterBarStyle}>
                <div style={searchWrapperStyle}>
                    <Search size={16} color="#636366" style={searchIconStyle} />
                    <input
                        type="text"
                        placeholder="Entegrasyon ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={searchInputStyle}
                    />
                </div>

                <div style={tabGroupStyle}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={activeCategory === cat ? activeTabStyle : inactiveTabStyle}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={gridStyle}>
                {filteredIntegrations.map(item => (
                    <IntegrationCard
                        key={item.id}
                        integration={item}
                        onConnect={handleConfigure}
                        onConfigure={handleConfigure}
                        onDisconnect={() => { }}
                    />
                ))}

                {filteredIntegrations.length === 0 && (
                    <div style={emptyStyle}>Aradığınız kriterlere uygun entegrasyon bulunamadı.</div>
                )}
            </div>

            <IntegrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                integration={selectedIntegration}
            />
        </div>
    );
}

const filterBarStyle = { display: 'flex', flexDirection: 'column' as any, gap: '20px', marginBottom: '32px' };
const searchWrapperStyle = { position: 'relative' as any, maxWidth: '400px' };
const searchIconStyle = { position: 'absolute' as any, left: '12px', top: '50%', transform: 'translateY(-50%)' };
const searchInputStyle = { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 14px 10px 40px', color: '#F5F0EB', fontSize: '14px', outline: 'none' };
const tabGroupStyle = { display: 'flex', flexWrap: 'wrap' as any, gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '4px', borderRadius: '10px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.05)' };
const activeTabStyle = { padding: '8px 16px', borderRadius: '8px', background: 'rgba(201,169,110,0.1)', color: '#C9A96E', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer' };
const inactiveTabStyle = { padding: '8px 16px', borderRadius: '8px', background: 'transparent', color: '#636366', fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' };
const emptyStyle = { gridColumn: 'span 3', padding: '100px 0', textAlign: 'center' as any, color: '#636366', fontSize: '14px' };
