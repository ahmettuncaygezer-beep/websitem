// src/types/admin/analytics.ts

export interface DailySales {
    date: string;
    revenue: number;
    orders: number;
    visitors: number;
    prevRevenue: number;
    prevOrders: number;
}

export interface FunnelStep {
    step: string;
    count: number;
    percentage: number;
    dropoff: number;
}

export interface HeatmapCell {
    day: string;
    hour: number;
    orders: number;
    revenue: number;
}

export interface CityData {
    city: string;
    revenue: number;
    orders: number;
    percentage: number;
    topProduct: string;
}

export interface CategorySales {
    category: string;
    revenue: number;
    orders: number;
    percentage: number;
    growth: number;
}

export interface ProductPerformanceItem {
    id: string;
    name: string;
    views: number;
    addToCart: number;
    sales: number;
    conversionRate: number;
    revenue: number;
    rating: number;
    trend: 'up' | 'down';
}

export interface MonthlyRevenue {
    month: string;
    revenue: number;
    prevRevenue: number;
}

export interface KpiData {
    id: string; // restored for icon mapping
    label: string;
    value: string;
    trend: number; // changed to number for Math.abs()
    trendUp: boolean;
    subtitle: string; // added for StatCard rendering
    color: string;
    sparklineData: number[]; // restored for StatCard drawing
}

export type LiveEvent = {
    id: string;
    type: 'order' | 'user' | 'payment';
    message: string;
    time: string;
}

// Helper for price formatting
export function formatCurrency(n: number): string {
    if (n >= 1000000) return '₺' + (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return '₺' + (n / 1000).toFixed(0) + 'K';
    return '₺' + n.toLocaleString('tr-TR');
}

export const initialLiveEvents: LiveEvent[] = [
    { id: 'le-1', type: 'order', message: 'Yeni sipariş: Luna Köşe Koltuk — ₺74.990', time: '2 dk önce' },
    { id: 'le-2', type: 'user', message: 'Yeni üye kaydı: ayse.k@gmail.com', time: '5 dk önce' },
    { id: 'le-3', type: 'payment', message: 'Ödeme onaylandı — Sipariş #1847', time: '8 dk önce' },
    { id: 'le-4', type: 'order', message: 'Yeni sipariş: Nova Yemek Masası — ₺24.990', time: '12 dk önce' },
    { id: 'le-5', type: 'user', message: 'Yeni üye kaydı: mehmet.d@outlook.com', time: '18 dk önce' },
];



export const liveEventPool: Omit<LiveEvent, 'id' | 'time'>[] = [
    { type: 'order', message: 'Yeni sipariş: Stella Yatak Odası Takımı — ₺129.990' },
    { type: 'payment', message: 'Ödeme onaylandı — Sipariş #1848' },
    { type: 'user', message: 'Yeni üye kaydı: zeynep.y@gmail.com' },
    { type: 'order', message: 'Yeni sipariş: Tekli Berjer Koltuk — ₺18.990' },
    { type: 'payment', message: 'Ödeme onaylandı — Sipariş #1849' },
    { type: 'order', message: 'Yeni sipariş: Çalışma Masası Set — ₺12.490' },
    { type: 'user', message: 'Yeni üye kaydı: can.a@hotmail.com' },
    { type: 'order', message: 'Yeni sipariş: Dekoratif Ayna — ₺4.990' },
];

export const mockKPIs: KpiData[] = [
    {
        id: 'revenue',
        label: 'Toplam Gelir',
        value: '₺1.2M',
        trend: 12.5,
        trendUp: true,
        subtitle: 'geçen aya göre',
        color: '#C9A96E',
        sparklineData: [30, 40, 35, 50, 49, 60, 70, 91, 80, 95, 100, 110],
    },
    {
        id: 'orders',
        label: 'Toplam Sipariş',
        value: '847',
        trend: 8.3,
        trendUp: true,
        subtitle: 'geçen aya göre',
        color: '#30D158',
        sparklineData: [20, 30, 25, 40, 35, 50, 45, 60, 55, 70, 65, 80],
    },
    {
        id: 'customers',
        label: 'Aktif Müşteri',
        value: '2.4K',
        trend: 5.2,
        trendUp: true,
        subtitle: 'geçen aya göre',
        color: '#5E5CE6',
        sparklineData: [50, 55, 52, 58, 60, 62, 65, 68, 70, 72, 75, 78],
    },
    {
        id: 'conversion',
        label: 'Toplam Ürün',
        value: '156',
        trend: 2.1,
        trendUp: false,
        subtitle: 'geçen aya göre',
        color: '#FF9F0A',
        sparklineData: [80, 78, 75, 72, 70, 68, 65, 63, 60, 58, 56, 54],
    },
];

