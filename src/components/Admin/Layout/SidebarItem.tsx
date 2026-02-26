'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
    badge?: string | number;
    badgeVariant?: 'default' | 'red';
    globalActiveHref: string;
    onSetActive: (href: string) => void;
}

export function SidebarItem({
    icon: Icon,
    label,
    href,
    badge,
    badgeVariant = 'default',
    globalActiveHref,
}: SidebarItemProps) {
    const pathname = usePathname();
    const isActive = pathname === href || pathname.startsWith(href + '/') || (href === '/admin/dashboard' && pathname === '/admin');

    return (
        <Link
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={`relative flex items-center gap-[10px] px-[10px] py-[9px] rounded-[4px] mb-[1px] border transition-all duration-150 ease-out group outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]
        ${isActive
                    ? 'border-[rgba(201,169,110,0.12)] text-[#F5F0EB]'
                    : 'border-transparent hover:bg-white/[0.04] text-[rgba(255,255,255,0.55)]'
                }`}
        >
            {/* Active background (animated) */}
            {isActive && (
                <motion.div
                    layoutId="active-bg"
                    className="absolute inset-0 rounded-[4px] bg-[rgba(201,169,110,0.1)]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
            )}

            {/* Active left accent bar */}
            {isActive && (
                <span
                    className="absolute left-0 top-[6px] bottom-[6px] w-[2px] bg-[#C9A96E] rounded-r-[2px]"
                    aria-hidden="true"
                />
            )}

            {/* Icon */}
            <Icon
                size={16}
                className={`relative z-10 flex-shrink-0 transition-colors duration-150 ${isActive
                        ? 'text-[#C9A96E]'
                        : 'text-[rgba(255,255,255,0.3)] group-hover:text-[rgba(255,255,255,0.6)]'
                    }`}
            />

            {/* Label */}
            <span
                className={`relative z-10 flex-1 text-[13px] transition-colors duration-150 ${isActive ? 'font-medium text-[#F5F0EB]' : 'font-normal group-hover:text-[rgba(255,255,255,0.8)]'
                    }`}
            >
                {label}
            </span>

            {/* Badge */}
            {badge !== undefined && (
                <span
                    className={`relative z-10 text-[10px] font-semibold px-1.5 py-[1px] rounded-[10px] ${badgeVariant === 'red'
                            ? 'bg-[rgba(255,69,58,0.15)] text-[#FF453A]'
                            : 'bg-white/[0.08] text-[#AEAEB2]'
                        }`}
                >
                    {badge}
                </span>
            )}
        </Link>
    );
}
