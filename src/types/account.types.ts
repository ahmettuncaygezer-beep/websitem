// ━━━ USER ━━━
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
    birthday?: string;
    gender?: 'male' | 'female' | 'other';
    styleProfile?: 'minimalist' | 'klasik' | 'modern' | 'bohem';
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    points: number;
    totalSpent: number;
    createdAt: string;
    emailVerified: boolean;
    twoFactorEnabled: boolean;
}

// ━━━ ORDERS ━━━
export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'returned';

export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    color: string;
    size?: string;
    slug: string;
    reviewId?: string;
}

export interface Order {
    id: string;
    status: OrderStatus;
    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    shippingAddress: Address;
    paymentMethod: string;
    trackingNumber?: string;
    trackingUrl?: string;
    estimatedDelivery: string;
    actualDelivery?: string;
    createdAt: string;
    canCancel: boolean;
    canReturn: boolean;
    canReview: boolean;
}

// ━━━ ADDRESSES ━━━
export interface Address {
    id: string;
    label: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    district: string;
    postalCode: string;
    isDefault: boolean;
}

// ━━━ REWARDS ━━━
export type PointTransactionType = 'earned' | 'spent' | 'expired' | 'bonus';

export interface PointTransaction {
    id: string;
    type: PointTransactionType;
    points: number;
    description: string;
    orderId?: string;
    createdAt: string;
    expiresAt?: string;
}

export type TierName = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface UserTier {
    name: TierName;
    minSpent: number;
    maxSpent: number;
    benefits: string[];
    color: string;
    icon: string;
}

export const TIERS: UserTier[] = [
    {
        name: 'Bronze',
        minSpent: 0,
        maxSpent: 50000,
        benefits: ['Temel destek', 'Sipariş takibi'],
        color: '#CD7F32',
        icon: '🥉',
    },
    {
        name: 'Silver',
        minSpent: 50000,
        maxSpent: 150000,
        benefits: ['%5 puan kazancı', 'Ücretsiz kargo (₺500+)', 'Öncelikli destek'],
        color: '#C0C0C0',
        icon: '🥈',
    },
    {
        name: 'Gold',
        minSpent: 150000,
        maxSpent: 350000,
        benefits: ['%10 puan kazancı', 'Ücretsiz montaj', 'Ücretsiz kargo', 'Kişisel danışman'],
        color: '#C9A96E',
        icon: '🥇',
    },
    {
        name: 'Platinum',
        minSpent: 350000,
        maxSpent: Infinity,
        benefits: ['%15 puan kazancı', 'VIP hizmet', 'Özel tasarım danışmanlığı', 'Erken erişim', 'Ücretsiz iade'],
        color: '#B9F2FF',
        icon: '💎',
    },
];

// ━━━ REVIEWS ━━━
export type ReviewStatus = 'published' | 'pending' | 'rejected';

export interface Review {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    productSlug: string;
    rating: number;
    title: string;
    content: string;
    photos?: string[];
    status: ReviewStatus;
    helpfulCount: number;
    createdAt: string;
    orderId: string;
}

// ━━━ SESSIONS ━━━
export interface Session {
    id: string;
    device: string;
    browser: string;
    os: string;
    location: string;
    lastActive: string;
    isCurrent: boolean;
    icon: 'laptop' | 'mobile' | 'tablet';
}

// ━━━ NOTIFICATIONS ━━━
export interface NotificationPreferences {
    orderUpdates: boolean;
    promotions: boolean;
    priceDrops: boolean;
    newArrivals: boolean;
    reviewReminders: boolean;
    newsletter: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    priceAlerts: boolean;
    stockAlerts: boolean;
    securityAlerts: boolean;
}

// ━━━ AUTH ━━━
export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
    acceptMarketing?: boolean;
}
