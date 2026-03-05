'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Send, TestTube, Mail, CheckCircle, XCircle, Clock, X, Eye, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SubscriberStats } from '@/components/Admin/Email/SubscriberStats';

interface SendHistoryItem {
    id: string;
    type: string;
    to_email: string;
    subject: string;
    status: string;
    error_message: string | null;
    created_at: string;
}

interface SubscriberItem {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    source: string;
    status: string;
    is_active: boolean;
    created_at: string;
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
    sent: <CheckCircle size={14} color="#30D158" />,
    simulated: <Clock size={14} color="#FFD60A" />,
    failed: <XCircle size={14} color="#FF453A" />,
};

const STATUS_LABELS: Record<string, string> = {
    sent: 'Gönderildi',
    simulated: 'Simüle',
    failed: 'Başarısız',
};

const TYPE_LABELS: Record<string, string> = {
    test: 'Test',
    order_confirmation: 'Sipariş Onayı',
    welcome: 'Hoş Geldin',
    contact_form: 'İletişim',
    newsletter: 'Bülten',
};

export default function EmailCenterPage() {
    const [history, setHistory] = useState<SendHistoryItem[]>([]);
    const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
    const [stats, setStats] = useState({ total: 0, active: 0, newThisMonth: 0, growth: 0 });
    const [loading, setLoading] = useState(true);
    const [showTestModal, setShowTestModal] = useState(false);
    const [showTemplatePreview, setShowTemplatePreview] = useState<string | null>(null);
    const [testEmail, setTestEmail] = useState('');
    const [testSending, setTestSending] = useState(false);
    const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch send history
            const historyRes = await fetch('/api/email?limit=30');
            const historyData = await historyRes.json();
            setHistory(historyData.history || []);

            // Fetch subscribers
            const subsRes = await fetch('/api/admin/newsletter/subscribers');
            const subsData = await subsRes.json();
            const subs = subsData.subscribers || [];
            setSubscribers(subs);

            // Calculate stats from real data
            const activeSubs = subs.filter((s: any) => s.is_active !== false && s.status !== 'unsubscribed');
            const thisMonth = new Date();
            thisMonth.setDate(1);
            thisMonth.setHours(0, 0, 0, 0);
            const newThisMonth = subs.filter((s: any) => new Date(s.created_at) >= thisMonth).length;

            setStats({
                total: subs.length,
                active: activeSubs.length,
                newThisMonth,
                growth: subs.length > 0 ? Number(((newThisMonth / subs.length) * 100).toFixed(1)) : 0
            });
        } catch (err) {
            console.error('[EmailCenter] Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSendTest = async () => {
        if (!testEmail) return;
        setTestSending(true);
        setTestResult(null);
        try {
            const res = await fetch('/api/email/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to: testEmail })
            });
            const data = await res.json();
            setTestResult({
                success: res.ok,
                message: data.message || data.error || 'Bilinmeyen durum'
            });
            if (res.ok) {
                // Refresh history
                const historyRes = await fetch('/api/email?limit=30');
                const historyData = await historyRes.json();
                setHistory(historyData.history || []);
            }
        } catch {
            setTestResult({ success: false, message: 'Bağlantı hatası' });
        } finally {
            setTestSending(false);
        }
    };

    const TEMPLATE_PREVIEWS: Record<string, { name: string; html: string }> = {
        order: {
            name: 'Sipariş Onayı',
            html: `<div style="font-family:system-ui;max-width:500px;margin:0 auto;background:#fff;padding:32px;border-radius:12px;"><div style="text-align:center;margin-bottom:24px;"><div style="width:56px;height:56px;background:#E8F5E9;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:28px;">✓</div></div><h2 style="text-align:center;color:#1C1C1E;">Siparişiniz Alındı</h2><p style="text-align:center;color:#6B6560;">Sipariş numaranız: <strong>#3821</strong></p><div style="background:#FAF8F5;border-radius:12px;padding:16px;margin:16px 0;"><p style="margin:4px 0;font-size:13px;">Toplam: <strong>₺42.500</strong></p><p style="margin:4px 0;font-size:13px;">Durum: <strong style="color:#C9A96E;">Hazırlanıyor</strong></p></div></div>`
        },
        welcome: {
            name: 'Hoş Geldiniz',
            html: `<div style="font-family:system-ui;max-width:500px;margin:0 auto;background:#fff;padding:32px;border-radius:12px;"><h2 style="text-align:center;color:#1C1C1E;">Hoş Geldiniz!</h2><p style="text-align:center;color:#6B6560;line-height:1.6;">SELIS HOME CONCEPT ailesine katıldığınız için teşekkürler. Premium koleksiyonumuzu keşfetmek için hemen başlayın.</p><div style="text-align:center;margin-top:24px;"><a href="#" style="display:inline-block;background:#1C1C1E;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:bold;">Alışverişe Başla</a></div></div>`
        },
        shipping: {
            name: 'Kargo Bildirimi',
            html: `<div style="font-family:system-ui;max-width:500px;margin:0 auto;background:#fff;padding:32px;border-radius:12px;"><div style="text-align:center;margin-bottom:24px;"><div style="width:56px;height:56px;background:#E3F2FD;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:28px;">📦</div></div><h2 style="text-align:center;color:#1C1C1E;">Kargonuz Yolda!</h2><p style="text-align:center;color:#6B6560;">Siparişiniz kargoya verilmiştir.</p><div style="background:#FAF8F5;border-radius:12px;padding:16px;margin:16px 0;"><p style="margin:4px 0;font-size:13px;">Takip No: <strong>TR12345678</strong></p><p style="margin:4px 0;font-size:13px;">Kargo: <strong>Yurtiçi Kargo</strong></p></div></div>`
        }
    };

    return (
        <div className="p-8 pb-20">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-[28px] font-semibold text-[#F5F0EB] font-['Playfair_Display',serif]">E-posta & Bülten Merkezi</h1>
                    <p className="text-sm text-[#636366] mt-1">
                        Abone yönetimi ve e-posta kampanyaları
                        {!loading && <span style={{ color: '#30D158', marginLeft: '8px' }}>● Canlı Veri</span>}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setShowTestModal(true)}
                        className="flex items-center gap-2 bg-transparent hover:bg-[rgba(255,255,255,0.05)] text-[#AEAEB2] px-5 py-2.5 rounded-sm text-[13px] font-bold transition-all border border-[rgba(255,255,255,0.1)]"
                    >
                        <TestTube size={16} /> Test Maili Gönder
                    </button>
                    <Link
                        href="/admin/eposta/yeni-bulten"
                        className="flex items-center gap-2 bg-[#C9A96E] hover:bg-[#D4B87A] text-[#0F0F10] px-6 py-2.5 rounded-sm text-[13px] font-bold transition-all shadow-[0_4px_20px_rgba(201,169,110,0.2)]"
                    >
                        <Plus size={16} /> Yeni Bülten Oluştur
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <SubscriberStats stats={stats} />

            {/* Send History */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[16px] font-semibold text-[#F5F0EB]">Gönderim Geçmişi</h3>
                    <button onClick={fetchData} className="text-[12px] text-[#636366] hover:text-[#C9A96E] font-semibold uppercase tracking-wider flex items-center gap-1">
                        <RefreshCcw size={12} /> Yenile
                    </button>
                </div>
                {loading ? (
                    <div style={{ background: '#1C1C1E', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
                        <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                            <span style={{ color: '#636366', fontSize: '13px' }}>Yükleniyor...</span>
                        </motion.div>
                    </div>
                ) : history.length === 0 ? (
                    <div style={{ background: '#1C1C1E', borderRadius: '8px', padding: '40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Mail size={24} color="#636366" style={{ margin: '0 auto 12px' }} />
                        <p style={{ color: '#636366', fontSize: '13px' }}>Henüz gönderim geçmişi yok. Test maili göndererek başlayın!</p>
                    </div>
                ) : (
                    <div style={{ background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <th style={thStyle}>Durum</th>
                                    <th style={thStyle}>Tip</th>
                                    <th style={thStyle}>Alıcı</th>
                                    <th style={thStyle}>Konu</th>
                                    <th style={thStyle}>Tarih</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((item) => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={tdStyle}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                {STATUS_ICONS[item.status] || <Clock size={14} color="#636366" />}
                                                <span style={{ fontSize: '11px', color: item.status === 'failed' ? '#FF453A' : '#AEAEB2' }}>
                                                    {STATUS_LABELS[item.status] || item.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={tdStyle}>
                                            <span style={{ fontSize: '11px', background: 'rgba(201,169,110,0.08)', color: '#C9A96E', padding: '2px 8px', borderRadius: '4px' }}>
                                                {TYPE_LABELS[item.type] || item.type}
                                            </span>
                                        </td>
                                        <td style={{ ...tdStyle, color: '#F5F0EB', fontSize: '12px' }}>{item.to_email}</td>
                                        <td style={{ ...tdStyle, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.subject || '-'}</td>
                                        <td style={tdStyle}>{new Date(item.created_at).toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Templates */}
            <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[16px] font-semibold text-[#F5F0EB]">Sistem Şablonları</h3>
                    <Link href="/admin/eposta/sablonlar" className="text-[12px] text-[#636366] hover:text-[#C9A96E] font-semibold uppercase tracking-wider">Tüm Şablonlar →</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(TEMPLATE_PREVIEWS).map(([key, tpl]) => (
                        <div key={key} style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB' }}>{tpl.name}</span>
                                <button
                                    onClick={() => setShowTemplatePreview(key)}
                                    style={{ background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.15)', borderRadius: '4px', padding: '4px 10px', fontSize: '11px', color: '#C9A96E', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    <Eye size={12} /> Önizle
                                </button>
                            </div>
                            <div style={{ height: '120px', background: '#FAF8F5', borderRadius: '6px', overflow: 'hidden', transform: 'scale(0.6)', transformOrigin: 'top left', width: '166%' }}>
                                <div dangerouslySetInnerHTML={{ __html: tpl.html }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subscribers Table */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[16px] font-semibold text-[#F5F0EB]">Abone Listesi ({subscribers.length})</h3>
                </div>
                {subscribers.length > 0 ? (
                    <div style={{ background: '#1C1C1E', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <th style={thStyle}>E-posta</th>
                                    <th style={thStyle}>Ad</th>
                                    <th style={thStyle}>Kaynak</th>
                                    <th style={thStyle}>Durum</th>
                                    <th style={thStyle}>Kayıt Tarihi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscribers.slice(0, 20).map((sub) => (
                                    <tr key={sub.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ ...tdStyle, color: '#F5F0EB', fontSize: '12px' }}>{sub.email}</td>
                                        <td style={tdStyle}>{[sub.first_name, sub.last_name].filter(Boolean).join(' ') || '-'}</td>
                                        <td style={tdStyle}>
                                            <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#AEAEB2' }}>
                                                {sub.source || 'DIRECT'}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>
                                            <span style={{ color: sub.is_active !== false && sub.status !== 'unsubscribed' ? '#30D158' : '#FF453A', fontSize: '11px' }}>
                                                {sub.is_active !== false && sub.status !== 'unsubscribed' ? '● Aktif' : '○ Pasif'}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>{new Date(sub.created_at).toLocaleDateString('tr-TR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {subscribers.length > 20 && (
                            <div style={{ padding: '12px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                                <span style={{ fontSize: '12px', color: '#636366' }}>+{subscribers.length - 20} daha fazla abone</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ background: '#1C1C1E', borderRadius: '8px', padding: '40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ color: '#636366', fontSize: '13px' }}>Henüz abone yok.</p>
                    </div>
                )}
            </div>

            {/* Test Email Modal */}
            <AnimatePresence>
                {showTestModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => { setShowTestModal(false); setTestResult(null); }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            style={{ background: '#1C1C1E', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '32px', width: '440px', maxWidth: '90vw' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Test Maili Gönder</h3>
                                <button onClick={() => { setShowTestModal(false); setTestResult(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#636366' }}>
                                    <X size={20} />
                                </button>
                            </div>
                            <p style={{ fontSize: '13px', color: '#636366', marginBottom: '20px' }}>E-posta sisteminizin düzgün çalıştığını doğrulamak için bir test maili gönderin.</p>
                            <input
                                type="email"
                                placeholder="ornek@email.com"
                                value={testEmail}
                                onChange={e => setTestEmail(e.target.value)}
                                style={{
                                    width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '6px', padding: '12px 14px', fontSize: '14px', color: '#F5F0EB', outline: 'none', marginBottom: '16px',
                                    boxSizing: 'border-box'
                                }}
                            />

                            {testResult && (
                                <div style={{
                                    padding: '12px 14px', borderRadius: '6px', marginBottom: '16px',
                                    background: testResult.success ? 'rgba(48,209,88,0.08)' : 'rgba(255,69,58,0.08)',
                                    border: `1px solid ${testResult.success ? 'rgba(48,209,88,0.2)' : 'rgba(255,69,58,0.2)'}`,
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {testResult.success ? <CheckCircle size={16} color="#30D158" /> : <XCircle size={16} color="#FF453A" />}
                                        <span style={{ fontSize: '13px', color: testResult.success ? '#30D158' : '#FF453A', fontWeight: 600 }}>
                                            {testResult.success ? 'Başarılı!' : 'Hata'}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '12px', color: '#AEAEB2', marginTop: '4px' }}>{testResult.message}</p>
                                </div>
                            )}

                            <button
                                onClick={handleSendTest}
                                disabled={testSending || !testEmail}
                                style={{
                                    width: '100%', background: '#C9A96E', color: '#0F0F10', border: 'none',
                                    padding: '12px', borderRadius: '6px', fontSize: '14px', fontWeight: 600,
                                    cursor: testSending || !testEmail ? 'not-allowed' : 'pointer',
                                    opacity: testSending || !testEmail ? 0.6 : 1,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                }}
                            >
                                {testSending ? <RefreshCcw size={16} className="animate-spin" /> : <Send size={16} />}
                                {testSending ? 'Gönderiliyor...' : 'Test Maili Gönder'}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Template Preview Modal */}
            <AnimatePresence>
                {showTemplatePreview && TEMPLATE_PREVIEWS[showTemplatePreview] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => setShowTemplatePreview(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            onClick={e => e.stopPropagation()}
                            style={{ background: '#fff', borderRadius: '16px', padding: '0', width: '600px', maxWidth: '90vw', maxHeight: '80vh', overflow: 'auto' }}
                        >
                            <div style={{ background: '#1C1C1E', padding: '16px 24px', borderRadius: '16px 16px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB' }}>
                                    {TEMPLATE_PREVIEWS[showTemplatePreview].name} — Önizleme
                                </span>
                                <button onClick={() => setShowTemplatePreview(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#636366' }}>
                                    <X size={18} />
                                </button>
                            </div>
                            <div style={{ padding: '24px' }} dangerouslySetInnerHTML={{ __html: TEMPLATE_PREVIEWS[showTemplatePreview].html }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const thStyle: React.CSSProperties = {
    padding: '12px 20px', textAlign: 'left', fontSize: '10px', fontWeight: 600,
    color: '#636366', textTransform: 'uppercase', letterSpacing: '0.05em'
};

const tdStyle: React.CSSProperties = {
    padding: '10px 20px', fontSize: '12px', color: '#AEAEB2'
};
