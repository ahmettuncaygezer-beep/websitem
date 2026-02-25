'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRewards } from '@/hooks/useRewards';
import { AccountHeader } from '@/components/Account/AccountHeader';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { PointTransactionType } from '@/types/account.types';

export default function PuanOdullerimPage() {
    const {
        points, pointsValue, currentTier, nextTier, tierProgress, amountToNextTier,
        filteredTransactions, filter, setFilter, expiringPoints, redeemPoints, allTiers,
    } = useRewards();

    const [redeemAmount, setRedeemAmount] = useState('');
    const [coupon, setCoupon] = useState<{ code: string; value: number } | null>(null);

    const handleRedeem = () => {
        const amount = parseInt(redeemAmount, 10);
        if (!amount || amount < 100) return;
        const result = redeemPoints(amount);
        if (result) {
            setCoupon(result);
            setRedeemAmount('');
        }
    };

    const filterTabs: { key: PointTransactionType | 'all'; label: string }[] = [
        { key: 'all', label: 'Tümü' },
        { key: 'earned', label: 'Kazanılan' },
        { key: 'spent', label: 'Harcanan' },
        { key: 'expired', label: 'Süresi Dolan' },
    ];

    return (
        <div>
            <AccountHeader title="Puan & Ödüllerim" breadcrumbs={[{ label: 'Puan & Ödüllerim' }]} />

            {/* Points overview */}
            <div className="p-6 mb-4" style={{ background: 'linear-gradient(135deg, #1C1C1E, #2C2C2E)', borderRadius: '8px', color: 'white' }}>
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Toplam Puanınız</p>
                        <p className="text-4xl font-bold mt-1" style={{ color: '#C9A96E' }}>{points.toLocaleString('tr-TR')}</p>
                        <p className="text-[12px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>= ₺{pointsValue.toLocaleString('tr-TR')} indirim değeri</p>
                    </div>
                    {expiringPoints > 0 && (
                        <div className="px-4 py-2 rounded-lg" style={{ background: 'rgba(229,57,53,0.15)' }}>
                            <p className="text-[11px] font-semibold" style={{ color: '#FF8A80' }}>⚠️ {expiringPoints} puan 30 gün içinde sona erecek</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Tier progress */}
            <div className="p-6 mb-4" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                <h3 className="text-[15px] font-semibold mb-4" style={{ color: '#1C1C1E' }}>Üyelik Seviyesi</h3>
                <div className="flex items-center gap-6 mb-4 overflow-x-auto pb-2">
                    {allTiers.map((tier) => {
                        const isActive = tier.name === currentTier.name;
                        return (
                            <div key={tier.name} className="text-center flex-shrink-0">
                                <motion.div
                                    animate={{ scale: isActive ? 1.15 : 1, opacity: isActive ? 1 : 0.5 }}
                                    className="text-3xl mb-1"
                                >
                                    {tier.icon}
                                </motion.div>
                                <p className="text-[11px] font-semibold" style={{ color: isActive ? '#C9A96E' : '#999' }}>{tier.name}</p>
                            </div>
                        );
                    })}
                </div>
                {nextTier && (
                    <>
                        <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: '#F0EDE8' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${tierProgress}%` }}
                                transition={{ duration: 1 }}
                                className="h-full rounded-full"
                                style={{ background: 'linear-gradient(90deg, #C9A96E, #D4B87A)' }}
                            />
                        </div>
                        <p className="text-[11px] text-right" style={{ color: '#999' }}>
                            {nextTier.name} seviyesi için ₺{amountToNextTier.toLocaleString('tr-TR')} daha harcama yapın
                        </p>
                    </>
                )}

                {/* Benefits */}
                <div className="mt-4 p-4 rounded-lg" style={{ background: '#FDF8F0' }}>
                    <p className="text-[12px] font-semibold mb-2" style={{ color: '#C9A96E' }}>{currentTier.icon} {currentTier.name} Avantajları</p>
                    <ul className="space-y-1">
                        {currentTier.benefits.map((b, i) => (
                            <li key={i} className="text-[12px] flex items-center gap-1.5" style={{ color: '#666' }}>
                                <span style={{ color: '#4CAF50' }}>✓</span> {b}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Redeem */}
            <div className="p-6 mb-4" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                <h3 className="text-[15px] font-semibold mb-4" style={{ color: '#1C1C1E' }}>Puan Kullan</h3>
                {coupon ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 text-center rounded-lg" style={{ background: '#E8F5E9', border: '1px solid #C8E6C9' }}>
                        <p className="text-lg font-bold mb-1" style={{ color: '#4CAF50' }}>✓ Kupon Oluşturuldu!</p>
                        <p className="text-2xl font-mono font-bold my-2" style={{ color: '#1C1C1E' }}>{coupon.code}</p>
                        <p className="text-[13px]" style={{ color: '#666' }}>₺{coupon.value} indirim • Ödeme sayfasında kullanabilirsiniz</p>
                        <button onClick={() => setCoupon(null)} className="mt-3 text-[12px]" style={{ color: '#C9A96E', background: 'none', border: 'none', cursor: 'pointer' }}>Yeni kupon oluştur</button>
                    </motion.div>
                ) : (
                    <div className="flex gap-3 max-w-md">
                        <input type="number" value={redeemAmount} onChange={(e) => setRedeemAmount(e.target.value)} placeholder="Puan miktarı (min. 100)" min={100} max={points} className="flex-1 px-4 py-3 text-[14px] outline-none" style={{ border: '1px solid #E0E0E0', borderRadius: '6px' }} />
                        <button onClick={handleRedeem} disabled={!redeemAmount || parseInt(redeemAmount) < 100} className="px-6 py-3 text-[13px] font-semibold whitespace-nowrap" style={{ background: '#C9A96E', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', opacity: !redeemAmount || parseInt(redeemAmount) < 100 ? 0.5 : 1 }}>
                            Puan Kullan
                        </button>
                    </div>
                )}
            </div>

            {/* Transaction history */}
            <div className="p-6" style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}>
                <h3 className="text-[15px] font-semibold mb-4" style={{ color: '#1C1C1E' }}>Puan Geçmişi</h3>

                <div className="flex gap-2 mb-4">
                    {filterTabs.map((tab) => (
                        <button key={tab.key} onClick={() => setFilter(tab.key)} className="px-3 py-1.5 text-[12px] font-medium rounded-full" style={{ background: filter === tab.key ? '#1C1C1E' : 'white', color: filter === tab.key ? 'white' : '#666', border: `1px solid ${filter === tab.key ? '#1C1C1E' : '#E8E3DC'}`, cursor: 'pointer' }}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {filteredTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F5F0EB' }}>
                        <div>
                            <p className="text-[13px] font-medium" style={{ color: '#1C1C1E' }}>{tx.description}</p>
                            <p className="text-[11px]" style={{ color: '#999' }}>
                                {format(new Date(tx.createdAt), 'd MMM yyyy', { locale: tr })}
                                {tx.orderId && ` · ${tx.orderId}`}
                            </p>
                        </div>
                        <span className="text-[14px] font-bold" style={{ color: tx.type === 'earned' ? '#4CAF50' : tx.type === 'spent' ? '#E53935' : '#999' }}>
                            {tx.type === 'earned' ? '+' : tx.type === 'spent' ? '-' : ''}{tx.points}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
