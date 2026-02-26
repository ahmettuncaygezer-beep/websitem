import { AdminLayout } from '@/components/Admin/Layout/AdminLayout';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return <AdminLayout>{children}</AdminLayout>;
}
