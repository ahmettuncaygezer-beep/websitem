'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ProductForm } from '@/components/Admin/Products/ProductForm';
import { mockProducts } from '@/lib/mock/products';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

interface EditProductPageProps {
    params: { id: string };
}

export default function UrunDuzenlePage({ params }: EditProductPageProps) {
    const router = useRouter();
    const product = mockProducts.find((p) => p.id === params.id);

    if (!product) {
        return (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#636366' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
                <div style={{ fontSize: '18px', color: '#AEAEB2', marginBottom: '8px' }}>Ürün bulunamadı</div>
                <button onClick={() => router.push('/admin/urunler')} style={{ fontSize: '13px', color: '#C9A96E', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                    Ürünler listesine dön
                </button>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
        >
            {/* Page header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <button
                        onClick={() => router.back()}
                        aria-label="Geri"
                        style={{ width: '34px', height: '34px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#AEAEB2', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 150ms' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)'; }}
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 500, color: '#F5F0EB', margin: '0 0 2px' }}>
                            {product.name} Düzenle
                        </h1>
                        <p style={{ fontSize: '12px', color: '#636366', margin: 0 }}>
                            SKU: <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{product.sku}</span>
                        </p>
                    </div>
                </div>

                {/* View on site link */}
                <a
                    href={`/urunler/${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#AEAEB2', textDecoration: 'none', padding: '7px 14px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', background: 'transparent', transition: 'all 150ms' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#C9A96E'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,169,110,0.3)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#AEAEB2'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                    Ürünü Görüntüle <ExternalLink size={12} />
                </a>
            </div>

            <ProductForm product={product} mode="edit" />
        </motion.div>
    );
}
