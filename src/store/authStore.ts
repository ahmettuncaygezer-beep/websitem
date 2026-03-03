'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address, NotificationPreferences } from '@/types/account.types';
import { mockUser, mockAddresses, mockNotificationPrefs } from '@/data/mock-account';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

// ── Helpers ──────────────────────────────────────────────────────────
const isSupabaseConfigured = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    return url.startsWith('http') && !url.includes('your-project');
};

// ── Types ────────────────────────────────────────────────────────────
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isAuthModalOpen: boolean;
    authModalView: 'login' | 'register' | 'forgot';
    addresses: Address[];
    notificationPrefs: NotificationPreferences;

    // Auth actions
    login: (email: string, password: string) => Promise<boolean>;
    register: (data: { firstName: string; lastName: string; email: string; phone: string; password: string }) => Promise<boolean>;
    logout: () => void;
    openAuthModal: (view?: 'login' | 'register' | 'forgot') => void;
    closeAuthModal: () => void;
    resetPassword: (email: string) => Promise<boolean>;

    // Profile actions
    updateProfile: (data: Partial<User>) => void;
    updateAvatar: (avatar: string) => void;

    // Address actions
    addAddress: (address: Omit<Address, 'id'>) => void;
    updateAddress: (id: string, data: Partial<Address>) => void;
    deleteAddress: (id: string) => void;
    setDefaultAddress: (id: string) => void;

    // Notification preferences
    updateNotificationPrefs: (prefs: Partial<NotificationPreferences>) => void;

    // Points
    deductPoints: (amount: number) => void;

    // Hydrate from Supabase session on mount
    hydrate: () => Promise<void>;
}

