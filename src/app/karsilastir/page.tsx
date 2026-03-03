import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ComparisonTable from '@/components/Marketing/ComparisonTable';
import { ComparisonClientWrapper } from './ComparisonClientWrapper';

export const metadata: Metadata = {
    title: 'Ürün Karşılaştırma | SELIS',
    description: 'Ürünleri yan yana karşılaştırın, en iyi seçimi yapın.',
};

export default function KarsilastirPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 py-10">
                {/* Üst bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 text-[12px] text-[#666] hover:text-[#1C1C1E] transition-colors mb-2"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Ürünlere Dön
                        </Link>
                        <h1
                            className="text-2xl md:text-3xl font-bold text-[#1C1C1E]"
                            style={{ fontFamily: 'var(--font-playfair), Playfair Display, serif' }}
                        >
                            Ürünleri Karşılaştırıyorsunuz
                        </h1>
                    </div>
                </div>

                <ComparisonClientWrapper />
            </div>
        </main>
    );
}
