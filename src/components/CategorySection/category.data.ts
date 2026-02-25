import type { CategoryItem } from './category.types';

export const CATEGORIES: CategoryItem[] = [
    {
        id: 'oturma-odasi',
        label: 'Oturma Odası',
        subLabel: 'Koleksiyon',
        productCount: 48,
        href: '/kategori/oturma-odasi',
        image: '/images/categories/living-room.jpg',
        badge: 'Yeni Sezon',
        featured: true,
        span: 5,
    },
    {
        id: 'yatak-odasi',
        label: 'Yatak Odası',
        subLabel: 'Kategori',
        productCount: 36,
        href: '/kategori/yatak-odasi',
        image: '/images/categories/bedroom.jpg',
        span: 7,
    },
    {
        id: 'yemek-odasi',
        label: 'Yemek Odası',
        subLabel: 'Kategori',
        productCount: 24,
        href: '/kategori/yemek-odasi',
        image: '/images/categories/dining.jpg',
        span: 5,
    },
    {
        id: 'calisma-odasi',
        label: 'Çalışma Odası',
        subLabel: 'Kategori',
        productCount: 18,
        href: '/kategori/calisma-odasi',
        image: '/images/categories/office.jpg',
        span: 7,
    },
    {
        id: 'aydinlatma',
        label: 'Aydınlatma',
        subLabel: 'Koleksiyon',
        productCount: 32,
        href: '/kategori/aydinlatma',
        image: '/images/categories/lighting.jpg',
        span: 5,
    },
    {
        id: 'dekorasyon',
        label: 'Dekorasyon',
        subLabel: 'Koleksiyon',
        productCount: 56,
        href: '/kategori/dekorasyon',
        image: '/images/categories/decor.jpg',
        badge: 'Trend',
        span: 7,
    },
];

// Maps category id to filter tab key
export const CATEGORY_FILTER_MAP: Record<string, string> = {
    'oturma-odasi': 'Oturma',
    'yatak-odasi': 'Yatak',
    'yemek-odasi': 'Yemek',
    'calisma-odasi': 'Çalışma',
    'aydinlatma': 'Aydınlatma',
    'dekorasyon': 'Tümü',
};
