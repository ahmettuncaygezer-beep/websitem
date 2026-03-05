import { AdminUser, AdminRole, AdminPermission, ActivityLog } from '@/types/users';

export const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
    'super_admin': [
        { module: 'dashboard', view: true, create: true, edit: true, delete: true },
        { module: 'urunler', view: true, create: true, edit: true, delete: true },
        { module: 'kategoriler', view: true, create: true, edit: true, delete: true },
        { module: 'siparisler', view: true, create: true, edit: true, delete: true },
        { module: 'musteriler', view: true, create: true, edit: true, delete: true },
        { module: 'analytics', view: true, create: true, edit: true, delete: true },
        { module: 'kampanyalar', view: true, create: true, edit: true, delete: true },
        { module: 'icerik', view: true, create: true, edit: true, delete: true },
        { module: 'medya', view: true, create: true, edit: true, delete: true },
        { module: 'ayarlar', view: true, create: true, edit: true, delete: true },
        { module: 'kullanicilar', view: true, create: true, edit: true, delete: true },
    ],
    'editor': [
        { module: 'urunler', view: true, create: true, edit: true, delete: true },
        { module: 'kategoriler', view: true, create: true, edit: true, delete: true },
        { module: 'icerik', view: true, create: true, edit: true, delete: false },
        { module: 'medya', view: true, create: true, edit: true, delete: true },
        { module: 'analytics', view: true, create: false, edit: false, delete: false },
        { module: 'siparisler', view: true, create: false, edit: false, delete: false },
    ],
    'support': [
        { module: 'siparisler', view: true, create: false, edit: true, delete: false },
        { module: 'musteriler', view: true, create: false, edit: true, delete: false },
        { module: 'analytics', view: true, create: false, edit: false, delete: false },
    ],
    'admin': [
        { module: 'analytics', view: true, create: false, edit: false, delete: false },
        { module: 'siparisler', view: true, create: false, edit: false, delete: false },
    ]
};

export const mockUsers: AdminUser[] = [
    {
        id: '1',
        firstName: 'Ali',
        lastName: 'Yılmaz',
        email: 'ali.yilmaz@selis.com',
        phone: '+90 555 123 45 67',
        avatar: 'https://i.pravatar.cc/150?u=1',
        role: 'super_admin',
        status: 'active',
        hasCustomPermissions: false,
        lastLogin: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
        lastLoginIp: '78.191.12.34',
        lastLoginBrowser: 'Chrome / macOS',
        lastLoginLocation: 'Istanbul, TR',
        totalLogins: 247,
        monthlyLogins: 18,
        totalActions: 1432,
        errorCount: 3,
        createdAt: '2025-01-14T10:00:00Z',
        updatedAt: '2026-02-25T14:32:00Z'
    },
    {
        id: '2',
        firstName: 'Zeynep',
        lastName: 'Kaya',
        email: 'zeynep.kaya@selis.com',
        role: 'editor',
        status: 'active',
        hasCustomPermissions: false,
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        totalLogins: 156,
        monthlyLogins: 22,
        totalActions: 890,
        errorCount: 1,
        createdAt: '2025-03-20T11:30:00Z',
        updatedAt: '2026-02-24T09:15:00Z'
    },
    {
        id: '3',
        firstName: 'Mehmet',
        lastName: 'Demir',
        email: 'mehmet.demir@selis.com',
        role: 'support',
        status: 'active',
        hasCustomPermissions: false,
        lastLogin: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
        totalLogins: 312,
        monthlyLogins: 45,
        totalActions: 2100,
        errorCount: 2,
        createdAt: '2025-02-10T14:20:00Z',
        updatedAt: '2026-02-26T00:10:00Z'
    },
    {
        id: '4',
        firstName: 'Ayşe',
        lastName: 'Şahin',
        email: 'ayse.sahin@selis.com',
        role: 'admin',
        status: 'active',
        hasCustomPermissions: false,
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
        totalLogins: 89,
        monthlyLogins: 12,
        totalActions: 340,
        errorCount: 0,
        createdAt: '2025-05-15T09:00:00Z',
        updatedAt: '2026-02-21T16:45:00Z'
    },
    {
        id: '5',
        firstName: 'Can',
        lastName: 'Arslan',
        email: 'can.arslan@selis.com',
        role: 'editor',
        status: 'inactive',
        hasCustomPermissions: false,
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), // 45 days ago
        totalLogins: 12,
        monthlyLogins: 0,
        totalActions: 45,
        errorCount: 0,
        createdAt: '2025-11-01T10:00:00Z',
        updatedAt: '2026-01-12T11:00:00Z'
    },
    {
        id: '6',
        firstName: 'Elif',
        lastName: 'Yıldız',
        email: 'elif.yildiz@selis.com',
        role: 'super_admin',
        status: 'active',
        hasCustomPermissions: false,
        lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        totalLogins: 412,
        monthlyLogins: 56,
        totalActions: 3200,
        errorCount: 5,
        createdAt: '2025-01-05T08:30:00Z',
        updatedAt: '2026-02-26T03:00:00Z'
    },
    {
        id: '7',
        firstName: 'Burak',
        lastName: 'Çelik',
        email: 'burak.celik@selis.com',
        role: 'support',
        status: 'invited',
        hasCustomPermissions: false,
        invitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        totalLogins: 0,
        monthlyLogins: 0,
        totalActions: 0,
        errorCount: 0,
        createdAt: '2026-02-24T15:00:00Z',
        updatedAt: '2026-02-24T15:00:00Z'
    }
];

export const mockActivityLogs: ActivityLog[] = [
    {
        id: 'l1',
        userId: '1',
        action: 'update',
        entity: 'Product',
        entityId: 'p-101',
        description: 'Luna Köşe Koltuk güncellendi',
        detail: 'Fiyat: ₺74.990 → ₺69.990',
        ip: '78.191.12.34',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 mins ago
    },
    {
        id: 'l2',
        userId: '1',
        action: 'login',
        entity: 'Auth',
        description: 'Sisteme giriş yapıldı',
        ip: '78.191.12.34',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString()
    },
    {
        id: 'l3',
        userId: '3',
        action: 'order',
        entity: 'Order',
        entityId: 'o-1847',
        description: 'Sipariş onaylandı',
        detail: '#1847 nolu sipariş statüsü Beklemede -> Hazırlanıyor',
        ip: '85.105.44.21',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    }
];
