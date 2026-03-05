// Re-export from @/types/reviews and provide mock data for admin panel
export type { Review } from '@/types/reviews';

// Temporary mock data - will be replaced with API calls
import { type Review } from '@/types/reviews';

export const mockReviews: Review[] = [];

export const mockReviewStats = {
    pending: 0,
    approved: 0,
    rejected: 0,
    averageRating: 0,
    total: 0
};
