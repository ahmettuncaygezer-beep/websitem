'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab { id: string; label: string; labelKey?: string; count?: number; content: React.ReactNode; }
interface Props { tabs: Tab[]; }

export function ProductTabs({ tabs }: Props) {
    const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
    const active = tabs.find((t) => t.id === activeId);

    return (
        <div id="reviews" className="mt-16 pt-12 border-t border-border">
            {/* Tab headers */}
            <div className="flex overflow-x-auto border-b border-border" style={{ scrollbarWidth: 'none' }} role="tablist">
                {tabs.map((tab) => {
                    const isActive = tab.id === activeId;
                    return (
                        <button key={tab.id} role="tab" aria-selected={isActive} onClick={() => setActiveId(tab.id)}
                            className="px-6 py-4 font-medium whitespace-nowrap transition-colors duration-200 bg-transparent cursor-pointer border-none border-b-2"
                            style={{
                                fontSize: '13px',
                                color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                                borderBottomColor: isActive ? 'var(--selis-gold)' : 'transparent',
                            }}>
                            <span data-lang-key={tab.labelKey}>{tab.label}</span>{tab.count !== undefined && <span className="ml-1" style={{ color: '#C9A96E' }}>({tab.count})</span>}
                        </button>
                    );
                })}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
                <motion.div key={activeId} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                    className="pt-8">
                    {active?.content}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
