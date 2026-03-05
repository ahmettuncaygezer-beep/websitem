// src/types/admin/customers.ts

export type CustomerSegment = 'VIP' | 'Sadık' | 'Normal' | 'Risk';
export type CustomerStatus = 'Aktif' | 'Pasif';
export type ReviewStatus = 'Onaylı' | 'Bekleyen' | 'Reddedildi';

export interface Address {
    id: string;
    title: string;
    fullName: string;
    phone: string;
    address: string;
    district: string;
    city: string;
    isDefault: boolean;
}

export interface CustomerNote {
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
}

export interface CustomerOrderSummary {
    id: string;
    orderNo: string;
    total: number;
    status: string;
    createdAt: string;
    productCount: number;
}

export interface CustomerReview {
    id: string;
    productName: string;
    rating: number;
    comment: string;
    status: ReviewStatus;
    createdAt: string;
}

export interface ActivityLogItem {
    id: string;
    type: 'order' | 'login' | 'review' | 'refund' | 'address';
    description: string;
    createdAt: string;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatar: string;
    segment: CustomerSegment;
    status: CustomerStatus;
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    returnCount: number;
    selisPoints: number;
    registeredAt: string;
    lastLoginAt: string;
    lastOrderAt: string | null;
    addresses: Address[];
    notes: CustomerNote[];
    orders: CustomerOrderSummary[];
    reviews: CustomerReview[];
    activityLog: ActivityLogItem[];
}

export const SEGMENT_CONFIG: Record<CustomerSegment, { color: string; bg: string; border: string; label: string }> = {
    'VIP': { color: '#C9A96E', bg: 'rgba(201,169,110,0.12)', border: 'rgba(201,169,110,0.2)', label: 'VIP Müşteri' },
    'Sadık': { color: '#30D158', bg: 'rgba(48,209,88,0.1)', border: 'rgba(48,209,88,0.2)', label: 'Sadık Müşteri' },
    'Normal': { color: '#AEAEB2', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.1)', label: 'Standart' },
    'Risk': { color: '#FF453A', bg: 'rgba(255,69,58,0.1)', border: 'rgba(255,69,58,0.15)', label: 'Risk Altında' },
};

export const STATUS_CONFIG: Record<CustomerStatus, { color: string; bg: string }> = {
    'Aktif': { color: '#30D158', bg: 'rgba(48,209,88,0.1)' },
    'Pasif': { color: '#FF453A', bg: 'rgba(255,69,58,0.1)' },
};

export function formatPrice(n: number): string {
    return '₺' + n.toLocaleString('tr-TR');
}

export function getAvatarColor(segment: CustomerSegment): string {
    if (segment === 'VIP') return 'linear-gradient(135deg, #C9A96E, #8B6A3A)';
    if (segment === 'Sadık') return 'rgba(48,209,88,0.15)';
    if (segment === 'Risk') return 'rgba(255,69,58,0.12)';
    return 'rgba(255,255,255,0.08)';
}

export function getAvatarTextColor(segment: CustomerSegment): string {
    if (segment === 'VIP') return '#0F0F10';
    if (segment === 'Sadık') return '#30D158';
    if (segment === 'Risk') return '#FF453A';
    return '#AEAEB2';
}
