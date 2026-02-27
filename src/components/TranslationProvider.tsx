'use client';

import { useEffect } from 'react';
import { useGlobal } from '@/context/GlobalContext';
import { translations } from '@/lib/i18n';

export default function TranslationProvider({ children }: { children: React.ReactNode }) {
    const { language } = useGlobal();

    useEffect(() => {
        const translateElement = (el: Element) => {
            const key = el.getAttribute('data-lang-key');
            if (!key) return;

            // Handle nested keys like "hero.badge"
            const keys = key.split('.');
            let result: any = translations[language as keyof typeof translations];

            // Backwards compatibility for flat keys from old store
            if (!result[keys[0]] && result[key]) {
                result = result[key];
            } else {
                for (const k of keys) {
                    if (result && result[k]) {
                        result = result[k];
                    } else {
                        result = null;
                        break;
                    }
                }
            }

            if (result && typeof result === 'string') {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    (el as HTMLInputElement).placeholder = result;
                } else {
                    el.textContent = result;
                }
            }
        };

        const applyToNodes = (nodes: NodeList | Element[]) => {
            nodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const el = node as Element;
                    if (el.hasAttribute('data-lang-key')) {
                        translateElement(el);
                    }
                    if (el.querySelectorAll) {
                        el.querySelectorAll('[data-lang-key]').forEach(translateElement);
                    }
                }
            });
        };

        // 1. apply Language to all current data-lang-key elements
        applyToNodes([document.documentElement]);

        // 1.5. Watch for dynamically added elements (like MegaMenu)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    applyToNodes(mutation.addedNodes);
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // 2. RTL Handling for Arabic
        const htmlParams = document.documentElement;
        if (language === 'ar') {
            htmlParams.dir = 'rtl';
            htmlParams.lang = 'ar';
            document.body.classList.add('rtl-mode');
        } else {
            htmlParams.dir = 'ltr';
            htmlParams.lang = language;
            document.body.classList.remove('rtl-mode');
        }

        // 3. Dynamic SEO Tags
        const langDict: any = translations[language as keyof typeof translations];
        if (langDict) {
            if (langDict.seo_title) {
                document.title = langDict.seo_title;
            } else if (langDict.seo && langDict.seo.title) {
                document.title = langDict.seo.title;
            }
        }

        return () => {
            observer.disconnect();
        };
    }, [language]);

    return <>{children}</>;
}
