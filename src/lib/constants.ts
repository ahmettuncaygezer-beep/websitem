import { NavItem, Category } from '@/types';

export const SITE_NAME = 'SELIS';
export const SITE_TAGLINE = 'Evinizin Yeni Hikayesi';
export const SITE_DESCRIPTION = 'Premium mobilya ve ev dekorasyonu. Lüks yaşamın zarafetini evinize taşıyın.';

export const NAVIGATION: NavItem[] = [
    {
        label: 'Oturma Odası',
        labelKey: 'nav_living_room',
        href: '/kategori/oturma-odasi',
        featuredImage: '/images/rooms/living-room.jpg',
        children: [
            {
                title: 'Koltuklar',
                items: [
                    { label: 'Köşe Koltuklar', labelKey: 'nav_corner_sofas', href: '/kategori/kose-koltuklar' },
                    { label: 'İkili Koltuklar', labelKey: 'nav_two_seat_sofas', href: '/kategori/ikili-koltuklar' },
                    { label: 'Tekli Koltuklar', labelKey: 'nav_armchairs', href: '/kategori/tekli-koltuklar' },
                    { label: 'Berjerler', labelKey: 'nav_bergere', href: '/kategori/berjerler' },
                ],
            },
            {
                title: 'Sehpalar',
                items: [
                    { label: 'Orta Sehpalar', labelKey: 'nav_coffee_tables', href: '/kategori/orta-sehpalar' },
                    { label: 'Yan Sehpalar', labelKey: 'nav_side_tables', href: '/kategori/yan-sehpalar' },
                    { label: 'Zigon Sehpalar', labelKey: 'nav_nesting_tables', href: '/kategori/zigon-sehpalar' },
                ],
            },
            {
                title: 'Depolama',
                items: [
                    { label: 'TV Üniteleri', labelKey: 'nav_tv_units', href: '/kategori/tv-uniteleri' },
                    { label: 'Kitaplıklar', labelKey: 'nav_bookcases', href: '/kategori/kitapliklar' },
                    { label: 'Konsollar', labelKey: 'nav_consoles', href: '/kategori/konsollar' },
                ],
            },
        ],
    },
    {
        label: 'Yatak Odası',
        labelKey: 'nav_bedroom',
        href: '/kategori/yatak-odasi',
        featuredImage: '/images/rooms/bedroom.jpg',
        children: [
            {
                title: 'Yataklar',
                items: [
                    { label: 'Çift Kişilik Yataklar', labelKey: 'nav_double_beds', href: '/kategori/cift-kisilik-yataklar' },
                    { label: 'Tek Kişilik Yataklar', labelKey: 'nav_single_beds', href: '/kategori/tek-kisilik-yataklar' },
                    { label: 'Baza & Başlıklar', labelKey: 'nav_bases_headboards', href: '/kategori/baza-basliklar' },
                ],
            },
            {
                title: 'Dolap & Depolama',
                items: [
                    { label: 'Gardıroplar', labelKey: 'nav_wardrobes', href: '/kategori/gardiroplar' },
                    { label: 'Komodinler', labelKey: 'nav_nightstands', href: '/kategori/komodinler' },
                    { label: 'Şifoniyerler', labelKey: 'nav_dressers', href: '/kategori/sifoniyerler' },
                ],
            },
            {
                title: 'Genç & Çocuk',
                items: [
                    { label: 'Genç & Çocuk Odası', labelKey: 'nav_kids_room', href: '/kategori/genc-cocuk-odasi' },
                ],
            },
        ],
    },
    {
        label: 'Yemek Odası',
        labelKey: 'nav_dining',
        href: '/kategori/yemek-odasi',
        featuredImage: '/images/rooms/dining-room.jpg',
        children: [
            {
                title: 'Masa & Sandalye',
                items: [
                    { label: 'Yemek Masaları', labelKey: 'nav_dining_tables', href: '/kategori/yemek-masalari' },
                    { label: 'Sandalyeler', labelKey: 'nav_chairs', href: '/kategori/sandalyeler' },
                    { label: 'Bar Tabureleri', labelKey: 'nav_bar_stools', href: '/kategori/bar-tabureleri' },
                ],
            },
            {
                title: 'Depolama',
                items: [
                    { label: 'Büfeler', labelKey: 'nav_sideboards', href: '/kategori/bufeler' },
                    { label: 'Vitrinler', labelKey: 'nav_showcases', href: '/kategori/vitrinler' },
                ],
            },
        ],
    },
    {
        label: 'Çalışma Odası',
        labelKey: 'nav_office',
        href: '/kategori/calisma-odasi',
        featuredImage: '/images/rooms/office.jpg',
        children: [
            {
                title: 'Çalışma Mobilyası',
                items: [
                    { label: 'Çalışma Masaları', labelKey: 'nav_desks', href: '/kategori/calisma-masalari' },
                    { label: 'Ofis Koltukları', labelKey: 'nav_office_chairs', href: '/kategori/ofis-koltuklari' },
                    { label: 'Kitaplıklar', labelKey: 'nav_bookcases', href: '/kategori/kitapliklar-calisma' },
                ],
            },
        ],
    },
    {
        label: 'Aydınlatma',
        labelKey: 'nav_lighting',
        href: '/kategori/aydinlatma',
        featuredImage: '/images/rooms/lighting.jpg',
        children: [
            {
                title: 'Aydınlatma Türleri',
                items: [
                    { label: 'Avizeler', labelKey: 'nav_chandeliers', href: '/kategori/avizeler' },
                    { label: 'Lambaderler', labelKey: 'nav_floor_lamps', href: '/kategori/lambaderler' },
                    { label: 'Masa Lambaları', labelKey: 'nav_table_lamps', href: '/kategori/masa-lambalari' },
                    { label: 'Aplik & Spotlar', labelKey: 'nav_sconces_spots', href: '/kategori/aplik-spotlar' },
                ],
            },
        ],
    },
    {
        label: 'Dekorasyon',
        labelKey: 'nav_decoration',
        href: '/kategori/dekorasyon',
        featuredImage: '/images/rooms/decor.jpg',
        children: [
            {
                title: 'Dekoratif Ürünler',
                items: [
                    { label: 'Vazolar', labelKey: 'nav_vases', href: '/kategori/vazolar' },
                    { label: 'Aynalar', labelKey: 'nav_mirrors', href: '/kategori/aynalar' },
                    { label: 'Halılar', labelKey: 'nav_rugs', href: '/kategori/halilar' },
                    { label: 'Yastık & Kırlentler', labelKey: 'nav_pillows', href: '/kategori/yastik-kirlentler' },
                ],
            },
        ],
    },
];

