export type NotificationType =
    | 'order-new'
    | 'order-cancel'
    | 'order-payment-fail'
    | 'stock-warning'
    | 'stock-empty'
    | 'review-pending'
    | 'customer-new'
    | 'shipping-update'
    | 'security-login'
    | 'system-backup'
    | 'system-error';

export type NotificationPriority = 'critical' | 'important' | 'normal';

export interface Notification {
    id: string;
    type: NotificationType;
    priority: NotificationPriority;
    title: string;
    description: string;
    actionLabel?: string;
    actionUrl?: string;
    isRead: boolean;
    createdAt: string;
    metadata?: Record<string, unknown>;
}

export interface GroupedNotifications {
    today: Notification[];
    yesterday: Notification[];
    thisWeek: Notification[];
    earlier: Notification[];
}

export function groupByDate(notifications: Notification[]): GroupedNotifications {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);

    const result: GroupedNotifications = {
        today: [],
        yesterday: [],
        thisWeek: [],
        earlier: [],
    };

    for (const n of notifications) {
        const d = new Date(n.createdAt);
        if (d >= todayStart) {
            result.today.push(n);
        } else if (d >= yesterdayStart) {
            result.yesterday.push(n);
        } else if (d >= weekStart) {
            result.thisWeek.push(n);
        } else {
            result.earlier.push(n);
        }
    }

    return result;
}
