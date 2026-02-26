import { AdminRole } from './users';

export interface AdminSession {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: AdminRole;
    avatar?: string;
    expiresAt: number;
    createdAt: number;
}

export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    success: boolean;
    requiresTwoFactor?: boolean;
    sessionToken?: string;
    user?: Omit<AdminSession, 'expiresAt' | 'createdAt'>;
    error?: string;
    lockoutMinutes?: number;
}
