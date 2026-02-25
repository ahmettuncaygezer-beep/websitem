'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { AccountSidebar } from '@/components/Account/AccountSidebar';
import { AccountMobileNav } from '@/components/Account/AccountMobileNav';

export default function HesabimLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const openAuthModal = useAuthStore((s) => s.openAuthModal);

    useEffect(() => {
        if (!isAuthenticated) {
            openAuthModal('login');
            router.push('/');
        }
    }, [isAuthenticated, openAuthModal, router]);

    if (!isAuthenticated) return null;

    return (
        <div style={{ background: '#F5F0EB', minHeight: '100vh' }}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="flex items-start gap-8">
                    <AccountSidebar />
                    <main className="flex-1 min-w-0 pb-20 lg:pb-0">
                        {children}
                    </main>
                </div>
            </div>
            <AccountMobileNav />
        </div>
    );
}
