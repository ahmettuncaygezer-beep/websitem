// lib/mock/orders.ts

export type OrderStatus =
    | 'Ödeme Bekleniyor'
    | 'Ödeme Alındı'
    | 'Hazırlanıyor'
    | 'Kargoya Verildi'
    | 'Teslim Edildi'
    | 'İptal'
    | 'İade Talebi';

export interface TimelineEvent {
    id: string;
    status: string;
    description: string;
    createdBy: string;
    createdAt: string;
    note: string | null;
}

export interface OrderItem {
    id: string;
    productName: string;
    variantName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    image: string;
}

export interface Order {
    id: string;
    orderNo: string;
    customer: {
        id: string;
        name: string;
        email: string;
        phone: string;
        avatar: string;
        totalOrders: number;
        totalSpent: number;
        isVip: boolean;
    };
    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    status: OrderStatus;
    paymentMethod: {
        type: string;
        last4: string | null;
        transactionId: string;
    };
    shippingAddress: {
        fullName: string;
        phone: string;
        address: string;
        district: string;
        city: string;
        postalCode: string;
    };
    cargoCompany: string | null;
    trackingNumber: string | null;
    estimatedDelivery: string | null;
    adminNote: string;
    timeline: TimelineEvent[];
    createdAt: string;
    updatedAt: string;
}

