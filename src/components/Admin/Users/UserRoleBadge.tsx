'use client';

import React from 'react';
import { AdminRole } from '@/types/users';

interface UserRoleBadgeProps {
    role: AdminRole;
    className?: string;
}

const roleConfig: Record<AdminRole, any> = {
    'super_admin': {
        label: '👑 Süper Admin',
        bg: 'rgba(201,169,110,0.15)',
        border: 'rgba(201,169,110,0.3)',
        text: '#C9A96E'
    },
    'admin': {
        label: '🛡️ Yönetici',
        bg: 'rgba(191,90,242,0.15)',
        border: 'rgba(191,90,242,0.3)',
        text: '#BF5AF2'
    },
    'editor': {
        label: '✏️ Editör',
        bg: 'rgba(10,132,255,0.15)',
        border: 'rgba(10,132,255,0.3)',
        text: '#0A84FF'
    },
    'support': {
        label: '🛍️ Destek',
        bg: 'rgba(48,209,88,0.15)',
        border: 'rgba(48,209,88,0.3)',
        text: '#30D158'
    }
};

export function UserRoleBadge({ role, className = '' }: UserRoleBadgeProps) {
    const config = roleConfig[role] || {
        label: role,
        bg: 'rgba(255,255,255,0.1)',
        border: 'rgba(255,255,255,0.2)',
        text: '#AEAEB2'
    };

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
