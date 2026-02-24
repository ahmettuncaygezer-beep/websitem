'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    Plus,
    MoreHorizontal,
    Search,
    Calendar,
    Hammer
} from 'lucide-react';

const COLUMNS = [
    { id: 'beklemede', label: 'Beklemede', icon: Clock, color: 'border-red-200' },
    { id: 'uretimde', label: 'Atölyede', icon: Hammer, color: 'border-gold/30' },
    { id: 'kontrol', label: 'Kalite Kontrol', icon: CheckCircle2, color: 'border-blue-200' },
    { id: 'teslimat', label: 'Sevkiyat', icon: Truck, color: 'border-green-200' },
];

const INITIAL_ORDERS = [
    { id: 'MSN-48192', customer: 'Elif Yıldız', price: '₺32.400', items: 2, status: 'uretimde', priority: 'high' },
    { id: 'MSN-48193', customer: 'Can Özkan', price: '₺18.200', items: 1, status: 'beklemede', priority: 'medium' },
    { id: 'MSN-48194', customer: 'Selin Demir', price: '₺42.500', items: 5, status: 'uretimde', priority: 'high' },
    { id: 'MSN-48195', customer: 'Kerem Aras', price: '₺8.900', items: 1, status: 'kontrol', priority: 'low' },
    { id: 'MSN-48196', customer: 'Deniz Kaya', price: '₺15.600', items: 2, status: 'teslimat', priority: 'medium' },
];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState(INITIAL_ORDERS);

    const getOrdersForColumn = (colId: string) => orders.filter(o => o.status === colId);

    return (
        <div className="h-full flex flex-col gap-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-serif text-charcoal">Sipariş Boru Hattı</h1>
                    <p className="text-sm font-sans text-warm-gray mt-1">Üretimden teslimata tüm süreç yönetimi.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" size={16} />
                        <input
                            placeholder="Sipariş ID, Müşteri..."
                            className="pl-11 pr-4 py-3 bg-white border border-border rounded-2xl text-xs font-sans w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-charcoal text-white rounded-2xl text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-black transition-all">
                        <Plus size={16} /> Manuel Sipariş
                    </button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {COLUMNS.map((col) => (
                    <div key={col.id} className="min-w-[320px] flex flex-col gap-4">
                        {/* Column Header */}
                        <div className={`p-5 bg-white rounded-2xl border-l-4 ${col.color} shadow-sm flex items-center justify-between`}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-sand/30 rounded-lg text-charcoal">
                                    <col.icon size={18} />
                                </div>
                                <div>
                                    <div className="text-xs font-sans font-bold text-charcoal">{col.label}</div>
                                    <div className="text-[10px] font-sans text-warm-gray">{getOrdersForColumn(col.id).length} Sipariş</div>
                                </div>
                            </div>
                            <button className="text-warm-gray hover:text-charcoal"><MoreHorizontal size={18} /></button>
                        </div>

                        {/* Order Cards */}
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
                            <AnimatePresence mode="popLayout">
                                {getOrdersForColumn(col.id).map((order) => (
                                    <motion.div
                                        key={order.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-white p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing border-l-2 hover:border-l-gold"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-sans font-bold text-warm-gray uppercase tracking-widest">{order.id}</span>
                                            {order.priority === 'high' && (
                                                <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[8px] font-sans font-bold uppercase rounded-full">Acil</span>
                                            )}
                                        </div>
                                        <div className="text-sm font-sans font-bold text-charcoal mb-4">{order.customer}</div>

                                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-sans text-warm-gray uppercase tracking-tighter">Toplam</span>
                                                <span className="text-xs font-sans font-bold text-charcoal">{order.price}</span>
                                            </div>
                                            <div className="flex -space-x-2">
                                                {[1, 2].map(i => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-sand flex items-center justify-center text-[10px] font-sans font-bold text-warm-gray">
                                                        <Package size={12} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2 text-[9px] font-sans font-bold text-gold uppercase tracking-[0.1em] px-3 py-1.5 bg-gold/5 rounded-xl w-fit">
                                            <Calendar size={12} />
                                            12 Mart Teslimat
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
