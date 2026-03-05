'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TimelineEvent } from '@/types/admin/orders';
import { formatDate } from '@/types/admin/orders';

interface OrderTimelineProps {
    events: TimelineEvent[];
}

export function OrderTimeline({ events }: OrderTimelineProps) {
    // Most recent first
    const sorted = [...events].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Sipariş Geçmişi</h3>
            </div>

            {/* Events */}
            <div style={{ padding: '16px 20px' }}>
                <AnimatePresence initial={false}>
                    {sorted.map((event, idx) => {
                        const { date, time } = formatDate(event.createdAt);
                        const isLast = idx === sorted.length - 1;
                        return (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                style={{ display: 'flex', gap: '14px', paddingBottom: isLast ? 0 : '16px', position: 'relative' }}
                            >
                                {/* Dot and connecting line */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: idx === 0 ? '#C9A96E' : 'rgba(255,255,255,0.15)', flexShrink: 0, marginTop: '3px', position: 'relative', zIndex: 1 }} />
                                    {!isLast && (
                                        <div style={{ width: '1px', flex: 1, background: 'rgba(255,255,255,0.06)', marginTop: '2px', minHeight: '16px' }} />
                                    )}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1, minWidth: 0, paddingBottom: isLast ? 0 : '4px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB', marginBottom: '3px' }}>{event.status}</div>
                                    <div style={{ fontSize: '12px', color: '#AEAEB2', marginBottom: '3px' }}>{event.description}</div>
                                    <div style={{ fontSize: '11px', color: '#636366' }}>
                                        {date} {time} &nbsp;·&nbsp; {event.createdBy}
                                    </div>
                                    {event.note && (
                                        <div style={{ marginTop: '6px', fontSize: '12px', color: '#AEAEB2', fontStyle: 'italic', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                                            <span style={{ color: '#636366', fontSize: '14px', lineHeight: 1 }}>&ldquo;</span>
                                            <span>{event.note}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
