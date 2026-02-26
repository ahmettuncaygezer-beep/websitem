'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
    BarChart3, Download, ChevronDown, SlidersHorizontal,
    TrendingUp, ArrowUpRight, ArrowDownRight, Share2, Globe, Mail, Users, ArrowRight
} from 'lucide-react';
import {
    mockDailySales, mockFunnelData, mockHeatmapData,
    mockCityData, mockCategorySales, mockProductPerformance,
    formatCurrency
} from '@/lib/mock/analytics';

// Dynamic imports with Skeletons
const SalesChart = dynamic(() => import('@/components/Admin/Analytics/SalesChart').then(mod => mod.SalesChart), {
    ssr: false, loading: () => <Skeleton height={420} />
});
const FunnelChart = dynamic(() => import('@/components/Admin/Analytics/FunnelChart').then(mod => mod.FunnelChart), {
    ssr: false, loading: () => <Skeleton height={480} />
});
const HeatmapCalendar = dynamic(() => import('@/components/Admin/Analytics/HeatmapCalendar').then(mod => mod.HeatmapCalendar), {
    ssr: false, loading: () => <Skeleton height={400} />
});
const CategoryPie = dynamic(() => import('@/components/Admin/Analytics/CategoryPie').then(mod => mod.CategoryPie), {
    ssr: false, loading: () => <Skeleton height={420} />
});
const TopCities = dynamic(() => import('@/components/Admin/Analytics/TopCities').then(mod => mod.TopCities), {
    ssr: false, loading: () => <Skeleton height={480} />
});
const ProductPerformance = dynamic(() => import('@/components/Admin/Analytics/ProductPerformance').then(mod => mod.ProductPerformance), {
    ssr: false, loading: () => <Skeleton height={500} />
});

function Skeleton({ height }: { height: number }) {
    return (
        <div style={{
            height, background: 'rgba(255,255,255,0.04)', borderRadius: '8px', marginBottom: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#636366', fontSize: '13px'
        }}>
            <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                Grafik Hazırlanıyor...
            </motion.div>
        </div>
    );
}

// ── KPI Card Component ──────────────────────────────────────────────────
interface KpiCardProps {
    label: string;
    value: string;
    trend: string;
    isPositive: boolean;
    active: boolean;
    onClick: () => void;
}

