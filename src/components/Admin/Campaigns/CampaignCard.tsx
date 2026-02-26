'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Tag, Calendar, Percent, Truck, Package, Zap, Copy,
    Check, Edit3, Pause, Play, ShoppingBag, TrendingUp
} from 'lucide-react';
import { type Campaign, CampaignType, CampaignStatus, formatPrice } from '@/lib/mock/campaigns';
import { FlashSaleTimer } from './FlashSaleTimer';

interface CampaignCardProps {
    campaign: Campaign;
    index: number;
}

const TYPE_CONFIG = {
    [CampaignType.PercentDiscount]: { icon: Percent, color: '#C9A96E', label: 'Yüzde İndirim' },
    [CampaignType.FixedDiscount]: { icon: Tag, color: '#D4B87A', label: 'Sabit İndirim' },
    [CampaignType.FreeShipping]: { icon: Truck, color: '#30D158', label: 'Ücretsiz Kargo' },
    [CampaignType.Bundle]: { icon: Package, color: '#0A84FF', label: 'Paket Kampanya' },
    [CampaignType.FlashSale]: { icon: Zap, color: '#FF453A', label: 'Flash Sale' },
};

const STATUS_CONFIG = {
    [CampaignStatus.Aktif]: { label: 'Aktif', bg: 'rgba(48,209,88,0.12)', color: '#30D158' },
    [CampaignStatus.Zamanlanmış]: { label: 'Zamanlanmış', bg: 'rgba(10,132,255,0.12)', color: '#0A84FF' },
    [CampaignStatus.SonaErdi]: { label: 'Sona Erdi', bg: 'rgba(255,255,255,0.06)', color: '#636366' },
    [CampaignStatus.Durduruldu]: { label: 'Durduruldu', bg: 'rgba(255,69,58,0.12)', color: '#FF453A' },
};

