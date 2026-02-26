'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Bold, Italic, Underline, List, ListOrdered,
    Quote, Code, ImageIcon, Link as LinkIcon,
    Type, Heading2, Heading3
} from 'lucide-react';

interface BlogEditorProps {
    title: string;
    onTitleChange: (v: string) => void;
    content: string;
    onContentChange: (v: string) => void;
    slug: string;
    onSlugChange: (v: string) => void;
}

export function BlogEditor({ title, onTitleChange, content, onContentChange, slug, onSlugChange }: BlogEditorProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Title & Slug Area */}
            <section>
                <textarea
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Yazının başlığını buraya girin..."
                    style={{
                        width: '100%', background: 'transparent', border: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 500,
                        color: '#F5F0EB', outline: 'none', resize: 'none', minHeight: '60px',
                        padding: '20px 0'
                    }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                    <LinkIcon size={14} color="#636366" />
                    <span style={{ fontSize: '12px', color: '#636366' }}>maison.com.tr/blog/</span>
                    <input
                        type="text" value={slug} onChange={(e) => onSlugChange(e.target.value)}
                        style={{
                            background: 'transparent', border: 'none', color: '#C9A96E',
                            fontSize: '12px', fontFamily: "'JetBrains Mono', monospace",
                            outline: 'none', width: 'auto'
                        }}
                    />
                </div>
            </section>

            {/* Editor Main */}
            <section style={{
                background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '8px', overflow: 'hidden'
            }}>
                {/* Toolbar */}
                <div style={{
                    padding: '12px', background: '#242426', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', gap: '4px', flexWrap: 'wrap'
                }}>
                    <ToolbarGroup>
                        <ToolbarBtn icon={<Bold size={16} />} />
                        <ToolbarBtn icon={<Italic size={16} />} />
                        <ToolbarBtn icon={<Underline size={16} />} />
                    </ToolbarGroup>
                    <div style={dividerStyle} />
                    <ToolbarGroup>
                        <ToolbarBtn icon={<Heading2 size={16} />} />
                        <ToolbarBtn icon={<Heading3 size={16} />} />
                    </ToolbarGroup>
                    <div style={dividerStyle} />
                    <ToolbarGroup>
                        <ToolbarBtn icon={<List size={16} />} />
                        <ToolbarBtn icon={<ListOrdered size={16} />} />
                    </ToolbarGroup>
                    <div style={dividerStyle} />
                    <ToolbarGroup>
                        <ToolbarBtn icon={<Quote size={16} />} />
                        <ToolbarBtn icon={<Code size={16} />} />
                    </ToolbarGroup>
                    <div style={dividerStyle} />
                    <ToolbarGroup>
                        <ToolbarBtn icon={<ImageIcon size={16} />} />
                        <ToolbarBtn icon={<LinkIcon size={16} />} />
                    </ToolbarGroup>
                </div>

                {/* Text Area */}
                <textarea
                    value={content}
                    onChange={(e) => onContentChange(e.target.value)}
                    placeholder="İçeriğinizi yazmaya başlayın..."
                    style={{
                        width: '100%', minHeight: '600px', background: 'transparent', border: 'none',
                        padding: '32px', color: '#F5F0EB', fontSize: '18px', lineHeight: 1.8,
                        fontFamily: "'Playfair Display', serif", outline: 'none', resize: 'none'
                    }}
                />

                {/* Stats Footer */}
                <div style={{ padding: '8px 20px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '16px' }}>
                    <span style={{ fontSize: '11px', color: '#636366' }}>{content.split(/\s+/).filter(Boolean).length} kelime</span>
                    <span style={{ fontSize: '11px', color: '#636366' }}>Tahmini okuma: {Math.ceil(content.split(/\s+/).length / 200)} dk</span>
                </div>
            </section>
        </div>
    );
}

function ToolbarGroup({ children }: { children: React.ReactNode }) {
    return <div style={{ display: 'flex', gap: '2px' }}>{children}</div>;
}

function ToolbarBtn({ icon, active, onClick }: { icon: React.ReactNode, active?: boolean, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            style={{
                width: '32px', height: '32px', borderRadius: '4px', border: 'none', background: active ? 'rgba(201,169,110,0.1)' : 'transparent',
                color: active ? '#C9A96E' : '#AEAEB2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transition: 'all 200ms'
            }}
            title="Format"
        >
            {icon}
        </button>
    );
}

const dividerStyle = { width: '1px', height: '24px', background: 'rgba(255,255,255,0.06)', margin: '4px' };
