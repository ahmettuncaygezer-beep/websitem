'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Percent, Tag, Truck, Package, Zap, ChevronDown,
    Search, X, Info, CheckCircle2, Save, Send, RefreshCcw
} from 'lucide-react';
import { CampaignType, CampaignStatus, TargetSegment } from '@/lib/mock/campaigns';
import { CouponGenerator } from './CouponGenerator';
import { CampaignCard } from './CampaignCard';

const campaignSchema = z.object({
    name: z.string().min(3, "Kampanya adı en az 3 karakter olmalıdır"),
    type: z.nativeEnum(CampaignType),
    discountValue: z.number().min(0.01, "İndirim değeri girmelisiniz"),
    couponCode: z.string().min(3, "Kupon kodu en az 3 karakter olmalıdır").optional().nullable(),
    usageLimit: z.number().int().positive().optional().nullable(),
    minOrderAmount: z.number().positive().optional().nullable(),
    startDate: z.string().min(1, "Başlangıç tarihi zorunludur"),
    endDate: z.string().min(1, "Bitiş tarihi zorunludur"),
}).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Bitiş tarihi başlangıç tarihinden sonra olmalı",
    path: ["endDate"]
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

export function CampaignForm() {
    const [selectedType, setSelectedType] = useState<CampaignType>(CampaignType.PercentDiscount);
    const [couponType, setCouponType] = useState<'single' | 'unique' | 'none'>('single');
    const [conditionsExpanded, setConditionsExpanded] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CampaignFormValues>({
        resolver: zodResolver(campaignSchema),
        defaultValues: {
            type: CampaignType.PercentDiscount,
            discountValue: 10,
            startDate: new Date().toISOString().slice(0, 16),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
        }
    });

    const formValues = watch();

    const onSubmit = async (data: CampaignFormValues) => {
        setSubmitting(true);
        console.log("Submit:", data);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitting(false);
        alert("Kampanya başarıyla oluşturuldu!");
    };

    const TYPE_CARDS = [
        { id: CampaignType.PercentDiscount, label: 'Yüzde İndirim', icon: Percent, color: '#C9A96E', desc: 'Sepet tutarına % oranında indirim.' },
        { id: CampaignType.FixedDiscount, label: 'Sabit İndirim', icon: Tag, color: '#D4B87A', desc: 'Net tutar indirimi uygular.' },
        { id: CampaignType.FreeShipping, label: 'Ücretsiz Kargo', icon: Truck, color: '#30D158', desc: 'Kargo ücretini sıfırlar.' },
        { id: CampaignType.Bundle, label: '2 Al 1 Öde', icon: Package, color: '#0A84FF', desc: 'Ürün gruplarına özel fırsatlar.' },
        { id: CampaignType.FlashSale, label: 'Flash Sale', icon: Zap, color: '#FF453A', desc: 'Süreli ve yüksek indirimli satış.' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'flex-start' }} className="campaign-form-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                {/* Temel Bilgiler Kartı */}
                <section style={{ background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Temel Bilgiler</h3>
                    </div>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <input
                                {...register('name')}
                                placeholder="Kampanya adını girin (Örn: Bahar Temizliği)"
                                style={{
                                    width: '100%', background: 'transparent', border: 'none', borderBottom: `2px solid ${errors.name ? '#FF453A' : 'rgba(255,255,255,0.08)'}`,
                                    padding: '12px 0', fontSize: '20px', fontWeight: 500, color: '#F5F0EB', outline: 'none',
                                    transition: 'border-color 200ms'
                                }}
                            />
                            {errors.name && <span style={{ fontSize: '11px', color: '#FF453A', marginTop: '4px', display: 'block' }}>{errors.name.message}</span>}
                        </div>

                        {/* Tip Seçiciler Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                            {TYPE_CARDS.map((card) => {
                                const active = selectedType === card.id;
                                return (
                                    <div
                                        key={card.id}
                                        onClick={() => {
                                            setSelectedType(card.id);
                                            setValue('type', card.id);
                                        }}
                                        style={{
                                            padding: '14px 10px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', transition: 'all 200ms',
                                            background: active ? `rgba(${card.id === CampaignType.FlashSale ? '255,69,58' : '201,169,110'}, 0.08)` : 'rgba(255,255,255,0.03)',
                                            border: `1px solid ${active ? card.color : 'rgba(255,255,255,0.06)'}`,
                                        }}
                                    >
                                        <card.icon size={22} color={card.color} style={{ marginBottom: '8px' }} />
                                        <div style={{ fontSize: '11px', fontWeight: 600, color: active ? '#F5F0EB' : '#AEAEB2' }}>{card.label}</div>
                                        <div style={{ fontSize: '9px', color: '#636366', marginTop: '4px', lineHeight: 1.2 }}>{card.desc}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Dinamik Tip Alanları */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedType}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '6px', borderLeft: `3px solid ${TYPE_CARDS.find(c => c.id === selectedType)?.color}` }}
                            >
                                {selectedType === CampaignType.PercentDiscount && (
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ fontSize: '12px', color: '#AEAEB2', display: 'block', marginBottom: '8px' }}>İndirim Oranı (%)</label>
                                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                <input
                                                    type="range" min="1" max="100"
                                                    value={formValues.discountValue || 10}
                                                    onChange={(e) => setValue('discountValue', Number(e.target.value))}
                                                    style={{ flex: 1, accentColor: '#C9A96E' }}
                                                />
                                                <input
                                                    type="number"
                                                    {...register('discountValue', { valueAsNumber: true })}
                                                    style={{ width: '60px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '6px', color: '#F5F0EB', textAlign: 'center' }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ padding: '8px 12px', background: 'rgba(201,169,110,0.05)', borderRadius: '4px', fontSize: '11px', color: '#AEAEB2' }}>
                                            Örn: ₺50.000 sepette <br /><b>₺{((formValues.discountValue || 10) * 500).toLocaleString()}</b> indirim sağlar.
                                        </div>
                                    </div>
                                )}
                                {selectedType === CampaignType.FixedDiscount && (
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ fontSize: '12px', color: '#AEAEB2', display: 'block', marginBottom: '8px' }}>İndirim Tutarı (₺)</label>
                                            <input
                                                type="number" {...register('discountValue', { valueAsNumber: true })}
                                                placeholder="Örn: 500"
                                                style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '10px', color: '#F5F0EB' }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ fontSize: '12px', color: '#AEAEB2', display: 'block', marginBottom: '8px' }}>Min. Sepet Tutarı (₺)</label>
                                            <input
                                                type="number" {...register('minOrderAmount', { valueAsNumber: true })}
                                                placeholder="Örn: 2000"
                                                style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '10px', color: '#F5F0EB' }}
                                            />
                                        </div>
                                    </div>
                                )}
                                {selectedType === CampaignType.FlashSale && (
                                    <div>
                                        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ fontSize: '12px', color: '#AEAEB2', display: 'block', marginBottom: '8px' }}>Flash İndirim (%)</label>
                                                <input type="number" {...register('discountValue', { valueAsNumber: true })} style={{ width: '100%', background: 'rgba(255,69,58,0.05)', border: '1px solid rgba(255,69,58,0.2)', borderRadius: '4px', padding: '10px', color: '#F5F0EB' }} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ fontSize: '12px', color: '#AEAEB2', display: 'block', marginBottom: '8px' }}>Geri Sayım Bitiş</label>
                                                <input type="datetime-local" style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '10px', color: '#F5F0EB', colorScheme: 'dark' }} />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <input type="checkbox" defaultChecked style={{ width: '14px', height: '14px' }} />
                                            <label style={{ fontSize: '12px', color: '#AEAEB2' }}>Sitede canlı geri sayım sayacı göster</label>
                                        </div>
                                    </div>
                                )}
                                {(selectedType === CampaignType.FreeShipping || selectedType === CampaignType.Bundle) && (
                                    <div style={{ fontSize: '12px', color: '#AEAEB2', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Info size={16} /> Tip detayları "Koşullar" sekmesi altında özelleştirilecektir.
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>

                {/* Koşullar Accordion */}
                <section style={{ background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <div
                        onClick={() => setConditionsExpanded(!conditionsExpanded)}
                        style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Koşullar ve Hedefleme</h3>
                            <span style={{ fontSize: '10px', background: 'rgba(201,169,110,0.1)', color: '#C9A96E', padding: '1px 8px', borderRadius: '10px' }}>4 Aktif</span>
                        </div>
                        <motion.div animate={{ rotate: conditionsExpanded ? 180 : 0 }}>
                            <ChevronDown size={18} color="#636366" />
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {conditionsExpanded && (
                            <motion.div
                                initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                                    <ConditionRow label="Min. Sipariş Tutarı" info="₺5000 ve üzeri">
                                        <input type="number" placeholder="5000" style={innerInputStyle} />
                                    </ConditionRow>
                                    <ConditionRow label="Hedef Müşteri Segmenti" info="Kimin göreceğini seçin">
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {[TargetSegment.Tümü, TargetSegment.YeniUyeler, TargetSegment.VIP, TargetSegment.Pasif].map(s => (
                                                <button key={s} type="button" style={{
                                                    padding: '6px 12px', fontSize: '11px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)',
                                                    background: formValues.name?.includes(s) ? 'rgba(201,169,110,0.1)' : 'transparent',
                                                    color: formValues.name?.includes(s) ? '#C9A96E' : '#636366'
                                                }}>{s}</button>
                                            ))}
                                        </div>
                                    </ConditionRow>
                                    <ConditionRow label="Kişi Başı Kullanım Limiti" info="Aynı müşteri X kez kullanabilir">
                                        <input type="number" placeholder="1" style={innerInputStyle} />
                                    </ConditionRow>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <ConditionRow label="Başlangıç Tarihi" info="Otomatik aktifleşme">
                                            <input type="datetime-local" {...register('startDate')} style={{ ...innerInputStyle, colorScheme: 'dark' }} />
                                        </ConditionRow>
                                        <ConditionRow label="Bitiş Tarihi" info="Kampanya sonu">
                                            <input type="datetime-local" {...register('endDate')} style={{ ...innerInputStyle, colorScheme: 'dark' }} />
                                        </ConditionRow>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Kupon Kodu Bileşeni */}
                <CouponGenerator
                    type={couponType}
                    onTypeChange={setCouponType}
                    value={formValues.couponCode || ''}
                    onChange={(v) => setValue('couponCode', v)}
                />
            </div>

            {/* Sağ Kolon: Önizleme ve Yayınlama */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '24px' }}>
                <div style={{ background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', padding: '20px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#636366', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '0.05em' }}>Kampanya Önizleme</h4>
                    <div style={{ transform: 'scale(0.9)', transformOrigin: 'top center', pointerEvents: 'none' }}>
                        <CampaignCard
                            index={0}
                            campaign={{
                                id: 'preview',
                                name: formValues.name || 'Örnek Kampanya Adı',
                                type: selectedType,
                                status: CampaignStatus.Aktif,
                                discountValue: formValues.discountValue || 10,
                                discountUnit: selectedType === CampaignType.FixedDiscount ? 'TL' : 'yüzde',
                                couponCode: couponType === 'none' ? null : (formValues.couponCode || 'SELIS20'),
                                usageCount: 0,
                                usageLimit: formValues.usageLimit || 100,
                                startDate: formValues.startDate || '',
                                endDate: formValues.endDate || '',
                                revenue: 0,
                                orders: 0,
                                description: '',
                                createdAt: '',
                                targetSegment: TargetSegment.Tümü,
                                validCategories: [],
                                validProducts: [],
                                isSingleUse: true,
                                minOrderAmount: null,
                                minProductCount: null,
                                perUserLimit: 1
                            }}
                        />
                    </div>
                    <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(48,209,88,0.05)', border: '1px solid rgba(48,209,88,0.1)', borderRadius: '6px' }}>
                        <div style={{ fontSize: '12px', color: '#30D158', fontWeight: 600 }}>Tasarruf Hesabı</div>
                        <p style={{ fontSize: '11px', color: '#AEAEB2', margin: '4px 0 0' }}>
                            ₺50.000 sipariş için müşteri
                            <b style={{ color: '#F5F0EB' }}> ₺{selectedType === CampaignType.FixedDiscount ? (formValues.discountValue || 0).toLocaleString() : (formValues.discountValue * 500).toLocaleString()} </b>
                            tasarruf eder.
                        </p>
                    </div>
                </div>

                <div style={{ background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', padding: '20px' }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 600, color: '#636366', textTransform: 'uppercase', marginBottom: '16px' }}>Yayınlama Seçenekleri</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button
                            type="submit"
                            disabled={submitting}
                            style={{
                                width: '100%', background: '#C9A96E', color: '#0F0F10', border: 'none',
                                padding: '12px', borderRadius: '6px', fontSize: '14px', fontWeight: 600,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                            }}
                        >
                            {submitting ? <RefreshCcw size={18} className="animate-spin" /> : <Send size={18} />}
                            Kampanyayı Başlat
                        </button>
                        <button
                            type="button"
                            style={{
                                width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                                padding: '12px', borderRadius: '6px', fontSize: '14px', color: '#AEAEB2', cursor: 'pointer'
                            }}
                        >
                            Taslağı Kaydet
                        </button>
                    </div>
                </div>
            </aside>

            <style jsx>{`
        @media (max-width: 1024px) {
          .campaign-form-grid {
            grid-template-columns: 1fr !important;
          }
          aside {
              position: static !important;
          }
        }
      `}</style>
        </form>
    );
}

function ConditionRow({ label, info, children }: { label: string, info: string, children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB' }}>{label}</div>
                <div style={{ fontSize: '10px', color: '#636366', marginTop: '1px' }}>{info}</div>
            </div>
            <div style={{ width: '180px' }}>{children}</div>
        </div>
    );
}

const innerInputStyle = {
    width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px', padding: '6px 10px', fontSize: '12px', color: '#F5F0EB', outline: 'none'
};