// ── Store ────────────────────────────────────────────────────────────
export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isAuthModalOpen: false,
            authModalView: 'login',
            addresses: [],
            notificationPrefs: mockNotificationPrefs,

            // ── Login ────────────────────────────────────────────
            login: async (email: string, password: string) => {
                if (isSupabaseConfigured()) {
                    try {
                        const supabase = createSupabaseBrowserClient();
                        const { data, error } = await supabase.auth.signInWithPassword({
                            email,
                            password,
                        });

                        if (error || !data.user) {
                            console.error('[Auth] Login failed:', error?.message);
                            return false;
                        }

                        // Fetch profile from profiles table
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('id', data.user.id)
                            .single();

                        set({
                            user: {
                                ...mockUser, // defaults
                                id: data.user.id,
                                email: data.user.email ?? email,
                                firstName: profile?.first_name || data.user.user_metadata?.first_name || '',
                                lastName: profile?.last_name || data.user.user_metadata?.last_name || '',
                                phone: profile?.phone || '',
                                avatar: profile?.avatar_url || '',
                                emailVerified: !!data.user.email_confirmed_at,
                                createdAt: data.user.created_at,
                            },
                            isAuthenticated: true,
                            isAuthModalOpen: false,
                        });
                        return true;
                    } catch (err) {
                        console.error('[Auth] Login error:', err);
                        return false;
                    }
                }

                // ── Mock fallback (no Supabase) ──────────────────
                await new Promise((r) => setTimeout(r, 800));
                set({
                    user: { ...mockUser, email },
                    isAuthenticated: true,
                    isAuthModalOpen: false,
                    addresses: mockAddresses,
                });
                return true;
            },

            // ── Register ─────────────────────────────────────────
            register: async (data) => {
                if (isSupabaseConfigured()) {
                    try {
                        const supabase = createSupabaseBrowserClient();
                        const { data: authData, error } = await supabase.auth.signUp({
                            email: data.email,
                            password: data.password,
                            options: {
                                data: {
                                    first_name: data.firstName,
                                    last_name: data.lastName,
                                    phone: data.phone,
                                },
                            },
                        });

                        if (error || !authData.user) {
                            console.error('[Auth] Register failed:', error?.message);
                            return false;
                        }

                        set({
                            user: {
                                ...mockUser,
                                id: authData.user.id,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                email: data.email,
                                phone: data.phone,
                                points: 0,
                                totalSpent: 0,
                                tier: 'bronze',
                                createdAt: new Date().toISOString(),
                                emailVerified: false,
                            },
                            isAuthenticated: true,
                            isAuthModalOpen: false,
                            addresses: [],
                        });
                        return true;
                    } catch (err) {
                        console.error('[Auth] Register error:', err);
                        return false;
                    }
                }

                // ── Mock fallback ────────────────────────────────
                await new Promise((r) => setTimeout(r, 1000));
                set({
                    user: {
                        ...mockUser,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                        points: 0,
                        totalSpent: 0,
                        tier: 'bronze',
                        createdAt: new Date().toISOString(),
                        emailVerified: false,
                    },
                    isAuthenticated: true,
                    isAuthModalOpen: false,
                    addresses: [],
                });
                return true;
            },

            // ── Logout ───────────────────────────────────────────
            logout: () => {
                if (isSupabaseConfigured()) {
                    const supabase = createSupabaseBrowserClient();
                    supabase.auth.signOut().catch(console.error);
                }
                set({
                    user: null,
                    isAuthenticated: false,
                    addresses: [],
                });
            },

            // ── Reset Password ───────────────────────────────────
            resetPassword: async (email: string) => {
                if (isSupabaseConfigured()) {
                    try {
                        const supabase = createSupabaseBrowserClient();
                        const { error } = await supabase.auth.resetPasswordForEmail(email, {
                            redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
                        });
                        return !error;
                    } catch {
                        return false;
                    }
                }
                // Mock: always succeed
                await new Promise((r) => setTimeout(r, 800));
                return true;
            },

            openAuthModal: (view = 'login') => {
                set({ isAuthModalOpen: true, authModalView: view });
            },

            closeAuthModal: () => {
                set({ isAuthModalOpen: false });
            },

            updateProfile: (data) => {
                const { user } = get();
                if (!user) return;
                set({ user: { ...user, ...data } });

                // Sync to Supabase profile if configured
                if (isSupabaseConfigured()) {
                    const supabase = createSupabaseBrowserClient();
                    supabase
                        .from('profiles')
                        .update({
                            first_name: data.firstName ?? user.firstName,
                            last_name: data.lastName ?? user.lastName,
                            phone: data.phone ?? user.phone,
                            updated_at: new Date().toISOString(),
                        })
                        .eq('id', user.id)
                        .then(({ error }) => {
                            if (error) console.error('[Auth] Profile update error:', error);
                        });
                }
            },

            updateAvatar: (avatar) => {
                const { user } = get();
                if (!user) return;
                set({ user: { ...user, avatar } });
            },

            addAddress: (address) => {
                const id = `addr_${Date.now()}`;
                const newAddr: Address = { ...address, id };
                set((state) => ({
                    addresses: newAddr.isDefault
                        ? [...state.addresses.map((a) => ({ ...a, isDefault: false })), newAddr]
                        : [...state.addresses, newAddr],
                }));
            },

            updateAddress: (id, data) => {
                set((state) => ({
                    addresses: state.addresses.map((a) =>
                        a.id === id ? { ...a, ...data } : data.isDefault ? { ...a, isDefault: false } : a
                    ),
                }));
            },

            deleteAddress: (id) => {
                set((state) => ({
                    addresses: state.addresses.filter((a) => a.id !== id),
                }));
            },

            setDefaultAddress: (id) => {
                set((state) => ({
                    addresses: state.addresses.map((a) => ({
                        ...a,
                        isDefault: a.id === id,
                    })),
                }));
            },

            updateNotificationPrefs: (prefs) => {
                set((state) => ({
                    notificationPrefs: { ...state.notificationPrefs, ...prefs },
                }));
            },

            deductPoints: (amount) => {
                const { user } = get();
                if (!user) return;
                set({ user: { ...user, points: Math.max(0, user.points - amount) } });
            },

            // ── Hydrate from Supabase session ────────────────────
            hydrate: async () => {
                if (!isSupabaseConfigured()) return;

                try {
                    const supabase = createSupabaseBrowserClient();
                    const { data: { session } } = await supabase.auth.getSession();

                    if (session?.user) {
                        const { data: profile } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('id', session.user.id)
                            .single();

                        set({
                            user: {
                                ...mockUser,
                                id: session.user.id,
                                email: session.user.email ?? '',
                                firstName: profile?.first_name || session.user.user_metadata?.first_name || '',
                                lastName: profile?.last_name || session.user.user_metadata?.last_name || '',
                                phone: profile?.phone || '',
                                avatar: profile?.avatar_url || '',
                                emailVerified: !!session.user.email_confirmed_at,
                                createdAt: session.user.created_at,
                            },
                            isAuthenticated: true,
                        });
                    }
                } catch (err) {
                    console.error('[Auth] Hydrate error:', err);
                }
            },
        }),
        {
            name: 'selis_auth_v2',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                addresses: state.addresses,
                notificationPrefs: state.notificationPrefs,
            }),
        }
    )
);
