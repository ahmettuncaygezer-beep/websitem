'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Order, OrderStatus } from '@/types/admin/orders';
import { STATUS_CONFIG, STATUS_FLOW, getNextStatuses } from '@/types/admin/orders';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

interface OrderActionsProps {
    order: Order;
    onStatusUpdate: (newStatus: OrderStatus, note: string) => Promise<void>;
}

function StatusDot({ state }: { state: 'done' | 'active' | 'future' }) {
    if (state === 'done') {
        return (
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#30D158', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={12} strokeWidth={2.5} color="white" />
            </div>
        );
    }
    if (state === 'active') {
        return (
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#C9A96E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0F0F10' }} />
            </div>
        );
    }
    return (
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', flexShrink: 0 }} />
    );
}

export function OrderActions({ order, onStatusUpdate }: OrderActionsProps) {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');
    const [note, setNote] = useState('');
    const [sendSms, setSendSms] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const nextStatuses = getNextStatuses(order.status);
    const currentIdx = STATUS_FLOW.indexOf(order.status);
    const isTerminal = order.status === 'İptal' || order.status === 'İade Talebi' || order.status === 'Teslim Edildi';

    const inputStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px', color: '#F5F0EB', fontFamily: 'Inter, system-ui, sans-serif',
        outline: 'none', transition: 'border-color 150ms', width: '100%', boxSizing: 'border-box',
    };

    async function handleUpdate() {
        if (!selectedStatus) return;
        setIsUpdating(true);
        await onStatusUpdate(selectedStatus as OrderStatus, note);
        setIsUpdating(false);
        setSelectedStatus('');
        setNote('');
    }

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', position: 'sticky', top: '88px' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Durum Yönetimi</h3>
            </div>

            <div style={{ padding: '20px' }}>
                {/* Status badge for terminal states */}
                {isTerminal ? (
                    <div style={{ marginBottom: '20px', textAlign: 'center', padding: '16px', borderRadius: '8px', background: STATUS_CONFIG[order.status].bg, border: `1px solid ${STATUS_CONFIG[order.status].color}30` }}>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: STATUS_CONFIG[order.status].color }}>{order.status}</div>
                        <div style={{ fontSize: '12px', color: '#636366', marginTop: '4px' }}>Bu sipariş için daha fazla işlem yoktur.</div>
                    </div>
                ) : (
                    /* Status stepper */
                    <div style={{ marginBottom: '20px' }}>
                        {STATUS_FLOW.map((step, idx) => {
                            const state: 'done' | 'active' | 'future' = idx < currentIdx ? 'done' : idx === currentIdx ? 'active' : 'future';
                            const isLast = idx === STATUS_FLOW.length - 1;
                            return (
                                <div key={step}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0' }}>
                                        <StatusDot state={state} />
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: state === 'active' ? 600 : 500, color: state === 'done' ? '#30D158' : state === 'active' ? '#F5F0EB' : '#636366', transition: 'color 200ms' }}>
                                                {step}
                                            </div>
                                            {state === 'active' && (
                                                <div style={{ fontSize: '11px', color: '#636366', marginTop: '1px' }}>Mevcut durum</div>
                                            )}
                                        </div>
                                    </div>
                                    {!isLast && (
                                        <div style={{ height: '16px', width: '1px', background: idx < currentIdx ? '#30D158' : 'rgba(255,255,255,0.08)', marginLeft: '10px' }} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Update section */}
                {nextStatuses.length > 0 && (
                    <div>
                        <div style={{ fontSize: '10px', fontWeight: 500, color: '#636366', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                            Durumu Güncelle
                        </div>

                        {/* Status select */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value as OrderStatus | '')}
                            style={{
                                ...inputStyle, padding: '9px 30px 9px 12px', fontSize: '13px', marginBottom: '10px',
                                appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23636366' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
                            }}
                            onFocus={(e) => ((e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                            onBlur={(e) => ((e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                        >
                            <option value="">Yeni durum seçin...</option>
                            {nextStatuses.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>

                        {/* Note */}
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="İsteğe bağlı not ekle..."
                            rows={2}
                            style={{ ...inputStyle, padding: '8px 10px', fontSize: '12px', resize: 'vertical', marginBottom: '10px', minHeight: '60px', lineHeight: 1.6 }}
                            onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                            onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                        />

                        {/* SMS toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#AEAEB2' }}>Müşteriye SMS gönder</span>
                            <div
                                role="switch"
                                aria-checked={sendSms}
                                onClick={() => setSendSms((v) => !v)}
                                style={{ width: '34px', height: '18px', borderRadius: '9px', background: sendSms ? '#C9A96E' : 'rgba(255,255,255,0.12)', position: 'relative', transition: 'background 150ms', cursor: 'pointer' }}
                            >
                                <div style={{ position: 'absolute', top: '2px', left: sendSms ? '18px' : '2px', width: '14px', height: '14px', borderRadius: '50%', background: 'white', transition: 'left 150ms' }} />
                            </div>
                        </div>

                        {/* Update button */}
                        <motion.button
                            onClick={handleUpdate}
                            disabled={!selectedStatus || isUpdating}
                            whileHover={!isUpdating && selectedStatus ? { scale: 1.01 } : {}}
                            whileTap={!isUpdating && selectedStatus ? { scale: 0.99 } : {}}
                            style={{ width: '100%', padding: '10px', background: selectedStatus ? '#C9A96E' : 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, color: selectedStatus ? '#0F0F10' : '#636366', cursor: selectedStatus ? 'pointer' : 'default', fontFamily: 'Inter, system-ui, sans-serif', transition: 'background 150ms', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                            {isUpdating ? (
                                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg> Güncelleniyor...</>
                            ) : 'Durumu Güncelle'}
                        </motion.button>
                    </div>
                )}
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
