import type { Metadata } from 'next';
import { generateArticleSchema } from '@/lib/structured-data';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
    title: 'İlham & Rehberler | MAISON — Ev Dekorasyonu',
    description:
        'Ev dekorasyonu rehberleri, mobilya alım tavsiyeleri, renk trendleri ve yaşam tarzı yazıları. MAISON uzmanlarından ilham alın.',
    openGraph: {
        title: 'İlham & Rehberler — MAISON',
        description: 'Ev dekorasyonu rehberleri ve mobilya trendleri.',
        type: 'website',
        images: ['/images/gallery-1.jpg'],
    },
};

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    category: string;
    categoryColor: string;
    categorySlug: string;
    author: string;
    authorAvatar?: string;
    date: string;
    readingMinutes: number;
    featured?: boolean;
    tags?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
    {
        slug: 'kucuk-salona-mobilya-secimi-rehberi',
        title: '50m² Salon İçin 5 Koltuk Önerisi',
        excerpt:
            'Küçük alanlarda büyük koltuklar sorun yaratabilir. Doğru ölçü ve yerleşimle hem şık hem ferah bir salon tasarlamak mümkün.',
        coverImage: '/images/gallery-1.jpg',
        category: 'Alım Rehberi',
        categoryColor: '#C9A96E',
        categorySlug: 'alim-rehberi',
        author: 'Elif Kaya',
        date: '2026-02-20',
        readingMinutes: 5,
        featured: true,
        tags: ['salon', 'koltuk', 'küçük alan'],
    },
    {
        slug: '2026-ev-dekorasyonu-renk-trendleri',
        title: '2026 Ev Dekorasyonu Renk Trendleri',
        excerpt:
            'Toprak tonları, vizon ve sage yeşili bu yılın hâkim renkleri. İşte evler için en çok öne çıkan palet kombinasyonları.',
        coverImage: '/images/gallery-2.jpg',
        category: 'Trend',
        categoryColor: '#8B9E82',
        categorySlug: 'trend',
        author: 'Ayşe Demir',
        date: '2026-02-15',
        readingMinutes: 4,
        tags: ['renk', '2026', 'trend'],
    },
    {
        slug: 'yemek-masasi-boyutu-nasil-secilir',
        title: 'Yemek Masası Boyutu Nasıl Seçilir?',
        excerpt:
            'Kaç kişilik masa lazım? Hangi şekil odama yakışır? Uzun dikdörtgen mi, yuvarlak mı? Tüm cevaplar burada.',
        coverImage: '/images/gallery-3.jpg',
        category: 'Alım Rehberi',
        categoryColor: '#C9A96E',
        categorySlug: 'alim-rehberi',
        author: 'Can Yıldız',
        date: '2026-02-10',
        readingMinutes: 6,
        tags: ['yemek masası', 'boyut', 'ölçü'],
    },
    {
        slug: 'minimalist-yatak-odasi-dekorasyonu',
        title: 'Minimalist Yatak Odası Dekorasyonu',
        excerpt:
            'Az eşya, maksimum huzur. Minimalist yatak odası tasarımında renk, doku ve boşluk dengesini doğru kurmak için 8 altın kural.',
        coverImage: '/images/gallery-4.jpg',
        category: 'Dekorasyon',
        categoryColor: '#7B9EB8',
        categorySlug: 'dekorasyon',
        author: 'Zeynep Arslan',
        date: '2026-02-05',
        readingMinutes: 7,
        tags: ['minimalizm', 'yatak odası', 'huzur'],
    },
    {
        slug: 'ahsap-mi-metal-mi-malzeme-karsilastirmasi',
        title: 'Ahşap mı, Metal mi? Malzeme Karşılaştırması',
        excerpt:
            'Mobilyada ahşap ve metal her ikisi de güçlü tarz ifadeleri. Hangisi dayanıklı, hangisi bakımı kolay?',
        coverImage: '/images/gallery-5.jpg',
        category: 'Alım Rehberi',
        categoryColor: '#C9A96E',
        categorySlug: 'alim-rehberi',
        author: 'Murat Şahin',
        date: '2026-01-28',
        readingMinutes: 5,
        tags: ['ahşap', 'metal', 'malzeme'],
    },
    {
        slug: 'cocuk-odasi-mobilya-alirken-dikkat-edilecekler',
        title: 'Çocuk Odası Mobilya Alırken Dikkat Edilenler',
        excerpt:
            'Güvenli malzeme sertifikaları, büyüyen çocuğa uyum sağlayan tasarımlar ve renklerin çocuğun gelişimine etkisi.',
        coverImage: '/images/gallery-6.jpg',
        category: 'Alım Rehberi',
        categoryColor: '#C9A96E',
        categorySlug: 'alim-rehberi',
        author: 'Elif Kaya',
        date: '2026-01-20',
        readingMinutes: 8,
        tags: ['çocuk odası', 'güvenlik'],
    },
    {
        slug: 'mutfak-dekorasyonunda-renk-psikolojisi',
        title: 'Mutfak Dekorasyonunda Renk Psikolojisi',
        excerpt:
            'Mutfağınızda kullandığınız renkler iştahınızı ve mutluluğunuzu etkiliyor. İşte bilim destekli renk seçimi rehberi.',
        coverImage: '/images/gallery-1.jpg',
        category: 'Dekorasyon',
        categoryColor: '#7B9EB8',
        categorySlug: 'dekorasyon',
        author: 'Ayşe Demir',
        date: '2026-01-15',
        readingMinutes: 6,
        tags: ['mutfak', 'renk', 'psikoloji'],
    },
    {
        slug: 'balkon-mobilyasi-secim-rehberi',
        title: 'Balkon Mobilyası Seçim Rehberi',
        excerpt:
            'Küçük ya da büyük her balkonu yaşam alanına dönüştürmek mümkün. Hava koşullarına dayanaklı malzemeler ve akıllı yerleşim fikirleri.',
        coverImage: '/images/gallery-2.jpg',
        category: 'Alım Rehberi',
        categoryColor: '#C9A96E',
        categorySlug: 'alim-rehberi',
        author: 'Can Yıldız',
        date: '2026-01-10',
        readingMinutes: 4,
        tags: ['balkon', 'dış mekan'],
    },
];

export const CATEGORIES = ['Tümü', 'Dekorasyon', 'Alım Rehberi', 'Trend'];

// JSON-LD for list page
const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'MAISON İlham & Rehberler',
    description: 'Ev dekorasyonu ve mobilya alım rehberleri',
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maisonmobilya.com'}/blog`,
    blogPost: BLOG_POSTS.slice(0, 3).map(post =>
        generateArticleSchema({
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage,
            datePublished: post.date,
            author: post.author,
            slug: post.slug,
        })
    ),
};

export default function BlogPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
            />
            <BlogPageClient posts={BLOG_POSTS} categories={CATEGORIES} />
        </>
    );
}
