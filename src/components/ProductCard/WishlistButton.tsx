'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
    isWishlisted: boolean;
    onToggle: () => void;
    isCardHovered: boolean;
    productName: string;
}

export function WishlistButton({
    isWishlisted,
    onToggle,
    isCardHovered,
    productName,
}: WishlistButtonProps) {
    const [justAdded, setJustAdded] = useState(false);

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isWishlisted) {
                setJustAdded(true);
                setTimeout(() => setJustAdded(false), 600);
            }
            onToggle();
        },
        [isWishlisted, onToggle]
    );

    return (
        <div className="absolute top-3 right-3" style={{ zIndex: 10 }}>
            <motion.button
                onClick={handleClick}
                aria-label={isWishlisted ? `${productName} favorilerden çıkar` : `${productName} favorilere ekle`}
                aria-pressed={isWishlisted}
                className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200"
                style={{
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255,255,255,0.5)',
                }}
                initial={false}
                animate={{
                    opacity: isCardHovered || isWishlisted ? 1 : 0,
                    x: isCardHovered || isWishlisted ? 0 : 8,
                }}
                transition={{ duration: 0.25 }}
                whileHover={{ scale: 1.1, background: 'white' }}
                whileTap={{ scale: 0.9 }}
            >
                <motion.div
                    animate={justAdded ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <Heart
                        size={16}
                        style={{
                            fill: isWishlisted ? '#E53935' : 'transparent',
                            stroke: isWishlisted ? '#E53935' : '#1C1C1E',
                            transition: 'fill 200ms ease, stroke 200ms ease',
                        }}
                    />
                </motion.div>
            </motion.button>

            {/* Burst particles */}
            <AnimatePresence>
                {justAdded &&
                    [0, 1, 2, 3].map((i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                            animate={{
                                opacity: 0,
                                scale: 0,
                                x: [0, (i % 2 === 0 ? 1 : -1) * (12 + i * 4)],
                                y: [0, (i < 2 ? -1 : 1) * (10 + i * 3)],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ zIndex: 11 }}
                        >
                            <Heart size={8} fill="#E53935" stroke="none" />
                        </motion.span>
                    ))}
            </AnimatePresence>
        </div>
    );
}
