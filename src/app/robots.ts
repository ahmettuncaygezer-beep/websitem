import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maisonmobilya.com';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/odeme/',
                    '/hesabim/',
                    '/admin/',
                    '/_next/',
                    '/siparis-onay/',
                ],
            },
            {
                // GPTBot — içerik kazıma engeli
                userAgent: 'GPTBot',
                disallow: ['/'],
            },
            {
                // Bing AI crawler
                userAgent: 'bingbot',
                allow: '/',
                disallow: ['/api/', '/odeme/', '/hesabim/', '/admin/'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
