import { PageForm } from '@/components/Admin/Pages/PageForm';

export const metadata = {
    title: 'Yeni Sayfa | Admin',
};

export default function YeniSayfaPage() {
    return <PageForm isEdit={false} />;
}
