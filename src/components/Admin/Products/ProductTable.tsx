'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MoreVertical, Pencil, Eye, Copy, ToggleLeft, Trash2 } from 'lucide-react';
import type { Product, ProductStatus } from '@/lib/mock/products';
import { useToast } from '@/components/ui/Toast/ToastProvider';

// ── Status badge styles ──────────────────────────────────────────────────────
const statusStyle: Record<ProductStatus, { bg: string; color: string }> = {
    Aktif: { bg: 'rgba(48,209,88,0.12)', color: '#30D158' },
    Pasif: { bg: 'rgba(99,99,102,0.15)', color: '#AEAEB2' },
    Taslak: { bg: 'rgba(255,214,10,0.12)', color: '#FFD60A' },
};

function stockBadge(stock: number): { bg: string; color: string; label: string } {
    if (stock === 0) return { bg: 'rgba(255,69,58,0.12)', color: '#FF453A', label: `Tükendi` };
    if (stock <= 10) return { bg: 'rgba(255,214,10,0.12)', color: '#FFD60A', label: `Az Kaldı (${stock})` };
    return { bg: 'rgba(48,209,88,0.12)', color: '#30D158', label: `Stokta (${stock})` };
}

function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ── Skeleton row ─────────────────────────────────────────────────────────────
const shimmerStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.4s infinite linear',
    borderRadius: '4px',
    height: '14px',
};

function SkeletonRow() {
    return (
        <tr>
            {[40, 48, 160, 80, 90, 90, 80, 80, 80].map((w, i) => (
                <td key={i} style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ ...shimmerStyle, width: i === 0 ? '16px' : i === 1 ? '48px' : `${w}px`, height: i === 1 ? '48px' : '14px' }} />
                </td>
            ))}
            <td style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                <div style={{ ...shimmerStyle, width: '28px', height: '28px', borderRadius: '4px' }} />
            </td>
        </tr>
    );
}

// ── Action dropdown ───────────────────────────────────────────────────────────
interface ActionMenuProps {
    product: Product;
    onClose: () => void;
}
function ActionMenu({ product, onClose }: ActionMenuProps) {
    const router = useRouter();
    const { toast } = useToast();
    const items = [
        { icon: Pencil, label: 'Düzenle', action: () => { router.push(`/admin/urunler/${product.id}/duzenle`); onClose(); } },
        { icon: Eye, label: 'Önizle', action: () => { window.open(`/urun/${product.slug}`, '_blank'); onClose(); } },
        {
            icon: Copy,
            label: 'Çoğalt',
            action: () => {
                toast.success('Ürün Kopyalandı', `${product.name} başarıyla çoğaltıldı.`);
                onClose();
            }
        },
        {
            icon: ToggleLeft,
            label: product.status === 'Pasif' ? 'Aktife Al' : 'Pasife Al',
            action: () => {
                toast.info('Durum Güncellendi', `${product.name} ${product.status === 'Pasif' ? 'aktif' : 'pasif'} duruma getirildi.`);
                onClose();
            }
        },
    ];
    return (
        <>
            <div className="fixed inset-0 z-10" onClick={onClose} aria-hidden="true" />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 6 }}
                transition={{ duration: 0.13 }}
                style={{
                    position: 'absolute', right: 0, top: '36px',
                    background: '#1C1C1E',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                    zIndex: 20, minWidth: '180px', overflow: 'hidden',
                }}
                role="menu"
            >
                {items.map(({ icon: Icon, label, action }) => (
                    <button
                        key={label}
                        role="menuitem"
                        onClick={action}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', textAlign: 'left', padding: '9px 16px', fontSize: '13px', color: '#AEAEB2', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 100ms, color 100ms', fontFamily: 'Inter, system-ui, sans-serif' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLButtonElement).style.color = '#F5F0EB'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#AEAEB2'; }}
                    >
                        <Icon size={14} /> {label}
                    </button>
                ))}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '3px 0' }} />
                <button
                    role="menuitem"
                    onClick={() => {
                        toast.warning('Ürün Silindi', `${product.name} başarıyla silindi.`);
                        onClose();
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', textAlign: 'left', padding: '9px 16px', fontSize: '13px', color: '#FF453A', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background 100ms', fontFamily: 'Inter, system-ui, sans-serif' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,69,58,0.06)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                    <Trash2 size={14} /> Sil
                </button>
            </motion.div>
        </>
    );
}

