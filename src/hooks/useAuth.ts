'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export function useAuth() {
    const router = useRouter();
    const {
        user,
        isAuthenticated,
        login: storeLogin,
        register: storeRegister,
        logout: storeLogout,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
        authModalView,
    } = useAuthStore();

    const login = useCallback(
        async (email: string, password: string) => {
            const success = await storeLogin(email, password);
            if (success) {
                closeAuthModal();
            }
            return success;
        },
        [storeLogin, closeAuthModal]
    );

    const register = useCallback(
        async (data: { firstName: string; lastName: string; email: string; phone: string; password: string }) => {
            const success = await storeRegister(data);
            return success;
        },
        [storeRegister]
    );

    const logout = useCallback(() => {
        storeLogout();
        router.push('/');
    }, [storeLogout, router]);

    const requireAuth = useCallback(
        (callback?: () => void) => {
            if (!isAuthenticated) {
                openAuthModal('login');
                return false;
            }
            callback?.();
            return true;
        },
        [isAuthenticated, openAuthModal]
    );

    return {
        user,
        isAuthenticated,
        login,
        register,
        logout,
        requireAuth,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
        authModalView,
    };
}
