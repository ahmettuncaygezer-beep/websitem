'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address, NotificationPreferences } from '@/types/account.types';
import { mockUser, mockAddresses, mockNotificationPrefs } from '@/data/mock-account';

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
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isAuthModalOpen: false,
            authModalView: 'login',
            addresses: [],
            notificationPrefs: mockNotificationPrefs,

            login: async (email: string, _password: string) => {
                // Simulate API delay
                await new Promise((r) => setTimeout(r, 800));
                // Mock: always succeed
                set({
                    user: { ...mockUser, email },
                    isAuthenticated: true,
                    isAuthModalOpen: false,
                    addresses: mockAddresses,
                });
                return true;
            },

            register: async (data) => {
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

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    addresses: [],
                });
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
        }),
        {
            name: 'maison_auth_v1',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                addresses: state.addresses,
                notificationPrefs: state.notificationPrefs,
            }),
        }
    )
);
