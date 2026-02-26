'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const segmentLabels: Record<string, string> = {
    admin: 'Admin',
    dashboard: 'Dashboard',
    urunler: 'Ürünler',
    yeni: 'Yeni',
    duzenle: 'Düzenle',
    kategoriler: 'Kategoriler',
    siparisler: 'Siparişler',
    musteriler: 'Müşteriler',
    analytics: 'Analytics',
    kampanyalar: 'Kampanyalar',
    medya: 'Medya',
    kullanicilar: 'Kullanıcılar',
    ayarlar: 'Ayarlar',
    icerik: 'İçerik',
    'ana-sayfa': 'Ana Sayfa',
    blog: 'Blog',
    lookbook: 'Lookbook',
    genel: 'Genel',
    odeme: 'Ödeme',
    kargo: 'Kargo',
    bildirim: 'Bildirim',
    entegrasyon: 'Entegrasyon',
    guvenlik: 'Güvenlik',
};

export function BreadcrumbAdmin() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav aria-label="Sayfa yolu" className="flex items-center gap-1.5">
            {segments.map((segment, i) => {
                const isLast = i === segments.length - 1;
                const href = '/' + segments.slice(0, i + 1).join('/');
                const label = segmentLabels[segment] ?? segment;

                return (
                    <React.Fragment key={href}>
                        {i > 0 && (
                            <span
                                className="text-[#C9A96E] opacity-60 text-[12px] select-none"
                                aria-hidden="true"
                            >
                                ›
                            </span>
                        )}
                        {isLast ? (
                            <span className="text-[12px] text-white/50 cursor-default">{label}</span>
                        ) : (
                            <Link
                                href={href}
                                className="text-[12px] text-[#AEAEB2] hover:text-[#F5F0EB] transition-colors duration-100 outline-none focus-visible:ring-1 focus-visible:ring-[#C9A96E] rounded"
                            >
                                {label}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
