export { };

declare global {
    interface Window {
        MaisonChat?: {
            open: () => void;
        };
        MaisonSearch?: {
            open: () => void;
            close: () => void;
        };
        MaisonPWA?: {
            trigger: () => void;
            install: () => Promise<void>;
        };
    }
}
