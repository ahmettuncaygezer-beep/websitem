/**
 * JSON-LD Structured Data Schema üreticileri
 * Google Rich Results için production-ready şemalar
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maisonmobilya.com';

// ── Organization ────────────────────────────────────────────────────
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'MAISON',
        url: SITE_URL,
        logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`,
            width: 200,
            height: 60,
        },
        description: 'Premium mobilya ve ev dekorasyonu markası. Türk tasarımı, BoConcept kalitesi.',
        foundingDate: '2020',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'İstanbul',
            addressCountry: 'TR',
        },
        contactPoint: [
            {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                telephone: '+90-850-000-0000',
                email: 'destek@maisonmobilya.com',
                areaServed: 'TR',
                availableLanguage: 'Turkish',
                hoursAvailable: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    opens: '09:00',
                    closes: '18:00',
                },
            },
        ],
        sameAs: [
            'https://www.instagram.com/maisonmobilya',
            'https://www.facebook.com/maisonmobilya',
            'https://www.youtube.com/@maisonmobilya',
            'https://www.pinterest.com/maisonmobilya',
        ],
    };
}

// ── WebSite (SearchAction) ───────────────────────────────────────────
export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'MAISON — Premium Mobilya',
        url: SITE_URL,
        inLanguage: 'tr-TR',
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${SITE_URL}/ara?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

// ── Product ─────────────────────────────────────────────────────────
export interface ProductSchemaInput {
    name: string;
    description: string;
    images: string[];
    sku: string;
    price: number;
    currency?: string;
    availability?: 'InStock' | 'OutOfStock' | 'LimitedAvailability';
    priceValidUntil?: string;
    ratingValue?: number;
    ratingCount?: number;
    slug: string;
    brand?: string;
}

export function generateProductSchema(product: ProductSchemaInput) {
    const priceValidUntil =
        product.priceValidUntil ??
        new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images.map(img =>
            img.startsWith('http') ? img : `${SITE_URL}${img}`
        ),
        sku: product.sku,
        brand: {
            '@type': 'Brand',
            name: product.brand ?? 'MAISON',
        },
        offers: {
            '@type': 'Offer',
            price: product.price.toString(),
            priceCurrency: product.currency ?? 'TRY',
            availability: `https://schema.org/${product.availability ?? 'InStock'}`,
            url: `${SITE_URL}/urun/${product.slug}`,
            priceValidUntil,
            seller: { '@id': `${SITE_URL}/#organization` },
        },
    };

    if (product.ratingValue && product.ratingCount) {
        schema.aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: product.ratingValue.toString(),
            bestRating: '5',
            worstRating: '1',
            ratingCount: product.ratingCount.toString(),
        };
    }

    return schema;
}

// ── ItemList (Kategori) ─────────────────────────────────────────────
export function generateItemListSchema(
    name: string,
    items: { name: string; slug: string; position: number }[]
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name,
        numberOfItems: items.length,
        itemListElement: items.map(item => ({
            '@type': 'ListItem',
            position: item.position,
            name: item.name,
            url: `${SITE_URL}/urun/${item.slug}`,
        })),
    };
}

// ── Article (Blog) ──────────────────────────────────────────────────
export interface ArticleSchemaInput {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    slug: string;
}

export function generateArticleSchema(article: ArticleSchemaInput) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.headline,
        description: article.description,
        image: [article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image}`],
        datePublished: article.datePublished,
        dateModified: article.dateModified ?? article.datePublished,
        author: {
            '@type': 'Person',
            name: article.author,
        },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blog/${article.slug}`,
        },
        inLanguage: 'tr-TR',
    };
}

// ── FAQPage ──────────────────────────────────────────────────────────
export function generateFAQSchema(
    faqs: { question: string; answer: string }[]
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

// ── BreadcrumbList ───────────────────────────────────────────────────
export function generateBreadcrumbSchema(
    items: { name: string; href?: string }[]
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => {
            const listItem: Record<string, unknown> = {
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
            };
            if (item.href) {
                listItem.item = item.href.startsWith('http')
                    ? item.href
                    : `${SITE_URL}${item.href}`;
            }
            return listItem;
        }),
    };
}
