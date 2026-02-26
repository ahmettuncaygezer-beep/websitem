import { supabase } from './supabase';
import { Product } from '@/types';
import { mockProducts } from '@/data/mock-products';

// Helper to map snake_case from DB to camelCase for Frontend
const mapProduct = (p: any): Product => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description || '',
    price: Number(p.price),
    salePrice: p.sale_price ? Number(p.sale_price) : undefined,
    originalPrice: p.original_price ? Number(p.original_price) : (p.price * 1.2), // Default original price if missing
    currency: p.currency || 'TRY',
    categoryId: p.category_id,
    categorySlug: p.category_slug,
    category: p.category_name || 'Mobilya',
    images: p.images || [],
    lifestyleImage: p.lifestyle_image,
    colors: (p.colors || []).map((c: any, i: number) => ({
        id: c.id || `color-${i}`,
        name: c.name || 'Standart',
        hex: c.hex || '#D4C5B2',
        image: c.image || (p.images ? p.images[0] : ''),
        lifestyleImage: c.lifestyle_image || p.lifestyle_image || '',
        inStock: c.in_stock !== false
    })),
    materials: p.materials || [],
    dimensions: p.dimensions || { width: 0, height: 0, depth: 0, unit: 'cm' },
    rating: {
        average: p.rating_average || 4.8,
        count: p.rating_count || 12
    },
    badges: p.badges || (p.is_new ? [{ type: 'new', label: 'Yeni' }] : []),
    stock: p.stock || 0,
    featured: p.featured || false,
    isFeatured: p.featured || false,
    isNew: !!p.is_new,
    brand: p.brand || 'MAISON',
    deliveryDays: p.delivery_days || 14,
    hasQuickShip: !!p.has_quick_ship
});

export const getProducts = async (filters?: { categorySlug?: string; featured?: boolean; isNew?: boolean }): Promise<Product[]> => {
    try {
        let query = supabase.from('products').select('*');

        if (filters?.categorySlug) query = query.eq('category_slug', filters.categorySlug);
        if (filters?.featured) query = query.eq('featured', true);
        if (filters?.isNew) query = query.eq('is_new', true);

        const { data, error } = await query;

        if (error || !data || data.length === 0) {
            console.warn(`[API] Fallback for slug: ${filters?.categorySlug}`);
            let products = mockProducts;

            if (filters?.categorySlug) {
                const exactMatch = products.filter(p => p.categorySlug === filters.categorySlug);
                console.log(`[API] Exact matches found: ${exactMatch.length}`);
                if (exactMatch.length === 0) {
                    // Try to find products that are "similar" to the slug (e.g. 'oturma-odasi' matches 'kose-koltuklar' if tags were present)
                    // For now, let's just return Oturma Odası products if a sub-category of it is requested
                    const parents: Record<string, string> = {
                        'kose-koltuklar': 'oturma-odasi',
                        'ikili-koltuklar': 'oturma-odasi',
                        'tekli-koltuklar': 'oturma-odasi',
                        'berjerler': 'oturma-odasi'
                    };
                    const parentSlug = parents[filters.categorySlug];
                    if (parentSlug) {
                        products = products.filter(p => p.categorySlug === parentSlug);
                    } else {
                        // General fallback to all products if slug doesn't match anything specific
                        products = products.filter(p => p.categorySlug.includes('odasi') || p.categorySlug === 'oturma-odasi');
                    }
                } else {
                    products = exactMatch;
                }
            }

            if (filters?.featured) products = products.filter(p => p.featured);
            if (filters?.isNew) products = products.filter(p => p.isNew);

            return products;
        }

        return data.map(mapProduct);
    } catch (err) {
        console.error('API Error:', err);
        return mockProducts;
    }
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) {
            return mockProducts.find(p => p.slug === slug) || null;
        }

        return mapProduct(data);
    } catch (err) {
        return mockProducts.find(p => p.slug === slug) || null;
    }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
    if (!query || query.length < 2) return [];

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`)
            .limit(6);

        if (error || !data || data.length === 0) {
            // Fallback search in mock
            const q = query.toLowerCase();
            return mockProducts.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                (p.brand && p.brand.toLowerCase().includes(q))
            ).slice(0, 6);
        }

        return data.map(mapProduct);
    } catch (err) {
        return [];
    }
};

export const getProductsByIds = async (ids: string[]): Promise<Product[]> => {
    if (!ids || ids.length === 0) return [];

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .in('id', ids);

        if (error || !data || data.length === 0) {
            return mockProducts.filter(p => ids.includes(p.id));
        }

        return data.map(mapProduct);
    } catch (err) {
        return mockProducts.filter(p => ids.includes(p.id));
    }
};
