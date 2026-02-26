// lib/mock/analytics.ts

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

// Helper for price formatting
export function formatCurrency(n: number): string {
    if (n >= 1000000) return '₺' + (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return '₺' + (n / 1000).toFixed(0) + 'K';
    return '₺' + n.toLocaleString('tr-TR');
}

// 1. Generate 30 Days of Daily Sales
export const mockDailySales: DailySales[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dateStr = date.toISOString().split('T')[0];
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const growthFactor = i > 26 ? 1.25 : 1.0; // Strong growth in last 3 days

    const revenueBase = Math.floor(Math.random() * (180000 - 40000) + 40000);
    const weekendBoost = isWeekend ? 1.25 : 1.0;

    return {
        date: dateStr,
        revenue: Math.floor(revenueBase * weekendBoost * growthFactor),
        orders: Math.floor((Math.random() * (85 - 18) + 18) * weekendBoost * growthFactor),
        visitors: Math.floor(Math.random() * (2400 - 800) + 800),
        prevRevenue: Math.floor(revenueBase * 0.85),
        prevOrders: Math.floor((Math.random() * 60 + 15) * 0.85)
    };
});

// 2. Mock Conversion Funnel
export const mockFunnelData: FunnelStep[] = [
    { step: "Ziyaretçi", count: 13500, percentage: 100, dropoff: 0 },
    { step: "Ürün Görüntüleme", count: 6075, percentage: 45, dropoff: 55 },
    { step: "Sepete Ekle", count: 1620, percentage: 12, dropoff: 73.3 },
    { step: "Ödeme Başlatma", count: 1080, percentage: 8, dropoff: 33.3 },
    { step: "Tamamlandı", count: 675, percentage: 5, dropoff: 37.5 },
];

// 3. Mock Heatmap (7 days x 24 hours = 168 cells)
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
export const mockHeatmapData: HeatmapCell[] = [];

DAYS.forEach(day => {
    for (let hour = 0; hour < 24; hour++) {
        let orders = 0;
        let revenue = 0;
        const isWeekend = day === "Cmt" || day === "Paz";
        const isPeakTime = (hour >= 12 && hour <= 14) || (hour >= 19 && hour <= 22);
        const isNight = hour >= 1 && hour <= 8;

        if (!isNight) {
            const baseOrders = Math.floor(Math.random() * 8) + 2;
            const peakMultiplier = isPeakTime ? 2.5 : 1.0;
            const weekendMultiplier = isWeekend ? 1.4 : 1.0;

            // Special case: Cuma 20:00 (Max peak)
            if (day === "Cum" && hour === 20) {
                orders = 47;
                revenue = 82000;
            } else if (day === "Cmt" && hour === 15) {
                orders = 43;
                revenue = 75000;
            } else {
                orders = Math.floor(baseOrders * peakMultiplier * weekendMultiplier);
                revenue = orders * (Math.floor(Math.random() * 1000) + 800);
            }
        }

        mockHeatmapData.push({ day, hour, orders, revenue });
    }
});

// 4. Mock City Data
export const mockCityData: CityData[] = [
    { city: "İstanbul", revenue: 487200, orders: 312, percentage: 39.1, topProduct: "Luna Köşe Koltuk" },
    { city: "Ankara", revenue: 198600, orders: 127, percentage: 15.9, topProduct: "Atlas Yatak Odası Set" },
    { city: "İzmir", revenue: 156800, orders: 98, percentage: 12.6, topProduct: "Velvet Berjer" },
    { city: "Bursa", revenue: 87400, orders: 54, percentage: 7.0, topProduct: "Zen Çalışma Masası" },
    { city: "Antalya", revenue: 72300, orders: 44, percentage: 5.8, topProduct: "Noir Konsol" },
    { city: "Adana", revenue: 48900, orders: 31, percentage: 3.9, topProduct: "Mira Sehpa" },
    { city: "Konya", revenue: 41200, orders: 26, percentage: 3.3, topProduct: "Efesi Yemek Odası" },
    { city: "Gaziantep", revenue: 34600, orders: 22, percentage: 2.8, topProduct: "Dream Koltuk" },
    { city: "Kayseri", revenue: 28900, orders: 18, percentage: 2.3, topProduct: "Hera Kütüphane" },
    { city: "Mersin", revenue: 24100, orders: 15, percentage: 1.9, topProduct: "Odin Kitaplık" },
];

// 5. Mock Category Sales
export const mockCategorySales: CategorySales[] = [
    { category: "Oturma Odası", revenue: 512400, orders: 312, percentage: 41.1, growth: 18.3 },
    { category: "Yatak Odası", revenue: 298700, orders: 167, percentage: 24.0, growth: 12.7 },
    { category: "Masalar", revenue: 187600, orders: 142, percentage: 15.1, growth: 8.4 },
    { category: "Dekorasyon", revenue: 124300, orders: 201, percentage: 10.0, growth: 22.1 },
    { category: "Aydınlatma", revenue: 86200, orders: 98, percentage: 6.9, growth: 5.2 },
    { category: "Depolama", revenue: 36700, orders: 42, percentage: 2.9, growth: -3.1 },
];

