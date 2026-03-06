'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminToast } from '../UI/AdminToast';
import { SessionModal } from '../UI/SessionModal';
import { RealtimeToast } from '../Notifications/RealtimeToast';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/lib/hooks/useToast';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import { useNotificationStore } from '@/lib/store/useNotificationStore';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 min

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    // Skip Admin Layout for login page
    if (pathname === '/admin/login' || pathname === '/admin/login/') {
        return <>{children}</>;
    }

    const { toasts, addToast, removeToast } = useToast();
    const [showSessionModal, setShowSessionModal] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);
    const unreadCount = useNotificationStore((s) => s.unreadCount);

    // Close sidebar on route change (mobile/tablet)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    // Activate Supabase Realtime listeners
    useRealtimeNotifications();

    // Dynamic tab title based on unread count
    useEffect(() => {
        const base = 'SELIS Admin';
        document.title = unreadCount > 0 ? `(${unreadCount}) ${base}` : base;
    }, [unreadCount]);

    const resetSessionTimer = useCallback(() => {
        if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
        sessionTimerRef.current = setTimeout(() => {
            setShowSessionModal(true);
        }, SESSION_TIMEOUT_MS);
    }, []);

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        events.forEach((ev) => window.addEventListener(ev, resetSessionTimer, { passive: true }));
        resetSessionTimer();
        return () => {
            events.forEach((ev) => window.removeEventListener(ev, resetSessionTimer));
            if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
        };
    }, [resetSessionTimer]);

    const handleExtend = () => {
        setShowSessionModal(false);
        resetSessionTimer();
        addToast({ title: 'Oturum uzatıldı', variant: 'success' });
    };

    const handleLogout = () => {
        setShowSessionModal(false);
        router.push('/admin/login');
    };

    return (
        <div
            className="flex h-screen overflow-hidden bg-[#141416] text-[#F5F0EB]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Mobile/Tablet Backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Main area */}
            <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden relative">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Page content with page transition */}
                <main
                    className="flex-1 overflow-y-auto"
                    style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}
                    id="main-content"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="min-h-full p-4 md:p-8"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Toast Stack */}
            <AdminToast toasts={toasts} removeToast={removeToast} />

            {/* Realtime Notification Toast */}
            <RealtimeToast />

            {/* Session Timeout Modal */}
            <SessionModal
                isOpen={showSessionModal}
                onExtend={handleExtend}
                onLogout={handleLogout}
                initialSeconds={60}
            />
        </div>
    );
}

