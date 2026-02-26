'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import dynamic from 'next/dynamic';

const AIAssistant = dynamic(() => import('@/components/AIAssistant'), { ssr: false });
const BottomNav = dynamic(() => import('@/components/Mobile/BottomNav'), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/Mobile/WhatsAppButton'), { ssr: false });

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    const isAccount = pathname?.startsWith('/hesabim');
    const isPlanner = pathname?.startsWith('/oda-planlayici');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            {(!isAccount && !isPlanner) && <Footer />}
            <CartDrawer />
            <AuthModal />
            <AIAssistant />
            {/* Mobile-only bottom navigation */}
            {!isPlanner && <BottomNav onSearchOpen={() => setIsSearchOpen(true)} />}
            {/* Floating WhatsApp support button */}
            {!isPlanner && <WhatsAppButton />}
        </>
    );
}
