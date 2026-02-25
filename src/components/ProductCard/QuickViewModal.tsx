'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { ProductCardColors } from './ProductCardColors';
import { ProductCardRating } from './ProductCardRating';
import type { Product } from './product.types';
import { useCart } from '@/hooks/useCart';

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [selectedColorId, setSelectedColorId] = useState('');
    const { addItem } = useCart();

    // Reset selected color when product changes
    useEffect(() => {
        if (product) setSelectedColorId(product.colors[0]?.id ?? '');
    }, [product]);

    // Escape closes
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, onClose]);

    // Focus trap
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen]);

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isOpen]);

    const selectedColor = product?.colors.find((c) => c.id === selectedColorId) ?? product?.colors[0];
    const discount = product?.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <AnimatePresence>
            {isOpen && product && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0"
                        style={{
                            zIndex: 50,
                            background: 'rgba(0,0,0,0.6)',
                            backdropFilter: 'blur(4px)',
                        }}
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="quickview-title"
                        tabIndex={-1}
                        initial={{ opacity: 0, scale: 0.94, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed outline-none overflow-auto"
                        style={{
                            zIndex: 51,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: '768px',
                            width: '92vw',
                            maxHeight: '90vh',
                            background: 'white',
                            borderRadius: '4px',
                        }}
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            aria-label="Kapat"
                            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-white hover:bg-[#F5F0EB] transition-all duration-200"
                            style={{ zIndex: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}
                        >
                            <X size={16} />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Left — Image gallery */}
                            <div
                                className="relative md:w-1/2 flex-shrink-0"
                                style={{ aspectRatio: '3/4', background: '#F5F0EB', minHeight: '300px' }}
                            >
                                {selectedColor && (
                                    <Image
                                        src={selectedColor.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width:768px) 92vw, 384px"
                                        priority
                                    />
                                )}
                            </div>

                            {/* Right — Info */}
                            <div className="p-6 md:w-1/2 flex flex-col gap-3">
                                <span
                                    className="uppercase font-medium"
                                    style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#C9A96E' }}
                                >
                                    {product.brand}
                                </span>
                                <h2
                                    id="quickview-title"
                                    className="text-xl"
                                    style={{
                                        fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                                        fontWeight: 400,
                                        color: '#1C1C1E',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {product.name}
                                </h2>

                                <ProductCardRating rating={product.rating} slug={product.slug} />

                                {/* Price */}
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-lg font-bold" style={{ color: '#1C1C1E' }}>
                                        ₺{product.price.toLocaleString('tr-TR')}
                                    </span>
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-sm line-through" style={{ color: '#999' }}>
                                                ₺{product.originalPrice.toLocaleString('tr-TR')}
                                            </span>
                                            <span className="text-xs font-semibold px-1.5 py-0.5 rounded-sm" style={{ background: '#E53935', color: 'white' }}>
                                                %{discount}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Colors */}
                                {product.colors.length > 0 && (
                                    <div className="mt-2">
                                        <p className="text-[11px] mb-1.5" style={{ color: '#999' }}>
                                            Renk: <strong style={{ color: '#1C1C1E' }}>{selectedColor?.name}</strong>
                                        </p>
                                        <ProductCardColors
                                            colors={product.colors}
                                            selectedId={selectedColorId}
                                            onSelect={setSelectedColorId}
                                        />
                                    </div>
                                )}

                                {/* Description */}
                                {product.description && (
                                    <p className="text-sm leading-relaxed mt-2" style={{ color: 'rgba(28,28,30,0.6)' }}>
                                        {product.description}
                                    </p>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="flex-1 py-3 flex items-center justify-center gap-2 font-semibold tracking-wider uppercase transition-colors duration-200"
                                        style={{
                                            fontSize: '12px',
                                            background: '#1C1C1E',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '2px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (product) {
                                                addItem(
                                                    {
                                                        id: product.id,
                                                        name: product.name,
                                                        brand: product.brand,
                                                        price: product.price,
                                                        originalPrice: product.originalPrice ?? product.price,
                                                        image: selectedColor?.image ?? product.colors[0]?.image ?? '',
                                                        href: `/urun/${product.slug}`
                                                    },
                                                    { selectedColor: selectedColor?.name }
                                                );
                                                onClose();
                                            }
                                        }}
                                    >
                                        <ShoppingBag size={16} />
                                        Sepete Ekle
                                    </button>
                                    <button
                                        className="w-12 flex items-center justify-center rounded-sm transition-colors duration-200"
                                        style={{
                                            border: '1.5px solid rgba(0,0,0,0.12)',
                                            background: 'white',
                                            cursor: 'pointer',
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Favorilere ekle"
                                    >
                                        <Heart size={18} stroke="#1C1C1E" fill="transparent" />
                                    </button>
                                </div>

                                {/* PDP link */}
                                <Link
                                    href={`/urun/${product.slug}`}
                                    onClick={onClose}
                                    className="mt-3 text-center text-[12px] transition-colors duration-200 flex items-center justify-center gap-1"
                                    style={{ color: '#C9A96E', textDecoration: 'none' }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.textDecoration = 'underline';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.textDecoration = 'none';
                                    }}
                                >
                                    Ürün sayfasına git <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
