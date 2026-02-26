import { Subscriber, EmailCampaign, EmailTemplate } from '@/types/email';

export const mockSubscribers: Subscriber[] = [
    {
        id: 'sub_1',
        email: 'ahmet@gmail.com',
        firstName: 'Ahmet',
        lastName: 'Yılmaz',
        source: 'homepage-popup',
        status: 'active',
        subscribedAt: '2025-01-10T10:00:00Z',
        tags: ['new-subscriber', 'newsletter']
    },
    {
        id: 'sub_2',
        email: 'zeynep.kaya@outlook.com',
        firstName: 'Zeynep',
        lastName: 'Kaya',
        source: 'checkout',
        status: 'active',
        subscribedAt: '2025-01-15T14:30:00Z',
        tags: ['customer', 'vip']
    },
    ...Array.from({ length: 48 }).map((_, i) => ({
        id: `sub_mock_${i}`,
        email: `user${i}@example.com`,
        firstName: `User${i}`,
        lastName: `Last${i}`,
        source: ['blog', 'social', 'other'][i % 3] as any,
        status: i % 10 === 0 ? 'unsubscribed' : 'active',
        subscribedAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 100).toISOString(),
        tags: i % 5 === 0 ? ['promoted'] : []
    })) as Subscriber[]
];

export const mockCampaigns: EmailCampaign[] = [
    {
        id: 'camp_1',
        subject: 'Şubat Koleksiyonunda %20 İndirim!',
        preheader: 'Yeni sezon ürünlerini keşfetmek için tıklayın.',
        content: '<div>Şubat koleksiyonu içeriği...</div>',
        targetSegment: 'Tüm Aboneler',
        sentAt: '2025-02-01T08:00:00Z',
        status: 'sent',
        stats: {
            sent: 7891,
            delivered: 7845,
            opened: 2695,
            clicked: 423,
            unsubscribed: 23,
            bounced: 46
        },
        createdBy: 'Ali Yılmaz',
        createdAt: '2025-01-25T10:00:00Z'
    },
    {
        id: 'camp_2',
        subject: 'Modern Minimalizm: Yeni Yaşam Alanları',
        content: '<div>İçerik...</div>',
        targetSegment: 'VIP Müşteriler',
        sentAt: '2025-02-15T09:00:00Z',
        status: 'sent',
        stats: {
            sent: 312,
            delivered: 312,
            opened: 245,
            clicked: 98,
            unsubscribed: 2,
            bounced: 0
        },
        createdBy: 'Zeynep Kaya',
        createdAt: '2025-02-10T14:00:00Z'
    }
];

export const mockTemplates: EmailTemplate[] = [
    { id: 'tm_1', name: 'Sipariş Onayı', description: 'Sipariş oluşturulunca tetiklenir.', trigger: 'Order Created', icon: 'ShoppingBag', htmlContent: '<h1>Siparişiniz Onaylandı</h1><p>Sayın {{müşteri_adı}}, {{sipariş_no}} numaralı siparişiniz alınmıştır.</p>' },
    { id: 'tm_2', name: 'Kargo Bildirimi', description: 'Ürün kargoya verilince gönderilir.', trigger: 'Order Shipped', icon: 'Truck', htmlContent: '<h1>Kargonuz Yolda</h1><p>Siparişiniz kargoya verilmiştir. Takip No: {{takip_no}}</p>' },
    { id: 'tm_3', name: 'Şifre Sıfırlama', description: 'Şifre sıfırlama talebinde gönderilir.', trigger: 'Password Reset', icon: 'Key', htmlContent: '<h1>Şifre Sıfırlama</h1><p>Şifrenizi sıfırlamak için {{link}} tıklayın.</p>' },
    { id: 'tm_4', name: 'Hoş Geldiniz', description: 'Yeni üye kaydında gönderilir.', trigger: 'Registration', icon: 'UserPlus', htmlContent: '<h1>Hoş Geldiniz</h1><p>Maison ailesine hoş geldiniz.</p>' },
    { id: 'tm_5', name: 'Bülten', description: 'Manuel bülten gönderimleri için.', trigger: 'Manual', icon: 'Mail', htmlContent: '<h1>Haftalık Bülten</h1>{{content}}' },
    { id: 'tm_6', name: 'Teslimat Onayı', description: 'Ürün teslim edilince gönderilir.', trigger: 'Delivered', icon: 'CheckCircle', htmlContent: '<h1>Siparişiniz Teslim Edildi</h1><p>Keyifle kullanmanızı dileriz.</p>' }
];
