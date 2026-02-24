'use client';

import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    ShoppingBag,
    Layers,
    BarChart3,
    Settings,
    LogOut,
    Bell,
    ChevronRight,
    Search,
    User,
    Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Panel', href: '/admin' },
    { icon: ShoppingBag, label: 'Siparişler', href: '/admin/siparisler' },
    { icon: Layers, label: 'Envanter', href: '/admin/envanter' },
    { icon: User, label: 'CRM', href: '/admin/crm' },
    { icon: Sparkles, label: 'Concierge', href: '/admin/concierge' },
    { icon: BarChart3, label: 'Analitik', href: '/admin/analitik' },
    { icon: Settings, label: 'Ayarlar', href: '/admin/ayarlar' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-charcoal text-white flex flex-col">
                <div className="p-8 border-b border-white/10">
                    <div className="font-serif text-2xl tracking-[0.2em]">MAISON</div>
                    <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold mt-2">Atölye Yönetimi</div>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${isActive
                                    ? 'bg-gold text-white shadow-lg'
                                    : 'text-warm-gray hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? 'text-white' : 'text-warm-gray group-hover:text-gold transition-colors'} />
                                <span className="text-sm font-sans font-medium tracking-wide">{item.label}</span>
                                {isActive && (
                                    <motion.div layoutId="active-pill" className="ml-auto">
                                        <ChevronRight size={14} />
                                    </motion.div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button className="flex items-center gap-4 px-4 py-3 text-warm-gray hover:text-white transition-colors w-full">
                        <LogOut size={20} />
                        <span className="text-sm font-sans">Çıkış Yap</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative">
                {/* Admin Header */}
                <header className="h-20 bg-white border-b border-border flex items-center justify-between px-10 sticky top-0 z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-gray" size={18} />
                        <input
                            type="text"
                            placeholder="Müşteri veya sipariş ara..."
                            className="w-full pl-12 pr-4 py-2.5 bg-sand/30 rounded-xl border-none focus:ring-2 focus:ring-gold/20 text-sm font-sans"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-charcoal hover:bg-sand rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-terracotta rounded-full" />
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-border">
                            <div className="text-right">
                                <div className="text-xs font-sans font-bold text-charcoal">Marco Rossi</div>
                                <div className="text-[10px] font-sans text-warm-gray uppercase tracking-widest">Showroom Müdürü</div>
                            </div>
                            <div className="w-10 h-10 bg-sand rounded-full flex items-center justify-center font-serif text-lg">M</div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
