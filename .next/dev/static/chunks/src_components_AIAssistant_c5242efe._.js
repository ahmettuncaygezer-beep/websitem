(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/AIAssistant/store/chatStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChatStore",
    ()=>useChatStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const MAX_MESSAGES = 50;
const useChatStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        messages: [],
        isOpen: false,
        isMinimized: false,
        isLoading: false,
        sessionId: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36),
        context: {
            currentPage: ("TURBOPACK compile-time truthy", 1) ? window.location.pathname : "TURBOPACK unreachable"
        },
        openChat: ()=>set({
                isOpen: true,
                isMinimized: false
            }),
        closeChat: ()=>set({
                isOpen: false
            }),
        minimizeChat: ()=>set({
                isMinimized: true
            }),
        maximizeChat: ()=>set({
                isMinimized: false
            }),
        addMessage: (msg)=>set((s)=>({
                    messages: [
                        ...s.messages.slice(-MAX_MESSAGES + 1),
                        {
                            id: crypto.randomUUID(),
                            timestamp: new Date(),
                            ...msg
                        }
                    ]
                })),
        updateLastMessage: (content, extras)=>set((s)=>{
                const msgs = [
                    ...s.messages
                ];
                const last = msgs[msgs.length - 1];
                if (last?.role === 'assistant') {
                    msgs[msgs.length - 1] = {
                        ...last,
                        content,
                        ...extras
                    };
                }
                return {
                    messages: msgs
                };
            }),
        setLoading: (isLoading)=>set({
                isLoading
            }),
        updateContext: (ctx)=>set((s)=>({
                    context: {
                        ...s.context,
                        ...ctx
                    }
                })),
        clearMessages: ()=>set({
                messages: []
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/ChatHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatHeader",
    ()=>ChatHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/store/chatStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ChatHeader() {
    _s();
    const minimizeChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatHeader.useChatStore[minimizeChat]": (s)=>s.minimizeChat
    }["ChatHeader.useChatStore[minimizeChat]"]);
    const closeChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatHeader.useChatStore[closeChat]": (s)=>s.closeChat
    }["ChatHeader.useChatStore[closeChat]"]);
    const isMinimized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatHeader.useChatStore[isMinimized]": (s)=>s.isMinimized
    }["ChatHeader.useChatStore[isMinimized]"]);
    const maximizeChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatHeader.useChatStore[maximizeChat]": (s)=>s.maximizeChat
    }["ChatHeader.useChatStore[maximizeChat]"]);
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            height: 60,
            padding: '0 16px',
            background: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)'
        },
        onClick: ()=>isMinimized && maximizeChat(),
        className: "jsx-ddf612487bf57859" + " " + "flex items-center justify-between flex-shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-ddf612487bf57859" + " " + "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #C9A96E, #B8915A)'
                        },
                        className: "jsx-ddf612487bf57859" + " " + "relative flex items-center justify-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                size: 18,
                                color: "white"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                                lineNumber: 23,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    bottom: -1,
                                    right: -1,
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    background: '#4CAF50',
                                    border: '1.5px solid #1C1C1E',
                                    animation: 'pulse-dot 2s infinite'
                                },
                                className: "jsx-ddf612487bf57859" + " " + "absolute"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                                lineNumber: 25,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                        lineNumber: 21,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-ddf612487bf57859",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: 'white'
                                },
                                className: "jsx-ddf612487bf57859",
                                children: "Selis AI"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                                lineNumber: 28,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: 'rgba(255,255,255,0.6)'
                                },
                                className: "jsx-ddf612487bf57859",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#4CAF50',
                                            marginRight: 4
                                        },
                                        className: "jsx-ddf612487bf57859",
                                        children: "●"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                                        lineNumber: 30,
                                        columnNumber: 25
                                    }, this),
                                    t('chat.online') || 'Online'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                                lineNumber: 29,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-ddf612487bf57859" + " " + "flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            isMinimized ? maximizeChat() : minimizeChat();
                        },
                        style: {
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(255,255,255,0.6)',
                            cursor: 'pointer'
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.color = 'white';
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                        },
                        className: "jsx-ddf612487bf57859" + " " + "flex items-center justify-center transition-colors duration-150",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                            lineNumber: 43,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            closeChat();
                        },
                        style: {
                            width: 32,
                            height: 32,
                            borderRadius: 6,
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(255,255,255,0.6)',
                            cursor: 'pointer'
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.color = 'white';
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                        },
                        className: "jsx-ddf612487bf57859" + " " + "flex items-center justify-center transition-colors duration-150",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                            lineNumber: 50,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                        lineNumber: 45,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "ddf612487bf57859",
                children: "@keyframes pulse-dot{0%,to{opacity:1}50%{opacity:.5}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AIAssistant/ChatHeader.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_s(ChatHeader, "RIaHvAJ/aibaSPcw91gPrf/M6t4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = ChatHeader;
