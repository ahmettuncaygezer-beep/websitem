import { create } from 'zustand';
import { Notification } from '@/types/notifications';

interface NotificationStore {
    notifications: Notification[];
    unreadCount: number;
    isOpen: boolean;
    soundEnabled: boolean;
    latestNotification: Notification | null;
    setOpen: (open: boolean) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    addNotification: (notification: Notification) => void;
    clearAll: () => void;
    toggleSound: () => void;
    clearLatest: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    unreadCount: 0,
    isOpen: false,
    soundEnabled: true,
    latestNotification: null,
    setOpen: (isOpen) => set({ isOpen }),
    markAsRead: (id) => set((state) => {
        const newNotifications = state.notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
        );
        return {
            notifications: newNotifications,
            unreadCount: newNotifications.filter(n => !n.isRead).length
        };
    }),
    markAllAsRead: () => set((state) => {
        const newNotifications = state.notifications.map(n => ({ ...n, isRead: true }));
        return {
            notifications: newNotifications,
            unreadCount: 0
        };
    }),
    addNotification: (notification) => set((state) => {
        const newNotifications = [notification, ...state.notifications];
        return {
            notifications: newNotifications,
            unreadCount: newNotifications.filter(n => !n.isRead).length,
            latestNotification: notification
        };
    }),
    clearAll: () => set({ notifications: [], unreadCount: 0 }),
    toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
    clearLatest: () => set({ latestNotification: null })
}));