// 6. Mock Product Performance
export const mockProductPerformance: ProductPerformanceItem[] = [
    { id: "p1", name: "Luna Köşe Koltuk", views: 4820, addToCart: 723, sales: 312, conversionRate: 6.47, revenue: 23396880, rating: 4.9, trend: 'up' },
    { id: "p2", name: "Atlas Yatak Odası Set", views: 3610, addToCart: 541, sales: 198, conversionRate: 5.48, revenue: 29680200, rating: 4.8, trend: 'up' },
    { id: "p3", name: "Velvet Berjer", views: 2940, addToCart: 382, sales: 167, conversionRate: 5.68, revenue: 6678330, rating: 4.7, trend: 'up' },
    { id: "p4", name: "Zen Çalışma Masası", views: 2180, addToCart: 218, sales: 89, conversionRate: 4.08, revenue: 3559110, rating: 4.5, trend: 'down' },
    { id: "p5", name: "Noir Konsol", views: 1870, addToCart: 281, sales: 124, conversionRate: 6.63, revenue: 2478760, rating: 4.6, trend: 'up' },
    { id: "p6", name: "Mira Sehpa", views: 2450, addToCart: 198, sales: 112, conversionRate: 4.57, revenue: 1678900, rating: 4.4, trend: 'up' },
    { id: "p7", name: "Efesi Yemek Odası", views: 1540, addToCart: 123, sales: 65, conversionRate: 4.22, revenue: 12450000, rating: 4.7, trend: 'down' },
    { id: "p8", name: "Dream Koltuk", views: 3100, addToCart: 248, sales: 98, conversionRate: 3.16, revenue: 8750400, rating: 4.3, trend: 'up' },
    { id: "p9", name: "Odin Kitaplık", views: 1200, addToCart: 96, sales: 42, conversionRate: 3.50, revenue: 1260000, rating: 4.5, trend: 'up' },
    { id: "p10", name: "Hera Kütüphane", views: 980, addToCart: 78, sales: 34, conversionRate: 3.47, revenue: 1980300, rating: 4.2, trend: 'down' },
];

// --- Dashboard Specific Mock Data (Restored and Standardized) ---

export interface MonthlyRevenue {
    month: string;
    revenue: number;
    prevRevenue: number;
}

export const mockMonthlyRevenue: MonthlyRevenue[] = [
    { month: 'Oca', revenue: 850000, prevRevenue: 720000 },
    { month: 'Şub', revenue: 940000, prevRevenue: 810000 },
    { month: 'Mar', revenue: 1120000, prevRevenue: 890000 },
    { month: 'Nis', revenue: 1050000, prevRevenue: 950000 },
    { month: 'May', revenue: 1280000, prevRevenue: 110000 },
    { month: 'Haz', revenue: 1450000, prevRevenue: 120000 },
];

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

export const mockKPIs: KpiData[] = [
    { id: 'revenue', label: 'Gelir', value: '₺2.4M', trend: 12, trendUp: true, subtitle: 'geçen aya göre', color: '#C9A96E', sparklineData: [40, 45, 42, 50, 48, 55, 60] },
    { id: 'orders', label: 'Sipariş', value: '842', trend: 8, trendUp: true, subtitle: 'bugün', color: '#30D158', sparklineData: [30, 35, 32, 38, 36, 40, 42] },
    { id: 'users', label: 'Müşteri', value: '1.2K', trend: 15, trendUp: true, subtitle: 'yeni üyeler', color: '#0A84FF', sparklineData: [20, 22, 25, 28, 30, 32, 35] },
    { id: 'stock', label: 'Stok', value: '4.8K', trend: 2, trendUp: false, subtitle: 'kritik seviye', color: '#FFD60A', sparklineData: [60, 58, 55, 52, 50, 48, 45] },
];

export type LiveEvent = {
    id: string;
    type: 'order' | 'user' | 'payment';
    message: string;
    time: string;
}

export const initialLiveEvents: LiveEvent[] = [
    { id: '1', type: 'order', message: 'Yeni Sipariş: Luna Köşe Koltuk (#3821)', time: 'Şimdi' },
    { id: '2', type: 'user', message: 'Yeni Üye Kaydı: Ahmet Yılmaz', time: '2dk önce' },
    { id: '3', type: 'payment', message: 'Ödeme Alındı: ₺42.500 (Akbank)', time: '5dk önce' },
];

export const liveEventPool: Omit<LiveEvent, 'id' | 'time'>[] = [
    { type: 'order', message: 'Yeni Sipariş: Atlas Yatak Odası (#3822)' },
    { type: 'user', message: 'Yeni Üye Kaydı: Elif Demir' },
    { type: 'payment', message: 'Ödeme Alındı: ₺12.400 (Bonus)' },
    { type: 'order', message: 'Yeni Sipariş: Velvet Berjer (#3823)' },
];
