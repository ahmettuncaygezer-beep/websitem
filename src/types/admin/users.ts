import { type AdminRole, type AdminPermission, type ActivityLog } from '@/types/users';

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
