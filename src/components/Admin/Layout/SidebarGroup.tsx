'use client';

import React from 'react';
import { SidebarItem } from './SidebarItem';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
    icon: LucideIcon;
    label: string;
    href: string;
    badge?: string | number;
    badgeVariant?: 'default' | 'red';
}

interface SidebarGroupProps {
    title: string;
    items: NavItem[];
}

export function SidebarGroup({ title, items }: SidebarGroupProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="pt-6 pb-2 pl-2">
                <span className="block text-[10px] font-medium tracking-[0.2em] text-white/25 uppercase">
                    {title}
                </span>
                <div className="space-y-1 mt-2">
                    {items.map((_, i) => (
                        <div key={i} className="h-9 bg-white/5 rounded-md mx-2 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div role="group" aria-label={title || 'Menü Grubu'}>
            <span
                className="block text-[10px] font-medium tracking-[0.2em] text-white/25 uppercase pt-6 pb-2 pl-2"
                aria-hidden="true"
            >
                {title}
            </span>
            <div>
                {items.map((item) => (
                    <SidebarItem
                        key={item.href}
                        icon={item.icon}
                        label={item.label}
                        href={item.href}
                        badge={item.badge}
                        badgeVariant={item.badgeVariant}
                        globalActiveHref=""
                        onSetActive={() => { }}
                    />
                ))}
            </div>
        </div>
    );
}
