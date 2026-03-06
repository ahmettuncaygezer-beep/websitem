'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart2, Package, LayoutGrid, Image, ShoppingCart, Users,
    TrendingUp, Target, Home, FileText, Camera, UserCog, Settings, MoreHorizontal,
    LogOut, User as UserIcon, MessageSquare, Mail, X, Globe
} from 'lucide-react';
import { SidebarGroup } from './SidebarGroup';
import { useAuthStore } from '@/store/authStore';
import { usePermissions } from '@/hooks/usePermissions';

const navGroups = [
    {
        title: 'GENEL BAKIŞ',
        items: [
            { icon: BarChart2, label: 'Dashboard', href: '/admin/dashboard' },
        ],
    },
    {
        title: 'MAĞAZA YÖNETİMİ',
        items: [
            { icon: Package, label: 'Ürünler', href: '/admin/urunler', badge: 156 },
            { icon: LayoutGrid, label: 'Kategoriler', href: '/admin/kategoriler' },
            { icon: Image, label: 'Medya Kütüphanesi', href: '/admin/medya' },
        ],
    },
    {
        title: 'SİPARİŞ VE MÜŞTERİ',
        items: [
            { icon: ShoppingCart, label: 'Siparişler', href: '/admin/siparisler', badge: 23, badgeVariant: 'red' as const },
            { icon: Users, label: 'Müşteriler', href: '/admin/musteriler' },
            { icon: MessageSquare, label: 'Yorumlar', href: '/admin/yorumlar', badge: 12, badgeVariant: 'default' as const },
        ],
    },
    {
        title: 'BÜYÜME',
        items: [
            { icon: TrendingUp, label: 'Analytics', href: '/admin/analytics' },
            { icon: Target, label: 'Kampanyalar', href: '/admin/kampanyalar' },
            { icon: Mail, label: 'E-posta Merkezi', href: '/admin/eposta' },
        ],
    },
    {
        title: 'İÇERİK',
        items: [
            { icon: Home, label: 'Ana Sayfa Editörü', href: '/admin/icerik/ana-sayfa' },
            { icon: FileText, label: 'Blog', href: '/admin/icerik/blog' },
            { icon: FileText, label: 'Sayfalar', href: '/admin/icerik/sayfalar' },
            { icon: LayoutGrid, label: 'Navigasyon', href: '/admin/icerik/navigasyon' },
            { icon: Camera, label: 'Lookbook', href: '/admin/icerik/lookbook' },
            { icon: Globe, label: 'Basında Biz', href: '/admin/icerik/basinda-biz' },
        ],
    },
    {
        title: 'SİSTEM',
        items: [
            { icon: UserCog, label: 'Kullanıcılar', href: '/admin/kullanicilar' },
            { icon: FileText, label: 'Aktivite Günlüğü', href: '/admin/ayarlar/audit-logs' },
            { icon: Settings, label: 'Ayarlar', href: '/admin/ayarlar' },
        ],
    },
];

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { user, logout } = useAuthStore();
    const { canAccessPath, role } = usePermissions();

    // Filter nav items by permissions
    const visibleGroups = navGroups.map(group => ({
        ...group,
        items: group.items.filter(item => canAccessPath(item.href))
    })).filter(group => group.items.length > 0);

    // Get initials safely
    const getInitials = () => {
        if (!user || (!user.firstName && !user.lastName && !user.email)) return 'A';
        const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || '';
        const parts = name.split(' ');
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <AnimatePresence mode="wait">
            <motion.aside
                initial={false}
                animate={{
                    x: isOpen ? 0 : (isMounted && window.innerWidth >= 1024) ? 0 : -300,
                    transition: { type: 'spring', damping: 25, stiffness: 200 }
                }}
                className={`w-full sm:w-[260px] min-w-[260px] h-screen bg-[#0F0F10] border-r border-white/[0.04] fixed lg:sticky top-0 left-0 flex flex-col z-50 overflow-hidden`}
                style={{
                    boxShadow: isOpen ? '24px 0 80px rgba(0,0,0,0.5)' : 'none'
                }}
                role="navigation"
                aria-label="Admin navigasyonu"
            >
                {/* Logo Section */}
                <div className="px-5 pt-7 pb-5 border-b border-white/[0.04] flex items-center justify-between">
                    <div>
                        <div className="font-['Playfair_Display',Georgia,serif] text-[22px] font-semibold tracking-[0.12em] text-[#F5F0EB]">
                            SELIS
                        </div>
                        <span className="inline-block mt-1.5 text-[9px] font-medium tracking-[0.25em] text-[#C9A96E] bg-[rgba(201,169,110,0.1)] border border-[rgba(201,169,110,0.2)] px-2 py-0.5 rounded-[2px] uppercase">
                            Admin Panel
                        </span>
                    </div>

                    {/* Close button - Tablet/Mobile only */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 -mr-2 text-[#636366] hover:text-[#F5F0EB] transition-colors"
                        aria-label="Menüyü kapat"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-2 overflow-y-auto scrollbar-hide">
                    {!isMounted ? (
                        <div className="space-y-4 animate-pulse pt-4">
                            <div className="h-4 bg-white/5 rounded w-1/3 mx-2 mb-6" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="h-9 bg-white/5 rounded mx-2" />
                                ))}
                            </div>
                        </div>
                    ) : (
                        visibleGroups.map((group) => (
                            <SidebarGroup key={group.title} title={group.title} items={group.items} />
                        ))
                    )}
                </nav>

                {/* User Area */}
                <div className="border-t border-white/[0.04] relative">
                    <button
                        onClick={() => setUserMenuOpen((v) => !v)}
                        className="w-full flex items-center gap-[10px] px-4 py-3 hover:bg-white/[0.02] transition-colors duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                        aria-haspopup="true"
                        aria-expanded={userMenuOpen}
                        aria-label="Kullanıcı menüsü"
                    >
                        {/* Avatar */}
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-[#0F0F10] flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #C9A96E 0%, #8B6A3A 100%)' }}
                            aria-hidden="true"
                        >
                            {getInitials()}
                        </div>
                        {/* Name + Role */}
                        <div className="flex-1 text-left min-w-0">
                            <div className="text-[12px] font-medium text-[#F5F0EB] truncate">
                                {user ? `${user.firstName} ${user.lastName}`.trim() : 'Admin'}
                            </div>
                            <div className="text-[10px] text-[#C9A96E] truncate capitalize">{role.replace('_', ' ')}</div>
                        </div>
                        <MoreHorizontal size={16} className="text-[#636366] flex-shrink-0" />
                    </button>

                    {/* User Dropdown */}
                    <AnimatePresence>
                        {userMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute bottom-full left-2 right-2 mb-1 bg-[#1C1C1E] border border-white/[0.08] rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden z-10"
                                role="menu"
                            >
                                <button
                                    role="menuitem"
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-[#AEAEB2] hover:text-[#F5F0EB] hover:bg-white/[0.04] transition-colors cursor-pointer text-left"
                                >
                                    <UserIcon size={14} />
                                    Profilim
                                </button>
                                <div className="h-px bg-white/[0.06] mx-2" />
                                <button
                                    role="menuitem"
                                    onClick={() => logout()}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-[#AEAEB2] hover:text-[#FF453A] hover:bg-[rgba(255,69,58,0.05)] transition-colors cursor-pointer text-left"
                                >
                                    <LogOut size={14} />
                                    Çıkış Yap
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.aside>
        </AnimatePresence>
    );
}
