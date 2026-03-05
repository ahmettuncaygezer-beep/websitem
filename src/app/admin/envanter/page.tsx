'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search, Edit2, Box, Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AdminInventoryPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await fetch('/api/admin/inventory');
                if (!res.ok) throw new Error('Envanter yüklenemedi');
                const data = await res.json();
                setProducts(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-serif text-charcoal flex items-center gap-3">
                        Envanter & Stok Yönetimi
                        {loading && <Loader2 size={16} className="animate-spin text-warm-gray" />}
                    </h1>
                    <p className="text-sm font-sans text-warm-gray mt-1">Ürünlerin anlık stok ve genel durumları.</p>
                </div>
            </div>

            {/* List View */}
            <div className="bg-white rounded-[32px] border border-border overflow-hidden">
                <div className="p-8 border-b border-border flex items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-warm-gray" size={18} />
                        <input
                            placeholder="Ürün veya kategori ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-4 py-3 bg-sand/10 rounded-2xl border-none text-sm font-sans focus:outline-none focus:ring-1 focus:ring-gold/50"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                        <thead className="bg-[#FBFAFA] border-b border-border">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-sans font-bold text-warm-gray uppercase tracking-[0.2em] w-16">DURUM</th>
                                <th className="px-8 py-5 text-[10px] font-sans font-bold text-warm-gray uppercase tracking-[0.2em]">Ürün</th>
                                <th className="px-8 py-5 text-[10px] font-sans font-bold text-warm-gray uppercase tracking-[0.2em]">Stok</th>
                                <th className="px-8 py-5 text-[10px] font-sans font-bold text-warm-gray uppercase tracking-[0.2em]">Fiyat</th>
                                <th className="px-8 py-5 text-[10px] font-sans font-bold text-warm-gray uppercase tracking-[0.2em]">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border relative">
                            {loading && filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-warm-gray text-sm">Veriler yükleniyor...</td>
                                </tr>
                            )}
                            {!loading && filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-warm-gray text-sm">Gösterilecek ürün veya varlık bulunamadı.</td>
                                </tr>
                            )}
                            {filteredProducts.map(product => {
                                const isLowStock = product.stock > 0 && product.stock <= 5;
                                const isOutOfStock = product.stock === 0;

                                return (
                                    <tr key={product.id} className="hover:bg-sand/10 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center 
                                                ${product.is_active ? 'bg-charcoal text-gold' : 'bg-warm-gray/10 text-warm-gray'}
                                            `}>
                                                <Box size={20} />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-sans font-bold text-charcoal">{product.title}</div>
                                            <div className="text-[10px] font-sans text-warm-gray uppercase mt-1">{product.category_name}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full 
                                                    ${isOutOfStock ? 'bg-terracotta' : isLowStock ? 'bg-yellow-500' : 'bg-green-500'}
                                                `} />
                                                <span className={`text-sm font-sans font-medium
                                                    ${isOutOfStock ? 'text-terracotta' : isLowStock ? 'text-yellow-600' : 'text-charcoal'}
                                                `}>
                                                    {isOutOfStock ? 'Tükendi' : `${product.stock} Adet`}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-sans font-bold">₺{Number(product.price).toLocaleString('tr-TR')}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => router.push(`/admin/urunler?search=${encodeURIComponent(product.title)}`)}
                                                    className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border transition-all"
                                                    title="Ürünü Düzenle"
                                                >
                                                    <Edit2 size={16} className="text-warm-gray hover:text-gold" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
