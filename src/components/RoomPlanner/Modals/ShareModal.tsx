import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Download } from 'lucide-react';
import { usePlannerStore } from '../plannerStore';
import html2canvas from 'html2canvas';

interface Props { open: boolean; onClose: () => void; }

export function ShareModal({ open, onClose }: Props) {
    const [copied, setCopied] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);

    const handleCapture = async () => {
        const area = document.querySelector('.bg-white.shadow-2xl') || document.querySelector('main');
        if (!area) return;

        setIsCapturing(true);
        try {
            const canvas = await html2canvas(area as HTMLElement, {
                useCORS: true,
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
            });
            const link = document.createElement('a');
            link.download = `MAISON_Plan_${new Date().getTime()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Capture failed', err);
        } finally {
            setIsCapturing(false);
        }
    };

    const getShareUrl = useCallback(() => {
        const state = usePlannerStore.getState();
        const data = { room: state.room, furniture: state.items, planName: state.planName };
        const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
        return `${window.location.origin}/oda-planlayici?plan=${encoded}`;
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getShareUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* fallback */ }
    };

    if (!open) return null;

    const url = getShareUrl();

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-50"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="w-full max-w-md mx-4 rounded-sm" style={{ background: 'white' }}>
                    <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #F0EDE8' }}>
                        <h2 className="text-[16px] font-semibold" style={{ color: '#1C1C1E' }} data-lang-key="plan_share_title">Planı Paylaş</h2>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}><X size={18} /></button>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* URL copy */}
                        <div>
                            <label className="text-[12px] font-medium block mb-1" style={{ color: '#999' }} data-lang-key="plan_share_link">Paylaşım Linki</label>
                            <div className="flex gap-2">
                                <input readOnly value={url}
                                    className="flex-1 px-3 py-2 text-[12px] rounded-sm outline-none"
                                    style={{ border: '1px solid #E8E3DC', color: '#666', background: '#FAFAF8' }} />
                                <button onClick={handleCopy}
                                    className="flex items-center gap-1 px-4 py-2 text-[12px] font-medium rounded-sm transition-colors duration-200"
                                    style={{ background: copied ? '#4CAF50' : '#1C1C1E', color: 'white', border: 'none', cursor: 'pointer' }}>
                                    {copied ? <><Check size={14} /> <span data-lang-key="plan_copied">Kopyalandı</span></> : <><Copy size={14} /> <span data-lang-key="plan_copy">Kopyala</span></>}
                                </button>
                            </div>
                        </div>

                        {/* Social buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleCapture}
                                disabled={isCapturing}
                                className="flex-1 py-2.5 flex items-center justify-center gap-2 text-[12px] font-medium rounded-sm border border-[#E8E3DC] hover:bg-[#F5F0EB] transition-colors"
                            >
                                <Download size={14} /> {isCapturing ? <span data-lang-key="plan_preparing">Hazırlanıyor...</span> : <span data-lang-key="plan_download_img">Görüntü İndir (PNG)</span>}
                            </button>
                        </div>

                        {/* Social buttons */}
                        <div className="flex gap-3">
                            <a href={`https://wa.me/?text=${encodeURIComponent(`MAISON Oda Planım: ${url}`)}`} target="_blank" rel="noopener"
                                className="flex-1 py-2.5 text-center text-[12px] font-medium rounded-sm transition-colors duration-150"
                                style={{ background: '#25D366', color: 'white', textDecoration: 'none' }}>
                                WhatsApp
                            </a>
                            <a href={`mailto:?subject=MAISON Oda Planım&body=${encodeURIComponent(url)}`}
                                className="flex-1 py-2.5 text-center text-[12px] font-medium rounded-sm transition-colors duration-150"
                                style={{ background: '#1C1C1E', color: 'white', textDecoration: 'none' }}>
                                E-posta
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
