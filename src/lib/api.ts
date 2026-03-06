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
    originalPrice: p.original_price ? Number(p.original_price) : (p.price * 1.2),
    currency: p.currency || 'TRY',
    categoryId: p.category_id,
    categorySlug: p.category_slug,
    category: p.category_name || 'Mobilya',
    images: p.images || [],
    lifestyleImage: p.lifestyle_image,
    colors: (p.colors || []).map((c: any, i: number) => {
        const parsed = typeof c === 'string' ? (() => { try { return JSON.parse(c); } catch { return {}; } })() : c;
        return {
            id: parsed.id || `color-${i}`,
            name: parsed.name || 'Standart',
            hex: parsed.hex || '#D4C5B2',
            image: parsed.image || (p.images ? p.images[0] : ''),
            lifestyleImage: parsed.lifestyle_image || p.lifestyle_image || '',
            inStock: parsed.in_stock !== false
        };
    }),
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
    brand: p.brand || 'SELIS',
    deliveryDays: p.delivery_days || 14,
    hasQuickShip: !!p.has_quick_ship
});

export const getProducts = async (filters?: {
    categorySlug?: string;
    categories?: string[];
    brands?: string[];
    inStock?: boolean;
    featured?: boolean;
    isNew?: boolean;
    minPrice?: number;
    maxPrice?: number;
    colors?: string[];
    materials?: string[];
}): Promise<Product[]> => {
    try {
        let query = supabase.from('products').select('*');

        if (filters?.categories && filters.categories.length > 0) {
            query = query.in('category_slug', filters.categories);
        } else if (filters?.categorySlug) {
            query = query.eq('category_slug', filters.categorySlug);
        }

        if (filters?.brands && filters.brands.length > 0) {
            query = query.in('brand', filters.brands);
        }

        if (filters?.inStock) {
            query = query.gte('stock', 1);
        }

        if (filters?.featured) query = query.eq('featured', true);
        if (filters?.isNew) query = query.eq('is_new', true);
        if (filters?.minPrice !== undefined) query = query.gte('price', filters.minPrice);
        if (filters?.maxPrice !== undefined) query = query.lte('price', filters.maxPrice);

        // For materials (text array)
        if (filters?.materials && filters.materials.length > 0) {
            query = query.contains('materials', filters.materials);
        }

        const { data, error } = await query;

        if (error || !data || data.length === 0) {
            // DB fallback: use mock only if no DB results for this specific filter
            console.warn(`[API] DB returned no results for: ${JSON.stringify(filters)}, using mock fallback`);
            let products = mockProducts;
            if (filters?.categories && filters.categories.length > 0) {
                products = products.filter(p => filters.categories!.includes(p.categorySlug));
            } else if (filters?.categorySlug) {
                products = products.filter(p => p.categorySlug === filters.categorySlug);
            }
            if (filters?.brands && filters.brands.length > 0) {
                products = products.filter(p => p.brand && filters.brands!.includes(p.brand));
            }
            if (filters?.inStock) products = products.filter(p => p.stock > 0);
            if (filters?.featured) products = products.filter(p => p.featured);
            if (filters?.isNew) products = products.filter(p => p.isNew);
            if (filters?.minPrice !== undefined) products = products.filter(p => p.price >= filters.minPrice!);
            if (filters?.maxPrice !== undefined) products = products.filter(p => p.price <= filters.maxPrice!);
            if (filters?.materials && filters.materials.length > 0) {
                products = products.filter(p => p.materials?.some(m => filters.materials!.includes(m)));
            }
            if (filters?.colors && filters.colors.length > 0) {
                products = products.filter(p => p.colors?.some(c => filters.colors!.includes(c.name)));
            }
            return products;
        }

        let mapped = data.map(mapProduct);



        return mapped;
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
