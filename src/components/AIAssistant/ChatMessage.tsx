'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import type { ChatMessage as ChatMessageType } from './types/ai.types';
import { ChatProductCard } from './ChatProductCard';

interface Props { message: ChatMessageType; }

export function ChatMessage({ message }: Props) {
    const isUser = message.role === 'user';
    const time = new Date(message.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-2 px-4 py-1`}
        >
            {/* AI avatar */}
            {!isUser && (
                <div className="flex-shrink-0 mt-1"
                    style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A96E, #B8915A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 11, color: 'white', fontWeight: 700 }}>AI</span>
                </div>
            )}

            <div style={{ maxWidth: isUser ? '85%' : '90%' }}>
                {/* User image */}
                {isUser && message.imageUrl && (
                    <div className="mb-1 overflow-hidden" style={{ borderRadius: '12px 12px 0 0', maxHeight: 200 }}>
                        <Image src={message.imageUrl} alt="Uploaded" width={280} height={200} className="w-full object-cover" />
                    </div>
                )}

                {/* Bubble */}
                <div style={{
                    background: isUser ? '#1C1C1E' : '#F5F0EB',
                    color: isUser ? 'white' : '#1C1C1E',
                    borderRadius: isUser ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                    padding: '10px 14px', fontSize: 13, lineHeight: 1.6,
                }}>
                    {isUser ? (
                        <span>{message.content}</span>
                    ) : (
                        <div className="prose prose-sm max-w-none" style={{ fontSize: 13 }}>
                            <ReactMarkdown
                                components={{
                                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                    em: ({ children }) => <em className="italic">{children}</em>,
                                    code: ({ children }) => <code style={{ background: '#E8E3DC', padding: '1px 4px', borderRadius: 3, fontSize: 12 }}>{children}</code>,
                                    ul: ({ children }) => <ul style={{ paddingLeft: 16, marginTop: 4 }}>{children}</ul>,
                                    li: ({ children }) => <li style={{ marginBottom: 2 }}>{children}</li>,
                                }}
                            >{message.content}</ReactMarkdown>
                            {message.isStreaming && <span className="inline-block" style={{ animation: 'blink 0.8s infinite' }}>▋</span>}
                        </div>
                    )}
                </div>

                {/* Timestamp */}
                <p style={{ fontSize: 10, color: '#999', marginTop: 4, textAlign: isUser ? 'right' : 'left' }}>{time}</p>

                {/* Product cards */}
                {message.products && message.products.length > 0 && (
                    <div className="mt-2">
                        <ChatProductCard products={message.products} />
                    </div>
                )}
            </div>

            <style jsx>{`@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }`}</style>
        </motion.div>
    );
}
