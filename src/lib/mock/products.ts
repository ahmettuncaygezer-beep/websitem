// lib/mock/products.ts — Full Product interface + 10 mock products

export type ProductStatus = 'Aktif' | 'Pasif' | 'Taslak';

export interface ProductImage {
    id: string;
    url: string;
    altText: string;
    isPrimary: boolean;
    order: number;
}

export interface VariantGroup {
    id: string;
    name: string; // e.g. 'Renk', 'Boyut', 'Malzeme'
    values: string[];
}

export interface Variant {
    id: string;
    combination: { key: string; value: string }[];
    priceModifier: number;
    stock: number;
    sku: string;
    active: boolean;
}

export interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    sku: string;
    barcode: string;
    category: string;
    subcategory: string;
    price: number;
    comparePrice: number;
    costPrice: number;
    stock: number;
    stockTracking: boolean;
    stockThreshold: number;
    status: ProductStatus;
    images: ProductImage[];
    variants: VariantGroup[];
    tags: string[];
    metaTitle: string;
    metaDescription: string;
    relatedProducts: string[];
    complementaryProducts: string[];
    createdAt: string;
    updatedAt: string;
    weight: number;
    dimensions: ProductDimensions;
}

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Luna Köşe Koltuk',
        slug: 'luna-kose-koltuk',
        sku: 'LKK-001',
        barcode: '8690001000013',
        category: 'Koltuklar',
        subcategory: 'Köşe Koltuklar',
        price: 74990,
        comparePrice: 89990,
        costPrice: 43500,
        stock: 8,
        stockTracking: true,
        stockThreshold: 3,
        status: 'Aktif',
        images: [{ id: 'img1', url: '', altText: 'Luna Köşe Koltuk', isPrimary: true, order: 0 }],
        variants: [
            { id: 'vg1', name: 'Renk', values: ['Vizon', 'Antrasit', 'Ekru'] },
            { id: 'vg2', name: 'Boyut', values: ['L', 'XL'] },
        ],
        tags: ['koltuk', 'oturma odası', 'kadife', 'köşe'],
        metaTitle: 'Luna Köşe Koltuk | MAISON',
        metaDescription: 'MAISON Luna Köşe Koltuk, premium kadife kumaş ve sağlam ahşap ayakları ile evinizi taçlandırır.',
        relatedProducts: ['3'],
        complementaryProducts: ['5'],
        createdAt: '2026-01-10T10:00:00Z',
        updatedAt: '2026-02-20T14:30:00Z',
        weight: 85,
        dimensions: { width: 280, height: 85, depth: 160 },
    },
    {
        id: '2',
        name: 'Atlas Yatak Odası Set',
        slug: 'atlas-yatak-odasi-set',
        sku: 'AYS-001',
        barcode: '8690001000020',
        category: 'Yatak Odası',
        subcategory: 'Takım Setler',
        price: 149900,
        comparePrice: 179900,
        costPrice: 89000,
        stock: 3,
        stockTracking: true,
        stockThreshold: 2,
        status: 'Aktif',
        images: [{ id: 'img2', url: '', altText: 'Atlas Yatak Odası Set', isPrimary: true, order: 0 }],
        variants: [{ id: 'vg3', name: 'Boyut', values: ['160x200', '180x200'] }],
        tags: ['yatak odası', 'set', 'ceviz', 'başlık'],
        metaTitle: 'Atlas Yatak Odası Set | MAISON',
        metaDescription: 'Masif ceviz ahşabından üretilmiş Atlas Yatak Odası Set ile yatak odanıza prestij katın.',
        relatedProducts: [],
        complementaryProducts: [],
        createdAt: '2026-01-15T10:00:00Z',
        updatedAt: '2026-02-19T11:00:00Z',
        weight: 320,
        dimensions: { width: 200, height: 130, depth: 210 },
    },
    {
        id: '3',
        name: 'Velvet Berjer',
        slug: 'velvet-berjer',
        sku: 'VB-001',
        barcode: '8690001000037',
        category: 'Koltuklar',
        subcategory: 'Bergèrler',
        price: 39990,
        comparePrice: 49990,
        costPrice: 22000,
        stock: 15,
        stockTracking: true,
        stockThreshold: 5,
        status: 'Aktif',
        images: [{ id: 'img3', url: '', altText: 'Velvet Berjer', isPrimary: true, order: 0 }],
        variants: [{ id: 'vg4', name: 'Renk', values: ['Mürdüm', 'Zümrüt', 'Bej'] }],
        tags: ['berjer', 'kadife', 'butik'],
        metaTitle: 'Velvet Berjer | MAISON',
        metaDescription: 'El yapımı Velvet Berjer ile okuma köşenizi bir sanat eserine dönüştürün.',
        relatedProducts: ['1'],
        complementaryProducts: ['5', '8'],
        createdAt: '2026-01-20T10:00:00Z',
        updatedAt: '2026-02-18T09:00:00Z',
        weight: 42,
        dimensions: { width: 80, height: 100, depth: 85 },
    },
    {
        id: '4',
        name: 'Zen Çalışma Masası',
        slug: 'zen-calisma-masasi',
        sku: 'ZCM-001',
        barcode: '8690001000044',
        category: 'Masalar',
        subcategory: 'Çalışma Masaları',
        price: 39990,
        comparePrice: 0,
        costPrice: 21000,
        stock: 0,
        stockTracking: true,
        stockThreshold: 2,
        status: 'Aktif',
        images: [{ id: 'img4', url: '', altText: 'Zen Çalışma Masası', isPrimary: true, order: 0 }],
        variants: [],
        tags: ['masa', 'çalışma', 'zen', 'meşe'],
        metaTitle: 'Zen Çalışma Masası | MAISON',
        metaDescription: 'Minimalist Zen Çalışma Masası ile verimliliğinizi artırın.',
        relatedProducts: [],
        complementaryProducts: [],
        createdAt: '2026-01-25T10:00:00Z',
        updatedAt: '2026-02-17T16:00:00Z',
        weight: 55,
        dimensions: { width: 140, height: 75, depth: 70 },
    },
    {
        id: '5',
        name: 'Noir Konsol',
        slug: 'noir-konsol',
        sku: 'NK-001',
        barcode: '8690001000051',
        category: 'Dekorasyon',
        subcategory: 'Konsollar',
        price: 19990,
        comparePrice: 24990,
        costPrice: 11000,
        stock: 22,
        stockTracking: true,
        stockThreshold: 5,
        status: 'Aktif',
        images: [{ id: 'img5', url: '', altText: 'Noir Konsol', isPrimary: true, order: 0 }],
        variants: [],
        tags: ['konsol', 'giriş', 'siyah', 'metal'],
        metaTitle: 'Noir Konsol | MAISON',
        metaDescription: 'Siyah mat boyalı Noir Konsol ile girişinize çarpıcı bir dokunuş katın.',
        relatedProducts: [],
        complementaryProducts: ['8'],
        createdAt: '2026-02-01T10:00:00Z',
        updatedAt: '2026-02-16T13:00:00Z',
        weight: 22,
        dimensions: { width: 120, height: 80, depth: 35 },
    },
    {
        id: '6',
        name: 'Palazzo Yemek Masası',
        slug: 'palazzo-yemek-masasi',
        sku: 'PYM-001',
        barcode: '8690001000068',
        category: 'Masalar',
        subcategory: 'Yemek Masaları',
        price: 89990,
        comparePrice: 109990,
        costPrice: 52000,
        stock: 5,
        stockTracking: true,
        stockThreshold: 2,
        status: 'Aktif',
        images: [{ id: 'img6', url: '', altText: 'Palazzo Yemek Masası', isPrimary: true, order: 0 }],
        variants: [{ id: 'vg5', name: 'Boyut', values: ['6 Kişilik', '8 Kişilik', '10 Kişilik'] }],
        tags: ['yemek masası', 'mermer', 'büyük'],
        metaTitle: 'Palazzo Yemek Masası | MAISON',
        metaDescription: 'İtalyan mermer yüzeyli Palazzo Yemek Masası ile sofralarınızı bir sanat eserine dönüştürün.',
        relatedProducts: [],
        complementaryProducts: [],
        createdAt: '2026-02-05T10:00:00Z',
        updatedAt: '2026-02-15T10:00:00Z',
        weight: 180,
        dimensions: { width: 240, height: 76, depth: 110 },
    },
    {
        id: '7',
        name: 'Serene Banyo Dolabı',
        slug: 'serene-banyo-dolabi',
        sku: 'SBD-001',
        barcode: '8690001000075',
        category: 'Depolama',
        subcategory: 'Banyo Mobilyası',
        price: 29990,
        comparePrice: 34990,
        costPrice: 16500,
        stock: 0,
        stockTracking: true,
        stockThreshold: 2,
        status: 'Pasif',
        images: [{ id: 'img7', url: '', altText: 'Serene Banyo Dolabı', isPrimary: true, order: 0 }],
        variants: [],
        tags: ['banyo', 'dolap', 'beyaz'],
        metaTitle: 'Serene Banyo Dolabı | MAISON',
        metaDescription: 'Fonksiyonel ve şık Serene Banyo Dolabı ile banyonuzu organize edin.',
        relatedProducts: [],
        complementaryProducts: [],
        createdAt: '2026-02-08T10:00:00Z',
        updatedAt: '2026-02-14T09:00:00Z',
        weight: 38,
        dimensions: { width: 80, height: 180, depth: 40 },
    },
    {
        id: '8',
        name: 'Aura Avize',
        slug: 'aura-avize',
        sku: 'AA-001',
        barcode: '8690001000082',
        category: 'Aydınlatma',
        subcategory: 'Avizeler',
        price: 14990,
        comparePrice: 0,
        costPrice: 7800,
        stock: 31,
        stockTracking: true,
        stockThreshold: 5,
        status: 'Aktif',
        images: [{ id: 'img8', url: '', altText: 'Aura Avize', isPrimary: true, order: 0 }],
        variants: [{ id: 'vg6', name: 'Renk', values: ['Altın', 'Siyah', 'Krom'] }],
        tags: ['avize', 'aydınlatma', 'altın', 'kristal'],
        metaTitle: 'Aura Avize | MAISON',
        metaDescription: 'Kristal detaylı Aura Avize ile mekanlarınıza ışıltı katın.',
        relatedProducts: [],
        complementaryProducts: ['5'],
        createdAt: '2026-02-10T10:00:00Z',
        updatedAt: '2026-02-13T14:00:00Z',
        weight: 8,
        dimensions: { width: 60, height: 80, depth: 60 },
    },
    {
        id: '9',
        name: 'Opus Kitaplık',
        slug: 'opus-kitaplik',
        sku: 'OK-001',
        barcode: '8690001000099',
        category: 'Depolama',
        subcategory: 'Kitaplıklar',
        price: 44990,
        comparePrice: 54990,
        costPrice: 26000,
        stock: 7,
        stockTracking: true,
        stockThreshold: 3,
        status: 'Taslak',
        images: [{ id: 'img9', url: '', altText: 'Opus Kitaplık', isPrimary: true, order: 0 }],
        variants: [],
        tags: ['kitaplık', 'meşe', 'depolama'],
        metaTitle: 'Opus Kitaplık | MAISON',
        metaDescription: 'Masif meşe kaplamalı Opus Kitaplık ile kitaplarınıza değer katın.',
        relatedProducts: [],
        complementaryProducts: [],
        createdAt: '2026-02-12T10:00:00Z',
        updatedAt: '2026-02-12T10:00:00Z',
        weight: 95,
        dimensions: { width: 160, height: 200, depth: 35 },
    },
    {
        id: '10',
        name: 'Mira Sehpa',
        slug: 'mira-sehpa',
        sku: 'MS-001',
        barcode: '8690001000106',
        category: 'Masalar',
        subcategory: 'Sehpalar',
        price: 12990,
        comparePrice: 15990,
        costPrice: 6800,
        stock: 18,
        stockTracking: true,
        stockThreshold: 5,
        status: 'Aktif',
        images: [{ id: 'img10', url: '', altText: 'Mira Sehpa', isPrimary: true, order: 0 }],
        variants: [{ id: 'vg7', name: 'Renk', values: ['Doğal', 'Siyah', 'Beyaz'] }],
        tags: ['sehpa', 'orta sehpa', 'mermer'],
        metaTitle: 'Mira Sehpa | MAISON',
        metaDescription: 'Mermer yüzeyli Mira Sehpa ile oturma odanıza zarafet katın.',
        relatedProducts: ['4', '6'],
        complementaryProducts: ['3'],
        createdAt: '2026-02-14T10:00:00Z',
        updatedAt: '2026-02-14T10:00:00Z',
        weight: 15,
        dimensions: { width: 80, height: 45, depth: 80 },
    },
];

export const CATEGORIES = ['Tümü', 'Koltuklar', 'Yatak Odası', 'Masalar', 'Dekorasyon', 'Depolama', 'Aydınlatma'] as const;
export const STATUSES = ['Tümü', 'Aktif', 'Pasif', 'Taslak'] as const;

export interface TopProduct {
    rank: number;
    name: string;
    category: string;
    sales: number;
    revenue: number;
    trend: boolean;
    image?: string;
}

export const mockTopProducts: TopProduct[] = [
    { rank: 1, name: 'Luna Köşe Koltuk', category: 'Koltuklar', sales: 89, revenue: 6674110, trend: true },
    { rank: 2, name: 'Atlas Yatak Odası Set', category: 'Yatak Odası', sales: 67, revenue: 5023830, trend: true },
    { rank: 3, name: 'Velvet Berjer', category: 'Koltuklar', sales: 54, revenue: 2159460, trend: true },
    { rank: 4, name: 'Zen Çalışma Masası', category: 'Masalar', sales: 48, revenue: 1919520, trend: false },
    { rank: 5, name: 'Noir Konsol', category: 'Dekorasyon', sales: 41, revenue: 819590, trend: true },
];
