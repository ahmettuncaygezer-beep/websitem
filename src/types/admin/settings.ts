// Re-export types from @/types/settings
export type {
    GeneralSettings,
    PaymentSettings,
    ShippingSettings,
    NotificationSettings,
    SecuritySession,
    LoginLog
} from '@/types/settings';

import { type SecuritySession, type LoginLog } from '@/types/settings';

// Empty defaults - will be replaced with API calls
export const mockSecuritySessions: SecuritySession[] = [];
export const mockLoginLogs: LoginLog[] = [];
