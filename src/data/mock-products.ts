import { Product } from '@/types';
import productsData from './products.json';

export const mockProducts: Product[] = productsData as Product[];

export const getProductBySlug = (slug: string): Product | undefined => {
    return mockProducts.find(p => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
    return mockProducts.filter(p => p.categorySlug === categorySlug);
};

export const getFeaturedProducts = (): Product[] => {
    return mockProducts.filter(p => p.featured);
};

export const getNewProducts = (): Product[] => {
    return mockProducts.filter(p => p.isNew);
};