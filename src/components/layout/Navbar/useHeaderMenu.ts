'use client';

import * as React from 'react';
import { supabase } from '@/lib/supabase';
import type { NavCategory } from './navbar.types';

export function useHeaderMenu(initialCategories: NavCategory[]) {
    const [dynamicCategories, setDynamicCategories] = React.useState<NavCategory[]>(initialCategories);

    React.useEffect(() => {
        const fetchHeaderMenu = async () => {
            try {
                // Find 'header' menu
                const { data: menu } = await supabase
                    .from('menus')
                    .select('id')
                    .eq('handle', 'header')
                    .single();

                if (menu) {
                    const { data: items } = await supabase
                        .from('menu_items')
                        .select('*')
                        .eq('menu_id', menu.id)
                        .eq('is_active', true)
                        .order('sort_order', { ascending: true });

                    if (items && items.length > 0) {
                        const newCategories = items.map((item: any) => {
                            const existing = initialCategories.find(c => c.href === item.url || c.label.toLowerCase() === item.title.toLowerCase());
                            return {
                                id: item.id,
                                label: item.title,
                                href: item.url,
                                dataKey: existing?.dataKey || '', // Fallback or empty
                                subCategories: existing?.subCategories,
                                featuredProduct: existing?.featuredProduct,
                                editorialText: existing?.editorialText,
                                editorialTextKey: existing?.editorialTextKey,
                                promotionText: existing?.promotionText,
                                promotionTextKey: existing?.promotionTextKey,
                            };
                        });
                        setDynamicCategories(newCategories as NavCategory[]);
                    }
                }
            } catch (error) {
                console.error("Failed to load dynamic header menu:", error);
            }
        };

        fetchHeaderMenu();
    }, [initialCategories]);

    return { dynamicCategories };
}
