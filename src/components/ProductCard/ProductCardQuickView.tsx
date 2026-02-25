'use client';

import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

interface ProductCardQuickViewProps {
    isCardHovered: boolean;
    onOpen: () => void;
    productName: string;
}

export function ProductCardQuickView({
    isCardHovered,
    onOpen,
    productName,
}: ProductCardQuickViewProps) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onOpen();
    };

    return (
        <motion.div
            className="absolute left-3 right-3"
            style={{ bottom: '52px', zIndex: 11 }}
            initial={false}
            animate={{
                opacity: isCardHovered ? 1 : 0,
                y: isCardHovered ? 0 : 8,
            }}
            transition={{
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1],
                delay: isCardHovered ? 0.05 : 0,
            }}
        >
            <button
                onClick={handleClick}
                aria-label={`${productName} hızlı görüntüle`}
                className="w-full py-2.5 flex items-center justify-center gap-2 font-medium tracking-wide transition-colors duration-200"
                style={{
                    fontSize: '12px',
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    borderRadius: '2px',
                    color: '#1C1C1E',
                    cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = '#1C1C1E';
                    el.style.color = 'white';
                    el.style.borderColor = '#1C1C1E';
                }}
                onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.92)';
                    el.style.color = '#1C1C1E';
                    el.style.borderColor = 'rgba(255,255,255,0.6)';
                }}
            >
                <Eye size={14} />
                Hızlı İncele
            </button>
        </motion.div>
    );
}