var _c;
__turbopack_context__.k.register(_c, "ChatHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/ChatProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatProductCard",
    ()=>ChatProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
;
function ChatProductCard({ products }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2 overflow-x-auto pb-2 px-1",
        style: {
            scrollbarWidth: 'none'
        },
        children: products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: p.href || '#',
                className: "flex-shrink-0 overflow-hidden transition-all duration-250 block",
                style: {
                    width: 160,
                    borderRadius: 8,
                    background: 'white',
                    border: '1px solid #E8E3DC',
                    textDecoration: 'none'
                },
                onMouseEnter: (e)=>{
                    e.currentTarget.style.borderColor = '#C9A96E';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,169,110,0.15)';
                },
                onMouseLeave: (e)=>{
                    e.currentTarget.style.borderColor = '#E8E3DC';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        style: {
                            aspectRatio: '4/3'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: p.image,
                                alt: p.name,
                                fill: true,
                                className: "object-cover",
                                sizes: "160px"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AIAssistant/ChatProductCard.tsx",
                                lineNumber: 21,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute",
                                style: {
                                    top: 8,
                                    left: 8,
                                    background: '#FDF8F0',
                                    color: '#C9A96E',
                                    fontSize: 10,
                                    fontWeight: 600,
                                    padding: '2px 8px',
                                    borderRadius: 9999
                                },
                                children: [
                                    "🎯 %",
                                    p.matchScore,
                                    " Uyum"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AIAssistant/ChatProductCard.tsx",
                                lineNumber: 23,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AIAssistant/ChatProductCard.tsx",
                        lineNumber: 20,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '8px 10px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "line-clamp-2",
                                style: {
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: '#1C1C1E',
                                    lineHeight: 1.4
                                },
                                children: p.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/AIAssistant/ChatProductCard.tsx",
                                lineNumber: 29,
                                columnNumber: 25
                            }, this),
                            p.matchReason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 10,
                                    color: '#999',
                                    fontStyle: 'italic',
                                    marginTop: 2
                                },
                                children: p.matchReason
                            }, void 0, false, {
                                fileName: "[project]/src/components/AIAssistant/ChatProductCard.tsx",
                                lineNumber: 31,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: '#1C1C1E',
                                    marginTop: 4
                                },
                                children: [
                                    "₺",
                                    p.price.toLocaleString('tr-TR')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AIAssistant/ChatProductCard.tsx",
                                lineNumber: 33,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AIAssistant/ChatProductCard.tsx",
                        lineNumber: 28,
                        columnNumber: 21
                    }, this)
                ]
            }, p.id, true, {
                fileName: "[project]/src/components/AIAssistant/ChatProductCard.tsx",
                lineNumber: 13,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/AIAssistant/ChatProductCard.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
_c = ChatProductCard;
var _c;
__turbopack_context__.k.register(_c, "ChatProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/ChatMessage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMessage",
    ()=>ChatMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/ChatProductCard.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
function ChatMessage({ message }) {
    const isUser = message.role === 'user';
    const time = new Date(message.timestamp).toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 10,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        transition: {
            duration: 0.25,
            ease: 'easeOut'
        },
        className: `flex ${isUser ? 'justify-end' : 'justify-start'} gap-2 px-4 py-1`,
        children: [
            !isUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #C9A96E, #B8915A)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                className: "jsx-5a159282e743d4f3" + " " + "flex-shrink-0 mt-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 11,
                        color: 'white',
                        fontWeight: 700
                    },
                    className: "jsx-5a159282e743d4f3",
                    children: "AI"
                }, void 0, false, {
                    fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                    lineNumber: 26,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                lineNumber: 24,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: isUser ? '85%' : '90%'
                },
                className: "jsx-5a159282e743d4f3",
                children: [
                    isUser && message.imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            borderRadius: '12px 12px 0 0',
                            maxHeight: 200
                        },
                        className: "jsx-5a159282e743d4f3" + " " + "mb-1 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: message.imageUrl,
                            alt: "Uploaded",
                            width: 280,
                            height: 200,
                            className: "w-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                            lineNumber: 34,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                        lineNumber: 33,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: isUser ? '#1C1C1E' : '#F5F0EB',
                            color: isUser ? 'white' : '#1C1C1E',
                            borderRadius: isUser ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                            padding: '10px 14px',
                            fontSize: 13,
                            lineHeight: 1.6
                        },
                        className: "jsx-5a159282e743d4f3",
                        children: isUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "jsx-5a159282e743d4f3",
                            children: message.content
                        }, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                            lineNumber: 46,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: 13
                            },
                            className: "jsx-5a159282e743d4f3" + " " + "prose prose-sm max-w-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                    components: {
                                        strong: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "jsx-5a159282e743d4f3" + " " + "font-semibold",
                                                children: children
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                                                lineNumber: 51,
                                                columnNumber: 63
                                            }, void 0),
                                        em: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                className: "jsx-5a159282e743d4f3" + " " + "italic",
                                                children: children
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                                                lineNumber: 52,
                                                columnNumber: 59
                                            }, void 0),
                                        code: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                style: {
                                                    background: '#E8E3DC',
                                                    padding: '1px 4px',
                                                    borderRadius: 3,
                                                    fontSize: 12
                                                },
                                                className: "jsx-5a159282e743d4f3",
                                                children: children
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                                                lineNumber: 53,
                                                columnNumber: 61
                                            }, void 0),
                                        ul: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                style: {
                                                    paddingLeft: 16,
                                                    marginTop: 4
                                                },
                                                className: "jsx-5a159282e743d4f3",
                                                children: children
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                                                lineNumber: 54,
                                                columnNumber: 59
                                            }, void 0),
                                        li: ({ children })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                style: {
                                                    marginBottom: 2
                                                },
                                                className: "jsx-5a159282e743d4f3",
                                                children: children
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                                                lineNumber: 55,
                                                columnNumber: 59
                                            }, void 0)
                                    },
                                    children: message.content
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                                    lineNumber: 49,
                                    columnNumber: 29
                                }, this),
                                message.isStreaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        animation: 'blink 0.8s infinite'
                                    },
                                    className: "jsx-5a159282e743d4f3" + " " + "inline-block",
                                    children: "▋"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                                    lineNumber: 58,
                                    columnNumber: 53
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                            lineNumber: 48,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                        lineNumber: 39,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 10,
                            color: '#999',
                            marginTop: 4,
                            textAlign: isUser ? 'right' : 'left'
                        },
                        className: "jsx-5a159282e743d4f3",
                        children: time
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this),
                    message.products && message.products.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-5a159282e743d4f3" + " " + "mt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatProductCard"], {
                            products: message.products
                        }, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                            lineNumber: 69,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                        lineNumber: 68,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "5a159282e743d4f3",
                children: "@keyframes blink{0%,to{opacity:1}50%{opacity:0}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AIAssistant/ChatMessage.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_c = ChatMessage;
