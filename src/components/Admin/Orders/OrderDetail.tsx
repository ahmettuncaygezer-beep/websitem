'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, MapPin, Truck, Calendar, Lock, Save, Download, Send, Check } from 'lucide-react';
import type { Order, OrderStatus } from '@/lib/mock/orders';
import { formatPrice, STATUS_CONFIG } from '@/lib/mock/orders';

interface OrderDetailProps {
    order: Order;
    onUpdateOrder: (updated: Order) => void;
}

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

export function OrderDetail({ order, onUpdateOrder }: OrderDetailProps) {
    const [adminNote, setAdminNote] = useState(order.adminNote);
    const [isSavingNote, setIsSavingNote] = useState(false);
    const [cargoCompany, setCargoCompany] = useState(order.cargoCompany ?? '');
    const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber ?? '');
    const [isUpdatingCargo, setIsUpdatingCargo] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyAddress = () => {
        const text = `${order.shippingAddress.fullName}\n${order.shippingAddress.phone}\n${order.shippingAddress.address}\n${order.shippingAddress.district} / ${order.shippingAddress.city}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSaveNote = async () => {
        setIsSavingNote(true);
        await new Promise(r => setTimeout(r, 600));
        onUpdateOrder({ ...order, adminNote });
        setIsSavingNote(false);
    };

    const handleUpdateCargo = async () => {
        setIsUpdatingCargo(true);
        await new Promise(r => setTimeout(r, 600));
        onUpdateOrder({ ...order, cargoCompany, trackingNumber });
        setIsUpdatingCargo(false);
    };

    const statusCfg = STATUS_CONFIG[order.status];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Header Info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                        background: statusCfg.bg,
                        color: statusCfg.color,
                        fontSize: '13px',
                        fontWeight: 500,
                        padding: '5px 14px',
                        borderRadius: '20px'
                    }}>
                        {order.status}
                    </span>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>
                        {order.orderNo}
                    </h2>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
                        padding: '8px 16px', fontSize: '12px', color: '#AEAEB2',
                        background: 'transparent', cursor: 'pointer', transition: 'all 150ms'
                    }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Download size={14} /> Fatura İndir PDF
                    </button>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px',
                        padding: '8px 16px', fontSize: '12px', color: '#AEAEB2',
                        background: 'transparent', cursor: 'pointer', transition: 'all 150ms'
                    }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <Send size={14} /> Makbuz Gönder
                    </button>
                </div>
            </div>

            <p style={{ fontSize: '13px', color: '#636366', margin: '0 0 4px' }}>
                {new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} tarihinde oluşturuldu
            </p>

            {/* Items List */}
            <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Sipariş Kalemleri</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {order.items.map((item, idx) => (
                        <div key={item.id} style={{
                            padding: '14px 20px',
                            borderBottom: idx === order.items.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.03)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px'
                        }}>
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '6px',
                                background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(255,255,255,0.04)',
                                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '24px'
                            }}>
                                {item.image}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB', marginBottom: '4px' }}>{item.productName}</div>
                                {item.variantName && (
                                    <span style={{
                                        fontSize: '11px', color: '#AEAEB2',
                                        background: 'rgba(255,255,255,0.04)',
                                        padding: '2px 8px', borderRadius: '3px',
                                        display: 'inline-block', marginBottom: '4px'
                                    }}>
                                        {item.variantName}
                                    </span>
                                )}
                                <div style={{ fontSize: '12px', color: '#636366' }}>{item.quantity} adet</div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '12px', color: '#636366', marginBottom: '2px' }}>{formatPrice(item.unitPrice)}</div>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(item.totalPrice)}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pricing Summary */}
                <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#AEAEB2' }}>
                            <span>Ara Toplam</span>
                            <span style={{ color: '#F5F0EB' }}>{formatPrice(order.subtotal)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#AEAEB2' }}>
                            <span>Kargo Ücreti</span>
                            {order.shippingCost === 0 ? (
                                <span style={{ color: '#30D158' }}>Ücretsiz</span>
                            ) : (
                                <span style={{ color: '#F5F0EB' }}>{formatPrice(order.shippingCost)}</span>
                            )}
                        </div>
                        {order.discount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#AEAEB2' }}>
                                <span>İndirim</span>
                                <span style={{ color: '#FF453A' }}>-{formatPrice(order.discount)}</span>
                            </div>
                        )}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            borderTop: '1px solid rgba(255,255,255,0.08)', margin: '8px 0 0', padding: '12px 0 0',
                            fontSize: '15px', fontWeight: 600, color: '#F5F0EB'
                        }}>
                            <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>GENEL TOPLAM</span>
                            <span style={{ fontSize: '18px', color: '#C9A96E' }}>{formatPrice(order.total)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery Info */}
            <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Teslimat Bilgileri</h3>
                    <button
                        onClick={handleCopyAddress}
                        style={{
                            background: 'transparent', border: 'none', color: copied ? '#30D158' : '#636366',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px'
                        }}
                    >
                        {copied ? <Check size={14} /> : <Copy size={14} />} Adresi Kopyala
                    </button>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#636366' }}>
                            <MapPin size={18} />
                        </div>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB', marginBottom: '4px' }}>{order.shippingAddress.fullName}</div>
                            <div style={{ fontSize: '12px', color: '#AEAEB2', marginBottom: '2px' }}>{order.shippingAddress.phone}</div>
                            <div style={{ fontSize: '12px', color: '#AEAEB2', lineHeight: 1.5 }}>
                                {order.shippingAddress.address}<br />
                                {order.shippingAddress.district} / {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <Truck size={14} style={{ color: '#636366' }} />
                            <span style={{ fontSize: '12px', fontWeight: 500, color: '#636366', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kargo Bilgileri</span>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '11px', color: '#636366', display: 'block', marginBottom: '6px' }}>Kargo Firması</label>
                                <select
                                    value={cargoCompany}
                                    onChange={e => setCargoCompany(e.target.value)}
                                    style={{
                                        width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#F5F0EB', outline: 'none'
                                    }}
                                >
                                    <option value="">Seçiniz...</option>
                                    <option value="Yex Kargo">Yex Kargo</option>
                                    <option value="Aras Kargo">Aras Kargo</option>
                                    <option value="MNG Kargo">MNG Kargo</option>
                                    <option value="PTT Kargo">PTT Kargo</option>
                                </select>
                            </div>
                            <div style={{ flex: 1.5 }}>
                                <label style={{ fontSize: '11px', color: '#636366', display: 'block', marginBottom: '6px' }}>Takip Numarası</label>
                                <input
                                    type="text"
                                    value={trackingNumber}
                                    onChange={e => setTrackingNumber(e.target.value)}
                                    placeholder="Takip no girin..."
                                    style={{
                                        width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '6px', padding: '8px 12px', fontSize: '13px', color: '#F5F0EB', outline: 'none', fontFamily: "'JetBrains Mono', monospace"
                                    }}
                                />
                            </div>
                            <button
                                onClick={handleUpdateCargo}
                                disabled={isUpdatingCargo}
                                style={{
                                    padding: '9px 16px', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)',
                                    borderRadius: '6px', fontSize: '12px', color: '#C9A96E', cursor: 'pointer', transition: 'all 150ms'
                                }}
                            >
                                {isUpdatingCargo ? '...' : 'Güncelle'}
                            </button>
                        </div>

                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Calendar size={14} style={{ color: '#636366' }} />
                            <span style={{ fontSize: '12px', color: '#AEAEB2' }}>
                                Tahmini Teslimat: <strong>{order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString('tr-TR') : 'Belirlenmedi'}</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Note */}
            <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Yönetici Notu</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.5 }}>
                            <Lock size={10} style={{ color: '#636366' }} />
                            <span style={{ fontSize: '10px', color: '#636366', textTransform: 'uppercase' }}>Müşteri görmez</span>
                        </div>
                    </div>
                    <button
                        onClick={handleSaveNote}
                        disabled={isSavingNote || adminNote === order.adminNote}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'transparent', border: 'none', color: isSavingNote ? '#636366' : (adminNote === order.adminNote ? '#636366' : '#C9A96E'),
                            cursor: (isSavingNote || adminNote === order.adminNote) ? 'default' : 'pointer', fontSize: '12px'
                        }}
                    >
                        {isSavingNote ? 'Kaydediliyor...' : <><Save size={14} /> Kaydet</>}
                    </button>
                </div>
                <div style={{ padding: '20px' }}>
                    <textarea
                        value={adminNote}
                        onChange={e => setAdminNote(e.target.value)}
                        placeholder="Sipariş hakkında not alın..."
                        style={{
                            width: '100%', minHeight: '80px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px', padding: '12px', fontSize: '13px', color: '#F5F0EB', outline: 'none', resize: 'vertical',
                            fontFamily: 'Inter, system-ui, sans-serif', lineHeight: 1.6
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                    />
                </div>
            </div>

        </div>
    );
}
