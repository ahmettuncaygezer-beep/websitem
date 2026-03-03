// lib/mock/categories.ts

export type CategoryStatus = 'Aktif' | 'Pasif';

export interface Category {
    id: string;
    nameTR: string;
    nameEN: string;
    slug: string;
    parentId: string | null;
    description: string;
    coverImage: string | null;
    metaTitle: string;
    metaDescription: string;
    status: CategoryStatus;
    order: number;
    productCount: number;
    children: Category[];
}

export const mockCategories: Category[] = [
    {
        id: '1',
        nameTR: 'Oturma Odası',
        nameEN: 'Living Room',
        slug: 'oturma-odasi',
        parentId: null,
        description: 'Oturma odası mobilyaları ve aksesuarları',
        coverImage: null,
        metaTitle: 'Oturma Odası Mobilyaları | SELIS',
        metaDescription: 'Premium oturma odası mobilyaları, koltuklar ve köşe takımları.',
        status: 'Aktif',
        order: 1,
        productCount: 48,
        children: [
            { id: '1-1', nameTR: 'Koltuklar', nameEN: 'Armchairs', slug: 'koltuklar', parentId: '1', description: '', coverImage: null, metaTitle: 'Koltuklar | SELIS', metaDescription: '', status: 'Aktif', order: 1, productCount: 23, children: [] },
            { id: '1-2', nameTR: 'Köşe Takımları', nameEN: 'Corner Sets', slug: 'kose-takimlari', parentId: '1', description: '', coverImage: null, metaTitle: 'Köşe Takımları | SELIS', metaDescription: '', status: 'Aktif', order: 2, productCount: 12, children: [] },
            { id: '1-3', nameTR: 'Tekli Koltuklar', nameEN: 'Single Chairs', slug: 'tekli-koltuklar', parentId: '1', description: '', coverImage: null, metaTitle: 'Tekli Koltuklar | SELIS', metaDescription: '', status: 'Aktif', order: 3, productCount: 13, children: [] },
        ],
    },
    {
        id: '2',
        nameTR: 'Yatak Odası',
        nameEN: 'Bedroom',
        slug: 'yatak-odasi',
        parentId: null,
        description: 'Yatak odası mobilyaları ve takımları',
        coverImage: null,
        metaTitle: 'Yatak Odası Mobilyaları | SELIS',
        metaDescription: 'Lüks yatak odası setleri, komodinler ve başlıklar.',
        status: 'Aktif',
        order: 2,
        productCount: 35,
        children: [
            { id: '2-1', nameTR: 'Yatak Odası Setleri', nameEN: 'Bedroom Sets', slug: 'yatak-odasi-setleri', parentId: '2', description: '', coverImage: null, metaTitle: 'Yatak Odası Setleri | SELIS', metaDescription: '', status: 'Aktif', order: 1, productCount: 8, children: [] },
            { id: '2-2', nameTR: 'Başlıklar', nameEN: 'Headboards', slug: 'basliklar', parentId: '2', description: '', coverImage: null, metaTitle: 'Başlıklar | SELIS', metaDescription: '', status: 'Aktif', order: 2, productCount: 15, children: [] },
            { id: '2-3', nameTR: 'Komodinler', nameEN: 'Nightstands', slug: 'komodinler', parentId: '2', description: '', coverImage: null, metaTitle: 'Komodinler | SELIS', metaDescription: '', status: 'Aktif', order: 3, productCount: 12, children: [] },
        ],
    },
    {
        id: '3',
        nameTR: 'Yemek Odası',
        nameEN: 'Dining Room',
        slug: 'yemek-odasi',
        parentId: null,
        description: 'Yemek odası mobilyaları',
        coverImage: null,
        metaTitle: 'Yemek Odası Mobilyaları | SELIS',
        metaDescription: 'Şık yemek masaları ve sandalyeler.',
        status: 'Aktif',
        order: 3,
        productCount: 28,
        children: [
            { id: '3-1', nameTR: 'Yemek Masaları', nameEN: 'Dining Tables', slug: 'yemek-masalari', parentId: '3', description: '', coverImage: null, metaTitle: 'Yemek Masaları | SELIS', metaDescription: '', status: 'Aktif', order: 1, productCount: 10, children: [] },
            { id: '3-2', nameTR: 'Yemek Sandalyeleri', nameEN: 'Dining Chairs', slug: 'yemek-sandalyeleri', parentId: '3', description: '', coverImage: null, metaTitle: 'Yemek Sandalyeleri | SELIS', metaDescription: '', status: 'Aktif', order: 2, productCount: 18, children: [] },
        ],
    },
    {
        id: '4',
        nameTR: 'Çalışma Odası',
        nameEN: 'Home Office',
        slug: 'calisma-odasi',
        parentId: null,
        description: 'Ev ofisi ve çalışma odası mobilyaları',
        coverImage: null,
        metaTitle: 'Çalışma Odası Mobilyaları | SELIS',
        metaDescription: 'Ergonomik çalışma masaları ve kitaplıklar.',
        status: 'Aktif',
        order: 4,
        productCount: 19,
        children: [
            { id: '4-1', nameTR: 'Çalışma Masaları', nameEN: 'Desks', slug: 'calisma-masalari', parentId: '4', description: '', coverImage: null, metaTitle: 'Çalışma Masaları | SELIS', metaDescription: '', status: 'Aktif', order: 1, productCount: 9, children: [] },
            { id: '4-2', nameTR: 'Kitaplıklar', nameEN: 'Bookshelves', slug: 'kitapliklar', parentId: '4', description: '', coverImage: null, metaTitle: 'Kitaplıklar | SELIS', metaDescription: '', status: 'Aktif', order: 2, productCount: 10, children: [] },
        ],
    },
    {
        id: '5',
        nameTR: 'Dekorasyon',
        nameEN: 'Decoration',
        slug: 'dekorasyon',
        parentId: null,
        description: 'Dekoratif ürünler ve aksesuarlar',
        coverImage: null,
        metaTitle: 'Dekorasyon | SELIS',
        metaDescription: 'Evinizi özelleştiren dekoratif ürünler.',
        status: 'Aktif',
        order: 5,
        productCount: 41,
        children: [],
    },
    {
        id: '6',
        nameTR: 'Aydınlatma',
        nameEN: 'Lighting',
        slug: 'aydinlatma',
        parentId: null,
        description: 'Aydınlatma ve lamba çeşitleri',
        coverImage: null,
        metaTitle: 'Aydınlatma | SELIS',
        metaDescription: 'Premium avize ve lamba koleksiyonu.',
        status: 'Pasif',
        order: 6,
        productCount: 22,
        children: [],
    },
];
