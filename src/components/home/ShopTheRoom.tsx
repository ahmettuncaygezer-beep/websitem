'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingBag, X, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { getProducts, getProductBySlug } from '@/lib/api';
import { formatPrice } from '@/lib/constants';
import { Product } from '@/types';
import { useTranslationStore, translations } from '@/store/translationStore';

const ROOMS = [
    {
        id: 'living-room-1',
        title: 'Modern Oturma Odası',
        image: '/images/rooms/lookbook-1.jpg',
        hotspots: [
            { x: 25, y: 45, productSlug: 'luna-kose-koltuk' },
            { x: 55, y: 35, productSlug: 'nova-yemek-masasi' },
            { x: 75, y: 65, productSlug: 'orbit-sehpa' },
        ]
    }
];

export function ShopTheRoom() {
    const [activeRoomIndex] = useState(0);
    const [activeSpot, setActiveSpot] = useState<number | null>(null);
    const [products, setProducts] = useState<Record<string, Product>>({});
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();
    const { language } = useTranslationStore();
    const t = (key: string) => translations[language]?.[key];

    const currentRoom = ROOMS[activeRoomIndex];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const slugs = currentRoom.hotspots.map(h => h.productSlug);
            const loadedProducts: Record<string, Product> = {};

            for (const slug of slugs) {
                const p = await getProductBySlug(slug);
                if (p) loadedProducts[slug] = p;
            }

            setProducts(loadedProducts);
            setLoading(false);
        };
        fetchData();
    }, [activeRoomIndex, currentRoom.hotspots]);

    return (
        <section className="bg-sand py-20 md:py-28">
            <div className="container-premium">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14"
                >
                    <p className="text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4">
                        {t('shoproom_badge') || "İlham Verici"}
                    </p>
                    <h2 className="text-headline text-foreground">
                        {t('shoproom_title') || "Kombini Satın Al"}
                    </h2>
                    <p className="text-body-lg mt-4 max-w-lg mx-auto text-muted-foreground">
                        {t('shoproom_desc') || "İlham aldığınız görüntüden doğrudan alışveriş yapın."}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative rounded-3xl overflow-hidden aspect-[16/9] max-h-[600px] bg-white/50"
                >
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="animate-spin text-gold" size={40} />
                        </div>
                    ) : (
                        <>
                            {/* Room image */}
                            <Image
                                src="/images/rooms/lookbook-1.jpg"
                                alt="Lüks yaşam alanı"
                                fill
                                className="object-cover"
                                sizes="100vw"
                            />

                            {/* Hotspots */}
                            {currentRoom.hotspots.map((spot, index) => {
                                const product = products[spot.productSlug];
                                if (!product) return null;

                                return (
                                    <div
                                        key={index}
                                        className="absolute z-10"
                                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                                    >
                                        {/* Pulse dot */}
                                        <button
                                            onClick={() => setActiveSpot(activeSpot === index ? null : index)}
                                            className="relative w-10 h-10 -translate-x-1/2 -translate-y-1/2"
                                        >
                                            <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                                            <span className="absolute inset-2 rounded-full bg-white shadow-lg flex items-center justify-center">
                                                {activeSpot === index ? (
                                                    <X size={12} className="text-charcoal" />
                                                ) : (
                                                    <Plus size={12} className="text-charcoal" />
                                                )}
                                            </span>
                                        </button>

                                        {/* Product popover */}
                                        <AnimatePresence>
                                            {activeSpot === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute left-6 top-0 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden z-20"
                                                >
                                                    <div className="relative h-32">
                                                        <Image
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="p-4">
                                                        <p className="text-[10px] font-sans uppercase tracking-widest text-warm-gray-light mb-1">
                                                            {product.brand}
                                                        </p>
                                                        <p className="font-serif text-sm">{product.name}</p>
                                                        <div className="flex items-center justify-between mt-3">
                                                            <span className="font-sans font-bold text-sm">
                                                                {formatPrice(product.salePrice || product.price)}
                                                            </span>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    addItem({
                                                                        id: product.id,
                                                                        name: product.name,
                                                                        brand: product.brand ?? 'SELIS',
                                                                        price: product.salePrice || product.price,
                                                                        originalPrice: product.price,
                                                                        image: product.images[0],
                                                                        href: `/urun/${product.slug}`
                                                                    });
                                                                }}
                                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gold text-white text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full hover:bg-gold-dark transition-colors"
                                                            >
                                                                <ShoppingBag size={10} />
                                                                <span>{t('shoproom_btn_add') || "Ekle"}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </>
                    )}

                    {/* Bottom overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-charcoal/30 to-transparent pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
}
