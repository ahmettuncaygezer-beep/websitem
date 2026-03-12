(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/home/HeroSection/TypewriterText.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypewriterText",
    ()=>TypewriterText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
// ─── Hook ────────────────────────────────────────────────────────────────────
function useTypewriter(texts, typingSpeed = 80, deletingSpeed = 40, pauseAfterType = 3000, startDelay = 0) {
    _s();
    const [displayText, setDisplayText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Honour startDelay — kick off typing after x ms
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTypewriter.useEffect": ()=>{
            const t = setTimeout({
                "useTypewriter.useEffect.t": ()=>{
                    setStarted(true);
                    setPhase('typing');
                    setIsTyping(true);
                }
            }["useTypewriter.useEffect.t"], startDelay);
            return ({
                "useTypewriter.useEffect": ()=>clearTimeout(t)
            })["useTypewriter.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useTypewriter.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTypewriter.useEffect": ()=>{
            if (!started || phase === 'idle') return;
            const target = texts[currentIndex] ?? '';
            const clear = {
                "useTypewriter.useEffect.clear": ()=>{
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }
            }["useTypewriter.useEffect.clear"];
            if (phase === 'typing') {
                if (displayText.length < target.length) {
                    timeoutRef.current = setTimeout({
                        "useTypewriter.useEffect": ()=>{
                            setDisplayText(target.slice(0, displayText.length + 1));
                        }
                    }["useTypewriter.useEffect"], typingSpeed);
                } else {
                    // Fully typed
                    if (texts.length <= 1) {
                        setIsTyping(false);
                        setPhase('idle'); // Just idle permanently if only 1 text
                    } else {
                        // Pause then delete
                        timeoutRef.current = setTimeout({
                            "useTypewriter.useEffect": ()=>{
                                setIsTyping(false);
                                setPhase('pause');
                            }
                        }["useTypewriter.useEffect"], pauseAfterType);
                    }
                }
            }
            if (phase === 'pause') {
                timeoutRef.current = setTimeout({
                    "useTypewriter.useEffect": ()=>setPhase('deleting')
                }["useTypewriter.useEffect"], 0);
            }
            if (phase === 'deleting') {
                if (displayText.length > 0) {
                    timeoutRef.current = setTimeout({
                        "useTypewriter.useEffect": ()=>{
                            setDisplayText({
                                "useTypewriter.useEffect": (p)=>p.slice(0, -1)
                            }["useTypewriter.useEffect"]);
                        }
                    }["useTypewriter.useEffect"], deletingSpeed);
                } else {
                    setPhase('next');
                }
            }
            if (phase === 'next') {
                setCurrentIndex({
                    "useTypewriter.useEffect": (p)=>(p + 1) % texts.length
                }["useTypewriter.useEffect"]);
                setIsTyping(true);
                setPhase('typing');
            }
            return clear;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useTypewriter.useEffect"], [
        displayText,
        phase,
        started,
        currentIndex
    ]);
    return {
        displayText,
        isTyping
    };
}
_s(useTypewriter, "6wUSuro1oyOeL2xZ5GhBoumcF4E=");
function TypewriterText({ typeStartDelay = 0, className = '', customTexts }) {
    _s1();
    const prefersReduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    // Ensure we always have an array of texts to type.
    // If CMS only provides 1 text, we add our default meaningful texts so the typing effect continues.
    const defaultTexts = [
        t('hero_type_1') === 'Yeni Hikayesi' ? 'Yeni Hikayesi' : t('hero_type_1') || 'Yeni Hikayesi',
        t('hero_type_2') === 'Hayalinizdeki Salon' ? 'Hayalinizdeki Salonu' : t('hero_type_2') || 'Hayalinizdeki Salonu',
        t('hero_type_3') === 'Mükemmel Uyku Deneyimi' ? 'Huzuru' : t('hero_type_3') || 'Huzuru',
        t('hero_type_4') === 'Sofistike Yemek Odaları' ? 'Zarafeti' : t('hero_type_4') || 'Zarafeti'
    ];
    let texts = customTexts && customTexts.length > 0 ? customTexts : defaultTexts;
    // If only 1 custom text is provided, add defaults so the loop works
    if (texts.length === 1) {
        texts = [
            texts[0],
            ...defaultTexts.slice(1)
        ];
    }
    const { displayText, isTyping } = useTypewriter(texts, 80, 40, 3000, typeStartDelay);
    // Cursor fades out 2 s after typing completes each cycle
    const [cursorVisible, setCursorVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TypewriterText.useEffect": ()=>{
            if (isTyping) {
                setCursorVisible(true);
            } else {
                const t = setTimeout({
                    "TypewriterText.useEffect.t": ()=>setCursorVisible(false)
                }["TypewriterText.useEffect.t"], 2000);
                return ({
                    "TypewriterText.useEffect": ()=>clearTimeout(t)
                })["TypewriterText.useEffect"];
            }
        }
    }["TypewriterText.useEffect"], [
        isTyping
    ]);
    // With reduced motion: just show the first text immediately, no animation
    if (prefersReduced) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: className,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block text-white not-italic mb-1 md:mb-2",
                    "data-lang-key": "hero_intro",
                    children: t('hero_intro') || 'Evinizin'
                }, void 0, false, {
                    fileName: "[project]/src/components/home/HeroSection/TypewriterText.tsx",
                    lineNumber: 137,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "block min-h-[1.2em]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block italic whitespace-nowrap",
                        style: {
                            fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                            color: '#C9A96E'
                        },
                        children: texts[0]
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/HeroSection/TypewriterText.tsx",
                        lineNumber: 141,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/home/HeroSection/TypewriterText.tsx",
                    lineNumber: 140,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/HeroSection/TypewriterText.tsx",
            lineNumber: 136,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block text-white not-italic mb-1 md:mb-2",
                "data-lang-key": "hero_intro",
                children: t('hero_intro') || 'Evinizin'
            }, void 0, false, {
                fileName: "[project]/src/components/home/HeroSection/TypewriterText.tsx",
                lineNumber: 158,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block min-h-[1.2em]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "inline-block italic whitespace-nowrap",
                    style: {
                        fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
                        color: '#C9A96E'
                    },
                    children: [
                        displayText,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "aria-hidden": "true",
                            className: "inline-block w-[2px] ml-[2px] align-baseline bg-[#C9A96E]",
                            style: {
                                height: '0.85em',
                                opacity: cursorVisible ? 1 : 0,
                                transition: 'opacity 500ms ease',
                                animation: isTyping ? 'twBlink 1s step-end infinite' : 'none'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/HeroSection/TypewriterText.tsx",
                            lineNumber: 172,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/HeroSection/TypewriterText.tsx",
                    lineNumber: 162,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/home/HeroSection/TypewriterText.tsx",
                lineNumber: 161,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/HeroSection/TypewriterText.tsx",
        lineNumber: 156,
        columnNumber: 9
    }, this);
}
_s1(TypewriterText, "mniCvkdbPJocCAhU8l9IMRf8bNM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"],
        useTypewriter
    ];
});
_c = TypewriterText;
var _c;
__turbopack_context__.k.register(_c, "TypewriterText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/HeroSection/GlassCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlassCard",
    ()=>GlassCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HeroSection$2f$TypewriterText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/HeroSection/TypewriterText.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Custom easing matching the spec's cubic bezier
const ease = [
    0.25,
    0.46,
    0.45,
    0.94
];
function GlassCard() {
    _s();
    const prefersReduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const { siteSettings, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const cmsTitle = siteSettings?.cms_hero?.title;
    const cmsSubtitle = siteSettings?.cms_hero?.subtitle;
    const parsedTitles = cmsTitle ? cmsTitle.split('\n').map((s)=>s.trim()).filter(Boolean) : undefined;
    // When reduced motion: only opacity, no translate/scale
    const cardVariants = {
        hidden: {
            opacity: 0,
            scale: prefersReduced ? 1 : 0.96
        },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: 0.2,
                ease
            }
        }
    };
    const fromLeft = {
        hidden: {
            opacity: 0,
            x: prefersReduced ? 0 : -20
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                delay: 0.4
            }
        }
    };
    const fromBottom = (delay)=>({
            hidden: {
                opacity: 0,
                y: prefersReduced ? 0 : 30
            },
            show: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.7,
                    delay,
                    ease
                }
            }
        });
    const fadeIn = (delay)=>({
            hidden: {
                opacity: 0
            },
            show: {
                opacity: 1,
                transition: {
                    duration: 0.6,
                    delay
                }
            }
        });
    return(/* ── Positioning wrapper ──
           Desktop ≥1280: centred
           Tablet  768-1279: centred, max-w-lg
           Mobile  <768: 88% width, centred */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "   absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20   w-[88%]   max-w-sm   md:max-w-lg   xl:max-w-2xl   ",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            variants: cardVariants,
            initial: "hidden",
            animate: "show",
            className: "relative overflow-hidden   px-7 py-8   md:px-10 md:py-10   xl:px-16 xl:py-14",
            style: {
                borderRadius: '2px',
                background: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: fromLeft,
                    initial: "hidden",
                    animate: "show",
                    className: "flex items-center gap-3 mb-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "block h-px w-8 shrink-0",
                            style: {
                                background: '#C9A96E'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium uppercase",
                            style: {
                                fontSize: '11px',
                                letterSpacing: '0.3em',
                                color: '#C9A96E'
                            },
                            children: t('hero_badge') || '2026 Koleksiyonu'
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                            lineNumber: 94,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                    lineNumber: 84,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                    variants: fromBottom(0.7),
                    initial: "hidden",
                    animate: "show",
                    className: "font-serif   text-[1.75rem] leading-[1.15]   md:text-4xl   xl:text-5xl   mb-5   min-h-[70px] md:min-h-[100px]",
                    style: {
                        letterSpacing: '-0.02em',
                        color: '#F5F0EB'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HeroSection$2f$TypewriterText$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TypewriterText"], {
                        typeStartDelay: 900,
                        className: "flex flex-col items-start justify-center gap-1 md:gap-2"
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                        lineNumber: 115,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                    lineNumber: 103,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                    variants: fromBottom(1.4),
                    initial: "hidden",
                    animate: "show",
                    className: "text-sm leading-relaxed max-w-xs mb-8 whitespace-pre-line",
                    style: {
                        color: 'rgba(255,255,255,0.75)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: t('hero_desc') || 'Doğal malzemeler, zamansız tasarım ve el işçiliğiyle yaşam alanlarınıza sofistike bir dokunuş.'
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                        lineNumber: 126,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                    lineNumber: 119,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: fadeIn(1.7),
                    initial: "hidden",
                    animate: "show",
                    // Mobile: stacked — Tablet+: side by side
                    className: "flex flex-col sm:flex-row gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrimaryButton, {
                            href: "/kategori/oturma-odasi",
                            delay: 1.7,
                            children: t('hero_cta_1') || 'Koleksiyonu Keşfet'
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                            lineNumber: 139,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GhostButton, {
                            href: "/lookbook",
                            delay: 1.85,
                            children: t('hero_cta_2') || 'Lookbook'
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                            lineNumber: 142,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                    lineNumber: 132,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                    variants: fadeIn(2.0),
                    initial: "hidden",
                    animate: "show",
                    className: "mt-6 uppercase tracking-wider font-medium",
                    style: {
                        fontSize: '10px',
                        color: 'var(--selis-gold)',
                        opacity: 0.8
                    },
                    children: t('hero_trust') || '✓ Ücretsiz Kargo  ·  ✓ 5 Yıl Garanti  ·  ✓ 30 Gün İade'
                }, void 0, false, {
                    fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                    lineNumber: 148,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-hidden": "true",
                    className: "pointer-events-none absolute inset-0",
                    style: {
                        background: 'radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                    lineNumber: 159,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
            lineNumber: 65,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
        lineNumber: 55,
        columnNumber: 9
    }, this));
}
_s(GlassCard, "mL3tv1cCbb2/Yv63qbwOR6Uljxk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = GlassCard;
/* ─── Button sub-components ─── */ function PrimaryButton({ href, children, delay }) {
    _s1();
    const prefersReduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: prefersReduced ? 0 : 16
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5,
            delay,
            ease: [
                0.25,
                0.46,
                0.45,
                0.94
            ]
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: "group inline-flex w-full sm:w-auto items-center justify-center gap-2   font-semibold text-sm",
            style: {
                background: 'var(--selis-gold)',
                color: '#000',
                padding: '13px 28px',
                letterSpacing: '0.03em',
                borderRadius: '4px',
                border: '1px solid transparent',
                transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                textDecoration: 'none'
            },
            onMouseEnter: (e)=>{
                Object.assign(e.currentTarget.style, {
                    background: 'var(--selis-gold-dark)',
                    transform: 'translateY(-3px)',
                    boxShadow: 'var(--shadow-selis-gold)'
                });
            },
            onMouseLeave: (e)=>{
                Object.assign(e.currentTarget.style, {
                    background: 'var(--selis-gold)',
                    transform: 'translateY(0)',
                    boxShadow: 'none'
                });
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                    size: 14,
                    className: "group-hover:translate-x-1 transition-transform duration-200"
                }, void 0, false, {
                    fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
                    lineNumber: 220,
                    columnNumber: 17
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
            lineNumber: 191,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
        lineNumber: 186,
        columnNumber: 9
    }, this);
}
_s1(PrimaryButton, "+unYVajia9EPCCnuCfd4PsBxgcE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c1 = PrimaryButton;
function GhostButton({ href, children, delay }) {
    _s2();
    const prefersReduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: prefersReduced ? 0 : 16
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.5,
            delay,
            ease: [
                0.25,
                0.46,
                0.45,
                0.94
            ]
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: "inline-flex w-full sm:w-auto items-center justify-center text-white text-sm",
            style: {
                background: 'transparent',
                color: '#ffffff',
                padding: '13px 28px',
                letterSpacing: '0.03em',
                borderRadius: '2px',
                border: '1px solid rgba(255,255,255,0.4)',
                transition: 'all 250ms ease',
                textDecoration: 'none'
            },
            onMouseEnter: (e)=>{
                Object.assign(e.currentTarget.style, {
                    background: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.8)'
                });
            },
            onMouseLeave: (e)=>{
                Object.assign(e.currentTarget.style, {
                    background: 'transparent',
                    borderColor: 'rgba(255,255,255,0.4)'
                });
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
            lineNumber: 247,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/HeroSection/GlassCard.tsx",
        lineNumber: 242,
        columnNumber: 9
    }, this);
}
_s2(GhostButton, "+unYVajia9EPCCnuCfd4PsBxgcE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c2 = GhostButton;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "GlassCard");
__turbopack_context__.k.register(_c1, "PrimaryButton");
__turbopack_context__.k.register(_c2, "GhostButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/HeroSection/ScrollIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollIndicator",
    ()=>ScrollIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function ScrollIndicator() {
    _s();
    const prefersReduced = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    // Fade + slide out when user scrolls past 100 px
    const { scrollY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])();
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollY, [
        0,
        100
    ], [
        0.7,
        0
    ]);
    const translateY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollY, [
        0,
        100
    ], [
        0,
        prefersReduced ? 0 : 10
    ]);
    const handleClick = ()=>{
        document.querySelector('#categories')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        onClick: handleClick,
        "aria-label": "Aşağı kaydır",
        // Orchestration: appears at 2.0 s
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 0.7
        },
        transition: {
            delay: 2.0,
            duration: 0.8
        },
        className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-20   flex flex-col items-center gap-0   cursor-pointer select-none   hover:opacity-100 transition-opacity duration-300",
        style: {
            opacity,
            y: translateY
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-6 h-10 rounded-full flex items-start justify-center pt-2",
                style: {
                    border: '2px solid rgba(255,255,255,0.4)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "w-1 h-1.5 rounded-full bg-white block",
                    style: {
                        animation: 'scrollDot 1.5s ease-in-out infinite'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/home/HeroSection/ScrollIndicator.tsx",
                    lineNumber: 39,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/home/HeroSection/ScrollIndicator.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-3 uppercase tracking-[0.25em] text-white/50",
                style: {
                    fontSize: '10px'
                },
                "data-lang-key": "common_discover",
                children: "Keşfet"
            }, void 0, false, {
                fileName: "[project]/src/components/home/HeroSection/ScrollIndicator.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/HeroSection/ScrollIndicator.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
_s(ScrollIndicator, "vlXs+vyDVJ0QU4Pp77IPmU1f6vk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = ScrollIndicator;
var _c;
__turbopack_context__.k.register(_c, "ScrollIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/HeroSection/useParallax.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useParallax",
    ()=>useParallax
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useParallax(factor = 0.4) {
    _s();
    const [offsetY, setOffsetY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useParallax.useEffect": ()=>{
            // Disable parallax on mobile for performance
            if (("TURBOPACK compile-time value", "object") === 'undefined' || window.innerWidth < 768) return;
            let rafId = null;
            const onScroll = {
                "useParallax.useEffect.onScroll": ()=>{
                    if (rafId !== null) return;
                    rafId = requestAnimationFrame({
                        "useParallax.useEffect.onScroll": ()=>{
                            setOffsetY(window.scrollY);
                            rafId = null;
                        }
                    }["useParallax.useEffect.onScroll"]);
                }
            }["useParallax.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            return ({
                "useParallax.useEffect": ()=>{
                    window.removeEventListener('scroll', onScroll);
                    if (rafId !== null) cancelAnimationFrame(rafId);
                }
            })["useParallax.useEffect"];
        }
    }["useParallax.useEffect"], []);
    return offsetY * factor;
}
_s(useParallax, "ADv8zueSK0//MtoqtV8DPhOuLUQ=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/HeroSection/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HeroSection$2f$GlassCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/HeroSection/GlassCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HeroSection$2f$ScrollIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/HeroSection/ScrollIndicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HeroSection$2f$useParallax$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/home/HeroSection/useParallax.ts [app-client] (ecmascript)");
;
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const ImageSlider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/home/HeroSection/ImageSlider.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((m)=>({
            default: m.ImageSlider
        })), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/home/HeroSection/ImageSlider.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-black"
        }, void 0, false, {
            fileName: "[project]/src/components/home/HeroSection/index.tsx",
            lineNumber: 10,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0))
});
_c = ImageSlider;
const VideoModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/home/HeroSection/VideoModal.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((m)=>({
            default: m.VideoModal
        })), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/home/HeroSection/VideoModal.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c1 = VideoModal;
