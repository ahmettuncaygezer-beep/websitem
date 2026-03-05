'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Calendar, Percent, Copy, Check, Edit3, Trash2, Users, ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/types/admin/campaigns';

interface CouponCardProps {
    coupon: any;
    onEdit: (coupon: any) => void;
    onDelete: (id: string) => void;
}

export function CouponCard({ coupon, onEdit, onDelete }: CouponCardProps) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(coupon.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const discountLabel = coupon.discount_type === 'percentage'
        ? `%${coupon.discount_value}`
        : coupon.discount_type === 'fixed_amount'
            ? `₺${coupon.discount_value}`
            : 'Ücretsiz Kargo';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 hover:border-selis-gold/20 transition-all group"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-selis-gold/10 flex items-center justify-center text-selis-gold">
                        <Tag size={20} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-[#F5F0EB] font-serif">{coupon.code}</h3>
                            <button onClick={handleCopy} className="text-[#636366] hover:text-[#F5F0EB]">
                                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                        </div>
                        <p className="text-[11px] text-[#636366] mt-0.5 uppercase tracking-widest">{discountLabel} İNDİRİM</p>
                    </div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${coupon.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {coupon.is_active ? 'Aktif' : 'Pasif'}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-6">
                <div className="flex items-center gap-2 text-[#AEAEB2]">
                    <Users size={14} />
                    <span className="text-xs">{coupon.used_count} / {coupon.usage_limit || '∞'} Kullanım</span>
                </div>
                <div className="flex items-center gap-2 text-[#AEAEB2]">
                    <ShoppingCart size={14} />
                    <span className="text-xs">Min: ₺{coupon.min_order_amount}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#636366] mb-6">
                <Calendar size={12} />
                <span>{new Date(coupon.starts_at).toLocaleDateString('tr-TR')} - {coupon.ends_at ? new Date(coupon.ends_at).toLocaleDateString('tr-TR') : '∞'}</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(coupon)}
                    className="p-2 hover:bg-white/5 rounded-lg text-[#AEAEB2] hover:text-selis-gold transition-colors"
                >
                    <Edit3 size={16} />
                </button>
                <button
                    onClick={() => onDelete(coupon.id)}
                    className="p-2 hover:bg-white/5 rounded-lg text-[#AEAEB2] hover:text-red-500 transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </motion.div>
    );
}
