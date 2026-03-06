import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { SupabaseClient, Session } from '@supabase/supabase-js';

export interface AdminAuthSuccess {
    session: Session | null;
    supabase: SupabaseClient;
    role: string;
    isMock?: boolean;
}

// ─── Mock session helper ───────────────────────────────────────────────────────
function validateMockSession(cookieStore: Awaited<ReturnType<typeof cookies>>): { valid: boolean; role: string } {
    const raw = cookieStore.get('admin_mock_session')?.value;
    if (!raw) return { valid: false, role: '' };
    try {
        const data = JSON.parse(atob(raw));
        if (data.expiresAt > Date.now()) {
            return { valid: true, role: data.role || 'super_admin' };
        }
    } catch {
        // invalid cookie
    }
    return { valid: false, role: '' };
}

/**
 * Verifies that the incoming API request is authenticated.
 * Accepts BOTH:
 *   1. A valid Supabase session (production) AND admin_users membership
 *   2. A valid admin_mock_session cookie (local dev)
 */
export async function requireAdminAuth(
    _req: Request
): Promise<AdminAuthSuccess | NextResponse> {
    const cookieStore = await cookies();

    // ── 1. Check mock session first (fast path for local dev) ────────────────
    const { valid: mockValid, role: mockRole } = validateMockSession(cookieStore);
    if (mockValid) {
        // Build a regular supabase client (service-level access)
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return cookieStore.getAll(); },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            );
                        } catch { /* server component */ }
                    },
                },
            }
        );
        return { session: null, supabase, role: mockRole, isMock: true };
    }

    // ── 2. Fall back to Supabase auth ────────────────────────────────────────
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll(); },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch { /* server component */ }
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        );
    }

    // Verify the user is an active admin
    const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role, is_active')
        .eq('id', session.user.id)
        .single();

    if (!adminUser || !adminUser.is_active) {
        return NextResponse.json(
            { error: 'Forbidden' },
            { status: 403 }
        );
    }

    return {
        session,
        supabase,
        role: adminUser.role as string,
    };
}

/**
 * Validates admin auth from a Server Component and returns minimal session data.
 */
export async function getAdminServerSession() {
    const cookieStore = await cookies();

    // 1. Check Mock Session
    const mockCookie = cookieStore.get('admin_mock_session')?.value;
    if (mockCookie) {
        try {
            const data = JSON.parse(atob(mockCookie));
            if (data.expiresAt > Date.now()) {
                return { role: data.role || 'super_admin', email: data.email || 'admin@mock.test' };
            }
        } catch { /* skip */ }
    }

    // 2. Check Supabase
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return cookieStore.getAll(); },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch { /* server component */ }
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    const { data: adminUser } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', session.user.id)
        .single();

    return {
        role: (adminUser?.role || 'editor') as string,
        email: session.user.email || '',
    };
}

