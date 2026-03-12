'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.warn('[Admin Error]', error);
    }, [error]);

    return (
        <div className="flex items-center justify-center min-h-[60vh] p-8">
            <div className="max-w-md text-center">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: 'rgba(255,69,58,0.1)' }}
                >
                    <AlertTriangle size={28} color="#FF453A" strokeWidth={1.5} />
                </div>

                <h2
                    className="text-xl font-semibold mb-2"
                    style={{ color: '#F5F0EB', fontFamily: "'Playfair Display', serif" }}
                >
                    Bir Hata Oluştu
                </h2>
                <p className="text-sm mb-6" style={{ color: '#636366' }}>
                    Bu sayfa yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
                        style={{ background: '#C9A96E', color: '#0F0F10' }}
                    >
                        <RefreshCw size={14} />
                        Tekrar Dene
                    </button>
                    <button
                        onClick={() => window.location.href = '/admin'}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
                        style={{ background: 'rgba(255,255,255,0.06)', color: '#AEAEB2', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        <ArrowLeft size={14} />
                        Dashboard
                    </button>
                </div>

                {error.digest && (
                    <p className="mt-8 text-[11px] font-mono" style={{ color: '#636366' }}>
                        Hata: {error.digest}
                    </p>
                )}
            </div>
        </div>
    );
}
