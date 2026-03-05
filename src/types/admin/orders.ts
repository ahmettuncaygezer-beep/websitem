// src/types/admin/orders.ts

export type OrderStatus =
    | 'Ödeme Bekleniyor'
    | 'Ödeme Alındı'
    | 'Hazırlanıyor'
    | 'Kargoya Verildi'
    | 'Teslim Edildi'
    | 'İptal'
    | 'İade Talebi';

export interface TimelineEvent {
    id: string;
    status: string;
    description: string;
    createdBy: string;
    createdAt: string;
    note: string | null;
}

export interface OrderItem {
    id: string;
    productName: string;
    variantName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    image: string;
}

export interface Order {
    id: string;
    orderNo: string;
    customer: {
        id: string;
        name: string;
        email: string;
        phone: string;
        avatar: string;
        totalOrders: number;
        totalSpent: number;
        isVip: boolean;
    };
    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    status: OrderStatus;
    paymentMethod: {
        type: string;
        last4: string | null;
        transactionId: string;
    };
    shippingAddress: {
        fullName: string;
        phone: string;
        address: string;
        district: string;
        city: string;
        postalCode: string;
    };
    cargoCompany: string | null;
    trackingNumber: string | null;
    estimatedDelivery: string | null;
    adminNote: string;
    timeline: TimelineEvent[];
    createdAt: string;
    updatedAt: string;
}

export const STATUS_CONFIG: Record<OrderStatus, { bg: string; color: string }> = {
    'Ödeme Bekleniyor': { bg: 'rgba(255,214,10,0.12)', color: '#FFD60A' },
    'Ödeme Alındı': { bg: 'rgba(10,132,255,0.12)', color: '#0A84FF' },
    'Hazırlanıyor': { bg: 'rgba(201,169,110,0.12)', color: '#C9A96E' },
    'Kargoya Verildi': { bg: 'rgba(10,132,255,0.15)', color: '#0A84FF' },
    'Teslim Edildi': { bg: 'rgba(48,209,88,0.12)', color: '#30D158' },
    'İptal': { bg: 'rgba(255,69,58,0.12)', color: '#FF453A' },
    'İade Talebi': { bg: 'rgba(191,90,242,0.12)', color: '#BF5AF2' },
};

export const AVATAR_COLORS: string[] = [
    'linear-gradient(135deg,#C9A96E,#A07840)',
    'linear-gradient(135deg,#5E5CE6,#3E3CB6)',
    'linear-gradient(135deg,#30D158,#1EA348)',
    'linear-gradient(135deg,#FF6B6B,#CC3333)',
    'linear-gradient(135deg,#0A84FF,#0056CC)',
    'linear-gradient(135deg,#BF5AF2,#8F2ABF)',
];

export function getAvatarColor(name: string): string {
    const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[idx];
}

export function formatPrice(n: number): string {
    return '₺' + n.toLocaleString('tr-TR');
}

export function formatDate(iso: string): { date: string; time: string } {
    const d = new Date(iso);
    const date = d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' });
    const time = d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    return { date, time };
}

export const STATUS_FLOW: OrderStatus[] = [
    'Ödeme Bekleniyor', 'Ödeme Alındı', 'Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi',
];

export function getNextStatuses(current: OrderStatus): OrderStatus[] {
    if (current === 'İptal' || current === 'Teslim Edildi') return [];
    if (current === 'İade Talebi') return ['İptal', 'Teslim Edildi'];
    const idx = STATUS_FLOW.indexOf(current);
    const nexts: OrderStatus[] = [];
    if (idx !== -1 && idx < STATUS_FLOW.length - 1) nexts.push(STATUS_FLOW[idx + 1]);
    nexts.push('İptal');
    if (current !== 'Ödeme Bekleniyor') nexts.push('İade Talebi');
    return nexts;
}
