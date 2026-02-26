export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'featured';

export interface Review {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    productVariant?: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    isVerifiedPurchase: boolean;
    orderId?: string;
    rating: number; // 1-5
    title?: string;
    content: string;
    images?: string[];
    status: ReviewStatus;
    adminReply?: {
        content: string;
        repliedAt: string;
        repliedBy: string;
    };
    helpfulCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewStats {
    pending: number;
    approved: number;
    rejected: number;
    averageRating: number;
    total: number;
}
