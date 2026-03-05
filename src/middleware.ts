import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { canAccess } from '@/lib/permissions';

const PUBLIC_PATHS = ['/admin/login'];

// ── Session token signing (HMAC-SHA256) ─────────────────────────────
const SECRET = process.env.ADMIN_SESSION_SECRET || 'selis-admin-default-secret-change-me';

async function signPayload(payload: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw', enc.encode(SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
    const sigStr = btoa(String.fromCharCode(...new Uint8Array(sig)));
    return `${btoa(payload)}.${sigStr}`;
}

async function verifyAndParse<T>(token: string): Promise<T | null> {
    try {
        const [payloadB64, sigB64] = token.split('.');
        if (!payloadB64 || !sigB64) return null;

        const payload = atob(payloadB64);
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw', enc.encode(SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
        );
        const sig = Uint8Array.from(atob(sigB64), (c) => c.charCodeAt(0));
        const valid = await crypto.subtle.verify('HMAC', key, sig, enc.encode(payload));
        if (!valid) return null;

        return JSON.parse(payload) as T;
    } catch {
        return null;
    }
}

// ── Exported helper for login page to create session ─────────────────
export { signPayload };

// ── Middleware ────────────────────────────────────────────────────────
interface SessionData {
    userId: string;
    email: string;
    role: string;
    expiresAt: number;
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow public paths
    if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // Protection for /admin paths
    if (pathname.startsWith('/admin')) {
        const sessionCookie = request.cookies.get('admin-session');

        if (!sessionCookie) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Try new HMAC-signed format first, fall back to legacy base64
        let sessionData: SessionData | null = null;

        sessionData = await verifyAndParse<SessionData>(sessionCookie.value);

        // Legacy fallback: base64 encoded (from old sessions)
        if (!sessionData) {
            try {
                sessionData = JSON.parse(decodeURIComponent(atob(sessionCookie.value)));
            } catch {
                const response = NextResponse.redirect(new URL('/admin/login', request.url));
                response.cookies.delete('admin-session');
                return response;
            }
        }

        if (!sessionData) {
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin-session');
            return response;
        }

        // Check expiration
        if (Date.now() > sessionData.expiresAt) {
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('admin-session');
            return response;
        }

        // Role-based access control
        const role = sessionData.role || 'editor'; // fallback

        // Exception for yetkisiz page
        if (pathname === '/admin/yetkisiz') {
            // allow
        } else if (!canAccess(role, pathname)) {
            return NextResponse.redirect(new URL('/admin/yetkisiz', request.url));
        }

        // Add user info to headers for downstream use
        const response = NextResponse.next();
        response.headers.set('x-admin-user', sessionData.email);
        response.headers.set('x-admin-role', sessionData.role);
        return response;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*']
};
