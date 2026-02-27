'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CategoryRevealButtonProps {
    label: string;
    isHovered: boolean;
}

export function CategoryRevealButton({
    label,
    isHovered,
}: CategoryRevealButtonProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={
                isHovered
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.85, y: 8 }
            }
            transition={{
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1], // spring
            }}
            className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-sm px-4 py-2 transition-colors duration-300"
            style={{
                background: isHovered
                    ? 'rgba(201,169,110,0.85)'
                    : 'rgba(255,255,255,0.12)',
                border: `1px solid ${isHovered ? 'rgba(201,169,110,0.5)' : 'rgba(255,255,255,0.3)'
                    }`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: isHovered ? '#1C1C1E' : 'white',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                zIndex: 5,
            }}
            aria-label={label}
        >
            <span data-lang-key="cat_btn_reveal">Keşfet</span>
            <motion.span
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <ArrowRight size={14} />
            </motion.span>
        </motion.div>
    );
}
