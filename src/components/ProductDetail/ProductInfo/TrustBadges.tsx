'use client';

import { Lock, RotateCcw, Shield, Star } from 'lucide-react';

const BADGES = [
    { icon: <Lock size={18} />, title: 'Güvenli Ödeme', sub: '256-bit SSL şifreleme' },
    { icon: <RotateCcw size={18} />, title: '30 Gün İade', sub: 'Koşulsuz iade garantisi' },
    { icon: <Shield size={18} />, title: '5 Yıl Garanti', sub: 'Tüm mobilya ürünlerinde' },
    { icon: <Star size={18} />, title: '4.8/5 Müşteri Puanı', sub: '12.500+ değerlendirme' },
];

export function TrustBadges() {
    return (
        <div className="mt-6 pt-6" style={{ borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
            <div className="grid grid-cols-2 gap-4">
                {BADGES.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <span style={{ color: '#C9A96E' }}>{b.icon}</span>
                        <div>
                            <p className="text-[12px] font-medium" style={{ color: '#1C1C1E' }}>{b.title}</p>
                            <p className="text-[10px]" style={{ color: '#999' }}>{b.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
