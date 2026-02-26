// Rich category data for the Mega Menu
// Extends the existing NAVIGATION constant with featured products and editorial content
import type { NavCategory } from './navbar.types';

export const NAV_CATEGORIES: NavCategory[] = [
    {
        id: 'oturma-odasi',
        label: 'Oturma Odası',
        href: '/kategori/oturma-odasi',
        subCategories: [
            {
                title: 'Öne Çıkanlar',
                items: [
                    { label: 'Köşe Koltuklar', href: '/kategori/kose-koltuklar' },
                    { label: 'İkili Koltuklar', href: '/kategori/ikili-koltuklar' },
                    { label: 'Tekli Koltuklar', href: '/kategori/tekli-koltuklar' },
                    { label: 'Berjerler', href: '/kategori/berjerler' },
                    { label: 'Orta Sehpalar', href: '/kategori/orta-sehpalar' },
                    { label: 'Yan Sehpalar', href: '/kategori/yan-sehpalar' },
                    { label: 'Zigon Sehpalar', href: '/kategori/zigon-sehpalar' },
                ],
            },
            {
                title: 'Koleksiyonlar',
                items: [
                    { label: '2026 İlkbahar', href: '/koleksiyonlar/2026-ilkbahar' },
                    { label: 'Minimalist Seri', href: '/koleksiyonlar/minimalist' },
                    { label: 'Klasik Seri', href: '/koleksiyonlar/klasik' },
                ],
            },
        ],
        featuredProduct: {
            name: 'Luna Köşe Koltuk',
            brand: 'MAISON Atelier',
            price: 74990,
            originalPrice: 89990,
            image: '/images/products/luna-kose-koltuk.jpg',
            href: '/urun/luna-kose-koltuk',
            badge: 'YENİ',
        },
        editorialText: 'Bu Sezon Trend: Organik Formlar',
        colors: [
            { name: 'Vizon', hex: '#C4A882' },
            { name: 'Antrasit', hex: '#3C3C3C' },
            { name: 'Krem', hex: '#F5F0EB' },
        ],
        promotionText: '🔥 Bu Hafta: Luna Köşe Koltuk\'ta %17 İndirim',
    },
    {
        id: 'yatak-odasi',
        label: 'Yatak Odası',
        href: '/kategori/yatak-odasi',
        subCategories: [
            {
                title: 'Yataklar',
                items: [
                    { label: 'Çift Kişilik Yataklar', href: '/kategori/cift-kisilik-yataklar' },
                    { label: 'Tek Kişilik Yataklar', href: '/kategori/tek-kisilik-yataklar' },
                    { label: 'Baza & Başlıklar', href: '/kategori/baza-basliklar' },
                ],
            },
            {
                title: 'Depolama',
                items: [
                    { label: 'Gardıroplar', href: '/kategori/gardiroplar' },
                    { label: 'Komodinler', href: '/kategori/komodinler' },
                    { label: 'Şifoniyerler', href: '/kategori/sifoniyerler' },
                ],
            },
        ],
        featuredProduct: {
            name: 'Aria Platform Yatak',
            brand: 'MAISON Sleep',
            price: 54990,
            image: '/images/products/aria-platform-yatak.jpg',
            href: '/urun/aria-platform-yatak',
        },
        editorialText: 'Dinlendirici Uyku İçin Tasarlandı',
        promotionText: '🔥 Bu Hafta: Yatak Setlerinde %20 İndirim',
    },
    {
        id: 'yemek-odasi',
        label: 'Yemek Odası',
        href: '/kategori/yemek-odasi',
        subCategories: [
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
        featuredProduct: {
            name: 'Oslo Yemek Masası',
            brand: 'MAISON Studio',
            price: 38990,
            image: '/images/products/oslo-yemek-masasi.jpg',
            href: '/urun/oslo-yemek-masasi',
        },
        promotionText: '🔥 Sandalye Setlerinde %15 İndirim',
    },
    {
        id: 'calisma-odasi',
        label: 'Çalışma Odası',
        href: '/kategori/calisma-odasi',
        subCategories: [
            {
                title: 'Çalışma Mobilyası',
                items: [
                    { label: 'Çalışma Masaları', href: '/kategori/calisma-masalari' },
                    { label: 'Ofis Koltukları', href: '/kategori/ofis-koltuklari' },
                    { label: 'Kitaplıklar', href: '/kategori/kitapliklar-calisma' },
                ],
            },
        ],
        featuredProduct: {
            name: 'Studio Çalışma Masası',
            brand: 'MAISON Work',
            price: 29990,
            image: '/images/products/studio-calisma-masasi.jpg',
            href: '/urun/studio-calisma-masasi',
        },
        promotionText: '🔥 Ev Ofis Setlerinde Ücretsiz Kargo',
    },
    {
        id: 'aydinlatma',
        label: 'Aydınlatma',
        href: '/kategori/aydinlatma',
        subCategories: [
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
        featuredProduct: {
            name: 'Celeste Avize',
            brand: 'MAISON Light',
            price: 18990,
            image: '/images/products/celeste-avize.jpg',
            href: '/urun/celeste-avize',
            badge: 'TREND',
        },
        promotionText: '🔥 Aydınlatmada Ücretsiz Montaj',
    },
    {
        id: 'dekorasyon',
        label: 'Dekorasyon',
        href: '/kategori/dekorasyon',
        subCategories: [
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
        featuredProduct: {
            name: 'Marble Vase Set',
            brand: 'MAISON Decor',
            price: 4990,
            image: '/images/products/marble-vase-set.jpg',
            href: '/urun/marble-vase-set',
        },
        promotionText: '🔥 Dekorasyonda 3 Al 2 Öde',
    },
    {
        id: 'ilham-rehberler',
        label: 'İlham ve Rehberler',
        href: '/blog',
        subCategories: [
            {
                title: 'Dekorasyon Rehberleri',
                items: [
                    { label: 'Küçük Salon Çözümleri', href: '/blog/kucuk-salona-mobilya-secimi-rehberi' },
                    { label: 'Renk Trendleri 2026', href: '/blog/2026-ev-dekorasyonu-renk-trendleri' },
                    { label: 'Yemek Masası Seçimi', href: '/blog/yemek-masasi-boyutu-nasil-secilir' },
                    { label: 'Minimalist Yatak Odası', href: '/blog/minimalist-yatak-odasi-dekorasyonu' },
                ],
            },
            {
                title: 'Alım Rehberleri',
                items: [
                    { label: 'Ahşap mı, Metal mi?', href: '/blog/ahsap-mi-metal-mi-malzeme-karsilastirmasi' },
                    { label: 'Çocuk Odası Rehberi', href: '/blog/cocuk-odasi-mobilya-alirken-dikkat-edilecekler' },
                    { label: 'Tüm Yazılar', href: '/blog' },
                ],
            },
            {
                title: 'Keşfet',
                items: [
                    { label: 'Lookbook', href: '/lookbook' },
                    { label: 'Oda Planlayıcı', href: '/oda-planlayici' },
                    { label: 'Kampanyalar', href: '/kampanyalar' },
                ],
            },
        ],
        featuredProduct: {
            name: 'Küçük Salon için 5 Koltuk',
            brand: 'Dekorasyon Rehberi',
            price: 0,
            image: '/images/gallery-1.jpg',
            href: '/blog/kucuk-salona-mobilya-secimi-rehberi',
            badge: 'YENİ',
        },
        editorialText: 'Uzman tavsiyeleri, ilham veren mekanlar.',
        promotionText: '✨ Haftanın yazısı: 2026 Renk Trendleri',
    },
];
