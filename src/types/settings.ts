export interface GeneralSettings {
    siteName: string;
    siteSlogan: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    supportEmail: string;
    currency: 'TRY' | 'USD' | 'EUR' | 'GBP';
    currencyFormat: string;
    defaultLanguage: 'tr' | 'en';
    timezone: string;
    dateFormat: string;
    maintenanceMode: {
        enabled: boolean;
        message: string;
        allowedIps: string[];
        estimatedEnd?: string;
    };
    analytics: {
        googleAnalyticsId?: string;
        googleSearchConsoleCode?: string;
        facebookPixelId?: string;
        claritySiteId?: string;
        hotjarSiteId?: string;
    };
    logo?: string;
    favicon?: string;
}

export interface BankAccount {
    id: string;
    bankName: string;
    accountHolder: string;
    iban: string;
}

export interface PaymentSettings {
    iyzico: {
        enabled: boolean;
        environment: 'sandbox' | 'production';
        sandboxApiKey: string;
        sandboxSecretKey: string;
        liveApiKey: string;
        liveSecretKey: string;
    };
    paytr: {
        enabled: boolean;
        merchantId: string;
        merchantKey: string;
        merchantSalt: string;
        require3d: boolean;
    };
    cashOnDelivery: {
        enabled: boolean;
        extraFee: number;
        minOrderAmount: number;
        allowedCities: string[];
    };
    bankTransfer: {
        enabled: boolean;
        accounts: BankAccount[];
        customerMessage: string;
    };
    installments: {
        enabled: boolean;
        minAmount: number;
        banks: Record<string, number[]>; // Bank name -> array of allowed installments
    };
}

export interface ShippingCarrier {
    id: string;
    name: string;
    logo: string;
    enabled: boolean;
    apiConfig: Record<string, string>;
    autoLabel: boolean;
    trackingSms: boolean;
}

export interface WeightRule {
    id: string;
    fromWeight: number;
    toWeight: number;
    price: number;
}

export interface ShippingSettings {
    carriers: ShippingCarrier[];
    freeShippingThreshold: number;
    freeShippingEnabled: boolean;
    weightRules: WeightRule[];
    deliveryTimes: {
        inCity: [number, number];
        outOfCity: [number, number];
        eastRegion: [number, number];
    };
    customerNote: string;
}

export interface NotificationSettings {
    adminEmails: string[];
    emailNotifications: Record<string, boolean>;
    sms: {
        enabled: boolean;
        provider: 'netgsm' | 'iletimerkezi' | 'twilio';
        username: string;
        password: string;
        senderName: string;
        events: Record<string, boolean>;
    };
}

export interface SecuritySession {
    id: string;
    device: 'desktop' | 'laptop' | 'mobile' | 'tablet';
    browser: string;
    os: string;
    ip: string;
    location: string;
    lastActive: string;
    isCurrent: boolean;
}

export interface LoginLog {
    id: string;
    status: 'success' | 'failed' | 'suspicious';
    timestamp: string;
    ip: string;
    location: string;
    browser: string;
    failedCount?: number;
}
