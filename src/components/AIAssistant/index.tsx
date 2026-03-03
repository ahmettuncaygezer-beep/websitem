'use client';

import { useEffect } from 'react';
import { ChatButton } from './ChatButton';
import { ChatWindow, ChatWindowMobile } from './ChatWindow';
import { useChatStore } from './store/chatStore';

export default function AIAssistant() {
    const updateContext = useChatStore((s) => s.updateContext);
    const openChat = useChatStore((s) => s.openChat);

    // Expose chat control to window for non-react or distant components
    useEffect(() => {
        (window as any).SelisChat = {
            open: openChat
        };
    }, [openChat]);

    // Update context when page changes
    useEffect(() => {
        updateContext({ currentPage: window.location.pathname });

        // Check for saved style profile
        const savedStyle = localStorage.getItem('selis_style_profile');
        if (savedStyle) updateContext({ styleProfile: savedStyle });
    }, [updateContext]);

    return (
        <>
            {/* Desktop */}
            <div className="hidden md:block">
                <ChatWindow />
            </div>

            {/* Mobile */}
            <div className="md:hidden">
                <ChatWindowMobile />
            </div>

            {/* Floating button (always visible) */}
            <ChatButton />
        </>
    );
}
