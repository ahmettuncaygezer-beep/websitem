// lib/mock/campaigns.ts

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

export const mockCampaigns: Campaign[] = [
    {
        id: "1",
        name: "Kış Sezonu İndirimi",
        type: CampaignType.PercentDiscount,
        status: CampaignStatus.Aktif,
        discountValue: 20,
        discountUnit: "yüzde",
        couponCode: "KIS20",
        isSingleUse: false,
        usageCount: 147,
        usageLimit: 500,
        minOrderAmount: 10000,
        minProductCount: null,
        validCategories: ["Oturma Odası", "Yatak Odası"],
        validProducts: [],
        targetSegment: TargetSegment.Tümü,
        perUserLimit: 1,
        startDate: "2026-02-01",
        endDate: "2026-02-28",
        createdAt: "2026-01-15T10:00:00Z",
        revenue: 2847600,
        orders: 147,
        description: "Kış koleksiyonunda geçerli %20 indirim."
    },
    {
        id: "2",
        name: "VIP Özel İndirim",
        type: CampaignType.PercentDiscount,
        status: CampaignStatus.Aktif,
        discountValue: 15,
        discountUnit: "yüzde",
        couponCode: "VIP15",
        isSingleUse: true,
        usageCount: 23,
        usageLimit: 100,
        minOrderAmount: null,
        minProductCount: null,
        validCategories: [],
        validProducts: [],
        targetSegment: TargetSegment.VIP,
        perUserLimit: 1,
        startDate: "2026-02-15",
        endDate: "2026-03-15",
        createdAt: "2026-02-10T09:00:00Z",
        revenue: 892400,
        orders: 23,
        description: "Değerli VIP müşterilerimize özel sepette %15 indirim."
    },
    {
        id: "3",
        name: "Ücretsiz Kargo Kampanyası",
        type: CampaignType.FreeShipping,
        status: CampaignStatus.Aktif,
        discountValue: 0,
        discountUnit: "TL",
        couponCode: null,
        isSingleUse: false,
        usageCount: 312,
        usageLimit: null,
        minOrderAmount: 5000,
        minProductCount: null,
        validCategories: [],
        validProducts: [],
        targetSegment: TargetSegment.Tümü,
        perUserLimit: null,
        startDate: "2026-01-01",
        endDate: "2026-12-31",
        createdAt: "2025-12-20T11:00:00Z",
        revenue: 0,
        orders: 312,
        description: "5000 TL ve üzeri alışverişlerde kargo bizden."
    },
    {
        id: "4",
        name: "Luna Flash Sale",
        type: CampaignType.FlashSale,
        status: CampaignStatus.Aktif,
        discountValue: 30,
        discountUnit: "yüzde",
        couponCode: "LUNA30",
        isSingleUse: false,
        usageCount: 34,
        usageLimit: 50,
        minOrderAmount: null,
        minProductCount: null,
        validCategories: [],
        validProducts: ["Luna Köşe Koltuk"],
        targetSegment: TargetSegment.Tümü,
        perUserLimit: 1,
        startDate: "2026-02-26",
        endDate: "2026-02-26",
        flashSaleEndDate: "2026-02-26T23:59:59",
        createdAt: "2026-02-25T15:00:00Z",
        revenue: 1274830,
        orders: 34,
        description: "Luna Köşe Koltuk'ta sadece bugüne özel %30 flaş indirim!"
    },
    {
        id: "5",
        name: "Bahar Koleksiyonu Lansmanı",
        type: CampaignType.PercentDiscount,
        status: CampaignStatus.Zamanlanmış,
        discountValue: 10,
        discountUnit: "yüzde",
        couponCode: "BAHAR10",
        isSingleUse: false,
        usageCount: 0,
        usageLimit: 200,
        minOrderAmount: null,
        minProductCount: null,
        validCategories: ["Dış Mekan"],
        validProducts: [],
        targetSegment: TargetSegment.Tümü,
        perUserLimit: 1,
        startDate: "2026-03-01",
        endDate: "2026-03-31",
        createdAt: "2026-02-20T12:00:00Z",
        revenue: 0,
        orders: 0,
        description: "Yeni Bahar koleksiyonu ürünlerinde geçerli lansman indirimi."
    },
    {
        id: "6",
        name: "2 Al 1 Öde",
        type: CampaignType.Bundle,
        status: CampaignStatus.Aktif,
        discountValue: 0,
        discountUnit: "TL",
        couponCode: "2AL1ODE",
        isSingleUse: false,
        usageCount: 18,
        usageLimit: 50,
        minOrderAmount: null,
        minProductCount: 2,
        validCategories: ["Aksesuar"],
        validProducts: [],
        targetSegment: TargetSegment.Tümü,
        perUserLimit: 2,
        bundleProducts: ["Maison Mum Seti", "Dekoratif Yastık", "Minimalist Vazo"],
        bundleCondition: {
            buyCount: 2,
            getCount: 1,
            getFree: true
        },
        startDate: "2026-02-20",
        endDate: "2026-03-05",
        createdAt: "2026-02-18T14:00:00Z",
        revenue: 719820,
        orders: 18,
        description: "Aksesuar grubunda seçili ürünlerde 2 alana 1 bedava."
    },
    {
        id: "7",
        name: "Yılbaşı Kampanyası",
        type: CampaignType.FixedDiscount,
        status: CampaignStatus.SonaErdi,
        discountValue: 2000,
        discountUnit: "TL",
        couponCode: "YILBASI2000",
        isSingleUse: true,
        usageCount: 89,
        usageLimit: 100,
        minOrderAmount: 20000,
        minProductCount: null,
        validCategories: [],
        validProducts: [],
        targetSegment: TargetSegment.Tümü,
        perUserLimit: 1,
        startDate: "2025-12-24",
        endDate: "2026-01-05",
        createdAt: "2025-12-15T08:00:00Z",
        revenue: 1780000,
        orders: 89,
        description: "Sezon sonu büyük yılbaşı indirimi."
    },
    {
        id: "8",
        name: "Yeni Üye Hoş Geldin",
        type: CampaignType.PercentDiscount,
        status: CampaignStatus.Aktif,
        discountValue: 5,
        discountUnit: "yüzde",
        couponCode: null,
        isSingleUse: true,
        usageCount: 56,
        usageLimit: null,
        minOrderAmount: null,
        minProductCount: null,
        validCategories: [],
        validProducts: [],
        targetSegment: TargetSegment.YeniUyeler,
        perUserLimit: 1,
        startDate: "2026-01-01",
        endDate: "2026-12-31",
        createdAt: "2025-12-30T16:00:00Z",
        revenue: 224400,
        orders: 56,
        description: "MAISON dünyasına hoş geldiniz! İlk alışverişinizde %5 indirim."
    }
];

export function formatPrice(n: number): string {
    return '₺' + n.toLocaleString('tr-TR');
}
