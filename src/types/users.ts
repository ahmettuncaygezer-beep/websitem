import type { AdminRole } from '@/lib/permissions';

export type { AdminRole };

export type AdminStatus = 'active' | 'inactive' | 'invited';

export interface AdminPermission {
    module: string;
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
}

export interface AdminUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: AdminRole;
    status: AdminStatus;
    customPermissions?: AdminPermission[];
    hasCustomPermissions: boolean;
    lastLogin?: string;
    lastLoginIp?: string;
    lastLoginBrowser?: string;
    lastLoginLocation?: string;
    totalLogins: number;
    monthlyLogins: number;
    totalActions: number;
    errorCount: number;
    invitedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ActivityLog {
    id: string;
    userId: string;
    action: 'create' | 'update' | 'delete' | 'login' | 'settings' | 'order';
    entity: string;
    entityId?: string;
    description: string;
    detail?: string;
    ip: string;
    timestamp: string;
}
