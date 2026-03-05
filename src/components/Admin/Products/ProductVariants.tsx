'use client';

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import type { VariantGroup } from '@/types/admin/products';

interface ProductVariantsProps {
    variantGroups: VariantGroup[];
    onChange: (groups: VariantGroup[]) => void;
}

function generateCombinations(groups: VariantGroup[]): string[] {
    if (groups.length === 0) return [];
    const filled = groups.filter((g) => g.values.length > 0);
    if (filled.length === 0) return [];
    return filled.reduce<string[]>(
        (acc, group) => acc.flatMap((combo) => group.values.map((v) => combo ? `${combo} — ${v}` : v)),
        ['']
    );
}

interface ChipInputProps {
    values: string[];
    onAdd: (v: string) => void;
    onRemove: (v: string) => void;
}
function ChipInput({ values, onAdd, onRemove }: ChipInputProps) {
    const [input, setInput] = useState('');
    function commit() {
        const trimmed = input.trim();
        if (trimmed && !values.includes(trimmed)) { onAdd(trimmed); }
        setInput('');
    }
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', marginTop: '8px' }}>
            {values.map((v) => (
                <span key={v} style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '20px', padding: '3px 10px', fontSize: '12px', color: '#C9A96E', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {v}
                    <button onClick={() => onRemove(v)} style={{ background: 'transparent', border: 'none', color: 'rgba(201,169,110,0.6)', cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: '14px', transition: 'color 100ms' }} onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#C9A96E')} onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(201,169,110,0.6)')} aria-label={`${v} kaldır`}>×</button>
                </span>
            ))}
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); commit(); } }}
                onBlur={commit}
                placeholder="Değer ekle..."
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '3px 12px', fontSize: '12px', color: '#AEAEB2', outline: 'none', width: '110px', fontFamily: 'Inter, system-ui, sans-serif', transition: 'border-color 150ms' }}
                onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = 'rgba(201,169,110,0.4)')}
            />
        </div>
    );
}

interface CombinationRowProps {
    combo: string;
    index: number;
}
function CombinationRow({ combo, index }: CombinationRowProps) {
    const [priceModifier, setPriceModifier] = useState('0');
    const [stock, setStock] = useState('0');
    const [sku, setSku] = useState('');
    const [active, setActive] = useState(true);

    const inputStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px', padding: '4px 8px', fontSize: '12px', color: '#F5F0EB', outline: 'none', fontFamily: 'Inter, system-ui, sans-serif' };

    return (
        <div style={{ padding: '8px 14px', borderBottom: index > 0 ? '1px solid rgba(255,255,255,0.03)' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '12px', color: '#F5F0EB', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{combo}</span>
            <input value={priceModifier} onChange={(e) => setPriceModifier(e.target.value)} style={{ ...inputStyle, width: '70px' }} placeholder="+0" aria-label="Fiyat farkı" />
            <input value={stock} onChange={(e) => setStock(e.target.value)} style={{ ...inputStyle, width: '56px' }} type="number" min="0" aria-label="Stok" />
            <input value={sku} onChange={(e) => setSku(e.target.value)} style={{ ...inputStyle, width: '90px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }} placeholder="SKU" aria-label="SKU" />
            <div
                role="switch"
                aria-checked={active}
                onClick={() => setActive((v) => !v)}
                style={{ width: '28px', height: '16px', borderRadius: '8px', background: active ? '#C9A96E' : 'rgba(255,255,255,0.12)', position: 'relative', transition: 'background 150ms', cursor: 'pointer', flexShrink: 0 }}
            >
                <div style={{ position: 'absolute', top: '2px', left: active ? '14px' : '2px', width: '12px', height: '12px', borderRadius: '50%', background: '#fff', transition: 'left 150ms' }} />
            </div>
        </div>
    );
}

export function ProductVariants({ variantGroups, onChange }: ProductVariantsProps) {
    function addGroup() {
        onChange([...variantGroups, { id: `vg-${Date.now()}`, name: '', values: [] }]);
    }
    function removeGroup(id: string) {
        onChange(variantGroups.filter((g) => g.id !== id));
    }
    function updateGroupName(id: string, name: string) {
        onChange(variantGroups.map((g) => g.id === id ? { ...g, name } : g));
    }
    function addValue(id: string, value: string) {
        onChange(variantGroups.map((g) => g.id === id ? { ...g, values: [...g.values, value] } : g));
    }
    function removeValue(id: string, value: string) {
        onChange(variantGroups.map((g) => g.id === id ? { ...g, values: g.values.filter((v) => v !== value) } : g));
    }

    const combinations = generateCombinations(variantGroups);

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#F5F0EB', margin: 0 }}>Varyantlar</h3>
                <button
                    onClick={addGroup}
                    style={{ border: '1px solid rgba(201,169,110,0.3)', color: '#C9A96E', background: 'transparent', borderRadius: '5px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, system-ui, sans-serif', transition: 'all 150ms' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,169,110,0.08)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                    <Plus size={12} /> Varyant Ekle
                </button>
            </div>

            <div style={{ padding: '16px 20px' }}>
                {variantGroups.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px 0', fontSize: '13px', color: '#636366' }}>
                        Henüz varyant eklenmedi. "Varyant Ekle" ile Renk, Boyut gibi gruplar oluşturun.
                    </div>
                )}

                {variantGroups.map((group) => (
                    <div key={group.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '14px', marginBottom: '12px' }}>
                        {/* Group header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <input
                                value={group.name}
                                onChange={(e) => updateGroupName(group.id, e.target.value)}
                                placeholder="Grup adı (örn. Renk)"
                                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', fontWeight: 500, color: '#F5F0EB', fontFamily: 'Inter, system-ui, sans-serif', flex: 1 }}
                            />
                            <button
                                onClick={() => removeGroup(group.id)}
                                aria-label="Grubu sil"
                                style={{ background: 'transparent', border: 'none', color: '#636366', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center', transition: 'color 150ms' }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#FF453A')}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#636366')}
                            >
                                <X size={14} />
                            </button>
                        </div>
                        <ChipInput values={group.values} onAdd={(v) => addValue(group.id, v)} onRemove={(v) => removeValue(group.id, v)} />
                    </div>
                ))}

                {/* Combination table */}
                {combinations.length > 0 && (
                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '6px', overflow: 'hidden', marginTop: '16px' }}>
                        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '12px', fontWeight: 500, color: '#AEAEB2' }}>Tüm Kombinasyonlar</span>
                            <span style={{ fontSize: '11px', color: '#636366' }}>{combinations.length} adet</span>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <div style={{ padding: '6px 0' }}>
                                {combinations.map((combo, i) => (
                                    <CombinationRow key={combo} combo={combo} index={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
