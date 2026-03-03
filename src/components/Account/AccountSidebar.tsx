'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { TIERS } from '@/types/account.types';
import {
    LayoutDashboard, Package, Heart, User, MapPin, Lock,
    Bell, Star, MessageSquare, LogOut,
} from 'lucide-react';

const NAV_GROUPS = [
    {
        label: 'ANA',
        items: [
            { href: '/hesabim', icon: LayoutDashboard, label: 'Dashboard' },
            { href: '/hesabim/siparislerim', icon: Package, label: 'Siparişlerim', badgeKey: 'orders' as const },
            { href: '/hesabim/favorilerim', icon: Heart, label: 'Favorilerim', badgeKey: 'favorites' as const },
        ],
    },
    {
        label: 'HESAP',
        items: [
            { href: '/hesabim/profilim', icon: User, label: 'Profilim' },
            { href: '/hesabim/adreslerim', icon: MapPin, label: 'Adreslerim' },
            { href: '/hesabim/guvenlik', icon: Lock, label: 'Güvenlik' },
            { href: '/hesabim/bildirimler', icon: Bell, label: 'Bildirimler' },
        ],
    },
    {
        label: 'ÖDÜLLER',
        items: [
            { href: '/hesabim/puan-odullerim', icon: Star, label: 'Puan & Ödüllerim' },
            { href: '/hesabim/degerlendirmelerim', icon: MessageSquare, label: 'Değerlendirmelerim' },
        ],
    },
];

export function AccountSidebar() {
    const pathname = usePathname();
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    if (!user) return null;

    const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    const tier = TIERS.find((t) => t.name.toLowerCase() === user.tier) || TIERS[0];

    const badges: Record<string, number> = {
        orders: 3,
        favorites: 12,
    };

    return (
        <aside
            className="hidden lg:block sticky w-[280px] flex-shrink-0 bg-card border border-border shadow-sm overflow-hidden"
            style={{ top: '88px', borderRadius: '8px' }}
            role="navigation"
            aria-label="Hesap menüsü"
        >
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] p-5">
                {/* Avatar */}
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center justify-center rounded-full text-lg font-bold flex-shrink-0 w-14 h-14 border-2 border-selis-gold bg-selis-gold text-black"
                    >
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.firstName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            initials
                        )}
                    </div>
                    <div>
                        <p className="text-[15px] font-semibold text-white">{user.firstName} {user.lastName}</p>
                        <p className="text-[11px] text-white/50">{user.email}</p>
                    </div>
                </div>

                {/* Tier */}
                <div className="flex items-center gap-2 mt-3">
                    <span
                        className="px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[12px] font-medium bg-selis-gold/15 text-selis-gold"
                    >
                        {tier.icon} {tier.name} Üye
                    </span>
                </div>

                {/* Points */}
                <p className="text-[13px] mt-2 flex items-center gap-1 text-white/80">
                    ⭐ {user.points.toLocaleString('tr-TR')} Puan
                </p>
            </div>

            {/* Navigation */}
            <div className="p-2">
                {NAV_GROUPS.map((group, gi) => (
                    <div key={group.label}>
                        {gi > 0 && <div className="h-px my-2 bg-border" />}
                        <p
                            className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium text-muted-foreground/50"
                        >
                            {group.label}
                        </p>
                        {group.items.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/hesabim' && pathname.startsWith(item.href));
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-all duration-150 rounded-md cursor-pointer border-l-3 ${isActive ? 'text-foreground bg-accent/50 border-selis-gold' : 'text-muted-foreground border-transparent hover:bg-accent/30'}`}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <Icon size={16} className={isActive ? 'text-selis-gold' : 'text-muted-foreground/60'} />
                                    <span className="flex-1">{item.label}</span>
                                    {item.badgeKey && badges[item.badgeKey] > 0 && (
                                        <span
                                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${isActive ? 'bg-selis-gold text-white' : 'bg-muted text-muted-foreground'}`}
                                        >
                                            {badges[item.badgeKey]}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ))}

                {/* Logout */}
                <div className="h-px my-2 bg-border" />
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-2.5 w-full text-[13px] font-medium transition-colors duration-150 rounded-md border-none cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 bg-transparent"
                >
                    <LogOut size={16} /> Çıkış Yap
                </button>
            </div>
        </aside>
    );
}
