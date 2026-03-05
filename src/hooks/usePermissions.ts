import { useAdminPermissions } from '@/components/Admin/Providers/PermissionsProvider';

export function usePermissions() {
    return useAdminPermissions();
}