export const mockOrders: Order[] = [
    {
        id: '1847',
        orderNo: '#1847',
        customer: { id: 'c1', name: 'Burak Tunç', email: 'burak@gmail.com', phone: '0532 111 22 33', avatar: 'BT', totalOrders: 3, totalSpent: 134970, isVip: false },
        items: [{ id: 'i1', productName: 'Luna Köşe Koltuk', variantName: 'Vizon — L', quantity: 1, unitPrice: 74990, totalPrice: 74990, image: '🛋️' }],
        subtotal: 74990, shippingCost: 0, discount: 0, total: 74990,
        status: 'İptal',
        paymentMethod: { type: 'Kredi Kartı', last4: '4242', transactionId: 'TXN-84729301' },
        shippingAddress: { fullName: 'Burak Tunç', phone: '0532 111 22 33', address: 'Bağcılar Mah. Atatürk Cad. No:42/3', district: 'Bağcılar', city: 'İstanbul', postalCode: '34200' },
        cargoCompany: null, trackingNumber: null, estimatedDelivery: null,
        adminNote: '',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-14T14:32:00', note: null },
            { id: 't2', status: 'Ödeme Alındı', description: 'Ödeme başarıyla doğrulandı.', createdBy: 'Sistem', createdAt: '2026-02-14T14:35:00', note: null },
            { id: 't3', status: 'Hazırlanıyor', description: 'Sipariş hazırlanmaya başlandı.', createdBy: 'Admin', createdAt: '2026-02-14T15:00:00', note: null },
            { id: 't4', status: 'İptal', description: 'Sipariş iptal edildi.', createdBy: 'Admin', createdAt: '2026-02-14T18:22:00', note: 'Müşteri talep etti' },
        ],
        createdAt: '2026-02-14T14:32:00', updatedAt: '2026-02-14T18:22:00',
    },
    {
        id: '1848',
        orderNo: '#1848',
        customer: { id: 'c2', name: 'Selin Arslan', email: 'selin@gmail.com', phone: '0533 222 33 44', avatar: 'SA', totalOrders: 7, totalSpent: 489930, isVip: true },
        items: [{ id: 'i2', productName: 'Zen Çalışma Masası', variantName: 'Ceviz — 180cm', quantity: 1, unitPrice: 39990, totalPrice: 39990, image: '🪑' }],
        subtotal: 39990, shippingCost: 0, discount: 0, total: 39990,
        status: 'Teslim Edildi',
        paymentMethod: { type: 'Kredi Kartı', last4: '1234', transactionId: 'TXN-78123901' },
        shippingAddress: { fullName: 'Selin Arslan', phone: '0533 222 33 44', address: 'Nişantaşı Mah. Teşvikiye Cad. No:22/8', district: 'Şişli', city: 'İstanbul', postalCode: '34365' },
        cargoCompany: 'Yex Kargo', trackingNumber: 'TK7834921', estimatedDelivery: '2026-02-18',
        adminNote: 'VIP müşteri, öncelikli teslim.',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-13T16:30:00', note: null },
            { id: 't2', status: 'Ödeme Alındı', description: 'Ödeme onaylandı.', createdBy: 'Sistem', createdAt: '2026-02-13T16:33:00', note: null },
            { id: 't3', status: 'Hazırlanıyor', description: 'Ambalajlama başladı.', createdBy: 'Admin', createdAt: '2026-02-14T09:00:00', note: null },
            { id: 't4', status: 'Kargoya Verildi', description: 'Yex Kargo\'ya teslim edildi.', createdBy: 'Admin', createdAt: '2026-02-15T11:20:00', note: 'TK7834921' },
            { id: 't5', status: 'Teslim Edildi', description: 'Müşteriye teslim edildi.', createdBy: 'Kargo', createdAt: '2026-02-17T14:45:00', note: null },
        ],
        createdAt: '2026-02-13T16:30:00', updatedAt: '2026-02-17T14:45:00',
    },
    {
        id: '1849',
        orderNo: '#1849',
        customer: { id: 'c3', name: 'Mert Yılmaz', email: 'mert@gmail.com', phone: '0541 333 44 55', avatar: 'MY', totalOrders: 2, totalSpent: 79980, isVip: false },
        items: [{ id: 'i3', productName: 'Velvet Berjer', variantName: 'Yeşil Kadife', quantity: 1, unitPrice: 39990, totalPrice: 39990, image: '🪑' }],
        subtotal: 39990, shippingCost: 0, discount: 0, total: 39990,
        status: 'Teslim Edildi',
        paymentMethod: { type: 'Kredi Kartı', last4: '5566', transactionId: 'TXN-89034512' },
        shippingAddress: { fullName: 'Mert Yılmaz', phone: '0541 333 44 55', address: 'Acıbadem Mah. Birlik Sok. No:7/2', district: 'Kadıköy', city: 'İstanbul', postalCode: '34660' },
        cargoCompany: 'Aras Kargo', trackingNumber: 'AR9923411', estimatedDelivery: '2026-02-19',
        adminNote: '',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-13T10:00:00', note: null },
            { id: 't2', status: 'Ödeme Alındı', description: 'Ödeme onaylandı.', createdBy: 'Sistem', createdAt: '2026-02-13T10:05:00', note: null },
            { id: 't3', status: 'Teslim Edildi', description: 'Müşteriye teslim edildi.', createdBy: 'Kargo', createdAt: '2026-02-18T13:20:00', note: null },
        ],
        createdAt: '2026-02-13T10:00:00', updatedAt: '2026-02-18T13:20:00',
    },
    {
        id: '1850',
        orderNo: '#1850',
        customer: { id: 'c4', name: 'Ayşe Demir', email: 'ayse@gmail.com', phone: '0544 444 55 66', avatar: 'AD', totalOrders: 12, totalSpent: 892400, isVip: true },
        items: [{ id: 'i4', productName: 'Atlas Yatak Odası Set', variantName: 'Beyaz — King', quantity: 1, unitPrice: 149900, totalPrice: 149900, image: '🛏️' }],
        subtotal: 149900, shippingCost: 0, discount: 0, total: 149900,
        status: 'Hazırlanıyor',
        paymentMethod: { type: 'Kredi Kartı', last4: '9988', transactionId: 'TXN-90123456' },
        shippingAddress: { fullName: 'Ayşe Demir', phone: '0544 444 55 66', address: 'Etiler Mah. Nisbetiye Cad. No:15/12', district: 'Beşiktaş', city: 'İstanbul', postalCode: '34330' },
        cargoCompany: null, trackingNumber: null, estimatedDelivery: '2026-02-28',
        adminNote: 'VIP müşteri lütfen dikkatli paketleyin.',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-15T09:00:00', note: null },
            { id: 't2', status: 'Ödeme Alındı', description: 'Ödeme onaylandı.', createdBy: 'Sistem', createdAt: '2026-02-15T09:03:00', note: null },
            { id: 't3', status: 'Hazırlanıyor', description: 'Hazırlanmaya başlandı.', createdBy: 'Admin', createdAt: '2026-02-16T08:30:00', note: null },
        ],
        createdAt: '2026-02-15T09:00:00', updatedAt: '2026-02-16T08:30:00',
    },
    {
        id: '1851',
        orderNo: '#1851',
        customer: { id: 'c5', name: 'Emre Kaya', email: 'emre@gmail.com', phone: '0545 555 66 77', avatar: 'EK', totalOrders: 5, totalSpent: 312450, isVip: false },
        items: [{ id: 'i5', productName: 'Luna Köşe Koltuk', variantName: 'Antrasit — L', quantity: 1, unitPrice: 74990, totalPrice: 74990, image: '🛋️' }],
        subtotal: 74990, shippingCost: 0, discount: 0, total: 74990,
        status: 'Kargoya Verildi',
        paymentMethod: { type: 'Kredi Kartı', last4: '3344', transactionId: 'TXN-91234567' },
        shippingAddress: { fullName: 'Emre Kaya', phone: '0545 555 66 77', address: 'Cihangir Mah. Akarsu Yokuşu No:5/1', district: 'Beyoğlu', city: 'İstanbul', postalCode: '34433' },
        cargoCompany: 'Yex Kargo', trackingNumber: 'TK7834955', estimatedDelivery: '2026-02-22',
        adminNote: '',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-16T11:00:00', note: null },
            { id: 't2', status: 'Ödeme Alındı', description: 'Ödeme onaylandı.', createdBy: 'Sistem', createdAt: '2026-02-16T11:02:00', note: null },
            { id: 't3', status: 'Hazırlanıyor', description: 'Hazırlanmaya başlandı.', createdBy: 'Admin', createdAt: '2026-02-17T09:00:00', note: null },
            { id: 't4', status: 'Kargoya Verildi', description: 'Yex Kargo\'ya teslim edildi.', createdBy: 'Admin', createdAt: '2026-02-18T14:00:00', note: 'TK7834955' },
        ],
        createdAt: '2026-02-16T11:00:00', updatedAt: '2026-02-18T14:00:00',
    },
    {
        id: '1852',
        orderNo: '#1852',
        customer: { id: 'c6', name: 'Deniz Yıldız', email: 'deniz@gmail.com', phone: '0546 666 77 88', avatar: 'DY', totalOrders: 1, totalSpent: 40970, isVip: false },
        items: [
            { id: 'i6a', productName: 'Mira Sehpa', variantName: 'Meşe', quantity: 2, unitPrice: 12990, totalPrice: 25980, image: '🪵' },
            { id: 'i6b', productName: 'Noir Konsol', variantName: 'Siyah', quantity: 1, unitPrice: 19990, totalPrice: 19990, image: '🪑' },
        ],
        subtotal: 45970, shippingCost: 0, discount: 5000, total: 40970,
        status: 'Ödeme Alındı',
        paymentMethod: { type: 'Havale / EFT', last4: null, transactionId: 'EFT-20260217-001' },
        shippingAddress: { fullName: 'Deniz Yıldız', phone: '0546 666 77 88', address: 'Kozyatağı Mah. Atatürk Cad. No:88/4', district: 'Kadıköy', city: 'İstanbul', postalCode: '34742' },
        cargoCompany: null, trackingNumber: null, estimatedDelivery: null,
        adminNote: '',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-17T13:00:00', note: null },
            { id: 't2', status: 'Ödeme Alındı', description: 'Havale ödemesi onaylandı.', createdBy: 'Admin', createdAt: '2026-02-17T15:30:00', note: null },
        ],
        createdAt: '2026-02-17T13:00:00', updatedAt: '2026-02-17T15:30:00',
    },
    {
        id: '1853',
        orderNo: '#1853',
        customer: { id: 'c7', name: 'Fatma Çelik', email: 'fatma@gmail.com', phone: '0547 777 88 99', avatar: 'FÇ', totalOrders: 4, totalSpent: 198960, isVip: false },
        items: [{ id: 'i7', productName: 'Palazzo Yemek Masası', variantName: 'Mermer — 220cm', quantity: 1, unitPrice: 89990, totalPrice: 89990, image: '🍽️' }],
        subtotal: 89990, shippingCost: 0, discount: 0, total: 89990,
        status: 'İade Talebi',
        paymentMethod: { type: 'Kredi Kartı', last4: '7799', transactionId: 'TXN-92345678' },
        shippingAddress: { fullName: 'Fatma Çelik', phone: '0547 777 88 99', address: 'Erenköy Mah. Bağdat Cad. No:210/3', district: 'Kadıköy', city: 'İstanbul', postalCode: '34738' },
        cargoCompany: 'MNG Kargo', trackingNumber: 'MNG44512890', estimatedDelivery: '2026-02-21',
        adminNote: 'Hasar şikayeti var, kontrol edilecek.',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-12T10:00:00', note: null },
            { id: 't2', status: 'Teslim Edildi', description: 'Müşteriye teslim edildi.', createdBy: 'Kargo', createdAt: '2026-02-20T11:00:00', note: null },
            { id: 't3', status: 'İade Talebi', description: 'Müşteri iade talebinde bulundu.', createdBy: 'Müşteri', createdAt: '2026-02-21T09:30:00', note: 'Ürün hasarlı geldi' },
        ],
        createdAt: '2026-02-12T10:00:00', updatedAt: '2026-02-21T09:30:00',
    },
    {
        id: '1854',
        orderNo: '#1854',
        customer: { id: 'c8', name: 'Ali Kara', email: 'ali@gmail.com', phone: '0548 888 99 00', avatar: 'AK', totalOrders: 9, totalSpent: 671100, isVip: true },
        items: [{ id: 'i8', productName: 'Aura Avize', variantName: 'Altın — L', quantity: 3, unitPrice: 14990, totalPrice: 44970, image: '💡' }],
        subtotal: 44970, shippingCost: 0, discount: 0, total: 44970,
        status: 'Kargoya Verildi',
        paymentMethod: { type: 'Kredi Kartı', last4: '6677', transactionId: 'TXN-93456789' },
        shippingAddress: { fullName: 'Ali Kara', phone: '0548 888 99 00', address: 'Fenerbahçe Mah. Kadıköy Cad. No:33/6', district: 'Kadıköy', city: 'İstanbul', postalCode: '34726' },
        cargoCompany: 'Aras Kargo', trackingNumber: 'AR1122334', estimatedDelivery: '2026-02-24',
        adminNote: '',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-18T12:00:00', note: null },
            { id: 't2', status: 'Kargoya Verildi', description: 'Aras Kargo\'ya teslim edildi.', createdBy: 'Admin', createdAt: '2026-02-20T15:00:00', note: 'AR1122334' },
        ],
        createdAt: '2026-02-18T12:00:00', updatedAt: '2026-02-20T15:00:00',
    },
    {
        id: '1855',
        orderNo: '#1855',
        customer: { id: 'c9', name: 'Zeynep Kurt', email: 'zeynep@gmail.com', phone: '0549 111 22 33', avatar: 'ZK', totalOrders: 2, totalSpent: 52980, isVip: false },
        items: [{ id: 'i9', productName: 'Boston Kütüphane', variantName: 'Ceviz — 5 Raflı', quantity: 1, unitPrice: 52980, totalPrice: 52980, image: '📚' }],
        subtotal: 52980, shippingCost: 0, discount: 0, total: 52980,
        status: 'Ödeme Bekleniyor',
        paymentMethod: { type: 'Kapıda Ödeme', last4: null, transactionId: '' },
        shippingAddress: { fullName: 'Zeynep Kurt', phone: '0549 111 22 33', address: 'Çengelköy Mah. İskele Cad. No:12/2', district: 'Üsküdar', city: 'İstanbul', postalCode: '34684' },
        cargoCompany: null, trackingNumber: null, estimatedDelivery: null,
        adminNote: '',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-20T10:00:00', note: null },
        ],
        createdAt: '2026-02-20T10:00:00', updatedAt: '2026-02-20T10:00:00',
    },
    {
        id: '1856',
        orderNo: '#1856',
        customer: { id: 'c10', name: 'Hasan Şahin', email: 'hasan@gmail.com', phone: '0550 222 33 44', avatar: 'HŞ', totalOrders: 6, totalSpent: 231450, isVip: false },
        items: [{ id: 'i10', productName: 'Nordic Sandalye', variantName: 'Beyaz — 4\'lü Set', quantity: 1, unitPrice: 35960, totalPrice: 35960, image: '🪑' }],
        subtotal: 35960, shippingCost: 0, discount: 0, total: 35960,
        status: 'Hazırlanıyor',
        paymentMethod: { type: 'Kredi Kartı', last4: '2233', transactionId: 'TXN-94567890' },
        shippingAddress: { fullName: 'Hasan Şahin', phone: '0550 222 33 44', address: 'Bahçelievler Mah. Cumhuriyet Cad. No:67/5', district: 'Bahçelievler', city: 'İstanbul', postalCode: '34180' },
        cargoCompany: null, trackingNumber: null, estimatedDelivery: '2026-02-27',
        adminNote: '',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-20T14:00:00', note: null },
            { id: 't2', status: 'Ödeme Alındı', description: 'Ödeme onaylandı.', createdBy: 'Sistem', createdAt: '2026-02-20T14:02:00', note: null },
            { id: 't3', status: 'Hazırlanıyor', description: 'Hazırlanmaya başlandı.', createdBy: 'Admin', createdAt: '2026-02-21T09:00:00', note: null },
        ],
        createdAt: '2026-02-20T14:00:00', updatedAt: '2026-02-21T09:00:00',
    },
    {
        id: '1857',
        orderNo: '#1857',
        customer: { id: 'c11', name: 'Gül Erdoğan', email: 'gul@gmail.com', phone: '0551 333 44 55', avatar: 'GE', totalOrders: 3, totalSpent: 98970, isVip: false },
        items: [{ id: 'i11', productName: 'Empire Çalışma Masası', variantName: 'Siyah Deri', quantity: 1, unitPrice: 59990, totalPrice: 59990, image: '🖥️' }],
        subtotal: 59990, shippingCost: 0, discount: 0, total: 59990,
        status: 'Teslim Edildi',
        paymentMethod: { type: 'Kredi Kartı', last4: '8899', transactionId: 'TXN-95678901' },
        shippingAddress: { fullName: 'Gül Erdoğan', phone: '0551 333 44 55', address: 'Akatlar Mah. Nispetiye Cad. No:22/9', district: 'Beşiktaş', city: 'İstanbul', postalCode: '34335' },
        cargoCompany: 'PTT Kargo', trackingNumber: 'PTT9988776', estimatedDelivery: '2026-02-23',
        adminNote: '',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-18T16:00:00', note: null },
            { id: 't2', status: 'Teslim Edildi', description: 'Müşteriye teslim edildi.', createdBy: 'Kargo', createdAt: '2026-02-22T12:30:00', note: null },
        ],
        createdAt: '2026-02-18T16:00:00', updatedAt: '2026-02-22T12:30:00',
    },
    {
        id: '1858',
        orderNo: '#1858',
        customer: { id: 'c12', name: 'Tolga Aydın', email: 'tolga@gmail.com', phone: '0552 444 55 66', avatar: 'TA', totalOrders: 1, totalSpent: 24990, isVip: false },
        items: [{ id: 'i12', productName: 'Loft Bar Taburesi', variantName: 'Deri — Siyah', quantity: 2, unitPrice: 12495, totalPrice: 24990, image: '🪑' }],
        subtotal: 24990, shippingCost: 299, discount: 0, total: 25289,
        status: 'Kargoya Verildi',
        paymentMethod: { type: 'Kredi Kartı', last4: '5544', transactionId: 'TXN-96789012' },
        shippingAddress: { fullName: 'Tolga Aydın', phone: '0552 444 55 66', address: 'Moda Mah. Bahariye Cad. No:55/1', district: 'Kadıköy', city: 'İstanbul', postalCode: '34710' },
        cargoCompany: 'MNG Kargo', trackingNumber: 'MNG55667788', estimatedDelivery: '2026-02-25',
        adminNote: '',
        timeline: [
            { id: 't1', status: 'Sipariş Alındı', description: 'Sipariş sisteme girildi.', createdBy: 'Sistem', createdAt: '2026-02-21T09:00:00', note: null },
            { id: 't2', status: 'Ödeme Alındı', description: 'Ödeme onaylandı.', createdBy: 'Sistem', createdAt: '2026-02-21T09:04:00', note: null },
            { id: 't3', status: 'Kargoya Verildi', description: 'MNG Kargo\'ya teslim edildi.', createdBy: 'Admin', createdAt: '2026-02-22T13:00:00', note: 'MNG55667788' },
        ],
        createdAt: '2026-02-21T09:00:00', updatedAt: '2026-02-22T13:00:00',
    },
];

