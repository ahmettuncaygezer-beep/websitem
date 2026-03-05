'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Upload, ChevronRight } from 'lucide-react';
import type { Category, CategoryStatus } from '@/types/admin/categories';
import ConfirmModal from '@/components/Admin/ConfirmModal';
import { ImageUploader } from '@/components/Admin/ImageUploader';
import { toast } from 'react-hot-toast';

// ── Slug helper ────────────────────────────────────────────────────────────────
const trMap: Record<string, string> = { ş: 's', Ş: 's', ğ: 'g', Ğ: 'g', ı: 'i', İ: 'i', ö: 'o', Ö: 'o', ü: 'u', Ü: 'u', ç: 'c', Ç: 'c' };
function toSlug(s: string) {
    return s.split('').map((c) => trMap[c] ?? c).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

// ── Shared styles ──────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', padding: '9px 12px', fontSize: '13px', color: '#F5F0EB',
    fontFamily: 'Inter, system-ui, sans-serif', outline: 'none', transition: 'border-color 150ms', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
    fontSize: '11px', fontWeight: 500, color: '#636366', textTransform: 'uppercase',
    letterSpacing: '0.08em', display: 'block', marginBottom: '6px',
};



// ── CategoryForm ──────────────────────────────────────────────────────────────
interface CategoryFormProps {
    category: Category | null;
    mode: 'edit' | 'create';
    allCategories: Category[];
    defaultParentId?: string | null;
    onSave: (cat: Category) => void;
    onDelete: (id: string) => void;
    onClose: () => void;
    onCreateNew: () => void;
}

interface FormState {
    nameTR: string;
    nameEN: string;
    slug: string;
    slugManual: boolean;
    parentId: string | null;
    description: string;
    coverImage: string | null;
    metaTitle: string;
    metaDescription: string;
    status: CategoryStatus;
}

