'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Auto-reload on ChunkLoadError (stale JS chunks after dev server restart or deploy)
        if (
            error?.name === 'ChunkLoadError' ||
            error?.message?.includes('ChunkLoadError') ||
            error?.message?.includes('Loading chunk') ||
            error?.message?.includes('Failed to fetch dynamically imported module') ||
            error?.message?.includes('Module factory not available')
        ) {
            console.warn('[SELIS] ChunkLoadError detected — auto-reloading page...');
            window.location.reload();
            return;
        }

        console.warn('[SELIS Global Error]', error);
    }, [error]);

    return (
        <html>
            <body>
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    background: '#FAFAF8',
                    padding: '2rem',
                }}>
                    <div style={{ maxWidth: '480px', textAlign: 'center' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'rgba(201, 169, 110, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            fontSize: '28px',
                        }}>
                            ⚠️
                        </div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            color: '#1C1C1E',
                            marginBottom: '0.75rem',
                            fontWeight: 600,
                        }}>
                            Beklenmedik Bir Hata
                        </h1>
                        <p style={{
                            color: '#6B6560',
                            marginBottom: '2rem',
                            lineHeight: 1.6,
                        }}>
                            Bir şeyler ters gitti. Lütfen sayfayı yenileyin.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => window.location.reload()}
                                style={{
                                    padding: '0.75rem 2rem',
                                    background: '#1C1C1E',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Sayfayı Yenile
                            </button>
                            <button
                                onClick={reset}
                                style={{
                                    padding: '0.75rem 2rem',
                                    background: '#fff',
                                    color: '#1C1C1E',
                                    border: '1px solid #E8E2DB',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Tekrar Dene
                            </button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
