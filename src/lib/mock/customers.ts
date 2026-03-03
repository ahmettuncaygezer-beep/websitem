// lib/mock/customers.ts

export type CustomerSegment = 'VIP' | 'Sadık' | 'Normal' | 'Risk';
export type CustomerStatus = 'Aktif' | 'Pasif';
export type ReviewStatus = 'Onaylı' | 'Bekleyen' | 'Reddedildi';

export interface Address {
    id: string;
    title: string;
    fullName: string;
    phone: string;
    address: string;
    district: string;
    city: string;
    isDefault: boolean;
}

export interface CustomerNote {
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
}

export interface CustomerOrderSummary {
    id: string;
    orderNo: string;
    total: number;
    status: string;
    createdAt: string;
    productCount: number;
}

export interface CustomerReview {
    id: string;
    productName: string;
    rating: number;
    comment: string;
    status: ReviewStatus;
    createdAt: string;
}

export interface ActivityLogItem {
    id: string;
    type: 'order' | 'login' | 'review' | 'refund' | 'address';
    description: string;
    createdAt: string;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    segment: CustomerSegment;
    status: CustomerStatus;
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    returnCount: number;
    selisPoints: number;
    registeredAt: string;
    lastLoginAt: string;
    lastOrderAt: string | null;
    addresses: Address[];
    notes: CustomerNote[];
    orders: CustomerOrderSummary[];
    reviews: CustomerReview[];
    activityLog: ActivityLogItem[];
}

