/* ─────────────────────────────────────────────────────────
   socialProof.data.ts  — All mock/static data for Social Proof
   ───────────────────────────────────────────────────────── */

/* İSTATİSTİKLER */
export const STATS = [
    {
        id: 'customers',
        value: 12500,
        suffix: '+',
        label: 'Mutlu Müşteri',
        icon: '😊',
        duration: 2000,
        decimals: 0,
    },
    {
        id: 'rating',
        value: 4.8,
        suffix: '/5',
        label: 'Ortalama Puan',
        icon: '⭐',
        decimals: 1,
        duration: 1500,
    },
    {
        id: 'years',
        value: 8,
        suffix: ' Yıl',
        label: 'Sektör Deneyimi',
        icon: '🏆',
        duration: 1200,
        decimals: 0,
    },
    {
        id: 'products',
        value: 2800,
        suffix: '+',
        label: 'Farklı Ürün',
        icon: '🛋️',
        duration: 1800,
        decimals: 0,
    },
];

/* INSTAGRAM / KULLANICI FOTOĞRAFLARI */
export interface InstagramPost {
    id: string;
    imageUrl: string;
    username: string;
    caption: string;
    likes: number;
    productName?: string;
    productId?: string;
    productHref?: string;
    location?: string;
    tags: string[];
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
    {
        id: '1',
        imageUrl: '/images/ugc/ugc-1.jpg',
        username: 'ev_dekorum_',
        caption: 'Luna koltukla salonumuzu komple değiştirdik 🤍',
        likes: 847,
        productName: 'Luna Köşe Koltuk',
        productId: 'luna-kose-koltuk',
        productHref: '/urun/luna-kose-koltuk',
        location: 'İstanbul',
        tags: ['maison', 'evdekorasyonu', 'minimalist'],
    },
    {
        id: '2',
        imageUrl: '/images/ugc/ugc-2.jpg',
        username: 'minimalhome.tr',
        caption: 'Nova masa ile yemek odamız hayalimizden güzel oldu',
        likes: 1203,
        productName: 'Nova Yemek Masası',
        productId: 'nova-yemek-masasi',
        productHref: '/urun/nova-yemek-masasi',
        location: 'Ankara',
        tags: ['yemekodası', 'maison', 'ahşapmasa'],
    },
    {
        id: '3',
        imageUrl: '/images/ugc/ugc-3.jpg',
        username: 'ceyda.tasarım',
        caption: 'Aria berjer + Orbit sehpa kombinasyonu 💛',
        likes: 634,
        productName: 'Aria Berjer',
        productId: 'aria-berjer',
        productHref: '/urun/aria-berjer',
        location: 'İzmir',
        tags: ['berjer', 'salon', 'maison2026'],
    },
    {
        id: '4',
        imageUrl: '/images/ugc/ugc-4.jpg',
        username: 'our_sweet_home',
        caption: "Yeni eve ilk mobilyamız MAISON'dan geldi!",
        likes: 2156,
        productName: 'Orbit Sehpa',
        productId: 'orbit-sehpa',
        productHref: '/urun/orbit-sehpa',
        location: 'Bursa',
        tags: ['yeniev', 'maison', 'sehpa'],
    },
    {
        id: '5',
        imageUrl: '/images/ugc/ugc-5.jpg',
        username: 'modernyasam.ev',
        caption: 'Çalışma odamı tamamen MAISONlaştırdım 😂✨',
        likes: 912,
        productHref: '/kategori/calisma-odasi',
        location: 'İstanbul',
        tags: ['çalışmaodası', 'homeoffice', 'maison'],
    },
    {
        id: '6',
        imageUrl: '/images/ugc/ugc-6.jpg',
        username: 'huzurluyuva',
        caption: 'Vizon rengi koltuk tam da hayal ettiğim gibi 🤎',
        likes: 445,
        productName: 'Luna Köşe Koltuk',
        productId: 'luna-kose-koltuk',
        productHref: '/urun/luna-kose-koltuk',
        location: 'Antalya',
        tags: ['vizon', 'maison', 'oturmaodası'],
    },
];

/* MEDYA LOGLARI */
export interface MediaLogo {
    id: string;
    name: string;
    logoUrl: string;
    logoUrlDark?: string;
    articleUrl: string;
    articleTitle: string;
    year: number;
}

