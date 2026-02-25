'use client';

import { useAuthStore } from '@/store/authStore';
import { TIERS } from '@/types/account.types';

export function WelcomeCard() {
    const user = useAuthStore((s) => s.user);
    if (!user) return null;

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Günaydın' : hour < 18 ? 'İyi günler' : 'İyi akşamlar';
    const tier = TIERS.find((t) => t.name.toLowerCase() === user.tier) || TIERS[0];

    const createdAt = new Date(user.createdAt);
    const daysSinceMember = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div
            className="relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 50%, #1C1C1E 100%)',
                borderRadius: '8px',
                padding: '24px 28px',
            }}
        >
            {/* Watermark */}
            <div
                className="absolute -right-8 -top-4 text-[120px] font-bold select-none"
                style={{ fontFamily: 'var(--font-playfair)', color: 'rgba(255,255,255,0.03)' }}
            >
                MAISON
            </div>
            {/* Gold decorative circle */}
            <div className="absolute right-12 bottom-0 w-32 h-32 rounded-full" style={{ background: 'radial-gradient(rgba(201,169,110,0.08), transparent)' }} />

            <div className="flex items-center justify-between relative z-10 flex-wrap gap-4">
                {/* Left */}
                <div>
                    <h2 className="text-2xl text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
                        {greeting}, {user.firstName}!
                    </h2>
                    <p className="text-[13px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        {tier.name} üyeliğiniz {daysSinceMember} günlük. ✨
                    </p>
                </div>

                {/* Right - Points */}
                <div className="text-right">
                    <p className="text-4xl font-bold" style={{ color: '#C9A96E' }}>
                        {user.points.toLocaleString('tr-TR')}
                    </p>
                    <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Puan</p>
                    <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        = ₺{Math.floor(user.points / 10).toLocaleString('tr-TR')} değerinde
                    </p>
                </div>
            </div>
        </div>
    );
}
