'use client';

import { Lock, RotateCcw, Shield, Star } from 'lucide-react';

const BADGES = [
    { icon: <Lock size={18} />, titleKey: 'pdp_badge_1_title', title: 'Güvenli Ödeme', subKey: 'pdp_badge_1_sub', sub: '256-bit SSL şifreleme' },
    { icon: <RotateCcw size={18} />, titleKey: 'pdp_badge_2_title', title: '30 Gün İade', subKey: 'pdp_badge_2_sub', sub: 'Koşulsuz iade garantisi' },
    { icon: <Shield size={18} />, titleKey: 'pdp_badge_3_title', title: '5 Yıl Garanti', subKey: 'pdp_badge_3_sub', sub: 'Tüm mobilya ürünlerinde' },
    { icon: <Star size={18} />, titleKey: 'pdp_badge_4_title', title: '4.8/5 Müşteri Puanı', subKey: 'pdp_badge_4_sub', sub: '12.500+ değerlendirme' },
];

export function TrustBadges() {
    return (
        <div className="mt-6 pt-6 border-t border-dashed border-border">
            <div className="grid grid-cols-2 gap-4">
                {BADGES.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <span style={{ color: '#C9A96E' }}>{b.icon}</span>
                        <div>
                            <p className="text-[12px] font-medium text-foreground" data-lang-key={b.titleKey}>{b.title}</p>
                            <p className="text-[10px] text-muted-foreground" data-lang-key={b.subKey}>{b.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
