import { NavItem, Category } from '@/types';

export const SITE_NAME = 'MAISON';
export const SITE_TAGLINE = 'Evinizin Yeni Hikayesi';
export const SITE_DESCRIPTION = 'Premium mobilya ve ev dekorasyonu. Lüks yaşamın zarafetini evinize taşıyın.';

export const NAVIGATION: NavItem[] = [
    {
        label: 'Oturma Odası',
        href: '/kategori/oturma-odasi',
        featuredImage: '/images/rooms/living-room.jpg',
        children: [
            {
                title: 'Koltuklar',
                items: [
                    { label: 'Köşe Koltuklar', href: '/kategori/kose-koltuklar' },
                    { label: 'İkili Koltuklar', href: '/kategori/ikili-koltuklar' },
                    { label: 'Tekli Koltuklar', href: '/kategori/tekli-koltuklar' },
                    { label: 'Berjerler', href: '/kategori/berjerler' },
                ],
            },
            {
                title: 'Sehpalar',
                items: [
                    { label: 'Orta Sehpalar', href: '/kategori/orta-sehpalar' },
                    { label: 'Yan Sehpalar', href: '/kategori/yan-sehpalar' },
                    { label: 'Zigon Sehpalar', href: '/kategori/zigon-sehpalar' },
                ],
            },
            {
                title: 'Depolama',
                items: [
                    { label: 'TV Üniteleri', href: '/kategori/tv-uniteleri' },
                    { label: 'Kitaplıklar', href: '/kategori/kitapliklar' },
                    { label: 'Konsollar', href: '/kategori/konsollar' },
                ],
            },
        ],
    },
    {
        label: 'Yatak Odası',
        href: '/kategori/yatak-odasi',
        featuredImage: '/images/rooms/bedroom.jpg',
        children: [
            {
                title: 'Yataklar',
                items: [
                    { label: 'Çift Kişilik Yataklar', href: '/kategori/cift-kisilik-yataklar' },
                    { label: 'Tek Kişilik Yataklar', href: '/kategori/tek-kisilik-yataklar' },
                    { label: 'Baza & Başlıklar', href: '/kategori/baza-basliklar' },
                ],
            },
            {
                title: 'Dolap & Depolama',
                items: [
                    { label: 'Gardıroplar', href: '/kategori/gardiroplar' },
                    { label: 'Komodinler', href: '/kategori/komodinler' },
                    { label: 'Şifoniyerler', href: '/kategori/sifoniyerler' },
                ],
            },
        ],
    },
    {
        label: 'Yemek Odası',
        href: '/kategori/yemek-odasi',
        featuredImage: '/images/rooms/dining-room.jpg',
        children: [
            {
                title: 'Masa & Sandalye',
                items: [
                    { label: 'Yemek Masaları', href: '/kategori/yemek-masalari' },
                    { label: 'Sandalyeler', href: '/kategori/sandalyeler' },
                    { label: 'Bar Tabureleri', href: '/kategori/bar-tabureleri' },
                ],
            },
            {
                title: 'Depolama',
                items: [
                    { label: 'Büfeler', href: '/kategori/bufeler' },
                    { label: 'Vitrinler', href: '/kategori/vitrinler' },
                ],
            },
        ],
    },
    {
        label: 'Çalışma Odası',
        href: '/kategori/calisma-odasi',
        featuredImage: '/images/rooms/office.jpg',
        children: [
            {
                title: 'Çalışma Mobilyası',
                items: [
                    { label: 'Çalışma Masaları', href: '/kategori/calisma-masalari' },
                    { label: 'Ofis Koltukları', href: '/kategori/ofis-koltuklari' },
                    { label: 'Kitaplıklar', href: '/kategori/kitapliklar-calisma' },
                ],
            },
        ],
    },
    {
        label: 'Aydınlatma',
        href: '/kategori/aydinlatma',
        featuredImage: '/images/rooms/lighting.jpg',
        children: [
            {
                title: 'Aydınlatma Türleri',
                items: [
                    { label: 'Avizeler', href: '/kategori/avizeler' },
                    { label: 'Lambaderler', href: '/kategori/lambaderler' },
                    { label: 'Masa Lambaları', href: '/kategori/masa-lambalari' },
                    { label: 'Aplik & Spotlar', href: '/kategori/aplik-spotlar' },
                ],
            },
        ],
    },
    {
        label: 'Dekorasyon',
        href: '/kategori/dekorasyon',
        featuredImage: '/images/rooms/decor.jpg',
        children: [
            {
                title: 'Dekoratif Ürünler',
                items: [
                    { label: 'Vazolar', href: '/kategori/vazolar' },
                    { label: 'Aynalar', href: '/kategori/aynalar' },
                    { label: 'Halılar', href: '/kategori/halilar' },
                    { label: 'Yastık & Kırlentler', href: '/kategori/yastik-kirlentler' },
                ],
            },
        ],
    },
];

export const CATEGORIES: Category[] = [
    { id: '1', name: 'Oturma Odası', slug: 'oturma-odasi', description: 'Yaşam alanınız için lüks koltuklar ve mobilyalar', image: '/images/categories/living.jpg', productCount: 48 },
    { id: '2', name: 'Yatak Odası', slug: 'yatak-odasi', description: 'Konforlu ve şık yatak odası mobilyaları', image: '/images/categories/bedroom.jpg', productCount: 36 },
    { id: '3', name: 'Yemek Odası', slug: 'yemek-odasi', description: 'Zarif yemek masaları ve sandalyeler', image: '/images/categories/dining.jpg', productCount: 24 },
    { id: '4', name: 'Çalışma Odası', slug: 'calisma-odasi', description: 'Üretken çalışma alanları', image: '/images/categories/office.jpg', productCount: 18 },
    { id: '5', name: 'Aydınlatma', slug: 'aydinlatma', description: 'Atmosfer yaratan aydınlatma çözümleri', image: '/images/categories/lighting.jpg', productCount: 32 },
    { id: '6', name: 'Dekorasyon', slug: 'dekorasyon', description: 'Evinizi tamamlayan dekoratif aksesuarlar', image: '/images/categories/decor.jpg', productCount: 56 },
];

export const FILTER_COLORS = [
    { name: 'Bej', hex: '#D4C5B2' },
    { name: 'Gri', hex: '#9E9E9E' },
    { name: 'Beyaz', hex: '#FAFAFA' },
    { name: 'Antrasit', hex: '#3C3C3C' },
    { name: 'Mavi', hex: '#7B9EB8' },
    { name: 'Yeşil', hex: '#8B9E82' },
    { name: 'Terakota', hex: '#C67D5B' },
    { name: 'Kahverengi', hex: '#8B6F4E' },
];

export const FILTER_MATERIALS = [
    'Keten',
    'Bouclé',
    'Kadife',
    'Deri',
    'Meşe',
    'Ceviz',
    'Mermer',
    'Seramik',
    'Metal',
];

export const PRICE_RANGE: [number, number] = [0, 150000];

export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
};