var _c;
__turbopack_context__.k.register(_c, "ChatMessage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/ChatTypingIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatTypingIndicator",
    ()=>ChatTypingIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
'use client';
;
;
function ChatTypingIndicator() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-bc6df6cdacd7b66a" + " " + "flex items-start gap-2 px-4 py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #C9A96E, #B8915A)'
                },
                className: "jsx-bc6df6cdacd7b66a" + " " + "flex-shrink-0 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 12,
                        color: 'white'
                    },
                    className: "jsx-bc6df6cdacd7b66a",
                    children: "AI"
                }, void 0, false, {
                    fileName: "[project]/src/components/AIAssistant/ChatTypingIndicator.tsx",
                    lineNumber: 8,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/ChatTypingIndicator.tsx",
                lineNumber: 6,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: '#F5F0EB',
                    borderRadius: '4px 16px 16px 16px'
                },
                className: "jsx-bc6df6cdacd7b66a" + " " + "flex items-center gap-1 px-4 py-3",
                children: [
                    0,
                    1,
                    2
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#999',
                            display: 'inline-block',
                            animation: `bounce-dot 1.5s infinite`,
                            animationDelay: `${i * 150}ms`
                        },
                        className: "jsx-bc6df6cdacd7b66a"
                    }, i, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatTypingIndicator.tsx",
                        lineNumber: 13,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/ChatTypingIndicator.tsx",
                lineNumber: 10,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "bc6df6cdacd7b66a",
                children: "@keyframes bounce-dot{0%,60%,to{transform:translateY(0)}30%{transform:translateY(-6px)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AIAssistant/ChatTypingIndicator.tsx",
        lineNumber: 5,
        columnNumber: 9
    }, this);
}
_c = ChatTypingIndicator;
var _c;
__turbopack_context__.k.register(_c, "ChatTypingIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/hooks/useChat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChat",
    ()=>useChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/store/chatStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function useChat() {
    _s();
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])();
    const { language, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const parseProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[parseProducts]": (content)=>{
            const match = content.match(/<products>([\s\S]*?)<\/products>/);
            if (!match) return [];
            try {
                return JSON.parse(match[1]);
            } catch  {
                return [];
            }
        }
    }["useChat.useCallback[parseProducts]"], []);
    const parseQuickReplies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[parseQuickReplies]": (content)=>{
            const match = content.match(/<quickReplies>([\s\S]*?)<\/quickReplies>/);
            if (!match) return [];
            try {
                return JSON.parse(match[1]);
            } catch  {
                return [];
            }
        }
    }["useChat.useCallback[parseQuickReplies]"], []);
    const cleanResponse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[cleanResponse]": (content)=>content.replace(/<products>[\s\S]*?<\/products>/g, '').replace(/<quickReplies>[\s\S]*?<\/quickReplies>/g, '').trim()
    }["useChat.useCallback[cleanResponse]"], []);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useChat.useCallback[sendMessage]": async (content, imageUrl)=>{
            // Add user message
            store.addMessage({
                role: 'user',
                content,
                imageUrl
            });
            store.setLoading(true);
            // Add empty assistant message for streaming
            store.addMessage({
                role: 'assistant',
                content: '',
                isStreaming: true
            });
            try {
                const allMessages = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"].getState().messages;
                const apiMessages = allMessages.filter({
                    "useChat.useCallback[sendMessage].apiMessages": (m)=>m.role !== 'system'
                }["useChat.useCallback[sendMessage].apiMessages"]).slice(0, -1) // exclude the empty streaming placeholder
                .map({
                    "useChat.useCallback[sendMessage].apiMessages": (m)=>({
                            role: m.role,
                            content: m.content
                        })
                }["useChat.useCallback[sendMessage].apiMessages"]);
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messages: apiMessages,
                        context: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"].getState().context,
                        language
                    })
                });
                if (!response.ok) throw new Error('API error');
                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
                let fullContent = '';
                if (reader) {
                    while(true){
                        const { done, value } = await reader.read();
                        if (done) break;
                        fullContent += decoder.decode(value, {
                            stream: true
                        });
                        store.updateLastMessage(fullContent);
                    }
                }
                // Parse and clean
                const products = parseProducts(fullContent);
                const quickReplies = parseQuickReplies(fullContent);
                const cleaned = cleanResponse(fullContent);
                store.updateLastMessage(cleaned, {
                    isStreaming: false,
                    products: products.length > 0 ? products : undefined,
                    quickReplies: quickReplies.length > 0 ? quickReplies : undefined
                });
            } catch (err) {
                store.updateLastMessage(t('chat.error') || 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', {
                    isStreaming: false
                });
            } finally{
                store.setLoading(false);
            }
        }
    }["useChat.useCallback[sendMessage]"], [
        store,
        parseProducts,
        parseQuickReplies,
        cleanResponse,
        language,
        t
    ]);
    return {
        sendMessage
    };
}
_s(useChat, "uu8xYuH4yN3nHYx0hDgz7LzVtMs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/ChatQuickReplies.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatQuickReplies",
    ()=>ChatQuickReplies
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/hooks/useChat.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ChatQuickReplies({ replies, onSent }) {
    _s();
    const { sendMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    if (!replies || replies.length === 0) return null;
    const handleClick = (text)=>{
        sendMessage(text);
        onSent();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: 5
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0
            },
            className: "flex flex-wrap gap-2",
            style: {
                padding: '8px 16px'
            },
            children: replies.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                    initial: {
                        opacity: 0,
                        scale: 0.9
                    },
                    animate: {
                        opacity: 1,
                        scale: 1
                    },
                    transition: {
                        delay: i * 0.05
                    },
                    onClick: ()=>handleClick(r),
                    className: "transition-colors duration-150",
                    style: {
                        padding: '6px 12px',
                        borderRadius: 9999,
                        background: 'white',
                        border: '1px solid #E8E3DC',
                        fontSize: 12,
                        fontWeight: 500,
                        color: '#1C1C1E',
                        cursor: 'pointer'
                    },
                    onMouseEnter: (e)=>{
                        e.currentTarget.style.borderColor = '#C9A96E';
                        e.currentTarget.style.background = '#FDF8F0';
                    },
                    onMouseLeave: (e)=>{
                        e.currentTarget.style.borderColor = '#E8E3DC';
                        e.currentTarget.style.background = 'white';
                    },
                    children: r
                }, r, false, {
                    fileName: "[project]/src/components/AIAssistant/ChatQuickReplies.tsx",
                    lineNumber: 23,
                    columnNumber: 21
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/AIAssistant/ChatQuickReplies.tsx",
            lineNumber: 20,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AIAssistant/ChatQuickReplies.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
_s(ChatQuickReplies, "zjhnOAmLxeJplNUGJZvSAPy4zw0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"]
    ];
});
_c = ChatQuickReplies;
var _c;
__turbopack_context__.k.register(_c, "ChatQuickReplies");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/ChatWelcome.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatWelcome",
    ()=>ChatWelcome
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/hooks/useChat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ChatWelcome() {
    _s();
    const { sendMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const QUICK_STARTS = [
        {
            icon: '🛋️',
            text: t('chat_qs_living') || 'Oturma odası için mobilya',
            key: 'chat.qs_living'
        },
        {
            icon: '🛏️',
            text: t('chat_qs_bedroom') || 'Yatak odası dekorasyonu',
            key: 'chat.qs_bedroom'
        },
        {
            icon: '💰',
            text: t('chat_qs_budget') || 'Bütçeme uygun öneriler',
            key: 'chat.qs_budget'
        },
        {
            icon: '🎨',
            text: t('chat_qs_style') || 'Stil testini çözmek istiyorum',
            key: 'chat.qs_style'
        },
        {
            icon: '📐',
            text: t('chat_qs_planner') || 'Oda planlayıcıya git',
            key: 'chat.qs_planner'
        }
    ];
    const handleClick = (key, text)=>{
        if (key === 'chat.qs_planner') {
            window.location.href = '/oda-planlayici';
            return;
        }
        sendMessage(text);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center px-6 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0
                },
                animate: {
                    scale: 1
                },
                transition: {
                    type: 'spring',
                    delay: 0.1
                },
                className: "flex items-center justify-center mb-5",
                style: {
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #C9A96E, #B8915A)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                    size: 28,
                    color: "white"
                }, void 0, false, {
                    fileName: "[project]/src/components/AIAssistant/ChatWelcome.tsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/ChatWelcome.tsx",
                lineNumber: 31,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-serif text-xl text-charcoal mb-2",
                    children: t('chat_welcome_title') || 'Merhaba! Ben Selis AI 👋'
                }, void 0, false, {
                    fileName: "[project]/src/components/AIAssistant/ChatWelcome.tsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/ChatWelcome.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                initial: {
                    opacity: 0,
                    y: 8
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: 0.3
                },
                style: {
                    fontSize: 13,
                    color: '#666',
                    textAlign: 'center',
                    marginTop: 8
                },
                children: t('chat_welcome_desc') || "Kişiselleştirilmiş mobilya önerileri için buradayım."
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/ChatWelcome.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full mt-6 space-y-2",
                children: QUICK_STARTS.map((qs, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        initial: {
                            opacity: 0,
                            y: 10
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.4 + i * 0.08
                        },
                        onClick: ()=>handleClick(qs.key, qs.text),
                        className: "w-full text-left transition-all duration-200",
                        style: {
                            padding: '12px 16px',
                            borderRadius: 8,
                            background: '#F5F0EB',
                            border: '1px solid #E8E3DC',
                            fontSize: 13,
                            color: '#1C1C1E',
                            cursor: 'pointer'
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.borderColor = '#C9A96E';
                            e.currentTarget.style.background = '#FDF8F0';
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.borderColor = '#E8E3DC';
                            e.currentTarget.style.background = '#F5F0EB';
                        },
                        children: [
                            qs.icon,
                            " ",
                            qs.text
                        ]
                    }, qs.key, true, {
                        fileName: "[project]/src/components/AIAssistant/ChatWelcome.tsx",
                        lineNumber: 51,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/ChatWelcome.tsx",
                lineNumber: 49,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AIAssistant/ChatWelcome.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, this);
}
_s(ChatWelcome, "CdO/T8Ho5JYANRW/s0PrsfFrdn4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = ChatWelcome;
var _c;
__turbopack_context__.k.register(_c, "ChatWelcome");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/ChatMessages.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMessages",
    ()=>ChatMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/store/chatStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatMessage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/ChatMessage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatTypingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/ChatTypingIndicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatQuickReplies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/ChatQuickReplies.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatWelcome$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/ChatWelcome.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function ChatMessages() {
    _s();
    const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatMessages.useChatStore[messages]": (s)=>s.messages
    }["ChatMessages.useChatStore[messages]"]);
    const isLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatMessages.useChatStore[isLoading]": (s)=>s.isLoading
    }["ChatMessages.useChatStore[isLoading]"]);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [showScrollBtn, setShowScrollBtn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoScroll, setAutoScroll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeQuickReplies, setActiveQuickReplies] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Auto-scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatMessages.useEffect": ()=>{
            if (autoScroll && bottomRef.current) {
                bottomRef.current.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }["ChatMessages.useEffect"], [
        messages,
        autoScroll
    ]);
    // Detect manual scroll
    const handleScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatMessages.useCallback[handleScroll]": ()=>{
            if (!scrollRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            const atBottom = scrollHeight - scrollTop - clientHeight < 60;
            setAutoScroll(atBottom);
            setShowScrollBtn(!atBottom);
        }
    }["ChatMessages.useCallback[handleScroll]"], []);
    const scrollToBottom = ()=>{
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
        setAutoScroll(true);
    };
    // Track latest quick replies
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatMessages.useEffect": ()=>{
            const last = messages.filter({
                "ChatMessages.useEffect.last": (m)=>m.role === 'assistant' && m.quickReplies?.length
            }["ChatMessages.useEffect.last"]).pop();
            setActiveQuickReplies(last?.quickReplies || []);
        }
    }["ChatMessages.useEffect"], [
        messages
    ]);
    if (messages.length === 0 && !isLoading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatWelcome$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatWelcome"], {}, void 0, false, {
        fileName: "[project]/src/components/AIAssistant/ChatMessages.tsx",
        lineNumber: 48,
        columnNumber: 53
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex-1 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: scrollRef,
                onScroll: handleScroll,
                className: "h-full overflow-y-auto py-4",
                style: {
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#E8E3DC transparent'
                },
                children: [
                    messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatMessage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatMessage"], {
                            message: m
                        }, m.id, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatMessages.tsx",
                            lineNumber: 56,
                            columnNumber: 21
                        }, this)),
                    isLoading && messages[messages.length - 1]?.role !== 'assistant' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatTypingIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatTypingIndicator"], {}, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatMessages.tsx",
                        lineNumber: 58,
                        columnNumber: 86
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatMessages.tsx",
                        lineNumber: 59,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AIAssistant/ChatMessages.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this),
            activeQuickReplies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatQuickReplies$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatQuickReplies"], {
                replies: activeQuickReplies,
                onSent: ()=>setActiveQuickReplies([])
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/ChatMessages.tsx",
                lineNumber: 64,
                columnNumber: 17
            }, this),
            showScrollBtn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: scrollToBottom,
                className: "absolute flex items-center justify-center transition-all",
                style: {
                    bottom: activeQuickReplies.length > 0 ? 52 : 8,
                    right: 12,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#1C1C1E',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/src/components/AIAssistant/ChatMessages.tsx",
                    lineNumber: 72,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/ChatMessages.tsx",
                lineNumber: 69,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AIAssistant/ChatMessages.tsx",
        lineNumber: 51,
        columnNumber: 9
    }, this);
}
_s(ChatMessages, "7uVBDZTzkskKgY4EVuSOa7kf2UQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"]
    ];
});
_c = ChatMessages;
var _c;
__turbopack_context__.k.register(_c, "ChatMessages");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/hooks/useVisualSearch.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVisualSearch",
    ()=>useVisualSearch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/store/chatStore.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useVisualSearch() {
    _s();
    const [isAnalyzing, setIsAnalyzing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const analyzeImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useVisualSearch.useCallback[analyzeImage]": async (file)=>{
            setIsAnalyzing(true);
            const store = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"].getState();
            // Create preview URL
            const imageUrl = URL.createObjectURL(file);
            // Add user message with image
            store.addMessage({
                role: 'user',
                content: '🔍 Görsel arama yapıyorum…',
                imageUrl
            });
            // Add streaming assistant message
            store.addMessage({
                role: 'assistant',
                content: '🔍 Görselinizi analiz ediyorum…',
                isStreaming: true
            });
            try {
                // Convert to base64
                const reader = new FileReader();
                const base64 = await new Promise({
                    "useVisualSearch.useCallback[analyzeImage]": (resolve, reject)=>{
                        reader.onload = ({
                            "useVisualSearch.useCallback[analyzeImage]": ()=>resolve(reader.result.split(',')[1])
                        })["useVisualSearch.useCallback[analyzeImage]"];
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    }
                }["useVisualSearch.useCallback[analyzeImage]"]);
                const res = await fetch('/api/visual-search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        image: base64,
                        mediaType: file.type
                    })
                });
                if (!res.ok) throw new Error('API error');
                const data = await res.json();
                const { analysis, products } = data;
                store.updateLastMessage(`Bu görseli analiz ettim:\n\n**Tür:** ${analysis.type}\n**Stil:** ${analysis.style}\n**Renk:** ${analysis.color}\n**Malzeme:** ${analysis.material}\n\nBenzer SELIS ürünleri:`, {
                    isStreaming: false,
                    products
                });
            } catch  {
                store.updateLastMessage('Görsel analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.', {
                    isStreaming: false
                });
            } finally{
                setIsAnalyzing(false);
            }
        }
    }["useVisualSearch.useCallback[analyzeImage]"], []);
    return {
        analyzeImage,
        isAnalyzing
    };
}
_s(useVisualSearch, "tq+iiVvFFMcXa2NAZqSWJhQUWdo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/ChatInput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatInput",
    ()=>ChatInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/hooks/useChat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useVisualSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/hooks/useVisualSearch.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/store/chatStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function ChatInput() {
    _s();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [imageFile, setImageFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [imagePreview, setImagePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { sendMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])();
    const { analyzeImage, isAnalyzing } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useVisualSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVisualSearch"])();
    const isLoading = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatInput.useChatStore[isLoading]": (s)=>s.isLoading
    }["ChatInput.useChatStore[isLoading]"]);
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    // Auto-resize textarea
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInput.useEffect": ()=>{
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
            }
        }
    }["ChatInput.useEffect"], [
        text
    ]);
    const handleSubmit = async ()=>{
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
    const handleKey = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };
    const handleImageSelect = (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };
    const clearImage = ()=>{
        setImageFile(null);
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        if (fileRef.current) fileRef.current.value = '';
    };
    const hasContent = text.trim().length > 0 || imageFile !== null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-shrink-0",
        style: {
            borderTop: '1px solid #F0EDE8',
            background: 'white'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: imagePreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        height: 0,
                        opacity: 0
                    },
                    animate: {
                        height: 'auto',
                        opacity: 1
                    },
                    exit: {
                        height: 0,
                        opacity: 0
                    },
                    className: "px-4 pt-3 overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative inline-block",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: imagePreview,
                                alt: "Preview",
                                width: 60,
                                height: 60,
                                className: "object-cover",
                                style: {
                                    borderRadius: 8,
                                    width: 60,
                                    height: 60
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                                lineNumber: 76,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: clearImage,
                                className: "absolute flex items-center justify-center",
                                style: {
                                    top: -6,
                                    right: -6,
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    background: '#E53935',
                                    border: '2px solid white',
                                    cursor: 'pointer'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 10,
                                    color: "white"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                                    lineNumber: 80,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                                lineNumber: 78,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                        lineNumber: 75,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                    lineNumber: 73,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                lineNumber: 71,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end gap-2 px-4 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>fileRef.current?.click(),
                        className: "flex-shrink-0 flex items-center justify-center transition-colors",
                        style: {
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#999'
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.color = '#C9A96E';
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.color = '#999';
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                            lineNumber: 95,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                        lineNumber: 90,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileRef,
                        type: "file",
                        accept: "image/*",
                        className: "hidden",
                        onChange: handleImageSelect
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                        lineNumber: 97,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        ref: textareaRef,
                        value: text,
                        onChange: (e)=>setText(e.target.value),
                        onKeyDown: handleKey,
                        placeholder: t('chat.input_placeholder') || 'Ask a question...',
                        rows: 1,
                        className: "flex-1 resize-none outline-none",
                        style: {
                            minHeight: 40,
                            maxHeight: 120,
                            padding: '10px 16px',
                            border: '1px solid #E8E3DC',
                            borderRadius: 20,
                            fontSize: 13,
                            lineHeight: 1.5,
                            background: 'white'
                        },
                        onFocus: (e)=>{
                            e.currentTarget.style.borderColor = '#C9A96E';
                            e.currentTarget.style.background = 'white';
                        },
                        onBlur: (e)=>{
                            e.currentTarget.style.borderColor = '#E8E3DC';
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                        lineNumber: 100,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: handleSubmit,
                        animate: hasContent ? {
                            scale: [
                                0.9,
                                1
                            ]
                        } : {},
                        className: "flex-shrink-0 flex items-center justify-center transition-all duration-200",
                        style: {
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            border: 'none',
                            background: hasContent ? '#1C1C1E' : '#E8E3DC',
                            color: hasContent ? 'white' : '#999',
                            cursor: hasContent ? 'pointer' : 'not-allowed'
                        },
                        onMouseEnter: (e)=>{
                            if (hasContent) {
                                e.currentTarget.style.background = '#C9A96E';
                                e.currentTarget.style.color = '#1C1C1E';
                            }
                        },
                        onMouseLeave: (e)=>{
                            if (hasContent) {
                                e.currentTarget.style.background = '#1C1C1E';
                                e.currentTarget.style.color = 'white';
                            }
                        },
                        disabled: !hasContent || isLoading,
                        children: isLoading || isAnalyzing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            size: 16,
                            className: "animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                            lineNumber: 126,
                            columnNumber: 49
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                            lineNumber: 126,
                            columnNumber: 98
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                        lineNumber: 114,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AIAssistant/ChatInput.tsx",
        lineNumber: 69,
        columnNumber: 9
    }, this);
}
_s(ChatInput, "Oy/d28FXPwDTXHkP3vDT1Xe427M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useChat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$hooks$2f$useVisualSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVisualSearch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = ChatInput;
var _c;
__turbopack_context__.k.register(_c, "ChatInput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/ChatWindow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatWindow",
    ()=>ChatWindow,
    "ChatWindowMobile",
    ()=>ChatWindowMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/store/chatStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/ChatHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatMessages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/ChatMessages.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/ChatInput.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ChatWindow() {
    _s();
    const isOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatWindow.useChatStore[isOpen]": (s)=>s.isOpen
    }["ChatWindow.useChatStore[isOpen]"]);
    const isMinimized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatWindow.useChatStore[isMinimized]": (s)=>s.isMinimized
    }["ChatWindow.useChatStore[isMinimized]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                scale: 0.85,
                y: 20
            },
            animate: {
                opacity: 1,
                scale: 1,
                y: 0,
                height: isMinimized ? 60 : undefined
            },
            exit: {
                opacity: 0,
                scale: 0.85,
                y: 20
            },
            transition: {
                duration: 0.3,
                ease: [
                    0.34,
                    1.56,
                    0.64,
                    1
                ]
            },
            className: "fixed z-50 flex flex-col overflow-hidden",
            style: {
                bottom: 96,
                right: 24,
                width: 380,
                height: isMinimized ? 60 : 600,
                maxHeight: 'calc(100vh - 120px)',
                background: 'white',
                borderRadius: 12,
                boxShadow: '0 24px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatHeader"], {}, void 0, false, {
                    fileName: "[project]/src/components/AIAssistant/ChatWindow.tsx",
                    lineNumber: 31,
                    columnNumber: 21
                }, this),
                !isMinimized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatMessages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatMessages"], {}, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatWindow.tsx",
                            lineNumber: 34,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatInput"], {}, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatWindow.tsx",
                            lineNumber: 35,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AIAssistant/ChatWindow.tsx",
            lineNumber: 17,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AIAssistant/ChatWindow.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_s(ChatWindow, "L5sNzNnnk/2ucBWteMCq7sA2cW0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"]
    ];
});
_c = ChatWindow;
function ChatWindowMobile() {
    _s1();
    const isOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatWindowMobile.useChatStore[isOpen]": (s)=>s.isOpen
    }["ChatWindowMobile.useChatStore[isOpen]"]);
    const isMinimized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "ChatWindowMobile.useChatStore[isMinimized]": (s)=>s.isMinimized
    }["ChatWindowMobile.useChatStore[isMinimized]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: '100%'
            },
            animate: {
                opacity: 1,
                y: 0
            },
            exit: {
                opacity: 0,
                y: '100%'
            },
            transition: {
                duration: 0.3,
                ease: [
                    0.25,
                    0.46,
                    0.45,
                    0.94
                ]
            },
            className: "fixed inset-0 z-50 flex flex-col",
            style: {
                background: 'white'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatHeader"], {}, void 0, false, {
                    fileName: "[project]/src/components/AIAssistant/ChatWindow.tsx",
                    lineNumber: 61,
                    columnNumber: 21
                }, this),
                !isMinimized && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatMessages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatMessages"], {}, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatWindow.tsx",
                            lineNumber: 64,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatInput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatInput"], {}, void 0, false, {
                            fileName: "[project]/src/components/AIAssistant/ChatWindow.tsx",
                            lineNumber: 65,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AIAssistant/ChatWindow.tsx",
            lineNumber: 53,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AIAssistant/ChatWindow.tsx",
        lineNumber: 51,
        columnNumber: 9
    }, this);
}
_s1(ChatWindowMobile, "L5sNzNnnk/2ucBWteMCq7sA2cW0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"]
    ];
});
_c1 = ChatWindowMobile;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatWindow");
__turbopack_context__.k.register(_c1, "ChatWindowMobile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AIAssistant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/ChatWindow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AIAssistant/store/chatStore.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ChatButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/AIAssistant/ChatButton.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((m)=>({
            default: m.ChatButton
        })), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/AIAssistant/ChatButton.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = ChatButton;
