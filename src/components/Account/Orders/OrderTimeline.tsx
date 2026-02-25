'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Check, Package, Truck, Home } from 'lucide-react';
import type { Order } from '@/types/account.types';

const STEPS = [
    { key: 'confirmed', icon: Check, label: 'Sipariş Alındı' },
    { key: 'preparing', icon: Package, label: 'Hazırlanıyor' },
    { key: 'shipped', icon: Truck, label: 'Kargoda' },
    { key: 'delivered', icon: Home, label: 'Teslim Edildi' },
];

const STATUS_ORDER = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered'];

export function OrderTimeline({ order }: { order: Order }) {
    const currentIdx = STATUS_ORDER.indexOf(order.status);
    if (order.status === 'cancelled' || order.status === 'returned') return null;

    return (
        <div className="p-5 mb-4" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
            <h3 className="text-[15px] font-semibold mb-6" style={{ color: '#1C1C1E' }}>Sipariş Durumu</h3>

            {/* Desktop: horizontal */}
            <div className="hidden md:flex items-start justify-between relative">
                {/* Line */}
                <div className="absolute top-5 left-[10%] right-[10%] h-0.5" style={{ background: '#F0EDE8' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (Math.max(0, currentIdx) / (STEPS.length - 1)) * 100)}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full"
                        style={{ background: '#C9A96E' }}
                    />
                </div>

                {STEPS.map((step, i) => {
                    const isDone = i <= currentIdx;
                    const isActive = i === currentIdx;
                    const Icon = step.icon;
                    return (
                        <div key={step.key} className="flex flex-col items-center text-center relative z-10" style={{ flex: '1' }}>
                            <motion.div
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.15 }}
                                className="flex items-center justify-center rounded-full mb-2"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    background: isDone ? '#C9A96E' : 'white',
                                    border: isDone ? 'none' : '2px solid #E8E3DC',
                                    boxShadow: isActive ? '0 0 0 4px rgba(201,169,110,0.2)' : 'none',
                                }}
                            >
                                <Icon size={18} color={isDone ? 'white' : '#CCC'} />
                            </motion.div>
                            <p className="text-[11px] font-medium" style={{ color: isDone ? '#1C1C1E' : '#CCC' }}>{step.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Mobile: vertical */}
            <div className="md:hidden flex flex-col gap-4">
                {STEPS.map((step, i) => {
                    const isDone = i <= currentIdx;
                    const Icon = step.icon;
                    return (
                        <div key={step.key} className="flex items-center gap-3">
                            <div
                                className="flex items-center justify-center rounded-full flex-shrink-0"
                                style={{ width: '32px', height: '32px', background: isDone ? '#C9A96E' : 'white', border: isDone ? 'none' : '2px solid #E8E3DC' }}
                            >
                                <Icon size={14} color={isDone ? 'white' : '#CCC'} />
                            </div>
                            <p className="text-[12px] font-medium" style={{ color: isDone ? '#1C1C1E' : '#CCC' }}>{step.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Tracking info */}
            {order.status === 'shipped' && order.trackingNumber && (
                <div className="mt-6 p-4 rounded-lg" style={{ background: '#F5F0EB' }}>
                    <p className="text-[12px] font-medium" style={{ color: '#666' }}>Kargo Takip No</p>
                    <div className="flex items-center gap-2 mt-1">
                        <code className="text-[14px] font-bold" style={{ color: '#1C1C1E' }}>{order.trackingNumber}</code>
                        <button
                            onClick={() => navigator.clipboard.writeText(order.trackingNumber!)}
                            className="text-[11px] px-2 py-0.5 rounded"
                            style={{ background: '#C9A96E', color: 'white', border: 'none', cursor: 'pointer' }}
                        >
                            Kopyala
                        </button>
                    </div>
                    {order.trackingUrl && (
                        <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-[12px] font-medium" style={{ color: '#C9A96E' }}>
                            Kargo Sitesinde Takip Et →
                        </a>
                    )}
                </div>
            )}

            {/* Estimated delivery */}
            <div className="mt-4 text-center">
                <p className="text-[11px]" style={{ color: '#999' }}>Tahmini Teslimat</p>
                <p className="text-[14px] font-semibold" style={{ color: '#C9A96E' }}>
                    {format(new Date(order.estimatedDelivery), 'd MMMM yyyy', { locale: tr })}
                </p>
            </div>
        </div>
    );
}
