// src/types/admin/campaigns.ts

export enum CampaignType {
    PercentDiscount = "PercentDiscount",
    FixedDiscount = "FixedDiscount",
    FreeShipping = "FreeShipping",
    Bundle = "Bundle",
    FlashSale = "FlashSale"
}

export enum CampaignStatus {
    Aktif = "Aktif",
    Zamanlanmış = "Zamanlanmış",
    SonaErdi = "SonaErdi",
    Durduruldu = "Durduruldu"
}

export enum TargetSegment {
    Tümü = "Tümü",
    YeniUyeler = "YeniUyeler",
    VIP = "VIP",
    Pasif = "Pasif"
}

export interface BundleCondition {
    buyCount: number;
    getCount: number;
    getFree: boolean;
}

export interface Campaign {
    id: string;
    name: string;
    type: CampaignType;
    status: CampaignStatus;
    discountValue: number;
    discountUnit: string; // "yüzde" ya da "TL"
    couponCode: string | null;
    isSingleUse: boolean;
    usageCount: number;
    usageLimit: number | null;
    minOrderAmount: number | null;
    minProductCount: number | null;
    validCategories: string[];
    validProducts: string[];
    targetSegment: TargetSegment;
    perUserLimit: number | null;
    startDate: string;
    endDate: string;
    createdAt: string;
    revenue: number;
    orders: number;
    description: string | null;

    // Type specific fields
    flashSaleEndDate?: string;
    bundleProducts?: string[];
    bundleCondition?: BundleCondition;
}

export function formatPrice(n: number): string {
    return '₺' + n.toLocaleString('tr-TR');
}
