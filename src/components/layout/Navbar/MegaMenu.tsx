import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MegaMenuPanel } from './MegaMenuPanel';
import type { NavCategory } from './navbar.types';

interface MegaMenuProps {
    activeCategory: NavCategory | null;
    onClose: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    position?: 'left' | 'center' | 'right';
}

export const MegaMenu = memo(function MegaMenu({
    activeCategory,
    onClose,
    onMouseEnter,
    onMouseLeave,
    position = 'left',
}: MegaMenuProps) {
    return (
        <AnimatePresence>
            {activeCategory && (
                <>
                    {/* Background Click Catcher */}
                    <motion.div
                        className="fixed inset-0 z-[58] bg-black/5 dark:bg-black/20 backdrop-blur-[2px]"
                        style={{ top: '90px' }}
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* The MegaMenu Container */}
                    <motion.div
                        key={activeCategory.id}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        className="fixed left-4 right-4 md:left-auto md:right-auto md:w-full md:max-w-[850px] md:left-1/2 md:-translate-x-1/2 z-[70] overflow-hidden bg-[#FCFBF7]/98 dark:bg-black/98 backdrop-blur-xl border border-[#E5D5BC]/30 dark:border-white/10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.2)] rounded-3xl"
                        style={{
                            top: '90px'
                        }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        role="region"
                        aria-label={`${activeCategory.label} menüsü`}
                    >
                        <div className="w-full">
                            <MegaMenuPanel category={activeCategory} onClose={onClose} />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
});
