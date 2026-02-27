// ─── Navbar Type Definitions ─────────────────────────────────────────────────

export interface NavSubItem {
    label: string;
    dataKey?: string;
    href: string;
}

export interface NavSubCategory {
    title: string;
    dataKey?: string;
    items: NavSubItem[];
}

export interface NavFeaturedProduct {
    name: string;
    nameKey?: string;
    brand: string;
    brandKey?: string;
    price: number;
    originalPrice?: number;
    image: string;
    href: string;
    badge?: string;
    badgeKey?: string;
}

export interface NavColor {
    name: string;
    hex: string;
}

export interface NavCategory {
    id: string;
    label: string;
    dataKey?: string;
    href: string;
    subCategories: NavSubCategory[];
    featuredProduct: NavFeaturedProduct;
    editorialText?: string;
    editorialTextKey?: string;
    colors?: NavColor[];
    promotionText?: string;
    promotionTextKey?: string;
}

export interface NavbarScrollState {
    isScrolled: boolean;
    isScrollingUp: boolean;
    lastScrollY: number;
}

export type Currency = 'TRY' | 'USD' | 'EUR';
export type Language = 'TR' | 'EN';
