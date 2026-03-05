import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useCallback } from 'react';
import { useGlobal } from '@/context/GlobalContext';

export function useCart() {
    const store = useCartStore();
    const { toast } = useToast();
    const { t } = useGlobal();

    const addItem = useCallback((product: any, options?: any) => {
        store.addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            slug: product.slug || product.href?.split('/').pop() || '',
            selectedColor: options?.selectedColor,
        }, options?.quantity || 1);

        toast.success(
            t('cart_success_added') || 'Sepete Eklendi',
            `${product.name} ${t('cart_success_desc') || 'başarıyla sepetinize eklendi.'}`
        );
    }, [store, toast, t]);

    return {
        ...store,
        addItem,
        // Bridge old API names if necessary
        getItemQuantity: (id: string) => store.items.find(i => i.id === id)?.quantity || 0,
        isInCart: (id: string) => store.items.some(i => i.id === id),
    };
}
