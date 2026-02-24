export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  categoryId: string;
  categorySlug: string;
  images: string[];
  lifestyleImage?: string;
  model3dUrl?: string;
  colors: ProductColor[];
  materials: string[];
  dimensions: ProductDimensions;
  stock: number;
  featured: boolean;
  isNew?: boolean;
  brand?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
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
  slug: string;
  description: string;
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
  href: string;
  children?: NavCategory[];
  featuredImage?: string;
}

export interface NavCategory {
  title: string;
  items: { label: string; href: string }[];
}

export interface FilterState {
  colors: string[];
  materials: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}
