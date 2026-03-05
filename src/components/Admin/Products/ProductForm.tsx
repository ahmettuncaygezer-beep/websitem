'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Lock, Minus, Plus } from 'lucide-react';
import { ProductImageUpload } from './ProductImageUpload';
import { ProductVariants } from './ProductVariants';
import type { Product, VariantGroup, ProductStatus } from '@/types/admin/products';

// ── Zod schema ────────────────────────────────────────────────────────────────
const productSchema = z.object({
    name: z.string().min(3, 'Ürün adı en az 3 karakter olmalı'),
    slug: z.string().min(3, 'Slug en az 3 karakter olmalı'),
    sku: z.string().min(2, 'SKU en az 2 karakter olmalı'),
    barcode: z.string().optional(),
    price: z.number().min(0.01, "Fiyat 0'dan büyük olmalı"),
    comparePrice: z.number().min(0).optional(),
    costPrice: z.number().min(0).optional(),
    stock: z.number().int().min(0),
    stockTracking: z.boolean(),
    stockThreshold: z.number().int().min(0).optional(),
    category: z.string().min(1, 'Kategori seçin'),
    status: z.enum(['Aktif', 'Pasif', 'Taslak', 'Zamanlanmış']),
    tags: z.array(z.string()),
    description: z.string().optional(),
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

// ── Slug helper ───────────────────────────────────────────────────────────────
const trMap: Record<string, string> = { ş: 's', Ş: 's', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i', ö: 'o', Ö: 'o', ü: 'u', Ü: 'u', ç: 'c', Ç: 'c' };
function toSlug(s: string) {
    return s.split('').map((c) => trMap[c] ?? c).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ── Shared input style ────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '9px 12px', fontSize: '13px', color: '#F5F0EB',
    fontFamily: 'Inter, system-ui, sans-serif', outline: 'none', transition: 'border-color 150ms', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = { fontSize: '11px', fontWeight: 500, color: '#636366', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' };
const errorStyle: React.CSSProperties = { fontSize: '11px', color: '#FF453A', marginTop: '4px' };
const cardStyle: React.CSSProperties = { background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' };
const cardHeaderStyle: React.CSSProperties = { padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '14px', fontWeight: 600, color: '#F5F0EB' };
const cardBodyStyle: React.CSSProperties = { padding: '20px' };

const CATEGORIES = ['Koltuklar', 'Yatak Odası', 'Masalar', 'Dekorasyon', 'Depolama', 'Aydınlatma'];

// ── Props ─────────────────────────────────────────────────────────────────────
interface ProductFormProps {
    product?: Product;
    mode?: 'create' | 'edit';
}

export function ProductForm({ product, mode = 'create' }: ProductFormProps) {
    const router = useRouter();
    const [variantGroups, setVariantGroups] = useState<VariantGroup[]>(product?.variants ?? []);
    const [tags, setTags] = useState<string[]>(product?.tags ?? []);
    const [tagInput, setTagInput] = useState('');
    const [slugEditable, setSlugEditable] = useState(false);
    const [stockTracking, setStockTracking] = useState(product?.stockTracking ?? true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, watch, setValue, control, formState: { errors, isDirty } } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: product?.name ?? '',
            slug: product?.slug ?? '',
            sku: product?.sku ?? '',
            barcode: product?.barcode ?? '',
            price: product?.price ?? 0,
            comparePrice: product?.comparePrice ?? 0,
            costPrice: product?.costPrice ?? 0,
            stock: product?.stock ?? 0,
            stockTracking: product?.stockTracking ?? true,
            stockThreshold: product?.stockThreshold ?? 3,
            category: product?.category ?? '',
            status: (product?.status ?? 'Taslak') as ProductStatus,
            tags: product?.tags ?? [],
            description: '',
            metaTitle: product?.metaTitle ?? '',
            metaDescription: product?.metaDescription ?? '',
        },
    });

    const watchName = watch('name');
    const watchPrice = watch('price') ?? 0;
    const watchCostPrice = watch('costPrice') ?? 0;
    const watchMetaTitle = watch('metaTitle') ?? '';
    const watchMetaDesc = watch('metaDescription') ?? '';
    const watchStatus = watch('status');
    const watchSlug = watch('slug');
    const watchStock = watch('stock') ?? 0;

    // Auto-generate slug from name
    useEffect(() => {
        if (!slugEditable && watchName) setValue('slug', toSlug(watchName), { shouldDirty: true });
    }, [watchName, slugEditable, setValue]);

    // Ctrl/Cmd+S save
    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSubmit(onSubmit)(); }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    });

    // Warn on leave if dirty
    useEffect(() => {
        function handler(e: BeforeUnloadEvent) {
            if (isDirty) { e.preventDefault(); e.returnValue = ''; }
        }
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [isDirty]);

    const margin = watchPrice > 0 && watchCostPrice > 0
        ? ((watchPrice - watchCostPrice) / watchPrice * 100).toFixed(1)
        : null;
    const marginColor = margin == null ? '#636366' : Number(margin) < 30 ? '#FF453A' : '#FFD60A';

    function addTag(value: string) {
        const t = value.trim();
        if (t && !tags.includes(t)) { const next = [...tags, t]; setTags(next); setValue('tags', next); }
        setTagInput('');
    }
    function removeTag(t: string) { const next = tags.filter((x) => x !== t); setTags(next); setValue('tags', next); }

    async function onSubmit(data: ProductFormValues) {
        setIsSubmitting(true);
        console.log('Form data:', { ...data, tags, variantGroups });
        await new Promise((r) => setTimeout(r, 1000));
        setIsSubmitting(false);
        router.push('/admin/urunler');
    }

    function fieldBorderColor(fieldError: boolean, fieldSuccess: boolean): string {
        if (fieldError) return '#FF453A';
        if (fieldSuccess) return '#30D158';
        return 'rgba(255,255,255,0.08)';
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6 items-start">
                {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    {/* Product name card */}
                    <div style={cardStyle}>
                        <div style={cardBodyStyle}>
                            <input
                                {...register('name')}
                                placeholder="Ürün adını girin..."
                                disabled={isSubmitting}
                                style={{
                                    ...inputStyle,
                                    fontSize: '16px',
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    borderColor: fieldBorderColor(!!errors.name, !errors.name && !!watchName),
                                    padding: '12px 16px',
                                }}
                                onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)'; }}
                                onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = fieldBorderColor(!!errors.name, !errors.name && !!watchName); }}
                            />
                            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}

                            {/* Slug */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                                <span style={{ fontSize: '11px', color: '#636366', flexShrink: 0 }}>URL:</span>
                                {slugEditable ? (
                                    <input
                                        {...register('slug')}
                                        style={{ ...inputStyle, padding: '3px 8px', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", width: 'auto', flex: 1 }}
                                        onBlur={() => setSlugEditable(false)}
                                        autoFocus
                                    />
                                ) : (
                                    <span style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", color: '#AEAEB2', flex: 1 }}>
                                        {watchSlug || '—'}
                                    </span>
                                )}
                                <button type="button" onClick={() => setSlugEditable((v) => !v)} aria-label="Slug düzenle" style={{ background: 'transparent', border: 'none', color: '#636366', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}>
                                    <Pencil size={12} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Description card */}
                    <div style={cardStyle}>
                        <div style={cardHeaderStyle}>Açıklama</div>
                        <div style={{ padding: '0' }}>
                            {/* Toolbar */}
                            <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {['B', 'I', 'U', '—', 'H2', 'H3', '—', '•', '1.', '—', '"', '🔗'].map((btn, i) => (
                                    btn === '—' ? (
                                        <div key={i} style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)', margin: '4px 2px', alignSelf: 'center' }} />
                                    ) : (
                                        <button
                                            key={i} type="button"
                                            style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'transparent', border: 'none', color: '#636366', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 150ms', fontWeight: btn === 'B' ? 700 : 400 }}
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#636366'; }}
                                            aria-label={btn}
                                        >{btn}</button>
                                    )
                                ))}
                            </div>
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    {...register('description')}
                                    placeholder="Ürün açıklamasını girin..."
                                    disabled={isSubmitting}
                                    style={{ minHeight: '180px', background: 'transparent', border: 'none', outline: 'none', padding: '14px 16px', fontSize: '13px', color: '#F5F0EB', fontFamily: 'Inter, system-ui, sans-serif', resize: 'vertical', lineHeight: 1.7, width: '100%', boxSizing: 'border-box' }}
                                />
                                <div style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '11px', color: '#636366' }}>
                                    {watch('description')?.length ?? 0} karakter
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image upload card */}
                    <div style={cardStyle}>
                        <div style={cardHeaderStyle}>Görseller</div>
                        <div style={cardBodyStyle}>
                            <ProductImageUpload />
                        </div>
                    </div>

                    {/* Price & stock card */}
                    <div style={cardStyle}>
                        <div style={cardHeaderStyle}>Fiyat & Stok</div>
                        <div style={cardBodyStyle}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                                {/* Sale price */}
                                <div>
                                    <label style={labelStyle} htmlFor="price">Satış Fiyatı</label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#AEAEB2' }}>₺</span>
                                        <input id="price" type="number" step="0.01" min="0" {...register('price', { valueAsNumber: true })}
                                            disabled={isSubmitting}
                                            style={{ ...inputStyle, paddingLeft: '26px', borderColor: fieldBorderColor(!!errors.price, false), fontVariantNumeric: 'tabular-nums' }}
                                            onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                            onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = fieldBorderColor(!!errors.price, false))}
                                        />
                                    </div>
                                    {errors.price && <p style={errorStyle}>{errors.price.message}</p>}
                                </div>
                                {/* Compare price */}
                                <div>
                                    <label style={labelStyle} htmlFor="comparePrice">Karşılaştırma Fiyatı</label>
                                    <p style={{ fontSize: '10px', color: '#636366', margin: '0 0 6px' }}>İndirim öncesi fiyat</p>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#AEAEB2' }}>₺</span>
                                        <input id="comparePrice" type="number" step="0.01" min="0" {...register('comparePrice', { valueAsNumber: true })}
                                            disabled={isSubmitting}
                                            style={{ ...inputStyle, paddingLeft: '26px', color: '#636366', fontVariantNumeric: 'tabular-nums' }}
                                            onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                            onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                                        />
                                    </div>
                                </div>
                                {/* Cost price */}
                                <div>
                                    <label style={labelStyle} htmlFor="costPrice">
                                        <Lock size={10} style={{ display: 'inline', marginRight: '4px' }} />Maliyet Fiyatı
                                    </label>
                                    <p style={{ fontSize: '10px', color: '#636366', margin: '0 0 6px' }}>Müşterilere gösterilmez</p>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#AEAEB2' }}>₺</span>
                                        <input id="costPrice" type="number" step="0.01" min="0" {...register('costPrice', { valueAsNumber: true })}
                                            disabled={isSubmitting}
                                            style={{ ...inputStyle, paddingLeft: '26px', fontVariantNumeric: 'tabular-nums' }}
                                            onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                            onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Margin indicator */}
                            {margin && (
                                <div style={{ fontSize: '12px', color: marginColor, marginBottom: '20px', padding: '8px 12px', background: `${marginColor}14`, borderRadius: '6px', border: `1px solid ${marginColor}30` }}>
                                    Kâr Marjı: <strong>%{margin}</strong>
                                    {Number(margin) < 30 && ' — Marj düşük!'}
                                </div>
                            )}

                            {/* SKU + barcode */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label style={labelStyle} htmlFor="sku">SKU</label>
                                    <input id="sku" {...register('sku')} disabled={isSubmitting}
                                        style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', borderColor: fieldBorderColor(!!errors.sku, false) }}
                                        onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                        onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = fieldBorderColor(!!errors.sku, false))}
                                    />
                                    {errors.sku && <p style={errorStyle}>{errors.sku.message}</p>}
                                </div>
                                <div>
                                    <label style={labelStyle} htmlFor="barcode">Barkod</label>
                                    <input id="barcode" {...register('barcode')} disabled={isSubmitting}
                                        style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}
                                        onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                        onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                                    />
                                </div>
                            </div>

                            {/* Stock tracking toggle */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <div
                                    role="switch" aria-checked={stockTracking}
                                    onClick={() => { setStockTracking((v) => !v); setValue('stockTracking', !stockTracking); }}
                                    style={{ width: '34px', height: '18px', borderRadius: '9px', background: stockTracking ? '#C9A96E' : 'rgba(255,255,255,0.12)', position: 'relative', transition: 'background 150ms', cursor: 'pointer' }}
                                >
                                    <div style={{ position: 'absolute', top: '2px', left: stockTracking ? '18px' : '2px', width: '14px', height: '14px', borderRadius: '50%', background: '#fff', transition: 'left 150ms' }} />
                                </div>
                                <span style={{ fontSize: '13px', color: '#AEAEB2' }}>Stok Takibi</span>
                            </div>

                            <AnimatePresence>
                                {stockTracking ? (
                                    <motion.div
                                        key="stock-fields"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label style={labelStyle} htmlFor="stock">Stok Miktarı</label>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <button type="button" onClick={() => setValue('stock', Math.max(0, watchStock - 1))} style={{ width: '32px', height: '36px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#AEAEB2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Minus size={14} /></button>
                                                    <input id="stock" type="number" min="0" {...register('stock', { valueAsNumber: true })} disabled={isSubmitting} style={{ ...inputStyle, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }} />
                                                    <button type="button" onClick={() => setValue('stock', watchStock + 1)} style={{ width: '32px', height: '36px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#AEAEB2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Plus size={14} /></button>
                                                </div>
                                            </div>
                                            <div>
                                                <label style={labelStyle} htmlFor="stockThreshold">Uyarı Eşiği</label>
                                                <input id="stockThreshold" type="number" min="0" {...register('stockThreshold', { valueAsNumber: true })} disabled={isSubmitting} placeholder="Stok X adede düşünce bildir" style={{ ...inputStyle, fontSize: '12px' }} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="unlimited" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <span style={{ fontSize: '12px', color: '#30D158' }}>✓ Sınırsız stok</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Variants card */}
                    <div style={cardStyle}>
                        <ProductVariants variantGroups={variantGroups} onChange={setVariantGroups} />
                    </div>
                </div>

                {/* ── RIGHT COLUMN ────────────────────────────────────────────────── */}
                <div style={{ position: 'sticky', top: '88px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                    {/* Publish card */}
                    <div style={{ ...cardStyle, marginBottom: 0 }}>
                        <div style={cardHeaderStyle}>Yayınlama</div>
                        <div style={cardBodyStyle}>
                            <Controller name="status" control={control} render={({ field }) => (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '16px' }}>
                                    {(['Taslak', 'Aktif', 'Zamanlanmış'] as const).map((s) => (
                                        <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', transition: 'background 100ms', background: field.value === s ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `1.5px solid ${field.value === s ? '#C9A96E' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 150ms' }}>
                                                {field.value === s && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C9A96E' }} />}
                                            </div>
                                            <span style={{ fontSize: '13px', color: field.value === s ? '#F5F0EB' : '#AEAEB2' }}>{s}</span>
                                            <input type="radio" value={s} checked={field.value === s} onChange={() => field.onChange(s)} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
                                        </label>
                                    ))}
                                </div>
                            )} />

                            <AnimatePresence>
                                {watchStatus === 'Zamanlanmış' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ overflow: 'hidden', marginBottom: '16px' }}
                                    >
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                            <input type="date" style={{ ...inputStyle, fontSize: '12px' }} />
                                            <input type="time" style={{ ...inputStyle, fontSize: '12px' }} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <button type="button" style={{ width: '100%', padding: '9px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '13px', color: '#AEAEB2', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms' }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB'; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                                >
                                    Taslak Kaydet
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{ width: '100%', padding: '10px', background: isSubmitting ? 'rgba(201,169,110,0.6)' : '#C9A96E', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, color: '#0F0F10', cursor: isSubmitting ? 'default' : 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'background 150ms', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    onMouseEnter={(e) => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = '#D4B87A'; }}
                                    onMouseLeave={(e) => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E'; }}
                                >
                                    {isSubmitting ? (
                                        <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg> Kaydediliyor...</>
                                    ) : (mode === 'edit' ? 'Güncelle' : 'Yayınla')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Category card */}
                    <div style={{ ...cardStyle, marginBottom: 0 }}>
                        <div style={cardHeaderStyle}>Kategori</div>
                        <div style={cardBodyStyle}>
                            <Controller name="category" control={control} render={({ field }) => (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    {CATEGORIES.map((cat) => (
                                        <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 8px', cursor: 'pointer', borderRadius: '4px', transition: 'background 100ms' }}
                                            onMouseEnter={(e) => ((e.currentTarget as HTMLLabelElement).style.background = 'rgba(255,255,255,0.03)')}
                                            onMouseLeave={(e) => ((e.currentTarget as HTMLLabelElement).style.background = 'transparent')}
                                        >
                                            <input type="radio" value={cat} checked={field.value === cat} onChange={() => field.onChange(cat)} style={{ accentColor: '#C9A96E', width: '14px', height: '14px', cursor: 'pointer' }} />
                                            <span style={{ fontSize: '13px', color: field.value === cat ? '#F5F0EB' : '#AEAEB2', transition: 'color 100ms' }}>{cat}</span>
                                        </label>
                                    ))}
                                    {errors.category && <p style={errorStyle}>{errors.category.message}</p>}
                                </div>
                            )} />
                        </div>
                    </div>

                    {/* Tags card */}
                    <div style={{ ...cardStyle, marginBottom: 0 }}>
                        <div style={cardHeaderStyle}>Etiketler</div>
                        <div style={cardBodyStyle}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                                {tags.map((tag) => (
                                    <span key={tag} style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '20px', padding: '3px 10px', fontSize: '12px', color: '#C9A96E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} style={{ background: 'transparent', border: 'none', color: 'rgba(201,169,110,0.6)', cursor: 'pointer', padding: 0, fontSize: '14px' }}>×</button>
                                    </span>
                                ))}
                            </div>
                            <input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); } if (e.key === ',') { e.preventDefault(); addTag(tagInput); } }}
                                onBlur={() => tagInput.trim() && addTag(tagInput)}
                                placeholder="Etiket girin, Enter ile ekle..."
                                style={{ ...inputStyle, fontSize: '12px' }}
                                onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                            />
                            <div style={{ marginTop: '10px' }}>
                                <div style={{ fontSize: '10px', color: '#636366', marginBottom: '6px' }}>Önerilen Etiketler</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                    {['mobilya', 'premium', 'ahşap', 'kadife', 'modern', 'klasik'].filter((t) => !tags.includes(t)).map((t) => (
                                        <button key={t} type="button" onClick={() => { const next = [...tags, t]; setTags(next); setValue('tags', next); }}
                                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2px 10px', fontSize: '11px', color: '#636366', cursor: 'pointer', transition: 'all 150ms', fontFamily: 'Inter, system-ui, sans-serif' }}
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,169,110,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = '#C9A96E'; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#636366'; }}
                                        >{t}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SEO card */}
                    <div style={{ ...cardStyle, marginBottom: 0 }}>
                        <div style={cardHeaderStyle}>SEO Ayarları</div>
                        <div style={cardBodyStyle}>
                            {/* Meta title */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={labelStyle} htmlFor="metaTitle">Meta Başlık</label>
                                <input id="metaTitle" {...register('metaTitle')} disabled={isSubmitting}
                                    style={{ ...inputStyle, borderColor: watchMetaTitle.length > 60 ? '#FF453A' : 'rgba(255,255,255,0.08)' }}
                                    onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                    onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = watchMetaTitle.length > 60 ? '#FF453A' : 'rgba(255,255,255,0.08)')}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                                    <span style={{ fontSize: '11px', color: watchMetaTitle.length > 60 ? '#FF453A' : watchMetaTitle.length > 55 ? '#FF9F0A' : watchMetaTitle.length > 40 ? '#FFD60A' : '#30D158' }}>
                                        {watchMetaTitle.length}/60
                                    </span>
                                </div>
                            </div>

                            {/* Meta description */}
                            <div style={{ marginBottom: '16px' }}>
                                <label style={labelStyle} htmlFor="metaDescription">Meta Açıklama</label>
                                <textarea id="metaDescription" {...register('metaDescription')} disabled={isSubmitting} rows={3}
                                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6, borderColor: watchMetaDesc.length > 160 ? '#FF453A' : 'rgba(255,255,255,0.08)' }}
                                    onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                    onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = watchMetaDesc.length > 160 ? '#FF453A' : 'rgba(255,255,255,0.08)')}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                                    <span style={{ fontSize: '11px', color: watchMetaDesc.length > 160 ? '#FF453A' : watchMetaDesc.length > 140 ? '#FF9F0A' : watchMetaDesc.length > 100 ? '#FFD60A' : '#30D158' }}>
                                        {watchMetaDesc.length}/160
                                    </span>
                                </div>
                            </div>

                            {/* Google preview */}
                            <div style={{ background: '#141416', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '12px', marginTop: '12px' }}>
                                <div style={{ fontSize: '11px', color: '#636366', marginBottom: '6px' }}>🌐 google.com</div>
                                <div style={{ fontSize: '14px', color: '#0A84FF', marginBottom: '2px', overflowWrap: 'break-word' }}>{watchMetaTitle || watchName || 'Ürün Başlığı'}</div>
                                <div style={{ fontSize: '11px', color: '#30D158', marginBottom: '4px' }}>selis.com.tr/urunler/{watchSlug || 'urun-slug'}</div>
                                <div style={{ fontSize: '12px', color: '#AEAEB2', overflowWrap: 'break-word' }}>{watchMetaDesc || 'Ürün açıklaması burada görüntülenecektir.'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </form>
    );
}
