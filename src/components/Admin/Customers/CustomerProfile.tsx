'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Edit2, Mail, Phone, Copy, Check, Star, Shield, AlertTriangle,
    MapPin, Calendar, Clock, TrendingUp, RotateCcw, Wallet
} from 'lucide-react';
import {
    Customer,
    SEGMENT_CONFIG,
    getAvatarColor,
    getAvatarTextColor,
    formatPrice
} from '@/lib/mock/customers';

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    canCopy?: boolean;
}

function InfoRow({ icon, label, value, canCopy }: InfoRowProps) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <div style={{ color: '#636366' }}>{icon}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '13px', color: '#AEAEB2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
                {canCopy && (
                    <button
                        onClick={handleCopy}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px', color: copied ? '#30D158' : '#636366' }}
                    >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                )}
            </div>
        </div>
    );
}

interface StatBoxProps {
    label: string;
    value: string;
    color?: string;
}

function StatBox({ label, value, color = '#F5F0EB' }: StatBoxProps) {
    return (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
            <div style={{ fontSize: '10px', color: '#636366', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>{label}</div>
        </div>
    );
}

interface CustomerProfileProps {
    customer: Customer;
}

export function CustomerProfile({ customer }: CustomerProfileProps) {
    const [editMode, setEditMode] = useState(false);
    const isVip = customer.segment === 'VIP';
    const config = SEGMENT_CONFIG[customer.segment];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '88px' }}>
            {/* Main Profile Card */}
            <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                {isVip && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #C9A96E, rgba(201,169,110,0.3), transparent)' }} />
                )}

                <div style={{ padding: '24px 20px 20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', position: 'relative' }}>
                    <button
                        onClick={() => setEditMode(!editMode)}
                        style={{
                            position: 'absolute', top: '16px', right: '16px', width: '28px', height: '28px', borderRadius: '4px',
                            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                            color: editMode ? '#C9A96E' : '#636366', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <Edit2 size={14} />
                    </button>

                    <div style={{
                        width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 14px',
                        background: getAvatarColor(customer.segment), display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: isVip ? '2px solid #C9A96E' : 'none', position: 'relative',
                        boxShadow: isVip ? '0 0 20px rgba(201,169,110,0.2)' : 'none'
                    }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: getAvatarTextColor(customer.segment) }}>
                            {customer.avatar}
                        </span>
                        <div style={{
                            position: 'absolute', bottom: -4, right: -4, width: '20px', height: '20px', borderRadius: '50%',
                            background: config.bg, border: '2px solid #1C1C1E', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: config.color
                        }}>
                            {customer.segment === 'VIP' && <Star size={10} fill="currentColor" />}
                            {customer.segment === 'Sadık' && <Shield size={10} fill="currentColor" />}
                            {customer.segment === 'Risk' && <AlertTriangle size={10} fill="currentColor" />}
                        </div>
                    </div>

                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>
                        {customer.firstName} {customer.lastName}
                    </h2>

                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '6px',
                        background: config.bg, border: `1px solid ${config.color}33`, borderRadius: '20px', padding: '3px 12px',
                        fontSize: '11px', fontWeight: 600, color: config.color
                    }}>
                        {customer.segment === 'VIP' && <Star size={10} fill="currentColor" />}
                        {config.label.toUpperCase()}
                    </div>

                    <div style={{ marginTop: '14px' }}>
                        <InfoRow icon={<Mail size={14} />} label="Email" value={customer.email} canCopy />
                        <InfoRow icon={<Phone size={14} />} label="Telefon" value={customer.phone} canCopy />
                    </div>

                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '11px', color: '#636366' }}>
                            <Calendar size={12} /> Kayıt: {new Date(customer.registeredAt).toLocaleDateString('tr-TR')}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', fontSize: '11px', color: '#636366' }}>
                            <Clock size={12} /> Son Giriş: {new Date(customer.lastLoginAt).toLocaleDateString('tr-TR')}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(255,255,255,0.01)' }}>
                    <StatBox label="Top. Sipariş" value={customer.totalOrders.toString()} />
                    <StatBox label="Top. Harcama" value={formatPrice(customer.totalSpent)} color="#C9A96E" />
                    <StatBox label="Ort. Sipariş" value={formatPrice(customer.averageOrderValue)} />
                    <StatBox label="İade Sayısı" value={customer.returnCount.toString()} color={customer.returnCount > 0 ? '#FF453A' : '#F5F0EB'} />
                    <StatBox label="Selis Puan" value={customer.selisPoints.toString()} color="#FFD60A" />
                    <StatBox label="Bağlılık" value={customer.segment === 'VIP' ? '%98' : '%72'} />
                </div>
            </div>

            {/* Address List Card */}
            <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Kayıtlı Adresler</h3>
                    <span style={{ fontSize: '10px', color: '#636366', background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '10px' }}>
                        {customer.addresses.length}
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {customer.addresses.length > 0 ? customer.addresses.map((addr, idx) => (
                        <div
                            key={addr.id}
                            style={{ padding: '10px 16px', borderBottom: idx === customer.addresses.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.03)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 500, color: '#F5F0EB' }}>{addr.title}</div>
                                {addr.isDefault && (
                                    <span style={{ fontSize: '10px', color: '#30D158', background: 'rgba(48,209,88,0.1)', padding: '1px 6px', borderRadius: '3px' }}>
                                        Varsayılan
                                    </span>
                                )}
                            </div>
                            <div style={{ fontSize: '11px', color: '#636366', lineHeight: 1.5 }}>
                                {addr.address}, {addr.district} / {addr.city}
                            </div>
                        </div>
                    )) : (
                        <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: '#636366' }}>
                            Kayıtlı adres bulunamadı.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
