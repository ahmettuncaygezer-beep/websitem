/**
 * MAISON UI Component Library — Barrel Export
 * ─────────────────────────────────────────────
 * Usage: import { Button, Badge, Toast, useToast } from '@/components/UI'
 */

// Button
export { Button } from './Button/Button';
export { buttonVariants } from './Button/button.variants';
export type { ButtonProps } from './Button/Button';
export type { ButtonVariantProps } from './Button/button.variants';

// Badge
export {
    Badge,
    NewBadge,
    SaleBadge,
    LimitedBadge,
    SoldOutBadge,
    TrendingBadge,
    FreeBadge,
} from './Badge/Badge';

// Typography
export { Heading } from './Typography/Heading';
export { Text } from './Typography/Text';
export { Label } from './Typography/Label';

// Divider
export { Divider } from './Divider/Divider';

// Icon
export { Icon } from './Icon/Icon';

// Spinner
export { Spinner } from './Spinner/Spinner';

// Toast
export { Toast } from './Toast/Toast';
export { ToastProvider, useToast } from './Toast/ToastProvider';
export type { ToastData, ToastType } from './Toast/Toast';
