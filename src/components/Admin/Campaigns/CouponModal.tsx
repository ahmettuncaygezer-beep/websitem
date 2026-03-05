'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Tag, Calendar, Layout, Trash2, Percent, DollarSign, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

interface CouponModalProps {
    open: boolean;
    onClose: () => void;
    coupon?: any;
    onSuccess: () => void;
}

export default function CouponModal({ open, onClose, coupon, onSuccess }: CouponModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>({
        code: '',
        discount_type: 'percentage',
        discount_value: 0,
        min_order_amount: 0,
        max_discount_amount: null,
        usage_limit: null,
        usage_limit_per_user: 1,
        starts_at: new Date().toISOString().split('T')[0],
        ends_at: '',
        is_active: true
    });

    useEffect(() => {
        if (coupon) {
            setFormData({
                ...coupon,
                starts_at: coupon.starts_at ? new Date(coupon.starts_at).toISOString().split('T')[0] : '',
                ends_at: coupon.ends_at ? new Date(coupon.ends_at).toISOString().split('T')[0] : ''
            });
        } else {
            setFormData({
                code: '',
                discount_type: 'percentage',
                discount_value: 0,
                min_order_amount: 0,
                max_discount_amount: null,
                usage_limit: null,
                usage_limit_per_user: 1,
                starts_at: new Date().toISOString().split('T')[0],
                ends_at: '',
                is_active: true
            });
        }
    }, [coupon, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = coupon ? `/api/admin/coupons/${coupon.id}` : '/api/admin/coupons';
            const method = coupon ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'İşlem başarısız');

            toast.success(coupon ? 'Kupon güncellendi' : 'Kupon oluşturuldu');
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-[#1C1C1E] w-full max-w-2xl h-auto max-h-[90vh] rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-white/5 flex flex-col"
                >
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Tag className="text-selis-gold" size={20} />
                            <div>
                                <h2 className="text-xl font-serif text-[#F5F0EB]">{coupon ? 'Kuponu Düzenle' : 'Yeni Kupon Oluştur'}</h2>
                                <p className="text-[11px] text-[#636366] mt-0.5">Gelişmiş indirim ve kullanım kuralları belirleyin.</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-[#636366]"><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                        {/* Temel Bilgiler */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-[#636366] uppercase tracking-widest flex items-center gap-2">
                                <Tag size={12} /> KUPON KODU VE İNDİRİM
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-[#AEAEB2] ml-1">Kod</span>
                                    <input
                                        required
                                        value={formData.code}
                                        onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                        placeholder="Örn: YAZ2026"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] outline-none focus:border-selis-gold/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-[#AEAEB2] ml-1">İndirim Tipi</span>
                                    <select
                                        value={formData.discount_type}
                                        onChange={e => setFormData({ ...formData, discount_type: e.target.value })}
                                        className="w-full bg-[#2C2C2E] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] outline-none focus:border-selis-gold/50 transition-colors"
                                    >
                                        <option value="percentage">Yüzde (%)</option>
                                        <option value="fixed_amount">Sabit Tutar (₺)</option>
                                        <option value="free_shipping">Ücretsiz Kargo</option>
                                    </select>
                                </div>
                            </div>

                            {formData.discount_type !== 'free_shipping' && (
                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-[#AEAEB2] ml-1">İndirim Değeri</span>
                                    <div className="relative">
                                        {formData.discount_type === 'percentage' ? (
                                            <Percent size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#636366]" />
                                        ) : (
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#636366] text-sm">₺</span>
                                        )}
                                        <input
                                            type="number"
                                            required
                                            value={formData.discount_value}
                                            onChange={e => setFormData({ ...formData, discount_value: parseFloat(e.target.value) })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-[#F5F0EB] outline-none focus:border-selis-gold/50 transition-colors"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Kısıtlamalar */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-[#636366] uppercase tracking-widest flex items-center gap-2">
                                <Layout size={12} /> KISITLAMALAR VE LİMİTLER
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-[#AEAEB2] ml-1">Min. Sepet Tutarı</span>
                                    <input
                                        type="number"
                                        value={formData.min_order_amount}
                                        onChange={e => setFormData({ ...formData, min_order_amount: parseFloat(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] outline-none focus:border-selis-gold/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-[#AEAEB2] ml-1">Maks. İndirim Tutarı</span>
                                    <input
                                        type="number"
                                        value={formData.max_discount_amount || ''}
                                        onChange={e => setFormData({ ...formData, max_discount_amount: e.target.value ? parseFloat(e.target.value) : null })}
                                        placeholder="Sınırsız"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] outline-none focus:border-selis-gold/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-[#AEAEB2] ml-1">Toplam Kullanım Limiti</span>
                                    <input
                                        type="number"
                                        value={formData.usage_limit || ''}
                                        onChange={e => setFormData({ ...formData, usage_limit: e.target.value ? parseInt(e.target.value) : null })}
                                        placeholder="Sınırsız"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] outline-none focus:border-selis-gold/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-[#AEAEB2] ml-1">Kişi Başı Kullanım Limiti</span>
                                    <input
                                        type="number"
                                        value={formData.usage_limit_per_user}
                                        onChange={e => setFormData({ ...formData, usage_limit_per_user: parseInt(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] outline-none focus:border-selis-gold/50 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tarihler */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold text-[#636366] uppercase tracking-widest flex items-center gap-2">
                                <Calendar size={12} /> GEÇERLİLİK SÜRESİ
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-[#AEAEB2] ml-1">Başlangıç Tarihi</span>
                                    <input
                                        type="date"
                                        required
                                        value={formData.starts_at}
                                        onChange={e => setFormData({ ...formData, starts_at: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] outline-none focus:border-selis-gold/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-[#AEAEB2] ml-1">Bitiş Tarihi</span>
                                    <input
                                        type="date"
                                        value={formData.ends_at}
                                        onChange={e => setFormData({ ...formData, ends_at: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F5F0EB] outline-none focus:border-selis-gold/50 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Durum */}
                        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                                className="w-5 h-5 rounded-md accent-selis-gold"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-[#F5F0EB] cursor-pointer">
                                Bu kupon aktif ve müşteriler tarafından kullanılabilir.
                            </label>
                        </div>
                    </form>

                    <div className="p-6 border-t border-white/5 bg-[#2C2C2E]/30 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl text-xs font-bold text-[#AEAEB2] hover:bg-white/5 transition-all uppercase tracking-widest"
                        >
                            İptal
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-3 bg-selis-gold text-[#0F0F10] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#D4B87A] transition-all disabled:opacity-50"
                        >
                            <Save size={16} /> {loading ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
