import { AdminLayout } from '@/components/Admin/Layout/AdminLayout';
import { Toaster } from 'react-hot-toast';
import { getAdminServerSession } from '@/lib/admin-auth';
import { PermissionsProvider } from '@/components/Admin/Providers/PermissionsProvider';
import { AdminRole } from '@/lib/permissions';

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
    const session = await getAdminServerSession();
    // Fallback if session is somehow null at this point context
    const role = (session?.role || 'editor') as AdminRole;
    const email = session?.email || '';
    return (
        <PermissionsProvider role={role} email={email}>
            <AdminLayout>
                <Toaster position="top-right" />
                {children}
            </AdminLayout>
        </PermissionsProvider>
    );
}
