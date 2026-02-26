import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'MAISON — Premium Mobilya',
        short_name: 'MAISON',
        description: 'Premium mobilya ve ev dekorasyonu. Türk tasarımı, dünya kalitesi.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F5F0EB',
        theme_color: '#1C1C1E',
        orientation: 'portrait-primary',
        lang: 'tr',
        categories: ['shopping', 'lifestyle'],
        icons: [
            { src: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
            { src: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
            { src: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
            { src: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
            { src: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
            { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
            { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        screenshots: [
            {
                src: '/screenshots/desktop.jpg',
                sizes: '1280x800',
                type: 'image/jpeg',
                label: 'MAISON Ana Sayfa — Desktop',
            },
            {
                src: '/screenshots/mobile.jpg',
                sizes: '390x844',
                type: 'image/jpeg',
                label: 'MAISON Ana Sayfa — Mobil',
            },
        ],
    };
}
