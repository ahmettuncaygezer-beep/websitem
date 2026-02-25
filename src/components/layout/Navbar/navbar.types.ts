// ─── Navbar Type Definitions ─────────────────────────────────────────────────

export interface NavSubItem {
    label: string;
    href: string;
}

export interface NavSubCategory {
    title: string;
    items: NavSubItem[];
}

export interface NavFeaturedProduct {
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    image: string;
    href: string;
    badge?: string;
}

export interface NavColor {
    name: string;
    hex: string;
}

export interface NavCategory {
    id: string;
    label: string;
    href: string;
    subCategories: NavSubCategory[];
    featuredProduct: NavFeaturedProduct;
    editorialText?: string;
    colors?: NavColor[];
    promotionText?: string;
}

export interface NavbarScrollState {
    isScrolled: boolean;
    isScrollingUp: boolean;
    lastScrollY: number;
}

export type Currency = 'TRY' | 'USD' | 'EUR';
export type Language = 'TR' | 'EN';
