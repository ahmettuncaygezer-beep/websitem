'use client';

import React, { useEffect, useState, use } from 'react';
import { PageForm } from '@/components/Admin/Pages/PageForm';

export default function EditSayfaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const res = await fetch(`/api/admin/pages/${id}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || 'Sayfa bulunamadı');

                setInitialData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPage();
        }
    }, [id]);

    if (loading) {
        return <div className="p-8 text-[#AEAEB2] text-sm">Yükleniyor...</div>;
    }

    if (error) {
        return <div className="p-8 text-[#FF453A] text-sm">Hata: {error}</div>;
    }

    return <PageForm initialData={initialData} isEdit={true} />;
}