function HeroSection({ content }) {
    _s();
    const parallaxOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HeroSection$2f$useParallax$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParallax"])(0.15);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        // Mobile: 100svh (iOS-safe), tablet+: 100vh with minimum heights
        className: "relative overflow-hidden   h-[100svh] min-h-[560px]   md:h-screen md:min-h-[600px]   xl:min-h-[700px]",
        "aria-label": "SELIS Hero",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageSlider, {
                parallaxOffset: parallaxOffset
            }, void 0, false, {
                fileName: "[project]/src/components/home/HeroSection/index.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HeroSection$2f$GlassCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GlassCard"], {}, void 0, false, {
                fileName: "[project]/src/components/home/HeroSection/index.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VideoModal, {}, void 0, false, {
                fileName: "[project]/src/components/home/HeroSection/index.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HeroSection$2f$ScrollIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollIndicator"], {}, void 0, false, {
                fileName: "[project]/src/components/home/HeroSection/index.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/home/HeroSection/index.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
_s(HeroSection, "D2sLdAA8SbzOTmurVlJaGQr6rPk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$home$2f$HeroSection$2f$useParallax$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParallax"]
    ];
});
_c2 = HeroSection;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ImageSlider");
__turbopack_context__.k.register(_c1, "VideoModal");
__turbopack_context__.k.register(_c2, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/SectionHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SectionHeader",
    ()=>SectionHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const ease = [
    0.25,
    0.46,
    0.45,
    0.94
];
function SectionHeader() {
    _s();
    const { language, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-60px'
    });
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "text-center mb-12 md:mb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "flex items-center justify-center gap-3 mb-3",
                initial: {
                    opacity: 0,
                    y: reduceMotion ? 0 : 10
                },
                animate: isInView ? {
                    opacity: 1,
                    y: 0
                } : {},
                transition: {
                    duration: 0.5,
                    delay: 0.1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block h-px",
                        style: {
                            width: 24,
                            background: '#C9A96E'
                        },
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                        lineNumber: 26,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "uppercase font-medium",
                        style: {
                            fontSize: '11px',
                            letterSpacing: '0.35em',
                            color: '#C9A96E'
                        },
                        children: t('hero_badge') || 'Kategoriler'
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block h-px",
                        style: {
                            width: 24,
                            background: '#C9A96E'
                        },
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                        lineNumber: 41,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                id: "categories-heading",
                className: "mt-3",
                initial: {
                    opacity: 0,
                    y: reduceMotion ? 0 : 20
                },
                animate: isInView ? {
                    opacity: 1,
                    y: 0
                } : {},
                transition: {
                    duration: 0.7,
                    delay: 0.2,
                    ease
                },
                style: {
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    fontWeight: 400,
                    lineHeight: 1.2
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl md:text-3xl lg:text-4xl text-[#1C1C1E]",
                        children: t('cat_title_1') || 'Yaşam Alanınızı'
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                        className: "text-2xl md:text-3xl lg:text-4xl",
                        style: {
                            fontStyle: 'italic',
                            color: '#C9A96E'
                        },
                        children: t('cat_title_2') || 'Keşfedin'
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                className: "mt-4 text-sm leading-relaxed max-w-sm mx-auto text-[#1C1C1E]/60",
                initial: {
                    opacity: 0
                },
                animate: isInView ? {
                    opacity: 1
                } : {},
                transition: {
                    duration: 0.6,
                    delay: 0.4
                },
                children: t('cat_desc') || 'Her odanız için titizlikle seçilmiş, zamansız parçalar.'
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                lineNumber: 72,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "mt-6 flex items-center justify-center gap-3 mx-auto select-none",
                initial: {
                    opacity: 0
                },
                animate: isInView ? {
                    opacity: 1
                } : {},
                transition: {
                    duration: 0.5,
                    delay: 0.55
                },
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block h-px flex-1 max-w-[40px]",
                        style: {
                            background: '#C9A96E',
                            opacity: 0.5
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#C9A96E',
                            fontSize: '12px'
                        },
                        children: "◆"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                        lineNumber: 93,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block h-px flex-1 max-w-[40px]",
                        style: {
                            background: '#C9A96E',
                            opacity: 0.5
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                        lineNumber: 94,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
                lineNumber: 82,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CategorySection/SectionHeader.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
_s(SectionHeader, "2ysDzQv+U/WqhQbSVTAfZxlMJLA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = SectionHeader;
var _c;
__turbopack_context__.k.register(_c, "SectionHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/FilterTabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterTabs",
    ()=>FilterTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const TABS_DATA = [
    {
        label: 'Tümü',
        id: 'Tümü',
        key: 'cat_filter_all'
    },
    {
        label: 'Oturma',
        id: 'Oturma',
        key: 'cat_filter_liv'
    },
    {
        label: 'Yatak',
        id: 'Yatak',
        key: 'cat_filter_bed'
    },
    {
        label: 'Yemek',
        id: 'Yemek',
        key: 'cat_filter_din'
    },
    {
        label: 'Çalışma',
        id: 'Çalışma',
        key: 'cat_filter_off'
    },
    {
        label: 'Aydınlatma',
        id: 'Aydınlatma',
        key: 'cat_filter_light'
    }
];
function FilterTabs({ active, onChange }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hidden md:flex items-center justify-center gap-2 mb-10",
        role: "tablist",
        "aria-label": t('cat_filter_label') || "Kategori filtreleri",
        children: TABS_DATA.map((tab)=>{
            const isActive = active === tab.id;
            const displayText = t(tab.key) || tab.label;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                role: "tab",
                "aria-selected": isActive,
                onClick: ()=>onChange(tab.id),
                className: "relative px-5 py-2 rounded-full text-[12px] tracking-wide font-bold uppercase transition-colors duration-[250ms]",
                style: {
                    color: isActive ? 'white' : 'rgba(28,28,30,0.6)',
                    border: isActive ? 'none' : '1px solid rgba(0,0,0,0.12)',
                    background: 'transparent',
                    zIndex: 1
                },
                onMouseOver: (e)=>{
                    if (!isActive) {
                        e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                        e.currentTarget.style.color = '#1C1C1E';
                    }
                },
                onMouseOut: (e)=>{
                    if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'rgba(28,28,30,0.6)';
                    }
                },
                children: [
                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        layoutId: "activeTab",
                        className: "absolute inset-0 rounded-full",
                        style: {
                            background: '#1C1C1E',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            zIndex: -1
                        },
                        transition: {
                            type: 'spring',
                            stiffness: 380,
                            damping: 30
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/FilterTabs.tsx",
                        lineNumber: 63,
                        columnNumber: 29
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: displayText
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/FilterTabs.tsx",
                        lineNumber: 74,
                        columnNumber: 25
                    }, this)
                ]
            }, tab.id, true, {
                fileName: "[project]/src/components/CategorySection/FilterTabs.tsx",
                lineNumber: 37,
                columnNumber: 21
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/CategorySection/FilterTabs.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, this);
}
_s(FilterTabs, "xTA27ds7Z+fTM4rUKUamcPNer0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = FilterTabs;
var _c;
__turbopack_context__.k.register(_c, "FilterTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/CategoryBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryBadge",
    ()=>CategoryBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function CategoryBadge({ text, textKey, variant = 'glass', isHovered = false }) {
    if (variant === 'gold') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center px-3 py-1 rounded-full font-medium tracking-wide",
            style: {
                fontSize: '10px',
                background: '#C9A96E',
                color: '#1C1C1E'
            },
            "data-lang-key": textKey,
            suppressHydrationWarning: true,
            children: text
        }, void 0, false, {
            fileName: "[project]/src/components/CategorySection/CategoryBadge.tsx",
            lineNumber: 18,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center px-3 py-1 rounded-full font-medium tracking-wide transition-all duration-300",
        style: {
            fontSize: '11px',
            color: 'white',
            background: isHovered ? 'rgba(201,169,110,0.8)' : 'rgba(255,255,255,0.15)',
            border: `1px solid ${isHovered ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.25)'}`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
        },
        "data-lang-key": textKey,
        suppressHydrationWarning: true,
        children: text
    }, void 0, false, {
        fileName: "[project]/src/components/CategorySection/CategoryBadge.tsx",
        lineNumber: 34,
        columnNumber: 9
    }, this);
}
_c = CategoryBadge;
var _c;
__turbopack_context__.k.register(_c, "CategoryBadge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/CategoryRevealButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryRevealButton",
    ()=>CategoryRevealButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
'use client';
;
;
;
function CategoryRevealButton({ label, isHovered }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.85,
            y: 8
        },
        animate: isHovered ? {
            opacity: 1,
            scale: 1,
            y: 0
        } : {
            opacity: 0,
            scale: 0.85,
            y: 8
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
        className: "absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-sm px-4 py-2 transition-colors duration-300",
        style: {
            background: isHovered ? 'rgba(201,169,110,0.85)' : 'rgba(255,255,255,0.12)',
            border: `1px solid ${isHovered ? 'rgba(201,169,110,0.5)' : 'rgba(255,255,255,0.3)'}`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: isHovered ? '#1C1C1E' : 'white',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            zIndex: 5
        },
        "aria-label": label,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "data-lang-key": "cat_btn_reveal",
                children: "Keşfet"
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/CategoryRevealButton.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                animate: {
                    x: isHovered ? 4 : 0
                },
                transition: {
                    duration: 0.2
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/src/components/CategorySection/CategoryRevealButton.tsx",
                    lineNumber: 50,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/CategoryRevealButton.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CategorySection/CategoryRevealButton.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_c = CategoryRevealButton;
var _c;
__turbopack_context__.k.register(_c, "CategoryRevealButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/category.data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES,
    "CATEGORY_FILTER_MAP",
    ()=>CATEGORY_FILTER_MAP
]);
const CATEGORIES = [
    {
        id: 'oturma-odasi',
        label: 'Oturma Odası',
        labelKey: 'nav_living_room',
        subLabel: 'Koleksiyon',
        subLabelKey: 'cat_col',
        productCount: 48,
        href: '/kategori/oturma-odasi',
        image: '/images/categories/living-room.jpg',
        badge: 'Yeni Sezon',
        badgeKey: 'cat_badge_new',
        featured: true,
        span: 5
    },
    {
        id: 'yatak-odasi',
        label: 'Yatak Odası',
        labelKey: 'nav_bedroom',
        subLabel: 'Kategori',
        subLabelKey: 'cat_cat',
        productCount: 36,
        href: '/kategori/yatak-odasi',
        image: '/images/categories/bedroom.jpg',
        span: 7
    },
    {
        id: 'yemek-odasi',
        label: 'Yemek Odası',
        labelKey: 'nav_dining',
        subLabel: 'Kategori',
        subLabelKey: 'cat_cat',
        productCount: 24,
        href: '/kategori/yemek-odasi',
        image: '/images/categories/dining.jpg',
        span: 5
    },
    {
        id: 'calisma-odasi',
        label: 'Çalışma Odası',
        labelKey: 'nav_office',
        subLabel: 'Kategori',
        subLabelKey: 'cat_cat',
        productCount: 18,
        href: '/kategori/calisma-odasi',
        image: '/images/categories/office.jpg',
        span: 7
    },
    {
        id: 'aydinlatma',
        label: 'Aydınlatma',
        labelKey: 'nav_lighting',
        subLabel: 'Koleksiyon',
        subLabelKey: 'cat_col',
        productCount: 32,
        href: '/kategori/aydinlatma',
        image: '/images/categories/lighting.jpg',
        span: 5
    },
    {
        id: 'dekorasyon',
        label: 'Dekorasyon',
        labelKey: 'nav_decoration',
        subLabel: 'Koleksiyon',
        subLabelKey: 'cat_col',
        productCount: 56,
        href: '/kategori/dekorasyon',
        image: '/images/categories/decor.jpg',
        badge: 'TREND',
        badgeKey: 'cat_badge_trend',
        span: 7
    }
];
const CATEGORY_FILTER_MAP = {
    'oturma-odasi': 'Oturma',
    'yatak-odasi': 'Yatak',
    'yemek-odasi': 'Yemek',
    'calisma-odasi': 'Çalışma',
    'aydinlatma': 'Aydınlatma',
    'dekorasyon': 'Tümü'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/CategoryCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategoryCard",
    ()=>CategoryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$CategoryBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/CategoryBadge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$CategoryRevealButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/CategoryRevealButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$category$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/category.data.ts [app-client] (ecmascript)");
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
const EASE_SMOOTH = [
    0.25,
    0.46,
    0.45,
    0.94
];
function CategoryCard({ category, index, span, isVisible, activeFilter }) {
    _s();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const reduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const { language, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const isLarge = span >= 7;
    const isPriority = index < 3;
    const match = activeFilter === 'Tümü' || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$category$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_FILTER_MAP"][category.id] === activeFilter;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        animate: {
            opacity: isVisible ? match ? 1 : 0.4 : 0,
            y: isVisible ? 0 : reduceMotion ? 0 : 40,
            scale: match ? 1 : 0.97
        },
        transition: {
            duration: 0.6,
            ease: EASE_SMOOTH,
            delay: isVisible ? index * 0.08 : 0
        },
        style: {
            gridRowEnd: `span ${span}`,
            height: '100%',
            pointerEvents: match ? 'auto' : 'none'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: category.href,
            className: "group relative block w-full h-full overflow-hidden",
            "aria-label": `${category.labelKey ? t(category.labelKey) : category.label} ${t('cat_btn_reveal') || 'kategorisini keşfet'} — ${category.productCount} ${t('common_items') || 'ürün'}`,
            style: {
                borderRadius: '4px',
                cursor: 'pointer',
                outline: isHovered ? '2px solid #C9A96E' : 'none',
                outlineOffset: '2px',
                display: 'block'
            },
            onMouseEnter: (e)=>{
                setIsHovered(true);
                e.currentTarget.style.willChange = 'transform';
            },
            onMouseLeave: (e)=>{
                setIsHovered(false);
                e.currentTarget.style.willChange = 'auto';
            },
            onFocus: ()=>setIsHovered(true),
            onBlur: ()=>setIsHovered(false),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 overflow-hidden",
                    style: {
                        borderRadius: '4px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0",
                            style: {
                                background: 'linear-gradient(135deg, #2a2520 0%, #1a1814 100%)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                            lineNumber: 87,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: category.image,
                            alt: `${category.labelKey ? t(category.labelKey) : category.label} ${t('cat_cat') || 'kategorisi'} — ${category.productCount} ${t('common_items') || 'ürün'}`,
                            fill: true,
                            priority: isPriority,
                            loading: isPriority ? 'eager' : 'lazy',
                            className: "object-cover object-center",
                            sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
                            style: {
                                transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                                transition: `transform 600ms cubic-bezier(${EASE_SMOOTH.join(',')})`
                            },
                            onError: (e)=>{
                                e.currentTarget.style.display = 'none';
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                            lineNumber: 93,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                    lineNumber: 82,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 pointer-events-none",
                    style: {
                        background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55) 100%)',
                        zIndex: 1
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                    lineNumber: 112,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 pointer-events-none",
                    style: {
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 100%)',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 400ms ease',
                        zIndex: 2
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                    lineNumber: 122,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 pointer-events-none",
                    style: {
                        border: isHovered ? '2px solid #C9A96E' : '0px solid #C9A96E',
                        transition: 'border-width 200ms ease',
                        borderRadius: '4px',
                        zIndex: 4
                    },
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                    lineNumber: 134,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0",
                    style: {
                        zIndex: 3
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-4 left-4 flex items-center gap-2",
                            children: category.badge ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$CategoryBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryBadge"], {
                                        text: category.badge,
                                        textKey: category.badgeKey,
                                        isHovered: isHovered
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                                        lineNumber: 151,
                                        columnNumber: 33
                                    }, this),
                                    category.featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$CategoryBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryBadge"], {
                                        text: `${category.productCount} ${t('common_items') || 'parça'}`,
                                        variant: "glass",
                                        isHovered: isHovered
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                                        lineNumber: 153,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$CategoryBadge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryBadge"], {
                                text: `${category.productCount} ${t('common_items') || 'parça'}`,
                                isHovered: isHovered
                            }, void 0, false, {
                                fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                                lineNumber: 161,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                            lineNumber: 148,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-0 left-0 right-0 p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "uppercase font-medium mb-1",
                                    style: {
                                        fontSize: '10px',
                                        letterSpacing: '0.25em',
                                        color: 'rgba(255,255,255,0.6)'
                                    },
                                    children: category.subLabelKey ? t(category.subLabelKey) : category.subLabel
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                                    lineNumber: 170,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                                        fontWeight: 400,
                                        lineHeight: 1.2,
                                        color: 'white',
                                        fontSize: isLarge ? 'clamp(1.25rem, 2.5vw, 1.875rem)' : 'clamp(1.125rem, 2vw, 1.5rem)',
                                        marginTop: '2px'
                                    },
                                    "data-lang-key": category.labelKey,
                                    children: category.labelKey ? t(category.labelKey) : category.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                                    lineNumber: 180,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1",
                                    style: {
                                        fontSize: '11px',
                                        color: 'rgba(255,255,255,0.6)'
                                    },
                                    children: [
                                        category.productCount,
                                        " ",
                                        t('common_items') || 'parça'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                                    lineNumber: 196,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                            lineNumber: 169,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$CategoryRevealButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryRevealButton"], {
                            label: `${category.labelKey ? t(category.labelKey) : category.label} ${t('cat_btn_reveal') || 'kategorisini keşfet'}`,
                            isHovered: isHovered
                        }, void 0, false, {
                            fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                            lineNumber: 205,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
                    lineNumber: 146,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
            lineNumber: 59,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/CategorySection/CategoryCard.tsx",
        lineNumber: 42,
        columnNumber: 9
    }, this);
}
_s(CategoryCard, "IbhZvUsWTtxYyVF2cNUAqiuLYic=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = CategoryCard;
var _c;
__turbopack_context__.k.register(_c, "CategoryCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/useIntersectionStagger.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIntersectionStagger",
    ()=>useIntersectionStagger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useIntersectionStagger(count, delay = 100) {
    _s();
    const [visibleItems, setVisibleItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Array(count).fill(false));
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIntersectionStagger.useEffect": ()=>{
            const observer = new IntersectionObserver({
                "useIntersectionStagger.useEffect": ([entry])=>{
                    if (entry.isIntersecting) {
                        Array.from({
                            length: count
                        }).forEach({
                            "useIntersectionStagger.useEffect": (_, i)=>{
                                setTimeout({
                                    "useIntersectionStagger.useEffect": ()=>{
                                        setVisibleItems({
                                            "useIntersectionStagger.useEffect": (prev)=>{
                                                const next = [
                                                    ...prev
                                                ];
                                                next[i] = true;
                                                return next;
                                            }
                                        }["useIntersectionStagger.useEffect"]);
                                    }
                                }["useIntersectionStagger.useEffect"], i * delay);
                            }
                        }["useIntersectionStagger.useEffect"]);
                        observer.disconnect(); // fire once
                    }
                }
            }["useIntersectionStagger.useEffect"], {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            if (containerRef.current) observer.observe(containerRef.current);
            return ({
                "useIntersectionStagger.useEffect": ()=>observer.disconnect()
            })["useIntersectionStagger.useEffect"];
        }
    }["useIntersectionStagger.useEffect"], [
        count,
        delay
    ]);
    return {
        containerRef,
        visibleItems
    };
}
_s(useIntersectionStagger, "YQlzdwvadgTBOT5UMOqTTF3cslw=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/useMasonry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMasonry",
    ()=>useMasonry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const SPANS = {
    desktop: [
        5,
        7,
        5,
        7,
        5,
        7
    ],
    tablet: [
        5,
        7,
        5,
        7,
        5,
        5
    ],
    mobile: [
        5,
        5,
        5,
        5,
        5,
        5
    ]
};
function getBreakpoint(w) {
    if (w >= 1024) return 'desktop';
    if (w >= 768) return 'tablet';
    return 'mobile';
}
function useMasonry(count = 6) {
    _s();
    const [bp, setBp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('desktop');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMasonry.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const update = {
                "useMasonry.useEffect.update": ()=>setBp(getBreakpoint(window.innerWidth))
            }["useMasonry.useEffect.update"];
            update();
            window.addEventListener('resize', update, {
                passive: true
            });
            return ({
                "useMasonry.useEffect": ()=>window.removeEventListener('resize', update)
            })["useMasonry.useEffect"];
        }
    }["useMasonry.useEffect"], []);
    const spans = SPANS[bp].slice(0, count);
    return {
        spans,
        isMobile: bp === 'mobile',
        isTablet: bp === 'tablet',
        isDesktop: bp === 'desktop'
    };
}
_s(useMasonry, "zpGNvxv0DaTw0IPdXrYBp/D/9ig=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/MasonryGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MasonryGrid",
    ()=>MasonryGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$CategoryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/CategoryCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$useIntersectionStagger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/useIntersectionStagger.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$useMasonry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/useMasonry.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// ─── Mobile Carousel ──────────────────────────────────────────────────────────
function MobileCarousel({ categories, activeFilter }) {
    _s();
    const trackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeIdx, setActiveIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileCarousel.useEffect": ()=>{
            const el = trackRef.current;
            if (!el) return;
            const onScroll = {
                "MobileCarousel.useEffect.onScroll": ()=>{
                    const cardWidth = el.scrollWidth / categories.length;
                    setActiveIdx(Math.round(el.scrollLeft / cardWidth));
                }
            }["MobileCarousel.useEffect.onScroll"];
            el.addEventListener('scroll', onScroll, {
                passive: true
            });
            return ({
                "MobileCarousel.useEffect": ()=>el.removeEventListener('scroll', onScroll)
            })["MobileCarousel.useEffect"];
        }
    }["MobileCarousel.useEffect"], [
        categories.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "region",
        "aria-label": "Kategoriler",
        className: "md:hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: trackRef,
                className: "flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide",
                style: {
                    WebkitOverflowScrolling: 'touch',
                    paddingLeft: '20px',
                    paddingRight: '20px'
                },
                children: categories.map((cat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "shrink-0 relative overflow-hidden",
                        style: {
                            scrollSnapAlign: 'start',
                            width: '72vw',
                            aspectRatio: '3/4',
                            borderRadius: '4px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$CategoryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryCard"], {
                            category: cat,
                            index: i,
                            span: 5,
                            isVisible: true,
                            activeFilter: activeFilter
                        }, void 0, false, {
                            fileName: "[project]/src/components/CategorySection/MasonryGrid.tsx",
                            lineNumber: 59,
                            columnNumber: 25
                        }, this)
                    }, cat.id, false, {
                        fileName: "[project]/src/components/CategorySection/MasonryGrid.tsx",
                        lineNumber: 49,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/MasonryGrid.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-2 mt-4",
                role: "tablist",
                "aria-label": "Slider göstergesi",
                children: categories.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        role: "tab",
                        "aria-selected": activeIdx === i,
                        "aria-label": `${i + 1}. kategori`,
                        onClick: ()=>{
                            const el = trackRef.current;
                            if (!el) return;
                            const cardWidth = el.scrollWidth / categories.length;
                            el.scrollTo({
                                left: cardWidth * i,
                                behavior: 'smooth'
                            });
                        },
                        className: "transition-all duration-300",
                        style: {
                            height: '6px',
                            width: activeIdx === i ? '24px' : '6px',
                            borderRadius: '9999px',
                            background: activeIdx === i ? '#1C1C1E' : 'rgba(28,28,30,0.3)',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0
                        }
                    }, i, false, {
                        fileName: "[project]/src/components/CategorySection/MasonryGrid.tsx",
                        lineNumber: 77,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/MasonryGrid.tsx",
                lineNumber: 71,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CategorySection/MasonryGrid.tsx",
        lineNumber: 37,
        columnNumber: 9
    }, this);
}
_s(MobileCarousel, "vYqT9ek8+8Uw6XDlNLn715LKvhA=");
_c = MobileCarousel;
// ─── Desktop Masonry ──────────────────────────────────────────────────────────
function DesktopMasonry({ categories, activeFilter }) {
    _s1();
    const { containerRef, visibleItems } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$useIntersectionStagger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIntersectionStagger"])(categories.length, 100);
    const { spans, isTablet } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$useMasonry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasonry"])(categories.length);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "hidden md:grid",
        style: {
            gridTemplateColumns: isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
            gridAutoRows: '80px',
            gap: isTablet ? '12px' : '16px'
        },
        children: categories.map((cat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$CategoryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CategoryCard"], {
                category: cat,
                index: i,
                span: spans[i] ?? 5,
                isVisible: visibleItems[i] ?? false,
                activeFilter: activeFilter
            }, cat.id, false, {
                fileName: "[project]/src/components/CategorySection/MasonryGrid.tsx",
                lineNumber: 131,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/CategorySection/MasonryGrid.tsx",
        lineNumber: 121,
        columnNumber: 9
    }, this);
}
_s1(DesktopMasonry, "Wt9zpZQ8tJCdxKkgnLjXLpJMgw8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$useIntersectionStagger$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIntersectionStagger"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$useMasonry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasonry"]
    ];
});
_c1 = DesktopMasonry;
function MasonryGrid({ categories, activeFilter }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileCarousel, {
                categories: categories,
                activeFilter: activeFilter
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/MasonryGrid.tsx",
                lineNumber: 148,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DesktopMasonry, {
                categories: categories,
                activeFilter: activeFilter
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/MasonryGrid.tsx",
                lineNumber: 149,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_c2 = MasonryGrid;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "MobileCarousel");
__turbopack_context__.k.register(_c1, "DesktopMasonry");
__turbopack_context__.k.register(_c2, "MasonryGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/ViewAllButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ViewAllButton",
    ()=>ViewAllButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ViewAllButton() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-40px'
    });
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: ref,
        className: "mt-12 md:mt-16 text-center",
        initial: {
            opacity: 0,
            y: 20
        },
        animate: isInView ? {
            opacity: 1,
            y: 0
        } : {},
        transition: {
            duration: 0.5,
            delay: 0.3
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/urunler",
                "aria-label": t('cat_view_all_aria') || "Tüm kategorileri görüntüle",
                className: "group relative inline-flex items-center gap-3 px-8 py-3.5 md:px-12 md:py-4 overflow-hidden rounded-sm",
                style: {
                    border: '1.5px solid #1C1C1E',
                    color: '#1C1C1E',
                    fontSize: '13px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    textDecoration: 'none'
                },
                onMouseEnter: (e)=>{
                    e.currentTarget.querySelector('#btn-fill').style.transform = 'scaleX(1)';
                    e.currentTarget.querySelector('#btn-text').style.color = 'white';
                    e.currentTarget.querySelector('#btn-arrow').style.color = 'white';
                },
                onMouseLeave: (e)=>{
                    e.currentTarget.querySelector('#btn-fill').style.transform = 'scaleX(0)';
                    e.currentTarget.querySelector('#btn-text').style.color = '#1C1C1E';
                    e.currentTarget.querySelector('#btn-arrow').style.color = '#1C1C1E';
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        id: "btn-fill",
                        className: "absolute inset-0",
                        style: {
                            background: '#1C1C1E',
                            transform: 'scaleX(0)',
                            transformOrigin: 'left',
                            transition: 'transform 350ms cubic-bezier(0.25,0.46,0.45,0.94)'
                        },
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/ViewAllButton.tsx",
                        lineNumber: 47,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        id: "btn-text",
                        className: "relative z-10 transition-colors duration-[350ms]",
                        style: {
                            color: '#1C1C1E'
                        },
                        children: t('cat_view_all') || "Tümünü Gör"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/ViewAllButton.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        id: "btn-arrow",
                        className: "relative z-10 transition-all duration-300",
                        style: {
                            color: '#1C1C1E',
                            transform: 'translateX(0)'
                        },
                        onMouseEnter: (e)=>{
                            e.currentTarget.style.transform = 'translateX(6px)';
                        },
                        onMouseLeave: (e)=>{
                            e.currentTarget.style.transform = 'translateX(0)';
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/CategorySection/ViewAllButton.tsx",
                            lineNumber: 80,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/ViewAllButton.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CategorySection/ViewAllButton.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/urunler",
                className: "mt-4 block text-sm transition-colors duration-200",
                style: {
                    color: 'rgba(28,28,30,0.5)',
                    textDecoration: 'none'
                },
                onMouseEnter: (e)=>{
                    e.currentTarget.style.color = '#C9A96E';
                    e.currentTarget.style.textDecoration = 'underline';
                },
                onMouseLeave: (e)=>{
                    e.currentTarget.style.color = 'rgba(28,28,30,0.5)';
                    e.currentTarget.style.textDecoration = 'none';
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: t('cat_view_all_desc') || "Tüm kategorilere göz atın"
                }, void 0, false, {
                    fileName: "[project]/src/components/CategorySection/ViewAllButton.tsx",
                    lineNumber: 98,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/ViewAllButton.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CategorySection/ViewAllButton.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_s(ViewAllButton, "mNDNyvEU+JcX/kQUnbZSl3pS3eA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = ViewAllButton;
var _c;
__turbopack_context__.k.register(_c, "ViewAllButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/CategorySection/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CategorySection",
    ()=>CategorySection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$SectionHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/SectionHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$FilterTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/FilterTabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$MasonryGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/MasonryGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$ViewAllButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/ViewAllButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$category$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CategorySection/category.data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDarkMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useDarkMode.ts [app-client] (ecmascript)");
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
;
function CategorySection() {
    _s();
    const { isDark, mounted } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDarkMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDarkMode"])();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Tümü');
    // Subtle parallax for watermark text
    const { scrollY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])();
    const watermarkY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollY, [
        0,
        1000
    ], [
        0,
        -80
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "categories",
        "aria-labelledby": "categories-heading",
        className: "relative py-24 md:py-32 overflow-hidden",
        style: {
            background: '#F5F0EB'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 right-0 overflow-hidden pointer-events-none",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    viewBox: "0 0 1440 80",
                    preserveAspectRatio: "none",
                    className: "w-full",
                    style: {
                        height: 'clamp(48px, 5vw, 80px)',
                        display: 'block'
                    },
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/index.tsx",
                        lineNumber: 43,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/CategorySection/index.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/index.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    viewBox: "0 0 1440 80",
                    preserveAspectRatio: "none",
                    className: "w-full",
                    style: {
                        height: 'clamp(48px, 5vw, 80px)',
                        display: 'block'
                    },
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z",
                        fill: "white"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/index.tsx",
                        lineNumber: 62,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/CategorySection/index.tsx",
                    lineNumber: 55,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/index.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden",
                style: {
                    y: watermarkY
                },
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-bold text-center leading-none tracking-widest",
                    style: {
                        fontSize: '30vw',
                        opacity: 0.03,
                        color: '#1C1C1E',
                        fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                        whiteSpace: 'nowrap'
                    },
                    children: "SELIS"
                }, void 0, false, {
                    fileName: "[project]/src/components/CategorySection/index.tsx",
                    lineNumber: 75,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/CategorySection/index.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative max-w-7xl mx-auto px-4 sm:px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$SectionHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SectionHeader"], {}, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/index.tsx",
                        lineNumber: 91,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$FilterTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterTabs"], {
                        active: activeFilter,
                        onChange: setActiveFilter
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/index.tsx",
                        lineNumber: 93,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$MasonryGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MasonryGrid"], {
                        categories: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$category$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"],
                        activeFilter: activeFilter
                    }, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/index.tsx",
                        lineNumber: 95,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CategorySection$2f$ViewAllButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ViewAllButton"], {}, void 0, false, {
                        fileName: "[project]/src/components/CategorySection/index.tsx",
                        lineNumber: 97,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CategorySection/index.tsx",
                lineNumber: 90,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/CategorySection/index.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}
_s(CategorySection, "iWQPXuopMPr0RhHpHRkqJs71970=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useDarkMode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDarkMode"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = CategorySection;
var _c;
__turbopack_context__.k.register(_c, "CategorySection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Marketing/FlashSaleTimer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlashSaleTimer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
function calculateTimeLeft(endDate) {
    const total = Math.max(0, endDate.getTime() - Date.now());
    const hours = Math.floor(total / (1000 * 60 * 60));
    const minutes = Math.floor(total % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(total % (1000 * 60) / 1000);
    return {
        hours,
        minutes,
        seconds,
        total
    };
}
function Colon({ urgent, blink }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
        animate: {
            opacity: blink ? 0.2 : 1
        },
        transition: {
            duration: 0.4
        },
        className: `text-2xl font-bold mb-4 select-none transition-colors duration-500 ${urgent ? 'text-[#E53935]' : 'text-[#C9A96E]'}`,
        children: ":"
    }, void 0, false, {
        fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
        lineNumber: 31,
        columnNumber: 9
    }, this);
}
_c = Colon;
/* ─── Compact (Ürün sayfası) ───────────────────────────── */ function CompactTimer({ timeLeft, isExpired }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    if (isExpired) return null;
    const pad = (n)=>String(n).padStart(2, '0');
    const timeStr = `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "inline-flex items-center gap-2 bg-[#E53935] text-white text-[12px] font-semibold px-3 py-1.5 rounded-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: t('flash_sale_ends') || '⚡ Bu fiyat biter:'
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "tabular-nums font-bold tracking-wider",
                children: timeStr
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "opacity-70 text-[10px] font-normal border-l border-white/30 pl-2",
                children: t('flash_sale_limited') || 'Sınırlı süre'
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, this);
}
_s(CompactTimer, "xTA27ds7Z+fTM4rUKUamcPNer0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c1 = CompactTimer;
function FlashSaleTimer({ endDate, compact = false, onExpire }) {
    _s1();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    // Start with null to prevent hydration mismatch
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [blink, setBlink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlashSaleTimer.useEffect": ()=>{
            // Only run on client
            const initial = calculateTimeLeft(endDate);
            setTimeLeft(initial);
            if (initial.total <= 0) {
                onExpire?.();
                return;
            }
            const interval = setInterval({
                "FlashSaleTimer.useEffect.interval": ()=>{
                    const next = calculateTimeLeft(endDate);
                    setTimeLeft(next);
                    if (next.total <= 0) {
                        onExpire?.();
                        clearInterval(interval);
                    }
                    setBlink({
                        "FlashSaleTimer.useEffect.interval": (b)=>!b
                    }["FlashSaleTimer.useEffect.interval"]);
                }
            }["FlashSaleTimer.useEffect.interval"], 1000);
            return ({
                "FlashSaleTimer.useEffect": ()=>clearInterval(interval)
            })["FlashSaleTimer.useEffect"];
        }
    }["FlashSaleTimer.useEffect"], [
        endDate,
        onExpire
    ]);
    // Show nothing until mounted and time is calculated
    if (!timeLeft) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-1 opacity-0 h-[76px]",
            "aria-hidden": "true"
        }, void 0, false, {
            fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
            lineNumber: 92,
            columnNumber: 16
        }, this);
    }
    const isExpired = timeLeft.total <= 0;
    const isUrgent = timeLeft.total <= 10 * 60 * 1000; // son 10 dakika
    const isPulse = timeLeft.total <= 60 * 1000; // son 60 saniye
    const pad = (n)=>String(n).padStart(2, '0');
    if (compact) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CompactTimer, {
            timeLeft: timeLeft,
            isExpired: isExpired
        }, void 0, false, {
            fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
            lineNumber: 101,
            columnNumber: 16
        }, this);
    }
    if (isExpired) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center gap-2 text-white/60 text-sm py-2",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: t('flash_sale_ended') || 'Kampanya Sona Erdi'
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 107,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
            lineNumber: 106,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        animate: isUrgent && !shouldReduceMotion ? {
            x: [
                0,
                -2,
                2,
                -2,
                2,
                0
            ]
        } : {
            x: 0
        },
        transition: isUrgent ? {
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 2
        } : {},
        className: "flex items-center gap-1",
        children: [
            isPulse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute inset-0 bg-[#E53935]/10 pointer-events-none",
                animate: {
                    opacity: [
                        0,
                        0.4,
                        0
                    ]
                },
                transition: {
                    duration: 1,
                    repeat: Infinity
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 124,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlipDigit, {
                value: pad(timeLeft.hours),
                label: "hours",
                urgent: isUrgent
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 130,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Colon, {
                urgent: isUrgent,
                blink: blink
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 131,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlipDigit, {
                value: pad(timeLeft.minutes),
                label: "mins",
                urgent: isUrgent
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 132,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Colon, {
                urgent: isUrgent,
                blink: blink
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 133,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlipDigit, {
                value: pad(timeLeft.seconds),
                label: "secs",
                urgent: isUrgent
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 134,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
        lineNumber: 113,
        columnNumber: 9
    }, this);
}
_s1(FlashSaleTimer, "7vNPFmhEj1ZjbsjgeNRZY6DFKXI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c2 = FlashSaleTimer;
function FlipDigit({ value, label, urgent }) {
    _s2();
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const prevValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(value);
    const [flip, setFlip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlipDigit.useEffect": ()=>{
            if (prevValue.current !== value) {
                setFlip(true);
                const t = setTimeout({
                    "FlipDigit.useEffect.t": ()=>setFlip(false)
                }["FlipDigit.useEffect.t"], 300);
                prevValue.current = value;
                return ({
                    "FlipDigit.useEffect": ()=>clearTimeout(t)
                })["FlipDigit.useEffect"];
            }
        }
    }["FlipDigit.useEffect"], [
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `
          relative w-14 h-16 flex items-center justify-center
          rounded-sm overflow-hidden
          ${urgent ? 'bg-[#C0392B]' : 'bg-[#2C2C2E]'}
          transition-colors duration-500
        `,
                style: {
                    perspective: '200px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        initial: shouldReduceMotion ? {
                            opacity: 0
                        } : {
                            rotateX: -90,
                            opacity: 0
                        },
                        animate: {
                            rotateX: 0,
                            opacity: 1
                        },
                        transition: {
                            duration: 0.28,
                            ease: 'easeOut'
                        },
                        className: "text-3xl font-bold text-white tabular-nums select-none",
                        style: {
                            fontFamily: 'var(--font-playfair), Playfair Display, serif'
                        },
                        children: value
                    }, value, false, {
                        fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                        lineNumber: 165,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-x-0 top-1/2 h-px bg-black/20"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                        lineNumber: 176,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 156,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[9px] text-white/50 uppercase tracking-widest font-medium",
                children: t(`flash_sale_${label}`) || label
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
                lineNumber: 178,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Marketing/FlashSaleTimer.tsx",
        lineNumber: 155,
        columnNumber: 9
    }, this);
}
_s2(FlipDigit, "VucHzXgam4uD6jemhJy13EOktH8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c3 = FlipDigit;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Colon");
__turbopack_context__.k.register(_c1, "CompactTimer");
__turbopack_context__.k.register(_c2, "FlashSaleTimer");
__turbopack_context__.k.register(_c3, "FlipDigit");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Marketing/FlashSaleStrip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlashSaleStrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Marketing$2f$FlashSaleTimer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Marketing/FlashSaleTimer.tsx [app-client] (ecmascript)");
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
function FlashSaleStrip() {
    _s();
    const [expired, setExpired] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const [endDate, setEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FlashSaleStrip.useEffect": ()=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_FLASH_SALE_END) {
                setEndDate(new Date(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_FLASH_SALE_END));
            } else {
                const endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999);
                setEndDate(endOfDay);
            }
        }
    }["FlashSaleStrip.useEffect"], []);
    // Do not return null early. Instead, let AnimatePresence handle the unmount.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: !expired && endDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].section, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: 0.6
            },
            className: "relative overflow-hidden bg-[#1C1C1E] w-full",
            "aria-label": "Flash Sale",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent",
                    animate: {
                        x: [
                            '-100%',
                            '100%'
                        ]
                    },
                    transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                    lineNumber: 38,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4 relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    animate: {
                                        rotate: [
                                            0,
                                            -10,
                                            10,
                                            -10,
                                            0
                                        ]
                                    },
                                    transition: {
                                        duration: 0.8,
                                        repeat: Infinity,
                                        repeatDelay: 3
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                        className: "w-5 h-5 text-[#C9A96E] flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                                        lineNumber: 51,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                                    lineNumber: 47,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden sm:flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-[#C9A96E] tracking-[0.25em] uppercase font-medium leading-none",
                                            children: t('flash_sale_limited') || 'Limited Time'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                                            lineNumber: 54,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white font-bold text-sm tracking-wide leading-tight",
                                            children: "FLASH SALE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                                            lineNumber: 57,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                                    lineNumber: 53,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sm:hidden text-[#C9A96E] font-bold text-xs tracking-wider",
                                    children: "FLASH SALE"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                                    lineNumber: 61,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                            lineNumber: 46,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Marketing$2f$FlashSaleTimer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                endDate: endDate,
                                onExpire: ()=>setExpired(true)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                                lineNumber: 68,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                            lineNumber: 67,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/kampanyalar",
                            className: "flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#C9A96E] text-[#1C1C1E] text-[12px] font-bold rounded-sm hover:bg-[#B8915A] transition-colors duration-200 group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: t('campaigns.view_deal') || 'View Deal'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                                    lineNumber: 79,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    className: "w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                                    lineNumber: 80,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                            lineNumber: 75,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
                    lineNumber: 44,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
            lineNumber: 29,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Marketing/FlashSaleStrip.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, this);
}
_s(FlashSaleStrip, "lNhEUOmUGRbN/Hr4AnnIdfw1pzQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = FlashSaleStrip;
var _c;
__turbopack_context__.k.register(_c, "FlashSaleStrip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/products.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"id\":\"new-1\",\"name\":\"Aria Platform Yatak\",\"slug\":\"aria-platform-yatak\",\"description\":\"Dinlendirici uyku için tasarlanmış, modern hatlara sahip minimalist platform yatak.\",\"price\":54990,\"categoryId\":\"2\",\"categorySlug\":\"yatak-odasi\",\"images\":[\"https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800\",\"/images/products/zen-bed-1.jpg\"],\"colors\":[{\"name\":\"Krem\",\"hex\":\"#F5F0EB\"}],\"materials\":[\"Ahşap\",\"Kumaş\"],\"dimensions\":{\"width\":180,\"height\":110,\"depth\":210,\"unit\":\"cm\"},\"stock\":12,\"featured\":true,\"brand\":\"SELIS Sleep\"},{\"id\":\"new-2\",\"name\":\"Oslo Yemek Masası\",\"slug\":\"oslo-yemek-masasi\",\"description\":\"İskandinav tasarımından ilham alan ahşap yemek masası.\",\"price\":38990,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=800\",\"/images/products/nova-table-1.jpg\"],\"colors\":[{\"name\":\"Doğal Ahşap\",\"hex\":\"#C4A265\"}],\"materials\":[\"Meşe\"],\"dimensions\":{\"width\":200,\"height\":75,\"depth\":95,\"unit\":\"cm\"},\"stock\":5,\"featured\":true,\"brand\":\"SELIS Studio\"},{\"id\":\"new-3\",\"name\":\"Studio Çalışma Masası\",\"slug\":\"studio-calisma-masasi\",\"description\":\"Modern çalışma alanları için stil sahibi çalışma masası.\",\"price\":29990,\"categoryId\":\"4\",\"categorySlug\":\"calisma-odasi\",\"images\":[\"https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800\",\"/images/products/oslo-desk-1.jpg\"],\"colors\":[{\"name\":\"Siyah\",\"hex\":\"#2C2C2C\"}],\"materials\":[\"Ahşap\",\"Metal\"],\"dimensions\":{\"width\":140,\"height\":75,\"depth\":60,\"unit\":\"cm\"},\"stock\":8,\"featured\":true,\"brand\":\"SELIS Work\"},{\"id\":\"new-4\",\"name\":\"Celeste Avize\",\"slug\":\"celeste-avize\",\"description\":\"Odanıza lüks bir hava katan şık avize tasarımı.\",\"price\":18990,\"categoryId\":\"5\",\"categorySlug\":\"aydinlatma\",\"images\":[\"https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800\",\"/images/products/celestia-chandelier-1.jpg\"],\"colors\":[{\"name\":\"Altın\",\"hex\":\"#C4A265\"}],\"materials\":[\"Cam\",\"Metal\"],\"dimensions\":{\"width\":60,\"height\":40,\"depth\":60,\"unit\":\"cm\"},\"stock\":14,\"featured\":true,\"brand\":\"SELIS Light\"},{\"id\":\"new-5\",\"name\":\"Marble Vase Set\",\"slug\":\"marble-vase-set\",\"description\":\"Mermer görünümlü dekoratif vazo seti.\",\"price\":4990,\"categoryId\":\"6\",\"categorySlug\":\"dekorasyon\",\"images\":[\"https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800\",\"/images/products/botanica-vase-1.jpg\"],\"colors\":[{\"name\":\"Gri Mermer\",\"hex\":\"#E0E0E0\"}],\"materials\":[\"Seramik\"],\"dimensions\":{\"width\":20,\"height\":35,\"depth\":20,\"unit\":\"cm\"},\"stock\":30,\"featured\":true,\"brand\":\"SELIS Decor\"},{\"id\":\"1\",\"name\":\"Luna Köşe Koltuk\",\"nameKey\":\"prod_name_luna_sofa\",\"slug\":\"luna-kose-koltuk\",\"description\":\"Bouclé kumaşıyla kaplı, yumuşak hatlarıyla salonunuza zarafet katan modüler köşe koltuk. Doğal meşe ayakları ve yüksek yoğunluklu sünger dolgusu ile üstün konfor sunar.\",\"descriptionKey\":\"prod_desc_luna_sofa\",\"price\":89990,\"salePrice\":74990,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"/images/products/luna-sofa-1.jpg\",\"/images/products/luna-sofa-2.jpg\",\"/images/products/luna-sofa-3.jpg\"],\"lifestyleImage\":\"/images/products/luna-sofa-lifestyle.jpg\",\"colors\":[{\"name\":\"Kum Beji\",\"hex\":\"#D4C5B2\"},{\"name\":\"Antrasit\",\"hex\":\"#3C3C3C\"},{\"name\":\"Adaçayı\",\"hex\":\"#8B9E82\"}],\"materials\":[\"Bouclé\",\"Meşe\"],\"dimensions\":{\"width\":320,\"height\":85,\"depth\":180,\"unit\":\"cm\"},\"stock\":12,\"featured\":true,\"isNew\":true,\"brand\":\"SELIS Atelier\"},{\"id\":\"2\",\"name\":\"Aria Berjer\",\"nameKey\":\"prod_name_aria_chair\",\"slug\":\"aria-berjer\",\"description\":\"İtalyan tasarımından ilham alan, keten kumaşlı berjer koltuk. Ceviz ağacı iskelet üzerine el işçiliğiyle üretilmiştir.\",\"descriptionKey\":\"prod_desc_aria_chair\",\"price\":34990,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"/images/products/aria-chair-1.jpg\",\"/images/products/aria-chair-2.jpg\"],\"lifestyleImage\":\"/images/products/aria-chair-lifestyle.jpg\",\"colors\":[{\"name\":\"Keten Beyaz\",\"hex\":\"#F5F0EB\"},{\"name\":\"Terakota\",\"hex\":\"#C67D5B\"}],\"materials\":[\"Keten\",\"Ceviz\"],\"dimensions\":{\"width\":78,\"height\":95,\"depth\":82,\"unit\":\"cm\"},\"stock\":8,\"featured\":true,\"brand\":\"SELIS Atelier\"},{\"id\":\"3\",\"name\":\"Nova Yemek Masası\",\"nameKey\":\"prod_name_nova_table\",\"slug\":\"nova-yemek-masasi\",\"description\":\"Masif meşe ağacından üretilen, 8 kişilik premium yemek masası. Doğal ahşap damarlarıyla her parça kendine özgüdür.\",\"descriptionKey\":\"prod_desc_nova_table\",\"price\":45990,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"/images/products/nova-table-1.jpg\",\"/images/products/nova-table-2.jpg\"],\"lifestyleImage\":\"/images/products/nova-table-lifestyle.jpg\",\"colors\":[{\"name\":\"Doğal Meşe\",\"hex\":\"#C4A265\"},{\"name\":\"Koyu Ceviz\",\"hex\":\"#5C4033\"}],\"materials\":[\"Meşe\"],\"dimensions\":{\"width\":220,\"height\":76,\"depth\":100,\"unit\":\"cm\"},\"stock\":5,\"featured\":true,\"brand\":\"SELIS\"},{\"id\":\"4\",\"name\":\"Zen Yatak Başlığı\",\"nameKey\":\"prod_name_zen_bed\",\"slug\":\"zen-yatak-basligi\",\"description\":\"Kadife kumaşlı, baton dikişli premium yatak başlığı. Sıcak ve lüks bir yatak odası atmosferi yaratır.\",\"descriptionKey\":\"prod_desc_zen_bed\",\"price\":28990,\"categoryId\":\"2\",\"categorySlug\":\"yatak-odasi\",\"images\":[\"/images/products/zen-bed-1.jpg\",\"/images/products/zen-bed-2.jpg\"],\"lifestyleImage\":\"/images/products/zen-bed-lifestyle.jpg\",\"colors\":[{\"name\":\"Gri Kadife\",\"hex\":\"#9E9E9E\"},{\"name\":\"Bej Kadife\",\"hex\":\"#D4C5B2\"},{\"name\":\"Mavi\",\"hex\":\"#7B9EB8\"}],\"materials\":[\"Kadife\"],\"dimensions\":{\"width\":180,\"height\":130,\"depth\":12,\"unit\":\"cm\"},\"stock\":15,\"featured\":false,\"isNew\":true,\"brand\":\"SELIS\"},{\"id\":\"5\",\"name\":\"Orbit Sehpa\",\"nameKey\":\"prod_name_orbit_table\",\"slug\":\"orbit-sehpa\",\"description\":\"Mermer tablalı ve mat altın metal ayaklı minimalist orta sehpa. Modern oturma odaları için zarif bir tamamlayıcı.\",\"descriptionKey\":\"prod_desc_orbit_table\",\"price\":18990,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"/images/products/orbit-table-1.jpg\",\"/images/products/orbit-table-2.jpg\"],\"lifestyleImage\":\"/images/products/orbit-table-lifestyle.jpg\",\"colors\":[{\"name\":\"Beyaz Mermer\",\"hex\":\"#FAFAFA\"},{\"name\":\"Yeşil Mermer\",\"hex\":\"#5B7B6B\"}],\"materials\":[\"Mermer\",\"Metal\"],\"dimensions\":{\"width\":90,\"height\":40,\"depth\":90,\"unit\":\"cm\"},\"stock\":20,\"featured\":true,\"brand\":\"SELIS\"},{\"id\":\"6\",\"name\":\"Aura Lambader\",\"nameKey\":\"prod_name_aura_lamp\",\"slug\":\"aura-lambader\",\"description\":\"El yapımı keten abajurlu, mat siyah metal gövdeli premium lambader. Yumuşak ve sıcak bir aydınlatma sunar.\",\"descriptionKey\":\"prod_desc_aura_lamp\",\"price\":12990,\"categoryId\":\"5\",\"categorySlug\":\"aydinlatma\",\"images\":[\"/images/products/aura-lamp-1.jpg\",\"/images/products/aura-lamp-2.jpg\"],\"lifestyleImage\":\"/images/products/aura-lamp-lifestyle.jpg\",\"colors\":[{\"name\":\"Mat Siyah\",\"hex\":\"#2C2C2C\"},{\"name\":\"Mat Altın\",\"hex\":\"#C4A265\"}],\"materials\":[\"Metal\",\"Keten\"],\"dimensions\":{\"width\":45,\"height\":170,\"depth\":45,\"unit\":\"cm\"},\"stock\":25,\"featured\":false,\"isNew\":true,\"brand\":\"SELIS Luce\"},{\"id\":\"7\",\"name\":\"Serene İkili Koltuk\",\"nameKey\":\"prod_name_serene_sofa\",\"slug\":\"serene-ikili-koltuk\",\"description\":\"Bouclé kumaşıyla kaplı, yuvarlak hatları ve derin oturma alanı ile maksimum konforu sunan ikili koltuk.\",\"descriptionKey\":\"prod_desc_serene_sofa\",\"price\":52990,\"salePrice\":44990,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"/images/products/serene-sofa-1.jpg\",\"/images/products/serene-sofa-2.jpg\"],\"lifestyleImage\":\"/images/products/serene-sofa-lifestyle.jpg\",\"colors\":[{\"name\":\"Krem\",\"hex\":\"#F5F0EB\"},{\"name\":\"Gri\",\"hex\":\"#9E9E9E\"}],\"materials\":[\"Bouclé\",\"Meşe\"],\"dimensions\":{\"width\":195,\"height\":82,\"depth\":95,\"unit\":\"cm\"},\"stock\":7,\"featured\":true,\"brand\":\"SELIS Atelier\"},{\"id\":\"8\",\"name\":\"Botanica Vazo Seti\",\"slug\":\"botanica-vazo-seti\",\"description\":\"El yapımı seramik vazo seti. Mat yüzeyi ve organik formlarıyla doğadan ilham alan dekoratif obje.\",\"price\":4990,\"categoryId\":\"6\",\"categorySlug\":\"dekorasyon\",\"images\":[\"/images/products/botanica-vase-1.jpg\",\"/images/products/botanica-vase-2.jpg\"],\"lifestyleImage\":\"/images/products/botanica-vase-lifestyle.jpg\",\"colors\":[{\"name\":\"Terakota\",\"hex\":\"#C67D5B\"},{\"name\":\"Kum\",\"hex\":\"#D4C5B2\"},{\"name\":\"Adaçayı\",\"hex\":\"#8B9E82\"}],\"materials\":[\"Seramik\"],\"dimensions\":{\"width\":15,\"height\":30,\"depth\":15,\"unit\":\"cm\"},\"stock\":40,\"featured\":false,\"isNew\":true,\"brand\":\"SELIS Casa\"},{\"id\":\"9\",\"name\":\"Oslo Çalışma Masası\",\"slug\":\"oslo-calisma-masasi\",\"description\":\"İskandinav tasarımından ilham alan, masif meşe tablalı ve mat siyah metal ayaklı modern çalışma masası.\",\"price\":24990,\"categoryId\":\"4\",\"categorySlug\":\"calisma-odasi\",\"images\":[\"/images/products/oslo-desk-1.jpg\",\"/images/products/oslo-desk-2.jpg\"],\"lifestyleImage\":\"/images/products/oslo-desk-lifestyle.jpg\",\"colors\":[{\"name\":\"Doğal Meşe\",\"hex\":\"#C4A265\"}],\"materials\":[\"Meşe\",\"Metal\"],\"dimensions\":{\"width\":140,\"height\":76,\"depth\":65,\"unit\":\"cm\"},\"stock\":10,\"featured\":true,\"brand\":\"SELIS\"},{\"id\":\"10\",\"name\":\"Como Sandalye\",\"slug\":\"como-sandalye\",\"description\":\"İtalyan deri döşemeli, masif ceviz iskeletli premium yemek sandalyesi. Ergonomik tasarımıyla uzun oturumlarda bile konfor sunar.\",\"price\":8990,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"/images/products/como-chair-1.jpg\",\"/images/products/como-chair-2.jpg\"],\"lifestyleImage\":\"/images/products/como-chair-lifestyle.jpg\",\"colors\":[{\"name\":\"Koyu Kahve\",\"hex\":\"#5C4033\"},{\"name\":\"Bej\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Deri\",\"Ceviz\"],\"dimensions\":{\"width\":52,\"height\":85,\"depth\":55,\"unit\":\"cm\"},\"stock\":30,\"featured\":false,\"brand\":\"SELIS\"},{\"id\":\"11\",\"name\":\"Celestia Avize\",\"slug\":\"celestia-avize\",\"description\":\"Mat altın kaplama, minimal çizgileriyle modern mekanlara sofistike bir dokunuş katan lüks avize.\",\"price\":22990,\"categoryId\":\"5\",\"categorySlug\":\"aydinlatma\",\"images\":[\"/images/products/celestia-chandelier-1.jpg\",\"/images/products/celestia-chandelier-2.jpg\"],\"lifestyleImage\":\"/images/products/celestia-chandelier-lifestyle.jpg\",\"colors\":[{\"name\":\"Mat Altın\",\"hex\":\"#C4A265\"},{\"name\":\"Mat Siyah\",\"hex\":\"#2C2C2C\"}],\"materials\":[\"Metal\"],\"dimensions\":{\"width\":80,\"height\":45,\"depth\":80,\"unit\":\"cm\"},\"stock\":6,\"featured\":true,\"isNew\":true,\"brand\":\"SELIS Luce\"},{\"id\":\"12\",\"name\":\"Terra Halı\",\"slug\":\"terra-hali\",\"description\":\"El dokuması yün halı. Doğal tonları ve yumuşak dokusuyla mekanınıza sıcaklık katar. Her parça benzersizdir.\",\"price\":15990,\"categoryId\":\"6\",\"categorySlug\":\"dekorasyon\",\"images\":[\"/images/products/terra-rug-1.jpg\",\"/images/products/terra-rug-2.jpg\"],\"lifestyleImage\":\"/images/products/terra-rug-lifestyle.jpg\",\"colors\":[{\"name\":\"Doğal\",\"hex\":\"#D4C5B2\"},{\"name\":\"Antrasit\",\"hex\":\"#3C3C3C\"}],\"materials\":[\"Keten\"],\"dimensions\":{\"width\":200,\"height\":1,\"depth\":300,\"unit\":\"cm\"},\"stock\":14,\"featured\":false,\"brand\":\"SELIS Casa\"},{\"id\":\"selis-2574\",\"name\":\"Charisma Yemek Odası Grubu\",\"slug\":\"charisma-yemek-odasi-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-2-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/2-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/3-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/4-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/5-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/6-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/7-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/8-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/9-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/10-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/11-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/12-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/13-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/14-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/15-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/16-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/17-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/18-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/19-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/20-1-scaled.jpeg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2565\",\"name\":\"Venedik Yemek Odası Grubu\",\"slug\":\"venedik-yemek-odasi-grubu-2\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/2-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/3-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/4-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/5-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/6-10.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2548\",\"name\":\"Oslo Oturma Grubu\",\"slug\":\"oslo-oturma-grubu-2\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/2-10.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/3-10.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/4-10.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/5-10.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/6-9.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/7-9.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/8-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/9-7.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/10-6.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/11-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/12-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/13-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/14-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/15-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/16.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2536\",\"name\":\"Vizyon Oturma Grubu\",\"slug\":\"vizyon-oturma-grubu-2\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-10.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/2-9.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/3-9.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/4-9.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/5-9.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/6-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/7-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/8-7.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/9-6.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/10-5.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2533\",\"name\":\"Sembol Mutfak Takımı\",\"slug\":\"sembol-mutfak-takimi-2\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/WhatsApp-Gorsel-2025-07-14-saat-09.40.17_5f9c56dc-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2523\",\"name\":\"Polo Köşe Koltuk Grubu\",\"slug\":\"polo-kose-koltuk-grubu-2\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-9.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/2-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/3-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/4-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/5-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/6-7.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/7-7.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/8-6.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2520\",\"name\":\"Natura Mutfak Takımı\",\"slug\":\"natura-mutfak-takimi\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/WhatsApp-Gorsel-2025-07-14-saat-09.40.41_c995f3e0.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2493\",\"name\":\"Elita Lux Köşe Koltuk Grubu\",\"slug\":\"elita-lux-kose-koltuk-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-7.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/2-6.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/3-6.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/4-6.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/5-6.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/6-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/7-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/8-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/9-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/10-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/11-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/12-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/13-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2464\",\"name\":\"Charisma Yatak Odası Grubu\",\"slug\":\"charisma-yatak-odasi-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-2-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/2-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/3-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/4-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/5-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/6-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/7-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/8-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/9-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/10-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/11-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/12-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/13-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/14-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/15-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/16-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/17-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/18-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/19-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/20-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/21-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/22-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/23-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/24-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/25-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/26-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/27-scaled.jpeg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2450\",\"name\":\"Charisma Oturma Grubu\",\"slug\":\"charisma-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/3-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/4-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/5-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/6-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/7-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/8-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/9-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/10-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/11-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/07/12-scaled.jpeg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2438\",\"name\":\"Oscar Yatak Odası Grubu\",\"slug\":\"oscar-yatak-odasi-grubu\",\"description\":\"<p>başlıca traitler<br />\\n1.sınıf işçilik<br />\\nMdf baskı işçiliği<br />\\ndolap hariç %100 mdf<br />\\n1. kalite kumaş</p>\\n<p>dolap içi ledler mevcut<br />\\nmakyaj masası ledler başlıkta ledler<br />\\nyatak geniş bir bazaya sahip<br />\\n160&#215;200 &amp; 180&#215;200<br />\\nistek ve ihtiyaca göre karyola boyutu</p>\\n<p>&nbsp;</p>\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-6.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/2-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/1-12.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/3-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/4-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/5-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/6-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/7-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/8-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/9-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/10-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/2-12.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2431\",\"name\":\"Venedik Yemek Odası Grubu\",\"slug\":\"venedik-yemek-odasi-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-5-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/2-4-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/3-4-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/4-4-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/5-4.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2419\",\"name\":\"Oslo Oturma Grubu\",\"slug\":\"oslo-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/2-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/3-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/4-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/5-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/6-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/7-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/8-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/9-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/10-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2408\",\"name\":\"Vizyon Oturma Grubu\",\"slug\":\"vizyon-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/2-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/3-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/4-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/5-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/6-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/7-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/8-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/9-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2405\",\"name\":\"Sembol Mutfak Takımı\",\"slug\":\"sembol-mutfak-takimi\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-2.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2396\",\"name\":\"Polo Köşe Koltuk Grubu\",\"slug\":\"polo-kose-koltuk-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/07/1-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/2-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/3-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/4-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/5-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/6-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/07/7-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2361\",\"name\":\"Rose Genç Odası\",\"slug\":\"rose-genc-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-48-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-50-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-49-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-48-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-46-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-44-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-42-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-40-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-35-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-30.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2349\",\"name\":\"Marıne Genç Odası\",\"slug\":\"marine-genc-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-47-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-49-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-48-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-47-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-45-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-43-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-41-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-39-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-34-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-29-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2338\",\"name\":\"Latte Genç Odası\",\"slug\":\"latte-genc-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-2-2.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/2-6.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/3-6.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/4-6.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/5-6.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/6-5.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/7-5.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/8-5.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/9-4.jpeg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2325\",\"name\":\"Gold Genç Odası\",\"slug\":\"gold-genc-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-46-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-48-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-47-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-46-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-44-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-42-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-40-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-38-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-33-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-28-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-20-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2315\",\"name\":\"Dark Poınt Genç Odası\",\"slug\":\"dark-point-genc-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-45-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-47-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-46-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-45.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-43-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-41-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-39-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-37-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2303\",\"name\":\"Corner Genç Odası\",\"slug\":\"corner-genc-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-44-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-46-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-45-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-44-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-42-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-40.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-38-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-36-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-32-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-27-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2288\",\"name\":\"Cıty Genç Odası\",\"slug\":\"city-genc-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-43.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-45.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-44.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-43.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-37.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-35.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-31.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-26.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-11.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/15-7.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/17-2.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/20.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2277\",\"name\":\"Bıanca Sedirli Genç Odası\",\"slug\":\"bianca-sedirli-genc-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-42-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-44-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-43-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-42-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-41-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-36-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-30-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-25-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-19-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2270\",\"name\":\"Bıanca Cibinikli Genç Odası\",\"slug\":\"bianca-cibinikli-genc-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-41-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-43-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-42-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-41-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-40-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2254\",\"name\":\"Agra Genç Odası\",\"slug\":\"agra-genc-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-40.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-42.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-41.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-2-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-2-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-39.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-35.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-34.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-29.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-24.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-18.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-16.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-12.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-10.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2243\",\"name\":\"Virjin Köşe Koltuk Grubu\",\"slug\":\"virjin-kose-koltuk-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-2-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-41-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-40-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-40-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-39-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-38-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-34-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-33-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-28-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2233\",\"name\":\"Virjin Oturma Grubu\",\"slug\":\"virjin-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-39-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-40-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-39-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-39-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-38-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-37-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-33-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-32-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2222\",\"name\":\"Venüs Oturma Grubu\",\"slug\":\"venus-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-38.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-39.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-38.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-38.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-37.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-36.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-32.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-31.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-27.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2214\",\"name\":\"Vega Köşe Koltuk Grubu\",\"slug\":\"vega-kose-koltuk-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-37.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-38.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-37.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-37.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-36.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-35.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2205\",\"name\":\"Troy Oturma Grubu\",\"slug\":\"troy-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-36.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-37.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-36.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-36.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-35.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-34.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-31.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2194\",\"name\":\"Togo Oturma Grubu\",\"slug\":\"togo-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-35.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-36.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-35.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-35.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-34.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-33.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-30.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-30.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-26.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2182\",\"name\":\"Seul Oturma Grubu\",\"slug\":\"seul-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-34.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-35.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-34.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-34.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-33.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-32.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-29.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-29.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-25.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-23.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2171\",\"name\":\"Rio Relax Köşe Koltuk Grubu\",\"slug\":\"rio-relax-kose-koltuk-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-33.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-34.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-33.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-33.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-32.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-31.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-28.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-28.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-24.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2164\",\"name\":\"Rio Relax Bohem Köşe Koltuk Grubu\",\"slug\":\"rio-relax-bohem-kose-koltuk-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-32.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-33.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-32.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-32.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-31.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2154\",\"name\":\"Rio Oturma Grubu\",\"slug\":\"rio-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-31.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-32.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-31.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-31.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-30.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-30.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-27.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2142\",\"name\":\"Rams Oturma Grubu\",\"slug\":\"rams-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-2-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/2-5-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/3-5-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/4-5-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/5-5-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/6-4-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/7-4-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/8-4-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/9-3-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/10-2-scaled.jpeg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2133\",\"name\":\"Prada Oturma Grubu\",\"slug\":\"prada-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-30.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-31.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-30.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-30.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-29.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-29.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-26.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2125\",\"name\":\"Paulo Oturma Grubu\",\"slug\":\"paulo-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0108.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0106.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0114.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0109.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0105.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/IMG-20240910-WA0115.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2117\",\"name\":\"Okyanus Oturma Grubu\",\"slug\":\"okyanus-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-29.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-30.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-29.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-29.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-28.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-28.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2103\",\"name\":\"Nirvana Oturma Grubu\",\"slug\":\"nirvana-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-28.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-29.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-28-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-28.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-27-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-27-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-25-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-27.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-23.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-22.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-17-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-15-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2086\",\"name\":\"Magnum Oturma Grubu\",\"slug\":\"magnum-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-27.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-28.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-27.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-27.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-26.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-26.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-24.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-26.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-22.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-21.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-16.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-14.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-11.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-9.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/15-6.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2070\",\"name\":\"Lima Oturma Grubu\",\"slug\":\"lima-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-26.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-27.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-26.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-26.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-25.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-25.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-23.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-25.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-21.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-20.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-15.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-10.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-8.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2059\",\"name\":\"Gabon Köşe Koltuk Grubu\",\"slug\":\"gabon-kose-koltuk-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-4-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/2-4-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/3-4-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/4-4-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/5-4-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/6-3-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/7-3-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/8-3-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/9-2-scaled.jpeg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2046\",\"name\":\"Gabon Oturma Grubu\",\"slug\":\"gabon-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-3-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/2-3-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/3-3-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/4-3-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/5-3-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/6-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/7-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/8-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/9-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/10-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/11-1-scaled.jpeg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2030\",\"name\":\"Derin Oturma Grubu\",\"slug\":\"derin-oturma-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-25.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-26.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-25.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-25.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-24.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-24.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-22.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-24.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-20.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-19.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-14.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-12.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-9.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-7.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-2004\",\"name\":\"Besse Köşe Koltuk Grubu\",\"slug\":\"besse-kose-koltuk-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-23.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-24.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-23.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-23.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-22.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-22.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-20.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-22.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-18.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-18.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-11.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-8.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1990\",\"name\":\"Zen Yemek Odası Grubu\",\"slug\":\"zen-yemek-odasi-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-22-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-23-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-22-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-22-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-21-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-21-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-19-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-21-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-17-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-17-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-12-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-10-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1972\",\"name\":\"Virjin Yemek Odası Grubu\",\"slug\":\"virjin-yemek-odasi-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-21-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-22-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-21-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-21-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-20-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-20-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-18-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-20-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-16-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-16-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-7-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-6-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/15-5-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/16-5-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1962\",\"name\":\"Rams Yemek Odası Grubu\",\"slug\":\"rams-yemek-odasi-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/2-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/3-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/4-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/5-2-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/6-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/7-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/8-1-scaled.jpeg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1956\",\"name\":\"Okyanus Yemek Odası Grubu\",\"slug\":\"okyanus-yemek-odasi-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-20.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-21.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-20.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-20.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1942\",\"name\":\"Nevada Yemek Odası Grubu\",\"slug\":\"nevada-yemek-odasi-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-19.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-20.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-19.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-19.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-19.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-19.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-17.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-19.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-15.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-15.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-10.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-8.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1934\",\"name\":\"Mona Yemek Odası Grubu\",\"slug\":\"mona-yemek-odasi-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-18.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-19.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-18.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-18.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-18.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-18.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1909\",\"name\":\"Machka Yemek Odası Grubu\",\"slug\":\"machka-yemek-odasi-grubu\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-16-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-16-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-16-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-16-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-16-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-16-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-15-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-17-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-13-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-13-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1881\",\"name\":\"Liza Yemek Odası Grubu\",\"slug\":\"liza-yemek-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-15.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-15.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-15.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-15.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-15.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-15.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-14.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-16.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1869\",\"name\":\"Katre Yemek Odası Grubu\",\"slug\":\"katre-yemek-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/NEK-016599-copy-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/NEK-016600-copy-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/NEK-016601-copy-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/NEK-016602-copy-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/NEK-016603-copy-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/NEK-016604-copy-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/NEK-016607-copy-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/NEK-016608-copy-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/NEK-016609-copy-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/NEK-016612-copy-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1855\",\"name\":\"Estela Yemek Odası Grubu\",\"slug\":\"estela-yemek-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-14-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-14-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-14-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-14-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-14-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-14-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-13-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-15-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-12-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-12-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-7-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1844\",\"name\":\"Elit Yemek Odası Grubu\",\"slug\":\"elit-yemek-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-12.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-14.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1826\",\"name\":\"Caprice Yemek Odası Grubu\",\"slug\":\"caprice-yemek-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-12-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-12-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-12.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-12-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-12-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-12-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-6.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-6.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/15-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/16-4.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1808\",\"name\":\"VİRJİN YATAK ODASI\",\"slug\":\"virjin-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"2\",\"categorySlug\":\"yatak-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-10-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-12-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-10-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-10-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-7-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-5-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-5-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-4-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/15-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/16-3-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1788\",\"name\":\"Viral Yatak Odası\",\"slug\":\"viral-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-10-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-10-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-10-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-10-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-10-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-10-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-11-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-6-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-4-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-4-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/15-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/16-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/17-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/18-1-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1770\",\"name\":\"Toscano Yatak Odası\",\"slug\":\"toscano-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-9-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-8-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-10-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-8-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-8-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-5-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/15-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/16-1-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1747\",\"name\":\"Rams Yatak Odası\",\"slug\":\"rams-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/2-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/3-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/4-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/5-1-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/6-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/7-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/8-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/9-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/10-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/11-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/12-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/13-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/14-scaled.jpeg\",\"https://selishome.com/wp-content/uploads/2025/05/15-scaled.jpeg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1735\",\"name\":\"Mona Yatak Odası\",\"slug\":\"mona-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-8.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-7.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-9.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-7.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-7.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1709\",\"name\":\"Machka Yatak Odası\",\"slug\":\"machka-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-6-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-6-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-6-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-6-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-6-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-6-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-5-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-7-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-6-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-6-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-4-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13-1-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1696\",\"name\":\"Liza Yatak Odası\",\"slug\":\"liza-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-6.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-3.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1680\",\"name\":\"LAGOM YATAK ODASI\",\"slug\":\"lagom-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"2\",\"categorySlug\":\"yatak-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-3.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-5.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/12.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/13.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/14-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1668\",\"name\":\"Katre Yatak Odası\",\"slug\":\"katre-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-4-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-3-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1655\",\"name\":\"Hazel Yatak Odası\",\"slug\":\"hazel-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/7-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-3-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/11-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1643\",\"name\":\"Estela Yatak Odası\",\"slug\":\"estela-yatak-odasi\",\"description\":\"\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/05/1-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/2-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/3-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/4-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/5-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/6-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/8-2-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/9-1-scaled.jpg\",\"https://selishome.com/wp-content/uploads/2025/05/10-1-scaled.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1487\",\"name\":\"Empire Yatak\",\"slug\":\"empire-yatak\",\"description\":\"<p style=\\\"text-align: left\\\" data-start=\\\"0\\\" data-end=\\\"53\\\"><strong data-start=\\\"0\\\" data-end=\\\"51\\\">Empire Yatak: Krallara Layık Bir Uyku Deneyimi!</strong></p>\\n<p style=\\\"text-align: left\\\" data-start=\\\"55\\\" data-end=\\\"369\\\">Güne enerjik başlamak, günün yorgunluğunu tamamen atmak ve kendini tam anlamıyla rahat hissetmek için ihtiyacın olan şey: <strong data-start=\\\"177\\\" data-end=\\\"194\\\">Empire Yatak!</strong> Sadece bir yatak değil, konforun en üst seviyeye taşındığı, vücudunu tam anlamıyla destekleyen ve her uyku anını bir lüks deneyimine dönüştüren <strong data-start=\\\"339\\\" data-end=\\\"366\\\">mükemmel bir uyku alanı</strong>.</p>\\n<p style=\\\"text-align: left\\\" data-start=\\\"371\\\" data-end=\\\"544\\\">Eğer geceleri uykusuzluk çekiyorsan, sabahları yorgun kalkıyorsan veya yatağın rahat ama <strong data-start=\\\"460\\\" data-end=\\\"493\\\">“işte tam olarak aradığım bu”</strong> dedirtmiyorsa, Empire ile tanışmanın tam zamanı!</p>\\n<p style=\\\"text-align: left\\\" data-start=\\\"371\\\" data-end=\\\"544\\\"><img class=\\\"alignleft wp-image-1489 \\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/KAPAK-27-1536x898-1-1024x599.png\\\" alt=\\\"\\\" width=\\\"567\\\" height=\\\"331\\\" /></p>\\n<h3 style=\\\"text-align: left\\\" data-start=\\\"553\\\" data-end=\\\"582\\\"><strong data-start=\\\"557\\\" data-end=\\\"580\\\">Neden Empire Yatak?</strong></h3>\\n<p style=\\\"text-align: left\\\" data-start=\\\"583\\\" data-end=\\\"772\\\"><strong data-start=\\\"583\\\" data-end=\\\"626\\\">Bir yatağın sadece rahat olması yetmez!</strong> Empire Yatak, rahatlığı <strong data-start=\\\"651\\\" data-end=\\\"711\\\">bilimsel destek, üstün malzeme kalitesi ve şık tasarımla</strong> birleştirerek sana <strong data-start=\\\"731\\\" data-end=\\\"761\\\">bambaşka bir uyku deneyimi</strong> sunuyor.</p>\\n<p style=\\\"text-align: left\\\" data-start=\\\"774\\\" data-end=\\\"1195\\\">✔ <strong data-start=\\\"776\\\" data-end=\\\"817\\\">Omurganı destekleyen özel yay sistemi</strong> sayesinde sabahları ağrısız ve dinç uyanırsın.<br data-start=\\\"864\\\" data-end=\\\"867\\\" />✔ <strong data-start=\\\"869\\\" data-end=\\\"913\\\">Vücuda uyum sağlayan özel sünger dolgusu</strong>, her hareketine anında adapte olur.<br data-start=\\\"949\\\" data-end=\\\"952\\\" />✔ <strong data-start=\\\"954\\\" data-end=\\\"997\\\">Üstün hava geçirgenliği sağlayan kumaşı</strong>, terleme sorununu minimuma indirir.<br data-start=\\\"1033\\\" data-end=\\\"1036\\\" />✔ <strong data-start=\\\"1038\\\" data-end=\\\"1063\\\">Zarif ve şık tasarımı</strong>, yatak odana lüks bir dokunuş katar.<br data-start=\\\"1100\\\" data-end=\\\"1103\\\" />✔ <strong data-start=\\\"1105\\\" data-end=\\\"1148\\\">Dayanıklı ve uzun ömürlü malzeme yapısı</strong>, yıllarca ilk günkü konforu yaşamanı sağlar.</p>\\n<p style=\\\"text-align: left\\\" data-start=\\\"1197\\\" data-end=\\\"1427\\\">Empire Yatak, <strong data-start=\\\"1211\\\" data-end=\\\"1259\\\">gün içinde seni en çok yoran şeyleri düşünüp</strong>, vücudunu en iyi şekilde destekleyecek şekilde tasarlandı. <strong data-start=\\\"1319\\\" data-end=\\\"1355\\\">Sabahları dinç, geceleri huzurlu</strong> olman için en iyi malzemeler ve en yenilikçi teknolojiler kullanıldı.</p>\\n<h3 style=\\\"text-align: left\\\" data-start=\\\"1436\\\" data-end=\\\"1483\\\"><strong data-start=\\\"1440\\\" data-end=\\\"1481\\\">Tam Omurga Desteği ve Kesintisiz Uyku</strong></h3>\\n<p style=\\\"text-align: left\\\" data-start=\\\"1484\\\" data-end=\\\"1720\\\">Uyku kalitenin en büyük düşmanı, <strong data-start=\\\"1517\\\" data-end=\\\"1560\\\">sabahları bel ve sırt ağrısıyla uyanmak</strong> değil mi? Empire Yatak, <strong data-start=\\\"1585\\\" data-end=\\\"1647\\\">omurganı mükemmel şekilde hizalayan özel destek katmanları</strong> sayesinde, uyurken bile vücudunun doğru pozisyonda kalmasını sağlıyor.</p>\\n<p style=\\\"text-align: left\\\" data-start=\\\"1722\\\" data-end=\\\"1974\\\">💠 <strong data-start=\\\"1725\\\" data-end=\\\"1757\\\">Çift katmanlı destek süngeri</strong>, vücudunun ağırlığını dengeli dağıtır.<br data-start=\\\"1796\\\" data-end=\\\"1799\\\" />💠 <strong data-start=\\\"1802\\\" data-end=\\\"1827\\\">Ortopedik yay sistemi</strong>, her hareketinde yatağın sana uyum sağlamasını sağlar.<br data-start=\\\"1882\\\" data-end=\\\"1885\\\" />💠 <strong data-start=\\\"1888\\\" data-end=\\\"1919\\\">Kesintisiz uyku teknolojisi</strong>, uyku sırasında döndüğünde bile seni rahatsız etmez.</p>\\n<p style=\\\"text-align: left\\\" data-start=\\\"1976\\\" data-end=\\\"2064\\\">Bu özel sistemler sayesinde <strong data-start=\\\"2004\\\" data-end=\\\"2062\\\">sabahları ağrısız ve yenilenmiş bir şekilde uyanırsın!</strong></p>\\n<h3 data-start=\\\"2073\\\" data-end=\\\"2125\\\"><img class=\\\"wp-image-1490  alignleft\\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/1-28-1536x898-1-1024x599.png\\\" alt=\\\"\\\" width=\\\"564\\\" height=\\\"330\\\" /></h3>\\n<h3 data-start=\\\"2073\\\" data-end=\\\"2125\\\"><strong data-start=\\\"2077\\\" data-end=\\\"2123\\\">Sıcak Yaz Günlerinde Terleme Sorununa Son!</strong></h3>\\n<p data-start=\\\"2126\\\" data-end=\\\"2333\\\">Özellikle yaz aylarında, sıcaklar yüzünden <strong data-start=\\\"2169\\\" data-end=\\\"2183\\\">uyuyamamak</strong> tam bir işkence! Empire Yatak’ın özel hava sirkülasyonu sağlayan kumaşı, <strong data-start=\\\"2257\\\" data-end=\\\"2330\\\">ısıyı dengeler, hava akışını artırır ve serin bir uyku deneyimi sunar</strong>.</p>\\n<p data-start=\\\"2335\\\" data-end=\\\"2570\\\">🌬️ <strong data-start=\\\"2339\\\" data-end=\\\"2375\\\">Nefes alabilen özel dokulu kumaş</strong>, gece boyunca terlemeyi önler.<br data-start=\\\"2406\\\" data-end=\\\"2409\\\" />🌬️ <strong data-start=\\\"2413\\\" data-end=\\\"2465\\\">Hava kanalları sayesinde serin kalma teknolojisi</strong>, ekstra konfor sunar.<br data-start=\\\"2487\\\" data-end=\\\"2490\\\" />🌬️ <strong data-start=\\\"2494\\\" data-end=\\\"2525\\\">Özel nem dengeleyici katman</strong>, cildinin her zaman kuru kalmasını sağlar.</p>\\n<p data-start=\\\"2572\\\" data-end=\\\"2625\\\">Böylece <strong data-start=\\\"2580\\\" data-end=\\\"2623\\\">yazın bile rahat bir uyku çekebilirsin! </strong></p>\\n<h3 data-start=\\\"2634\\\" data-end=\\\"2694\\\"><strong data-start=\\\"2638\\\" data-end=\\\"2692\\\">Çift Kişilik veya Tek Kişilik? Empire Herkes İçin!</strong></h3>\\n<p data-start=\\\"2695\\\" data-end=\\\"2896\\\">Empire Yatak, hem <strong data-start=\\\"2713\\\" data-end=\\\"2728\\\">tek kişilik</strong> hem de <strong data-start=\\\"2736\\\" data-end=\\\"2752\\\">çift kişilik</strong> seçenekleriyle sunuluyor. Eğer <strong data-start=\\\"2784\\\" data-end=\\\"2836\\\">rahatına düşkünsen ve geniş bir yatak istiyorsan</strong>, <strong data-start=\\\"2838\\\" data-end=\\\"2879\\\">king size veya queen size seçenekleri</strong> tam sana göre!</p>\\n<p data-start=\\\"2898\\\" data-end=\\\"3170\\\">👤 <strong data-start=\\\"2901\\\" data-end=\\\"2924\\\">Tek kişilik seçenek</strong>, genç odaları ve dar alanlar için mükemmel bir tercih.<br data-start=\\\"2979\\\" data-end=\\\"2982\\\" />👫 <strong data-start=\\\"2985\\\" data-end=\\\"3010\\\">Çift kişilik modeller</strong>, partnerinle birlikte <strong data-start=\\\"3033\\\" data-end=\\\"3061\\\">kesintisiz uyku deneyimi</strong> yaşaman için tasarlandı.<br data-start=\\\"3086\\\" data-end=\\\"3089\\\" />👑 <strong data-start=\\\"3092\\\" data-end=\\\"3122\\\">King &amp; Queen size yataklar</strong>, maksimum lüks ve geniş alan isteyenler için!</p>\\n<p data-start=\\\"3172\\\" data-end=\\\"3255\\\">İster tek başına yat, ister biriyle paylaş, <strong data-start=\\\"3216\\\" data-end=\\\"3253\\\">Empire Yatak herkese uyum sağlar!</strong></p>\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/02/p10.png\",\"https://selishome.com/wp-content/uploads/2025/02/KAPAK-27-1536x898-1.png\",\"https://selishome.com/wp-content/uploads/2025/02/1-28-1536x898-1.png\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1480\",\"name\":\"Titi Gamer Çocuk Odası\",\"slug\":\"titi-gamer-cocuk-odasi\",\"description\":\"<p data-start=\\\"0\\\" data-end=\\\"81\\\"><strong data-start=\\\"0\\\" data-end=\\\"79\\\">Titi Gamer Genç Odası: Oyuncular İçin Tasarlandı, Konfor ve Stil Bir Arada!</strong></p>\\n<p data-start=\\\"83\\\" data-end=\\\"354\\\">Her oyuncunun hayalindeki oda burada! <strong data-start=\\\"121\\\" data-end=\\\"146\\\">Titi Gamer Genç Odası</strong>, oyun dünyasının heyecanını yaşam alanlarına taşıyan özel tasarımıyla fark yaratıyor. Eğer oyun tutkunuysan ve odanda hem konforu hem de havalı bir atmosferi bir arada istiyorsan, Titi Gamer tam sana göre!</p>\\n<p data-start=\\\"356\\\" data-end=\\\"636\\\">Bu özel genç odası takımı, sadece oyun oynamak için değil, ders çalışırken, dinlenirken ve kendine özel bir alan oluştururken de maksimum rahatlık sunuyor. Ergonomik tasarımı, geniş depolama alanları ve <strong data-start=\\\"559\\\" data-end=\\\"590\\\">gaming temalı şık detayları</strong> ile tam bir oyuncu odası deneyimi sağlıyor.</p>\\n<p><img class=\\\"wp-image-1485  alignleft\\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/IMG_6625-kopya-2048x1365-1-1024x683.jpg\\\" alt=\\\"\\\" width=\\\"689\\\" height=\\\"459\\\" /></p>\\n<hr data-start=\\\"638\\\" data-end=\\\"643\\\" />\\n<h3 data-start=\\\"645\\\" data-end=\\\"689\\\"><strong data-start=\\\"649\\\" data-end=\\\"687\\\">Gerçek Bir Gamer İçin Özel Tasarım</strong></h3>\\n<p data-start=\\\"690\\\" data-end=\\\"935\\\">Gamer olmak sadece oyun oynamak değil, aynı zamanda bir yaşam tarzı! Titi Gamer Genç Odası, <strong data-start=\\\"782\\\" data-end=\\\"843\\\">dinamik tasarımı, LED ışık detayları ve keskin hatlarıyla</strong> modern bir görünüme sahip. Şık ve güçlü duruşu ile her köşesi oyun atmosferini yaşatıyor.</p>\\n<p data-start=\\\"937\\\" data-end=\\\"1051\\\">Odanda hem oyun oynarken hem de dinlenirken rahat edebilmen için her detayı en ince ayrıntısına kadar düşünüldü.</p>\\n<p data-start=\\\"1053\\\" data-end=\\\"1245\\\">🔥 <strong data-start=\\\"1056\\\" data-end=\\\"1089\\\">Gamer ruhunu yansıtan tasarım</strong><br data-start=\\\"1089\\\" data-end=\\\"1092\\\" />🔥 <strong data-start=\\\"1095\\\" data-end=\\\"1130\\\">Ergonomik çalışma ve oyun alanı</strong><br data-start=\\\"1130\\\" data-end=\\\"1133\\\" />🔥 <strong data-start=\\\"1136\\\" data-end=\\\"1164\\\">Geniş depolama çözümleri</strong><br data-start=\\\"1164\\\" data-end=\\\"1167\\\" />🔥 <strong data-start=\\\"1170\\\" data-end=\\\"1203\\\">Kaliteli ve dayanıklı malzeme</strong><br data-start=\\\"1203\\\" data-end=\\\"1206\\\" />🔥 <strong data-start=\\\"1209\\\" data-end=\\\"1243\\\">LED aydınlatmalı özel detaylar</strong></p>\\n<hr data-start=\\\"1247\\\" data-end=\\\"1252\\\" />\\n<h3 data-start=\\\"1254\\\" data-end=\\\"1312\\\"><strong data-start=\\\"1258\\\" data-end=\\\"1310\\\">Ergonomik Gamer Masası: Kazanmak İçin Tasarlandı</strong></h3>\\n<p data-start=\\\"1313\\\" data-end=\\\"1618\\\">Titi Gamer Genç Odası&#8217;nın en dikkat çeken parçalarından biri, <strong data-start=\\\"1375\\\" data-end=\\\"1435\\\">oyuncular için özel tasarlanmış ergonomik çalışma masası</strong>. Oyuncuların uzun saatler boyunca rahat bir şekilde oyun oynayabilmesi ve çalışabilmesi için <strong data-start=\\\"1529\\\" data-end=\\\"1598\\\">geniş yüzey alanı, kablo yönetim sistemi ve sağlam iskelet yapısı</strong> ile desteklenmiş.</p>\\n<p data-start=\\\"1620\\\" data-end=\\\"1887\\\">🎮 <strong data-start=\\\"1623\\\" data-end=\\\"1644\\\">Geniş masa yüzeyi</strong>, çoklu ekran kullanımına uygun<br data-start=\\\"1675\\\" data-end=\\\"1678\\\" />🎮 <strong data-start=\\\"1681\\\" data-end=\\\"1707\\\">Kablo yönetim yuvaları</strong>, düzenli ve temiz bir oyun alanı<br data-start=\\\"1740\\\" data-end=\\\"1743\\\" />🎮 <strong data-start=\\\"1746\\\" data-end=\\\"1773\\\">Özel LED ışık detayları</strong>, oyun atmosferini tamamlayan tasarım<br data-start=\\\"1810\\\" data-end=\\\"1813\\\" />🎮 <strong data-start=\\\"1816\\\" data-end=\\\"1863\\\">Dayanıklı ve çizilmeye karşı dirençli yüzey</strong>, uzun ömürlü kullanım</p>\\n<p data-start=\\\"1889\\\" data-end=\\\"1973\\\">Bu masa, oyun oynarken sana tam anlamıyla <strong data-start=\\\"1931\\\" data-end=\\\"1960\\\">kontrolü ele alma hissini</strong> yaşatacak!</p>\\n<hr data-start=\\\"1975\\\" data-end=\\\"1980\\\" />\\n<h3 data-start=\\\"1982\\\" data-end=\\\"2022\\\"><strong data-start=\\\"1986\\\" data-end=\\\"2020\\\">Konforlu ve Havalı Gamer Yatak</strong></h3>\\n<p data-start=\\\"2023\\\" data-end=\\\"2328\\\">Savaşlar biter ama uyku devam eder! Oyuncular için enerjiyi toplamak çok önemli. Titi Gamer Yatak, <strong data-start=\\\"2122\\\" data-end=\\\"2154\\\">geniş ve ergonomik yapısıyla</strong> kaliteli bir uyku deneyimi sunuyor. Uzun süre oyun oynadıktan sonra rahatça uzanabileceğin <strong data-start=\\\"2246\\\" data-end=\\\"2275\\\">dayanıklı ve şık tasarımı</strong>, odanın geri kalanıyla mükemmel bir uyum sağlıyor.</p>\\n<p data-start=\\\"2330\\\" data-end=\\\"2600\\\">🛏️ <strong data-start=\\\"2334\\\" data-end=\\\"2359\\\">Sağlam iskelet yapısı</strong>, uzun yıllar dayanıklılık<br data-start=\\\"2385\\\" data-end=\\\"2388\\\" />🛏️ <strong data-start=\\\"2392\\\" data-end=\\\"2420\\\">Ergonomik yatak tasarımı</strong>, maksimum konfor<br data-start=\\\"2437\\\" data-end=\\\"2440\\\" />🛏️ <strong data-start=\\\"2444\\\" data-end=\\\"2475\\\">Gaming temalı yatak başlığı</strong>, odanın havasını tamamlayan estetik detay<br data-start=\\\"2517\\\" data-end=\\\"2520\\\" />🛏️ <strong data-start=\\\"2524\\\" data-end=\\\"2563\\\">Depolama alanı sunan bazalı seçenek</strong>, fazla eşyalar için mükemmel çözüm</p>\\n<hr data-start=\\\"2602\\\" data-end=\\\"2607\\\" />\\n<h3 data-start=\\\"2609\\\" data-end=\\\"2653\\\"><img class=\\\"wp-image-1484  alignleft\\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/IMG_6592-kopya-1365x2048-1-683x1024.jpg\\\" alt=\\\"\\\" width=\\\"433\\\" height=\\\"650\\\" /></h3>\\n<h3 data-start=\\\"2609\\\" data-end=\\\"2653\\\"><strong data-start=\\\"2613\\\" data-end=\\\"2651\\\">Geniş ve Kullanışlı Gamer Gardırop</strong></h3>\\n<p data-start=\\\"2654\\\" data-end=\\\"2874\\\">Bir oyuncunun sadece bilgisayarı değil, kıyafetleri ve ekipmanları da önemli! <strong data-start=\\\"2732\\\" data-end=\\\"2755\\\">Titi Gamer Gardırop</strong>, geniş iç hacmi sayesinde hem kıyafetlerini hem de oyun aksesuarlarını düzenli bir şekilde saklaman için tasarlandı.</p>\\n<p data-start=\\\"2876\\\" data-end=\\\"3113\\\">🕹️ <strong data-start=\\\"2880\\\" data-end=\\\"2898\\\">Geniş iç hacim</strong>, maksimum depolama alanı<br data-start=\\\"2923\\\" data-end=\\\"2926\\\" />🕹️ <strong data-start=\\\"2930\\\" data-end=\\\"2953\\\">Özel raf sistemleri</strong>, ekipmanlarını düzenli tutman için ekstra alan<br data-start=\\\"3000\\\" data-end=\\\"3003\\\" />🕹️ <strong data-start=\\\"3007\\\" data-end=\\\"3038\\\">Gaming stili kapak tasarımı</strong>, şık ve modern görünüm<br data-start=\\\"3061\\\" data-end=\\\"3064\\\" />🕹️ <strong data-start=\\\"3068\\\" data-end=\\\"3089\\\">Dayanıklı malzeme</strong>, uzun ömürlü kullanım</p>\\n<p data-start=\\\"3115\\\" data-end=\\\"3234\\\"><strong data-start=\\\"3115\\\" data-end=\\\"3154\\\">Minimalist ama fonksiyonel tasarımı</strong> ile tüm eşyalarını düzenli bir şekilde saklaman için ideal bir çözüm sunuyor!</p>\\n<hr data-start=\\\"3236\\\" data-end=\\\"3241\\\" />\\n<h3 data-start=\\\"3243\\\" data-end=\\\"3315\\\"><strong data-start=\\\"3247\\\" data-end=\\\"3313\\\">Şık ve Fonksiyonel Kitaplık: Bilgi ve Eğlenceyi Bir Arada Tut!</strong></h3>\\n<p data-start=\\\"3316\\\" data-end=\\\"3557\\\">Eğer oyun dünyasında en iyi olmak istiyorsan, hem oyun bilgisini hem de akademik bilgini geliştirmek şart! Titi Gamer Kitaplık, kitaplarını, koleksiyon figürlerini ve oyun ekipmanlarını saklamak için <strong data-start=\\\"3516\\\" data-end=\\\"3540\\\">geniş raf sistemleri</strong> ile donatıldı.</p>\\n<p data-start=\\\"3559\\\" data-end=\\\"3780\\\">📚 <strong data-start=\\\"3562\\\" data-end=\\\"3593\\\">Açık ve kapaklı raf sistemi</strong>, hem dekoratif hem işlevsel kullanım<br data-start=\\\"3630\\\" data-end=\\\"3633\\\" />📚 <strong data-start=\\\"3636\\\" data-end=\\\"3660\\\">Geniş depolama alanı</strong>, ekipmanlarını kolayca yerleştirme imkanı<br data-start=\\\"3702\\\" data-end=\\\"3705\\\" />📚 <strong data-start=\\\"3708\\\" data-end=\\\"3736\\\">Modern ve havalı tasarım</strong>, odanın genel stilini tamamlayan detaylar</p>\\n<p data-start=\\\"3782\\\" data-end=\\\"3911\\\">Bu kitaplık sayesinde <strong data-start=\\\"3804\\\" data-end=\\\"3826\\\">bilgi ve eğlenceyi</strong> bir arada tutarak, en sevdiğin oyunların yanında kitaplarını da sergileyebilirsin!</p>\\n<hr data-start=\\\"3913\\\" data-end=\\\"3918\\\" />\\n<h3 data-start=\\\"3920\\\" data-end=\\\"3983\\\"><strong data-start=\\\"3924\\\" data-end=\\\"3981\\\">Gamer Odasında Olmazsa Olmaz LED Aydınlatma Detayları</strong></h3>\\n<p data-start=\\\"3984\\\" data-end=\\\"4204\\\">Bir oyuncu odasının en dikkat çeken özelliklerinden biri, <strong data-start=\\\"4042\\\" data-end=\\\"4069\\\">ışıklandırma sistemidir</strong>! Titi Gamer Genç Odası’nda kullanılan <strong data-start=\\\"4108\\\" data-end=\\\"4135\\\">özel LED ışık detayları</strong>, odanın ambiyansını tam anlamıyla bir oyun arenasına dönüştürüyor.</p>\\n<p data-start=\\\"4206\\\" data-end=\\\"4450\\\">🔹 <strong data-start=\\\"4209\\\" data-end=\\\"4228\\\">RGB LED ışıklar</strong>, istediğin renk tonunda odana özel bir hava katabilirsin<br data-start=\\\"4285\\\" data-end=\\\"4288\\\" />🔹 <strong data-start=\\\"4291\\\" data-end=\\\"4339\\\">Masada, yatakta ve kitaplıkta ışık detayları</strong>, her noktada şık bir aydınlatma<br data-start=\\\"4371\\\" data-end=\\\"4374\\\" />🔹 <strong data-start=\\\"4377\\\" data-end=\\\"4416\\\">Oyun atmosferini tamamlayan tasarım</strong>, odana bambaşka bir ruh katıyor</p>\\n<p data-start=\\\"4452\\\" data-end=\\\"4564\\\">Bu ışıklandırmalar, gece oyun oynarken veya odanda dinlenirken <strong data-start=\\\"4515\\\" data-end=\\\"4540\\\">mükemmel bir atmosfer</strong> yaratmanı sağlayacak!</p>\\n<hr data-start=\\\"4566\\\" data-end=\\\"4571\\\" />\\n<h3 data-start=\\\"4573\\\" data-end=\\\"4611\\\"><strong data-start=\\\"4577\\\" data-end=\\\"4609\\\">Neden Titi Gamer Genç Odası?</strong></h3>\\n<p data-start=\\\"4612\\\" data-end=\\\"4911\\\">✔ <strong data-start=\\\"4614\\\" data-end=\\\"4650\\\">Gerçek oyuncular için tasarlandı</strong><br data-start=\\\"4650\\\" data-end=\\\"4653\\\" />✔ <strong data-start=\\\"4655\\\" data-end=\\\"4701\\\">Dayanıklı ve uzun ömürlü malzeme kullanımı</strong><br data-start=\\\"4701\\\" data-end=\\\"4704\\\" />✔ <strong data-start=\\\"4706\\\" data-end=\\\"4740\\\">Geniş ve ergonomik oyun masası</strong><br data-start=\\\"4740\\\" data-end=\\\"4743\\\" />✔ <strong data-start=\\\"4745\\\" data-end=\\\"4792\\\">LED ışık detaylarıyla şık ve modern görünüm</strong><br data-start=\\\"4792\\\" data-end=\\\"4795\\\" />✔ <strong data-start=\\\"4797\\\" data-end=\\\"4857\\\">Maksimum depolama alanı sunan geniş gardırop ve kitaplık</strong><br data-start=\\\"4857\\\" data-end=\\\"4860\\\" />✔ <strong data-start=\\\"4862\\\" data-end=\\\"4909\\\">Rahat ve konforlu uyku deneyimi sunan yatak</strong></p>\\n<p data-start=\\\"4913\\\" data-end=\\\"5001\\\">Bu oda, sadece bir yaşam alanı değil, aynı zamanda <strong data-start=\\\"4964\\\" data-end=\\\"4998\\\">oyun dünyasına açılan bir kapı</strong>!</p>\\n<hr data-start=\\\"5003\\\" data-end=\\\"5006\\\" />\\n<h3 data-start=\\\"5008\\\" data-end=\\\"5066\\\"><strong data-start=\\\"5012\\\" data-end=\\\"5064\\\">Sen de Gamer Ruhunu Yansıtan Bir Odaya Sahip Ol!</strong></h3>\\n<p data-start=\\\"5067\\\" data-end=\\\"5286\\\">Titi Gamer Genç Odası, oyun tutkunu gençler için <strong data-start=\\\"5116\\\" data-end=\\\"5148\\\">mükemmel bir deneyim sunuyor</strong>. Maksimum konfor, modern tasarım ve fonksiyonelliği bir araya getiren bu özel koleksiyon, odanı gerçek bir oyun arenasına dönüştürecek!</p>\\n<p data-start=\\\"5288\\\" data-end=\\\"5393\\\" data-is-last-node=\\\"\\\">🚀 <strong data-start=\\\"5291\\\" data-end=\\\"5388\\\">Selishome ayrıcalıklarıyla hemen keşfet ve Titi Gamer ile oyun dünyanı bir üst seviyeye taşı!</strong> 🎮🔥</p>\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/02/p9.png\",\"https://selishome.com/wp-content/uploads/2025/02/IMG_6603-kopya-2048x1415-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/IMG_6608-kopya-scaled-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1472\",\"name\":\"Still Genç Odası\",\"slug\":\"still-genc-odasi\",\"description\":\"<p data-start=\\\"0\\\" data-end=\\\"91\\\"><strong data-start=\\\"0\\\" data-end=\\\"89\\\">Still Genç Odası Grubu: Gençlerin Dinamik Dünyasına Modern ve Fonksiyonel Bir Dokunuş</strong></p>\\n<p data-start=\\\"93\\\" data-end=\\\"490\\\">Gençlerin yaşam alanlarını hem konforlu hem de estetik açıdan mükemmel bir hale getirmek için tasarlanan <strong data-start=\\\"198\\\" data-end=\\\"224\\\">Still Genç Odası Grubu</strong>, modern tasarım anlayışı ve işlevsel detaylarıyla ön plana çıkıyor. Hem ders çalışmak hem de dinlenmek için ideal bir ortam sunan bu özel koleksiyon, geniş depolama alanları, sağlam malzeme kalitesi ve şık detaylarıyla gençlerin ihtiyaçlarını eksiksiz karşılıyor.</p>\\n<h3 data-start=\\\"492\\\" data-end=\\\"528\\\"><strong data-start=\\\"496\\\" data-end=\\\"526\\\">Modern ve Zamansız Tasarım</strong></h3>\\n<p data-start=\\\"529\\\" data-end=\\\"959\\\">Still Genç Odası Grubu, <strong data-start=\\\"553\\\" data-end=\\\"622\\\">çağdaş çizgileri, minimalist detayları ve fonksiyonel tasarımıyla</strong> her yaş grubundaki gençler için ideal bir tercih sunuyor. Kullanılan renk paleti ve malzeme kombinasyonu sayesinde, modern, klasik veya bohem dekorasyon stilleriyle uyum sağlıyor. <strong data-start=\\\"803\\\" data-end=\\\"835\\\">Sade ama etkileyici tasarımı</strong>, gençlerin kişisel tarzlarını özgürce yansıtmalarına olanak tanırken, odalarında düzenli ve ferah bir atmosfer yaratıyor.</p>\\n<h3 data-start=\\\"961\\\" data-end=\\\"1009\\\"><strong data-start=\\\"965\\\" data-end=\\\"1007\\\">Üstün Malzeme Kalitesi ve Dayanıklılık</strong></h3>\\n<p data-start=\\\"1010\\\" data-end=\\\"1145\\\">Still Genç Odası Grubu, <strong data-start=\\\"1034\\\" data-end=\\\"1064\\\">yüksek kaliteli malzemeler</strong> kullanılarak üretilmiştir ve uzun yıllar boyunca ilk günkü sağlamlığını korur.</p>\\n<ul data-start=\\\"1147\\\" data-end=\\\"1420\\\">\\n<li data-start=\\\"1147\\\" data-end=\\\"1226\\\"><strong data-start=\\\"1149\\\" data-end=\\\"1193\\\">Sağlam MDF ve yonga levha iskelet yapısı</strong>, darbelere karşı dayanıklıdır.</li>\\n<li data-start=\\\"1227\\\" data-end=\\\"1341\\\"><strong data-start=\\\"1229\\\" data-end=\\\"1284\\\">Çevre dostu ve su bazlı boya ile kaplanmış yüzeyler</strong>, kimyasal içermediği için sağlıklı bir kullanım sunar.</li>\\n<li data-start=\\\"1342\\\" data-end=\\\"1420\\\"><strong data-start=\\\"1344\\\" data-end=\\\"1377\\\">Kolay temizlenebilir yüzeyler</strong>, hijyenik ve pratik bir kullanım sağlar.</li>\\n</ul>\\n<p data-start=\\\"1422\\\" data-end=\\\"1571\\\">Bu özellikler sayesinde Still, gençlerin sağlığına zarar vermeden, yıllar boyunca güvenle kullanılabilecek bir genç odası grubu olarak öne çıkıyor.</p>\\n<p data-start=\\\"1422\\\" data-end=\\\"1571\\\"><img class=\\\"wp-image-1476 alignleft\\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/1-23-1024x599.png\\\" alt=\\\"\\\" width=\\\"750\\\" height=\\\"439\\\" /></p>\\n<h3 data-start=\\\"1573\\\" data-end=\\\"1621\\\"><strong data-start=\\\"1577\\\" data-end=\\\"1619\\\">Fonksiyonel ve Kullanıcı Dostu Tasarım</strong></h3>\\n<p data-start=\\\"1622\\\" data-end=\\\"1765\\\">Gençlerin tüm ihtiyaçlarını göz önünde bulundurarak tasarlanan Still Genç Odası Grubu, <strong data-start=\\\"1709\\\" data-end=\\\"1747\\\">ergonomik ve işlevsel detaylarıyla</strong> dikkat çekiyor.</p>\\n<h4 data-start=\\\"1767\\\" data-end=\\\"1804\\\"><strong data-start=\\\"1772\\\" data-end=\\\"1802\\\">1. Geniş ve Konforlu Yatak</strong></h4>\\n<p data-start=\\\"1805\\\" data-end=\\\"1931\\\">Gençlerin rahat bir uyku deneyimi yaşaması için özel olarak tasarlanan yatak, hem estetik hem de ergonomik bir yapıya sahip.</p>\\n<ul data-start=\\\"1933\\\" data-end=\\\"2185\\\">\\n<li data-start=\\\"1933\\\" data-end=\\\"1991\\\"><strong data-start=\\\"1935\\\" data-end=\\\"1960\\\">Sağlam iskelet yapısı</strong>, uzun ömürlü kullanım sunar.</li>\\n<li data-start=\\\"1992\\\" data-end=\\\"2074\\\"><strong data-start=\\\"1994\\\" data-end=\\\"2020\\\">Modern başlık tasarımı</strong>, odanın genel atmosferine sofistike bir hava katar.</li>\\n<li data-start=\\\"2075\\\" data-end=\\\"2185\\\"><strong data-start=\\\"2077\\\" data-end=\\\"2121\\\">Bazalı veya alt çekmeceli yatak seçeneği</strong>, ekstra depolama alanı sunarak düzeni korumaya yardımcı olur.</li>\\n</ul>\\n<h4 data-start=\\\"2187\\\" data-end=\\\"2234\\\"><strong data-start=\\\"2192\\\" data-end=\\\"2232\\\">2. Ergonomik ve Geniş Çalışma Masası</strong></h4>\\n<p data-start=\\\"2235\\\" data-end=\\\"2348\\\">Still Çalışma Masası, gençlerin verimli bir şekilde ders çalışabilmesi için ergonomik detaylarla donatılmıştır.</p>\\n<ul data-start=\\\"2350\\\" data-end=\\\"2643\\\">\\n<li data-start=\\\"2350\\\" data-end=\\\"2446\\\"><strong data-start=\\\"2352\\\" data-end=\\\"2373\\\">Geniş yüzey alanı</strong>, bilgisayar, defter ve kırtasiye malzemeleri için yeterli alan sağlar.</li>\\n<li data-start=\\\"2447\\\" data-end=\\\"2559\\\"><strong data-start=\\\"2449\\\" data-end=\\\"2482\\\">Açık ve kapalı raf sistemleri</strong>, kitapları ve kişisel eşyaları düzenli bir şekilde saklamak için idealdir.</li>\\n<li data-start=\\\"2560\\\" data-end=\\\"2643\\\"><strong data-start=\\\"2562\\\" data-end=\\\"2591\\\">Ergonomik masa yüksekliği</strong>, uzun saatler boyunca rahat çalışma imkanı sunar.</li>\\n</ul>\\n<h4 data-start=\\\"2645\\\" data-end=\\\"2687\\\"><strong data-start=\\\"2650\\\" data-end=\\\"2685\\\">3. Geniş ve Kullanışlı Gardırop</strong></h4>\\n<p data-start=\\\"2688\\\" data-end=\\\"2841\\\">Still Gardırop, geniş iç hacmi ve akıllı depolama çözümleriyle gençlerin tüm kıyafet ve aksesuarlarını düzenli bir şekilde saklamalarına yardımcı olur.</p>\\n<ul data-start=\\\"2843\\\" data-end=\\\"3125\\\">\\n<li data-start=\\\"2843\\\" data-end=\\\"2950\\\"><strong data-start=\\\"2845\\\" data-end=\\\"2883\\\">Geniş askı alanı ve raf sistemleri</strong>, farklı kıyafet türleri için organize bir depolama imkanı sunar.</li>\\n<li data-start=\\\"2951\\\" data-end=\\\"3041\\\"><strong data-start=\\\"2953\\\" data-end=\\\"2986\\\">Kapaklı ve çekmeceli bölmeler</strong>, küçük eşyaların kolay erişilebilir olmasını sağlar.</li>\\n<li data-start=\\\"3042\\\" data-end=\\\"3125\\\"><strong data-start=\\\"3044\\\" data-end=\\\"3076\\\">Şık ve modern kapak tasarımı</strong>, odanın dekorasyonuna zarif bir dokunuş katar.</li>\\n</ul>\\n<h4 data-start=\\\"3127\\\" data-end=\\\"3168\\\"><strong data-start=\\\"3132\\\" data-end=\\\"3166\\\">4. Şık ve Fonksiyonel Kitaplık</strong></h4>\\n<p data-start=\\\"3169\\\" data-end=\\\"3364\\\">Gençlerin hem kitaplarını hem de dekoratif objelerini düzenli bir şekilde yerleştirebileceği <strong data-start=\\\"3262\\\" data-end=\\\"3296\\\">modern tasarıma sahip kitaplık</strong>, odanın genel atmosferine uyum sağlayacak şekilde tasarlanmıştır.</p>\\n<ul data-start=\\\"3366\\\" data-end=\\\"3591\\\">\\n<li data-start=\\\"3366\\\" data-end=\\\"3448\\\"><strong data-start=\\\"3368\\\" data-end=\\\"3383\\\">Açık raflar</strong>, kitapları ve dekoratif aksesuarları sergilemek için idealdir.</li>\\n<li data-start=\\\"3449\\\" data-end=\\\"3522\\\"><strong data-start=\\\"3451\\\" data-end=\\\"3471\\\">Kapaklı bölmeler</strong>, özel eşyaları saklamak için ekstra alan sağlar.</li>\\n<li data-start=\\\"3523\\\" data-end=\\\"3591\\\"><strong data-start=\\\"3525\\\" data-end=\\\"3550\\\">Sağlam malzeme yapısı</strong>, uzun ömürlü kullanım garantisi sunar.</li>\\n</ul>\\n<h3 data-start=\\\"3593\\\" data-end=\\\"3652\\\"><strong data-start=\\\"3597\\\" data-end=\\\"3650\\\">Her Dekorasyona Uygun Renk ve Tasarım Seçenekleri</strong></h3>\\n<p data-start=\\\"3653\\\" data-end=\\\"3768\\\">Still Genç Odası Grubu, <strong data-start=\\\"3677\\\" data-end=\\\"3723\\\">gençlerin enerjik ve dinamik tarzına uygun</strong> renk ve doku seçenekleriyle sunulmaktadır.</p>\\n<ul data-start=\\\"3770\\\" data-end=\\\"4019\\\">\\n<li data-start=\\\"3770\\\" data-end=\\\"3863\\\"><strong data-start=\\\"3772\\\" data-end=\\\"3861\\\">Minimalist ve modern dekorasyonlar için soft tonlar (beyaz, gri, açık ahşap dokuları)</strong></li>\\n<li data-start=\\\"3864\\\" data-end=\\\"3942\\\"><strong data-start=\\\"3866\\\" data-end=\\\"3940\\\">Sıcak ve samimi bir atmosfer için koyu ahşap tonları ve pastel renkler</strong></li>\\n<li data-start=\\\"3943\\\" data-end=\\\"4019\\\"><strong data-start=\\\"3945\\\" data-end=\\\"4017\\\">Gençlerin enerjisini yansıtacak cesur ve modern renk kombinasyonları</strong></li>\\n</ul>\\n<p data-start=\\\"4021\\\" data-end=\\\"4129\\\">Bu sayede her tarza ve mekana uyum sağlayan Still, gençlerin yaşam alanlarını daha keyifli hale getiriyor.</p>\\n<h3 data-start=\\\"4131\\\" data-end=\\\"4171\\\"><strong data-start=\\\"4135\\\" data-end=\\\"4169\\\">Güçlü ve Estetik Ayak Tasarımı</strong></h3>\\n<p data-start=\\\"4172\\\" data-end=\\\"4331\\\">Still Genç Odası Grubu’nun zarif tasarımını tamamlayan <strong data-start=\\\"4227\\\" data-end=\\\"4259\\\">yüksek ve sağlam ayak yapısı</strong>, modern duruşunun yanı sıra pratik bir kullanım avantajı da sağlıyor.</p>\\n<ul data-start=\\\"4333\\\" data-end=\\\"4537\\\">\\n<li data-start=\\\"4333\\\" data-end=\\\"4428\\\"><strong data-start=\\\"4335\\\" data-end=\\\"4359\\\">Yüksek ayak tasarımı</strong>, temizlik kolaylığı sunar ve odanın daha ferah görünmesini sağlar.</li>\\n<li data-start=\\\"4429\\\" data-end=\\\"4537\\\"><strong data-start=\\\"4431\\\" data-end=\\\"4468\\\">Metal veya ahşap ayak seçenekleri</strong>, kişisel tercihlere göre farklı dekorasyon tarzlarına uyum sağlar.</li>\\n</ul>\\n<p><img class=\\\"alignnone wp-image-1475 size-full\\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/2-22-1536x898-1.png\\\" alt=\\\"\\\" width=\\\"1536\\\" height=\\\"898\\\" /></p>\\n<h3 data-start=\\\"4539\\\" data-end=\\\"4578\\\"><strong data-start=\\\"4543\\\" data-end=\\\"4576\\\">Neden Still Genç Odası Grubu?</strong></h3>\\n<p data-start=\\\"4579\\\" data-end=\\\"4893\\\">✔ <strong data-start=\\\"4581\\\" data-end=\\\"4608\\\">Modern ve zarif tasarım</strong><br data-start=\\\"4608\\\" data-end=\\\"4611\\\" />✔ <strong data-start=\\\"4613\\\" data-end=\\\"4663\\\">Yüksek kaliteli ve dayanıklı malzeme kullanımı</strong><br data-start=\\\"4663\\\" data-end=\\\"4666\\\" />✔ <strong data-start=\\\"4668\\\" data-end=\\\"4721\\\">Ergonomik ve konforlu yatak, masa ve oturma alanı</strong><br data-start=\\\"4721\\\" data-end=\\\"4724\\\" />✔ <strong data-start=\\\"4726\\\" data-end=\\\"4768\\\">Geniş ve kullanışlı depolama çözümleri</strong><br data-start=\\\"4768\\\" data-end=\\\"4771\\\" />✔ <strong data-start=\\\"4773\\\" data-end=\\\"4831\\\">Gençlerin sağlığını ön planda tutan çevre dostu üretim</strong><br data-start=\\\"4831\\\" data-end=\\\"4834\\\" />✔ <strong data-start=\\\"4836\\\" data-end=\\\"4891\\\">Her dekorasyon tarzına uygun geniş renk seçenekleri</strong></p>\\n<h3 data-start=\\\"4895\\\" data-end=\\\"4962\\\"><strong data-start=\\\"4899\\\" data-end=\\\"4960\\\">Gençlerin Özgür ve Konforlu Alanlarını Still ile Yaratın!</strong></h3>\\n<p data-start=\\\"4963\\\" data-end=\\\"5236\\\">Still Genç Odası Grubu, <strong data-start=\\\"4987\\\" data-end=\\\"5098\\\">hem fonksiyonelliği hem de estetik duruşu ile gençlerin konforunu en üst düzeye çıkaran özel bir koleksiyon</strong>. Yüksek kaliteli malzemeleri, geniş depolama alanları ve şık tasarımıyla genç odalarına zamansız bir şıklık ve maksimum konfor katıyor.</p>\\n<p data-start=\\\"5238\\\" data-end=\\\"5365\\\" data-is-last-node=\\\"\\\"><strong data-start=\\\"5238\\\" data-end=\\\"5365\\\" data-is-last-node=\\\"\\\">Şimdi Selishome ayrıcalıklarıyla Still Genç Odası Grubu’nu keşfedin ve gençlerin yaşam alanlarına modern bir dokunuş katın!</strong></p>\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/02/p8.png\",\"https://selishome.com/wp-content/uploads/2025/02/3-18-1536x898-1.png\",\"https://selishome.com/wp-content/uploads/2025/02/2-22-1536x898-1.png\",\"https://selishome.com/wp-content/uploads/2025/02/1-23.png\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1466\",\"name\":\"Bambu Genç Odası\",\"slug\":\"bambu-genc-odasi\",\"description\":\"<p data-start=\\\"0\\\" data-end=\\\"78\\\"><strong data-start=\\\"0\\\" data-end=\\\"76\\\">Bambu Genç Odası Grubu: Doğal Şıklık ve Fonksiyonelliğin Buluşma Noktası</strong></p>\\n<p data-start=\\\"80\\\" data-end=\\\"468\\\">Genç odaları, bireysel tarzın ve konforun ön planda olduğu özel alanlardır. <strong data-start=\\\"156\\\" data-end=\\\"182\\\">Bambu Genç Odası Grubu</strong>, doğallığı, modern tasarımı ve fonksiyonelliği bir araya getirerek gençlerin yaşam alanlarını hem estetik hem de kullanışlı hale getiriyor. Ahşabın sıcak dokusunu ve bambunun zarif detaylarını taşıyan bu özel tasarım, sağlıklı, ergonomik ve uzun ömürlü bir genç odası çözümü sunuyor.</p>\\n<h3 data-start=\\\"470\\\" data-end=\\\"502\\\"><strong data-start=\\\"474\\\" data-end=\\\"500\\\">Doğal ve Sıcak Tasarım</strong></h3>\\n<p data-start=\\\"503\\\" data-end=\\\"858\\\">Bambu Genç Odası Grubu, <strong data-start=\\\"527\\\" data-end=\\\"561\\\">sade ama göz alıcı tasarımıyla</strong> gençlerin dinamik ve enerjik dünyasına uyum sağlıyor. Doğal ahşap tonlarıyla harmanlanmış bambu detayları, odaya sıcak ve huzurlu bir atmosfer kazandırıyor. Bu sayede gençler, kendi tarzlarını yansıtabilecekleri bir alan oluştururken, aynı zamanda doğallığın sunduğu rahatlığı da hissediyorlar.</p>\\n<h3 data-start=\\\"860\\\" data-end=\\\"919\\\"><strong data-start=\\\"864\\\" data-end=\\\"917\\\">Tamamen Sağlıklı ve Çevre Dostu Malzeme Kullanımı</strong></h3>\\n<p data-start=\\\"920\\\" data-end=\\\"1022\\\">Sağlıklı yaşam alanları oluşturmak, <strong data-start=\\\"956\\\" data-end=\\\"986\\\">Bambu Genç Odası Grubu’nun</strong> en büyük önceliklerinden biridir.</p>\\n<ul data-start=\\\"1024\\\" data-end=\\\"1234\\\">\\n<li data-start=\\\"1024\\\" data-end=\\\"1079\\\"><strong data-start=\\\"1026\\\" data-end=\\\"1077\\\">Doğal ve çevre dostu malzemelerle üretilmiştir.</strong></li>\\n<li data-start=\\\"1080\\\" data-end=\\\"1156\\\"><strong data-start=\\\"1082\\\" data-end=\\\"1154\\\">Zararlı kimyasal içermeyen, su bazlı boya ve cilalar kullanılmıştır.</strong></li>\\n<li data-start=\\\"1157\\\" data-end=\\\"1234\\\"><strong data-start=\\\"1159\\\" data-end=\\\"1232\\\">Dayanıklı ve uzun ömürlü MDF ve masif ahşap iskelet ile üretilmiştir.</strong></li>\\n</ul>\\n<p data-start=\\\"1236\\\" data-end=\\\"1375\\\">Bu özellikleri sayesinde hem çevreye duyarlı bir yaklaşım benimsenmiş hem de gençlerin sağlıklı bir ortamda vakit geçirmesi sağlanmıştır.</p>\\n<h3 data-start=\\\"1377\\\" data-end=\\\"1433\\\"><strong data-start=\\\"1381\\\" data-end=\\\"1431\\\">Gençlerin İhtiyacına Göre Fonksiyonel Çözümler</strong></h3>\\n<p data-start=\\\"1434\\\" data-end=\\\"1723\\\">Bir genç odasının sadece uyumak için değil, aynı zamanda ders çalışmak, dinlenmek ve kişisel hobilerini geliştirmek için de uygun olması gerekir. Bambu Genç Odası Grubu, <strong data-start=\\\"1604\\\" data-end=\\\"1683\\\">geniş depolama alanları, ergonomik tasarımı ve akıllı yerleşim çözümleriyle</strong> gençlerin tüm ihtiyaçlarını karşılar.</p>\\n<p data-start=\\\"1434\\\" data-end=\\\"1723\\\"><img class=\\\"wp-image-1469  alignleft\\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/2-2-1536x898-1-1024x599.png\\\" alt=\\\"\\\" width=\\\"800\\\" height=\\\"468\\\" /></p>\\n<h4 data-start=\\\"1725\\\" data-end=\\\"1765\\\"><strong data-start=\\\"1730\\\" data-end=\\\"1763\\\">1. Geniş ve Rahat Yatak Alanı</strong></h4>\\n<p data-start=\\\"1766\\\" data-end=\\\"1930\\\">Gençlerin dinlenme ve rahat bir uyku deneyimi yaşaması için özel olarak tasarlanan yatak, geniş oturum alanı ve sağlam iskelet yapısıyla uzun yıllar konfor sunar.</p>\\n<ul data-start=\\\"1932\\\" data-end=\\\"2140\\\">\\n<li data-start=\\\"1932\\\" data-end=\\\"1995\\\"><strong data-start=\\\"1934\\\" data-end=\\\"1962\\\">Dayanıklı iskelet yapısı</strong> sayesinde uzun ömürlü kullanım</li>\\n<li data-start=\\\"1996\\\" data-end=\\\"2082\\\"><strong data-start=\\\"1998\\\" data-end=\\\"2031\\\">Modern ve şık başlık tasarımı</strong>, dekorasyona uyum sağlayan doğal bambu detayları</li>\\n<li data-start=\\\"2083\\\" data-end=\\\"2140\\\"><strong data-start=\\\"2085\\\" data-end=\\\"2138\\\">Ekstra depolama alanı sunan bazalı yatak seçeneği</strong></li>\\n</ul>\\n<h4 data-start=\\\"2142\\\" data-end=\\\"2189\\\"><strong data-start=\\\"2147\\\" data-end=\\\"2187\\\">2. Ergonomik ve Geniş Çalışma Masası</strong></h4>\\n<p data-start=\\\"2190\\\" data-end=\\\"2347\\\">Gençlerin rahat bir şekilde ders çalışmasını sağlayan çalışma masası, <strong data-start=\\\"2260\\\" data-end=\\\"2325\\\">geniş yüzeyi, sağlam ayak yapısı ve pratik depolama çözümleri</strong> ile dikkat çekiyor.</p>\\n<ul data-start=\\\"2349\\\" data-end=\\\"2553\\\">\\n<li data-start=\\\"2349\\\" data-end=\\\"2400\\\"><strong data-start=\\\"2351\\\" data-end=\\\"2398\\\">Rahat çalışma alanı sunan geniş masa yüzeyi</strong></li>\\n<li data-start=\\\"2401\\\" data-end=\\\"2488\\\"><strong data-start=\\\"2403\\\" data-end=\\\"2486\\\">Kitaplar, defterler ve kırtasiye malzemeleri için açık ve kapalı raf sistemleri</strong></li>\\n<li data-start=\\\"2489\\\" data-end=\\\"2553\\\"><strong data-start=\\\"2491\\\" data-end=\\\"2551\\\">Şık ve kullanışlı çekmecelerle düzenli bir çalışma alanı</strong></li>\\n</ul>\\n<h4 data-start=\\\"2555\\\" data-end=\\\"2597\\\"><strong data-start=\\\"2560\\\" data-end=\\\"2595\\\">3. Geniş ve Kullanışlı Gardırop</strong></h4>\\n<p data-start=\\\"2598\\\" data-end=\\\"2745\\\">Gençlerin giysi ve aksesuarlarını düzenli bir şekilde saklayabilmesi için <strong data-start=\\\"2672\\\" data-end=\\\"2727\\\">geniş iç hacme sahip, bölmeli ve çekmeceli gardırop</strong> tasarlanmıştır.</p>\\n<ul data-start=\\\"2747\\\" data-end=\\\"3010\\\">\\n<li data-start=\\\"2747\\\" data-end=\\\"2820\\\"><strong data-start=\\\"2749\\\" data-end=\\\"2781\\\">Bambu detaylı kapak tasarımı</strong>, doğallık ve şıklığı bir arada sunar</li>\\n<li data-start=\\\"2821\\\" data-end=\\\"2913\\\"><strong data-start=\\\"2823\\\" data-end=\\\"2865\\\">Geniş askı bölmeleri ve raf sistemleri</strong>, tüm kıyafetlerin düzenli saklanmasını sağlar</li>\\n<li data-start=\\\"2914\\\" data-end=\\\"3010\\\"><strong data-start=\\\"2916\\\" data-end=\\\"2937\\\">Ekstra çekmeceler</strong>, küçük eşyaların kolay erişilebilir şekilde saklanmasına yardımcı olur</li>\\n</ul>\\n<h4 data-start=\\\"3012\\\" data-end=\\\"3053\\\"><strong data-start=\\\"3017\\\" data-end=\\\"3051\\\">4. Şık ve Fonksiyonel Kitaplık</strong></h4>\\n<p data-start=\\\"3054\\\" data-end=\\\"3175\\\">Kitap okumayı seven gençler için tasarlanan <strong data-start=\\\"3098\\\" data-end=\\\"3130\\\">bambu detaylı geniş kitaplık</strong>, dekoratif ve işlevsel bir alan oluşturur.</p>\\n<ul data-start=\\\"3177\\\" data-end=\\\"3378\\\">\\n<li data-start=\\\"3177\\\" data-end=\\\"3267\\\"><strong data-start=\\\"3179\\\" data-end=\\\"3202\\\">Açık raf sistemleri</strong>, kitapların ve dekoratif objelerin sergilenmesine olanak tanır</li>\\n<li data-start=\\\"3268\\\" data-end=\\\"3328\\\"><strong data-start=\\\"3270\\\" data-end=\\\"3290\\\">Kapaklı bölmeler</strong>, özel eşyaların saklanmasını sağlar</li>\\n<li data-start=\\\"3329\\\" data-end=\\\"3378\\\"><strong data-start=\\\"3331\\\" data-end=\\\"3348\\\">Sağlam yapısı</strong>, uzun süreli kullanım sunar</li>\\n</ul>\\n<h3 data-start=\\\"3380\\\" data-end=\\\"3439\\\"><strong data-start=\\\"3384\\\" data-end=\\\"3437\\\">Her Dekorasyona Uygun Renk ve Tasarım Seçenekleri</strong></h3>\\n<p data-start=\\\"3440\\\" data-end=\\\"3564\\\">Bambu Genç Odası Grubu, <strong data-start=\\\"3464\\\" data-end=\\\"3499\\\">doğal ahşap ve bambu tonlarıyla</strong>, modern ve klasik dekorasyon tarzlarıyla mükemmel uyum sağlar.</p>\\n<ul data-start=\\\"3566\\\" data-end=\\\"3815\\\">\\n<li data-start=\\\"3566\\\" data-end=\\\"3648\\\"><strong data-start=\\\"3568\\\" data-end=\\\"3610\\\">Bej, açık kahve ve doğal ahşap tonları</strong>, sıcak ve samimi bir ortam yaratır.</li>\\n<li data-start=\\\"3649\\\" data-end=\\\"3739\\\"><strong data-start=\\\"3651\\\" data-end=\\\"3681\\\">Soft pastel ve gri tonları</strong>, modern ve minimalist dekorasyon anlayışına hitap eder.</li>\\n<li data-start=\\\"3740\\\" data-end=\\\"3815\\\"><strong data-start=\\\"3742\\\" data-end=\\\"3765\\\">Koyu ahşap detaylar</strong>, odada şık ve sofistike bir atmosfer oluşturur.</li>\\n</ul>\\n<p><img class=\\\"alignnone wp-image-1468 size-full\\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/1-2-1536x898-1.png\\\" alt=\\\"\\\" width=\\\"1536\\\" height=\\\"898\\\" /></p>\\n<h3 data-start=\\\"3817\\\" data-end=\\\"3856\\\"><strong data-start=\\\"3821\\\" data-end=\\\"3854\\\">Neden Bambu Genç Odası Grubu?</strong></h3>\\n<ol data-start=\\\"3857\\\" data-end=\\\"4157\\\">\\n<li data-start=\\\"3857\\\" data-end=\\\"3901\\\"><strong data-start=\\\"3860\\\" data-end=\\\"3899\\\">Sağlıklı ve doğal malzeme kullanımı</strong></li>\\n<li data-start=\\\"3902\\\" data-end=\\\"3961\\\"><strong data-start=\\\"3905\\\" data-end=\\\"3959\\\">Ergonomik ve gençlerin ihtiyaçlarına uygun tasarım</strong></li>\\n<li data-start=\\\"3962\\\" data-end=\\\"4007\\\"><strong data-start=\\\"3965\\\" data-end=\\\"4005\\\">Şık, fonksiyonel ve uzun ömürlü yapı</strong></li>\\n<li data-start=\\\"4008\\\" data-end=\\\"4069\\\"><strong data-start=\\\"4011\\\" data-end=\\\"4067\\\">Geniş depolama alanları ve akıllı yerleşim çözümleri</strong></li>\\n<li data-start=\\\"4070\\\" data-end=\\\"4157\\\"><strong data-start=\\\"4073\\\" data-end=\\\"4155\\\">Çevre dostu üretim ve sağlığa zararlı kimyasallar içermeyen boya ve malzemeler</strong></li>\\n</ol>\\n<h3 data-start=\\\"4159\\\" data-end=\\\"4202\\\"><strong data-start=\\\"4163\\\" data-end=\\\"4200\\\">Evinize Doğallık ve Konfor Katın!</strong></h3>\\n<p data-start=\\\"4203\\\" data-end=\\\"4502\\\">Bambu Genç Odası Grubu, <strong data-start=\\\"4227\\\" data-end=\\\"4278\\\">doğal şıklığı, fonksiyonelliği ve dayanıklılığı</strong> bir araya getirerek gençlerin yaşam alanlarını daha keyifli hale getiriyor. Kaliteli malzemesi, zamansız tasarımı ve ergonomik detaylarıyla gençlerin hem rahat hem de verimli bir ortamda zaman geçirmesine olanak sağlıyor.</p>\\n<p data-start=\\\"4504\\\" data-end=\\\"4619\\\" data-is-last-node=\\\"\\\">Şimdi <strong data-start=\\\"4510\\\" data-end=\\\"4540\\\">Selishome ayrıcalıklarıyla</strong> Bambu Genç Odası Grubu’nu keşfedin ve genç odalarına doğanın huzurunu taşıyın!</p>\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/02/p7.png\",\"https://selishome.com/wp-content/uploads/2025/02/1-2-1536x898-1.png\",\"https://selishome.com/wp-content/uploads/2025/02/2-2-1536x898-1.png\",\"https://selishome.com/wp-content/uploads/2025/02/kapak-2-1536x898-1.png\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1444\",\"name\":\"Machka Oturma Grubu\",\"slug\":\"machka-oturma-grubu\",\"description\":\"<p data-start=\\\"0\\\" data-end=\\\"64\\\"><strong data-start=\\\"0\\\" data-end=\\\"62\\\">Machka Köşe Koltuk Takımı: Zamansız Şıklık ve Üstün Konfor</strong></p>\\n<p data-start=\\\"66\\\" data-end=\\\"402\\\">Ev dekorasyonunda şıklık, konfor ve fonksiyonelliği bir arada arayanlar için tasarlanan <strong data-start=\\\"154\\\" data-end=\\\"183\\\">Machka Köşe Koltuk Takımı</strong>, zarif detayları, geniş oturma alanı ve yüksek konforu ile öne çıkıyor. Estetik görünümüyle modern ve klasik dekorasyon stilleriyle mükemmel bir uyum sağlayan Machka, yaşam alanlarınıza sofistike bir dokunuş katıyor.</p>\\n<h3 data-start=\\\"404\\\" data-end=\\\"437\\\"><strong data-start=\\\"408\\\" data-end=\\\"435\\\">Modern ve Zarif Tasarım</strong></h3>\\n<p data-start=\\\"438\\\" data-end=\\\"746\\\">Machka Köşe Koltuk Takımı, <strong data-start=\\\"465\\\" data-end=\\\"499\\\">minimalist ve modern çizgileri</strong> ile evinizin havasını tamamen değiştiriyor. <strong data-start=\\\"544\\\" data-end=\\\"575\\\">İnce hatlara sahip tasarımı</strong>, ahşap veya metal ayak seçenekleri ve özenle seçilmiş döşeme kumaşı, onu sadece bir koltuk takımı olmaktan çıkarıp evinizin en dikkat çekici mobilyası haline getiriyor.</p>\\n<h3 data-start=\\\"748\\\" data-end=\\\"780\\\"><strong data-start=\\\"752\\\" data-end=\\\"778\\\">Üstün Malzeme Kalitesi</strong></h3>\\n<p data-start=\\\"781\\\" data-end=\\\"1177\\\">Kaliteyi konforla buluşturan Machka, <strong data-start=\\\"818\\\" data-end=\\\"882\\\">dayanıklı ahşap iskeleti ve yüksek yoğunluklu sünger dolgusu</strong> sayesinde uzun yıllar boyunca formunu koruyor. Özel seçilmiş döşeme kumaşı, hem yumuşak dokusu hem de leke tutmaz ve kolay temizlenebilir özelliği ile kullanım kolaylığı sağlıyor. Günlük kullanımda pratiklik sunarken, zarif yapısıyla da oturma alanlarınıza sofistike bir görünüm kazandırıyor.</p>\\n<p data-start=\\\"781\\\" data-end=\\\"1177\\\"><img class=\\\"alignnone wp-image-1447 size-full\\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/3-1.jpg\\\" alt=\\\"\\\" width=\\\"1920\\\" height=\\\"1123\\\" /></p>\\n<h3 data-start=\\\"1179\\\" data-end=\\\"1225\\\"><strong data-start=\\\"1183\\\" data-end=\\\"1223\\\">Maksimum Konfor Sunan Ergonomik Yapı</strong></h3>\\n<p data-start=\\\"1226\\\" data-end=\\\"1521\\\">Machka Köşe Koltuk Takımı, sadece estetik bir ürün değil, aynı zamanda <strong data-start=\\\"1297\\\" data-end=\\\"1355\\\">maksimum konfor sağlayan ergonomik bir oturma deneyimi</strong> sunuyor. <strong data-start=\\\"1365\\\" data-end=\\\"1414\\\">Yumuşak sırt minderleri ve geniş oturum alanı</strong>, vücudu destekleyerek rahat bir oturma pozisyonu sağlarken, günün yorgunluğunu atmanıza yardımcı oluyor.</p>\\n<ul data-start=\\\"1523\\\" data-end=\\\"1769\\\">\\n<li data-start=\\\"1523\\\" data-end=\\\"1606\\\"><strong data-start=\\\"1525\\\" data-end=\\\"1561\\\">Yüksek yoğunluklu sünger dolgusu</strong>, çökme yapmaz ve uzun süreli konfor sunar.</li>\\n<li data-start=\\\"1607\\\" data-end=\\\"1679\\\"><strong data-start=\\\"1609\\\" data-end=\\\"1645\\\">Ortopedik sırt destek minderleri</strong>, rahatlatıcı bir oturum sağlar.</li>\\n<li data-start=\\\"1680\\\" data-end=\\\"1769\\\"><strong data-start=\\\"1682\\\" data-end=\\\"1704\\\">Geniş oturum alanı</strong>, rahatça uzanmanızı ve konforlu bir deneyim yaşamanızı sağlar.</li>\\n</ul>\\n<h3 data-start=\\\"1771\\\" data-end=\\\"1813\\\"><strong data-start=\\\"1775\\\" data-end=\\\"1811\\\">Geniş ve Kullanışlı Oturma Alanı</strong></h3>\\n<p data-start=\\\"1814\\\" data-end=\\\"2153\\\">Machka, <strong data-start=\\\"1822\\\" data-end=\\\"1909\\\">büyük ve küçük yaşam alanlarına uyum sağlayabilecek farklı ölçülerde tasarlanmıştır</strong>. Geniş aileler için mükemmel bir tercih olan bu takım, misafirlerinizi ağırlamak için de oldukça idealdir. Geniş oturum alanı sayesinde <strong data-start=\\\"2046\\\" data-end=\\\"2121\\\">film izlemek, kitap okumak veya sevdiklerinizle keyifli sohbetler etmek</strong> için mükemmel bir alan sunar.</p>\\n<h3 data-start=\\\"2155\\\" data-end=\\\"2203\\\"><strong data-start=\\\"2159\\\" data-end=\\\"2201\\\">Fonksiyonel ve Kullanıcı Dostu Tasarım</strong></h3>\\n<p data-start=\\\"2204\\\" data-end=\\\"2318\\\">Machka Köşe Koltuk Takımı, sadece şık bir mobilya değil, aynı zamanda <strong data-start=\\\"2274\\\" data-end=\\\"2306\\\">kullanıcı dostu bir tasarıma</strong> sahiptir.</p>\\n<ul data-start=\\\"2320\\\" data-end=\\\"2559\\\">\\n<li data-start=\\\"2320\\\" data-end=\\\"2415\\\"><strong data-start=\\\"2322\\\" data-end=\\\"2340\\\">Modüler yapısı</strong>, salonun genişliğine ve dekorasyon stiline uygun şekilde düzenlenebilir.</li>\\n<li data-start=\\\"2416\\\" data-end=\\\"2490\\\"><strong data-start=\\\"2418\\\" data-end=\\\"2449\\\">Kolay temizlenebilir kumaşı</strong>, hijyen ve uzun ömürlü kullanım sunar.</li>\\n<li data-start=\\\"2491\\\" data-end=\\\"2559\\\"><strong data-start=\\\"2493\\\" data-end=\\\"2520\\\">Farklı renk seçenekleri</strong>, her dekorasyon tarzına uyum sağlar.</li>\\n</ul>\\n<p>&nbsp;</p>\\n<p><img class=\\\"alignleft wp-image-1446 \\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/4-1-1024x599.jpg\\\" alt=\\\"\\\" width=\\\"780\\\" height=\\\"456\\\" /></p>\\n<h3 data-start=\\\"2561\\\" data-end=\\\"2615\\\"><strong data-start=\\\"2565\\\" data-end=\\\"2613\\\">Her Dekorasyona Uygun Geniş Renk Seçenekleri</strong></h3>\\n<p data-start=\\\"2616\\\" data-end=\\\"2723\\\">Machka Köşe Koltuk Takımı, <strong data-start=\\\"2643\\\" data-end=\\\"2667\\\">zamansız renk paleti</strong> ile her türlü dekorasyon tarzına kolayca uyum sağlar.</p>\\n<ul data-start=\\\"2725\\\" data-end=\\\"2960\\\">\\n<li data-start=\\\"2725\\\" data-end=\\\"2805\\\"><strong data-start=\\\"2727\\\" data-end=\\\"2803\\\">Modern ve minimalist evler için açık gri, bej, antrasit gibi soft tonlar</strong></li>\\n<li data-start=\\\"2806\\\" data-end=\\\"2889\\\"><strong data-start=\\\"2808\\\" data-end=\\\"2887\\\">Daha klasik ve sıcak bir atmosfer isteyenler için kahverengi ve koyu tonlar</strong></li>\\n<li data-start=\\\"2890\\\" data-end=\\\"2960\\\"><strong data-start=\\\"2892\\\" data-end=\\\"2958\\\">Canlı ve enerjik alanlar için pastel ve cesur renk seçenekleri</strong></li>\\n</ul>\\n<p data-start=\\\"2962\\\" data-end=\\\"3083\\\">Her bir renk, evinize farklı bir karakter katarken, Machka’nın zarif dokusuyla birleşerek göz alıcı bir etki yaratıyor.</p>\\n<h3 data-start=\\\"3085\\\" data-end=\\\"3125\\\"><strong data-start=\\\"3089\\\" data-end=\\\"3123\\\">Güçlü ve Estetik Ayak Tasarımı</strong></h3>\\n<p data-start=\\\"3126\\\" data-end=\\\"3251\\\">Machka Köşe Koltuk Takımı’nın estetiğini tamamlayan en önemli unsurlardan biri de <strong data-start=\\\"3208\\\" data-end=\\\"3248\\\">modern ve dayanıklı ayak tasarımıdır</strong>.</p>\\n<ul data-start=\\\"3253\\\" data-end=\\\"3460\\\">\\n<li data-start=\\\"3253\\\" data-end=\\\"3367\\\"><strong data-start=\\\"3255\\\" data-end=\\\"3279\\\">Yüksek ayak tasarımı</strong>, temizlik açısından kolaylık sağlarken, takıma hafif ve zarif bir görünüm kazandırır.</li>\\n<li data-start=\\\"3368\\\" data-end=\\\"3460\\\"><strong data-start=\\\"3370\\\" data-end=\\\"3402\\\">Metal veya ahşap seçenekleri</strong>, kişisel zevkinize ve dekorasyon tarzınıza uyum sağlar.</li>\\n</ul>\\n<h3 data-start=\\\"3462\\\" data-end=\\\"3499\\\"><strong data-start=\\\"3466\\\" data-end=\\\"3497\\\">Evinizin En Konforlu Köşesi</strong></h3>\\n<p data-start=\\\"3500\\\" data-end=\\\"3760\\\">Machka Köşe Koltuk Takımı, <strong data-start=\\\"3527\\\" data-end=\\\"3631\\\">hem konforlu hem de estetik açıdan şık bir oturma alanı yaratmak isteyenler için mükemmel bir tercih</strong>. Kullanıcı dostu yapısı, yüksek kaliteli malzemeleri ve fonksiyonelliği ile evinizin en çok tercih edilen noktası olmaya aday.</p>\\n<p data-start=\\\"3762\\\" data-end=\\\"3907\\\" data-is-last-node=\\\"\\\">Şimdi <strong data-start=\\\"3768\\\" data-end=\\\"3798\\\">Selishome ayrıcalıklarıyla</strong> Machka Köşe Koltuk Takımı’nı keşfedin ve yaşam alanlarınıza <strong data-start=\\\"3859\\\" data-end=\\\"3900\\\">şık, konforlu ve zamansız bir dokunuş</strong> katın!</p>\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/02/p6.png\",\"https://selishome.com/wp-content/uploads/2025/02/4-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/3-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/2-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1438\",\"name\":\"Boston Köşe Koltuk Grubu\",\"slug\":\"boston-kose-koltuk-grubu\",\"description\":\"<p data-start=\\\"0\\\" data-end=\\\"67\\\"><strong data-start=\\\"0\\\" data-end=\\\"65\\\">Boston Köşe Koltuk Takımı: Konfor ve Şıklığın Buluşma Noktası</strong></p>\\n<p data-start=\\\"69\\\" data-end=\\\"440\\\">Modern yaşam alanlarına zarafet ve konforu bir arada sunan <strong data-start=\\\"128\\\" data-end=\\\"157\\\">Boston Köşe Koltuk Takımı</strong>, hem estetik tasarımıyla göz dolduruyor hem de ergonomik yapısıyla üst düzey rahatlık sağlıyor. Evinizin en özel köşesinde, ailenizle ve sevdiklerinizle keyifli anlar geçirmenizi sağlayacak bu özel takım, kaliteli malzemeleri ve işçiliğiyle uzun yıllar kullanım garantisi sunuyor.</p>\\n<h3 data-start=\\\"442\\\" data-end=\\\"488\\\"><strong data-start=\\\"446\\\" data-end=\\\"486\\\">Modern Tasarım, Fonksiyonel Kullanım</strong></h3>\\n<p data-start=\\\"489\\\" data-end=\\\"896\\\">Boston Köşe Koltuk Takımı, çağdaş çizgileri ve minimal detaylarıyla modern dekorasyon anlayışına kusursuz bir uyum sağlıyor. Geniş oturum alanı, konforlu sırt yastıkları ve zarif dikiş detayları, bu takımı sadece bir oturma alanı olmanın ötesine taşıyor. Oturma odalarınızda şık ve sıcak bir atmosfer yaratmak için özel olarak tasarlanan Boston, geniş renk ve kumaş seçenekleri ile her zevke hitap ediyor.</p>\\n<p data-start=\\\"489\\\" data-end=\\\"896\\\"><img class=\\\"alignleft wp-image-1441 size-full\\\" src=\\\"https://selishome.com/wp-content/uploads/2025/02/3-10-1536x898-1.jpg\\\" alt=\\\"\\\" width=\\\"1536\\\" height=\\\"898\\\" /></p>\\n<h3 data-start=\\\"898\\\" data-end=\\\"936\\\"></h3>\\n<h3 data-start=\\\"898\\\" data-end=\\\"936\\\"></h3>\\n<h3 data-start=\\\"898\\\" data-end=\\\"936\\\"></h3>\\n<h3 data-start=\\\"898\\\" data-end=\\\"936\\\"><strong data-start=\\\"902\\\" data-end=\\\"934\\\">Üstün Kalite ve Dayanıklılık</strong></h3>\\n<p data-start=\\\"937\\\" data-end=\\\"1336\\\">Boston Köşe Koltuk Takımı, <strong data-start=\\\"964\\\" data-end=\\\"998\\\">yüksek kaliteli iskelet yapısı</strong> ile uzun ömürlü kullanım sunuyor. Sağlam ahşap iskelet ve metal destekli ayaklar, takımın yıllar boyunca formunu korumasını sağlarken, kaliteli döşeme kumaşı aşınmalara karşı direnç gösteriyor. Günlük kullanıma uygun olarak tasarlanan bu takım, leke tutmayan ve kolay temizlenebilir kumaşı sayesinde zahmetsiz bir bakım imkanı sunuyor.</p>\\n<h3 data-start=\\\"1338\\\" data-end=\\\"1390\\\"><strong data-start=\\\"1342\\\" data-end=\\\"1388\\\">Konforu Maksimum Seviyeye Taşıyan Detaylar</strong></h3>\\n<p data-start=\\\"1391\\\" data-end=\\\"1725\\\">Boston Köşe Koltuk Takımı&#8217;nın en büyük artılarından biri <strong data-start=\\\"1448\\\" data-end=\\\"1484\\\">üstün konforlu oturum minderleri</strong>. Yüksek yoğunluklu sünger dolgusu, vücudunuzu tam olarak destekler ve uzun saatler boyunca konforlu bir oturma deneyimi sunar. Ayrıca geniş oturma alanı, film izlerken, kitap okurken veya misafirlerinizi ağırlarken ekstra rahatlık sağlar.</p>\\n<h3 data-start=\\\"1727\\\" data-end=\\\"1769\\\"><strong data-start=\\\"1731\\\" data-end=\\\"1767\\\">Geniş ve Kullanışlı Oturum Alanı</strong></h3>\\n<p data-start=\\\"1770\\\" data-end=\\\"2036\\\">Boston’un geniş oturum alanı sayesinde <strong data-start=\\\"1809\\\" data-end=\\\"1873\\\">hem oturmak hem de uzanmak için ideal bir alan yaratılmıştır</strong>. Modüler tasarımı, farklı yaşam alanlarına uyum sağlayacak şekilde tasarlanmış olup, hem büyük hem de orta büyüklükteki salonlar için mükemmel bir tercih sunar.</p>\\n<h3 data-start=\\\"2038\\\" data-end=\\\"2099\\\"><strong data-start=\\\"2042\\\" data-end=\\\"2097\\\">Rahatlık ve Estetiği Bir Araya Getiren Şık Detaylar</strong></h3>\\n<ul data-start=\\\"2100\\\" data-end=\\\"2372\\\">\\n<li data-start=\\\"2100\\\" data-end=\\\"2192\\\"><strong data-start=\\\"2102\\\" data-end=\\\"2142\\\">Yumuşak ve ergonomik sırt minderleri</strong>, uzun süreli oturumlar için ideal destek sunar.</li>\\n<li data-start=\\\"2193\\\" data-end=\\\"2304\\\"><strong data-start=\\\"2195\\\" data-end=\\\"2229\\\">Şık ve dayanıklı ayak tasarımı</strong>, takımın modern çizgilerini tamamlayarak dekoratif bir duruş kazandırır.</li>\\n<li data-start=\\\"2305\\\" data-end=\\\"2372\\\"><strong data-start=\\\"2307\\\" data-end=\\\"2331\\\">Özel dikiş detayları</strong>, kaliteli işçiliği gözler önüne serer.</li>\\n</ul>\\n<h3 data-start=\\\"2374\\\" data-end=\\\"2422\\\"><strong data-start=\\\"2378\\\" data-end=\\\"2420\\\">Her Dekorasyona Uygun Renk Seçenekleri</strong></h3>\\n<p data-start=\\\"2423\\\" data-end=\\\"2692\\\">Boston Köşe Koltuk Takımı, <strong data-start=\\\"2450\\\" data-end=\\\"2483\\\">göz alıcı renk seçenekleriyle</strong> her yaşam alanına uyum sağlar. Modern gri tonlarından sıcak bej ve kahve tonlarına kadar geniş bir renk yelpazesi sunan bu özel takım, evinizin dekorasyonuna uygun mükemmel bir seçim yapmanıza olanak tanır.</p>\",\"price\":0,\"categoryId\":\"1\",\"categorySlug\":\"oturma-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/02/p5.png\",\"https://selishome.com/wp-content/uploads/2025/02/4-9-1536x898-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/3-10-1536x898-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/2-10.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1424\",\"name\":\"Viral Yemek Odası Grubu\",\"slug\":\"viral-yemek-odasi-grubu\",\"description\":\"<div class=\\\"flex max-w-full flex-col flex-grow\\\">\\n<div class=\\\"min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words text-start [.text-message+&amp;]:mt-5\\\" dir=\\\"auto\\\" data-message-author-role=\\\"assistant\\\" data-message-id=\\\"8ab911d2-4e00-424b-82af-529c7fe785ca\\\" data-message-model-slug=\\\"gpt-4o\\\">\\n<div class=\\\"flex w-full flex-col gap-1 empty:hidden first:pt-[3px]\\\">\\n<div class=\\\"markdown prose w-full break-words dark:prose-invert light\\\">Viral Yemek Odası Grubu, modern tasarımı ve şık detaylarıyla yaşam alanınıza sofistike bir hava katıyor. Estetik ve işlevselliği bir araya getiren bu özel koleksiyon, zarif çizgileri ve kaliteli işçiliğiyle fark yaratıyor.Takımın ana unsuru olan geniş yemek masası, hem günlük kullanıma hem de kalabalık davet sofralarına uygun yapısıyla pratiklik sunuyor. Masanın dayanıklı yüzeyi ve zarif ayak tasarımı, sağlamlık ile görsel şıklığı mükemmel bir dengede buluşturuyor. Takımı tamamlayan ergonomik sandalyeler ise rahat oturum alanı ve konforlu yapısıyla uzun süreli yemek keyifleri için ideal.Depolama ihtiyacınızı karşılamak için tasarlanan fonksiyonel konsol, geniş çekmece ve dolap bölmeleriyle hem estetik hem de kullanışlı bir çözüm sunuyor. Şık kulp detayları ve zarif çizgileri, yemek odanıza modern bir dokunuş kazandırırken, dekoratif aynalar ve özel tasarım yüzeyler mekanınıza derinlik ve ferahlık katıyor.Viral Yemek Odası Grubu, dayanıklı malzemeleri ve özenli işçiliğiyle uzun ömürlü bir kullanım sunarken, minimalist ve çağdaş tasarımı sayesinde her dekorasyon stiline kolayca uyum sağlıyor. Misafirlerinizi ağırlarken zarafetin ve konforun keyfini çıkarın, yemek saatlerini unutulmaz anlara dönüştürün!</div>\\n</div>\\n</div>\\n</div>\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/02/p4.png\",\"https://selishome.com/wp-content/uploads/2025/02/10-8-2048x1365-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1418\",\"name\":\"Aspendos Yemek Odası Grubu\",\"slug\":\"aspendos-yemek-odasi-grubu\",\"description\":\"<p>Aspendos Yemek Odası Grubu, zarafet ve fonksiyonelliği buluşturan tasarımıyla yemek alanınıza şıklık katıyor. Estetik detayları, kaliteli malzemeleri ve modern çizgileriyle dikkat çeken bu takım, konforlu ve keyifli sofralar için ideal bir atmosfer sunar. Geniş masa yüzeyi ve ergonomik sandalyeleriyle hem günlük kullanıma hem de özel davetlere uyum sağlar. Aspendos Yemek Odası Grubu ile yemek saatlerini daha keyifli hale getirin!</p>\",\"price\":0,\"categoryId\":\"3\",\"categorySlug\":\"yemek-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/02/p3.png\",\"https://selishome.com/wp-content/uploads/2025/02/1-4-1-1536x898-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/1-3-1-1536x898-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/1-2-1-1536x898-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1409\",\"name\":\"Asya Yatak Odası Grubu\",\"slug\":\"asya-yatak-odasi\",\"description\":\"<p>Asya Yatak Odası Takımı, sade ve modern tasarımıyla huzurlu bir uyku alanı yaratır. Doğal ahşap dokular ve soft renk geçişleriyle sıcak ve davetkar bir atmosfer sunar. Geniş depolama alanları, ergonomik detayları ve dayanıklı yapısıyla hem şıklık hem de fonksiyonellik sağlar. Estetik ve konforu bir araya getiren Asya Yatak Odası Takımı, yatak odanıza zamansız bir dokunuş katıyor</p>\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/02/p2.png\",\"https://selishome.com/wp-content/uploads/2025/02/4-5-1200x901-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/3-4-1200x901-1.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/2-3-1200x901-1.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"},{\"id\":\"selis-1400\",\"name\":\"Agra Yatak Odası Grubu\",\"slug\":\"agra-yatak-odasi-grubu\",\"description\":\"<p><em>Agra Yatak Odası Takımı, modern ve zarif tasarımıyla yatak odanıza sofistike bir atmosfer kazandırır. Doğal dokular ve kaliteli malzemelerle üretilen bu takım, hem estetik hem de fonksiyonelliği ön planda tutar. Geniş depolama alanları ve ergonomik detayları sayesinde konforlu bir kullanım sunar. Şıklığı, dayanıklılığı ve rahatlığı bir araya getiren Agra Yatak Odası Takımı, huzurlu bir uyku deneyimi için mükemmel bir seçim!</em></p>\",\"price\":0,\"categoryId\":\"7\",\"categorySlug\":\"genc-cocuk-odasi\",\"images\":[\"https://selishome.com/wp-content/uploads/2025/02/p1.png\",\"https://selishome.com/wp-content/uploads/2025/02/1-2-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/1-1-4.jpg\",\"https://selishome.com/wp-content/uploads/2025/02/1-7-3.jpg\"],\"colors\":[{\"name\":\"Standart\",\"hex\":\"#D4C5B2\"}],\"materials\":[\"Ahşap\"],\"dimensions\":{\"width\":0,\"height\":0,\"depth\":0,\"unit\":\"cm\"},\"stock\":10,\"featured\":false,\"brand\":\"SelisHome\"}]"));}),
"[project]/src/data/mock-products.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFeaturedProducts",
    ()=>getFeaturedProducts,
    "getNewProducts",
    ()=>getNewProducts,
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProductsByCategory",
    ()=>getProductsByCategory,
    "mockProducts",
    ()=>mockProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/data/products.json (json)");
;
const mockProducts = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$json__$28$json$29$__["default"];
const getProductBySlug = (slug)=>{
    return mockProducts.find((p)=>p.slug === slug);
};
const getProductsByCategory = (categorySlug)=>{
    return mockProducts.filter((p)=>p.categorySlug === categorySlug);
};
const getFeaturedProducts = ()=>{
    return mockProducts.filter((p)=>p.featured);
};
const getNewProducts = ()=>{
    return mockProducts.filter((p)=>p.isNew);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProductBySlug",
    ()=>getProductBySlug,
    "getProducts",
    ()=>getProducts,
    "getProductsByIds",
    ()=>getProductsByIds,
    "searchProducts",
    ()=>searchProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mock-products.ts [app-client] (ecmascript)");
;
;
// Helper to map snake_case from DB to camelCase for Frontend
const mapProduct = (p)=>({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description || '',
        price: Number(p.price),
        salePrice: p.sale_price ? Number(p.sale_price) : undefined,
        originalPrice: p.original_price ? Number(p.original_price) : p.price * 1.2,
        currency: p.currency || 'TRY',
        categoryId: p.category_id,
        categorySlug: p.category_slug,
        category: p.category_name || 'Mobilya',
        images: p.images || [],
        lifestyleImage: p.lifestyle_image,
        colors: (p.colors || []).map((c, i)=>{
            const parsed = typeof c === 'string' ? (()=>{
                try {
                    return JSON.parse(c);
                } catch  {
                    return {};
                }
            })() : c;
            return {
                id: parsed.id || `color-${i}`,
                name: parsed.name || 'Standart',
                hex: parsed.hex || '#D4C5B2',
                image: parsed.image || (p.images ? p.images[0] : ''),
                lifestyleImage: parsed.lifestyle_image || p.lifestyle_image || '',
                inStock: parsed.in_stock !== false
            };
        }),
        materials: p.materials || [],
        dimensions: p.dimensions || {
            width: 0,
            height: 0,
            depth: 0,
            unit: 'cm'
        },
        rating: {
            average: p.rating_average || 4.8,
            count: p.rating_count || 12
        },
        badges: p.badges || (p.is_new ? [
            {
                type: 'new',
                label: 'Yeni'
            }
        ] : []),
        stock: p.stock || 0,
        featured: p.featured || false,
        isFeatured: p.featured || false,
        isNew: !!p.is_new,
        brand: p.brand || 'SELIS',
        deliveryDays: p.delivery_days || 14,
        hasQuickShip: !!p.has_quick_ship
    });
const getProducts = async (filters)=>{
    try {
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*');
        if (filters?.categories && filters.categories.length > 0) {
            query = query.in('category_slug', filters.categories);
        } else if (filters?.categorySlug) {
            query = query.eq('category_slug', filters.categorySlug);
        }
        if (filters?.brands && filters.brands.length > 0) {
            query = query.in('brand', filters.brands);
        }
        if (filters?.inStock) {
            query = query.gte('stock', 1);
        }
        if (filters?.featured) query = query.eq('featured', true);
        if (filters?.isNew) query = query.eq('is_new', true);
        if (filters?.minPrice !== undefined) query = query.gte('price', filters.minPrice);
        if (filters?.maxPrice !== undefined) query = query.lte('price', filters.maxPrice);
        // For materials (text array)
        if (filters?.materials && filters.materials.length > 0) {
            query = query.contains('materials', filters.materials);
        }
        const { data, error } = await query;
        if (error || !data || data.length === 0) {
            // DB fallback: use mock only if no DB results for this specific filter
            console.warn(`[API] DB returned no results for: ${JSON.stringify(filters)}, using mock fallback`);
            let products = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"];
            if (filters?.categories && filters.categories.length > 0) {
                products = products.filter((p)=>filters.categories.includes(p.categorySlug));
            } else if (filters?.categorySlug) {
                products = products.filter((p)=>p.categorySlug === filters.categorySlug);
            }
            if (filters?.brands && filters.brands.length > 0) {
                products = products.filter((p)=>p.brand && filters.brands.includes(p.brand));
            }
            if (filters?.inStock) products = products.filter((p)=>p.stock > 0);
            if (filters?.featured) products = products.filter((p)=>p.featured);
            if (filters?.isNew) products = products.filter((p)=>p.isNew);
            if (filters?.minPrice !== undefined) products = products.filter((p)=>p.price >= filters.minPrice);
            if (filters?.maxPrice !== undefined) products = products.filter((p)=>p.price <= filters.maxPrice);
            if (filters?.materials && filters.materials.length > 0) {
                products = products.filter((p)=>p.materials?.some((m)=>filters.materials.includes(m)));
            }
            if (filters?.colors && filters.colors.length > 0) {
                products = products.filter((p)=>p.colors?.some((c)=>filters.colors.includes(c.name)));
            }
            return products;
        }
        let mapped = data.map(mapProduct);
        return mapped;
    } catch (err) {
        console.warn('API Error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"];
    }
};
const getProductBySlug = async (slug)=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*').eq('slug', slug).single();
        if (error || !data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"].find((p)=>p.slug === slug) || null;
        }
        return mapProduct(data);
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"].find((p)=>p.slug === slug) || null;
    }
};
const searchProducts = async (query)=>{
    if (!query || query.length < 2) return [];
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*').or(`name.ilike.%${query}%,description.ilike.%${query}%,brand.ilike.%${query}%`).limit(6);
        if (error || !data || data.length === 0) {
            const q = query.toLowerCase();
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"].filter((p)=>p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand && p.brand.toLowerCase().includes(q)).slice(0, 6);
        }
        return data.map(mapProduct);
    } catch (err) {
        return [];
    }
};
const getProductsByIds = async (ids)=>{
    if (!ids || ids.length === 0) return [];
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*').in('id', ids);
        if (error || !data || data.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"].filter((p)=>ids.includes(p.id));
        }
        return data.map(mapProduct);
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockProducts"].filter((p)=>ids.includes(p.id));
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/ShopTheRoom.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShopTheRoom",
    ()=>ShopTheRoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$translationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/translationStore.ts [app-client] (ecmascript)");
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
const ROOMS = [
    {
        id: 'living-room-1',
        title: 'Modern Oturma Odası',
        image: '/images/rooms/lookbook-1.jpg',
        hotspots: [
            {
                x: 25,
                y: 45,
                productSlug: 'luna-kose-koltuk'
            },
            {
                x: 55,
                y: 35,
                productSlug: 'nova-yemek-masasi'
            },
            {
                x: 75,
                y: 65,
                productSlug: 'orbit-sehpa'
            }
        ]
    }
];
function ShopTheRoom() {
    _s();
    const [activeRoomIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [activeSpot, setActiveSpot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$translationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslationStore"])();
    const t = (key)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$translationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][language]?.[key];
    const currentRoom = ROOMS[activeRoomIndex];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShopTheRoom.useEffect": ()=>{
            const fetchData = {
                "ShopTheRoom.useEffect.fetchData": async ()=>{
                    setLoading(true);
                    const slugs = currentRoom.hotspots.map({
                        "ShopTheRoom.useEffect.fetchData.slugs": (h)=>h.productSlug
                    }["ShopTheRoom.useEffect.fetchData.slugs"]);
                    const loadedProducts = {};
                    for (const slug of slugs){
                        const p = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProductBySlug"])(slug);
                        if (p) loadedProducts[slug] = p;
                    }
                    setProducts(loadedProducts);
                    setLoading(false);
                }
            }["ShopTheRoom.useEffect.fetchData"];
            fetchData();
        }
    }["ShopTheRoom.useEffect"], [
        activeRoomIndex,
        currentRoom.hotspots
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-sand py-20 md:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-premium",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true,
                        margin: '-100px'
                    },
                    transition: {
                        duration: 0.8
                    },
                    className: "text-center mb-14",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4",
                            children: t('shoproom_badge') || "İlham Verici"
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                            lineNumber: 65,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-headline text-foreground",
                            children: t('shoproom_title') || "Kombini Satın Al"
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                            lineNumber: 68,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-body-lg mt-4 max-w-lg mx-auto text-muted-foreground",
                            children: t('shoproom_desc') || "İlham aldığınız görüntüden doğrudan alışveriş yapın."
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                            lineNumber: 71,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                    lineNumber: 58,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.8,
                        delay: 0.2
                    },
                    className: "relative rounded-3xl overflow-hidden aspect-[16/9] max-h-[600px] bg-white/50",
                    children: [
                        loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "animate-spin text-gold",
                                size: 40
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                lineNumber: 85,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                            lineNumber: 84,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/images/rooms/lookbook-1.jpg",
                                    alt: "Lüks yaşam alanı",
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "100vw"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                    lineNumber: 90,
                                    columnNumber: 29
                                }, this),
                                currentRoom.hotspots.map((spot, index)=>{
                                    const product = products[spot.productSlug];
                                    if (!product) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute z-10",
                                        style: {
                                            left: `${spot.x}%`,
                                            top: `${spot.y}%`
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveSpot(activeSpot === index ? null : index),
                                                className: "relative w-10 h-10 -translate-x-1/2 -translate-y-1/2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute inset-0 rounded-full bg-white/30 animate-ping"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute inset-2 rounded-full bg-white shadow-lg flex items-center justify-center",
                                                        children: activeSpot === index ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            size: 12,
                                                            className: "text-charcoal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                            lineNumber: 117,
                                                            columnNumber: 53
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            size: 12,
                                                            className: "text-charcoal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                lineNumber: 110,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                children: activeSpot === index && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                                    exit: {
                                                        opacity: 0,
                                                        y: 10,
                                                        scale: 0.95
                                                    },
                                                    transition: {
                                                        duration: 0.2
                                                    },
                                                    className: "absolute left-6 top-0 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden z-20",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative h-32",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: product.images[0],
                                                                alt: product.name,
                                                                fill: true,
                                                                className: "object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                                lineNumber: 135,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[10px] font-sans uppercase tracking-widest text-warm-gray-light mb-1",
                                                                    children: product.brand
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                                    lineNumber: 143,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-serif text-sm",
                                                                    children: product.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                                    lineNumber: 146,
                                                                    columnNumber: 57
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center justify-between mt-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-sans font-bold text-sm",
                                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(product.salePrice || product.price)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                                            lineNumber: 148,
                                                                            columnNumber: 61
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                addItem({
                                                                                    id: product.id,
                                                                                    name: product.name,
                                                                                    brand: product.brand ?? 'SELIS',
                                                                                    price: product.salePrice || product.price,
                                                                                    originalPrice: product.price,
                                                                                    image: product.images[0],
                                                                                    href: `/urun/${product.slug}`
                                                                                });
                                                                            },
                                                                            className: "flex items-center gap-1.5 px-3 py-1.5 bg-gold text-white text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full hover:bg-gold-dark transition-colors",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                                                    size: 10
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                                                    lineNumber: 166,
                                                                                    columnNumber: 65
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: t('shoproom_btn_add') || "Ekle"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                                                    lineNumber: 167,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                                            lineNumber: 151,
                                                                            columnNumber: 61
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                                    lineNumber: 147,
                                                                    columnNumber: 57
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                            lineNumber: 142,
                                                            columnNumber: 53
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                                lineNumber: 125,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                                        lineNumber: 104,
                                        columnNumber: 37
                                    }, this);
                                })
                            ]
                        }, void 0, true),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-charcoal/30 to-transparent pointer-events-none"
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                            lineNumber: 181,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/ShopTheRoom.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/ShopTheRoom.tsx",
            lineNumber: 57,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/ShopTheRoom.tsx",
        lineNumber: 56,
        columnNumber: 9
    }, this);
}
_s(ShopTheRoom, "i+VpGVH5IMbWKfEtnd4zbdT60Do=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$translationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslationStore"]
    ];
});
_c = ShopTheRoom;
var _c;
__turbopack_context__.k.register(_c, "ShopTheRoom");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/product/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFavorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useFavorites.ts [app-client] (ecmascript)");
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
// Unique AI-generated product images for each product
const productImages = {
    'luna-kose-koltuk': '/images/products/luna-sofa.jpg',
    'aurora-yatak-basi': '/images/products/aurora-bed.jpg',
    'sol-yemek-masasi': '/images/products/sol-dining-table.jpg',
    'iris-berjer': '/images/products/iris-armchair.jpg',
    'terra-tv-unitesi': '/images/products/terra-tv.jpg',
    'zen-kitaplik': '/images/products/zen-kitaplik.jpg',
    'neva-abajur': '/images/products/neva-abajur.jpg',
    'diva-konsol': '/images/products/diva-konsol.jpg',
    'como-ahsap-sandalye': '/images/products/como-sandalye.jpg',
    'pera-sehpa': '/images/products/pera-sehpa.jpg',
    'aura-yastik-seti': '/images/products/aura-yastik.jpg',
    'flora-vazo': '/images/products/flora-vazo.jpg'
};
const lifestyleImages = {
    'luna-kose-koltuk': '/images/products/luna-lifestyle.jpg',
    'aurora-yatak-basi': '/images/products/aurora-lifestyle.jpg',
    'sol-yemek-masasi': '/images/categories/dining.jpg',
    'iris-berjer': '/images/categories/living-room.jpg',
    'terra-tv-unitesi': '/images/categories/living-room.jpg',
    'zen-kitaplik': '/images/categories/office.jpg',
    'neva-abajur': '/images/categories/lighting.jpg',
    'diva-konsol': '/images/categories/decor.jpg',
    'como-ahsap-sandalye': '/images/categories/dining.jpg',
    'pera-sehpa': '/images/categories/living-room.jpg',
    'aura-yastik-seti': '/images/categories/bedroom.jpg',
    'flora-vazo': '/images/categories/decor.jpg'
};
const fallbackImage = '/images/products/luna-sofa.jpg';
const ProductCard = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = _s(function ProductCard({ product }) {
    _s();
    const { formatPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { toggleFavorite, isFavorite } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFavorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFavorites"])();
    const isLiked = isFavorite(product.id);
    const hasDiscount = product.salePrice && product.salePrice < product.price;
    const discountPercent = hasDiscount ? Math.round((product.price - product.salePrice) / product.price * 100) : 0;
    const mainImage = product.images?.[0] || productImages[product.slug] || fallbackImage;
    const hoverImage = product.lifestyleImage || product.images?.[1] || lifestyleImages[product.slug] || mainImage;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "group",
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `/urun/${product.slug}`,
                className: "block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative aspect-[3/4] rounded-2xl overflow-hidden bg-sand mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: mainImage,
                            alt: product.name,
                            fill: true,
                            className: "object-cover transition-opacity duration-700 opacity-100 group-hover:opacity-0",
                            sizes: "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductCard.tsx",
                            lineNumber: 72,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: hoverImage,
                            alt: `${product.name} - Yaşam alanı`,
                            fill: true,
                            className: "object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100",
                            sizes: "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductCard.tsx",
                            lineNumber: 81,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-3 left-3 flex flex-col gap-1.5",
                            children: [
                                product.isNew && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2.5 py-1 bg-charcoal text-white text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full",
                                    "data-lang-key": "prod_badge_new",
                                    children: "Yeni"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/ProductCard.tsx",
                                    lineNumber: 92,
                                    columnNumber: 29
                                }, this),
                                hasDiscount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "px-2.5 py-1 bg-terracotta text-white text-[10px] font-sans font-semibold rounded-full",
                                    children: [
                                        "%",
                                        discountPercent
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/product/ProductCard.tsx",
                                    lineNumber: 100,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/product/ProductCard.tsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: (e)=>{
                                e.preventDefault();
                                toggleFavorite(product.id);
                            },
                            className: `absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isLiked ? 'bg-terracotta text-white' : 'bg-white/80 backdrop-blur-sm text-warm-gray opacity-0 group-hover:opacity-100'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                size: 16,
                                fill: isLiked ? 'currentColor' : 'none'
                            }, void 0, false, {
                                fileName: "[project]/src/components/product/ProductCard.tsx",
                                lineNumber: 117,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductCard.tsx",
                            lineNumber: 107,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/product/ProductCard.tsx",
                    lineNumber: 70,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/product/ProductCard.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[10px] font-sans uppercase tracking-widest text-warm-gray-light",
                        children: product.brand
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/ProductCard.tsx",
                        lineNumber: 124,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/urun/${product.slug}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-serif text-base group-hover:text-gold transition-colors duration-300",
                            children: product.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductCard.tsx",
                            lineNumber: 128,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/ProductCard.tsx",
                        lineNumber: 127,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1.5",
                        children: [
                            product.colors.slice(0, 4).map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-3.5 h-3.5 rounded-full border border-border/40",
                                    style: {
                                        backgroundColor: color.hex
                                    }
                                }, color.hex, false, {
                                    fileName: "[project]/src/components/product/ProductCard.tsx",
                                    lineNumber: 136,
                                    columnNumber: 25
                                }, this)),
                            product.colors.length > 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-sans text-warm-gray-light ml-0.5",
                                children: [
                                    "+",
                                    product.colors.length - 4
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/product/ProductCard.tsx",
                                lineNumber: 143,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/product/ProductCard.tsx",
                        lineNumber: 134,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: hasDiscount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-sans font-bold text-sm text-terracotta",
                                    children: formatPrice(product.salePrice)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/ProductCard.tsx",
                                    lineNumber: 153,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-sans text-xs text-warm-gray-light line-through",
                                    children: formatPrice(product.price)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/product/ProductCard.tsx",
                                    lineNumber: 156,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-sans font-bold text-sm",
                            children: formatPrice(product.price)
                        }, void 0, false, {
                            fileName: "[project]/src/components/product/ProductCard.tsx",
                            lineNumber: 161,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/product/ProductCard.tsx",
                        lineNumber: 150,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/product/ProductCard.tsx",
                lineNumber: 123,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/product/ProductCard.tsx",
        lineNumber: 63,
        columnNumber: 9
    }, this);
}, "oX3x6r6PZWyE81bHbNXNvRyBVWs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFavorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFavorites"]
    ];
})), "oX3x6r6PZWyE81bHbNXNvRyBVWs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useFavorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFavorites"]
    ];
});
_c1 = ProductCard;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProductCard$memo");
__turbopack_context__.k.register(_c1, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/NewArrivals.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NewArrivals",
    ()=>NewArrivals
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mock-products.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product/ProductCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$translationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/translationStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function NewArrivals() {
    _s();
    const products = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mock$2d$products$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFeaturedProducts"])().slice(0, 4);
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$translationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslationStore"])();
    const t = (key)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$translationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][language]?.[key];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-background py-20 md:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-premium",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true,
                        margin: '-100px'
                    },
                    transition: {
                        duration: 0.8
                    },
                    className: "flex flex-col md:flex-row md:items-end justify-between mb-14",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-sans uppercase tracking-[0.3em] text-gold mb-4",
                                    "data-lang-key": "new_arr_badge",
                                    children: t('new_arr_badge') || 'Yeni Gelenler'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/NewArrivals.tsx",
                                    lineNumber: 26,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-headline text-foreground",
                                    "data-lang-key": "new_arr_title",
                                    children: t('new_arr_title') || 'Öne Çıkan Parçalar'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/NewArrivals.tsx",
                                    lineNumber: 29,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/home/NewArrivals.tsx",
                            lineNumber: 25,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/kategori/oturma-odasi",
                            className: "group mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-sans font-medium text-warm-gray hover:text-gold transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "data-lang-key": "new_arr_link",
                                    children: t('new_arr_link') || 'Tüm Ürünleri Gör'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/NewArrivals.tsx",
                                    lineNumber: 37,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    size: 14,
                                    className: "group-hover:translate-x-1 transition-transform"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/NewArrivals.tsx",
                                    lineNumber: 38,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/home/NewArrivals.tsx",
                            lineNumber: 33,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/NewArrivals.tsx",
                    lineNumber: 18,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: "hidden",
                    whileInView: "visible",
                    viewport: {
                        once: true,
                        margin: '-50px'
                    },
                    variants: {
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    },
                    className: "grid grid-cols-2 lg:grid-cols-4 gap-6",
                    children: products.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: {
                                hidden: {
                                    opacity: 0,
                                    y: 30
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.8
                                    }
                                }
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
                                product: product
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/NewArrivals.tsx",
                                lineNumber: 60,
                                columnNumber: 29
                            }, this)
                        }, product.id, false, {
                            fileName: "[project]/src/components/home/NewArrivals.tsx",
                            lineNumber: 53,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/home/NewArrivals.tsx",
                    lineNumber: 42,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/NewArrivals.tsx",
            lineNumber: 17,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/NewArrivals.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_s(NewArrivals, "E0YAnuoF0ey9JWuC6ZcYbmpyP44=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$translationStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslationStore"]
    ];
});
_c = NewArrivals;
var _c;
__turbopack_context__.k.register(_c, "NewArrivals");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/TrustBand.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrustBand",
    ()=>TrustBand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/headphones.js [app-client] (ecmascript) <export default as Headphones>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const features = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"],
        title: 'Ücretsiz Kargo',
        description: '₺5.000 üzeri siparişlerde',
        titleKey: 'trust_shipping_title',
        descKey: 'trust_shipping_desc'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"],
        title: '5 Yıl Garanti',
        description: 'Tüm mobilya ürünlerinde',
        titleKey: 'trust_warranty_title',
        descKey: 'trust_warranty_desc'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"],
        title: '30 Gün İade',
        description: 'Koşulsuz iade garantisi',
        titleKey: 'trust_return_title',
        descKey: 'trust_return_desc'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__["Headphones"],
        title: 'VIP Destek',
        description: '7/24 kişiye özel danışmanlık',
        titleKey: 'trust_support_title',
        descKey: 'trust_support_desc'
    }
];
function TrustBand() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-background py-16 md:py-24 border-t border-border/40 transition-colors duration-500",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-premium",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: "hidden",
                whileInView: "visible",
                viewport: {
                    once: true
                },
                variants: {
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                },
                className: "grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12",
                children: features.map((feature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: {
                            hidden: {
                                opacity: 0,
                                y: 20
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6
                                }
                            }
                        },
                        className: "flex flex-col items-center text-center group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-14 h-14 rounded-full bg-accent/30 flex items-center justify-center mb-5 shadow-sm border border-gold/10 group-hover:border-gold/30 transition-all duration-300",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(feature.icon, {
                                    size: 22,
                                    className: "text-selis-gold"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/TrustBand.tsx",
                                    lineNumber: 65,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/TrustBand.tsx",
                                lineNumber: 64,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-serif text-base md:text-lg mb-2 text-foreground",
                                children: t(feature.titleKey) || feature.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/TrustBand.tsx",
                                lineNumber: 67,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs md:text-sm font-sans text-muted-foreground/80",
                                children: t(feature.descKey) || feature.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/TrustBand.tsx",
                                lineNumber: 68,
                                columnNumber: 29
                            }, this)
                        ]
                    }, feature.titleKey, true, {
                        fileName: "[project]/src/components/home/TrustBand.tsx",
                        lineNumber: 56,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/home/TrustBand.tsx",
                lineNumber: 45,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/home/TrustBand.tsx",
            lineNumber: 44,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/TrustBand.tsx",
        lineNumber: 43,
        columnNumber: 9
    }, this);
}
_s(TrustBand, "xTA27ds7Z+fTM4rUKUamcPNer0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = TrustBand;
var _c;
__turbopack_context__.k.register(_c, "TrustBand");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/PersonalizedShowcase.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PersonalizedShowcase",
    ()=>PersonalizedShowcase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/product/ProductCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
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
function PersonalizedShowcase() {
    _s();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [userName, setUserName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userStyles, setUserStyles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PersonalizedShowcase.useEffect": ()=>{
            const fetchUserDataAndProducts = {
                "PersonalizedShowcase.useEffect.fetchUserDataAndProducts": async ()=>{
                    setLoading(true);
                    try {
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                        const user = response?.data?.user;
                        if (user) {
                            const firstName = user.user_metadata?.first_name;
                            const styles = user.user_metadata?.style_preferences || [];
                            setUserName(firstName);
                            setUserStyles(styles);
                            // Fetch all products and filter by style (simulated for now since products don't have style tags yet)
                            // In a real scenario, we'd add 'style' tags to the products table and query by them.
                            const allProducts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProducts"])();
                            // Simple logic: if user has styles, show some products as "recommendations"
                            // If no styles, show general featured products
                            const recommended = styles.length > 0 ? allProducts.slice(0, 4) // Replace with real filter logic later
                             : allProducts.filter({
                                "PersonalizedShowcase.useEffect.fetchUserDataAndProducts": (p)=>p.featured
                            }["PersonalizedShowcase.useEffect.fetchUserDataAndProducts"]).slice(0, 4);
                            setProducts(recommended);
                        }
                    } catch (err) {
                        console.warn('Error fetching personal showcase:', err);
                    } finally{
                        setLoading(false);
                    }
                }
            }["PersonalizedShowcase.useEffect.fetchUserDataAndProducts"];
            fetchUserDataAndProducts();
        }
    }["PersonalizedShowcase.useEffect"], []);
    if (!userName || products.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-24 bg-background overflow-hidden transition-colors duration-500",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container-premium",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                x: -20
                            },
                            whileInView: {
                                opacity: 1,
                                x: 0
                            },
                            viewport: {
                                once: true
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-selis-gold mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                                            lineNumber: 66,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-sans font-bold uppercase tracking-[0.3em]",
                                            "data-lang-key": "showcase_badge",
                                            children: "Senin İçin Seçtiklerimiz"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                                            lineNumber: 67,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                                    lineNumber: 65,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-display-sm text-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-lang-key": "showcase_title_1",
                                            children: "Hoş Geldin, "
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                                            lineNumber: 72,
                                            columnNumber: 29
                                        }, this),
                                        userName,
                                        ". ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                                            lineNumber: 72,
                                            columnNumber: 99
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground/60",
                                            "data-lang-key": "showcase_title_2",
                                            children: "Sana Özel Seçkimiz"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                                            lineNumber: 73,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                                    lineNumber: 71,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                            lineNumber: 60,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/kategori/oturma-odasi",
                            className: "group flex items-center gap-2 text-sm font-sans font-bold tracking-widest uppercase text-foreground hover:text-selis-gold transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "data-lang-key": "showcase_btn_all",
                                    children: "Tümünü Gör"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                                    lineNumber: 81,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    size: 18,
                                    className: "group-hover:translate-x-1 transition-transform"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                                    lineNumber: 82,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                            lineNumber: 77,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                    lineNumber: 59,
                    columnNumber: 17
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center py-20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "animate-spin text-gold",
                        size: 40
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                        lineNumber: 88,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                    lineNumber: 87,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 lg:grid-cols-4 gap-6",
                    children: products.map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: true
                            },
                            transition: {
                                delay: index * 0.1
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$product$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
                                product: product
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                                lineNumber: 100,
                                columnNumber: 33
                            }, this)
                        }, product.id, false, {
                            fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                            lineNumber: 93,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
                    lineNumber: 91,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
            lineNumber: 58,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/PersonalizedShowcase.tsx",
        lineNumber: 57,
        columnNumber: 9
    }, this);
}
_s(PersonalizedShowcase, "KJG2VQvJ335ypGCy/cvwwMAhCHc=");
_c = PersonalizedShowcase;
var _c;
__turbopack_context__.k.register(_c, "PersonalizedShowcase");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SocialProof/useCountUp.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCountUp",
    ()=>useCountUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useCountUp({ end, duration = 2000, decimals = 0, startOnView = true }) {
    _s();
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        amount: 0.3
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCountUp.useEffect": ()=>{
            if (startOnView && !isInView) return;
            const controls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(0, end, {
                duration: duration / 1000,
                ease: "easeOut",
                onUpdate (value) {
                    setCount(Number(value.toFixed(decimals)));
                }
            });
            return ({
                "useCountUp.useEffect": ()=>controls.stop()
            })["useCountUp.useEffect"];
        }
    }["useCountUp.useEffect"], [
        end,
        duration,
        decimals,
        startOnView,
        isInView
    ]);
    return {
        count,
        ref
    };
}
_s(useCountUp, "6GaKik4gWnWh1KoebBmruSRSgxU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SocialProof/StatsCounter.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatsCounter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$useCountUp$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SocialProof/useCountUp.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$socialProof$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SocialProof/socialProof.data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function StatItem({ stat, index }) {
    _s();
    const { count, ref } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$useCountUp$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCountUp"])({
        end: stat.value,
        duration: stat.duration,
        decimals: stat.decimals ?? 0
    });
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const formattedCount = stat.decimals && stat.decimals > 0 ? count.toFixed(stat.decimals) : new Intl.NumberFormat('tr-TR').format(Math.floor(count));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 30
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: '-50px'
        },
        transition: {
            duration: 0.6,
            delay: index * 0.15,
            ease: [
                0.25,
                0.46,
                0.45,
                0.94
            ]
        },
        className: "flex flex-col items-center text-center px-6 py-8 relative group",
        children: [
            index < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$socialProof$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATS"].length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-[#E8E3DC] hidden md:block"
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                lineNumber: 41,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                className: "text-3xl mb-3 block",
                whileHover: {
                    scale: 1.2,
                    rotate: [
                        0,
                        -10,
                        10,
                        0
                    ]
                },
                transition: {
                    duration: 0.4
                },
                children: stat.icon
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-end gap-0.5 mb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        ref: ref,
                        className: "text-4xl md:text-5xl font-bold text-foreground leading-none tabular-nums",
                        style: {
                            fontFamily: 'var(--font-playfair), Playfair Display, serif'
                        },
                        children: formattedCount
                    }, void 0, false, {
                        fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                        lineNumber: 55,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-2xl md:text-3xl font-bold text-[#C9A96E] leading-none mb-0.5",
                        children: stat.suffix
                    }, void 0, false, {
                        fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                        lineNumber: 62,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[13px] text-[#666] font-medium tracking-wide uppercase mt-1",
                children: t(stat.langKey) || stat.label
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                lineNumber: 68,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#C9A96E] rounded-full",
                initial: {
                    width: 0
                },
                whileHover: {
                    width: 40
                },
                transition: {
                    duration: 0.3
                }
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                lineNumber: 73,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
}
_s(StatItem, "4R17jjiIVMTJ6sZgQA5mx53mH30=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$useCountUp$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCountUp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = StatItem;
function StatsCounter() {
    _s1();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-16 bg-sand dark:bg-background transition-colors duration-500",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-5xl mx-auto px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.6
                    },
                    className: "text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-[#C9A96E] tracking-[0.3em] uppercase font-medium mb-3",
                            children: t('stats_subtitle') || 'Rakamlarla SELIS'
                        }, void 0, false, {
                            fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                            lineNumber: 97,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl md:text-3xl font-bold text-foreground",
                            style: {
                                fontFamily: 'var(--font-playfair), Playfair Display, serif'
                            },
                            children: t('stats_title') || 'Binlerce Mutlu Müşteri'
                        }, void 0, false, {
                            fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                            lineNumber: 100,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                    lineNumber: 90,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 md:grid-cols-4 gap-0 bg-white dark:bg-card rounded-sm border border-border/40 shadow-sm overflow-hidden",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$socialProof$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATS"].map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatItem, {
                            stat: stat,
                            index: index
                        }, stat.id, false, {
                            fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                            lineNumber: 111,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                    lineNumber: 109,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    whileInView: {
                        opacity: 1
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        delay: 0.8
                    },
                    className: "flex flex-col items-center mt-8 gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1",
                            children: [
                                1,
                                2,
                                3,
                                4,
                                5
                            ].map((star)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].svg, {
                                    initial: {
                                        scale: 0,
                                        rotate: -30
                                    },
                                    whileInView: {
                                        scale: 1,
                                        rotate: 0
                                    },
                                    viewport: {
                                        once: true
                                    },
                                    transition: {
                                        delay: 0.9 + star * 0.08,
                                        type: 'spring'
                                    },
                                    className: "w-5 h-5",
                                    viewBox: "0 0 20 20",
                                    fill: star <= 4 ? '#C9A96E' : 'url(#halfFillStats)',
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                id: "halfFillStats",
                                                x1: "0",
                                                x2: "1",
                                                y1: "0",
                                                y2: "0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "90%",
                                                        stopColor: "#C9A96E"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                        offset: "90%",
                                                        stopColor: "#E8E3DC"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                                                lineNumber: 136,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                                            lineNumber: 135,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                                            lineNumber: 141,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, star, true, {
                                    fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                                    lineNumber: 125,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                            lineNumber: 123,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[12px] text-[#999]",
                            children: t('stats_based_on') || '12.500+ müşteri değerlendirmesi üzerinden'
                        }, void 0, false, {
                            fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                            lineNumber: 145,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
                    lineNumber: 116,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
            lineNumber: 88,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SocialProof/StatsCounter.tsx",
        lineNumber: 87,
        columnNumber: 9
    }, this);
}
_s1(StatsCounter, "xTA27ds7Z+fTM4rUKUamcPNer0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c1 = StatsCounter;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatItem");
__turbopack_context__.k.register(_c1, "StatsCounter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SocialProof/MediaLogos.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MediaLogos
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/quote.js [app-client] (ecmascript) <export default as Quote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function MediaLogos() {
    _s();
    const [hoveredId, setHoveredId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mediaLogos, setMediaLogos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MediaLogos.useEffect": ()=>{
            const fetchPress = {
                "MediaLogos.useEffect.fetchPress": async ()=>{
                    try {
                        const res = await fetch('/api/press');
                        if (!res.ok) return;
                        const data = await res.json();
                        if (Array.isArray(data)) {
                            setMediaLogos(data);
                        }
                    } catch (error) {
                        console.warn('Error fetching press:', error);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["MediaLogos.useEffect.fetchPress"];
            fetchPress();
        }
    }["MediaLogos.useEffect"], []);
    if (isLoading) return null;
    if (mediaLogos.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-16 bg-[#1C1C1E] overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    whileInView: {
                        opacity: 1
                    },
                    viewport: {
                        once: true
                    },
                    className: "text-center mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-[#C9A96E] tracking-[0.3em] uppercase font-medium mb-3",
                            children: t('media_subtitle') || 'Medyada Biz'
                        }, void 0, false, {
                            fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl md:text-2xl font-medium text-white/80",
                            children: t('media_title') || "Türkiye'nin önde gelen yayınlarında yer aldık"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                            lineNumber: 48,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                    lineNumber: 39,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap items-center justify-center gap-8 md:gap-12",
                    children: mediaLogos.map((media, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                            href: media.article_url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            whileInView: {
                                opacity: 1,
                                y: 0
                            },
                            viewport: {
                                once: true
                            },
                            transition: {
                                delay: index * 0.1
                            },
                            onMouseEnter: ()=>setHoveredId(media.id),
                            onMouseLeave: ()=>setHoveredId(null),
                            className: "relative group flex flex-col items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `
                h-10 flex items-center px-4 rounded-sm
                transition-all duration-300
                ${hoveredId === media.id ? 'opacity-100 bg-white/10' : 'opacity-40 hover:opacity-70'}
              `,
                                    children: media.logo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: media.logo_url,
                                        alt: media.name,
                                        className: "h-6 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                                        lineNumber: 78,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-white font-bold text-lg tracking-tight",
                                        children: media.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                                        lineNumber: 80,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                                    lineNumber: 70,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: hoveredId === media.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: -5,
                                            scale: 0.95
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        },
                                        exit: {
                                            opacity: 0,
                                            y: -5,
                                            scale: 0.95
                                        },
                                        transition: {
                                            duration: 0.15
                                        },
                                        className: "absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#C9A96E] text-white text-[11px] px-3 py-1.5 rounded-sm whitespace-nowrap z-10 font-medium",
                                        children: [
                                            media.article_title,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#C9A96E] rotate-45"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                                                lineNumber: 97,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                                        lineNumber: 89,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                                    lineNumber: 87,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, media.id, true, {
                            fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                            lineNumber: 56,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                    lineNumber: 54,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        delay: 0.5
                    },
                    className: "mt-16 text-center max-w-2xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__["Quote"], {
                            className: "w-8 h-8 text-[#C9A96E]/40 mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                            lineNumber: 113,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-white/70 text-[15px] italic leading-relaxed",
                            children: [
                                "“",
                                t('media_quote') || 'SELIS, Türk mobilya sektöründe lüks ve erişilebilirliği bir arada sunan nadir markalardan biri.',
                                "”"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                            lineNumber: 114,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[#C9A96E] text-[12px] mt-3 font-medium",
                            children: [
                                "— ",
                                t('media_quote_author') || 'Hürriyet Ev, Ocak 2026'
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                            lineNumber: 117,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                    lineNumber: 106,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:hidden mt-10 overflow-hidden -mx-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            x: [
                                0,
                                -600
                            ]
                        },
                        transition: {
                            duration: 15,
                            repeat: Infinity,
                            ease: 'linear'
                        },
                        className: "flex gap-10 whitespace-nowrap px-6",
                        children: [
                            ...mediaLogos,
                            ...mediaLogos
                        ].map((media, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": i >= mediaLogos.length,
                                tabIndex: i >= mediaLogos.length ? -1 : undefined,
                                className: "text-white/30 font-bold text-base tracking-tight flex-shrink-0",
                                children: media.name
                            }, i, false, {
                                fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                                lineNumber: 134,
                                columnNumber: 29
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                        lineNumber: 124,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
                    lineNumber: 123,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
            lineNumber: 37,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SocialProof/MediaLogos.tsx",
        lineNumber: 36,
        columnNumber: 9
    }, this);
}
_s(MediaLogos, "aPk8/PvMZGtXKb4zxabh48/lWqo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = MediaLogos;
var _c;
__turbopack_context__.k.register(_c, "MediaLogos");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SocialProof/InstagramCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InstagramCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function InstagramCard({ post, index }) {
    _s();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Masonry için değişken yükseklik
    const heights = [
        'h-64',
        'h-72',
        'h-56',
        'h-80',
        'h-64',
        'h-72'
    ];
    const height = heights[index % heights.length];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 20
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: '-30px'
        },
        transition: {
            duration: 0.5,
            delay: index * 0.1
        },
        className: `relative ${height} rounded-sm overflow-hidden group`,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "https://instagram.com/selismobilya",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "absolute inset-0 z-10",
                "aria-label": "Instagram'da gör"
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                src: post.imageUrl,
                alt: post.caption,
                fill: true,
                sizes: "(max-width:768px) 50vw, 33vw",
                className: `object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                lineNumber: 43,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-br from-[#E8E3DC] to-[#D4C4B0] -z-10"
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isHovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.2
                    },
                    className: "absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col justify-between p-4 z-20 pointer-events-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-7 h-7 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#B8915A] flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                        className: "w-3.5 h-3.5 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                        lineNumber: 67,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                    lineNumber: 66,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white text-[12px] font-medium",
                                    children: [
                                        "@",
                                        post.username
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                    lineNumber: 69,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                            lineNumber: 65,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white text-[12px] leading-relaxed line-clamp-3 mb-2",
                                    children: post.caption
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                    lineNumber: 76,
                                    columnNumber: 29
                                }, this),
                                post.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            className: "w-3 h-3 text-white/60"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                            lineNumber: 83,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white/60 text-[11px]",
                                            children: post.location
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                            lineNumber: 84,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                    lineNumber: 82,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 pointer-events-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                    className: "w-3 h-3 text-[#C9A96E] fill-[#C9A96E]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white text-[11px] font-medium",
                                                    children: new Intl.NumberFormat('tr-TR').format(post.likes)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                            lineNumber: 93,
                                            columnNumber: 33
                                        }, this),
                                        post.productHref && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: post.productHref,
                                            className: "flex items-center gap-1.5 bg-[#C9A96E] rounded-full px-3 py-1 hover:bg-[#B8915A] transition-colors relative z-30",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                    className: "w-3 h-3 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white text-[11px] font-semibold",
                                                    children: post.productName ?? 'Ürünü Gör'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                            lineNumber: 102,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                                    lineNumber: 91,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                            lineNumber: 75,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                    lineNumber: 57,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, this),
            !isHovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-3 right-3 z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                        className: "w-3.5 h-3.5 text-white"
                    }, void 0, false, {
                        fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                        lineNumber: 122,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                    lineNumber: 121,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
                lineNumber: 120,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SocialProof/InstagramCard.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
_s(InstagramCard, "FPQn8a98tPjpohC7NUYORQR8GJE=");
_c = InstagramCard;
var _c;
__turbopack_context__.k.register(_c, "InstagramCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SocialProof/InstagramFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InstagramFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$InstagramCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SocialProof/InstagramCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$socialProof$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SocialProof/socialProof.data.ts [app-client] (ecmascript)");
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
function InstagramFeed() {
    _s();
    const [showAll, setShowAll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const visible = showAll ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$socialProof$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INSTAGRAM_POSTS"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$socialProof$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INSTAGRAM_POSTS"].slice(0, 6);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "py-20 bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        duration: 0.6
                    },
                    className: "flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-[#C9A96E] tracking-[0.3em] uppercase font-medium mb-2",
                                    children: t('ig_badge') || '@SELISMOBILYA'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                                    lineNumber: 27,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl md:text-3xl font-bold text-[#1C1C1E]",
                                    style: {
                                        fontFamily: 'var(--font-playfair), Playfair Display, serif'
                                    },
                                    children: t('ig_title') || 'Müşterilerimizin Evleri'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                                    lineNumber: 30,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[13px] text-[#666] mt-2 max-w-md",
                                    children: t('ig_desc') || 'Siz de evinizi paylaşın, #selismobilya etiketiyle Instagram\'da görünün'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                                    lineNumber: 36,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                            lineNumber: 26,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://instagram.com/selismobilya",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "flex items-center gap-2.5 px-5 py-2.5 border border-[#E8E3DC] rounded-sm text-[13px] font-medium text-[#1C1C1E] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors duration-200 self-start md:self-auto group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                    className: "w-4 h-4 group-hover:scale-110 transition-transform"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                                    lineNumber: 48,
                                    columnNumber: 25
                                }, this),
                                "@selismobilya",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                    className: "w-3.5 h-3.5 opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                                    lineNumber: 50,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                            lineNumber: 42,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                    lineNumber: 19,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "columns-2 md:columns-3 gap-3 space-y-3",
                    children: visible.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "break-inside-avoid mb-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$InstagramCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                post: post,
                                index: index
                            }, void 0, false, {
                                fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                                lineNumber: 58,
                                columnNumber: 29
                            }, this)
                        }, post.id, false, {
                            fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                            lineNumber: 57,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                    lineNumber: 55,
                    columnNumber: 17
                }, this),
                !showAll && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$socialProof$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INSTAGRAM_POSTS"].length > 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    whileInView: {
                        opacity: 1
                    },
                    viewport: {
                        once: true
                    },
                    className: "text-center mt-10",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowAll(true),
                        className: "px-8 py-3 border border-[#1C1C1E] text-[13px] font-semibold text-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white transition-all duration-300 rounded-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: t('insta_btn_more') || 'Daha Fazla Gör'
                        }, void 0, false, {
                            fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                            lineNumber: 75,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                        lineNumber: 71,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                    lineNumber: 65,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    whileInView: {
                        opacity: 1,
                        y: 0
                    },
                    viewport: {
                        once: true
                    },
                    transition: {
                        delay: 0.3
                    },
                    className: "mt-14 bg-[#F5F0EB] rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-bold text-[#1C1C1E] text-lg mb-1",
                                    children: t('ig_highlight_title') || 'Evinizi Bizimle Paylaşın'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                                    lineNumber: 89,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[13px] text-[#666]",
                                    children: t('ig_highlight_desc') || 'SELIS mobilyalarınızı etiketleyin, sayfamızda öne çıkarılın ve $500 hediye çeki kazanın.'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                                    lineNumber: 92,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                            lineNumber: 88,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://instagram.com",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C9A96E] to-[#B8915A] text-white text-[13px] font-semibold rounded-sm hover:opacity-90 transition-opacity",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                                    lineNumber: 102,
                                    columnNumber: 25
                                }, this),
                                "#selismobilya"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                            lineNumber: 96,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
                    lineNumber: 81,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
            lineNumber: 17,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/SocialProof/InstagramFeed.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_s(InstagramFeed, "kYaQxvnA1xe8wjAN8CF+E0Au0QQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = InstagramFeed;
var _c;
__turbopack_context__.k.register(_c, "InstagramFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/SocialProof/TrustBadges.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrustBadges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/headphones.js [app-client] (ecmascript) <export default as Headphones>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$socialProof$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SocialProof/socialProof.data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
/* ÜST BÖLÜM: 4 garanti kutusu */ const GUARANTEES = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"],
        title: 'Ücretsiz Kargo',
        desc: '₺5.000 üzeri siparişlerde',
        titleKey: 'trust_shipping_title',
        descKey: 'trust_shipping_desc'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        title: '5 Yıl Garanti',
        desc: 'Tüm mobilya ürünlerinde',
        titleKey: 'trust_warranty_title',
        descKey: 'trust_warranty_desc'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"],
        title: '30 Gün İade',
        desc: 'Koşulsuz iade garantisi',
        titleKey: 'trust_return_title',
        descKey: 'trust_return_desc'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Headphones$3e$__["Headphones"],
        title: 'VIP Destek',
        desc: '7/24 kişiye özel danışmanlık',
        titleKey: 'trust_support_title',
        descKey: 'trust_support_desc'
    }
];
;
function TrustBadges() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12 bg-[#F5F0EB] border-t border-[#E8E3DC]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-4 gap-6",
                        children: GUARANTEES.map((item, index)=>{
                            const Icon = item.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                whileInView: {
                                    opacity: 1,
                                    y: 0
                                },
                                viewport: {
                                    once: true
                                },
                                transition: {
                                    delay: index * 0.1
                                },
                                className: "flex flex-col items-center text-center gap-3 p-4 rounded-sm bg-white border border-[#E8E3DC] hover:border-[#C9A96E] hover:shadow-sm transition-all duration-300 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-[#F5F0EB] flex items-center justify-center group-hover:bg-[#C9A96E]/10 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "w-5 h-5 text-[#C9A96E]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                            lineNumber: 60,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                        lineNumber: 59,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold text-[#1C1C1E] text-[13px] mb-1",
                                                "data-lang-key": item.titleKey,
                                                suppressHydrationWarning: true,
                                                children: item.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                                lineNumber: 63,
                                                columnNumber: 41
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-[#666] leading-relaxed",
                                                "data-lang-key": item.descKey,
                                                suppressHydrationWarning: true,
                                                children: item.desc
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                                lineNumber: 66,
                                                columnNumber: 41
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                        lineNumber: 62,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, item.title, true, {
                                fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                lineNumber: 51,
                                columnNumber: 33
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                        lineNumber: 47,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                    lineNumber: 46,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                lineNumber: 45,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#1C1C1E] py-8 px-6 border-t border-white/5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-[11px] text-white/40 tracking-[0.25em] uppercase mb-6",
                            "data-lang-key": "trust_secure_shopping",
                            children: t('trust_secure_shopping') || 'Güvenli Alışveriş'
                        }, void 0, false, {
                            fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                            lineNumber: 80,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center justify-center gap-6 md:gap-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    className: "flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-full bg-[#4CAF50]/20 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                className: "w-4 h-4 text-[#4CAF50]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                                lineNumber: 92,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                            lineNumber: 91,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white text-[11px] font-bold leading-none",
                                                    children: "256-bit SSL"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white/40 text-[9px] mt-0.5",
                                                    "data-lang-key": "trust_ssl_encrypted",
                                                    children: t('trust_ssl_encrypted') || 'Şifreli bağlantı'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                                    lineNumber: 98,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                            lineNumber: 94,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                    lineNumber: 87,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-8 bg-white/10 hidden md:block"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                    lineNumber: 105,
                                    columnNumber: 25
                                }, this),
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$socialProof$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRUST_BADGES"].filter((b)=>b.category === 'payment').map((badge)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                                        href: badge.verifyUrl ?? '#',
                                        target: badge.verifyUrl ? '_blank' : '_self',
                                        rel: "noopener noreferrer",
                                        whileHover: {
                                            scale: 1.08,
                                            opacity: 1
                                        },
                                        className: "opacity-40 hover:opacity-100 transition-all duration-200 flex items-center justify-center",
                                        title: badge.description,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-white font-bold text-sm bg-white/10 px-3 py-1.5 rounded-sm",
                                            children: badge.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                            lineNumber: 118,
                                            columnNumber: 33
                                        }, this)
                                    }, badge.id, false, {
                                        fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                        lineNumber: 109,
                                        columnNumber: 29
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-8 bg-white/10 hidden md:block"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                    lineNumber: 125,
                                    columnNumber: 25
                                }, this),
                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SocialProof$2f$socialProof$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRUST_BADGES"].filter((b)=>b.category === 'association').map((badge)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                                        href: badge.verifyUrl ?? '#',
                                        target: badge.verifyUrl ? '_blank' : '_self',
                                        rel: "noopener noreferrer",
                                        whileHover: {
                                            scale: 1.08
                                        },
                                        className: "opacity-40 hover:opacity-100 transition-all duration-200",
                                        title: `${badge.name} — ${badge.description}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-sm hover:border-[#C9A96E] transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                    className: "w-3.5 h-3.5 text-[#C9A96E]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-white text-[11px] font-semibold",
                                                    children: badge.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                            lineNumber: 138,
                                            columnNumber: 33
                                        }, this)
                                    }, badge.id, false, {
                                        fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                                        lineNumber: 129,
                                        columnNumber: 29
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                            lineNumber: 85,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-white/25 text-[10px] mt-6 tracking-wide",
                            "data-lang-key": "trust_secure_desc",
                            children: t('trust_secure_desc') || 'Tüm ödemeleriniz 256-bit SSL şifreleme ile korunmaktadır. iyzico ve PayTR güvencesiyle güvenli alışveriş.'
                        }, void 0, false, {
                            fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                            lineNumber: 149,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                    lineNumber: 79,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SocialProof/TrustBadges.tsx",
        lineNumber: 43,
        columnNumber: 9
    }, this);
}
_s(TrustBadges, "xTA27ds7Z+fTM4rUKUamcPNer0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = TrustBadges;
var _c;
__turbopack_context__.k.register(_c, "TrustBadges");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_543d18d2._.js.map