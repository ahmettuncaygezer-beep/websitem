'use client';

import React from 'react';
import { useGlobal } from '@/context/GlobalContext';
import { motion, AnimatePresence } from 'framer-motion';

export function AnnouncementBar() {
    const { siteSettings, language, t } = useGlobal();

    // Force text from translation store so it works bilingually
    const defaultText = t('announcement_text') || "🎁 İlk alışverişinize özel %10 indirim! Kod: SELIS10";
    const defaultConfig = {
        enabled: true,
        bg: '#1C1C1E',
        color: '#F5F0EB'
    };

    const config = siteSettings?.cms_announcement ? { ...defaultConfig, ...siteSettings.cms_announcement } : defaultConfig;

    if (!config?.enabled) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{
                    background: config.bg || '#C9A96E',
                    color: config.color || '#000000',
                    textAlign: 'center',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    position: 'relative',
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '36px'
                }}
            >
                {defaultText}
            </motion.div>
        </AnimatePresence>
    );
}
