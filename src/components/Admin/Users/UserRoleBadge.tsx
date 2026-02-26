'use client';

import React from 'react';
import { AdminRole } from '@/types/users';

interface UserRoleBadgeProps {
    role: AdminRole;
    className?: string;
}

const roleConfig = {
    'super-admin': {
        label: '👑 Süper Admin',
        bg: 'rgba(201,169,110,0.15)',
        border: 'rgba(201,169,110,0.3)',
        text: '#C9A96E'
    },
    'editor': {
        label: '✏️ Editör',
        bg: 'rgba(10,132,255,0.15)',
        border: 'rgba(10,132,255,0.3)',
        text: '#0A84FF'
    },
    'order-manager': {
        label: '🛒 Sipariş Yön.',
        bg: 'rgba(48,209,88,0.15)',
        border: 'rgba(48,209,88,0.3)',
        text: '#30D158'
    },
    'analyst': {
        label: '📊 Analist',
        bg: 'rgba(191,90,242,0.15)',
        border: 'rgba(191,90,242,0.3)',
        text: '#BF5AF2'
    }
};

export function UserRoleBadge({ role, className = '' }: UserRoleBadgeProps) {
    const config = roleConfig[role];

    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${className}`}
            style={{
                backgroundColor: config.bg,
                borderColor: config.border,
                color: config.text
            }}
        >
            {config.label}
        </span>
    );
}
