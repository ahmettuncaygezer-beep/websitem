'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Inbox,
    Eye,
    CheckCircle2,
    XCircle,
    Search,
    Filter,
    MoreVertical,
    Clock,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Save,
    X,
    MessageSquare,
    Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ConciergeRequest {
    id: string;
    customer_id?: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    request_type: string;
    message: string;
    budget: number;
    status: 'bekliyor' | 'inceleniyor' | 'tamamlandi' | 'iptal';
    admin_notes: string;
    assigned_to?: string;
    created_at: string;
}

export default function AdminConciergePage() {
    const [requests, setRequests] = useState<ConciergeRequest[]>([]);
    const [counts, setCounts] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'bekliyor' | 'inceleniyor' | 'tamamlandi'>('all');
    const [search, setSearch] = useState('');

    const [selectedRequest, setSelectedRequest] = useState<ConciergeRequest | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Edit state
    const [editStatus, setEditStatus] = useState<'bekliyor' | 'inceleniyor' | 'tamamlandi' | 'iptal'>('bekliyor');
    const [editNotes, setEditNotes] = useState('');

    useEffect(() => {
        fetchRequests();
    }, [activeTab]);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const url = new URL('/api/admin/concierge', window.location.origin);
            if (activeTab !== 'all') {
                url.searchParams.set('status', activeTab);
            }
            const res = await fetch(url.toString());
            const json = await res.json();
            if (res.ok) {
                setRequests(json.data || []);
                setCounts(json.counts || {});
            }
        } catch (error) {
            toast.error('Talepler yüklenemedi');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenDrawer = (req: ConciergeRequest) => {
        setSelectedRequest(req);
        setEditStatus(req.status);
        setEditNotes(req.admin_notes || '');
    };

    const handleSave = async () => {
        if (!selectedRequest) return;
        setIsSaving(true);

        try {
            const res = await fetch(`/api/admin/concierge/${selectedRequest.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: editStatus,
                    admin_notes: editNotes
                })
            });

            if (!res.ok) throw new Error('Kaydedilemedi');
            const updated = await res.json();

            toast.success('Talep güncellendi');
            setRequests(prev => prev.map(r => r.id === updated.id ? updated : r));
            setSelectedRequest(null);
            fetchRequests(); // refresh counts
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount || 0);
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'bekliyor': return { label: 'Bekliyor', color: '#FF9F0A', bg: 'rgba(255,159,10,0.1)' };
            case 'inceleniyor': return { label: 'İnceleniyor', color: '#0A84FF', bg: 'rgba(10,132,255,0.1)' };
            case 'tamamlandi': return { label: 'Tamamlandı', color: '#30D158', bg: 'rgba(48,209,88,0.1)' };
            case 'iptal': return { label: 'İptal', color: '#FF453A', bg: 'rgba(255,69,58,0.1)' };
            default: return { label: status, color: '#636366', bg: 'rgba(255,255,255,0.1)' };
        }
    };

    const getRequestTypeLabel = (type: string) => {
        switch (type) {
            case 'ozel_siparis': return 'Özel Sipariş';
            case 'stil_danisma': return 'Stil Danışmanlığı';
            case 'hediye': return 'Hediye Seçimi';
            default: return type;
        }
    };

    const filteredRequests = requests.filter(r =>
        r.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        r.customer_email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 500, color: '#F5F0EB', margin: 0 }}>Concierge Talepleri</h1>
                    <div style={{ fontSize: '13px', color: '#AEAEB2', marginTop: '2px' }}>Özel sipariş ve stil danışmanlığı yönetimi</div>
                </div>
            </div>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                {[
                    { label: 'Toplam Talep', value: counts?.total || 0, icon: Inbox, color: '#F5F0EB' },
                    { label: 'Bekleyen', value: counts?.bekliyor || 0, icon: Clock, color: '#FF9F0A' },
                    { label: 'İncelenen', value: counts?.inceleniyor || 0, icon: Eye, color: '#0A84FF' },
                    { label: 'Tamamlanan', value: counts?.tamamlandi || 0, icon: CheckCircle2, color: '#30D158' }
                ].map((kpi, idx) => (
                    <div key={idx} style={{ background: '#1C1C1E', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <span style={{ fontSize: '12px', color: '#AEAEB2', fontWeight: 600 }}>{kpi.label}</span>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <kpi.icon size={16} color={kpi.color} />
                            </div>
                        </div>
                        <div style={{ fontSize: '28px', fontWeight: 600, color: '#F5F0EB' }}>{kpi.value}</div>
                    </div>
                ))}
            </div>

            <div style={{ background: '#1C1C1E', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                {/* Toolbar */}
                <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {[
                            { id: 'all', label: 'Tümü' },
                            { id: 'bekliyor', label: 'Bekleyenler' },
                            { id: 'inceleniyor', label: 'İncelenenler' },
                            { id: 'tamamlandi', label: 'Tamamlananlar' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                style={{
                                    background: 'none', border: 'none', padding: '8px 0', fontSize: '13px',
                                    fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? '#C9A96E' : '#636366',
                                    cursor: 'pointer', borderBottom: `2px solid ${activeTab === tab.id ? '#C9A96E' : 'transparent'}`,
                                    transition: 'all 200ms'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={14} color="#636366" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                            <input
                                type="text"
                                placeholder="Müşteri Ara..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px',
                                    padding: '8px 12px 8px 32px', color: '#F5F0EB', fontSize: '13px', outline: 'none', width: '200px'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                {['Müşteri', 'İletişim', 'Talep Türü', 'Bütçe', 'Tarih', 'Durum'].map(h => (
                                    <th key={h} style={{ padding: '16px 24px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#636366', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '60px', textAlign: 'center' }}>
                                        <Loader2 size={32} color="#C9A96E" style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                                    </td>
                                </tr>
                            ) : filteredRequests.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '60px', textAlign: 'center', color: '#636366' }}>
                                        Kayıt bulunamadı.
                                    </td>
                                </tr>
                            ) : (
                                filteredRequests.map(req => {
                                    const statusObj = getStatusInfo(req.status);
                                    return (
                                        <tr
                                            key={req.id}
                                            onClick={() => handleOpenDrawer(req)}
                                            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 200ms' }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td style={{ padding: '16px 24px', color: '#F5F0EB', fontSize: '14px', fontWeight: 500 }}>
                                                {req.customer_name}
                                                {req.customer_id && <span style={{ marginLeft: '8px', fontSize: '10px', background: '#30D15820', color: '#30D158', padding: '2px 6px', borderRadius: '4px' }}>Kayıtlı</span>}
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <div style={{ fontSize: '13px', color: '#E5E5E5' }}>{req.customer_email}</div>
                                                <div style={{ fontSize: '12px', color: '#636366' }}>{req.customer_phone || '-'}</div>
                                            </td>
                                            <td style={{ padding: '16px 24px', color: '#AEAEB2', fontSize: '13px' }}>
                                                {getRequestTypeLabel(req.request_type)}
                                            </td>
                                            <td style={{ padding: '16px 24px', color: '#F5F0EB', fontSize: '13px', fontWeight: 500 }}>
                                                {req.budget ? formatCurrency(req.budget) : 'Belirtilmedi'}
                                            </td>
                                            <td style={{ padding: '16px 24px', color: '#636366', fontSize: '13px' }}>
                                                {new Date(req.created_at).toLocaleDateString('tr-TR')}
                                            </td>
                                            <td style={{ padding: '16px 24px' }}>
                                                <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: statusObj.bg, color: statusObj.color }}>
                                                    {statusObj.label}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Drawer */}
            <AnimatePresence>
                {selectedRequest && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedRequest(null)}
                            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 100 }}
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed', top: 0, right: 0, bottom: 0, width: '800px', background: '#141416',
                                borderLeft: '1px solid rgba(255,255,255,0.06)', zIndex: 101, display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 40px rgba(0,0,0,0.3)'
                            }}
                        >
                            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Talep Detayı</h2>
                                <button onClick={() => setSelectedRequest(null)} style={{ background: 'none', border: 'none', color: '#636366', cursor: 'pointer' }}><X size={20} /></button>
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
                                {/* Left: Customer & Request Info */}
                                <div style={{ flex: 1, padding: '24px', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
                                    <h3 style={sectionTitleStyle}>MÜŞTERİ BİLGİLERİ</h3>
                                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '16px', marginBottom: '32px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#C9A96E', color: '#0F0F10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 600 }}>
                                                {selectedRequest.customer_name.charAt(0)}
                                            </div>
                                            <div>
                                                <div style={{ color: '#F5F0EB', fontSize: '15px', fontWeight: 600 }}>{selectedRequest.customer_name}</div>
                                                <div style={{ color: '#636366', fontSize: '12px' }}>ID: {selectedRequest.customer_id || 'Ziyaretçi'}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <InfoRow icon={Mail} label="E-posta" value={selectedRequest.customer_email} />
                                            <InfoRow icon={Phone} label="Telefon" value={selectedRequest.customer_phone || '-'} />
                                        </div>
                                    </div>

                                    <h3 style={sectionTitleStyle}>TALEP DETAYI</h3>
                                    <div style={{ background: '#1C1C1E', borderRadius: '8px', padding: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                            <div>
                                                <div style={{ fontSize: '11px', color: '#636366', marginBottom: '4px' }}>TÜR</div>
                                                <div style={{ color: '#F5F0EB', fontSize: '14px', fontWeight: 500 }}>{getRequestTypeLabel(selectedRequest.request_type)}</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '11px', color: '#636366', marginBottom: '4px' }}>TARİH</div>
                                                <div style={{ color: '#F5F0EB', fontSize: '14px' }}>{new Date(selectedRequest.created_at).toLocaleString('tr-TR')}</div>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '20px' }}>
                                            <div style={{ fontSize: '11px', color: '#636366', marginBottom: '4px' }}>BÜTÇE HEDEFİ</div>
                                            <div style={{ color: '#C9A96E', fontSize: '16px', fontWeight: 600 }}>{selectedRequest.budget ? formatCurrency(selectedRequest.budget) : 'Belirtilmedi'}</div>
                                        </div>

                                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                                            <div style={{ fontSize: '11px', color: '#636366', marginBottom: '8px' }}>MESAJ</div>
                                            <p style={{ color: '#AEAEB2', fontSize: '14px', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                                                {selectedRequest.message || 'Mesaj bırakılmadı.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Admin Controls */}
                                <div style={{ width: '320px', padding: '24px', background: 'rgba(0,0,0,0.2)' }}>
                                    <h3 style={sectionTitleStyle}>YÖNETİM</h3>

                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={labelStyle}>Durum</label>
                                        <select
                                            value={editStatus}
                                            onChange={e => setEditStatus(e.target.value as any)}
                                            style={inputStyle}
                                        >
                                            <option value="bekliyor">Bekliyor</option>
                                            <option value="inceleniyor">İnceleniyor</option>
                                            <option value="tamamlandi">Tamamlandı</option>
                                            <option value="iptal">İptal Edildi</option>
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={labelStyle}>Sorumlu Temsilci (Opsiyonel)</label>
                                        <select style={inputStyle} defaultValue="">
                                            <option value="">Atanmadı</option>
                                            <option value="admin1">Berk Yılmaz (İç Mimar)</option>
                                            <option value="admin2">Ayşe Demir (Satış)</option>
                                        </select>
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={labelStyle}>Admin Notları (Sadece kurum içi)</label>
                                        <textarea
                                            value={editNotes}
                                            onChange={e => setEditNotes(e.target.value)}
                                            style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                                            placeholder="Görüşme detayları veya ek bilgiler..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'flex-end', gap: '12px', background: '#0F0F10' }}>
                                <button
                                    onClick={() => setSelectedRequest(null)}
                                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#F5F0EB', padding: '10px 20px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    style={{ background: '#C9A96E', border: 'none', color: '#0F0F10', padding: '10px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    {isSaving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                                    Değişiklikleri Kaydet
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

function InfoRow({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Icon size={14} color="#636366" />
            <div>
                <div style={{ fontSize: '10px', color: '#636366', textTransform: 'uppercase' }}>{label}</div>
                <div style={{ fontSize: '13px', color: '#F5F0EB', userSelect: 'all' }}>{value}</div>
            </div>
        </div>
    );
}

const sectionTitleStyle = { fontSize: '11px', fontWeight: 600, color: '#636366', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '16px' };
const labelStyle = { fontSize: '12px', color: '#AEAEB2', marginBottom: '8px', display: 'block' };
const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '8px', padding: '10px 14px', color: '#F5F0EB', fontSize: '13px', outline: 'none',
    boxSizing: 'border-box' as const
};
