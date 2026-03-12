module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/permissions.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PATH_PERMISSIONS",
    ()=>PATH_PERMISSIONS,
    "PERMISSIONS",
    ()=>PERMISSIONS,
    "canAccess",
    ()=>canAccess,
    "hasPermission",
    ()=>hasPermission
]);
const PERMISSIONS = {
    // --- Products ---
    'products.view': [
        'super_admin',
        'admin',
        'editor'
    ],
    'products.edit': [
        'super_admin',
        'admin',
        'editor'
    ],
    'products.create': [
        'super_admin',
        'admin',
        'editor'
    ],
    'products.delete': [
        'super_admin',
        'admin'
    ],
    // --- Categories ---
    'categories.view': [
        'super_admin',
        'admin',
        'editor'
    ],
    'categories.edit': [
        'super_admin',
        'admin',
        'editor'
    ],
    'categories.create': [
        'super_admin',
        'admin',
        'editor'
    ],
    'categories.delete': [
        'super_admin',
        'admin'
    ],
    // --- Orders ---
    'orders.view': [
        'super_admin',
        'admin',
        'support'
    ],
    'orders.update': [
        'super_admin',
        'admin',
        'support'
    ],
    'orders.delete': [
        'super_admin'
    ],
    // --- Customers ---
    'customers.view': [
        'super_admin',
        'admin',
        'support'
    ],
    'customers.edit': [
        'super_admin',
        'admin'
    ],
    'customers.delete': [
        'super_admin'
    ],
    // --- Content (Blog, Lookbook, Homepage) ---
    'content.view': [
        'super_admin',
        'admin',
        'editor'
    ],
    'content.edit': [
        'super_admin',
        'admin',
        'editor'
    ],
    'content.delete': [
        'super_admin',
        'admin',
        'editor'
    ],
    // --- Reviews ---
    'reviews.view': [
        'super_admin',
        'admin',
        'editor'
    ],
    'reviews.approve': [
        'super_admin',
        'admin',
        'editor'
    ],
    'reviews.delete': [
        'super_admin',
        'admin'
    ],
    // --- Campaigns ---
    'campaigns.view': [
        'super_admin',
        'admin'
    ],
    'campaigns.create': [
        'super_admin',
        'admin'
    ],
    'campaigns.edit': [
        'super_admin',
        'admin'
    ],
    'campaigns.delete': [
        'super_admin',
        'admin'
    ],
    // --- Settings / System ---
    'settings.view': [
        'super_admin',
        'admin'
    ],
    'settings.edit': [
        'super_admin'
    ],
    // --- Users (Admin Management) ---
    'users.view': [
        'super_admin'
    ],
    'users.manage': [
        'super_admin'
    ],
    'users.delete': [
        'super_admin'
    ],
    // --- Audit Logs ---
    'auditlogs.view': [
        'super_admin'
    ],
    'auditlogs.delete': [
        'super_admin'
    ],
    // --- Concierge & Notifications ---
    'concierge.view': [
        'super_admin',
        'admin',
        'support'
    ],
    'concierge.edit': [
        'super_admin',
        'admin',
        'support'
    ],
    'notifications.view': [
        'super_admin',
        'admin',
        'support'
    ],
    'notifications.send': [
        'super_admin',
        'admin',
        'support'
    ]
};
const PATH_PERMISSIONS = {
    // Exact paths or prefixes
    '/admin': [
        'super_admin',
        'admin',
        'editor',
        'support'
    ],
    '/admin/dashboard': [
        'super_admin',
        'admin',
        'editor',
        'support'
    ],
    // Products
    '/admin/urunler': [
        'super_admin',
        'admin',
        'editor'
    ],
    '/admin/kategoriler': [
        'super_admin',
        'admin',
        'editor'
    ],
    '/admin/medya': [
        'super_admin',
        'admin',
        'editor'
    ],
    // Order & CRM
    '/admin/siparisler': [
        'super_admin',
        'admin',
        'support'
    ],
    '/admin/musteriler': [
        'super_admin',
        'admin',
        'support'
    ],
    '/admin/yorumlar': [
        'super_admin',
        'admin',
        'editor'
    ],
    '/admin/concierge': [
        'super_admin',
        'admin',
        'support'
    ],
    '/admin/bildirimler': [
        'super_admin',
        'admin',
        'support'
    ],
    // Growth
    '/admin/analytics': [
        'super_admin',
        'admin'
    ],
    '/admin/kampanyalar': [
        'super_admin',
        'admin'
    ],
    '/admin/eposta': [
        'super_admin',
        'admin'
    ],
    // Content
    '/admin/icerik': [
        'super_admin',
        'admin',
        'editor'
    ],
    // System
    '/admin/ayarlar': [
        'super_admin',
        'admin'
    ],
    '/admin/ayarlar/guvenlik': [
        'super_admin'
    ],
    '/admin/ayarlar/entegrasyon': [
        'super_admin'
    ],
    '/admin/kullanicilar': [
        'super_admin'
    ]
};
function hasPermission(role, action) {
    if (role === 'super_admin') return true; // Super admin always has all permissions
    const allowedRoles = PERMISSIONS[action];
    if (!allowedRoles) return false;
    return allowedRoles.includes(role);
}
function canAccess(role, path) {
    if (role === 'super_admin') return true;
    // Ensure we are only checking paths starting with /admin
    if (!path.startsWith('/admin')) return true;
    // Exact Match First
    if (PATH_PERMISSIONS[path]) {
        return PATH_PERMISSIONS[path].includes(role);
    }
    // Prefix Match (e.g. /admin/urunler/yeni should match /admin/urunler)
    // Find the longest matching prefix
    let bestMatch = '';
    for (const key of Object.keys(PATH_PERMISSIONS)){
        if (path.startsWith(key) && key.length > bestMatch.length) {
            bestMatch = key;
        }
    }
    if (bestMatch && PATH_PERMISSIONS[bestMatch]) {
        // Special strict sub-path exclusions for 'admin'
        if (role === 'admin') {
            if (path.startsWith('/admin/ayarlar/guvenlik')) return false;
            if (path.startsWith('/admin/ayarlar/entegrasyon')) return false;
            if (path.startsWith('/admin/kullanicilar')) return false;
        }
        return PATH_PERMISSIONS[bestMatch].includes(role);
    }
    // Default deny if no path matching
    return false;
}
}),
"[project]/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy,
    "signPayload",
    ()=>signPayload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/permissions.ts [middleware] (ecmascript)");
