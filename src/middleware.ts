import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/admin/login'];

const ROLE_PERMISSIONS: Record<string, string[]> = {
    'super-admin': ['*'],
    'editor': [
        'urunler', 'kategoriler', 'medya',
        'icerik', 'analytics', 'dashboard',
        'yorumlar'
    ],
    'order-manager': ['siparisler', 'musteriler', 'dashboard'],
    'analyst': ['analytics', 'dashboard']
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow public paths
    if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // Protection for /admin paths
    if (pathname.startsWith('/admin')) {
        const session = request.cookies.get('admin-session');

        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            const sessionData = JSON.parse(decodeURIComponent(atob(session.value)));

            // Check expiration
            if (Date.now() > sessionData.expiresAt) {
                const response = NextResponse.redirect(new URL('/admin/login', request.url));
                response.cookies.delete('admin-session');
                return response;
            }

            // Role-based access control
            const role = sessionData.role;
            const segments = pathname.split('/');
            const module = segments[2]; // /admin/[module]

            if (module && role !== 'super-admin') {
                const allowedModules = ROLE_PERMISSIONS[role] || [];
                if (!allowedModules.includes(module)) {
                    return NextResponse.redirect(new URL('/admin/403', request.url));
                }
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*']
};