export const CATEGORIES: Category[] = [
    { id: '1', name: 'Oturma Odası', nameKey: 'nav_living_room', slug: 'oturma-odasi', description: 'Yaşam alanınız için lüks koltuklar ve mobilyalar', descriptionKey: 'cat_desc_living', image: '/images/categories/living.jpg', productCount: 35 },
    { id: '2', name: 'Yatak Odası', nameKey: 'nav_bedroom', slug: 'yatak-odasi', description: 'Konforlu ve şık yatak odası mobilyaları', descriptionKey: 'cat_desc_bedroom', image: '/images/categories/bedroom.jpg', productCount: 3 },
    { id: '3', name: 'Yemek Odası', nameKey: 'nav_dining', slug: 'yemek-odasi', description: 'Zarif yemek masaları ve sandalyeler', descriptionKey: 'cat_desc_dining', image: '/images/categories/dining.jpg', productCount: 22 },
    { id: '4', name: 'Çalışma Odası', nameKey: 'nav_office', slug: 'calisma-odasi', description: 'Üretken çalışma alanları', descriptionKey: 'cat_desc_office', image: '/images/categories/office.jpg', productCount: 1 },
    { id: '5', name: 'Aydınlatma', nameKey: 'nav_lighting', slug: 'aydinlatma', description: 'Atmosfer yaratan aydınlatma çözümleri', descriptionKey: 'cat_desc_lighting', image: '/images/categories/lighting.jpg', productCount: 2 },
    { id: '6', name: 'Dekorasyon', nameKey: 'nav_decoration', slug: 'dekorasyon', description: 'Evinizi tamamlayan dekoratif aksesuarlar', descriptionKey: 'cat_desc_decoration', image: '/images/categories/decor.jpg', productCount: 2 },
    { id: '7', name: 'Genç & Çocuk Odası', nameKey: 'nav_kids_room', slug: 'genc-cocuk-odasi', description: 'Renkli ve enerjik genç odası mobilyaları', descriptionKey: 'cat_desc_kids', image: '/images/categories/placeholder.jpg', productCount: 27 },
];

export const COLLECTIONS = [
    { id: 'c1', name: '2026 İlkbahar', nameKey: 'nav_spring_2026', slug: '2026-ilkbahar', description: 'Doğanın uyanışından ilham alan taze tasarımlar.', descriptionKey: 'col_desc_spring' },
    { id: 'c2', name: 'Minimalist Seri', nameKey: 'nav_minimalist_series', slug: 'minimalist', description: 'Az ama öz. Sade çizgilerle maksimum şıklık.', descriptionKey: 'col_desc_minimalist' },
    { id: 'c3', name: 'Klasik Seri', nameKey: 'nav_classic_series', slug: 'klasik', description: 'Zamana meydan okuyan klasik ve zarif dokunuşlar.', descriptionKey: 'col_desc_classic' }
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