function KpiCard({ label, value, trend, isPositive, active, onClick }: KpiCardProps) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            style={{
                background: '#1C1C1E', padding: '16px 20px', borderRadius: '8px', cursor: 'pointer',
                border: `1px solid ${active ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.05)'}`,
                boxShadow: active ? '0 0 20px rgba(201,169,110,0.1)' : 'none', transition: 'all 200ms'
            }}
        >
            <div style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                {isPositive ? <ArrowUpRight size={14} color="#30D158" /> : <ArrowDownRight size={14} color="#FF453A" />}
                <span style={{ fontSize: '12px', fontWeight: 600, color: isPositive ? '#30D158' : '#FF453A' }}>{trend}</span>
            </div>
        </motion.div>
    );
}

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];
const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
};

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState('Bu Ay');
    const [compareEnabled, setCompareEnabled] = useState(false);
    const [activeMetric, setActiveMetric] = useState<'revenue' | 'orders' | 'visitors'>('revenue');
    const [period, setPeriod] = useState<'Günlük' | 'Haftalık' | 'Aylık'>('Günlük');
    const [reportLoading, setReportLoading] = useState(false);

    const handleDownload = (format: string) => {
        setReportLoading(true);
        setTimeout(() => {
            setReportLoading(false);
            alert(`${format} başarıyla oluşturuldu.`);
        }, 1500);
    };

    return (
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.06 }}>
            {/* Header Row */}
            <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: easeOut }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>Analytics</h1>
                    <div style={{ fontSize: '12px', color: '#636366', marginTop: '2px' }}>Son güncelleme: bugün 09:14</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Comparison Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: '#636366' }}>Önceki Dönemle Karşılaştır</span>
                        <button
                            onClick={() => setCompareEnabled(!compareEnabled)}
                            style={{
                                width: '32px', height: '18px', borderRadius: '20px', position: 'relative', cursor: 'pointer',
                                background: compareEnabled ? '#C9A96E' : 'rgba(255,255,255,0.1)', border: 'none', transition: 'all 200ms'
                            }}
                        >
                            <motion.div
                                animate={{ x: compareEnabled ? 16 : 2 }}
                                style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#F5F0EB', position: 'absolute', top: '2px' }}
                            />
                        </button>
                    </div>

                    {/* Date Selector */}
                    <div style={{ position: 'relative' }}>
                        <select
                            value={dateRange}
                            onChange={e => setDateRange(e.target.value)}
                            style={{
                                appearance: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '6px', padding: '8px 30px 8px 14px', fontSize: '13px', color: '#AEAEB2', outline: 'none', cursor: 'pointer'
                            }}
                        >
                            <option>Bugün</option>
                            <option>Bu Hafta</option>
                            <option>Bu Ay</option>
                            <option>Son 30 Gün</option>
                            <option>Son 90 Gün</option>
                        </select>
                        <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#636366', pointerEvents: 'none' }} />
                    </div>

                    {/* Export Button */}
                    <button
                        disabled={reportLoading}
                        onClick={() => handleDownload('PDF')}
                        style={{
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
                            padding: '8px 16px', fontSize: '12px', color: '#AEAEB2', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        {reportLoading ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                <SlidersHorizontal size={14} />
                            </motion.div>
                        ) : <Download size={14} />}
                        {reportLoading ? 'Hazırlanıyor...' : 'Raporu İndir'}
                    </button>
                </div>
            </motion.div>

            {/* KPI Cards Grid */}
            <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: easeOut }} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }} className="kpi-grid">
                <KpiCard label="Toplam Gelir" value="₺1.247.890" trend="+%18.3" isPositive={true} active={activeMetric === 'revenue'} onClick={() => setActiveMetric('revenue')} />
                <KpiCard label="Toplam Sipariş" value="847" trend="+%12.1" isPositive={true} active={activeMetric === 'orders'} onClick={() => setActiveMetric('orders')} />
                <KpiCard label="Ort. Sipariş Değeri" value="₺1.473" trend="+%5.6" isPositive={true} active={false} onClick={() => { }} />
                <KpiCard label="Dönüşüm Oranı" value="%5.0" trend="+%0.3" isPositive={true} active={false} onClick={() => { }} />
            </motion.div>

            {/* Main Chart Section */}
            <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: easeOut }}>
                <SalesChart
                    data={mockDailySales}
                    metric={activeMetric}
                    compareEnabled={compareEnabled}
                    period={period}
                    onPeriodChange={setPeriod}
                />
            </motion.div>

            {/* Two Column Section 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '55% 1fr', gap: '20px', marginBottom: '20px' }} className="responsive-grid">
                <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: easeOut }}>
                    <FunnelChart data={mockFunnelData} />
                </motion.div>
                <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: easeOut }}>
                    <CategoryPie data={mockCategorySales} />
                </motion.div>
            </div>

            {/* Heatmap Section */}
            <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: easeOut }}>
                <HeatmapCalendar data={mockHeatmapData} />
            </motion.div>

            {/* Two Column Section 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '55% 1fr', gap: '20px', marginBottom: '20px' }} className="responsive-grid">
                <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: easeOut }}>
                    <TopCities data={mockCityData} />
                </motion.div>

                {/* Customer Segmentation Shortcut Card */}
                <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: easeOut }} style={{ background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Müşteri Segmentasyonu</h2>
                    </div>
                    <div style={{ flex: 1, padding: '24px', textAlign: 'center' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <SegmentStat value="612" label="Geri Dönen" color="#C9A96E" />
                            <SegmentStat value="234" label="Yeni" color="#0A84FF" />
                            <SegmentStat value="47" label="VIP" color="#FFD60A" />
                            <SegmentStat value="354" label="Kayıp" color="#FF453A" />
                        </div>
                        <div style={{ marginTop: '24px', textAlign: 'left', background: 'rgba(10,132,255,0.05)', border: '1px solid rgba(10,132,255,0.1)', padding: '12px', borderRadius: '6px' }}>
                            <div style={{ fontSize: '12px', color: '#0A84FF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <TrendingUp size={14} /> Segment Analizi
                            </div>
                            <p style={{ fontSize: '11px', color: '#AEAEB2', marginTop: '4px' }}>En değerli segmentiniz Geri Dönen (%48), VIP segmentinde %4'lük bir artış var.</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Product Table */}
            <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: easeOut }}>
                <ProductPerformance data={mockProductPerformance} />
            </motion.div>

            {/* Traffic Section */}
            <motion.div variants={itemVariants} transition={{ duration: 0.3, ease: easeOut }} style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Trafik Kaynakları</h2>
                    <div style={{ background: 'rgba(255,214,10,0.08)', border: '1px solid rgba(255,214,10,0.15)', borderRadius: '4px', padding: '3px 10px', fontSize: '11px', color: '#FFD60A' }}>
                        GA Bağlantısı Aktif Değil
                    </div>
                </div>
                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="kpi-grid">
                    <TrafficSource label="Organik" value="48.2K" percent="%42" isPos={true} icon={<Globe size={18} />} />
                    <TrafficSource label="Direkt" value="23.9K" percent="%21" isPos={true} icon={<ArrowRight size={18} />} />
                    <TrafficSource label="Sosyal" value="18.5K" percent="%16" isPos={false} icon={<Share2 size={18} />} />
                    <TrafficSource label="E-Posta" value="12.4K" percent="%11" isPos={true} icon={<Mail size={18} />} />
                </div>
            </motion.div>

            <style jsx>{`
        @media (max-width: 1024px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .kpi-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </motion.div>
    );
}

function SegmentStat({ value, label, color }: { value: string, label: string, color: string }) {
    return (
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color }}>{value}</div>
            <div style={{ fontSize: '10px', color: '#636366', textTransform: 'uppercase', marginTop: '2px' }}>{label}</div>
        </div>
    );
}

function TrafficSource({ label, value, percent, isPos, icon }: any) {
    return (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#636366' }}>
                    {icon}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: isPos ? '#30D158' : '#FF453A' }}>
                    {isPos ? '+' : '-'}3.4%
                </div>
            </div>
            <div style={{ fontSize: '11px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: '#F5F0EB', marginTop: '4px' }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#AEAEB2', marginTop: '2px' }}>{percent} toplam trafik</div>
        </div>
    );
}
