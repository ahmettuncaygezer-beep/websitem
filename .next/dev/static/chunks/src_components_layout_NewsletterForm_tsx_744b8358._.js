(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/layout/NewsletterForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewsletterForm",
    ()=>NewsletterForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function NewsletterForm() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSubscribe = async (e)=>{
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus('error');
            setMessage(t('footer_newsletter_error'));
            return;
        }
        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            });
            if (res.ok) {
                setStatus('success');
                setMessage(t('footer_newsletter_success'));
                setEmail('');
            } else {
                const data = await res.json();
                setStatus('error');
                setMessage(data.error || t('footer_newsletter_error_general'));
            }
        } catch  {
            setStatus('error');
            setMessage(t('footer_newsletter_error_network'));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full md:w-auto relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubscribe,
                className: "flex w-full md:w-auto gap-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "newsletter-email",
                        name: "email",
                        type: "email",
                        autoComplete: "email",
                        value: email,
                        onChange: (e)=>setEmail(e.target.value),
                        placeholder: t('footer_newsletter_placeholder'),
                        required: true,
                        disabled: status === 'loading' || status === 'success',
                        className: "flex-1 w-full min-w-[200px] md:w-80 px-6 py-3.5 bg-background/50 border border-glass-border rounded-l-full text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-selis-gold transition-colors disabled:opacity-50 backdrop-blur-md",
                        "data-lang-key": "footer_newsletter_placeholder"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/NewsletterForm.tsx",
                        lineNumber: 48,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: status === 'loading' || status === 'success',
                        className: "px-8 py-3.5 bg-selis-gold text-black text-sm font-sans font-semibold uppercase tracking-wider rounded-r-full hover:bg-selis-gold-dark transition-all whitespace-nowrap disabled:opacity-50 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]",
                        children: status === 'loading' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/NewsletterForm.tsx",
                            lineNumber: 67,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "data-lang-key": "footer_newsletter_btn",
                            children: "Katıl"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/NewsletterForm.tsx",
                            lineNumber: 68,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/NewsletterForm.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/NewsletterForm.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `absolute -bottom-6 left-0 text-xs font-medium ${status === 'error' ? 'text-red-400' : 'text-green-400'}`,
                children: message
            }, void 0, false, {
                fileName: "[project]/src/components/layout/NewsletterForm.tsx",
                lineNumber: 72,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/NewsletterForm.tsx",
        lineNumber: 46,
        columnNumber: 9
    }, this);
}
_s(NewsletterForm, "AGVtAiEZY4iXSzEki+6WsPeG/k4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = NewsletterForm;
var _c;
__turbopack_context__.k.register(_c, "NewsletterForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/NewsletterForm.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/layout/NewsletterForm.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_layout_NewsletterForm_tsx_744b8358._.js.map