;
;
const PUBLIC_PATHS = [
    '/admin/login'
];
// ── Session token signing (HMAC-SHA256) ─────────────────────────────
const SECRET = process.env.ADMIN_SESSION_SECRET;
if (!SECRET) {
    console.warn('[proxy] ADMIN_SESSION_SECRET env var is not set — admin session signing will fail.');
}
async function signPayload(payload) {
    if (!SECRET) throw new Error('ADMIN_SESSION_SECRET is not configured');
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', enc.encode(SECRET), {
        name: 'HMAC',
        hash: 'SHA-256'
    }, false, [
        'sign'
    ]);
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
    const sigStr = btoa(String.fromCharCode(...new Uint8Array(sig)));
    return `${btoa(payload)}.${sigStr}`;
}
async function verifyAndParse(token) {
    if (!SECRET) return null;
    try {
        const [payloadB64, sigB64] = token.split('.');
        if (!payloadB64 || !sigB64) return null;
        const payload = atob(payloadB64);
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey('raw', enc.encode(SECRET), {
            name: 'HMAC',
            hash: 'SHA-256'
        }, false, [
            'verify'
        ]);
        const sig = Uint8Array.from(atob(sigB64), (c)=>c.charCodeAt(0));
        const valid = await crypto.subtle.verify('HMAC', key, sig, enc.encode(payload));
        if (!valid) return null;
        return JSON.parse(payload);
    } catch  {
        return null;
    }
}
;
async function proxy(request) {
    const { pathname } = request.nextUrl;
    // Allow public paths
    if (PUBLIC_PATHS.some((p)=>pathname.startsWith(p))) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Protection for /admin paths
    if (pathname.startsWith('/admin')) {
        const sessionCookie = request.cookies.get('admin-session');
        if (!sessionCookie) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/admin/login', request.url));
        }
        let sessionData = null;
        sessionData = await verifyAndParse(sessionCookie.value);
        // Legacy fallback: base64 encoded (from old sessions)
        if (!sessionData) {
            try {
                sessionData = JSON.parse(decodeURIComponent(atob(sessionCookie.value)));
            } catch  {
                const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/admin/login', request.url));
                response.cookies.delete('admin-session');
                return response;
            }
        }
        if (!sessionData) {
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin-session');
            return response;
        }
        if (Date.now() > sessionData.expiresAt) {
            const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin-session');
            return response;
        }
        const role = sessionData.role || 'editor';
        if (pathname === '/admin/yetkisiz') {
        // allow
        } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$permissions$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["canAccess"])(role, pathname)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/admin/yetkisiz', request.url));
        }
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
        response.headers.set('x-admin-user', sessionData.email);
        response.headers.set('x-admin-role', sessionData.role);
        return response;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        '/admin/:path*'
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__df5e066e._.js.map