(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/home/HeroSection/ImageSlider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageSlider",
    ()=>ImageSlider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const images = [
    {
        id: 1,
        // Yüksek çözünürlüklü lüks salon
        src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2560',
        alt: 'Lüks ve modern oturma odası'
    },
    {
        id: 2,
        // Modern ve premium yatak odası
        src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2560',
        alt: 'Minimalist lüks yatak odası'
    },
    {
        id: 3,
        // Zarif yemek odası
        src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2560',
        alt: 'Zarif ve modern yemek odası'
    }
];
function ImageSlider({ parallaxOffset }) {
    _s();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Auto-play the slider
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageSlider.useEffect": ()=>{
            const timer = setInterval({
                "ImageSlider.useEffect.timer": ()=>{
                    setCurrentIndex({
                        "ImageSlider.useEffect.timer": (prev)=>(prev + 1) % images.length
                    }["ImageSlider.useEffect.timer"]);
                }
            }["ImageSlider.useEffect.timer"], 5000); // Change image every 5 seconds
            return ({
                "ImageSlider.useEffect": ()=>clearInterval(timer)
            })["ImageSlider.useEffect"];
        }
    }["ImageSlider.useEffect"], []);
    // Dark overlay gradients (40-50% opacity)
    const overlayGradient = 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.5) 100%)';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden bg-black",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute w-full",
            style: {
                height: '115%',
                top: '-7.5%',
                transform: `translateY(${parallaxOffset}px)`,
                willChange: 'transform'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    initial: false,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "absolute inset-0 w-full h-full",
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
                            duration: 1.5,
                            ease: 'easeInOut'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0 w-full h-full",
                            initial: {
                                scale: 1
                            },
                            animate: {
                                scale: 1.05
                            },
                            transition: {
                                duration: 6,
                                ease: 'linear'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: images[currentIndex].src,
                                alt: images[currentIndex].alt,
                                fill: true,
                                priority: currentIndex === 0,
                                className: "object-cover",
                                sizes: "100vw",
                                suppressHydrationWarning: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/home/HeroSection/ImageSlider.tsx",
                                lineNumber: 77,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/home/HeroSection/ImageSlider.tsx",
                            lineNumber: 71,
                            columnNumber: 25
                        }, this)
                    }, currentIndex, false, {
                        fileName: "[project]/src/components/home/HeroSection/ImageSlider.tsx",
                        lineNumber: 62,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/home/HeroSection/ImageSlider.tsx",
                    lineNumber: 61,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 pointer-events-none z-10",
                    style: {
                        background: overlayGradient
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/home/HeroSection/ImageSlider.tsx",
                    lineNumber: 91,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/HeroSection/ImageSlider.tsx",
            lineNumber: 52,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/home/HeroSection/ImageSlider.tsx",
        lineNumber: 48,
        columnNumber: 9
    }, this);
}
_s(ImageSlider, "tPjzCc9H5UuFdWNuAHYoD0K4UOk=");
_c = ImageSlider;
var _c;
__turbopack_context__.k.register(_c, "ImageSlider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/HeroSection/ImageSlider.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/home/HeroSection/ImageSlider.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_home_HeroSection_ImageSlider_tsx_aba9d7be._.js.map