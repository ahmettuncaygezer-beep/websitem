import { AdminRole } from '@/types/users';
import { LoginCredentials, LoginResponse } from '@/types/auth';

const MOCK_ADMIN_USERS = [
    {
        id: '1',
        email: 'admin',
        password: '123456',
        firstName: 'Ali',
        lastName: 'Yılmaz',
        role: 'super_admin' as AdminRole,
        hasTwoFactor: false,
    },
    {
        id: '2',
        email: 'editor@selis.com.tr',
        password: 'editor123',
        firstName: 'Zeynep',
        lastName: 'Kaya',
        role: 'editor' as AdminRole,
        hasTwoFactor: true,
        twoFactorCode: '123456',
    }
];

export function mockLogin(credentials: LoginCredentials): LoginResponse {
    const user = MOCK_ADMIN_USERS.find(
        u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
        return { success: false, error: 'E-posta veya şifre hatalı' };
    }

    if (user.hasTwoFactor && !credentials.rememberMe) {
        return { success: true, requiresTwoFactor: true };
    }

    // Generate a simple base64 mock token
    const sessionData = {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        expiresAt: Date.now() + 30 * 60 * 1000 // 30 minutes
    };

    return {
        success: true,
        sessionToken: btoa(encodeURIComponent(JSON.stringify(sessionData))),
        user: {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        }
    };
}

export function mockVerifyOtp(email: string, code: string): LoginResponse | null {
    const user = MOCK_ADMIN_USERS.find(u => u.email === email);
    if (!user || user.twoFactorCode !== code) return null;

    const sessionData = {
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        expiresAt: Date.now() + 30 * 60 * 1000
    };

    return {
        success: true,
        sessionToken: btoa(encodeURIComponent(JSON.stringify(sessionData))),
        user: {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        }
    };
}
