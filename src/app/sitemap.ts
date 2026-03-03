import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://selismobilya.com';

// Mock data — production'da DB'den çek
const CATEGORY_SLUGS = [
    'oturma-odasi', 'yatak-odasi', 'yemek-odasi', 'calisma-odasi',
    'cocuk-odasi', 'banyo', 'dekorasyon', 'aydinlatma',
];

const PRODUCT_SLUGS = [
    { slug: 'luna-kose-koltuk', lastMod: '2026-02-20' },
    { slug: 'orbit-sehpa', lastMod: '2026-02-18' },
    { slug: 'arc-lambader', lastMod: '2026-02-15' },
    { slug: 'nova-yemek-masasi', lastMod: '2026-02-10' },
    { slug: 'aria-sandalye', lastMod: '2026-02-08' },
    { slug: 'serene-platform-yatak', lastMod: '2026-02-05' },
];

const BLOG_SLUGS = [
    { slug: 'kucuk-salona-mobilya-secimi-rehberi', lastMod: '2026-02-20' },
    { slug: '2026-ev-dekorasyonu-renk-trendleri', lastMod: '2026-02-15' },
    { slug: 'yemek-masasi-boyutu-nasil-secilir', lastMod: '2026-02-10' },
    { slug: 'minimalist-yatak-odasi-dekorasyonu', lastMod: '2026-02-05' },
    { slug: 'ahsap-mi-metal-mi-malzeme-karsilastirmasi', lastMod: '2026-01-28' },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date().toISOString();

    // 1. Statik sayfalar
    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
        { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
        { url: `${SITE_URL}/lookbook`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE_URL}/kampanyalar`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE_URL}/hakkimizda`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${SITE_URL}/iletisim`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${SITE_URL}/karsilastir`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    ];

    // 2. Kategori sayfaları
    const categoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map(slug => ({
        url: `${SITE_URL}/kategori/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 3. Ürün sayfaları
    const productPages: MetadataRoute.Sitemap = PRODUCT_SLUGS.map(({ slug, lastMod }) => ({
        url: `${SITE_URL}/urun/${slug}`,
        lastModified: new Date(lastMod).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // 4. Blog yazıları
    const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map(({ slug, lastMod }) => ({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: new Date(lastMod).toISOString(),
        changeFrequency: 'yearly',
        priority: 0.5,
    }));

    return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
