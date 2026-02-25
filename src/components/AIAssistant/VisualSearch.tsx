'use client';

import { useRef } from 'react';
import { useVisualSearch } from './hooks/useVisualSearch';

export function VisualSearch() {
    const fileRef = useRef<HTMLInputElement>(null);
    const { analyzeImage, isAnalyzing } = useVisualSearch();

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) analyzeImage(file);
    };

    return (
        <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <button onClick={() => fileRef.current?.click()} disabled={isAnalyzing}
                className="flex items-center gap-2 w-full transition-colors"
                style={{
                    padding: '10px 14px', borderRadius: 8,
                    background: '#FDF8F0', border: '1px solid #E8E3DC',
                    fontSize: 12, color: '#1C1C1E', cursor: 'pointer',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C9A96E'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E8E3DC'; }}>
                📸 {isAnalyzing ? 'Analiz ediliyor…' : 'Fotoğrafla benzer ürün bul'}
            </button>
        </div>
    );
}
