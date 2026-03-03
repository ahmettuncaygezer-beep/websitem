import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../page';
import { ShareBar, RelatedProducts, CoverImage } from './BlogDetailClient';

// Her makale 200 kelime = 1 dakika okuma
function calcReadingTime(content: string) {
    return Math.max(1, Math.ceil(content.split(' ').length / 200));
}

const BLOG_CONTENTS: Record<string, string> = {
    'kucuk-salona-mobilya-secimi-rehberi': `
Küçük salonlarda büyük mobilya seçmek, alanı daha da küçük gösterir. Ancak doğru boyut ve yerleşim planıyla 50m²'lik bir salon hem şık hem ferah olabilir.

## Neden Boyut Önemli?

Oturma grubu, genellikle salonun %60-65'ini kapsamalıdır. Bu oran altında oda boş durur, üzerinde ise mobilya odayı ezer. **Luna İkili Koltuk** gibi modüler modeller, ihtiyaca göre şekil alır.

## 5 Koltuk Önerisi

1. **Luna İkili** — 160cm genişlikte kompakt ama konforlu
2. **Aria Berjer** — Tek kişilik; köşe boşluklarını güzel değerlendirir
3. **Orbit Köşe** — L form; duvarı kullanır, orta alan açık kalır
4. **Sera Tekli** — Döner koltuk; 360° hareketle az yer kaplar
5. **Nova Futon** — İkili işlev: koltuk + misafir yatağı

## Renk Seçimi

Açık tonlar (krem, açık gri) mekanı büyük gösterir. Skoçya yeşili veya antrasit gibi koyu tonlar odaya derinlik katar ama tek parçayla sınırlı kalın.

## Sonuç

Ölçü alın, zemine bantla sınırı çizin, sonra sipariş verin. Her zaman boyuta göre karar, renge göre değil.
  `.trim(),
};

function getContent(slug: string): string {
    return BLOG_CONTENTS[slug] ?? `Bu yazı yakında yayınlanacak. Şimdilik arama yaparak diğer içeriklerimizi keşfedebilirsiniz.`;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (!post) return { title: 'Yazı Bulunamadı | SELIS' };

    return {
        title: `${post.title} | SELIS Blog`,
        description: post.excerpt,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        },
        alternates: {
            canonical: `/blog/${slug}`,
        },
    };
}

export function generateStaticParams() {
    return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

// Basit markdown-ish renderlayıcı (sunucu taraflı, event handler yok)
function renderContent(text: string) {
    return text.split('\n\n').map((para, i) => {
        if (para.startsWith('## ')) {
            return (
                <h2 key={i}
                    className="text-xl font-bold text-[#1C1C1E] mt-8 mb-3 pl-3 border-l-4 border-[#C9A96E]"
                    style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                    {para.replace('## ', '')}
                </h2>
            );
        }
        if (para.startsWith('> ')) {
            return (
                <blockquote key={i} className="border-l-4 border-[#C9A96E] pl-4 italic text-[#666] my-6">
                    {para.replace('> ', '')}
                </blockquote>
            );
        }
        if (para.trim().match(/^\d+\./m)) {
            const items = para.split('\n').filter(Boolean);
            return (
                <ol key={i} className="list-decimal list-inside space-y-2 my-4 text-[#444]">
                    {items.map((item, j) => (
                        <li key={j} className="text-[15px] leading-7">
                            {item.replace(/^\d+\.\s+/, '')}
                        </li>
                    ))}
                </ol>
            );
        }
        return <p key={i} className="text-[16px] leading-8 text-[#444] mb-4">{para}</p>;
    });
}

const RELATED_PRODUCTS = [
    { name: 'Luna İkili Koltuk', price: 54990, image: '/images/gallery-1.jpg', href: '/urun/luna-kose-koltuk' },
    { name: 'Orbit Sehpa', price: 12990, image: '/images/gallery-2.jpg', href: '/urun/orbit-sehpa' },
    { name: 'Arc Lambader', price: 8490, image: '/images/gallery-3.jpg', href: '/urun/arc-lambader' },
];

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = BLOG_POSTS.find(p => p.slug === slug);
    if (!post) notFound();

    const content = getContent(slug);
    const readingMinutes = Math.max(post.readingMinutes, calcReadingTime(content));

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: [post.coverImage],
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Person', name: post.author },
        publisher: {
            '@type': 'Organization',
            name: 'SELIS',
            logo: { '@type': 'ImageObject', url: '/logo.png' },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `/blog/${slug}` },
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: '/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: '/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: `/blog/${slug}` },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            <main className="min-h-screen bg-white">
                <div className="max-w-4xl mx-auto px-4 py-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-[11px] text-[#aaa] mb-8">
                        <Link href="/" className="hover:text-[#C9A96E] transition-colors">Ana Sayfa</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-[#C9A96E] transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-[#666]">{post.title}</span>
                    </nav>

                    {/* Kategori */}
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold text-white mb-4"
                        style={{ backgroundColor: post.categoryColor }}>
                        {post.category}
                    </span>

                    {/* Başlık */}
                    <h1
                        className="text-3xl md:text-4xl font-bold text-[#1C1C1E] leading-tight mb-4"
                        style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                        {post.title}
                    </h1>

                    {/* Yazar + Paylaşım — CLIENT bileşen (onClick, navigator.clipboard) */}
                    <ShareBar
                        title={post.title}
                        slug={slug}
                        author={post.author}
                        date={post.date}
                        readingMinutes={readingMinutes}
                    />

                    {/* Cover image — CLIENT bileşen (onError) */}
                    <CoverImage src={post.coverImage} alt={post.title} />

                    {/* İçerik — pure server render, event handler yok */}
                    <article className="max-w-prose mx-auto">
                        {renderContent(content)}
                    </article>

                    {/* İlgili ürünler — CLIENT bileşen (onError) */}
                    <div className="mt-14 pt-10 border-t border-[#E8E3DC]">
                        <h3 className="text-lg font-bold text-[#1C1C1E] mb-5"
                            style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}>
                            Bu Yazıda Bahsedilen Ürünler
                        </h3>
                        <RelatedProducts products={RELATED_PRODUCTS} />
                    </div>

                    {/* Geri */}
                    <div className="mt-10">
                        <Link href="/blog" className="flex items-center gap-1.5 text-[12px] text-[#666] hover:text-[#1C1C1E] transition-colors">
                            <ArrowLeft className="w-3.5 h-3.5" /> Tüm Yazılara Dön
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
