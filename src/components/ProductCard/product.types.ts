export interface ProductColor {
    id: string;
    name: string;
    hex: string;
    image: string;
    lifestyleImage: string;
    inStock: boolean;
}

export interface ProductRating {
    average: number;
    count: number;
}

export interface ProductBadge {
    type: 'new' | 'sale' | 'low-stock' | 'bestseller' | 'exclusive';
    label: string;
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    slug: string;
    price: number;
    originalPrice?: number;
    currency: string;
    colors: ProductColor[];
    rating: ProductRating;
    badges: ProductBadge[];
    category: string;
    isNew: boolean;
    isFeatured: boolean;
    deliveryDays: number;
    hasQuickShip: boolean;
    description?: string;
}

export type ViewMode = 'grid' | 'list';

export type CartButtonState = 'idle' | 'loading' | 'success';
