import type { FurnitureCatalogItem } from '../types/planner.types';

export const FURNITURE_CATALOG: FurnitureCatalogItem[] = [
    // ── Koltuklar ──
    { id: 'f1', name: 'Luna Köşe Koltuk', category: 'Koltuklar', price: 74990, thumbnail: '/images/gallery-1.jpg', dimensions: { width: 2.8, depth: 1.8, height: 0.85 }, colors: ['#B0B0B0', '#8B7355', '#F5F0EB'] },
    { id: 'f2', name: 'Nova 3\'lü Koltuk', category: 'Koltuklar', price: 42990, thumbnail: '/images/gallery-2.jpg', dimensions: { width: 2.2, depth: 0.95, height: 0.82 }, colors: ['#B0B0B0', '#1B2838'] },
    { id: 'f3', name: 'Atlas Berjer', category: 'Koltuklar', price: 18990, thumbnail: '/images/gallery-3.jpg', dimensions: { width: 0.85, depth: 0.85, height: 1.0 }, colors: ['#C9A96E', '#8B7355'] },
    { id: 'f4', name: 'Zen Puf', category: 'Koltuklar', price: 6990, thumbnail: '/images/gallery-4.jpg', dimensions: { width: 0.6, depth: 0.6, height: 0.42 }, colors: ['#B0B0B0', '#F5F0EB'] },

    // ── Masalar ──
    { id: 'f5', name: 'Luna Yemek Masası', category: 'Masalar', price: 45990, thumbnail: '/images/gallery-5.jpg', dimensions: { width: 1.8, depth: 0.9, height: 0.76 }, colors: ['#C4A882', '#3E2723'] },
    { id: 'f6', name: 'Nova Sehpa', category: 'Masalar', price: 8990, thumbnail: '/images/gallery-6.jpg', dimensions: { width: 1.1, depth: 0.6, height: 0.42 }, colors: ['#C4A882', '#FFFFFF'] },
    { id: 'f7', name: 'Atlas Yan Sehpa', category: 'Masalar', price: 4990, thumbnail: '/images/gallery-1.jpg', dimensions: { width: 0.45, depth: 0.45, height: 0.55 }, colors: ['#C4A882', '#C9A96E'] },
    { id: 'f8', name: 'Çalışma Masası', category: 'Masalar', price: 12990, thumbnail: '/images/gallery-2.jpg', dimensions: { width: 1.4, depth: 0.7, height: 0.76 }, colors: ['#C4A882', '#FFFFFF'] },

    // ── Yatak ──
    { id: 'f9', name: 'Luna Çift Kişilik Yatak', category: 'Yatak', price: 34990, thumbnail: '/images/gallery-3.jpg', dimensions: { width: 1.8, depth: 2.15, height: 0.45 }, colors: ['#F5F0EB', '#B0B0B0'] },
    { id: 'f10', name: 'Nova Tek Kişilik Yatak', category: 'Yatak', price: 18990, thumbnail: '/images/gallery-4.jpg', dimensions: { width: 1.0, depth: 2.0, height: 0.45 }, colors: ['#F5F0EB'] },
    { id: 'f11', name: 'Komodin', category: 'Yatak', price: 5990, thumbnail: '/images/gallery-5.jpg', dimensions: { width: 0.5, depth: 0.4, height: 0.55 }, colors: ['#C4A882', '#FFFFFF'] },

    // ── Depolama ──
    { id: 'f12', name: 'Luna Gardırop', category: 'Depolama', price: 28990, thumbnail: '/images/gallery-6.jpg', dimensions: { width: 2.0, depth: 0.6, height: 2.2 }, colors: ['#C4A882', '#FFFFFF'] },
    { id: 'f13', name: 'TV Ünitesi', category: 'Depolama', price: 14990, thumbnail: '/images/gallery-1.jpg', dimensions: { width: 1.8, depth: 0.45, height: 0.55 }, colors: ['#C4A882', '#3E2723'] },
    { id: 'f14', name: 'Kitaplık', category: 'Depolama', price: 12990, thumbnail: '/images/gallery-2.jpg', dimensions: { width: 1.0, depth: 0.35, height: 1.8 }, colors: ['#C4A882', '#FFFFFF'] },

    // ── Aydınlatma ──
    { id: 'f15', name: 'Lambader', category: 'Aydınlatma', price: 3990, thumbnail: '/images/gallery-3.jpg', dimensions: { width: 0.35, depth: 0.35, height: 1.6 }, colors: ['#C9A96E', '#1C1C1E'] },
    { id: 'f16', name: 'Masa Lambası', category: 'Aydınlatma', price: 1990, thumbnail: '/images/gallery-4.jpg', dimensions: { width: 0.25, depth: 0.25, height: 0.5 }, colors: ['#C9A96E', '#FFFFFF'] },

    // ── Dekor ──
    { id: 'f17', name: 'Atlas Halı 200×300', category: 'Dekor', price: 12990, thumbnail: '/images/gallery-5.jpg', dimensions: { width: 2.0, depth: 3.0, height: 0.02 }, colors: ['#C4A882', '#B0B0B0'] },
    { id: 'f18', name: 'Saksı Bitki', category: 'Dekor', price: 990, thumbnail: '/images/gallery-6.jpg', dimensions: { width: 0.4, depth: 0.4, height: 1.2 }, colors: ['#4CAF50'] },
    { id: 'f19', name: 'Ayna', category: 'Dekor', price: 4990, thumbnail: '/images/gallery-1.jpg', dimensions: { width: 0.8, depth: 0.05, height: 1.2 }, colors: ['#C9A96E', '#1C1C1E'] },
    { id: 'f20', name: 'Yemek Sandalyesi', category: 'Masalar', price: 3490, thumbnail: '/images/gallery-2.jpg', dimensions: { width: 0.48, depth: 0.52, height: 0.85 }, colors: ['#B0B0B0', '#8B7355', '#F5F0EB'] },
];

export const FURNITURE_CATEGORIES = ['Tümü', 'Koltuklar', 'Masalar', 'Yatak', 'Depolama', 'Aydınlatma', 'Dekor'] as const;
