'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ImageIcon, X, Loader2 } from 'lucide-react';
import { useChat } from './hooks/useChat';
import { useVisualSearch } from './hooks/useVisualSearch';
import { useChatStore } from './store/chatStore';
import Image from 'next/image';
import { useGlobal } from '@/context/GlobalContext';


export function ChatInput() {
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const { sendMessage } = useChat();
    const { analyzeImage, isAnalyzing } = useVisualSearch();
    const isLoading = useChatStore((s) => s.isLoading);
    const { t } = useGlobal();

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
        }
    }, [text]);

    const handleSubmit = async () => {
        if (isLoading || isAnalyzing) return;
        if (imageFile) {
            await analyzeImage(imageFile);
            clearImage();
            return;
        }
        if (!text.trim()) return;
        const msg = text.trim();
        setText('');
        await sendMessage(msg);
    };

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const clearImage = () => {
        setImageFile(null);
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        if (fileRef.current) fileRef.current.value = '';
    };

    const hasContent = text.trim().length > 0 || imageFile !== null;

    return (
        <div className="flex-shrink-0" style={{ borderTop: '1px solid #F0EDE8', background: 'white' }}>
            {/* Image preview */}
            <AnimatePresence>
                {imagePreview && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="px-4 pt-3 overflow-hidden">
                        <div className="relative inline-block">
                            <Image src={imagePreview} alt="Preview" width={60} height={60}
                                className="object-cover" style={{ borderRadius: 8, width: 60, height: 60 }} />
                            <button onClick={clearImage} className="absolute flex items-center justify-center"
                                style={{ top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', background: '#E53935', border: '2px solid white', cursor: 'pointer' }}>
                                <X size={10} color="white" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input area */}
            <div className="flex items-end gap-2 px-4 py-3">
                {/* Image upload */}
                <button onClick={() => fileRef.current?.click()}
                    className="flex-shrink-0 flex items-center justify-center transition-colors"
                    style={{ width: 36, height: 36, borderRadius: '50%', background: 'transparent', border: 'none', cursor: 'pointer', color: '#999' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A96E'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#999'; }}>
                    <ImageIcon size={20} />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />

                {/* Textarea */}
                <textarea ref={textareaRef} value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKey}
                    placeholder={t('chat.input_placeholder') || 'Ask a question...'}
                    rows={1}
                    className="flex-1 resize-none outline-none"
                    style={{
                        minHeight: 40, maxHeight: 120, padding: '10px 16px',
                        border: '1px solid #E8E3DC', borderRadius: 20,
                        fontSize: 13, lineHeight: 1.5, background: 'white',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.background = 'white'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#E8E3DC'; }}
                />

                {/* Send button */}
                <motion.button onClick={handleSubmit}
                    animate={hasContent ? { scale: [0.9, 1] } : {}}
                    className="flex-shrink-0 flex items-center justify-center transition-all duration-200"
                    style={{
                        width: 36, height: 36, borderRadius: '50%', border: 'none',
                        background: hasContent ? '#1C1C1E' : '#E8E3DC',
                        color: hasContent ? 'white' : '#999',
                        cursor: hasContent ? 'pointer' : 'not-allowed',
                    }}
                    onMouseEnter={(e) => { if (hasContent) { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#1C1C1E'; } }}
                    onMouseLeave={(e) => { if (hasContent) { e.currentTarget.style.background = '#1C1C1E'; e.currentTarget.style.color = 'white'; } }}
                    disabled={!hasContent || isLoading}>
                    {isLoading || isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </motion.button>
            </div>
        </div>
    );
}
