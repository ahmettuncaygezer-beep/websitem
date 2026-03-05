'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
    ClipboardList, Download, ChevronLeft, ChevronRight, X,
    Filter, Calendar, User, Activity, Search
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────────

interface AuditLog {
    id: string;
    admin_email: string;
    action: string;
    entity_type: string;
    entity_id: string;
    entity_name: string;
    old_value: any;
    new_value: any;
    ip_address: string;
    created_at: string;
}

interface Filters {
    adminEmail: string;
    action: string;
    entityType: string;
    startDate: string;
    endDate: string;
}

// ─── Action label map ───────────────────────────────────────────────────────────

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
    'product.create': { label: 'Ürün Oluşturma', color: '#30D158' },
    'product.update': { label: 'Ürün Güncelleme', color: '#0A84FF' },
    'product.delete': { label: 'Ürün Silme', color: '#FF453A' },
    'order.status_change': { label: 'Sipariş Durum Değişikliği', color: '#FF9F0A' },
    'category.create': { label: 'Kategori Oluşturma', color: '#30D158' },
    'category.update': { label: 'Kategori Güncelleme', color: '#0A84FF' },
    'category.delete': { label: 'Kategori Silme', color: '#FF453A' },
    'campaign.create': { label: 'Kampanya Oluşturma', color: '#30D158' },
    'campaign.update': { label: 'Kampanya Güncelleme', color: '#0A84FF' },
    'campaign.delete': { label: 'Kampanya Silme', color: '#FF453A' },
    'settings.update': { label: 'Ayar Güncelleme', color: '#BF5AF2' },
};

function getActionInfo(action: string) {
    return ACTION_LABELS[action] || { label: action, color: '#AEAEB2' };
}

// ─── JSON Diff Viewer ───────────────────────────────────────────────────────────