export function CampaignCard({ campaign, index }: CampaignCardProps) {
    const [copied, setCopied] = useState(false);
    const config = TYPE_CONFIG[campaign.type];
    const status = STATUS_CONFIG[campaign.status];

    const usagePct = campaign.usageLimit ? (campaign.usageCount / campaign.usageLimit) * 100 : 0;
    const progressColor = usagePct >= 100 ? '#FF453A' : (usagePct >= 80 ? '#FFD60A' : '#C9A96E');

    const handleCopy = () => {
        if (campaign.couponCode) {
            navigator.clipboard.writeText(campaign.couponCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const formatDateRange = (start: string, end: string) => {
        const s = new Date(start);
        const e = new Date(end);
        const months = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
        return `${s.getDate()} ${months[s.getMonth()]} — ${e.getDate()} ${months[e.getMonth()]} ${e.getFullYear()}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -2, borderColor: 'rgba(201,169,110,0.2)' }}
            style={{
                background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px', overflow: 'hidden', cursor: 'default', transition: 'all 200ms'
            }}
        >
            {/* Type Strip */}
            <div style={{ height: '4px', background: config.color }} />

            <div style={{ padding: '18px 20px' }}>
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <config.icon size={18} color={config.color} />
                        <span style={{ fontSize: '10px', fontWeight: 600, color: '#636366', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {config.label}
                        </span>
                    </div>
                    <div style={{
                        fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px',
                        background: status.bg, color: status.color
                    }}>
                        {status.label}
                    </div>
                </div>

                {/* Campaign Name */}
                <h3 style={{
                    fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 500,
                    color: '#F5F0EB', marginTop: '10px', marginBottom: 0, lineHeight: 1.3
                }}>
                    {campaign.name}
                </h3>

                {/* Discount Value Display */}
                <div style={{ marginTop: '8px' }}>
                    {campaign.type === CampaignType.PercentDiscount || campaign.type === CampaignType.FlashSale ? (
                        <div style={{
                            fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 600,
                            color: campaign.type === CampaignType.FlashSale ? '#FF453A' : '#C9A96E',
                            display: 'flex', alignItems: 'baseline'
                        }}>
                            <span style={{ fontSize: '18px', marginRight: '2px' }}>%</span>
                            {campaign.discountValue}
                        </div>
                    ) : campaign.type === CampaignType.FixedDiscount ? (
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 600, color: '#C9A96E' }}>
                            ₺{campaign.discountValue.toLocaleString()}
                        </div>
                    ) : campaign.type === CampaignType.FreeShipping ? (
                        <div style={{ fontSize: '20px', fontWeight: 600, color: '#30D158' }}>Ücretsiz Kargo</div>
                    ) : (
                        <div style={{ fontSize: '20px', fontWeight: 600, color: '#0A84FF' }}>2 Al 1 Öde</div>
                    )}
                </div>

                {/* Flash Sale Timer */}
                {campaign.type === CampaignType.FlashSale && campaign.status === CampaignStatus.Aktif && campaign.flashSaleEndDate && (
                    <div style={{ marginTop: '12px' }}>
                        <FlashSaleTimer endDate={campaign.flashSaleEndDate} />
                    </div>
                )}

                {/* Coupon Code Satırı */}
                <div style={{ marginTop: '16px' }}>
                    {campaign.couponCode ? (
                        <div style={{
                            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '5px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <Tag size={12} color="#636366" />
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', fontWeight: 600,
                                color: '#F5F0EB', letterSpacing: '0.05em', flex: 1
                            }}>
                                {campaign.couponCode}
                            </span>
                            <button
                                onClick={handleCopy}
                                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#636366' }}
                            >
                                {copied ? <Check size={14} color="#30D158" /> : <Copy size={14} />}
                            </button>
                        </div>
                    ) : (
                        <div style={{ fontSize: '12px', color: '#636366', fontStyle: 'italic' }}>Kodsuz kampanya</div>
                    )}
                </div>

                {/* Usage Row */}
                <div style={{ marginTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', color: '#AEAEB2' }}>
                            {campaign.usageCount} / {campaign.usageLimit || '∞'} kullanım
                        </span>
                        {campaign.usageLimit && (
                            <span style={{ fontSize: '10px', fontWeight: 600, color: progressColor }}>
                                %{Math.round(usagePct)}
                            </span>
                        )}
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(usagePct, 100)}%` }}
                            style={{ height: '100%', background: progressColor, borderRadius: '2px' }}
                        />
                    </div>
                </div>

                {/* Date Row */}
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={11} color="#636366" />
                    <span style={{ fontSize: '11px', color: '#636366' }}>
                        {formatDateRange(campaign.startDate, campaign.endDate)}
                    </span>
                </div>

                {/* Bottom Actions & Stats */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.04)', marginTop: '14px',
                    paddingTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', fontWeight: 600, color: campaign.status === CampaignStatus.SonaErdi ? '#636366' : '#F5F0EB' }}>
                            {formatPrice(campaign.revenue)}
                        </div>
                        <div style={{ fontSize: '10px', color: '#636366', textTransform: 'uppercase' }}>
                            {campaign.orders} Sipariş
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '5px', padding: '5px 10px', fontSize: '11px', color: '#AEAEB2', cursor: 'pointer'
                        }}>Düzenle</button>

                        {campaign.status === CampaignStatus.Aktif ? (
                            <button style={{
                                background: 'transparent', border: '1px solid rgba(255,69,58,0.2)',
                                borderRadius: '5px', padding: '5px 10px', fontSize: '11px', color: '#FF453A', cursor: 'pointer'
                            }}>Durdur</button>
                        ) : campaign.status === CampaignStatus.SonaErdi ? (
                            <button style={{
                                background: 'transparent', border: '1px solid rgba(10,132,255,0.2)',
                                borderRadius: '5px', padding: '5px 10px', fontSize: '11px', color: '#0A84FF', cursor: 'pointer'
                            }}>Tekrarla</button>
                        ) : null}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
