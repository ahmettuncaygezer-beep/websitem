export type CategoryStatus = 'Aktif' | 'Pasif';

export interface Category {
    id: string;
    nameTR: string;
    nameEN: string;
    slug: string;
    parentId: string | null;
    description: string;
    coverImage: string | null;
    metaTitle: string;
    metaDescription: string;
    status: CategoryStatus;
    order: number;
    productCount: number;
    children: Category[];
}
