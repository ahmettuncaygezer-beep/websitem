'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initialLiveEvents, liveEventPool } from '@/lib/mock/analytics';
import type { LiveEvent } from '@/lib/mock/analytics';

let eventIdCounter = 100;

export function LiveActivity() {
    const [events, setEvents] = useState<LiveEvent[]>(initialLiveEvents);
    const poolRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const next = liveEventPool[poolRef.current % liveEventPool.length];
            poolRef.current++;
            const newEvent: LiveEvent = { ...next, id: `le-${++eventIdCounter}`, time: 'Şimdi' };
            setEvents((prev) => [newEvent, ...prev].slice(0, 8));
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                background: '#1C1C1E',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '18px 20px',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>
                    Canlı Aktivite
                </h2>

                {/* Pulse dot */}
                <span
                    style={{
                        display: 'inline-block',
                        width: '7px', height: '7px',
                        borderRadius: '50%',
                        background: '#30D158',
                        animation: 'pulse-green 2s infinite',
                        flexShrink: 0,
                    }}
                    aria-hidden="true"
                />
                <style>{`
          @keyframes pulse-green {
            0%, 100% { opacity: 1; transform: scale(1); }
            50%       { opacity: 0.5; transform: scale(0.75); }
          }
        `}</style>

                <span
                    style={{
                        fontSize: '10px', fontWeight: 600,
                        letterSpacing: '0.1em', color: '#30D158',
                    }}
                >
                    CANLI
                </span>
            </div>

            {/* Activity list */}
            <div style={{ padding: '8px 0' }} role="log" aria-live="polite" aria-label="Canlı aktivite akışı">
                <AnimatePresence initial={false}>
                    {events.map((event, idx) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '10px',
                                padding: '10px 20px',
                                borderBottom: idx < events.length - 1
                                    ? '1px solid rgba(255,255,255,0.03)'
                                    : 'none',
                                transition: 'all 300ms',
                            }}
                        >
                            {/* Text */}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '12px', color: '#AEAEB2', lineHeight: 1.5 }}>
                                    {event.message}
                                </div>
                                <div style={{ fontSize: '10px', color: '#636366', marginTop: '2px' }}>
                                    {event.time}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
