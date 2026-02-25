'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, Heart, Star, User } from 'lucide-react';

const TABS = [
    { href: '/hesabim', icon: LayoutDashboard, label: 'Ana' },
    { href: '/hesabim/siparislerim', icon: Package, label: 'Siparişler' },
    { href: '/hesabim/favorilerim', icon: Heart, label: 'Favoriler' },
    { href: '/hesabim/puan-odullerim', icon: Star, label: 'Puanlar' },
    { href: '/hesabim/profilim', icon: User, label: 'Profil' },
];

export function AccountMobileNav() {
    const pathname = usePathname();

    return (
        <nav
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center"
            style={{
                height: '60px',
                background: 'white',
                borderTop: '1px solid #F0EDE8',
            }}
        >
            {TABS.map((tab) => {
                const isActive = tab.href === '/hesabim'
                    ? pathname === '/hesabim'
                    : pathname.startsWith(tab.href);
                const Icon = tab.icon;
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className="flex-1 flex flex-col items-center justify-center"
                    >
                        <Icon
                            size={20}
                            style={{ color: isActive ? '#C9A96E' : '#999' }}
                        />
                        <span
                            className="text-[10px] font-medium mt-1"
                            style={{ color: isActive ? '#C9A96E' : '#999' }}
                        >
                            {tab.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
