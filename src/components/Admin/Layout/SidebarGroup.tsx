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
    return (
        <div role="group" aria-label={title}>
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
