'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { AuthModal } from '@/components/auth/AuthModal';
import dynamic from 'next/dynamic';

const AIAssistant = dynamic(() => import('@/components/AIAssistant'), {
    ssr: false
});

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    const isAccount = pathname?.startsWith('/hesabim');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="flex-1">{children}</main>
            {!isAccount && <Footer />}
            <CartDrawer />
            <AuthModal />
            <AIAssistant />
        </>
    );
}
