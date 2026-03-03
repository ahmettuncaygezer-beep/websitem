import { MediaFile, MediaFolder } from '@/types/media';

export const mockMediaFolders: MediaFolder[] = [
    { id: 'f_root', name: 'Kök Klasör', parentId: null, fileCount: 1247, createdAt: '2025-01-01' },
    { id: 'f_products', name: 'Ürünler', parentId: 'f_root', fileCount: 850, createdAt: '2025-01-05' },
    { id: 'f_sofas', name: 'Koltuklar', parentId: 'f_products', fileCount: 240, createdAt: '2025-01-10' },
    { id: 'f_tables', name: 'Masalar', parentId: 'f_products', fileCount: 120, createdAt: '2025-01-12' },
    { id: 'f_blog', name: 'Blog', parentId: 'f_root', fileCount: 120, createdAt: '2025-01-15' },
    { id: 'f_general', name: 'Genel', parentId: 'f_root', fileCount: 277, createdAt: '2025-01-20' },
];

export const mockMediaFiles: MediaFile[] = [
    {
        id: 'm_1',
        name: 'luna-kose-koltuk-vizon-1.webp',
        originalName: 'IMG_4567.webp',
        type: 'image',
        mimeType: 'image/webp',
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200',
        thumbnailUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400',
        size: 2400000,
        width: 1920,
        height: 1080,
        folderId: 'f_sofas',
        altText: 'Luna Vizon Köşe Koltuk Ana Görsel',
        tags: ['koltuk', 'vizon', 'modern', 'salon'],
        uploadedBy: { id: 'u_1', name: 'Ali Yılmaz', avatar: 'https://i.pravatar.cc/150?u=ali' },
        usages: [
            { type: 'product', id: '1', name: 'Luna Köşe Koltuk', url: '/admin/urunler/1' },
            { type: 'page', id: 'home', name: 'Ana Sayfa Hero', url: '/admin/icerik/ana-sayfa' }
        ],
        createdAt: '2026-03-12T14:32:00Z',
        updatedAt: '2026-03-12T14:32:00Z'
    },
    {
        id: 'm_2',
        name: 'aria-yatak-basi-siyah.webp',
        originalName: 'aria-headboard.webp',
        type: 'image',
        mimeType: 'image/webp',
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200',
        thumbnailUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400',
        size: 3100000,
        width: 2400,
        height: 1350,
        folderId: 'f_products',
        altText: 'Aria Siyah Yatak Başı',
        tags: ['yatak-odası', 'siyah', 'premium'],
        uploadedBy: { id: 'u_2', name: 'Canberk Gezer', avatar: 'https://i.pravatar.cc/150?u=canberk' },
        usages: [
            { type: 'product', id: '2', name: 'Aria Yatak Başı', url: '/admin/urunler/2' }
        ],
        createdAt: '2026-03-10T11:20:00Z',
        updatedAt: '2026-03-10T11:20:00Z'
    },
    {
        id: 'm_3',
        name: 'koleksiyon-tanitim.mp4',
        originalName: 'promo_video_v3.mp4',
        type: 'video',
        mimeType: 'video/mp4',
        url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4', // Mock URL
        size: 47200000,
        duration: 154,
        folderId: 'f_general',
        altText: '2026 Koleksiyon Tanıtım Videosu',
        tags: ['video', 'promo', 'branding'],
        uploadedBy: { id: 'u_1', name: 'Ali Yılmaz', avatar: 'https://i.pravatar.cc/150?u=ali' },
        usages: [
            { type: 'page', id: 'home', name: 'Ana Sayfa Hero', url: '/admin/icerik/ana-sayfa' }
        ],
        createdAt: '2026-03-11T09:15:00Z',
        updatedAt: '2026-03-11T09:15:00Z'
    },
    {
        id: 'm_4',
        name: 'selis-2026-katalog.pdf',
        originalName: 'catalog_final_tr.pdf',
        type: 'pdf',
        mimeType: 'application/pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // Mock URL
        size: 8700000,
        pages: 12,
        folderId: 'f_general',
        altText: 'SELIS 2026 Ürün Kataloğu',
        tags: ['katalog', 'pdf', 'doküman'],
        uploadedBy: { id: 'u_1', name: 'Ali Yılmaz', avatar: 'https://i.pravatar.cc/150?u=ali' },
        usages: [],
        createdAt: '2026-03-05T16:40:00Z',
        updatedAt: '2026-03-05T16:40:00Z'
    },
    {
        id: 'm_5',
        name: 'kullanilmayan-dosya.jpg',
        originalName: 'test-unused.jpg',
        type: 'image',
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
        thumbnailUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400',
        size: 850000,
        width: 800,
        height: 600,
        folderId: 'f_general',
        altText: 'Kullanılmayan Test Görseli',
        tags: ['test', 'silinebilir'],
        uploadedBy: { id: 'u_1', name: 'Ali Yılmaz', avatar: 'https://i.pravatar.cc/150?u=ali' },
        usages: [],
        createdAt: '2026-01-20T10:00:00Z',
        updatedAt: '2026-01-20T10:00:00Z'
    }
];

// 25 more auto-generated mocks for variety
for (let i = 6; i <= 30; i++) {
    mockMediaFiles.push({
        id: `m_${i}`,
        name: `mobilya-detay-${i}.webp`,
        originalName: `image_${i}.webp`,
        type: 'image',
        mimeType: 'image/webp',
        url: `https://images.unsplash.com/photo-${1600000000000 + i}?auto=format&fit=crop&q=80&w=600`,
        thumbnailUrl: `https://images.unsplash.com/photo-${1600000000000 + i}?auto=format&fit=crop&q=80&w=300`,
        size: Math.floor(Math.random() * 5000000) + 500000,
        width: 1200,
        height: 800,
        folderId: i % 2 === 0 ? 'f_sofas' : 'f_tables',
        altText: `Mobilya Detay Görseli ${i}`,
        tags: ['detay', 'özel-üretim'],
        uploadedBy: { id: 'u_1', name: 'Ali Yılmaz', avatar: 'https://i.pravatar.cc/150?u=ali' },
        usages: [],
        createdAt: `2026-03-${Math.floor(Math.random() * 20) + 1}T12:00:00Z`,
        updatedAt: `2026-03-${Math.floor(Math.random() * 20) + 1}T12:00:00Z`
    });
}

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const getTotalStorageUsed = (files: MediaFile[]): string => {
    const total = files.reduce((acc, file) => acc + file.size, 0);
    return formatFileSize(total);
};
