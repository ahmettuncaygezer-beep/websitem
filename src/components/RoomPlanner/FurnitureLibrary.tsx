'use client';

import React, { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { plannerMockData } from './planner.data';
import FurnitureCard from './FurnitureCard';
import { FurnitureCategory } from './planner.types';

const CATEGORIES: { label: string; value: FurnitureCategory | 'All'; langKey: string }[] = [
    { label: 'Tümü', value: 'All', langKey: 'planner_tab_all' },
    { label: 'Koltuklar', value: 'Sofa', langKey: 'planner_tab_sofas' },
    { label: 'Sandalye', value: 'Chair', langKey: 'planner_tab_chairs' },
    { label: 'Yatak', value: 'Bed', langKey: 'planner_tab_beds' },
    { label: 'Masa', value: 'Table', langKey: 'planner_tab_tables' },
    { label: 'Gardırop', value: 'Wardrobe', langKey: 'planner_tab_wardrobes' },
    { label: 'Aydınlatma', value: 'Lighting', langKey: 'planner_tab_lighting' },
    { label: 'Dekorasyon', value: 'Decoration', langKey: 'planner_tab_decor' },
];

export default function FurnitureLibrary({ onClose }: { onClose: () => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<FurnitureCategory | 'All'>('All');

    // Filter logic
    const filteredProducts = plannerMockData.filter(product => {
        const matchesTab = activeTab === 'All' || product.category === activeTab;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="flex flex-col h-full bg-[#FAFAF9] relative">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#E8E3DC]/60 bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <h2 className="text-[15px] font-semibold text-[#1C1C1E] tracking-wide" data-lang-key="planner_library">Kütüphane</h2>
                <button onClick={onClose} className="text-[#999] hover:bg-[#F5F0EB] p-1.5 rounded-full hover:text-[#1C1C1E] transition-colors">
                    <X size={18} />
                </button>
            </div>

            {/* Search */}
            <div className="px-5 py-4 border-b border-[#E8E3DC]/60 bg-white/50">
                <div className="relative flex items-center group">
                    <Search className="absolute left-4 text-[#999] group-focus-within:text-[#C9A96E] transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Mobilya ara..."
                        data-lang-key="planner_search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#f8f6f3] border border-transparent rounded-full py-2.5 pl-11 pr-10 text-[13px] text-[#1C1C1E] focus:outline-none focus:bg-white focus:border-[#C9A96E] focus:ring-4 focus:ring-[#C9A96E]/10 transition-all placeholder-[#999]"
                    />
                    <button className="absolute right-4 text-[#999] hover:text-[#1C1C1E] transition-colors">
                        <SlidersHorizontal size={14} />
                    </button>
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar border-b border-[#E8E3DC]/60 bg-white px-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.label}
                        onClick={() => setActiveTab(cat.value)}
                        className={`flex-shrink-0 px-4 py-3 text-[12px] whitespace-nowrap transition-all border-b-2 font-medium relative
                            ${activeTab === cat.value
                                ? 'border-[#C9A96E] text-[#C9A96E]'
                                : 'border-transparent text-[#999] hover:text-[#1C1C1E] hover:bg-[#FAFAF9] rounded-t-lg'
                            }
                        `}
                        data-lang-key={cat.langKey}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                <div className="grid grid-cols-2 gap-3">
                    {filteredProducts.map((product) => (
                        <FurnitureCard key={product.id} product={product} />
                    ))}
                </div>
                {filteredProducts.length === 0 && (
                    <div className="mt-10 text-center text-[#999] text-[13px]" data-lang-key="planner_not_found">
                        Aradığınız kriterlere uygun ürün bulunamadı.
                    </div>
                )}
            </div>
        </div>
    );
}
