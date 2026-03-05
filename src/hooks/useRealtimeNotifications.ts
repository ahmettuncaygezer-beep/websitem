'use client';

import { useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import { Notification, NotificationType } from '@/types/notifications';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function generateId() {
    return `rt-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
}

export function useRealtimeNotifications() {
    const { addNotification, soundEnabled } = useNotificationStore();
    const channelRef = useRef<any>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create a dedicated client for realtime
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Prepare notification sound
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio('/sounds/notification.mp3');
            audioRef.current.volume = 0.3;
        }

        const channel = supabase.channel('admin-notifications');

        // 1) New Order (INSERT on orders)
        channel.on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'orders' },
            (payload: any) => {
                const order = payload.new;
                const notification: Notification = {
                    id: generateId(),
                    type: 'order-new',
                    priority: 'important',
                    title: `Yeni sipariş #${order.id?.toString().slice(-4) || '????'}`,
                    description: `₺${Number(order.total_amount || 0).toLocaleString('tr-TR')} tutarında yeni sipariş alındı.`,
                    actionLabel: 'Görüntüle',
                    actionUrl: `/admin/siparisler/${order.id}`,
                    isRead: false,
                    createdAt: new Date().toISOString(),
                };
                addNotification(notification);
                playSound();
            }
        );

        // 2) Stock Warning (UPDATE on products where stock <= 5)
        channel.on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'products' },
            (payload: any) => {
                const product = payload.new;
                const oldProduct = payload.old;

                // Only fire if stock dropped to/below 5 and wasn't already there
                if (product.stock != null && product.stock <= 5 && (oldProduct.stock == null || oldProduct.stock > 5)) {
                    const notification: Notification = {
                        id: generateId(),
                        type: 'stock-warning',
                        priority: product.stock === 0 ? 'critical' : 'important',
                        title: product.stock === 0
                            ? `Stok tükendi: ${product.name || 'Ürün'}`
                            : `Kritik stok: ${product.name || 'Ürün'}`,
                        description: product.stock === 0
                            ? 'Bu ürün tamamen tükenmiştir!'
                            : `Sadece ${product.stock} adet kaldı (Eşik: 5)`,
                        actionLabel: 'Stok Güncelle',
                        actionUrl: `/admin/urunler/${product.slug || product.id}`,
                        isRead: false,
                        createdAt: new Date().toISOString(),
                    };
                    addNotification(notification);
                    playSound();
                }
            }
        );

        // 3) Return Request (UPDATE on orders where status = 'iade_talebi')
        channel.on(
            'postgres_changes',
            { event: 'UPDATE', schema: 'public', table: 'orders' },
            (payload: any) => {
                const order = payload.new;
                const oldOrder = payload.old;

                if (order.status === 'iade_talebi' && oldOrder.status !== 'iade_talebi') {
                    const notification: Notification = {
                        id: generateId(),
                        type: 'order-cancel',
                        priority: 'critical',
                        title: `İade talebi: Sipariş #${order.id?.toString().slice(-4) || '????'}`,
                        description: `₺${Number(order.total_amount || 0).toLocaleString('tr-TR')} tutarında sipariş için iade talebi alındı.`,
                        actionLabel: 'İnce',
                        actionUrl: `/admin/siparisler/${order.id}`,
                        isRead: false,
                        createdAt: new Date().toISOString(),
                    };
                    addNotification(notification);
                    playSound();
                }
            }
        );

        channel.subscribe();
        channelRef.current = channel;

        function playSound() {
            const store = useNotificationStore.getState();
            if (store.soundEnabled && audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => { /* blocked by browser */ });
            }
        }

        return () => {
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current);
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
