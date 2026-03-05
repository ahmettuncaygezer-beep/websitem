'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Target, Tag, BarChart3, Percent,
    Filter, RefreshCcw, Ticket
} from 'lucide-react';
import Link from 'next/link';
import { CampaignStatus, formatPrice } from '@/types/admin/campaigns';
import { CampaignCard } from '@/components/Admin/Campaigns/CampaignCard';
import { CouponCard } from '@/components/Admin/Campaigns/CouponCard';
import CouponModal from '@/components/Admin/Campaigns/CouponModal';
import toast from 'react-hot-toast';

const TABS = [
    { id: 'Tümü', label: 'Tümü' },
    { id: 'Aktif', label: 'Aktif' },
    { id: 'Zamanlanmış', label: 'Zamanlanmış' },
    { id: 'draft', label: 'Taslak' },
    { id: 'SonaErdi', label: 'Sona Erdi' },
    { id: 'Durduruldu', label: 'Durduruldu' },
    { id: 'Kuponlar', label: 'Gelişmiş Kuponlar' },
];

export default function CampaignsPage() {
    const [activeTab, setActiveTab] = useState('Tümü');
    const [searchQuery, setSearchQuery] = useState('');
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [coupons, setCoupons] = useState<any[]>([]);
    const [kpi, setKpi] = useState({ aktifCount: 0, totalUsage: 0, totalRevenue: 0, avgDiscount: 0 });
    const [loading, setLoading] = useState(true);

    // Modal states
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch Campaigns
            const resCamp = await fetch('/api/admin/campaigns');
            const dataCamp = await resCamp.json();
            setCampaigns(dataCamp.campaigns || []);
            if (dataCamp.kpi) setKpi(dataCamp.kpi);

            // Fetch Coupons
            const resCoup = await fetch('/api/admin/coupons');
            const dataCoup = await resCoup.json();
            setCoupons(dataCoup || []);
        } catch (err) {
            console.error('[Campaigns] Fetch error:', err);
            toast.error('Veriler yüklenirken hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredCampaigns = useMemo(() => {
        return campaigns.filter(c => {
            const matchesTab = activeTab === 'Tümü' || c.status === activeTab;
            const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (c.couponCode?.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchQuery, campaigns]);

    const filteredCoupons = useMemo(() => {
        return coupons.filter(c =>
            c.code.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, coupons]);

    const handleDeleteCoupon = async (id: string) => {
        if (!confirm('Bu kuponu silmek istediğinize emin misiniz?')) return;
        try {
            const res = await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Silme işlemi başarısız');
            toast.success('Kupon silindi');
            fetchData();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const handleEditCoupon = (coupon: any) => {
        setSelectedCoupon(coupon);
        setShowCouponModal(true);
    };

    const handleAddNew = () => {
        if (activeTab === 'Kuponlar') {
            setSelectedCoupon(null);
            setShowCouponModal(true);
        } else {
            // Redirect to new campaign page or show modal
            window.location.href = '/admin/kampanyalar/yeni';
        }
    };

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
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>
                        {activeTab === 'Kuponlar' ? 'Gelişmiş Kuponlar' : 'Kampanyalar'}
                    </h1>
                    <div style={{ fontSize: '13px', color: '#AEAEB2', marginTop: '2px' }}>
                        {activeTab === 'Kuponlar' ? `${coupons.length} toplam kupon tanımlı` : `${kpi.aktifCount} aktif kampanya`}
                        {!loading && <span style={{ color: '#30D158', marginLeft: '8px' }}>● Canlı</span>}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={fetchData}
                        style={{
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
                            padding: '10px 14px', color: '#AEAEB2', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                            fontSize: '12px'
                        }}
                    >
                        <RefreshCcw size={14} /> Yenile
                    </button>

                    <motion.button
                        onClick={handleAddNew}
                        whileHover={{ scale: 1.02, y: -1, background: '#D4B87A' }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            background: '#C9A96E', border: 'none', borderRadius: '6px',
                            padding: '10px 20px', fontSize: '13px', fontWeight: 600,
                            color: '#0F0F10', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        <Plus size={18} /> {activeTab === 'Kuponlar' ? 'Yeni Kupon' : 'Yeni Kampanya'}
                    </motion.button>
                </div>
            </div>

            {/* KPI Stats Grid - Only show for campaigns */}
            {activeTab !== 'Kuponlar' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <KpiMiniCard label="Aktif Kampanya" value={String(kpi.aktifCount)} icon={<Target size={20} color="#C9A96E" />} />
                    <KpiMiniCard label="Toplam Kullanım" value={String(kpi.totalUsage)} icon={<Tag size={20} color="#0A84FF" />} />
                    <KpiMiniCard label="Kampanya Geliri" value={formatPrice(kpi.totalRevenue)} icon={<BarChart3 size={20} color="#30D158" />} />
                    <KpiMiniCard label="Ort. İndirim Oranı" value={`%${kpi.avgDiscount}`} icon={<Percent size={20} color="#FFD60A" />} />
                </div>
            )}

            {/* Filter & Search Bar */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '20px'
            }}>
                <div style={{ display: 'flex', gap: '24px', overflowX: 'auto' }} className="no-scrollbar">
                    {TABS.map(tab => {
                        const active = activeTab === tab.id;
                        let count = 0;
                        if (tab.id === 'Kuponlar') count = coupons.length;
                        else if (tab.id === 'Tümü') count = campaigns.length;
                        else count = campaigns.filter(c => c.status === tab.id).length;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    padding: '12px 0', fontSize: '13px', border: 'none', background: 'none',
                                    color: active ? '#F5F0EB' : '#636366', cursor: 'pointer',
                                    borderBottom: `2px solid ${active ? '#C9A96E' : 'transparent'}`,
                                    transition: 'all 150ms', position: 'relative',
                                    whiteSpace: 'nowrap'
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
                        placeholder={`${activeTab === 'Kuponlar' ? 'Kupon' : 'Kampanya'} ara...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '220px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px', padding: '7px 12px 7px 32px', fontSize: '12px', color: '#F5F0EB', outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Loading */}
            {loading && (
                <div style={{ padding: '60px 0', textAlign: 'center' }}>
                    <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        <span style={{ color: '#636366', fontSize: '13px' }}>Veriler yükleniyor...</span>
                    </motion.div>
                </div>
            )}

            {/* Content Grid */}
            {!loading && (
                <>
                    <div className="campaign-grid">
                        <AnimatePresence mode="popLayout">
                            {activeTab === 'Kuponlar' ? (
                                filteredCoupons.map((coupon, idx) => (
                                    <CouponCard
                                        key={coupon.id}
                                        coupon={coupon}
                                        onEdit={handleEditCoupon}
                                        onDelete={handleDeleteCoupon}
                                    />
                                ))
                            ) : (
                                filteredCampaigns.map((campaign, idx) => (
                                    <CampaignCard key={campaign.id} campaign={campaign} index={idx} onDeleted={fetchData} />
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {((activeTab === 'Kuponlar' && filteredCoupons.length === 0) || (activeTab !== 'Kuponlar' && filteredCampaigns.length === 0)) && (
                        <div style={{ padding: '80px 0', textAlign: 'center' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                <Ticket size={20} color="#636366" />
                            </div>
                            <h3 style={{ fontSize: '16px', color: '#AEAEB2', margin: 0 }}>
                                {activeTab === 'Kuponlar' ? (coupons.length === 0 ? 'Henüz kupon yok' : 'Uyumlu kupon bulunamadı') : (campaigns.length === 0 ? 'Henüz kampanya yok' : 'Uyumlu kampanya bulunamadı')}
                            </h3>
                            <p style={{ fontSize: '13px', color: '#636366', marginTop: '4px' }}>
                                Yeni bir {activeTab === 'Kuponlar' ? 'kupon' : 'kampanya'} oluşturarak başlayın.
                            </p>
                        </div>
                    )}
                </>
            )}

            {/* Coupon Modal */}
            <CouponModal
                open={showCouponModal}
                onClose={() => setShowCouponModal(false)}
                coupon={selectedCoupon}
                onSuccess={fetchData}
            />

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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
