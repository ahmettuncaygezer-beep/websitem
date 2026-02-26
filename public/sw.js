/**
 * MAISON Service Worker
 * Strategies:
 *   - Cache First:   images, fonts, icons
 *   - Network First: API calls, product data
 *   - SWR:           HTML pages
 */

const CACHE_VERSION = 'v1';
const CACHE_STATIC = `maison-static-${CACHE_VERSION}`;
const CACHE_PAGES = `maison-pages-${CACHE_VERSION}`;
const CACHE_API = `maison-api-${CACHE_VERSION}`;

const STATIC_ASSETS = [
    '/',
    '/offline',
    '/manifest.json',
];

// ── Install ──────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_STATIC).then(cache => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

// ── Activate ─────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(k => ![CACHE_STATIC, CACHE_PAGES, CACHE_API].includes(k))
                    .map(k => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET
    if (request.method !== 'GET') return;

    // Skip chrome-extension, etc.
    if (!url.protocol.startsWith('http')) return;

    // 1. API calls — Network First
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirst(request, CACHE_API, 5));
        return;
    }

    // 2. Static assets (images, fonts, icons) — Cache First
    if (
        url.pathname.startsWith('/images/') ||
        url.pathname.startsWith('/fonts/') ||
        url.pathname.startsWith('/icons/') ||
        /\.(png|jpg|jpeg|webp|avif|svg|gif|woff2?|ttf)$/i.test(url.pathname)
    ) {
        event.respondWith(cacheFirst(request, CACHE_STATIC));
        return;
    }

    // 3. Next.js static files
    if (url.pathname.startsWith('/_next/static/')) {
        event.respondWith(cacheFirst(request, CACHE_STATIC));
        return;
    }

    // 4. HTML pages — Stale While Revalidate
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(staleWhileRevalidate(request, CACHE_PAGES));
        return;
    }
});

// ── Strategies ────────────────────────────────────────────────────────
async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
}

async function networkFirst(request, cacheName, timeoutSec = 5) {
    const cache = await caches.open(cacheName);
    const fetchWithTimeout = new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('timeout')), timeoutSec * 1000);
        fetch(request).then(r => { clearTimeout(timer); resolve(r); }).catch(reject);
    });

    try {
        const response = await fetchWithTimeout;
        if (response.ok) cache.put(request, response.clone());
        return response;
    } catch {
        const cached = await cache.match(request);
        if (cached) return cached;
        // For HTML navigation, show offline page
        if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/offline');
        }
        return new Response('Network error', { status: 503 });
    }
}

async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    const fetchPromise = fetch(request)
        .then(response => {
            if (response.ok) cache.put(request, response.clone());
            return response;
        })
        .catch(() => null);

    if (cached) return cached;

    try {
        const fresh = await fetchPromise;
        if (fresh) return fresh;
    } catch { }

    // Offline fallback
    const offlinePage = await caches.match('/offline');
    return offlinePage ?? new Response('Offline', { status: 503 });
}
