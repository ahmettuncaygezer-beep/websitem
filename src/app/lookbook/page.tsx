import type { Metadata } from 'next';
import LookbookPageClient from './LookbookPageClient';
import type { LookbookCardData } from '@/components/Marketing/LookbookCard';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { mockLookbooks } from '@/lib/default-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Lookbook 2026 | SELIS Premium Mobilya',
    description: 'SELIS 2026 Koleksiyon Lookbook\'u — Hayalinizdeki evin ilhamı burada.',
    openGraph: {
        title: 'SELIS Lookbook 2026',
        description: 'Editorial fotoğraflar ve hotspot ürün keşfi.',
        type: 'website',
    },
};

async function getLookbookData(): Promise<{ lookbooks: LookbookCardData[], filters: string[] }> {
    try {
        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase
            .from('lookbook_items')
            .select('*')
            .order('sort_order', { ascending: true });

        if (!error && data && data.length > 0) {
            // Map lookbook_items from DB to LookbookCardData format
            const lookbooks: LookbookCardData[] = data.map((item: any) => ({
                id: item.id,
                title: item.title || '',
                titleKey: item.title_key || '',
                description: item.description || '',
                descriptionKey: item.description_key || '',
                imageUrl: item.cover_image || item.image_url || '',
                category: item.category || 'Koleksiyon',
                hotspots: (item.hotspots || item.product_tags || []).map((tag: any) => ({
                    id: tag.id || Math.random().toString(36).slice(2),
                    x: tag.x || 0,
                    y: tag.y || 0,
                    productName: tag.productName || tag.product_name || '',
                    productPrice: tag.productPrice || tag.product_price || '',
                    productImage: tag.productImage || tag.product_image || '',
                    productHref: tag.productHref || tag.product_href || '',
                })),
            }));

            const categories = ['Tümü', ...new Set(lookbooks.map(item => item.category))];
            return { lookbooks, filters: categories };
        }
    } catch (err) {
        console.error('Lookbook verisi alınamadı:', err);
    }

    // Fallback to default-content data
    if (mockLookbooks.length > 0 && mockLookbooks[0].photos?.length > 0) {
        const lookbooks: LookbookCardData[] = mockLookbooks[0].photos.map(photo => ({
            id: photo.id,
            title: photo.title,
            titleKey: photo.titleKey,
            description: photo.description,
            descriptionKey: photo.descriptionKey,
            imageUrl: photo.url,
            category: photo.category,
            hotspots: photo.productTags.map(tag => ({
                id: tag.id,
                x: tag.x,
                y: tag.y,
                productName: tag.productName,
                productPrice: tag.productPrice,
                productImage: tag.productImage,
                productHref: tag.productHref,
            })),
        }));

        const categories = ['Tümü', ...new Set(lookbooks.map(item => item.category))];
        return { lookbooks, filters: categories };
    }

    return { lookbooks: [], filters: ['Tümü'] };
}

export default async function LookbookPage() {
    const { lookbooks, filters } = await getLookbookData();

    return (
        <main className="min-h-screen bg-white">
            <LookbookPageClient lookbooks={lookbooks} filterTabs={filters} />
        </main>
    );
}
