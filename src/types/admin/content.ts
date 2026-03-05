// src/types/admin/content.ts

export type SectionType =
    | 'hero'
    | 'features'
    | 'featured-products'
    | 'lookbook-banner'
    | 'campaign-strip'
    | 'testimonials'
    | 'newsletter'
    | 'text-block'
    | 'gallery';

export interface HeroContent {
    topLabel: string;
    title: string;
    subtitle: string;
    ctaButtons: { text: string; url: string; type: 'primary' | 'outline' | 'link' }[];
    desktopImage: string;
    mobileImage?: string;
    videoUrl?: string;
    overlayOpacity: number;
    textPosition: 'left' | 'center' | 'right';
}

export interface FeatureItem {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export interface BannerContent {
    text: string;
    url?: string;
    isActive: boolean;
    isMarquee: boolean;
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    schedule?: {
        start: string;
        end: string;
    };
}

export interface PageSection {
    id: string;
    type: SectionType;
    title: string;
    isActive: boolean;
    order: number;
    content: any; // HeroContent | FeatureItem[] | BannerContent etc.
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: { id: string; name: string; avatar: string };
    category: string;
    tags: string[];
    status: 'published' | 'draft' | 'scheduled';
    publishedAt?: string;
    scheduledAt?: string;
    createdAt: string;
    updatedAt: string;
    views: number;
    comments: number;
    readTime: number;
    seo: {
        metaTitle: string;
        metaDescription: string;
        focusKeyword: string;
    };
}

export interface LookbookPhoto {
    id: string;
    title: string;
    titleKey?: string;
    description: string;
    descriptionKey?: string;
    category: string;
    url: string;
    order: number;
    isFeatured: boolean;
    productTags: {
        id: string;
        x: number;
        y: number;
        productId: string;
        productName: string;
        productPrice: number;
        productHref: string;
        productImage: string;
    }[];
}

export interface LookbookCollection {
    id: string;
    name: string;
    season: string;
    coverImage: string;
    isActive: boolean;
    publishedAt: string;
    photos: LookbookPhoto[];
}
