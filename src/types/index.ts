export interface Product {
  id: string;
  name: string;
  nameKey?: string;
  slug: string;
  description: string;
  descriptionKey?: string;
  price: number;
  salePrice?: number;
  originalPrice?: number;
  currency?: string;
  categoryId: string;
  categorySlug: string;
  category?: string;
  images: string[];
  lifestyleImage?: string;
  model3dUrl?: string;
  colors: ProductColor[];
  materials: string[];
  dimensions: ProductDimensions;
  rating?: ProductRating;
  badges?: ProductBadge[];
  stock: number;
  featured: boolean;
  isFeatured?: boolean;
  isNew?: boolean | string;
  brand?: string;
  deliveryDays?: number;
  hasQuickShip?: boolean;
}

export interface ProductColor {
  id?: string;
  name: string;
  hex: string;
  image?: string;
  lifestyleImage?: string;
  inStock?: boolean;
}

export interface ProductRating {
  average: number;
  count: number;
}

export interface ProductBadge {
  type: 'new' | 'sale' | 'low-stock' | 'bestseller' | 'exclusive';
  label: string;
}


export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
  unit: 'cm' | 'inch';
}

export interface Category {
  id: string;
  name: string;
  nameKey?: string;
  slug: string;
  description: string;
  descriptionKey?: string;
  image: string;
  parentId?: string;
  productCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: ProductColor;
}

export interface NavItem {
  label: string;
  labelKey?: string;
  href: string;
  children?: NavCategory[];
  featuredImage?: string;
}

export interface NavCategory {
  title: string;
  titleKey?: string;
  items: { label: string; labelKey?: string; href: string }[];
}

export interface FilterState {
  colors: string[];
  materials: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}