function JsonDiffViewer({ oldVal, newVal }: { oldVal: any; newVal: any }) {
    if (!oldVal && !newVal) {
        return <div style={{ color: '#636366', fontSize: '13px' }}>Veri yok</div>;
    }

    const allKeys = new Set([
        ...Object.keys(oldVal || {}),
        ...Object.keys(newVal || {}),
    ]);

    const rows: { key: string; old: string; new_: string; changed: boolean }[] = [];
    allKeys.forEach(key => {
        const oldStr = oldVal ? JSON.stringify(oldVal[key], null, 0) : '—';
        const newStr = newVal ? JSON.stringify(newVal[key], null, 0) : '—';
        rows.push({ key, old: oldStr ?? '—', new_: newStr ?? '—', changed: oldStr !== newStr });
    });

    return (
        <div style={{ maxHeight: '400px', overflowY: 'auto', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={diffThStyle}>Alan</th>
                        <th style={{ ...diffThStyle, color: '#FF453A' }}>Eski Değer</th>
                        <th style={{ ...diffThStyle, color: '#30D158' }}>Yeni Değer</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.key} style={{
                            background: row.changed ? 'rgba(255,214,10,0.06)' : 'transparent',
                        }}>
                            <td style={{ ...diffTdStyle, fontWeight: 600, color: row.changed ? '#FFD60A' : '#AEAEB2' }}>
                                {row.key}
                            </td>
                            <td style={{ ...diffTdStyle, color: row.changed ? '#FF6961' : '#636366', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {truncate(row.old, 80)}
                            </td>
                            <td style={{ ...diffTdStyle, color: row.changed ? '#77DD77' : '#636366', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {truncate(row.new_, 80)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function truncate(str: string, max: number) {
    if (!str) return '—';
    return str.length > max ? str.slice(0, max) + '…' : str;
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export function AuditLogSection() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filterAdmins, setFilterAdmins] = useState<string[]>([]);
    const [filterActions, setFilterActions] = useState<string[]>([]);
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const [filters, setFilters] = useState<Filters>({
        adminEmail: '',
        action: '',
        entityType: '',
        startDate: '',
        endDate: '',
    });

    const perPage = 20;

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(page),
                perPage: String(perPage),
            });
            if (filters.adminEmail) params.set('adminEmail', filters.adminEmail);
            if (filters.action) params.set('action', filters.action);
            if (filters.entityType) params.set('entityType', filters.entityType);
            if (filters.startDate) params.set('startDate', filters.startDate);
            if (filters.endDate) params.set('endDate', filters.endDate);

            const res = await fetch(`/api/admin/audit-logs?${params.toString()}`);
            const json = await res.json();
            setLogs(json.logs || []);
            setTotal(json.total || 0);
            if (json.filters) {
                setFilterAdmins(json.filters.adminEmails || []);
                setFilterActions(json.filters.actions || []);
            }
        } catch (err) {
            console.error('Failed to fetch audit logs:', err);
        } finally {
            setLoading(false);
        }
    }, [page, filters]);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const totalPages = Math.ceil(total / perPage);

    const handleCsvExport = () => {
        const params = new URLSearchParams({ format: 'csv' });
        if (filters.adminEmail) params.set('adminEmail', filters.adminEmail);
        if (filters.action) params.set('action', filters.action);
        if (filters.entityType) params.set('entityType', filters.entityType);
        if (filters.startDate) params.set('startDate', filters.startDate);
        if (filters.endDate) params.set('endDate', filters.endDate);
        window.open(`/api/admin/audit-logs?${params.toString()}`, '_blank');
    };

    const resetFilters = () => {
        setFilters({ adminEmail: '', action: '', entityType: '', startDate: '', endDate: '' });
        setPage(1);
    };

    const hasActiveFilters = Object.values(filters).some(v => v !== '');

    return (
        <div style={{ marginTop: '40px' }}>
            {/* HEADER */}
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ClipboardList size={22} style={{ color: '#C9A96E' }} />
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#F5F0EB', margin: 0 }}>
                            İşlem Geçmişi
                        </h3>
                        <p style={{ fontSize: '13px', color: '#636366', margin: 0 }}>
                            Admin panelinde yapılan tüm işlemlerin kaydı
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        style={{
                            ...btnStyle,
                            background: hasActiveFilters ? 'rgba(201,169,110,0.15)' : 'rgba(255,255,255,0.04)',
                            border: `1px solid ${hasActiveFilters ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.08)'}`,
                            color: hasActiveFilters ? '#C9A96E' : '#AEAEB2',
                        }}
                    >
                        <Filter size={14} /> Filtreler
                        {hasActiveFilters && <span style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: '#C9A96E', display: 'inline-block', marginLeft: '4px'
                        }} />}
                    </button>
                    <button onClick={handleCsvExport} style={{ ...btnStyle, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#AEAEB2' }}>
                        <Download size={14} /> CSV İndir
                    </button>
                </div>
            </div>

            {/* FILTERS */}
            {showFilters && (
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '12px', padding: '20px', borderRadius: '12px', marginBottom: '16px',
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                }}>
                    <div>
                        <label style={labelStyle}><User size={12} /> Admin</label>
                        <select
                            value={filters.adminEmail}
                            onChange={e => { setFilters(f => ({ ...f, adminEmail: e.target.value })); setPage(1); }}
                            style={inputStyle}
                        >
                            <option value="">Tümü</option>
                            {filterAdmins.map(email => <option key={email} value={email}>{email}</option>)}
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}><Activity size={12} /> İşlem</label>
                        <select
                            value={filters.action}
                            onChange={e => { setFilters(f => ({ ...f, action: e.target.value })); setPage(1); }}
                            style={inputStyle}
                        >
                            <option value="">Tümü</option>
                            {filterActions.map(a => (
                                <option key={a} value={a}>{getActionInfo(a).label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}><Search size={12} /> Tür</label>
                        <select
                            value={filters.entityType}
                            onChange={e => { setFilters(f => ({ ...f, entityType: e.target.value })); setPage(1); }}
                            style={inputStyle}
                        >
                            <option value="">Tümü</option>
                            <option value="product">Ürün</option>
                            <option value="order">Sipariş</option>
                            <option value="category">Kategori</option>
                            <option value="campaign">Kampanya</option>
                            <option value="settings">Ayar</option>
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}><Calendar size={12} /> Başlangıç</label>
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={e => { setFilters(f => ({ ...f, startDate: e.target.value })); setPage(1); }}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}><Calendar size={12} /> Bitiş</label>
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={e => { setFilters(f => ({ ...f, endDate: e.target.value })); setPage(1); }}
                            style={inputStyle}
                        />
                    </div>
                    {hasActiveFilters && (
                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                            <button onClick={resetFilters} style={{ ...btnStyle, background: 'rgba(255,69,58,0.1)', border: '1px solid rgba(255,69,58,0.2)', color: '#FF453A', width: '100%' }}>
                                Temizle
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* TABLE */}
            <div style={{
                background: '#1C1C1E', borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}>
                {/* Table Header */}
                <div style={{
                    display: 'grid', gridTemplateColumns: '180px 1fr 1.2fr 1fr 80px',
                    padding: '12px 20px', gap: '12px',
                    background: 'rgba(255,255,255,0.02)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    fontSize: '11px', fontWeight: 700, color: '#636366',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                    <span>Tarih & Saat</span>
                    <span>Admin</span>
                    <span>İşlem</span>
                    <span>Nesne</span>
                    <span style={{ textAlign: 'right' }}>IP</span>
                </div>

                {/* Loading */}
                {loading && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#636366', fontSize: '13px' }}>
                        Yükleniyor...
                    </div>
                )}

                {/* Empty state */}
                {!loading && logs.length === 0 && (
                    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                        <ClipboardList size={36} style={{ color: '#3A3A3C', marginBottom: '12px' }} />
                        <p style={{ color: '#636366', fontSize: '13px', margin: 0 }}>
                            Henüz kayıt yok. Admin panelinde işlem yaptıkça loglar burada görünecek.
                        </p>
                    </div>
                )}

                {/* Rows */}
                {!loading && logs.map(log => {
                    const actionInfo = getActionInfo(log.action);
                    const date = new Date(log.created_at);
                    const dateStr = date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    const timeStr = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                    return (
                        <div
                            key={log.id}
                            onClick={() => setSelectedLog(log)}
                            style={{
                                display: 'grid', gridTemplateColumns: '180px 1fr 1.2fr 1fr 80px',
                                padding: '14px 20px', gap: '12px',
                                borderBottom: '1px solid rgba(255,255,255,0.03)',
                                cursor: 'pointer',
                                transition: 'background 0.15s',
                                fontSize: '13px',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                            <span style={{ color: '#AEAEB2', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
                                {dateStr} <span style={{ color: '#636366' }}>{timeStr}</span>
                            </span>
                            <span style={{ color: '#F5F0EB', fontWeight: 500 }}>
                                {log.admin_email}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: actionInfo.color, flexShrink: 0,
                                }} />
                                <span style={{ color: '#AEAEB2' }}>{actionInfo.label}</span>
                            </span>
                            <span style={{ color: '#AEAEB2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {log.entity_name || log.entity_id || '—'}
                            </span>
                            <span style={{ color: '#3A3A3C', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>
                                {log.ip_address || '—'}
                            </span>
                        </div>
                    );
                })}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.06)',
                        background: 'rgba(255,255,255,0.02)',
                    }}>
                        <span style={{ fontSize: '12px', color: '#636366' }}>
                            Toplam {total} kayıt — Sayfa {page} / {totalPages}
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                                disabled={page <= 1}
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                style={{ ...paginationBtnStyle, opacity: page <= 1 ? 0.3 : 1 }}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                disabled={page >= totalPages}
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                style={{ ...paginationBtnStyle, opacity: page >= totalPages ? 0.3 : 1 }}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* DETAIL DRAWER */}
            {selectedLog && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setSelectedLog(null)}
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
                            zIndex: 9998, backdropFilter: 'blur(4px)',
                        }}
                    />
                    {/* Drawer */}
                    <div style={{
                        position: 'fixed', top: 0, right: 0, bottom: 0,
                        width: '540px', maxWidth: '90vw',
                        background: '#1C1C1E', borderLeft: '1px solid rgba(255,255,255,0.08)',
                        zIndex: 9999, display: 'flex', flexDirection: 'column',
                        boxShadow: '-20px 0 60px rgba(0,0,0,0.4)',
                    }}>
                        {/* Drawer Header */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#F5F0EB', margin: 0 }}>
                                    İşlem Detayı
                                </h3>
                                <p style={{ fontSize: '12px', color: '#636366', margin: '4px 0 0' }}>
                                    {new Date(selectedLog.created_at).toLocaleString('tr-TR')}
                                </p>
                            </div>
                            <button onClick={() => setSelectedLog(null)} style={{
                                background: 'rgba(255,255,255,0.06)', border: 'none',
                                borderRadius: '8px', padding: '8px', cursor: 'pointer',
                                color: '#AEAEB2',
                            }}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Drawer Body */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                            {/* Meta Grid */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '1fr 1fr',
                                gap: '16px', marginBottom: '28px',
                            }}>
                                <MetaItem label="Admin" value={selectedLog.admin_email} />
                                <MetaItem label="İşlem" value={getActionInfo(selectedLog.action).label} color={getActionInfo(selectedLog.action).color} />
                                <MetaItem label="Tür" value={selectedLog.entity_type} />
                                <MetaItem label="Nesne" value={selectedLog.entity_name || selectedLog.entity_id || '—'} />
                                <MetaItem label="IP Adres" value={selectedLog.ip_address || '—'} mono />
                                <MetaItem label="Kayıt ID" value={selectedLog.entity_id || '—'} mono />
                            </div>

                            {/* Diff */}
                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#AEAEB2', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    Değişiklik Karşılaştırması
                                </h4>
                                <div style={{
                                    background: 'rgba(255,255,255,0.02)', borderRadius: '10px',
                                    border: '1px solid rgba(255,255,255,0.06)', padding: '16px',
                                    overflow: 'auto',
                                }}>
                                    <JsonDiffViewer oldVal={selectedLog.old_value} newVal={selectedLog.new_value} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// ─── Meta Item Component ────────────────────────────────────────────────────────

function MetaItem({ label, value, color, mono }: { label: string; value: string; color?: string; mono?: boolean }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.02)', borderRadius: '8px',
            padding: '12px', border: '1px solid rgba(255,255,255,0.04)',
        }}>
            <div style={{ fontSize: '11px', color: '#636366', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                {label}
            </div>
            <div style={{
                fontSize: '13px', fontWeight: 600,
                color: color || '#F5F0EB',
                fontFamily: mono ? 'JetBrains Mono, monospace' : 'inherit',
                wordBreak: 'break-all',
            }}>
                {value}
            </div>
        </div>
    );
}

// ─── Styles ─────────────────────────────────────────────────────────────────────

const btnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '8px 14px', borderRadius: '8px',
    fontSize: '13px', fontWeight: 500,
    cursor: 'pointer', transition: 'all 0.15s',
};

const labelStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '4px',
    fontSize: '11px', fontWeight: 600, color: '#636366',
    marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.3px',
};

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    color: '#F5F0EB', fontSize: '13px', outline: 'none',
};

const paginationBtnStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '6px 10px', color: '#AEAEB2',
    cursor: 'pointer', transition: 'all 0.15s',
};

const diffThStyle: React.CSSProperties = {
    padding: '8px', textAlign: 'left', color: '#636366',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3px',
};

const diffTdStyle: React.CSSProperties = {
    padding: '6px 8px', borderBottom: '1px solid rgba(255,255,255,0.03)',
    verticalAlign: 'top', lineHeight: 1.4, wordBreak: 'break-all',
};
