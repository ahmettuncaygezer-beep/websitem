'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface BottomNavItemProps {
    href?: string;
    onClick?: () => void;
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    badge?: number;
    badgeColor?: string;
}

export function BottomNavItem({
    href,
    onClick,
    icon,
    label,
    isActive,
    badge,
    badgeColor = '#C9A96E',
}: BottomNavItemProps) {
    const activeColor = '#C9A96E';
    const inactiveColor = '#999';
    const color = isActive ? activeColor : inactiveColor;

    const content = (
        <motion.div
            className="flex flex-col items-center justify-center gap-1 py-2 flex-1 relative min-h-[44px]"
            style={{ WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            <div className="relative">
                <span style={{ color }}>{icon}</span>
                {badge !== undefined && badge > 0 && (
                    <span
                        className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full text-[9px] font-bold text-white px-1"
                        style={{ background: badgeColor }}
                    >
                        {badge > 99 ? '99+' : badge}
                    </span>
                )}
            </div>

            <span
                className="text-[9px] tracking-wide leading-none"
                style={{ color, fontWeight: isActive ? 600 : 400 }}
            >
                {label}
            </span>

            {/* Active indicator dot */}
            {isActive && (
                <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute bottom-1 w-1 h-1 rounded-full"
                    style={{ background: activeColor }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            )}
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className="flex-1 flex" aria-current={isActive ? 'page' : undefined}>
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className="flex-1 flex focus:outline-none"
            type="button"
        >
            {content}
        </button>
    );
}