// ── Custom checkbox ───────────────────────────────────────────────────────────
interface CheckboxProps {
    checked: boolean;
    indeterminate?: boolean;
    onChange: () => void;
    label?: string;
}
function Checkbox({ checked, indeterminate, onChange, label }: CheckboxProps) {
    const ref = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (ref.current) ref.current.indeterminate = !!indeterminate;
    }, [indeterminate]);
    return (
        <input
            ref={ref}
            type="checkbox"
            aria-label={label ?? 'Seç'}
            checked={checked}
            onChange={onChange}
            style={{
                width: '16px', height: '16px',
                border: `1.5px solid ${checked ? '#C9A96E' : 'rgba(255,255,255,0.2)'}`,
                borderRadius: '3px',
                background: checked ? '#C9A96E' : 'transparent',
                cursor: 'pointer',
                accentColor: '#C9A96E',
            }}
        />
    );
}

// ── Pagination ────────────────────────────────────────────────────────────────
interface PaginationProps {
    currentPage: number;
    total: number;
    perPage: number;
    onPageChange: (p: number) => void;
    onPerPageChange: (n: number) => void;
}
function Pagination({ currentPage, total, perPage, onPageChange, onPerPageChange }: PaginationProps) {
    const totalPages = Math.ceil(total / perPage);
    const from = (currentPage - 1) * perPage + 1;
    const to = Math.min(currentPage * perPage, total);
    const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1);

    return (
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: '#636366' }}>{from}–{to} / {total} ürün</span>
            <div style={{ display: 'flex', gap: '4px' }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    style={{ width: '32px', height: '32px', borderRadius: '4px', fontSize: '14px', cursor: currentPage === 1 ? 'default' : 'pointer', border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: '#636366', opacity: currentPage === 1 ? 0.3 : 1, transition: 'opacity 150ms' }}
                    aria-label="Önceki sayfa"
                >‹</button>
                {pages.map((p) => (
                    <button key={p} onClick={() => onPageChange(p)} style={{ width: '32px', height: '32px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', border: `1px solid ${p === currentPage ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.06)'}`, background: p === currentPage ? 'rgba(201,169,110,0.12)' : 'transparent', color: p === currentPage ? '#C9A96E' : '#636366', transition: 'all 150ms', fontVariantNumeric: 'tabular-nums' }}>
                        {p}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    style={{ width: '32px', height: '32px', borderRadius: '4px', fontSize: '14px', cursor: currentPage === totalPages ? 'default' : 'pointer', border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: '#636366', opacity: currentPage === totalPages ? 0.3 : 1, transition: 'opacity 150ms' }}
                    aria-label="Sonraki sayfa"
                >›</button>
            </div>
            <select
                value={perPage}
                onChange={(e) => onPerPageChange(Number(e.target.value))}
                aria-label="Sayfa başına kayıt"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '5px 10px', fontSize: '12px', color: '#AEAEB2', cursor: 'pointer', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' }}
            >
                {[20, 50, 100].map((n) => <option key={n} value={n}>{n} kayıt</option>)}
            </select>
        </div>
    );
}

// ── Grid card ─────────────────────────────────────────────────────────────────
interface GridCardProps {
    product: Product;
    selected: boolean;
    onSelect: () => void;
}
function GridCard({ product, selected, onSelect }: GridCardProps) {
    const router = useRouter();
    const sb = stockBadge(product.stock);
    const ss = statusStyle[product.status];
    return (
        <motion.div
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
            onClick={() => router.push(`/admin/urunler/${product.id}/duzenle`)}
            style={{ background: '#1C1C1E', border: `1px solid ${selected ? 'rgba(201,169,110,0.3)' : 'rgba(255,255,255,0.05)'}`, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 200ms', position: 'relative' }}
        >
            {/* Image area */}
            <div style={{ height: '200px', background: 'rgba(201,169,110,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontSize: '48px' }}>
                🛋️
                {/* Status badge */}
                <span style={{ position: 'absolute', top: '10px', right: '10px', ...ss, fontSize: '10px', fontWeight: 500, padding: '2px 8px', borderRadius: '12px' }}>{product.status}</span>
                {/* Checkbox */}
                <div
                    style={{ position: 'absolute', top: '10px', left: '10px', opacity: selected ? 1 : 0, transition: 'opacity 150ms' }}
                    onMouseEnter={(e) => { (e.currentTarget.parentElement as HTMLDivElement).querySelectorAll('input')[0]?.parentElement?.setAttribute('style', 'opacity:1'); }}
                    onClick={(e) => { e.stopPropagation(); onSelect(); }}
                >
                    <Checkbox checked={selected} onChange={onSelect} />
                </div>
            </div>
            {/* Info */}
            <div style={{ padding: '14px' }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</div>
                <div style={{ fontSize: '11px', color: '#636366', marginTop: '3px' }}>{product.category}</div>
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>₺{product.price.toLocaleString('tr-TR')}</span>
                    {product.comparePrice > 0 && <span style={{ fontSize: '11px', color: '#636366', textDecoration: 'line-through', fontVariantNumeric: 'tabular-nums' }}>₺{product.comparePrice.toLocaleString('tr-TR')}</span>}
                </div>
                <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: 500, padding: '2px 8px', borderRadius: '12px', background: sb.bg, color: sb.color }}>{sb.label}</span>
                    <span style={{ fontSize: '10px', color: '#636366', fontFamily: "'JetBrains Mono', monospace" }}>{product.sku}</span>
                </div>
            </div>
        </motion.div>
    );
}

// ── Main ProductTable ─────────────────────────────────────────────────────────
interface ProductTableProps {
    products: Product[];
    loading?: boolean;
    viewMode: 'table' | 'grid';
    selectedIds: string[];
    onSelectionChange: (ids: string[]) => void;
    currentPage: number;
    perPage: number;
    totalCount: number;
    onPageChange: (p: number) => void;
    onPerPageChange: (n: number) => void;
}

export function ProductTable({
    products, loading = false, viewMode,
    selectedIds, onSelectionChange,
    currentPage, perPage, totalCount,
    onPageChange, onPerPageChange,
}: ProductTableProps) {
    const router = useRouter();
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const allSelected = products.length > 0 && products.every((p) => selectedIds.includes(p.id));
    const someSelected = products.some((p) => selectedIds.includes(p.id)) && !allSelected;

    function toggleAll() {
        if (allSelected) {
            onSelectionChange(selectedIds.filter((id) => !products.some((p) => p.id === id)));
        } else {
            onSelectionChange([...new Set([...selectedIds, ...products.map((p) => p.id)])]);
        }
    }

    function toggleOne(id: string) {
        onSelectionChange(
            selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]
        );
    }

    // ── Grid View ────────────────────────────────────────────────────────────────
    if (viewMode === 'grid') {
        return (
            <div>
                <style>{`@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }`}</style>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    {products.map((p) => (
                        <GridCard key={p.id} product={p} selected={selectedIds.includes(p.id)} onSelect={() => toggleOne(p.id)} />
                    ))}
                </div>
                <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                    <Pagination currentPage={currentPage} total={totalCount} perPage={perPage} onPageChange={onPageChange} onPerPageChange={onPerPageChange} />
                </div>
            </div>
        );
    }

    // ── Table View ───────────────────────────────────────────────────────────────
    const thStyle: React.CSSProperties = {
        padding: '11px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 500,
        color: '#636366', letterSpacing: '0.08em', textTransform: 'uppercase',
        borderBottom: '1px solid rgba(255,255,255,0.04)', whiteSpace: 'nowrap',
    };

    return (
        <div style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden' }}>
            <style>{`@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }`}</style>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <tr>
                            <th style={{ ...thStyle, width: '40px', padding: '11px 16px' }} scope="col">
                                <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} label="Tümünü seç" />
                            </th>
                            {['Görsel', 'Ürün Adı', 'SKU', 'Kategori', 'Fiyat', 'Stok', 'Durum', 'Güncelleme', ''].map((h) => (
                                <th key={h} scope={h ? 'col' : undefined} style={thStyle}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                            : products.map((product, idx) => {
                                const selected = selectedIds.includes(product.id);
                                const sb = stockBadge(product.stock);
                                const ss = statusStyle[product.status];
                                const isLast = idx === products.length - 1;
                                return (
                                    <tr
                                        key={product.id}
                                        style={{ background: selected ? 'rgba(201,169,110,0.04)' : 'transparent', borderBottom: isLast ? 'none' : `1px solid ${selected ? 'rgba(201,169,110,0.08)' : 'rgba(255,255,255,0.03)'}`, cursor: 'pointer', transition: 'background 100ms' }}
                                        onClick={() => router.push(`/admin/urunler/${product.id}/duzenle`)}
                                        onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)'; }}
                                        onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'; }}
                                    >
                                        {/* Checkbox */}
                                        <td style={{ padding: '12px 16px' }} onClick={(e) => { e.stopPropagation(); toggleOne(product.id); }}>
                                            <Checkbox checked={selected} onChange={() => toggleOne(product.id)} label={`${product.name} seç`} />
                                        </td>
                                        {/* Image */}
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '4px', background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🛋️</div>
                                        </td>
                                        {/* Name */}
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ fontSize: '13px', fontWeight: 500, color: '#F5F0EB', transition: 'color 100ms', whiteSpace: 'nowrap' }}>{product.name}</div>
                                            <div style={{ fontSize: '11px', color: '#636366', marginTop: '2px' }}>{product.category}</div>
                                        </td>
                                        {/* SKU */}
                                        <td style={{ padding: '12px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#636366', whiteSpace: 'nowrap' }}>{product.sku}</td>
                                        {/* Category */}
                                        <td style={{ padding: '12px 16px', fontSize: '12px', color: '#AEAEB2', whiteSpace: 'nowrap' }}>{product.category}</td>
                                        {/* Price */}
                                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                                            <div style={{ fontSize: '13px', fontWeight: 600, color: '#F5F0EB', fontVariantNumeric: 'tabular-nums' }}>₺{product.price.toLocaleString('tr-TR')}</div>
                                            {product.comparePrice > 0 && <div style={{ fontSize: '11px', color: '#636366', textDecoration: 'line-through', fontVariantNumeric: 'tabular-nums' }}>₺{product.comparePrice.toLocaleString('tr-TR')}</div>}
                                        </td>
                                        {/* Stock */}
                                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', background: sb.bg, color: sb.color }}>{sb.label}</span>
                                        </td>
                                        {/* Status */}
                                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 500, padding: '3px 10px', borderRadius: '20px', ...ss }}>{product.status}</span>
                                        </td>
                                        {/* Updated */}
                                        <td style={{ padding: '12px 16px', fontSize: '11px', color: '#636366', whiteSpace: 'nowrap' }}>{formatDate(product.updatedAt)}</td>
                                        {/* Actions */}
                                        <td style={{ padding: '12px 16px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                                                aria-label={`${product.name} işlemleri`}
                                                aria-expanded={openMenuId === product.id}
                                                style={{ width: '28px', height: '28px', borderRadius: '4px', background: 'transparent', border: '1px solid transparent', color: '#636366', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 150ms' }}
                                                onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(255,255,255,0.06)'; b.style.borderColor = 'rgba(255,255,255,0.08)'; b.style.color = '#AEAEB2'; }}
                                                onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.borderColor = 'transparent'; b.style.color = '#636366'; }}
                                            >
                                                <MoreVertical size={15} />
                                            </button>
                                            <AnimatePresence>
                                                {openMenuId === product.id && (
                                                    <ActionMenu product={product} onClose={() => setOpenMenuId(null)} />
                                                )}
                                            </AnimatePresence>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} total={totalCount} perPage={perPage} onPageChange={onPageChange} onPerPageChange={onPerPageChange} />
        </div>
    );
}
