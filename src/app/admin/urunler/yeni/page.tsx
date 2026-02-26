'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ProductForm } from '@/components/Admin/Products/ProductForm';

const easeOut: [number, number, number, number] = [0, 0, 0.2, 1];

export default function YeniUrunPage() {
    const router = useRouter();

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
                            Yeni Ürün Ekle
                        </h1>
                        <p style={{ fontSize: '12px', color: '#636366', margin: 0 }}>Tüm alanları doldurun ve yayınlayın</p>
                    </div>
                </div>
            </div>

            <ProductForm mode="create" />
        </motion.div>
    );
}
