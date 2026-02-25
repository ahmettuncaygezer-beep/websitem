'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useCart } from '@/hooks/useCart';
import { mockProducts } from '@/data/mock-products';
import { AccountHeader } from '../AccountHeader';
import { EmptyState } from '../EmptyState';

export function WishlistGrid() {
    const router = useRouter();
    const { favorites, toggleFavorite } = useFavorites();
    const { addItem } = useCart();

    const items = mockProducts.filter((p) => favorites.includes(p.id));

    if (items.length === 0) {
        return (
            <div>
                <AccountHeader title={`Favorilerim (0)`} breadcrumbs={[{ label: 'Favorilerim' }]} />
                <EmptyState
                    icon="❤️"
                    title="Henüz favori ürün eklemediniz"
                    description="Beğendiğiniz ürünleri kalp ikonuna tıklayarak favorilerinize ekleyin."
                    action={{ label: 'Ürünleri Keşfet →', onClick: () => router.push('/kategori/oturma-odasi') }}
                />
            </div>
        );
    }

    return (
        <div>
            <AccountHeader title={`Favorilerim (${items.length})`} breadcrumbs={[{ label: 'Favorilerim' }]} />

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((product) => {
                    const hasDiscount = product.salePrice && product.salePrice < product.price;
                    const discountPct = hasDiscount ? Math.round((1 - product.salePrice! / product.price) * 100) : 0;

                    return (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="group relative overflow-hidden"
                            style={{ background: 'white', borderRadius: '8px', border: '1px solid #F0EDE8' }}
                        >
                            {/* Discount banner */}
                            {hasDiscount && (
                                <div className="absolute top-0 left-0 right-0 z-10 py-1 text-center text-[11px] font-bold" style={{ background: '#FF9800', color: 'white' }}>
                                    🔥 İndirime Girdi! %{discountPct} İndirim
                                </div>
                            )}

                            {/* Remove button */}
                            <button
                                onClick={() => toggleFavorite(product.id)}
                                className="absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all duration-200"
                                style={{ background: 'white', border: '1px solid #FFCDD2', cursor: 'pointer' }}
                            >
                                <Heart size={14} fill="#E53935" color="#E53935" />
                            </button>

                            {/* Image */}
                            <Link href={`/urun/${product.slug}`}>
                                <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${product.images[0]})`, backgroundColor: '#F0EDE8' }} />
                            </Link>

                            {/* Info */}
                            <div className="p-3">
                                <Link href={`/urun/${product.slug}`}>
                                    <p className="text-[13px] font-medium line-clamp-1" style={{ color: '#1C1C1E' }}>{product.name}</p>
                                </Link>
                                <p className="text-[11px] mt-0.5" style={{ color: '#999' }}>{product.brand}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[14px] font-bold" style={{ color: hasDiscount ? '#E53935' : '#1C1C1E' }}>
                                        ₺{(product.salePrice || product.price).toLocaleString('tr-TR')}
                                    </span>
                                    {hasDiscount && (
                                        <span className="text-[11px] line-through" style={{ color: '#999' }}>₺{product.price.toLocaleString('tr-TR')}</span>
                                    )}
                                </div>

                                {/* Add to cart */}
                                <button
                                    onClick={() => addItem({
                                        id: product.id,
                                        name: product.name,
                                        brand: product.brand || 'MAISON',
                                        price: product.salePrice || product.price,
                                        originalPrice: product.price,
                                        image: product.images[0],
                                        href: `/urun/${product.slug}`,
                                    })}
                                    className="w-full mt-2 py-2 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors duration-200"
                                    style={{ background: '#1C1C1E', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                                >
                                    <ShoppingBag size={12} /> Sepete Ekle
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
