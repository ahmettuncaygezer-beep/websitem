'use client';

import { motion } from 'framer-motion';
import {
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    ShoppingBag,
    Users,
    Clock,
    Sparkles,
    Eye,
    PackageCheck
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

const data = [
    { name: 'Pzt', sales: 4000, visits: 2400 },
    { name: 'Sal', sales: 3000, visits: 1398 },
    { name: 'Çar', sales: 2000, visits: 9800 },
    { name: 'Per', sales: 2780, visits: 3908 },
    { name: 'Cum', sales: 1890, visits: 4800 },
    { name: 'Cmt', sales: 2390, visits: 3800 },
    { name: 'Paz', sales: 3490, visits: 4300 },
];

const stats = [
    { label: 'Toplam Satış', value: '₺842.500', trend: '+12.5%', icon: TrendingUp, positive: true },
    { label: 'Aktif Sipariş', value: '38', trend: '+4', icon: ShoppingBag, positive: true },
    { label: 'Ziyaretçi', value: '12.4K', trend: '+8%', icon: Eye, positive: true },
    { label: 'Dönüşüm Oranı', value: '3.2%', trend: '-0.4%', icon: PackageCheck, positive: false },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-10">
            {/* Header / KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-[24px] border border-border shadow-sm hover:shadow-xl transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-sand/30 rounded-2xl text-charcoal group-hover:bg-gold group-hover:text-white transition-colors">
                                <stat.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-sans font-bold px-2 py-1 rounded-full ${stat.positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                }`}>
                                {stat.trend}
                                {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            </div>
                        </div>
                        <div className="text-[10px] font-sans font-bold text-warm-gray uppercase tracking-widest">{stat.label}</div>
                        <div className="text-2xl font-serif text-charcoal mt-1">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Sales Overlook */}
                <div className="lg:col-span-2 bg-white rounded-[32px] border border-border p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-serif text-charcoal">Satış Performansı</h3>
                            <p className="text-xs font-sans text-warm-gray">Haftalık gelir ve ziyaret verileri</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gold" />
                                <span className="text-[10px] font-sans font-bold uppercase text-warm-gray">Satış</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-charcoal" />
                                <span className="text-[10px] font-sans font-bold uppercase text-warm-gray">Ziyaret</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C6A355" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#C6A355" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#999', fontFamily: 'Inter' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#999', fontFamily: 'Inter' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                        fontSize: '12px'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#C6A355"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#1D1D1D"
                                    strokeWidth={1}
                                    strokeDasharray="5 5"
                                    fill="none"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Conversion / Category Insight */}
                <div className="bg-charcoal rounded-[32px] p-8 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-6">
                            <Sparkles size={14} className="text-gold" />
                            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold">AI Insight</span>
                        </div>
                        <h4 className="text-2xl font-serif mb-4 leading-snug">"Oturma odası" kategorisindeki 3D görüntüleme oranı bu hafta %42 arttı.</h4>
                        <p className="text-sm font-sans text-warm-gray leading-relaxed">
                            Müşterileriniz en çok 'Bastiano Köşe Koltuk' modelini 360° inceliyor. Bu ürün için 'Shop the Room' kampanası başlatmanızı öneririm.
                        </p>
                    </div>

                    <div className="mt-8 relative z-10 pt-8 border-t border-white/10 flex items-center justify-between">
                        <div>
                            <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-warm-gray">Tahmini Gelir Artışı</div>
                            <div className="text-3xl font-serif text-gold">+₺124.000</div>
                        </div>
                        <button className="bg-gold text-white p-4 rounded-2xl hover:bg-gold/80 transition-all">
                            <ArrowUpRight size={24} />
                        </button>
                    </div>

                    {/* BG Animation */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                </div>
            </div>
        </div>
    );
}
