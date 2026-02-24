'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    ChevronDown,
    ArrowUpRight,
    PieChart as PieChartIcon,
    BarChart3 as BarChartIcon,
    TrendingUp
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const RANGE_OPTIONS = [
    { id: '1d', label: '1 Gün' },
    { id: '7d', label: '7 Gün' },
    { id: '15d', label: '15 Gün' },
    { id: '30d', label: 'Son 30 Gün' },
];

export default function AdminAnalyticsPage() {
    const [range, setRange] = useState('30d');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const chartData = useMemo(() => {
        const count = range === '1d' ? 24 : range === '7d' ? 7 : range === '15d' ? 15 : 30;
        const labels = range === '1d'
            ? Array.from({ length: 24 }, (_, i) => `${i}:00`)
            : Array.from({ length: count }, (_, i) => `${i + 1} Şub`);

        return labels.map(label => ({
            name: label,
            sales: Math.floor(Math.random() * 5000) + 1000,
        }));
    }, [range]);

    const activeRangeLabel = RANGE_OPTIONS.find(r => r.id === range)?.label || 'Son 30 Gün';

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-serif text-charcoal">Veri & Analitik</h1>
                    <p className="text-sm font-sans text-warm-gray mt-1">Showroom performansı ve satış trendleri.</p>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-3 px-6 py-3 bg-white border border-border rounded-2xl text-xs font-sans font-bold uppercase tracking-widest hover:bg-sand transition-all shadow-sm"
                    >
                        <Calendar size={16} className="text-gold" />
                        {activeRangeLabel}
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute right-0 mt-3 w-48 bg-white rounded-2xl border border-border shadow-2xl py-2 z-50 overflow-hidden"
                            >
                                {RANGE_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => {
                                            setRange(opt.id);
                                            setIsMenuOpen(false);
                                        }}
                                        className={`w-full text-left px-6 py-3 text-[10px] font-sans font-bold uppercase tracking-widest transition-colors ${range === opt.id ? 'text-gold bg-sand/50' : 'text-warm-gray hover:bg-sand/30'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Sales Chart */}
                <div className="lg:col-span-2 bg-white rounded-[32px] border border-border p-10 shadow-sm relative overflow-hidden group">
                    <div className="mb-10">
                        <h3 className="text-lg font-serif text-charcoal">Satış Trendi</h3>
                        <p className="text-xs font-sans text-warm-gray">{activeRangeLabel} bazlı gelir dağılımı</p>
                    </div>

                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fill: '#999', fontFamily: 'Inter' }}
                                    interval={range === '1d' ? 3 : range === '30d' ? 2 : 0}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 9, fill: '#999', fontFamily: 'Inter' }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#F8F9FA' }}
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                        fontSize: '11px',
                                        fontFamily: 'Inter'
                                    }}
                                />
                                <Bar
                                    dataKey="sales"
                                    radius={[8, 8, 0, 0]}
                                    barSize={range === '30d' ? 12 : range === '1d' ? 16 : 24}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index % 2 === 0 ? '#C6A355' : '#1D1D1D'}
                                            fillOpacity={0.9}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-3xl border border-border p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-sans font-bold text-charcoal uppercase tracking-widest">En Çok Satanlar</h3>
                            <PieChartIcon size={18} className="text-gold" />
                        </div>
                        <div className="space-y-6">
                            {[
                                { name: 'Oturma Odası', percentage: '42%' },
                                { name: 'Yatak Odası', percentage: '28%' },
                                { name: 'Aydınlatma', percentage: '18%' },
                                { name: 'Diğer', percentage: '12%' },
                            ].map((item, idx) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-gold' : idx === 1 ? 'bg-charcoal' : 'bg-sand'}`} />
                                        <span className="text-xs font-sans text-warm-gray font-medium">{item.name}</span>
                                    </div>
                                    <span className="text-xs font-sans font-bold text-charcoal">{item.percentage}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-charcoal rounded-3xl p-8 border border-border/50 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-gold mb-3">
                                <TrendingUp size={16} />
                                <span className="text-[10px] font-sans font-bold uppercase tracking-widest">AI İçgörü</span>
                            </div>
                            <p className="text-sm font-serif italic text-warm-gray leading-relaxed">
                                "Bu {activeRangeLabel.toLowerCase()} döneminde **3D Atölye** üzerinden yapılan konfigürasyonlar standart siparişlerden %24 daha yüksek dönüşüm sağladı."
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-[40px] -mr-16 -mt-16" />
                    </div>
                </div>
            </div>
        </div>
    );
}
