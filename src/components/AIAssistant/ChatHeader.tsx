'use client';

import { Minus, X, Bot } from 'lucide-react';
import { useChatStore } from './store/chatStore';

export function ChatHeader() {
    const minimizeChat = useChatStore((s) => s.minimizeChat);
    const closeChat = useChatStore((s) => s.closeChat);
    const isMinimized = useChatStore((s) => s.isMinimized);
    const maximizeChat = useChatStore((s) => s.maximizeChat);


    return (
        <div className="flex items-center justify-between flex-shrink-0"
            style={{ height: 60, padding: '0 16px', background: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)' }}
            onClick={() => isMinimized && maximizeChat()}
        >
            {/* Left — avatar + name */}
            <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center"
                    style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A96E, #B8915A)' }}>
                    <Bot size={18} color="white" />
                    {/* Online dot */}
                    <div className="absolute" style={{ bottom: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: '#4CAF50', border: '1.5px solid #1C1C1E', animation: 'pulse-dot 2s infinite' }} />
                </div>
                <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Maison AI</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
                        <span style={{ color: '#4CAF50', marginRight: 4 }}>●</span>Çevrimiçi
                    </p>
                </div>
            </div>

            {/* Right — controls */}
            <div className="flex items-center gap-1">
                <button onClick={(e) => { e.stopPropagation(); isMinimized ? maximizeChat() : minimizeChat(); }}
                    className="flex items-center justify-center transition-colors duration-150"
                    style={{ width: 32, height: 32, borderRadius: 6, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
                    <Minus size={16} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); closeChat(); }}
                    className="flex items-center justify-center transition-colors duration-150"
                    style={{ width: 32, height: 32, borderRadius: 6, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
                    <X size={16} />
                </button>
            </div>

            <style jsx>{`@keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:0.5; } }`}</style>
        </div>
    );
}
