export type SubscriberStatus = 'active' | 'unsubscribed';
export type SubscriberSource = 'homepage-popup' | 'checkout' | 'blog' | 'social' | 'other';

export interface Subscriber {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    source: SubscriberSource;
    status: SubscriberStatus;
    subscribedAt: string;
    unsubscribedAt?: string;
    tags: string[];
}

export type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';

export interface EmailCampaign {
    id: string;
    subject: string;
    preheader?: string;
    content: string;
    targetSegment: string;
    scheduledAt?: string;
    sentAt?: string;
    status: CampaignStatus;
    stats?: {
        sent: number;
        delivered: number;
        opened: number;
        clicked: number;
        unsubscribed: number;
        bounced: number;
    };
    createdBy: string;
    createdAt: string;
}

export interface EmailTemplate {
    id: string;
    name: string;
    description: string;
    trigger: string;
    icon: string;
    htmlContent: string;
}

// Empty default — templates should be fetched from API
export const mockTemplates: EmailTemplate[] = [];
