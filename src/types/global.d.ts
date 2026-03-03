export { };

declare global {
    interface Window {
        SelisChat?: {
            open: () => void;
        };
        SelisSearch?: {
            open: () => void;
            close: () => void;
        };
        SelisPWA?: {
            trigger: () => void;
            install: () => Promise<void>;
        };
    }
}
