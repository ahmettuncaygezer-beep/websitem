import { Notification, NotificationType, NotificationPriority, GroupedNotifications } from '@/types/notifications';

export const mockNotifications: Notification[] = [
    {
        id: 'n1',
        type: 'order-new',
        priority: 'important',
        title: 'Yeni sipariş #1847 — ₺74.990',
        description: 'Emre Kaya · Luna Köşe Koltuk × 1',
        actionLabel: 'Görüntüle',
        actionUrl: '/admin/siparisler/1847',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(), // 14 mins ago
    },
    {
        id: 'n2',
        type: 'stock-warning',
        priority: 'important',
        title: 'Kritik stok: Luna Köşe Koltuk',
        description: 'Sadece 2 adet kaldı (Eşik: 5)',
        actionLabel: 'Stok Ekle',
        actionUrl: '/admin/urunler/luna-kose-koltuk',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    },
    {
        id: 'n3',
        type: 'security-login',
        priority: 'critical',
        title: 'Başarısız giriş: 5 deneme',
        description: 'IP: 185.220.xx.xx · Moskova / Rusya',
        actionLabel: 'Engelle',
        actionUrl: '/admin/ayarlar/guvenlik',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    },
    {
        id: 'n4',
        type: 'order-payment-fail',
        priority: 'critical',
        title: 'Ödeme başarısız: Sipariş #1829',
        description: 'iyzico hata kodu: 10051 (Yetersiz Bakiye)',
        actionLabel: 'Detay',
        actionUrl: '/admin/siparisler/1829',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    },
    {
        id: 'n5',
        type: 'review-pending',
        priority: 'normal',
        title: '3 yorum onay bekliyor',
        description: 'Son: "Harika kalite, kesinlikle tavsiye ederim..."',
        actionLabel: 'İncele',
        actionUrl: '/admin/urunler/yorumlar',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    },
    {
        id: 'n6',
        type: 'customer-new',
        priority: 'normal',
        title: 'Yeni üye kaydı: ceren@gmail.com',
        description: 'İstanbul · iOS Safari',
        actionLabel: 'Profil',
        actionUrl: '/admin/musteriler/105',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // Yesterday
    },
    {
        id: 'n7',
        type: 'system-backup',
        priority: 'normal',
        title: 'Günlük yedekleme tamamlandı',
        description: '03:00 · 247 MB · Cloudinary Storage',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // Yesterday
    }
];

// Add more mock data to reach ~40 items
for (let i = 8; i <= 40; i++) {
    const isToday = i < 15;
    const isYesterday = i >= 15 && i < 25;
    const isThisWeek = i >= 25 && i < 35;

    let daysAgo = 0;
    if (isYesterday) daysAgo = 1;
    if (isThisWeek) daysAgo = 2 + (i % 5);
    if (i >= 35) daysAgo = 8 + (i % 10);

    mockNotifications.push({
        id: `n${i}`,
        type: i % 3 === 0 ? 'order-new' : i % 3 === 1 ? 'system-backup' : 'shipping-update',
        priority: i % 10 === 0 ? 'critical' : 'normal',
        title: `Eski Bildirim #${i}`,
        description: 'Geçmişe dönük sistem bildirimi içeriği.',
        isRead: i > 20,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * daysAgo - (i * 100000)).toISOString()
    });
}

export const getUnreadCount = (notifications: Notification[]): number => {
    return notifications.filter(n => !n.isRead).length;
};

export const groupByDate = (notifications: Notification[]): GroupedNotifications => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const thisWeek = new Date(today);
    thisWeek.setDate(thisWeek.getDate() - 7);

    return notifications.reduce((groups, n) => {
        const date = new Date(n.createdAt);
        if (date >= today) groups.today.push(n);
        else if (date >= yesterday) groups.yesterday.push(n);
        else if (date >= thisWeek) groups.thisWeek.push(n);
        else groups.earlier.push(n);
        return groups;
    }, { today: [], yesterday: [], thisWeek: [], earlier: [] } as GroupedNotifications);
};
