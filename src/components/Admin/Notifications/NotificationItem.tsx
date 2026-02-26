'use client';

import React from 'react';
import {
    ShoppingBag, AlertTriangle, X, MessageSquare,
    CreditCard, User, Box, Lock, CheckCircle2, ChevronRight
} from 'lucide-react';
import { Notification } from '@/types/notifications';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface NotificationItemProps {
    notification: Notification;
}

const typeConfig = {
    'order-new': { icon: ShoppingBag, color: '#30D158', bg: 'rgba(48,209,88,0.15)' },
    'order-cancel': { icon: X, color: '#FF453A', bg: 'rgba(255,69,58,0.15)' },
    'order-payment-fail': { icon: CreditCard, color: '#FF453A', bg: 'rgba(255,69,58,0.15)' },
    'stock-warning': { icon: AlertTriangle, color: '#FFD60A', bg: 'rgba(255,214,10,0.15)' },
    'stock-empty': { icon: AlertTriangle, color: '#FF453A', bg: 'rgba(255,69,58,0.15)' },
    'review-pending': { icon: MessageSquare, color: '#0A84FF', bg: 'rgba(10,132,255,0.15)' },
    'customer-new': { icon: User, color: '#BF5AF2', bg: 'rgba(191,90,242,0.15)' },
    'shipping-update': { icon: Box, color: '#0A84FF', bg: 'rgba(10,132,255,0.15)' },
    'security-login': { icon: Lock, color: '#FF453A', bg: 'rgba(255,69,58,0.15)' },
    'system-backup': { icon: CheckCircle2, color: '#30D158', bg: 'rgba(48,209,88,0.15)' },
    'system-error': { icon: AlertTriangle, color: '#FF453A', bg: 'rgba(255,69,58,0.15)' },
};

export function NotificationItem({ notification }: NotificationItemProps) {
    const { markAsRead } = useNotificationStore();
    const config = typeConfig[notification.type] || typeConfig['system-backup'];
    const Icon = config.icon;

    return (
        <div
            onClick={() => markAsRead(notification.id)}
            className={`group relative flex gap-4 p-4 transition-all duration-200 cursor-pointer border-b border-white/[0.03] ${notification.isRead ? 'opacity-60 grayscale-[0.3]' : 'bg-[#C9A96E]/[0.03]'
                } hover:bg-white/[0.04]`}
        >
            {/* Unread Indicator */}
            {!notification.isRead && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C9A96E]" />
            )}

            {/* Icon */}
            <div
                className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: config.bg }}
            >
                <Icon size={18} style={{ color: config.color }} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                    <h4 className={`text-[13px] font-medium truncate ${notification.isRead ? 'text-[#AEAEB2]' : 'text-[#F5F0EB]'}`}>
                        {notification.title}
                    </h4>
                    {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-[#C9A96E] mt-1 shadow-[0_0_8px_rgba(201,169,110,0.5)]" />
                    )}
                </div>
                <p className="text-[12px] text-[#636366] line-clamp-2 leading-relaxed mb-2">
                    {notification.description}
                </p>

                <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-[#636366]">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: tr })}
                    </span>
                    {notification.actionLabel && (
                        <span className="text-[11px] font-semibold text-[#C9A96E] flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            {notification.actionLabel} <ChevronRight size={12} />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
