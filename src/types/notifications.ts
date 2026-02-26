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
