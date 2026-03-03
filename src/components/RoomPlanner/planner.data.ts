import { PlannerProduct } from './planner.types';

export const plannerMockData: PlannerProduct[] = [
    // SOFAS
    {
        id: 'luna-kose-koltuk',
        name: 'Luna Köşe Koltuk',
        category: 'Sofa',
        dimensions: { width: 320, depth: 180 },
        price: 89990,
        image: '/images/products/luna-sofa.jpg',
        brand: 'SELIS Atelier',
        originalHref: '/urun/luna-kose-koltuk'
    },
    {
        id: 'serene-ikili-koltuk',
        name: 'Serene İkili Koltuk',
        category: 'Sofa',
        dimensions: { width: 195, depth: 95 },
        price: 52990,
        image: '/images/products/serene-sofa.jpg',
        brand: 'SELIS Atelier',
        originalHref: '/urun/serene-ikili-koltuk'
    },
    // CHAIRS
    {
        id: 'aria-berjer',
        name: 'Aria Berjer',
        category: 'Chair',
        dimensions: { width: 78, depth: 82 },
        price: 34990,
        image: '/images/products/aria-chair-1.jpg',
        brand: 'SELIS Atelier',
        originalHref: '/urun/aria-berjer'
    },
    {
        id: 'como-sandalye',
        name: 'Como Sandalye',
        category: 'Chair',
        dimensions: { width: 52, depth: 55 },
        price: 8990,
        image: '/images/products/como-chair-1.jpg',
        brand: 'SELIS',
        originalHref: '/urun/como-sandalye'
    },
    // TABLES
    {
        id: 'nova-yemek-masasi',
        name: 'Nova Yemek Masası',
        category: 'Table',
        dimensions: { width: 220, depth: 100 },
        price: 45990,
        image: '/images/products/nova-table-1.jpg',
        brand: 'SELIS',
        originalHref: '/urun/nova-yemek-masasi'
    },
    {
        id: 'orbit-sehpa',
        name: 'Orbit Sehpa',
        category: 'Table',
        dimensions: { width: 90, depth: 90 },
        price: 18990,
        image: '/images/products/orbit-table-1.jpg',
        brand: 'SELIS',
        originalHref: '/urun/orbit-sehpa'
    },
    {
        id: 'oslo-calisma-masasi',
        name: 'Oslo Çalışma Masası',
        category: 'Table',
        dimensions: { width: 140, depth: 65 },
        price: 24990,
        image: '/images/products/oslo-desk-1.jpg',
        brand: 'SELIS',
        originalHref: '/urun/oslo-calisma-masasi'
    },
    // BEDS
    {
        id: 'zen-yatak',
        name: 'Zen Yatak',
        category: 'Bed',
        dimensions: { width: 180, depth: 210 }, // standard king size approach
        price: 42990,
        image: '/images/products/zen-bed-1.jpg',
        brand: 'SELIS',
        originalHref: '/urun/zen-yatak-basligi'
    },
    // WARDROBE (Using proxy for now, none precisely in original mock but adding a realistic one)
    {
        id: 'diva-konsol',
        name: 'Diva Konsol (Dolap)',
        category: 'Wardrobe',
        dimensions: { width: 200, depth: 45 },
        price: 26990,
        image: '/images/products/diva-konsol.jpg',
        brand: 'SELIS',
        originalHref: '/urun/diva-konsol'
    },
    // LIGHTING
    {
        id: 'aura-lambader',
        name: 'Aura Lambader',
        category: 'Lighting',
        dimensions: { width: 45, depth: 45 },
        price: 12990,
        image: '/images/products/aura-lamp-1.jpg',
        brand: 'SELIS Luce',
        originalHref: '/urun/aura-lambader'
    },
    {
        id: 'celestia-avize',
        name: 'Celestia Avize',
        category: 'Lighting',
        dimensions: { width: 80, depth: 80 },
        price: 22990,
        image: '/images/products/celestia-chandelier-1.jpg',
        brand: 'SELIS Luce',
        originalHref: '/urun/celestia-avize'
    },
    // DECORATION
    {
        id: 'botanica-vazo-seti',
        name: 'Botanica Vazo Seti',
        category: 'Decoration',
        dimensions: { width: 30, depth: 30 },
        price: 4990,
        image: '/images/products/botanica-vase-1.jpg',
        brand: 'SELIS Casa',
        originalHref: '/urun/botanica-vazo-seti'
    },
    {
        id: 'terra-hali',
        name: 'Terra Halı',
        category: 'Decoration',
        dimensions: { width: 300, depth: 200 },
        price: 15990,
        image: '/images/products/terra-rug-1.jpg',
        brand: 'SELIS Casa',
        originalHref: '/urun/terra-hali'
    }
];
