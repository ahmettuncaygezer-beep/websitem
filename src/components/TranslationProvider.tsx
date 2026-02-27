'use client';

import { useEffect } from 'react';
import { useTranslationStore, translations } from '@/store/translationStore';

export default function TranslationProvider({ children }: { children: React.ReactNode }) {
    const language = useTranslationStore((state) => state.language);

    useEffect(() => {
        const translateElement = (el: Element) => {
            const key = el.getAttribute('data-lang-key');
            if (key && translations[language] && translations[language][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    (el as HTMLInputElement).placeholder = translations[language][key];
                } else {
                    el.textContent = translations[language][key];
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
        if (language === 'AR') {
            htmlParams.dir = 'rtl';
            htmlParams.lang = 'ar';
            document.body.classList.add('rtl-mode');
        } else {
            htmlParams.dir = 'ltr';
            htmlParams.lang = language.toLowerCase();
            document.body.classList.remove('rtl-mode');
        }

        // 3. Dynamic SEO Tags
        if (translations[language]) {
            if (translations[language].seo_title) {
                document.title = translations[language].seo_title;
            }
            if (translations[language].seo_desc) {
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) {
                    metaDesc.setAttribute('content', translations[language].seo_desc);
                }
            }
        }

        return () => {
            observer.disconnect();
        };
    }, [language]);

    return <>{children}</>;
}