export function CategoryForm({
    category,
    mode,
    allCategories,
    defaultParentId,
    onSave,
    onDelete,
    onClose,
    onCreateNew,
}: CategoryFormProps) {
    const [lang, setLang] = useState<'tr' | 'en'>('tr');
    const [seoOpen, setSeoOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState<FormState>(() => ({
        nameTR: category?.nameTR ?? '',
        nameEN: category?.nameEN ?? '',
        slug: category?.slug ?? '',
        slugManual: false,
        parentId: category?.parentId ?? defaultParentId ?? null,
        description: category?.description ?? '',
        coverImage: category?.coverImage ?? null,
        metaTitle: category?.metaTitle ?? '',
        metaDescription: category?.metaDescription ?? '',
        status: category?.status ?? 'Aktif',
    }));

    // Reset form when category changes
    useEffect(() => {
        setForm({
            nameTR: category?.nameTR ?? '',
            nameEN: category?.nameEN ?? '',
            slug: category?.slug ?? '',
            slugManual: false,
            parentId: category?.parentId ?? defaultParentId ?? null,
            description: category?.description ?? '',
            coverImage: category?.coverImage ?? null,
            metaTitle: category?.metaTitle ?? '',
            metaDescription: category?.metaDescription ?? '',
            status: category?.status ?? 'Aktif',
        });
        setSeoOpen(false);
        setSaveSuccess(false);
    }, [category, defaultParentId]);

    // Auto-slug from TR name
    useEffect(() => {
        if (!form.slugManual) {
            setForm((f) => ({ ...f, slug: toSlug(f.nameTR) }));
        }
    }, [form.nameTR, form.slugManual]);

    function update<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((f) => ({ ...f, [key]: value }));
    }

    async function handleSave() {
        if (!form.nameTR.trim()) return;
        setIsSubmitting(true);

        try {
            const isNew = mode === 'create' || !category?.id;
            const res = await fetch('/api/admin/categories', {
                method: isNew ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: category?.id,
                    nameTR: form.nameTR,
                    nameEN: form.nameEN,
                    slug: form.slug,
                    parentId: form.parentId,
                    description: form.description,
                    coverImage: form.coverImage,
                    metaTitle: form.metaTitle,
                    metaDescription: form.metaDescription,
                    status: form.status,
                    order: category?.order ?? 999,
                })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Kaydetme başarısız');
            }

            const data = await res.json();
            onSave(data.category);

            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 1500);
            if (isNew) {
                toast.success('Kategori eklendi');
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDeleteConfirmed() {
        if (!category) return;
        setShowConfirm(false);
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/admin/categories?id=${category.id}`, { method: 'DELETE' });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Silme başarısız');
            }
            onDelete(category.id);
            toast.success('Kategori silindi');
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }


    // Build parent options
    const parentOptions: { value: string | null; label: string; depth: number }[] = [
        { value: null, label: 'Ana Kategori', depth: 0 },
        ...allCategories.flatMap((cat) => [
            { value: cat.id, label: cat.nameTR, depth: 0 },
            ...cat.children.map((child) => ({ value: child.id, label: `—— ${child.nameTR}`, depth: 1 })),
        ]),
    ];

    // ── Empty state (no category selected, not creating) ──────────────────────
    if (!category && mode !== 'create') {
        return (
            <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', minHeight: '400px' }}>
                <div style={{ fontSize: '48px', color: 'rgba(201,169,110,0.2)' }}>🌳</div>
                <p style={{ fontSize: '14px', color: '#636366', margin: 0 }}>Düzenlemek için bir kategori seçin</p>
                <p style={{ fontSize: '12px', color: '#636366', opacity: 0.6, margin: 0 }}>veya yeni kategori oluşturun</p>
                <button
                    onClick={onCreateNew}
                    style={{ border: '1px solid rgba(201,169,110,0.3)', color: '#C9A96E', background: 'transparent', borderRadius: '6px', padding: '8px 20px', fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,169,110,0.08)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                >
                    Yeni Kategori Oluştur
                </button>
            </div>
        );
    }

    // ── Form ─────────────────────────────────────────────────────────────────────
    return (
        <>
            <motion.div
                key={category?.id ?? 'new'}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.18, ease: easeOut }}
                style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', position: 'sticky', top: '88px' }}
            >
                {/* Form header */}
                <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>
                        {mode === 'create' ? 'Yeni Kategori' : 'Kategori Düzenle'}
                    </h2>
                    <button onClick={onClose} aria-label="Kapat" style={{ background: 'transparent', border: 'none', color: '#636366', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center', transition: 'color 150ms' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#636366')}
                    ><X size={18} /></button>
                </div>

                {/* Form body */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>

                    {/* Language toggle */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {(['tr', 'en'] as const).map((l) => {
                            const active = lang === l;
                            return (
                                <button key={l} onClick={() => setLang(l)}
                                    style={{
                                        padding: '5px 16px', borderRadius: '5px', fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms',
                                        background: active ? 'rgba(201,169,110,0.12)' : 'transparent',
                                        border: `1px solid ${active ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.06)'}`,
                                        color: active ? '#C9A96E' : '#636366',
                                    }}
                                >
                                    {l === 'tr' ? 'Türkçe' : 'English'}
                                </button>
                            );
                        })}
                    </div>

                    {/* Category name */}
                    <div>
                        <label style={labelStyle} htmlFor="cat-name">Kategori Adı</label>
                        <input
                            id="cat-name"
                            value={lang === 'tr' ? form.nameTR : form.nameEN}
                            onChange={(e) => update(lang === 'tr' ? 'nameTR' : 'nameEN', e.target.value)}
                            placeholder={lang === 'tr' ? 'Kategori adını girin...' : 'Enter category name...'}
                            style={{ ...inputStyle }}
                            onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                            onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={labelStyle}>URL Slug</span>
                            <span style={{ fontSize: '10px', color: '#30D158', background: 'rgba(48,209,88,0.1)', padding: '1px 6px', borderRadius: '3px' }}>
                                {form.slugManual ? 'manuel' : 'otomatik'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '12px', color: '#636366', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>/kategoriler/</span>
                            <input
                                value={form.slug}
                                onChange={(e) => { update('slug', e.target.value); update('slugManual', true); }}
                                style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', flex: 1 }}
                                onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                                aria-label="URL slug"
                            />
                        </div>
                    </div>

                    {/* Parent category */}
                    <div>
                        <label style={labelStyle} htmlFor="cat-parent">Üst Kategori</label>
                        <div style={{ position: 'relative' }}>
                            <select
                                id="cat-parent"
                                value={form.parentId ?? ''}
                                onChange={(e) => update('parentId', e.target.value || null)}
                                style={{
                                    ...inputStyle,
                                    appearance: 'none', WebkitAppearance: 'none',
                                    paddingRight: '36px',
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23636366' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 12px center',
                                }}
                                onFocus={(e) => ((e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                onBlur={(e) => ((e.currentTarget as HTMLSelectElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                            >
                                {parentOptions.map((opt) => (
                                    <option key={opt.value ?? 'null'} value={opt.value ?? ''}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label style={labelStyle} htmlFor="cat-desc">Açıklama</label>
                        <textarea
                            id="cat-desc"
                            value={form.description}
                            onChange={(e) => update('description', e.target.value)}
                            placeholder="Kategori açıklaması..."
                            rows={3}
                            style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', lineHeight: 1.6 }}
                            onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                            onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                        />
                    </div>

                    {/* Cover image */}
                    <div>
                        <ImageUploader
                            bucket="categories"
                            value={form.coverImage || ''}
                            onChange={(url) => update('coverImage', url || null)}
                            label="Kapak Görseli"
                            height="120px"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label style={labelStyle}>Durum</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {(['Aktif', 'Pasif'] as CategoryStatus[]).map((s) => {
                                const active = form.status === s;
                                const isActive = s === 'Aktif';
                                return (
                                    <button key={s} onClick={() => update('status', s)}
                                        style={{
                                            padding: '6px 20px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms',
                                            background: active ? (isActive ? 'rgba(48,209,88,0.12)' : 'rgba(255,255,255,0.04)') : 'transparent',
                                            border: `1px solid ${active ? (isActive ? 'rgba(48,209,88,0.2)' : 'rgba(255,255,255,0.08)') : 'rgba(255,255,255,0.06)'}`,
                                            color: active ? (isActive ? '#30D158' : '#636366') : '#636366',
                                        }}
                                    >{s}</button>
                                );
                            })}
                        </div>
                    </div>

                    {/* SEO accordion */}
                    <div>
                        <button
                            onClick={() => setSeoOpen((v) => !v)}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', cursor: 'pointer', borderTop: '1px solid rgba(255,255,255,0.04)', marginTop: '4px', background: 'transparent', border: 'none', borderTopColor: 'rgba(255,255,255,0.04)', borderTopWidth: '1px', borderTopStyle: 'solid', textAlign: 'left' }}
                        >
                            <span style={{ fontSize: '13px', color: '#AEAEB2', fontFamily: 'Inter, system-ui, sans-serif' }}>SEO Ayarları</span>
                            <motion.div animate={{ rotate: seoOpen ? 180 : 0 }} transition={{ duration: 0.15 }} style={{ color: '#636366' }}>
                                <ChevronDown size={14} />
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {seoOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: easeOut }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '12px' }}>
                                        {/* Meta title */}
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                <label style={labelStyle} htmlFor="meta-title">Meta Başlık</label>
                                                <span style={{ fontSize: '11px', color: form.metaTitle.length > 60 ? '#FF453A' : form.metaTitle.length > 55 ? '#FF9F0A' : form.metaTitle.length > 40 ? '#FFD60A' : '#30D158' }}>
                                                    {form.metaTitle.length}/60
                                                </span>
                                            </div>
                                            <input id="meta-title" value={form.metaTitle} onChange={(e) => update('metaTitle', e.target.value.slice(0, 60))} placeholder="Meta başlık..." style={inputStyle}
                                                onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                                onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                                            />
                                        </div>
                                        {/* Meta description */}
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                <label style={labelStyle} htmlFor="meta-desc">Meta Açıklama</label>
                                                <span style={{ fontSize: '11px', color: form.metaDescription.length > 160 ? '#FF453A' : form.metaDescription.length > 140 ? '#FF9F0A' : form.metaDescription.length > 100 ? '#FFD60A' : '#30D158' }}>
                                                    {form.metaDescription.length}/160
                                                </span>
                                            </div>
                                            <textarea id="meta-desc" value={form.metaDescription} onChange={(e) => update('metaDescription', e.target.value.slice(0, 160))} placeholder="Meta açıklama..." rows={3}
                                                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                                                onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(201,169,110,0.5)')}
                                                onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.08)')}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Form footer */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '16px 20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {mode === 'edit' && category && (
                        <button
                            onClick={() => setShowConfirm(true)}
                            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,69,58,0.2)', borderRadius: '6px', fontSize: '12px', color: '#FF453A', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms' }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,69,58,0.08)')}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                        >Kategoriyi Sil</button>
                    )}
                    <div style={{ flex: 1 }} />
                    <button
                        onClick={onClose}
                        style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '12px', color: '#AEAEB2', cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)')}
                    >İptal</button>
                    <button
                        onClick={handleSave}
                        disabled={isSubmitting}
                        style={{ padding: '8px 20px', background: saveSuccess ? '#30D158' : isSubmitting ? 'rgba(201,169,110,0.6)' : '#C9A96E', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 600, color: '#0F0F10', cursor: isSubmitting ? 'default' : 'pointer', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms', display: 'flex', alignItems: 'center', gap: '6px', minWidth: '80px', justifyContent: 'center' }}
                        onMouseEnter={(e) => { if (!isSubmitting && !saveSuccess) (e.currentTarget as HTMLButtonElement).style.background = '#D4B87A'; }}
                        onMouseLeave={(e) => { if (!isSubmitting && !saveSuccess) (e.currentTarget as HTMLButtonElement).style.background = '#C9A96E'; }}
                    >
                        {isSubmitting ? (
                            <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg> Kaydediliyor</>
                        ) : saveSuccess ? '✓ Kaydedildi' : 'Kaydet'}
                    </button>
                </div>
            </motion.div>

            {/* Confirm delete dialog */}
            {category && (
                <ConfirmModal
                    open={showConfirm}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={handleDeleteConfirmed}
                    title="Kategori Silme Onayı"
                    message={`"${category.nameTR}" kategorisini silmek istediğinize emin misiniz? Bu kategorideki ${category.productCount} ürünün kategorisi kaldırılacak. Bu işlem geri alınamaz.`}
                    items={[{ name: category.nameTR, detail: `${category.productCount} ürün` }]}
                    variant="danger"
                    confirmText="Evet, Sil"
                    cancelText="Vazgeç"
                    delaySeconds={2}
                />
            )}
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </>
    );
}
