'use client';

import { useRewards } from '@/hooks/useRewards';
import Link from 'next/link';

export function RewardsSummary() {
    const { points, pointsValue, currentTier, nextTier, tierProgress, amountToNextTier } = useRewards();

    return (
        <div
            className="mt-6 p-5"
            style={{ background: 'linear-gradient(135deg, #FDF8F0, #FBF2E8)', border: '1px solid #F0E4CC', borderRadius: '8px' }}
        >
            <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Left: Points */}
                <div>
                    <p className="text-[12px] font-medium" style={{ color: '#999' }}>Toplam Puanınız</p>
                    <p className="text-3xl font-bold mt-1" style={{ color: '#C9A96E' }}>
                        {points.toLocaleString('tr-TR')}
                    </p>
                    <p className="text-[12px]" style={{ color: '#999' }}>= ₺{pointsValue.toLocaleString('tr-TR')} indirim</p>
                </div>

                {/* Right: Tier Progress */}
                <div className="flex-1 max-w-xs">
                    <div className="flex items-center justify-between text-[12px]" style={{ color: '#666' }}>
                        <span>{currentTier.icon} {currentTier.name}</span>
                        {nextTier && <span>{nextTier.icon} {nextTier.name}</span>}
                    </div>
                    <div className="h-2 rounded-full mt-2 overflow-hidden" style={{ background: 'rgba(201,169,110,0.2)' }}>
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${tierProgress}%`, background: 'linear-gradient(90deg, #C9A96E, #D4B87A)' }}
                        />
                    </div>
                    {nextTier && (
                        <p className="text-[11px] mt-1.5 text-right" style={{ color: '#999' }}>
                            {nextTier.name} için ₺{amountToNextTier.toLocaleString('tr-TR')} daha
                        </p>
                    )}
                </div>
            </div>

            <Link
                href="/hesabim/puan-odullerim"
                className="inline-block mt-3 text-[12px] font-medium"
                style={{ color: '#C9A96E' }}
            >
                Detayları Gör →
            </Link>
        </div>
    );
}
