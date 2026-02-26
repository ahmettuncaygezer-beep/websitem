'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    badge?: string;
}

interface SidebarGroupProps {
    title: string;
    items: SidebarItemProps[];
}

export function SidebarItem({ icon: Icon, label, href, badge }: SidebarItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                'group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                isActive
                    ? 'bg-admin-gold text-admin-sidebar shadow-lg shadow-admin-gold/20'
                    : 'text-admin-text-secondary hover:text-admin-text-primary hover:bg-white/5'
            )}
        >
            <Icon
                size={20}
                className={cn(
                    'transition-transform duration-300 group-hover:scale-110',
                    isActive ? 'text-admin-sidebar' : 'text-admin-text-dim group-hover:text-admin-gold'
                )}
            />
            <span className="text-sm font-medium tracking-wide flex-1">{label}</span>

            {badge && (
                <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                    isActive ? "bg-admin-sidebar/20 text-admin-sidebar" : "bg-admin-gold/20 text-admin-gold"
                )}>
                    {badge}
                </span>
            )}

            {isActive && (
                <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-admin-gold rounded-xl -z-10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}
        </Link>
    );
}

export function SidebarGroup({ title, items }: SidebarGroupProps) {
    return (
        <div className="space-y-2">
            <h4 className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-admin-text-dim/50 mb-3">
                {title}
            </h4>
            <div className="space-y-1">
                {items.map((item) => (
                    <SidebarItem key={item.href} {...item} />
                ))}
            </div>
        </div>
    );
}
