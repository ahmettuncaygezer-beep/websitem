import {
    GeneralSettings, PaymentSettings, ShippingSettings,
    NotificationSettings, SecuritySession, LoginLog
} from '@/types/settings';

export const mockGeneralSettings: GeneralSettings = {
    siteName: 'MAISON',
    siteSlogan: 'Lüks mobilyada Türk ustalığı',
    siteDescription: 'MAISON, premium mobilya ve iç mimarlık çözümleri sunan lüks bir markadır.',
    contactEmail: 'info@maison.com.tr',
    contactPhone: '+90 212 555 00 00',
    supportEmail: 'destek@maison.com.tr',
    currency: 'TRY',
    currencyFormat: '1.247,50 ₺',
    defaultLanguage: 'tr',
    timezone: 'Europe/Istanbul (UTC+3)',
    dateFormat: 'GG/AA/YYYY',
    maintenanceMode: {
        enabled: false,
        message: 'Sitemizi geliştiriyoruz. Kısa süre içinde geri döneceğiz.',
        allowedIps: ['78.191.45.12']
    },
    analytics: {
        googleAnalyticsId: 'G-123456789',
        facebookPixelId: '123456789012345',
        claritySiteId: 'clarity-id-123'
    },
    logo: '/assets/logo-dark.svg',
    favicon: '/favicon.ico'
};

export const mockPaymentSettings: PaymentSettings = {
    iyzico: {
        enabled: true,
        environment: 'sandbox',
        sandboxApiKey: 'sandbox-key-abc-123',
        sandboxSecretKey: 'sandbox-secret-xyz-789',
        liveApiKey: '••••••••••••••••',
        liveSecretKey: '••••••••••••••••'
    },
    paytr: {
        enabled: false,
        merchantId: '123456',
        merchantKey: '••••••••••••••••',
        merchantSalt: '••••••••••••••••',
        require3d: true
    },
    cashOnDelivery: {
        enabled: true,
        extraFee: 45,
        minOrderAmount: 500,
        allowedCities: ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya']
    },
    bankTransfer: {
        enabled: true,
        accounts: [
            { id: '1', bankName: 'Garanti BBVA', accountHolder: 'ANTİGRAVİTY MOBİLYA A.Ş.', iban: 'TR12 0006 2000 0001 2345 6789 01' },
            { id: '2', bankName: 'İş Bankası', accountHolder: 'ANTİGRAVİTY MOBİLYA A.Ş.', iban: 'TR34 0006 4000 0002 3456 7890 12' }
        ],
        customerMessage: 'Lütfen açıklama kısmına sipariş numaranızı yazınız.'
    },
    installments: {
        enabled: true,
        minAmount: 1000,
        banks: {
            'Garanti Profit': [2, 3, 6, 9],
            'İş Bankası Maximum': [2, 3, 6, 9, 12],
            'Yapı Kredi World': [2, 3, 6, 9],
            'Akbank Axess': [2, 3, 6]
        }
    }
};

export const mockShippingSettings: ShippingSettings = {
    carriers: [
        {
            id: 'yex', name: 'YEX Kargo', logo: '🚚', enabled: true,
            apiConfig: { apiKey: 'yex-123', senderCode: 'MAISON-99' },
            autoLabel: true, trackingSms: true
        },
        {
            id: 'aras', name: 'Aras Kargo', logo: '📦', enabled: true,
            apiConfig: { username: 'maison', password: '••••' },
            autoLabel: false, trackingSms: true
        }
    ],
    freeShippingThreshold: 5000,
    freeShippingEnabled: true,
    weightRules: [
        { id: 'w1', fromWeight: 0, toWeight: 5, price: 120 },
        { id: 'w2', fromWeight: 5, toWeight: 20, price: 350 },
        { id: 'w3', fromWeight: 20, toWeight: 100, price: 950 }
    ],
    deliveryTimes: {
        inCity: [1, 3],
        outOfCity: [3, 5],
        eastRegion: [5, 8]
    },
    customerNote: 'Siparişleriniz %100 sigortalı ve korumalı paketlenerek gönderilir.'
};

export const mockNotificationSettings: NotificationSettings = {
    adminEmails: ['admin@maison.com.tr', 'ali@maison.com.tr'],
    emailNotifications: {
        'new_order': true,
        'order_status': true,
        'low_stock': true,
        'new_customer': false,
        'failed_login': true
    },
    sms: {
        enabled: true,
        provider: 'netgsm',
        username: 'maisonsms',
        password: '••••••••',
        senderName: 'MAISON',
        events: {
            'customer_order_confirm': true,
            'customer_shipping': true,
            'admin_critical_stock': false
        }
    }
};

export const mockSecuritySessions: SecuritySession[] = [
    {
        id: 's1', device: 'desktop', browser: 'Chrome 121', os: 'macOS Sonoma',
        ip: '78.191.45.12', location: 'İstanbul, Türkiye', lastActive: '2 dk önce', isCurrent: true
    },
    {
        id: 's2', device: 'mobile', browser: 'Safari Mobile', os: 'iOS 17.3',
        ip: '176.234.12.89', location: 'Ankara, Türkiye', lastActive: '4 saat önce', isCurrent: false
    }
];

export const mockLoginLogs: LoginLog[] = [
    { id: 'l1', status: 'success', timestamp: '2026-02-26T03:10:00Z', ip: '78.191.45.12', location: 'İstanbul', browser: 'Chrome/macOS' },
    { id: 'l2', status: 'failed', timestamp: '2026-02-26T02:45:00Z', ip: '185.12.56.34', location: 'Amsterdam, NL', browser: 'Firefox/Linux' },
    { id: 'l3', status: 'success', timestamp: '2026-02-25T23:20:00Z', ip: '78.191.45.12', location: 'İstanbul', browser: 'Chrome/macOS' }
];
