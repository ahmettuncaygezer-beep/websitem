import { Review } from '@/types/reviews';

export const mockReviews: Review[] = [
    {
        id: 'rev_1',
        productId: 'prod_1',
        productName: 'Maison Velvet Armchair',
        productImage: 'https://images.unsplash.com/photo-1592078615290-033ee584e277?q=80&w=200&h=200&auto=format&fit=crop',
        userId: 'user_1',
        userName: 'Ahmet Yılmaz',
        isVerifiedPurchase: true,
        orderId: 'ORD-2025-001',
        rating: 5,
        title: 'Mükemmel işçilik',
        content: 'Ürün gerçekten çok kaliteli. Kumaş dokusu beklediğimden daha iyi çıktı. Paketleme ve teslimat süreci de oldukça profesyoneldi.',
        images: [
            'https://images.unsplash.com/photo-1592078615290-033ee584e277?q=80&w=400&h=400&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400&h=400&auto=format&fit=crop'
        ],
        status: 'approved',
        adminReply: {
            content: 'Değerli müşterimiz, güzel yorumunuz için çok teşekkür ederiz. Ürününüzü iyi günlerde kullanmanızı dileriz.',
            repliedAt: '2025-02-15T10:00:00Z',
            repliedBy: 'Ali Yılmaz'
        },
        helpfulCount: 12,
        createdAt: '2025-02-14T08:30:00Z',
        updatedAt: '2025-02-15T10:00:00Z'
    },
    {
        id: 'rev_2',
        productId: 'prod_2',
        productName: 'Marble Coffee Table',
        productImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=200&h=200&auto=format&fit=crop',
        userId: 'user_2',
        userName: 'Ayşe Kaya',
        isVerifiedPurchase: true,
        rating: 4,
        content: 'Masa çok şık duruyor ama mermer üzerindeki damarlar fotoğraftakinden biraz farklı. Yine de salonuma çok yakıştı.',
        status: 'pending',
        helpfulCount: 3,
        createdAt: '2025-02-25T14:20:00Z',
        updatedAt: '2025-02-25T14:20:00Z'
    },
    {
        id: 'rev_3',
        productId: 'prod_3',
        productName: 'Minimalist Oak Bed Frame',
        productImage: 'https://images.unsplash.com/photo-1505693419173-42b925b2f275?q=80&w=200&h=200&auto=format&fit=crop',
        userId: 'user_3',
        userName: 'Mehmet Öz',
        isVerifiedPurchase: false,
        rating: 2,
        content: 'Kurulumu çok zor, parçalar birbirine tam oturmuyor. Ayrıca teslimat 2 hafta gecikti.',
        status: 'rejected',
        helpfulCount: 1,
        createdAt: '2025-02-20T09:15:00Z',
        updatedAt: '2025-02-21T11:00:00Z'
    },
    {
        id: 'rev_4',
        productId: 'prod_1',
        productName: 'Maison Velvet Armchair',
        productImage: 'https://images.unsplash.com/photo-1592078615290-033ee584e277?q=80&w=200&h=200&auto=format&fit=crop',
        userId: 'user_4',
        userName: 'Canan Sert',
        isVerifiedPurchase: true,
        rating: 5,
        content: 'Efsane bir koltuk. Rengi tam fotoğraftaki gibi. Maison kalitesi tartışılmaz.',
        status: 'featured',
        helpfulCount: 28,
        createdAt: '2025-01-20T16:45:00Z',
        updatedAt: '2025-01-22T09:00:00Z'
    },
    // Adding more mock data to reach 20
    ...Array.from({ length: 16 }).map((_, i) => ({
        id: `rev_mock_${i}`,
        productId: `prod_${(i % 5) + 1}`,
        productName: ['Dining Table', 'Sideboard', 'Mirror', 'Rug', 'Lamp'][i % 5],
        productImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
        userId: `user_mock_${i}`,
        userName: `Test User ${i + 5}`,
        isVerifiedPurchase: i % 2 === 0,
        rating: (i % 3) + 3,
        content: 'Modern design and great material. Highly recommended for premium homes.',
        status: i % 4 === 0 ? 'pending' : 'approved',
        helpfulCount: Math.floor(Math.random() * 10),
        createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString(),
        updatedAt: new Date().toISOString()
    })) as Review[]
];

export const mockReviewStats = {
    pending: 8,
    approved: 247,
    rejected: 31,
    averageRating: 4.6,
    total: 286
};
