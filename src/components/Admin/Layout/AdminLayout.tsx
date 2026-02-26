'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminToast } from '../UI/AdminToast';
import { SessionModal } from '../UI/SessionModal';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/lib/hooks/useToast';

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 min

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { toasts, addToast, removeToast } = useToast();
    const [showSessionModal, setShowSessionModal] = useState(false);
    const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

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
            <AdminSidebar />

            {/* Main area */}
            <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
                <AdminHeader />

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
                            className="min-h-full p-8"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Toast Stack */}
            <AdminToast toasts={toasts} removeToast={removeToast} />

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
