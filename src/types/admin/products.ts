// src/types/admin/products.ts

export type ProductStatus = 'Aktif' | 'Pasif' | 'Taslak';

export interface ProductImage {
    id: string;
    url: string;
    altText: string;
    isPrimary: boolean;
    order: number;
}

export interface VariantGroup {
    id: string;
    name: string; // e.g. 'Renk', 'Boyut', 'Malzeme'
    values: string[];
}

export interface Variant {
    id: string;
    combination: { key: string; value: string }[];
    priceModifier: number;
    stock: number;
    sku: string;
    active: boolean;
}

export interface ProductDimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    sku: string;
    barcode: string;
    category: string;
    subcategory: string;
    price: number;
    comparePrice: number;
    costPrice: number;
    stock: number;
    stockTracking: boolean;
    stockThreshold: number;
    status: ProductStatus;
    images: ProductImage[];
    variants: VariantGroup[];
    tags: string[];
    metaTitle: string;
    metaDescription: string;
    relatedProducts: string[];
    complementaryProducts: string[];
    createdAt: string;
    updatedAt: string;
    weight: number;
    dimensions: ProductDimensions;
}

export const CATEGORIES = ['Tümü', 'Koltuklar', 'Yatak Odası', 'Masalar', 'Dekorasyon', 'Depolama', 'Aydınlatma'] as const;
export const STATUSES = ['Tümü', 'Aktif', 'Pasif', 'Taslak'] as const;

export interface TopProduct {
    rank: number;
    name: string;
    category: string;
    sales: number;
    revenue: number;
    trend: boolean;
    image?: string;
}
