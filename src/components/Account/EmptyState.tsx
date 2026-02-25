'use client';

import { motion } from 'framer-motion';

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon, title, description, action }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-16 px-4"
            style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}
        >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-lg font-semibold mb-1" style={{ color: '#1C1C1E', fontFamily: 'var(--font-playfair)' }}>
                {title}
            </h3>
            <p className="text-[13px] max-w-xs" style={{ color: '#999' }}>
                {description}
            </p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="mt-6 px-6 py-2.5 text-[13px] font-semibold transition-all duration-200"
                    style={{
                        background: '#1C1C1E',
                        color: 'white',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {action.label}
                </button>
            )}
        </motion.div>
    );
}
