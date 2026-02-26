import {
    Product as GlobalProduct,
    ProductColor as GlobalProductColor,
    ProductRating as GlobalProductRating,
    ProductBadge as GlobalProductBadge
} from '@/types';

export type Product = GlobalProduct;
export type ProductColor = GlobalProductColor;
export type ProductRating = GlobalProductRating;
export type ProductBadge = GlobalProductBadge;

export type ViewMode = 'grid' | 'list';

export type CartButtonState = 'idle' | 'loading' | 'success';
