'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface CartBadgeProps {
    count: number;
}

export function CartBadge({ count }: CartBadgeProps) {
    return (
        <AnimatePresence>
            {count > 0 && (
                <motion.span
                    key={count}
                    initial={{ scale: 1.4, backgroundColor: '#fff' }}
                    animate={{ scale: 1, backgroundColor: '#C9A96E' }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute -top-1 -right-1 flex items-center justify-center
                     w-4 h-4 rounded-full text-white font-bold"
                    style={{ fontSize: '9px' }}
                    aria-hidden="true"
                >
                    {count > 99 ? '99+' : count}
                </motion.span>
            )}
        </AnimatePresence>
    );
}
