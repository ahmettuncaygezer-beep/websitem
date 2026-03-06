'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Download,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    User,
    Activity,
    Clock,
    Terminal,
    Calendar,
    ArrowUpDown
} from 'lucide-react';
import { toast } from 'react-hot-toast';

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

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage] = useState(20);
    const [filters, setFilters] = useState({
        adminEmail: '',
        action: '',
        entityType: '',
        startDate: '',
        endDate: '',
    });
    const [availableFilters, setAvailableFilters] = useState<{
        adminEmails: string[];
        actions: string[];
    }>({ adminEmails: [], actions: [] });

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams({
                page: page.toString(),
                perPage: perPage.toString(),
                adminEmail: filters.adminEmail,
                action: filters.action,
                entityType: filters.entityType,
                startDate: filters.startDate,
                endDate: filters.endDate,
            });

            const res = await fetch(`/api/admin/audit-logs?${queryParams.toString()}`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Loglar yüklenemedi');

            setLogs(data.logs);
            setTotal(data.total);
            setAvailableFilters(data.filters);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [page, filters]);

    const handleExport = () => {
        const queryParams = new URLSearchParams({
            format: 'csv',
            adminEmail: filters.adminEmail,
            action: filters.action,
            entityType: filters.entityType,
            startDate: filters.startDate,
            endDate: filters.endDate,
        });
        window.open(`/api/admin/audit-logs?${queryParams.toString()}`, '_blank');
        toast.success('Dışa aktarma başlatıldı');
    };

    const formatAction = (action: string) => {
        const parts = action.split('.');
        if (parts.length === 2) {
            const [entity, op] = parts;
            const opLabels: Record<string, string> = {
                'create': 'Oluşturma',
                'update': 'Güncelleme',
                'delete': 'Silme',
                'status_change': 'Durum Değişikliği'
            };
            return `${entity.charAt(0).toUpperCase() + entity.slice(1)} ${opLabels[op] || op}`;
        }
        return action;
    };

    const getActionColor = (action: string) => {
        if (action.includes('delete')) return '#FF453A';
        if (action.includes('create')) return '#30D158';
        if (action.includes('update')) return '#0A84FF';
        return '#C9A96E';
    };

    return (
        <div className="p-8 pb-20 max-w-[1400px] mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">Aktivite Günlüğü</h1>
                    <p className="text-sm text-[#636366] mt-1">Sistemdeki tüm yönetici işlemlerini takip edin ve denetleyin</p>
                </div>
                <button
                    onClick={handleExport}
                    className="bg-[#1C1C1E] border border-white/[0.06] hover:bg-white/[0.03] text-[#F5F0EB] px-5 py-2.5 rounded-sm text-[13px] font-bold transition-colors flex items-center gap-2"
                >
                    <Download size={16} /> CSV Olarak İndir
                </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 bg-[#1C1C1E] p-5 rounded-sm border border-white/[0.06]">
                <div>
                    <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2 tracking-wider">Yönetici</label>
                    <select
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-3 py-2 text-[13px] text-[#F5F0EB] outline-none"
                        value={filters.adminEmail}
                        onChange={(e) => setFilters({ ...filters, adminEmail: e.target.value })}
                    >
                        <option value="">Tüm Yöneticiler</option>
                        {availableFilters.adminEmails.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2 tracking-wider">İşlem Tipi</label>
                    <select
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-3 py-2 text-[13px] text-[#F5F0EB] outline-none"
                        value={filters.action}
                        onChange={(e) => setFilters({ ...filters, action: e.target.value })}
                    >
                        <option value="">Tüm İşlemler</option>
                        {availableFilters.actions.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2 tracking-wider">Tür</label>
                    <select
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-3 py-2 text-[13px] text-[#F5F0EB] outline-none"
                        value={filters.entityType}
                        onChange={(e) => setFilters({ ...filters, entityType: e.target.value })}
                    >
                        <option value="">Tüm Türler</option>
                        <option value="product">Ürün</option>
                        <option value="order">Sipariş</option>
                        <option value="category">Kategori</option>
                        <option value="campaign">Kampanya</option>
                        <option value="settings">Ayarlar</option>
                    </select>
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2 tracking-wider">Başlangıç</label>
                    <input
                        type="date"
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-3 py-2 text-[13px] text-[#F5F0EB] outline-none"
                        value={filters.startDate}
                        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-[11px] font-bold text-[#636366] uppercase mb-2 tracking-wider">Bitiş</label>
                    <input
                        type="date"
                        className="w-full bg-white/[0.02] border border-white/[0.08] rounded-sm px-3 py-2 text-[13px] text-[#F5F0EB] outline-none"
                        value={filters.endDate}
                        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#1C1C1E] border border-white/[0.06] rounded-sm overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <RefreshCw className="animate-spin text-[#C9A96E]" size={32} />
                        <p className="text-sm text-[#636366]">Aktiviteler getiriliyor...</p>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
                        <Activity size={48} />
                        <p className="text-sm">Henüz bir aktivite kaydı bulunmuyor.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.04]">
                                <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">Zaman</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">Yönetici</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">İşlem</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider">Detay</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-[#636366] uppercase tracking-wider text-right">IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id} className="border-b border-white/[0.02] hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-[13px] text-[#F5F0EB]">{new Date(log.created_at).toLocaleDateString('tr-TR')}</span>
                                            <span className="text-[11px] text-[#636366]">{new Date(log.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[#C9A96E]/10 flex items-center justify-center text-[#C9A96E]">
                                                <User size={12} />
                                            </div>
                                            <span className="text-[13px] text-[#AEAEB2]">{log.admin_email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight"
                                            style={{ backgroundColor: `${getActionColor(log.action)}15`, color: getActionColor(log.action) }}
                                        >
                                            {formatAction(log.action)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col max-w-[300px]">
                                            <span className="text-[13px] text-[#F5F0EB] truncate">{log.entity_name || log.entity_id}</span>
                                            <span className="text-[11px] text-[#636366] uppercase tracking-widest">{log.entity_type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-[12px] text-[#636366] font-mono">{log.ip_address}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-between items-center text-[#636366]">
                <p className="text-[12px]">Toplam {total} kayıt bulundu</p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 border border-white/[0.06] rounded-sm hover:bg-white/[0.03] disabled:opacity-30"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-medium px-2">{page} / {Math.ceil(total / perPage) || 1}</span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page >= Math.ceil(total / perPage)}
                        className="p-2 border border-white/[0.06] rounded-sm hover:bg-white/[0.03] disabled:opacity-30"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