export const MEDIA_LOGOS: MediaLogo[] = [
    {
        id: 'milliyet',
        name: 'Milliyet',
        logoUrl: '/images/media/milliyet.svg',
        articleUrl: 'https://milliyet.com.tr',
        articleTitle: "2026'nın en iyi mobilya markası",
        year: 2026,
    },
    {
        id: 'hurriyet-ev',
        name: 'Hürriyet Ev',
        logoUrl: '/images/media/hurriyet.svg',
        articleUrl: 'https://hurriyet.com.tr',
        articleTitle: 'Evinizi baştan yaratan markalar',
        year: 2025,
    },
    {
        id: 'elele',
        name: 'Elele',
        logoUrl: '/images/media/elele.svg',
        articleUrl: 'https://elele.com.tr',
        articleTitle: 'Editörün tercihleri: En şık evler',
        year: 2025,
    },
    {
        id: 'interior-tr',
        name: 'Interior Turkey',
        logoUrl: '/images/media/interior.svg',
        articleUrl: '#',
        articleTitle: 'Premium mobilyada yeni nesil',
        year: 2026,
    },
    {
        id: 'sabah',
        name: 'Sabah',
        logoUrl: '/images/media/sabah.svg',
        articleUrl: 'https://sabah.com.tr',
        articleTitle: "Türkiye'nin mobilya devine dönüşüm",
        year: 2024,
    },
];

/* CANLI BİLDİRİMLER */
export interface LiveNotificationData {
    id: string;
    name: string;
    city: string;
    productName: string;
    productImage: string;
    productHref: string;
    emoji: string;
    minutesAgo: number;
}

export const NOTIFICATION_POOL: LiveNotificationData[] = [
    {
        id: 'n1',
        name: 'Emre K.',
        city: 'İstanbul',
        productName: 'Luna Köşe Koltuk',
        productImage: '/images/products/luna-sofa.jpg',
        productHref: '/urun/luna-kose-koltuk',
        emoji: '🛋️',
        minutesAgo: 2,
    },
    {
        id: 'n2',
        name: 'Selin A.',
        city: 'Ankara',
        productName: 'Nova Yemek Masası',
        productImage: '/images/products/luna-sofa.jpg',
        productHref: '/urun/nova-yemek-masasi',
        emoji: '🪵',
        minutesAgo: 5,
    },
    {
        id: 'n3',
        name: 'Mert Y.',
        city: 'İzmir',
        productName: 'Aria Berjer',
        productImage: '/images/products/luna-sofa.jpg',
        productHref: '/urun/aria-berjer',
        emoji: '🪑',
        minutesAgo: 8,
    },
    {
        id: 'n4',
        name: 'Zeynep D.',
        city: 'Bursa',
        productName: 'Orbit Sehpa',
        productImage: '/images/products/luna-sofa.jpg',
        productHref: '/urun/orbit-sehpa',
        emoji: '☕',
        minutesAgo: 12,
    },
    {
        id: 'n5',
        name: 'Burak T.',
        city: 'Antalya',
        productName: 'Luna Köşe Koltuk',
        productImage: '/images/products/luna-sofa.jpg',
        productHref: '/urun/luna-kose-koltuk',
        emoji: '🛋️',
        minutesAgo: 15,
    },
    {
        id: 'n6',
        name: 'Ayşe M.',
        city: 'Gaziantep',
        productName: 'Nova Yemek Masası',
        productImage: '/images/products/luna-sofa.jpg',
        productHref: '/urun/nova-yemek-masasi',
        emoji: '🍽️',
        minutesAgo: 18,
    },
];

/* GÜVEN ROZETLERİ */
export interface TrustBadge {
    id: string;
    name: string;
    logoUrl: string;
    description: string;
    verifyUrl?: string;
    category: 'payment' | 'security' | 'association' | 'shipping';
}

export const TRUST_BADGES: TrustBadge[] = [
    {
        id: 'ssl',
        name: '256-bit SSL',
        logoUrl: '/images/trust/ssl.svg',
        description: 'Güvenli bağlantı',
        category: 'security',
    },
    {
        id: 'iyzico',
        name: 'iyzico',
        logoUrl: '/images/trust/iyzico.svg',
        description: 'Güvenli ödeme',
        verifyUrl: 'https://iyzico.com',
        category: 'payment',
    },
    {
        id: 'paytr',
        name: 'PayTR',
        logoUrl: '/images/trust/paytr.svg',
        description: 'Güvenli ödeme',
        verifyUrl: 'https://paytr.com',
        category: 'payment',
    },
    {
        id: 'etbis',
        name: 'ETBİS',
        logoUrl: '/images/trust/etbis.svg',
        description: 'E-Ticaret Bilgi Sistemi',
        verifyUrl: 'https://etbis.eticaret.gov.tr',
        category: 'association',
    },
    {
        id: 'tobb',
        name: 'TOBB',
        logoUrl: '/images/trust/tobb.svg',
        description: 'Türkiye Odalar Borsalar',
        category: 'association',
    },
    {
        id: 'mastercard',
        name: 'Mastercard',
        logoUrl: '/images/trust/mastercard.svg',
        description: 'Mastercard güvencesi',
        category: 'payment',
    },
    {
        id: 'visa',
        name: 'Visa',
        logoUrl: '/images/trust/visa.svg',
        description: 'Visa güvencesi',
        category: 'payment',
    },
];
