export interface CategoryItem {
    id: string;
    label: string;
    labelKey?: string;
    subLabel: string;
    subLabelKey?: string;
    productCount: number;
    href: string;
    image: string;
    badge?: string;
    badgeKey?: string;
    featured?: boolean;
    span: number;
}

export type FilterTab =
    | 'Tümü'
    | 'Oturma'
    | 'Yatak'
    | 'Yemek'
    | 'Çalışma'
    | 'Aydınlatma';

export interface CategoryCardProps {
    category: CategoryItem;
    index: number;
    span: number;
    isVisible: boolean;
    activeFilter: FilterTab;
}
