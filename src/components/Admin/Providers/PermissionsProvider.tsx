'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { AdminRole, hasPermission, canAccess, PERMISSIONS } from '@/lib/permissions';

interface PermissionsContextValue {
    role: AdminRole;
    email: string;
    can: (action: keyof typeof PERMISSIONS) => boolean;
    canAccessPath: (path: string) => boolean;
}

const PermissionsContext = createContext<PermissionsContextValue | null>(null);

interface PermissionsProviderProps {
    role: AdminRole;
    email: string;
    children: ReactNode;
}

export function PermissionsProvider({ role, email, children }: PermissionsProviderProps) {
    const can = (action: keyof typeof PERMISSIONS) => hasPermission(role, action);
    const canAccessPath = (path: string) => canAccess(role, path);

    return (
        <PermissionsContext.Provider value={{ role, email, can, canAccessPath }}>
            {children}
        </PermissionsContext.Provider>
    );
}

export function useAdminPermissions() {
    const context = useContext(PermissionsContext);
    if (!context) {
        throw new Error('useAdminPermissions must be used within a PermissionsProvider');
    }
    return context;
}
