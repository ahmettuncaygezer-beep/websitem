import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useCallback } from 'react';

export function useCart() {
    const store = useCartStore();
    const { toast } = useToast();

    const addItem = useCallback((product: any, options?: any) => {
        store.addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            slug: product.slug || product.href?.split('/').pop() || '',
            selectedColor: options?.selectedColor,
        });

        toast.success(
            'Sepete Eklendi',
            `${product.name} başarıyla sepetinize eklendi.`
        );
    }, [store, toast]);

    return {
        ...store,
        addItem,
        // Bridge old API names if necessary
        getItemQuantity: (id: string) => store.items.find(i => i.id === id)?.quantity || 0,
        isInCart: (id: string) => store.items.some(i => i.id === id),
    };
}