// ── Status badge config ────────────────────────────────────────────────────────
export const STATUS_CONFIG: Record<OrderStatus, { bg: string; color: string }> = {
    'Ödeme Bekleniyor': { bg: 'rgba(255,214,10,0.12)', color: '#FFD60A' },
    'Ödeme Alındı': { bg: 'rgba(10,132,255,0.12)', color: '#0A84FF' },
    'Hazırlanıyor': { bg: 'rgba(201,169,110,0.12)', color: '#C9A96E' },
    'Kargoya Verildi': { bg: 'rgba(10,132,255,0.15)', color: '#0A84FF' },
    'Teslim Edildi': { bg: 'rgba(48,209,88,0.12)', color: '#30D158' },
    'İptal': { bg: 'rgba(255,69,58,0.12)', color: '#FF453A' },
    'İade Talebi': { bg: 'rgba(191,90,242,0.12)', color: '#BF5AF2' },
};

export const AVATAR_COLORS: string[] = [
    'linear-gradient(135deg,#C9A96E,#A07840)',
    'linear-gradient(135deg,#5E5CE6,#3E3CB6)',
    'linear-gradient(135deg,#30D158,#1EA348)',
    'linear-gradient(135deg,#FF6B6B,#CC3333)',
    'linear-gradient(135deg,#0A84FF,#0056CC)',
    'linear-gradient(135deg,#BF5AF2,#8F2ABF)',
];

export function getAvatarColor(name: string): string {
    const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[idx];
}

export function formatPrice(n: number): string {
    return '₺' + n.toLocaleString('tr-TR');
}

export function formatDate(iso: string): { date: string; time: string } {
    const d = new Date(iso);
    const date = d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    return { date, time };
}

export const STATUS_FLOW: OrderStatus[] = [
    'Ödeme Bekleniyor', 'Ödeme Alındı', 'Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi',
];

export function getNextStatuses(current: OrderStatus): OrderStatus[] {
    if (current === 'İptal' || current === 'Teslim Edildi') return [];
    if (current === 'İade Talebi') return ['İptal', 'Teslim Edildi'];
    const idx = STATUS_FLOW.indexOf(current);
    const nexts: OrderStatus[] = [];
    if (idx !== -1 && idx < STATUS_FLOW.length - 1) nexts.push(STATUS_FLOW[idx + 1]);
    nexts.push('İptal');
    if (current !== 'Ödeme Bekleniyor') nexts.push('İade Talebi');
    return nexts;
}

export const mockRecentOrders = mockOrders.slice(0, 5);
