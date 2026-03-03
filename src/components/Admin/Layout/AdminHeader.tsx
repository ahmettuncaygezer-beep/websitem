'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Moon, Sun, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { BreadcrumbAdmin } from './BreadcrumbAdmin';
import { CommandPalette } from '../UI/CommandPalette';
import { useCommandPalette } from '@/lib/hooks/useCommandPalette';
import { NotificationBadge } from '../Notifications/NotificationBadge';
import { NotificationPanel } from '../Notifications/NotificationPanel';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/lib/store/useNotificationStore';

export function AdminHeader() {
    const [profileOpen, setProfileOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const cmdPalette = useCommandPalette();
    const { user, logout } = useAuthStore();

    // Get initials safely
    const getInitials = () => {
        if (!user || (!user.firstName && !user.lastName && !user.email)) return 'A';
        const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || '';
        const parts = name.split(' ');
        if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <>
            <header
                className="h-16 flex items-center px-6 gap-4 sticky top-0 z-40 border-b border-white/[0.04]"
                style={{
                    background: 'rgba(20,20,22,0.95)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                }}
                role="banner"
            >
                {/* Breadcrumbs — flex 1 */}
                <div className="flex-1">
                    <BreadcrumbAdmin />
                </div>

                {/* Command Palette Trigger */}
                <button
                    onClick={cmdPalette.open}
                    aria-label="Komut paleti aç (⌘K)"
                    className="flex items-center gap-[10px] bg-white/[0.04] border border-white/[0.06] rounded-[6px] px-3.5 py-[7px] cursor-pointer transition-all duration-150 hover:bg-white/[0.07] hover:border-[rgba(201,169,110,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] min-w-[220px] max-w-[300px]"
                >
                    <Search size={14} className="text-[#636366] flex-shrink-0" />
                    <span className="flex-1 text-[12px] text-[#636366] text-left">Ara veya komut çalıştır...</span>
                    <span
                        className="text-[10px] text-[#636366] bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded-[3px] font-medium flex-shrink-0"
                        suppressHydrationWarning
                    >
                        ⌘K
                    </span>
                </button>

                {/* Right Actions */}
                <div className="flex items-center gap-1">
                    {/* Notification bell */}
                    <NotificationBadge />

                    {/* Theme toggle */}
                    <button
                        onClick={() => setIsDark((d) => !d)}
                        aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
                        className="w-9 h-9 rounded-[6px] border border-transparent hover:bg-white/[0.06] hover:text-[#F5F0EB] text-[#636366] flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                    >
                        {isDark ? <Moon size={17} /> : <Sun size={17} />}
                    </button>

                    <div className="w-px h-5 bg-white/[0.06] mx-1" aria-hidden="true" />

                    {/* Avatar + Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen((v) => !v)}
                            aria-haspopup="true"
                            aria-expanded={profileOpen}
                            aria-label="Profil menüsü"
                            className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[11px] font-semibold text-[#0F0F10] border border-[rgba(201,169,110,0.3)] hover:border-[#C9A96E] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                            style={{ background: 'linear-gradient(135deg, #C9A96E 0%, #8B6A3A 100%)' }}
                        >
                            {getInitials()}
                        </button>

                        <AnimatePresence>
                            {profileOpen && (
                                <>
                                    {/* Backdrop to close */}
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setProfileOpen(false)}
                                        aria-hidden="true"
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-10 w-[200px] bg-[#1C1C1E] border border-white/[0.08] rounded-lg shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden z-20"
                                        role="menu"
                                    >
                                        {/* User info */}
                                        <div className="px-4 py-3 border-b border-white/[0.06]">
                                            <div className="text-[12px] font-semibold text-[#F5F0EB]">
                                                {user ? `${user.firstName} ${user.lastName}`.trim() : 'Admin'}
                                            </div>
                                            <div className="text-[10px] text-[#636366] truncate">{user?.email || 'admin@selis.com'}</div>
                                        </div>

                                        <button
                                            role="menuitem"
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-[#AEAEB2] hover:text-[#F5F0EB] hover:bg-white/[0.04] transition-colors cursor-pointer text-left"
                                        >
                                            <UserIcon size={14} />Profilim
                                        </button>
                                        <button
                                            role="menuitem"
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-[#AEAEB2] hover:text-[#F5F0EB] hover:bg-white/[0.04] transition-colors cursor-pointer text-left"
                                        >
                                            <Settings size={14} />Ayarlar
                                        </button>
                                        <div className="h-px bg-white/[0.06] mx-2" />
                                        <button
                                            role="menuitem"
                                            onClick={() => logout()}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-[#AEAEB2] hover:text-[#FF453A] hover:bg-[rgba(255,69,58,0.05)] transition-colors cursor-pointer text-left"
                                        >
                                            <LogOut size={14} />Çıkış Yap
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>

            {/* Command Palette Portal */}
            <CommandPalette
                isOpen={cmdPalette.isOpen}
                query={cmdPalette.query}
                setQuery={cmdPalette.setQuery}
                selectedIndex={cmdPalette.selectedIndex}
                setSelectedIndex={cmdPalette.setSelectedIndex}
                onClose={cmdPalette.close}
            />

            <NotificationPanel />
        </>
    );
}
