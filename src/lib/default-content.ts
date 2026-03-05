// lib/mock/content.ts

export type SectionType =
    | 'hero'
    | 'features'
    | 'featured-products'
    | 'lookbook-banner'
    | 'campaign-strip'
    | 'testimonials'
    | 'newsletter'
    | 'text-block'
    | 'gallery';

export interface HeroContent {
    topLabel: string;
    title: string;
    subtitle: string;
    ctaButtons: { text: string; url: string; type: 'primary' | 'outline' | 'link' }[];
    desktopImage: string;
    mobileImage?: string;
    videoUrl?: string;
    overlayOpacity: number;
    textPosition: 'left' | 'center' | 'right';
}

export interface FeatureItem {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export interface BannerContent {
    text: string;
    url?: string;
    isActive: boolean;
    isMarquee: boolean;
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    schedule?: {
        start: string;
        end: string;
    };
}

export interface PageSection {
    id: string;
    type: SectionType;
    title: string;
    isActive: boolean;
    order: number;
    content: any; // HeroContent | FeatureItem[] | BannerContent etc.
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: { id: string; name: string; avatar: string };
    category: string;
    tags: string[];
    status: 'published' | 'draft' | 'scheduled';
    publishedAt?: string;
    scheduledAt?: string;
    createdAt: string;
    updatedAt: string;
    views: number;
    comments: number;
    readTime: number;
    seo: {
        metaTitle: string;
        metaDescription: string;
        focusKeyword: string;
    };
}

export interface LookbookPhoto {
    id: string;
    title: string;
    titleKey?: string;
    description: string;
    descriptionKey?: string;
    category: string;
    url: string;
    order: number;
    isFeatured: boolean;
    productTags: {
        id: string;
        x: number;
        y: number;
        productId: string;
        productName: string;
        productPrice: number;
        productHref: string;
        productImage: string;
    }[];
}

export interface LookbookCollection {
    id: string;
    name: string;
    season: string;
    coverImage: string;
    isActive: boolean;
    publishedAt: string;
    photos: LookbookPhoto[];
}

// --- MOCK DATA ---

export const mockPageSections: PageSection[] = [
    {
        id: 'sec_1',
        type: 'hero',
        title: 'Ana Hero Bölümü',
        isActive: true,
        order: 0,
        content: {
            topLabel: "2026 Koleksiyonu",
            title: "Yaşam Alanlarınıza\nSelis Dokunuşu",
            subtitle: "Dekorasyonda lüks ve zarafetin buluştuğu nokta Türkiye'nin en prestijli mobilya markası SELIS ile tanışın.",
            ctaButtons: [
                { text: "Koleksiyonu Keşfet", url: "/koleksiyon", type: 'primary' },
                { text: "Lookbook", url: "/lookbook", type: 'outline' }
            ],
            desktopImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1920",
            overlayOpacity: 40,
            textPosition: 'left'
        } as HeroContent
    },
    {
        id: 'sec_2',
        type: 'features',
        title: 'Özellikler Şeridi',
        isActive: true,
        order: 1,
        content: [
            { id: 'f1', icon: 'Truck', title: 'Ücretsiz Teslimat', description: '50.000₺ üzeri siparişlerde profesyonel kurulum ve nakliye.' },
            { id: 'f2', icon: 'ShieldCheck', title: '5 Yıl Garanti', description: 'Tüm mobilyalarımız SELIS işçilik ve kalite garantisi altındadır.' },
            { id: 'f3', icon: 'Award', title: 'Ödüllü Tasarımlar', description: 'Uluslararası tasarım yarışmalarından ödüllü modern çizgiler.' },
            { id: 'f4', icon: 'Gem', title: 'Hakiki Malzeme', description: 'Sadece masif meşe, mermer ve İtalyan deri kullanımı.' }
        ] as FeatureItem[]
    }
];

export const mockBlogs: BlogPost[] = [
    {
        id: 'blog_1',
        title: "Yaşam Alanlarınızı Dönüştürün: Minimalizm ve Lüks",
        slug: "yasam-alanlarinizi-donusturun",
        excerpt: "Modern dekorasyonda sadeliğin zarafeti nasıl yakalanır? İşte Selis tasarımcılarından ipuçları.",
        content: `<h2>Minimalizmin Yeni Tanımı</h2><p>Selis olarak biz, lüksün sadece gösterişte değil, detaylardaki sadelikte gizli olduğuna inanıyoruz...</p>`,
        coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
        author: { id: 'admin1', name: 'Alara Tunç', avatar: 'https://i.pravatar.cc/150?u=alara' },
        category: "Tasarım",
        tags: ["Dekorasyon", "İç Mimari", "Minimalizm"],
        status: 'published',
        publishedAt: "2026-03-12T14:00:00Z",
        createdAt: "2026-03-10T10:00:00Z",
        updatedAt: "2026-03-12T14:00:00Z",
        views: 1247,
        comments: 12,
        readTime: 6,
        seo: {
            metaTitle: "Yaşam Alanlarınızı Dönüştürün | Selis Blog",
            metaDescription: "Minimalist dekorasyon ile lüksü birleştirin. Selis'dan profesyonel tasarım tüyoları.",
            focusKeyword: "dekorasyon"
        }
    },
    {
        id: 'blog_2',
        title: "Luna Koleksiyonu: Ay'ın Işığından İlham Aldık",
        slug: "luna-koleksiyonu-hikayesi",
        excerpt: "Yeni serimiz Luna'nın tasarım sürecine ve ardındaki sanatsal yaklaşıma derin bir bakış.",
        content: `<p>Luna serisi, gecenin dinginliğini ve ay ışığının yumuşak hatlarını yansıtmak amacıyla tasarlandı...</p>`,
        coverImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
        author: { id: 'admin2', name: 'Canberk Gezer', avatar: 'https://i.pravatar.cc/150?u=canberk' },
        category: "Koleksiyon",
        tags: ["Luna", "Yeni Koleksiyon", "Işık"],
        status: 'published',
        publishedAt: "2026-02-28T09:00:00Z",
        createdAt: "2026-02-25T11:00:00Z",
        updatedAt: "2026-02-28T09:00:00Z",
        views: 856,
        comments: 5,
        readTime: 4,
        seo: {
            metaTitle: "Luna Koleksiyonu Tasarım Hikayesi | Selis",
            metaDescription: "Luna mobilya serisinin sanatsal tasarım süreci ve detayları.",
            focusKeyword: "Luna"
        }
    },
    {
        id: 'blog_3',
        title: "Sürdürülebilir Ormancılık ve Selis",
        slug: "surdurulebilir-ormancilik",
        excerpt: "Kullandığımız her parça ahşabı, doğaya olan borcumuzu unutmadan seçiyoruz.",
        content: `<p>Selis olarak üretim süreçlerimizde sadece FSC sertifikalı ormanlardan elde edilen ahşapları kullanıyoruz...</p>`,
        coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
        author: { id: 'admin1', name: 'Alara Tunç', avatar: 'https://i.pravatar.cc/150?u=alara' },
        category: "Haberler",
        tags: ["Sürdürülebilirlik", "Doğa", "Ahşap"],
        status: 'draft',
        createdAt: "2026-03-24T15:00:00Z",
        updatedAt: "2026-03-24T15:00:00Z",
        views: 0,
        comments: 0,
        readTime: 5,
        seo: {
            metaTitle: "Sürdürülebilirlik Vizyonumuz | Selis",
            metaDescription: "Selis'un doğa dostu üretim süreçleri ve ağaçlandırma projeleri.",
            focusKeyword: "sürdürülebilirlik"
        }
    }
];

export const mockLookbooks: LookbookCollection[] = [
    {
        id: 'look_1',
        name: "Bahar 2026",
        season: "Bahar 2026",
        coverImage: "/images/rooms/lookbook-1.jpg",
        isActive: true,
        publishedAt: "2026-03-01",
        photos: [
            {
                id: '1',
                title: 'Modern Oturma Odası',
                titleKey: 'lookbook_room1_title',
                description: 'Luna ailesinin saf zarafeti ile tanışın. Doğal meşe ve premium kumaşın buluştuğu bu konsept, modernitenin özünü yansıtır.',
                descriptionKey: 'lookbook_room1_desc',
                category: 'Oturma Odası',
                url: '/images/rooms/lookbook-1.jpg',
                order: 0,
                isFeatured: true,
                productTags: [
                    { id: 'h1', x: 30, y: 55, productId: 'prod_1', productName: 'Luna Köşe Koltuk', productPrice: 74990, productImage: '/images/products/luna-sofa-1.jpg', productHref: '/urun/luna-kose-koltuk' },
                    { id: 'h2', x: 60, y: 70, productId: 'prod_2', productName: 'Orbit Sehpa', productPrice: 18990, productImage: '/images/products/orbit-table-1.jpg', productHref: '/urun/orbit-sehpa' },
                    { id: 'h3', x: 75, y: 30, productId: 'prod_3', productName: 'Aura Lambader', productPrice: 12990, productImage: '/images/products/aura-lamp-1.jpg', productHref: '/urun/aura-lambader' },
                ]
            },
            {
                id: '2',
                title: 'Minimalist Yemek Odası',
                titleKey: 'lookbook_room2_title',
                description: 'Nova\'nın temiz çizgileri ve Aria sandalyelerinin yumuşak düzlüğü — yemek saatlerini bir ritüele dönüştürür.',
                descriptionKey: 'lookbook_room2_desc',
                category: 'Yemek Odası',
                url: '/images/categories/dining.jpg',
                order: 1,
                isFeatured: false,
                productTags: [
                    { id: 'h4', x: 40, y: 50, productId: 'prod_4', productName: 'Nova Yemek Masası', productPrice: 45990, productImage: '/images/products/nova-table-1.jpg', productHref: '/urun/nova-yemek-masasi' },
                    { id: 'h5', x: 25, y: 65, productId: 'prod_5', productName: 'Como Sandalye', productPrice: 8990, productImage: '/images/products/como-chair-1.jpg', productHref: '/urun/como-sandalye' },
                ]
            },
            {
                id: '3',
                title: 'Huzurlu Yatak Odası',
                titleKey: 'lookbook_room3_title',
                description: 'Gün sona erdiğinde ihtiyacınız olan yer. Serene Platform Yatak ve Mist komodinleri ile mükemmel uyku ortamı.',
                descriptionKey: 'lookbook_room3_desc',
                category: 'Yatak Odası',
                url: '/images/products/aurora-lifestyle.jpg',
                order: 2,
                isFeatured: false,
                productTags: [
                    { id: 'h6', x: 45, y: 40, productId: 'prod_6', productName: 'Zen Yatak Başlığı', productPrice: 28990, productImage: '/images/products/zen-bed-1.jpg', productHref: '/urun/zen-yatak-basligi' },
                    { id: 'h7', x: 20, y: 60, productId: 'prod_7', productName: 'Terra Halı', productPrice: 15990, productImage: '/images/products/terra-rug-1.jpg', productHref: '/urun/terra-hali' },
                ]
            }
        ]
    }
];
