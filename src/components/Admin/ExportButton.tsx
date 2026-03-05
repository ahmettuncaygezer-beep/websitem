'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { exportCSV, exportExcel } from '@/lib/exportUtils';

interface ExportButtonProps {
    type: 'orders' | 'customers' | 'products';
    data: any[];
    disabled?: boolean;
}

export default function ExportButton({ type, data, disabled }: ExportButtonProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleExport = async (format: 'csv' | 'excel') => {
        setOpen(false);
        setLoading(true);

        // Small delay so spinner renders
        await new Promise(r => setTimeout(r, 100));

        try {
            if (format === 'csv') {
                exportCSV(data, type);
            } else {
                exportExcel(data, type);
            }

            const label =
                type === 'orders' ? 'Siparişler' :
                    type === 'customers' ? 'Müşteriler' : 'Ürünler';
            toast.success(`${label} export tamamlandı, indirme başladı`, {
                style: {
                    background: '#1C1C1E',
                    color: '#F5F0EB',
                    border: '1px solid rgba(201,169,110,0.2)',
                    fontSize: '13px',
                },
                iconTheme: { primary: '#30D158', secondary: '#1C1C1E' },
            });
        } catch (err) {
            console.error('Export failed:', err);
            toast.error('Export sırasında bir hata oluştu', {
                style: {
                    background: '#1C1C1E',
                    color: '#FF453A',
                    border: '1px solid rgba(255,69,58,0.2)',
                    fontSize: '13px',
                },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button
                onClick={() => setOpen(o => !o)}
                disabled={disabled || loading || data.length === 0}
                style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    padding: '10px 16px',
                    fontSize: '12px',
                    color: loading ? '#C9A96E' : '#AEAEB2',
                    cursor: disabled || loading || data.length === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 200ms',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: disabled || data.length === 0 ? 0.5 : 1,
                    whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                    if (!loading && !disabled && data.length > 0)
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                }}
            >
                {loading ? (
                    <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                    <Download size={14} />
                )}
                {loading ? 'Hazırlanıyor...' : 'Dışa Aktar'}
            </button>

            {/* Format dropdown */}
            {open && !loading && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        right: 0,
                        background: '#2C2C2E',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '4px',
                        zIndex: 50,
                        minWidth: '160px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    }}
                >
                    <button
                        onClick={() => handleExport('csv')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            padding: '10px 12px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#F5F0EB',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 150ms',
                            textAlign: 'left',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <FileText size={16} style={{ color: '#30D158' }} />
                        <div>
                            <div style={{ fontWeight: 500 }}>CSV</div>
                            <div style={{ fontSize: '11px', color: '#636366', marginTop: '1px' }}>
                                Virgülle ayrılmış
                            </div>
                        </div>
                    </button>

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '2px 8px' }} />

                    <button
                        onClick={() => handleExport('excel')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            padding: '10px 12px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '6px',
                            color: '#F5F0EB',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 150ms',
                            textAlign: 'left',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,169,110,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <FileSpreadsheet size={16} style={{ color: '#0A84FF' }} />
                        <div>
                            <div style={{ fontWeight: 500 }}>Excel (.xlsx)</div>
                            <div style={{ fontSize: '11px', color: '#636366', marginTop: '1px' }}>
                                Microsoft Excel
                            </div>
                        </div>
                    </button>
                </div>
            )}

            {/* Spinner keyframes — injected once */}
            <style jsx global>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