export const mockCustomers: Customer[] = [
    {
        id: "1",
        firstName: "Ayşe",
        lastName: "Demir",
        email: "ayse.demir@gmail.com",
        phone: "0533 222 33 44",
        avatar: "AD",
        segment: "VIP",
        status: "Aktif",
        totalOrders: 12,
        totalSpent: 892400,
        averageOrderValue: 74367,
        returnCount: 1,
        selisPoints: 8924,
        registeredAt: "2023-03-15",
        lastLoginAt: "2026-02-25",
        lastOrderAt: "2026-02-14",
        addresses: [
            { id: "a1", title: "Ev", fullName: "Ayşe Demir", phone: "0533 222 33 44", address: "Etiler Mah. Nisbetiye Cad. No:15/12", district: "Beşiktaş", city: "İstanbul", isDefault: true }
        ],
        notes: [
            { id: "n1", content: "VIP müşteri, her zaman öncelikli teslimat istiyor.", createdBy: "Burak Tunç", createdAt: "2025-10-12T14:30:00" },
            { id: "n2", content: "Yeni koleksiyon lansmanına davet edildi.", createdBy: "Selin Arslan", createdAt: "2026-01-05T10:00:00" }
        ],
        orders: [
            { id: "1850", orderNo: "#1850", total: 149900, status: "Hazırlanıyor", createdAt: "2026-02-15T09:00:00", productCount: 1 },
            { id: "1720", orderNo: "#1720", total: 85000, status: "Teslim Edildi", createdAt: "2025-12-20T11:45:00", productCount: 2 },
            { id: "1640", orderNo: "#1640", total: 120500, status: "Teslim Edildi", createdAt: "2025-10-15T15:30:00", productCount: 3 },
            { id: "1550", orderNo: "#1550", total: 95000, status: "Teslim Edildi", createdAt: "2025-08-10T14:20:00", productCount: 1 }
        ],
        reviews: [
            { id: "r1", productName: "Atlas Yatak Odası Set", rating: 5, comment: "Harika bir set, çok memnunum.", status: "Onaylı", createdAt: "2025-12-28T09:00:00" }
        ],
        activityLog: [
            { id: "l1", type: "login", description: "Hesaba giriş yapıldı.", createdAt: "2026-02-25T14:00:00" },
            { id: "l2", type: "order", description: "#1850 nolu sipariş verildi.", createdAt: "2026-02-15T09:00:00" },
            { id: "l3", type: "address", description: "Yeni teslimat adresi eklendi.", createdAt: "2026-01-20T11:30:00" },
            { id: "l4", type: "review", description: "Atlas Yatak Odası Set için yorum yapıldı.", createdAt: "2025-12-28T09:00:00" },
            { id: "l5", type: "login", description: "Hesaba giriş yapıldı.", createdAt: "2025-12-20T11:00:00" }
        ]
    },
    {
        id: "2",
        firstName: "Selin",
        lastName: "Arslan",
        email: "selin.arslan@gmail.com",
        phone: "0532 111 22 33",
        avatar: "SA",
        segment: "VIP",
        status: "Aktif",
        totalOrders: 7,
        totalSpent: 489930,
        averageOrderValue: 69990,
        returnCount: 0,
        selisPoints: 4899,
        registeredAt: "2023-08-22",
        lastLoginAt: "2026-02-20",
        lastOrderAt: "2026-02-13",
        addresses: [
            { id: "a2", title: "İş", fullName: "Selin Arslan", phone: "0532 111 22 33", address: "Nişantaşı Mah. Teşvikiye Cad. No:22/8", district: "Şişli", city: "İstanbul", isDefault: true }
        ],
        notes: [],
        orders: [
            { id: "1848", orderNo: "#1848", total: 39990, status: "Teslim Edildi", createdAt: "2026-02-13T16:30:00", productCount: 1 }
        ],
        reviews: [],
        activityLog: []
    },
    {
        id: "3",
        firstName: "Emre",
        lastName: "Kaya",
        email: "emre.kaya@gmail.com",
        phone: "0545 555 66 77",
        avatar: "EK",
        segment: "Sadık",
        status: "Aktif",
        totalOrders: 5,
        totalSpent: 312450,
        averageOrderValue: 62490,
        returnCount: 1,
        selisPoints: 3124,
        registeredAt: "2024-01-10",
        lastLoginAt: "2026-02-18",
        lastOrderAt: "2026-02-16",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "4",
        firstName: "Mert",
        lastName: "Yılmaz",
        email: "mert.yilmaz@gmail.com",
        phone: "0541 333 44 55",
        avatar: "MY",
        segment: "Normal",
        status: "Aktif",
        totalOrders: 2,
        totalSpent: 79980,
        averageOrderValue: 39990,
        returnCount: 0,
        selisPoints: 799,
        registeredAt: "2024-06-18",
        lastLoginAt: "2026-02-10",
        lastOrderAt: "2026-02-13",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "5",
        firstName: "Burak",
        lastName: "Tunç",
        email: "burak.tunc@gmail.com",
        phone: "0532 111 22 33",
        avatar: "BT",
        segment: "Risk",
        status: "Aktif",
        totalOrders: 3,
        totalSpent: 134970,
        averageOrderValue: 44990,
        returnCount: 2,
        selisPoints: 350,
        registeredAt: "2024-02-28",
        lastLoginAt: "2025-11-15",
        lastOrderAt: "2025-08-10",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "6",
        firstName: "Fatma",
        lastName: "Çelik",
        email: "fatma.celik@gmail.com",
        phone: "0547 777 88 99",
        avatar: "FÇ",
        segment: "Sadık",
        status: "Aktif",
        totalOrders: 4,
        totalSpent: 198960,
        averageOrderValue: 49740,
        returnCount: 0,
        selisPoints: 1989,
        registeredAt: "2024-01-10",
        lastLoginAt: "2026-02-22",
        lastOrderAt: "2026-02-12",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "7",
        firstName: "Deniz",
        lastName: "Yıldız",
        email: "deniz.yildiz@gmail.com",
        phone: "0546 666 77 88",
        avatar: "DY",
        segment: "Normal",
        status: "Aktif",
        totalOrders: 1,
        totalSpent: 40970,
        averageOrderValue: 40970,
        returnCount: 0,
        selisPoints: 409,
        registeredAt: "2024-09-12",
        lastLoginAt: "2026-02-17",
        lastOrderAt: "2026-02-17",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "8",
        firstName: "Ali",
        lastName: "Kara",
        email: "ali.kara@gmail.com",
        phone: "0548 888 99 00",
        avatar: "AK",
        segment: "VIP",
        status: "Aktif",
        totalOrders: 9,
        totalSpent: 671100,
        averageOrderValue: 74567,
        returnCount: 1,
        selisPoints: 6711,
        registeredAt: "2023-11-05",
        lastLoginAt: "2026-02-20",
        lastOrderAt: "2026-02-18",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "9",
        firstName: "Zeynep",
        lastName: "Şahin",
        email: "zeynep.sahin@gmail.com",
        phone: "0549 111 22 33",
        avatar: "ZŞ",
        segment: "Sadık",
        status: "Aktif",
        totalOrders: 6,
        totalSpent: 359940,
        averageOrderValue: 59990,
        returnCount: 0,
        selisPoints: 3599,
        registeredAt: "2023-12-15",
        lastLoginAt: "2026-02-24",
        lastOrderAt: "2026-02-24",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "10",
        firstName: "Can",
        lastName: "Öztürk",
        email: "can.ozturk@gmail.com",
        phone: "0550 222 33 44",
        avatar: "CÖ",
        segment: "Normal",
        status: "Pasif",
        totalOrders: 1,
        totalSpent: 14990,
        averageOrderValue: 14990,
        returnCount: 0,
        selisPoints: 149,
        registeredAt: "2025-01-05",
        lastLoginAt: "2026-02-01",
        lastOrderAt: "2026-02-01",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "11",
        firstName: "Berna",
        lastName: "Ekinci",
        email: "berna.e@gmail.com",
        phone: "0533 111 22 33",
        avatar: "BE",
        segment: "VIP",
        status: "Aktif",
        totalOrders: 15,
        totalSpent: 1200350,
        averageOrderValue: 80023,
        returnCount: 0,
        selisPoints: 12003,
        registeredAt: "2022-11-12",
        lastLoginAt: "2026-02-25",
        lastOrderAt: "2026-02-24",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "12",
        firstName: "Gökhan",
        lastName: "Özkan",
        email: "gokhan.o@gmail.com",
        phone: "0532 555 66 77",
        avatar: "GÖ",
        segment: "VIP",
        status: "Aktif",
        totalOrders: 10,
        totalSpent: 912000,
        averageOrderValue: 91200,
        returnCount: 1,
        selisPoints: 9120,
        registeredAt: "2023-01-20",
        lastLoginAt: "2026-02-23",
        lastOrderAt: "2026-02-20",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "13",
        firstName: "Leyla",
        lastName: "Aksoy",
        email: "leyla.a@gmail.com",
        phone: "0533 999 88 77",
        avatar: "LA",
        segment: "Normal",
        status: "Aktif",
        totalOrders: 3,
        totalSpent: 98000,
        averageOrderValue: 32666,
        returnCount: 0,
        selisPoints: 980,
        registeredAt: "2024-05-10",
        lastLoginAt: "2026-02-15",
        lastOrderAt: "2026-02-14",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "14",
        firstName: "Murat",
        lastName: "Turan",
        email: "murat.t@gmail.com",
        phone: "0541 222 33 44",
        avatar: "MT",
        segment: "Normal",
        status: "Aktif",
        totalOrders: 1,
        totalSpent: 29990,
        averageOrderValue: 29990,
        returnCount: 0,
        selisPoints: 299,
        registeredAt: "2025-02-10",
        lastLoginAt: "2026-02-20",
        lastOrderAt: "2026-02-20",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
    {
        id: "15",
        firstName: "Selin",
        lastName: "Yılmaz",
        email: "selin.y@gmail.com",
        phone: "0532 666 55 44",
        avatar: "SY",
        segment: "Risk",
        status: "Aktif",
        totalOrders: 2,
        totalSpent: 85000,
        averageOrderValue: 42500,
        returnCount: 3,
        selisPoints: 0,
        registeredAt: "2023-10-12",
        lastLoginAt: "2025-05-10",
        lastOrderAt: "2025-03-20",
        addresses: [],
        notes: [],
        orders: [],
        reviews: [],
        activityLog: []
    },
];

export const SEGMENT_CONFIG: Record<CustomerSegment, { color: string; bg: string; label: string }> = {
    'VIP': { color: '#C9A96E', bg: 'rgba(201,169,110,0.12)', label: 'VIP Müşteri' },
    'Sadık': { color: '#30D158', bg: 'rgba(48,209,88,0.1)', label: 'Sadık Müşteri' },
    'Normal': { color: '#AEAEB2', bg: 'rgba(255,255,255,0.06)', label: 'Standart' },
    'Risk': { color: '#FF453A', bg: 'rgba(255,69,58,0.1)', label: 'Risk Altında' },
};

export const STATUS_CONFIG: Record<CustomerStatus, { color: string; bg: string }> = {
    'Aktif': { color: '#30D158', bg: 'rgba(48,209,88,0.1)' },
    'Pasif': { color: '#FF453A', bg: 'rgba(255,69,58,0.1)' },
};

export function formatPrice(n: number): string {
    return '₺' + n.toLocaleString('tr-TR');
}

export function getAvatarColor(segment: CustomerSegment): string {
    if (segment === 'VIP') return 'linear-gradient(135deg, #C9A96E, #8B6A3A)';
    if (segment === 'Sadık') return 'rgba(48,209,88,0.15)';
    if (segment === 'Risk') return 'rgba(255,69,58,0.12)';
    return 'rgba(255,255,255,0.08)';
}

export function getAvatarTextColor(segment: CustomerSegment): string {
    if (segment === 'VIP') return '#0F0F10';
    if (segment === 'Sadık') return '#30D158';
    if (segment === 'Risk') return '#FF453A';
    return '#AEAEB2';
}