;
function AIAssistant() {
    _s();
    const updateContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "AIAssistant.useChatStore[updateContext]": (s)=>s.updateContext
    }["AIAssistant.useChatStore[updateContext]"]);
    const openChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"])({
        "AIAssistant.useChatStore[openChat]": (s)=>s.openChat
    }["AIAssistant.useChatStore[openChat]"]);
    // Expose chat control to window for non-react or distant components
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AIAssistant.useEffect": ()=>{
            window.SelisChat = {
                open: openChat
            };
        }
    }["AIAssistant.useEffect"], [
        openChat
    ]);
    // Update context when page changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AIAssistant.useEffect": ()=>{
            updateContext({
                currentPage: window.location.pathname
            });
            // Check for saved style profile
            const savedStyle = localStorage.getItem('selis_style_profile');
            if (savedStyle) updateContext({
                styleProfile: savedStyle
            });
        }
    }["AIAssistant.useEffect"], [
        updateContext
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatWindow"], {}, void 0, false, {
                    fileName: "[project]/src/components/AIAssistant/index.tsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/index.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$ChatWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatWindowMobile"], {}, void 0, false, {
                    fileName: "[project]/src/components/AIAssistant/index.tsx",
                    lineNumber: 39,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/index.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatButton, {}, void 0, false, {
                fileName: "[project]/src/components/AIAssistant/index.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(AIAssistant, "ME6ugK2dco8BVfXqCUW7zMSBDNs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AIAssistant$2f$store$2f$chatStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChatStore"]
    ];
});
_c1 = AIAssistant;
var _c, _c1;
__turbopack_context__.k.register(_c, "ChatButton");
__turbopack_context__.k.register(_c1, "AIAssistant");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AIAssistant/index.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/AIAssistant/index.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_AIAssistant_c5242efe._.js.map