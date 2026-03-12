module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://hvqsjhnlpaksnejlkcpl.supabase.co") || '';
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXNqaG5scGFrc25lamxrY3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjc0NjEsImV4cCI6MjA4NzkwMzQ2MX0.cbI47gDi4YcukleRdsulBcm7U-8ADBmrnHVbIja_Q8c") || '';
const isUrlValid = (url)=>{
    try {
        return url.startsWith('http');
    } catch  {
        return false;
    }
};
const mockHandler = {
    get: (target, prop)=>{
        if (prop === 'then') {
            return (resolve)=>resolve({
                    data: null,
                    error: {
                        message: 'Supabase URL eksik.'
                    }
                });
        }
        if (prop === 'catch') {
            return (reject)=>reject({
                    message: 'Supabase URL eksik.'
                });
        }
        const noop = ()=>{};
        return new Proxy(noop, mockHandler);
    },
    apply: (target, thisArg, args)=>{
        const noop = ()=>{};
        return new Proxy(noop, mockHandler);
    }
};
const supabase = isUrlValid(supabaseUrl) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey) : new Proxy({}, mockHandler);
}),
"[project]/src/lib/admin-auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAdminServerSession",
    ()=>getAdminServerSession,
    "requireAdminAuth",
    ()=>requireAdminAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
// ─── Mock session helper ───────────────────────────────────────────────────────
function validateMockSession(cookieStore) {
    const raw = cookieStore.get('admin_mock_session')?.value;
    if (!raw) return {
        valid: false,
        role: ''
    };
    try {
        const data = JSON.parse(atob(raw));
        if (data.expiresAt > Date.now()) {
            return {
                valid: true,
                role: data.role || 'super_admin'
            };
        }
    } catch  {
    // invalid cookie
    }
    return {
        valid: false,
        role: ''
    };
}
async function requireAdminAuth(_req) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    // ── 1. Check mock session first (fast path for local dev) ────────────────
    const { valid: mockValid, role: mockRole } = validateMockSession(cookieStore);
    if (mockValid) {
        // Build a regular supabase client (service-level access)
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://hvqsjhnlpaksnejlkcpl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXNqaG5scGFrc25lamxrY3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjc0NjEsImV4cCI6MjA4NzkwMzQ2MX0.cbI47gDi4YcukleRdsulBcm7U-8ADBmrnHVbIja_Q8c"), {
            cookies: {
                getAll () {
                    return cookieStore.getAll();
                },
                setAll (cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                    } catch  {}
                }
            }
        });
        return {
            session: null,
            supabase,
            role: mockRole,
            isMock: true
        };
    }
    // ── 2. Fall back to Supabase auth ────────────────────────────────────────
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://hvqsjhnlpaksnejlkcpl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXNqaG5scGFrc25lamxrY3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjc0NjEsImV4cCI6MjA4NzkwMzQ2MX0.cbI47gDi4YcukleRdsulBcm7U-8ADBmrnHVbIja_Q8c"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {}
            }
        }
    });
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Unauthorized'
        }, {
            status: 401
        });
    }
    // Verify the user is an active admin
    const { data: adminUser } = await supabase.from('admin_users').select('role, is_active').eq('id', session.user.id).single();
    if (!adminUser || !adminUser.is_active) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Forbidden'
        }, {
            status: 403
        });
    }
    return {
        session,
        supabase,
        role: adminUser.role
    };
}
async function getAdminServerSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    // 1. Check Mock Session
    const mockCookie = cookieStore.get('admin_mock_session')?.value;
    if (mockCookie) {
        try {
            const data = JSON.parse(atob(mockCookie));
            if (data.expiresAt > Date.now()) {
                return {
                    id: null,
                    role: data.role || 'super_admin',
                    email: data.email || 'admin@mock.test'
                };
            }
        } catch  {}
    }
    // 2. Check Supabase
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://hvqsjhnlpaksnejlkcpl.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cXNqaG5scGFrc25lamxrY3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjc0NjEsImV4cCI6MjA4NzkwMzQ2MX0.cbI47gDi4YcukleRdsulBcm7U-8ADBmrnHVbIja_Q8c"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {}
            }
        }
    });
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    const { data: adminUser } = await supabase.from('admin_users').select('role').eq('id', session.user.id).single();
    return {
        id: session.user.id,
        role: adminUser?.role || 'editor',
        email: session.user.email || ''
    };
}
}),
"[project]/src/app/api/admin/settings/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/admin-auth.ts [app-route] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
const revalidate = 0;
// Default settings when no data exists in Supabase
const DEFAULT_SETTINGS = {
    cms_colors: {
        primary: '#C9A96E',
        primaryDark: '#B8954F',
        background: '#FFFFFF',
        text: '#1C1C1E'
    },
    cms_hero: {
        title: 'SELIS HOME CONCEPT',
        subtitle: 'Premium Mobilya & Ev Dekorasyonu',
        image: ''
    },
    cms_footer: {
        description: 'Evinizin yeni hikayesi.',
        showNewsletter: true
    },
    cms_announcement: {
        enabled: false,
        text: '',
        bg: '#C9A96E',
        color: '#FFFFFF'
    },
    site_info: {
        siteName: 'SELIS HOME CONCEPT',
        siteSlogan: 'Premium Mobilya & Ev Dekorasyonu',
        siteDescription: 'Evinizin yeni hikayesi.',
        contactEmail: '',
        contactPhone: '',
        supportEmail: '',
        logo: '',
        favicon: '',
        address: {
            full: '',
            city: '',
            district: ''
        }
    },
    site_social: {
        instagram: '',
        facebook: '',
        whatsapp: '',
        youtube: '',
        twitter: ''
    },
    site_seo: {
        metaTitle: 'SELIS HOME CONCEPT',
        metaDescription: '',
        ogImage: ''
    }
};
async function GET() {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('site_settings').select('key, value').order('key');
        if (error) {
            // Table may not exist — return defaults gracefully
            console.warn('site_settings fetch error:', error.message);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(DEFAULT_SETTINGS);
        }
        if (!data || data.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(DEFAULT_SETTINGS);
        }
        // Build settings object from key-value rows
        const settings = {
            ...DEFAULT_SETTINGS
        };
        for (const row of data){
            try {
                settings[row.key] = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
            } catch  {
                settings[row.key] = row.value;
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(settings);
    } catch (err) {
        console.error('Settings GET error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(DEFAULT_SETTINGS);
    }
}
async function POST(req) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$admin$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAdminServerSession"])();
        if (!session) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const body = await req.json();
        // Validate: body must be a non-null object with allowed keys
        const ALLOWED_KEYS = [
            'cms_colors',
            'cms_hero',
            'cms_footer',
            'cms_announcement',
            'site_info',
            'site_social',
            'site_seo'
        ];
        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid request body'
            }, {
                status: 400
            });
        }
        const invalidKeys = Object.keys(body).filter((k)=>!ALLOWED_KEYS.includes(k));
        if (invalidKeys.length > 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Invalid settings keys: ${invalidKeys.join(', ')}`
            }, {
                status: 400
            });
        }
        if (Object.keys(body).length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No settings provided'
            }, {
                status: 400
            });
        }
        // Upsert each top-level key as a separate row
        const upserts = Object.entries(body).map(([key, value])=>({
                key,
                value: typeof value === 'object' ? JSON.stringify(value) : value,
                updated_at: new Date().toISOString()
            }));
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('site_settings').upsert(upserts, {
            onConflict: 'key'
        });
        if (error) {
            console.warn('site_settings upsert error:', error.message);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: error.message
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (err) {
        console.error('Settings POST error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3e036078._.js.map