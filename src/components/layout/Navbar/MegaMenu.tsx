import { useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MegaMenuPanel } from './MegaMenuPanel';
import type { NavCategory } from './navbar.types';

interface MegaMenuProps {
    activeCategory: NavCategory | null;
    onClose: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export const MegaMenu = memo(function MegaMenu({
    activeCategory,
    onClose,
    onMouseEnter,
    onMouseLeave,
}: MegaMenuProps) {
    return (
        <AnimatePresence>
            {activeCategory && (
                <motion.div
                    key={activeCategory.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease }}
                    className="fixed left-0 right-0 z-[49] overflow-hidden"
                    style={{
                        top: '72px',
                        background: 'rgba(255,255,255,0.98)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderTop: '2px solid #C9A96E',
                        borderBottom: '1px solid rgba(0,0,0,0.06)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                    }}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    role="region"
                    aria-label={`${activeCategory.label} menüsü`}
                >
                    <MegaMenuPanel category={activeCategory} onClose={onClose} />
                </motion.div>
            )}
        </AnimatePresence>
    );
});
