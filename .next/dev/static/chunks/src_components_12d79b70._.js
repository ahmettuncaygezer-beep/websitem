(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Mobile/useSwipeGallery.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSwipeGallery",
    ()=>useSwipeGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useSwipeGallery(count) {
    _s();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [dragOffset, setDragOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const startX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const goTo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSwipeGallery.useCallback[goTo]": (index)=>{
            setCurrentIndex(Math.max(0, Math.min(index, count - 1)));
            setDragOffset(0);
        }
    }["useSwipeGallery.useCallback[goTo]"], [
        count
    ]);
    const goNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSwipeGallery.useCallback[goNext]": ()=>{
            setCurrentIndex({
                "useSwipeGallery.useCallback[goNext]": (prev)=>Math.min(prev + 1, count - 1)
            }["useSwipeGallery.useCallback[goNext]"]);
            setDragOffset(0);
        }
    }["useSwipeGallery.useCallback[goNext]"], [
        count
    ]);
    const goPrev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSwipeGallery.useCallback[goPrev]": ()=>{
            setCurrentIndex({
                "useSwipeGallery.useCallback[goPrev]": (prev)=>Math.max(prev - 1, 0)
            }["useSwipeGallery.useCallback[goPrev]"]);
            setDragOffset(0);
        }
    }["useSwipeGallery.useCallback[goPrev]"], []);
    const onTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSwipeGallery.useCallback[onTouchStart]": (e)=>{
            startX.current = e.touches[0].clientX;
            setIsDragging(true);
        }
    }["useSwipeGallery.useCallback[onTouchStart]"], []);
    const onTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSwipeGallery.useCallback[onTouchMove]": (e)=>{
            const delta = e.touches[0].clientX - startX.current;
            setDragOffset(delta);
        }
    }["useSwipeGallery.useCallback[onTouchMove]"], []);
    const onTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSwipeGallery.useCallback[onTouchEnd]": ()=>{
            const threshold = 50;
            if (dragOffset < -threshold) {
                goNext();
            } else if (dragOffset > threshold) {
                goPrev();
            } else {
                setDragOffset(0);
            }
            setIsDragging(false);
        }
    }["useSwipeGallery.useCallback[onTouchEnd]"], [
        dragOffset,
        goNext,
        goPrev
    ]);
    return {
        currentIndex,
        dragOffset,
        isDragging,
        goTo,
        goNext,
        goPrev,
        handlers: {
            onTouchStart,
            onTouchMove,
            onTouchEnd
        }
    };
}
_s(useSwipeGallery, "wL/zO7dyMa8s23TOnjFjA+bmReU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Mobile/usePinchZoom.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePinchZoom",
    ()=>usePinchZoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function getDistance(t1, t2) {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}
function getMidpoint(t1, t2) {
    return {
        x: (t1.clientX + t2.clientX) / 2,
        y: (t1.clientY + t2.clientY) / 2
    };
}
function usePinchZoom() {
    _s();
    const [scale, setScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [panX, setPanX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [panY, setPanY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [originX, setOriginX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [originY, setOriginY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const initialDistance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(1);
    const panStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const lastPan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const lastTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePinchZoom.useCallback[reset]": ()=>{
            setScale(1);
            setPanX(0);
            setPanY(0);
            lastScale.current = 1;
            lastPan.current = {
                x: 0,
                y: 0
            };
        }
    }["usePinchZoom.useCallback[reset]"], []);
    const doubleTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePinchZoom.useCallback[doubleTap]": (clientX, clientY, containerRect)=>{
            if (scale > 1) {
                reset();
            } else {
                const ox = clientX - containerRect.left;
                const oy = clientY - containerRect.top;
                setOriginX(ox);
                setOriginY(oy);
                setScale(2.5);
                lastScale.current = 2.5;
            }
        }
    }["usePinchZoom.useCallback[doubleTap]"], [
        scale,
        reset
    ]);
    const onTouchStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePinchZoom.useCallback[onTouchStart]": (e)=>{
            if (e.touches.length === 2) {
                e.preventDefault();
                const mid = getMidpoint(e.touches[0], e.touches[1]);
                initialDistance.current = getDistance(e.touches[0], e.touches[1]);
                setOriginX(mid.x);
                setOriginY(mid.y);
            } else if (e.touches.length === 1 && scale > 1) {
                panStart.current = {
                    x: e.touches[0].clientX - lastPan.current.x,
                    y: e.touches[0].clientY - lastPan.current.y
                };
            }
            // Double tap detection
            const now = Date.now();
            if (now - lastTap.current < 300) {
            // Handled by parent via doubleTap()
            }
            lastTap.current = now;
        }
    }["usePinchZoom.useCallback[onTouchStart]"], [
        scale
    ]);
    const onTouchMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePinchZoom.useCallback[onTouchMove]": (e)=>{
            if (e.touches.length === 2) {
                e.preventDefault();
                const dist = getDistance(e.touches[0], e.touches[1]);
                const newScale = Math.min(3, Math.max(1, dist / initialDistance.current * lastScale.current));
                setScale(newScale);
            } else if (e.touches.length === 1 && scale > 1) {
                const newPanX = e.touches[0].clientX - panStart.current.x;
                const newPanY = e.touches[0].clientY - panStart.current.y;
                setPanX(newPanX);
                setPanY(newPanY);
            }
        }
    }["usePinchZoom.useCallback[onTouchMove]"], [
        scale
    ]);
    const onTouchEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "usePinchZoom.useCallback[onTouchEnd]": (e)=>{
            if (scale < 1.1) {
                reset();
            } else {
                lastScale.current = scale;
                lastPan.current = {
                    x: panX,
                    y: panY
                };
            }
        }
    }["usePinchZoom.useCallback[onTouchEnd]"], [
        scale,
        panX,
        panY,
        reset
    ]);
    return {
        scale,
        panX,
        panY,
        originX,
        originY,
        isZoomed: scale > 1.05,
        reset,
        doubleTap,
        handlers: {
            onTouchStart,
            onTouchMove,
            onTouchEnd
        }
    };
}
_s(usePinchZoom, "dh05aFncpdVBkaYhxxM7hmBRoGo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Mobile/ProductImageGallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductImageGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$expand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Expand$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/expand.js [app-client] (ecmascript) <export default as Expand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$useSwipeGallery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Mobile/useSwipeGallery.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$usePinchZoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Mobile/usePinchZoom.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
/* ─── Desktop lens zoom ─────────────────────────────────────────────── */ /* ─── Full-screen overlay ───────────────────────────────────────────── */ function FullscreenModal({ images, startIndex, productName, onClose }) {
    _s();
    const gallery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$useSwipeGallery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwipeGallery"])(images.length);
    const zoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$usePinchZoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePinchZoom"])();
    const imgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleDoubleTap = (e)=>{
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
            zoom.doubleTap(e.touches[0]?.clientX ?? 0, e.touches[0]?.clientY ?? 0, rect);
        }
    };
    const handleShare = async ()=>{
        if (navigator.share) {
            await navigator.share({
                title: productName,
                url: window.location.href
            }).catch(()=>{});
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        className: "fixed inset-0 z-[100] bg-black flex flex-col",
        style: {
            touchAction: 'none'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-4 flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "w-10 h-10 flex items-center justify-center text-white",
                        "aria-label": "Kapat",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 22
                        }, void 0, false, {
                            fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                            lineNumber: 58,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 57,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-white/70 text-sm",
                        children: [
                            gallery.currentIndex + 1,
                            " / ",
                            images.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleShare,
                        className: "w-10 h-10 flex items-center justify-center text-white",
                        "aria-label": "Paylaş",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                            lineNumber: 62,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: imgRef,
                className: "flex-1 relative overflow-hidden",
                ...gallery.handlers,
                onTouchStart: (e)=>{
                    gallery.handlers.onTouchStart(e);
                    zoom.handlers.onTouchStart(e);
                },
                onTouchMove: (e)=>{
                    gallery.handlers.onTouchMove(e);
                    zoom.handlers.onTouchMove(e);
                },
                onTouchEnd: (e)=>{
                    gallery.handlers.onTouchEnd();
                    zoom.handlers.onTouchEnd(e);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        height: '100%',
                        transform: `translateX(calc(${-gallery.currentIndex * 100}% + ${gallery.dragOffset}px))`,
                        transition: gallery.isDragging ? 'none' : 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
                        willChange: 'transform'
                    },
                    children: images.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-shrink-0 w-full h-full flex items-center justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'relative',
                                    transform: i === gallery.currentIndex ? `scale(${zoom.scale}) translate(${zoom.panX / zoom.scale}px, ${zoom.panY / zoom.scale}px)` : 'none',
                                    transformOrigin: `${zoom.originX}px ${zoom.originY}px`,
                                    transition: zoom.isZoomed ? 'none' : 'transform 300ms ease',
                                    willChange: 'transform'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: src,
                                    alt: `${productName} ${i + 1}`,
                                    fill: true,
                                    className: "object-contain",
                                    sizes: "100vw"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                    lineNumber: 108,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                lineNumber: 95,
                                columnNumber: 29
                            }, this)
                        }, i, false, {
                            fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                            lineNumber: 94,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                    lineNumber: 84,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-2 pb-6 pt-4 flex-shrink-0",
                children: images.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        onClick: ()=>gallery.goTo(i),
                        animate: {
                            width: i === gallery.currentIndex ? 16 : 6
                        },
                        className: "h-1.5 rounded-full",
                        style: {
                            background: i === gallery.currentIndex ? '#C9A96E' : '#555'
                        },
                        transition: {
                            type: 'spring',
                            stiffness: 400
                        }
                    }, i, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 118,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
        lineNumber: 48,
        columnNumber: 9
    }, this);
}
_s(FullscreenModal, "Wyal+JVIZb4R1kozT+MxPrKiFo8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$useSwipeGallery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwipeGallery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$usePinchZoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePinchZoom"]
    ];
});
_c = FullscreenModal;
function ProductImageGallery({ images, productName }) {
    _s1();
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const gallery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$useSwipeGallery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwipeGallery"])(images.length);
    const zoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$usePinchZoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePinchZoom"])();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentMobileIndex = gallery.currentIndex;
    const handleDoubleTap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ProductImageGallery.useCallback[handleDoubleTap]": (e)=>{
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const t = e.changedTouches[0];
                zoom.doubleTap(t.clientX, t.clientY, rect);
            }
        }
    }["ProductImageGallery.useCallback[handleDoubleTap]"], [
        zoom
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:flex gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 w-16 flex-shrink-0",
                        children: images.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveIndex(i),
                                className: "relative w-16 h-16 rounded-sm overflow-hidden border-2 transition-all duration-200 flex-shrink-0",
                                style: {
                                    borderColor: activeIndex === i ? '#C9A96E' : 'transparent',
                                    opacity: activeIndex === i ? 1 : 0.55
                                },
                                "aria-label": `Görsel ${i + 1}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: src,
                                    alt: `${productName} küçük ${i + 1}`,
                                    fill: true,
                                    className: "object-cover",
                                    sizes: "64px"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                    lineNumber: 167,
                                    columnNumber: 29
                                }, this)
                            }, i, false, {
                                fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                lineNumber: 157,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 155,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    onClick: ()=>setIsFullscreen(true),
                                    className: "relative aspect-square bg-[#F5F0EB] overflow-hidden cursor-zoom-in rounded-sm transition-transform duration-300 active:scale-[0.98]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: images[activeIndex] ?? images[0],
                                        alt: productName,
                                        fill: true,
                                        className: "object-cover",
                                        sizes: "(max-width:1280px) 50vw, 600px",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                        lineNumber: 179,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                    lineNumber: 175,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsFullscreen(true),
                                    className: "absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-[#E8E3DC] text-[#1C1C1E] hover:bg-white transition-colors z-10",
                                    "aria-label": "Tam ekran",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$expand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Expand$3e$__["Expand"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                        lineNumber: 194,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                    lineNumber: 189,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                            lineNumber: 174,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 173,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                lineNumber: 153,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "block md:hidden relative overflow-hidden bg-[#F5F0EB]",
                style: {
                    aspectRatio: '1/1'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: containerRef,
                        className: "flex h-full",
                        style: {
                            transform: `translateX(calc(${-currentMobileIndex * 100}% + ${gallery.dragOffset}px))`,
                            transition: gallery.isDragging ? 'none' : 'transform 300ms cubic-bezier(0.25,0.46,0.45,0.94)',
                            willChange: 'transform',
                            touchAction: zoom.isZoomed ? 'none' : 'pan-y'
                        },
                        ...gallery.handlers,
                        onTouchStart: (e)=>{
                            gallery.handlers.onTouchStart(e);
                            zoom.handlers.onTouchStart(e);
                        },
                        onTouchMove: (e)=>{
                            gallery.handlers.onTouchMove(e);
                            zoom.handlers.onTouchMove(e);
                        },
                        onTouchEnd: (e)=>{
                            gallery.handlers.onTouchEnd();
                            zoom.handlers.onTouchEnd(e);
                            handleDoubleTap(e);
                        },
                        children: images.map((src, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-shrink-0 w-full h-full relative",
                                style: {
                                    userSelect: 'none'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '100%',
                                        height: '100%',
                                        position: 'relative',
                                        transform: i === currentMobileIndex ? `scale(${zoom.scale}) translate(${zoom.panX / zoom.scale}px,${zoom.panY / zoom.scale}px)` : 'none',
                                        transformOrigin: `${zoom.originX}px ${zoom.originY}px`,
                                        transition: zoom.isZoomed ? 'none' : 'transform 300ms ease',
                                        willChange: 'transform'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: src,
                                        alt: `${productName} ${i + 1}`,
                                        fill: true,
                                        className: "object-cover",
                                        sizes: "100vw",
                                        priority: i === 0,
                                        draggable: false
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                        lineNumber: 242,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                    lineNumber: 229,
                                    columnNumber: 29
                                }, this)
                            }, i, false, {
                                fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                lineNumber: 228,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 203,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 right-3 z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "px-2 py-1 text-[11px] text-white rounded-full",
                            style: {
                                background: 'rgba(0,0,0,0.4)'
                            },
                            children: [
                                currentMobileIndex + 1,
                                " / ",
                                images.length
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                            lineNumber: 258,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 257,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsFullscreen(true),
                        className: "absolute top-3 left-3 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white",
                        style: {
                            background: 'rgba(0,0,0,0.4)'
                        },
                        "aria-label": "Tam ekran",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$expand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Expand$3e$__["Expand"], {
                            size: 14
                        }, void 0, false, {
                            fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                            lineNumber: 270,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 264,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5",
                        children: images.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: ()=>gallery.goTo(i),
                                animate: {
                                    width: i === currentMobileIndex ? 16 : 6
                                },
                                className: "h-1.5 rounded-full",
                                style: {
                                    background: i === currentMobileIndex ? '#C9A96E' : 'rgba(255,255,255,0.7)'
                                },
                                transition: {
                                    type: 'spring',
                                    stiffness: 400
                                },
                                "aria-label": `Görsel ${i + 1}`
                            }, i, false, {
                                fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                                lineNumber: 276,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 274,
                        columnNumber: 17
                    }, this),
                    currentMobileIndex > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: gallery.goPrev,
                        className: "absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white",
                        style: {
                            background: 'rgba(0,0,0,0.3)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                            lineNumber: 291,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 290,
                        columnNumber: 21
                    }, this),
                    currentMobileIndex < images.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: gallery.goNext,
                        className: "absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full text-white",
                        style: {
                            background: 'rgba(0,0,0,0.3)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                            lineNumber: 296,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                        lineNumber: 295,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                lineNumber: 201,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FullscreenModal, {
                    images: images,
                    startIndex: activeIndex,
                    productName: productName,
                    onClose: ()=>setIsFullscreen(false)
                }, void 0, false, {
                    fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                    lineNumber: 304,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Mobile/ProductImageGallery.tsx",
                lineNumber: 302,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s1(ProductImageGallery, "mV0SLLmnmQy4EiQZPO7kUA4LYco=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$useSwipeGallery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwipeGallery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$usePinchZoom$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePinchZoom"]
    ];
});
_c1 = ProductImageGallery;
var _c, _c1;
__turbopack_context__.k.register(_c, "FullscreenModal");
__turbopack_context__.k.register(_c1, "ProductImageGallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Mobile/useStickyCart.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStickyCart",
    ()=>useStickyCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
function useStickyCart(targetRef) {
    _s();
    const [shouldShow, setShouldShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useStickyCart.useEffect": ()=>{
            const el = targetRef.current;
            if (!el) return;
            const observer = new IntersectionObserver({
                "useStickyCart.useEffect": ([entry])=>setShouldShow(!entry.isIntersecting)
            }["useStickyCart.useEffect"], {
                threshold: 0,
                rootMargin: '0px'
            });
            observer.observe(el);
            return ({
                "useStickyCart.useEffect": ()=>observer.disconnect()
            })["useStickyCart.useEffect"];
        }
    }["useStickyCart.useEffect"], [
        targetRef
    ]);
    return shouldShow;
}
_s(useStickyCart, "3BwMrp5cygsfSyEVOwpl2OS+lw0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Mobile/StickyAddToCart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StickyAddToCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$useStickyCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Mobile/useStickyCart.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function StickyAddToCart({ productName, productImage, price, originalPrice, hasVariantSelected = true, onScrollToVariants, onAddToCart, originalButtonRef }) {
    _s();
    const shouldShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$useStickyCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStickyCart"])(originalButtonRef);
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [added, setAdded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleAddToCart = ()=>{
        if (!hasVariantSelected) {
            onScrollToVariants?.();
            return;
        }
        onAddToCart?.(quantity);
        setAdded(true);
        setTimeout(()=>setAdded(false), 2000);
    };
    // Only on mobile
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "block md:hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: shouldShow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    y: 100,
                    opacity: 0
                },
                animate: {
                    y: 0,
                    opacity: 1
                },
                exit: {
                    y: 100,
                    opacity: 0
                },
                transition: {
                    type: 'spring',
                    damping: 25,
                    stiffness: 300
                },
                className: "fixed left-0 right-0 z-40 px-4 py-3 bg-background/95 backdrop-blur-xl border-t border-border shadow-[0_-8px_24px_rgba(0,0,0,0.08)]",
                style: {
                    bottom: 'calc(64px + env(safe-area-inset-bottom))'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-12 h-12 rounded-sm overflow-hidden flex-shrink-0 bg-muted",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: productImage,
                                alt: productName,
                                fill: true,
                                className: "object-cover",
                                sizes: "48px"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                lineNumber: 64,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                            lineNumber: 63,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] font-medium text-foreground truncate",
                                    children: productName
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                    lineNumber: 67,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 mt-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                            initial: {
                                                opacity: 0,
                                                y: -4
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            className: "text-[14px] font-bold text-foreground",
                                            children: [
                                                "₺",
                                                price.toLocaleString('tr-TR')
                                            ]
                                        }, price, true, {
                                            fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                            lineNumber: 69,
                                            columnNumber: 37
                                        }, this),
                                        originalPrice && originalPrice > price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11px] line-through text-muted-foreground/60",
                                            children: [
                                                "₺",
                                                originalPrice.toLocaleString('tr-TR')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                            lineNumber: 78,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                    lineNumber: 68,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                            lineNumber: 66,
                            columnNumber: 29
                        }, this),
                        hasVariantSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center border border-border rounded-sm overflow-hidden flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setQuantity((q)=>Math.max(1, q - 1)),
                                    className: "w-8 h-9 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors",
                                    style: {
                                        WebkitTapHighlightColor: 'transparent'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                        lineNumber: 93,
                                        columnNumber: 41
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                    lineNumber: 88,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-8 text-center text-[13px] font-semibold text-foreground",
                                    children: quantity
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                    lineNumber: 95,
                                    columnNumber: 37
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setQuantity((q)=>q + 1),
                                    className: "w-8 h-9 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors",
                                    style: {
                                        WebkitTapHighlightColor: 'transparent'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                        lineNumber: 101,
                                        columnNumber: 41
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                    lineNumber: 96,
                                    columnNumber: 37
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                            lineNumber: 87,
                            columnNumber: 33
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            onClick: handleAddToCart,
                            className: `flex-shrink-0 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-sm text-[13px] font-semibold transition-colors
                                    ${added ? 'bg-green-600 text-white' : 'bg-foreground text-background'}`,
                            style: {
                                minWidth: 120,
                                WebkitTapHighlightColor: 'transparent'
                            },
                            whileTap: {
                                scale: 0.97
                            },
                            children: added ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                        lineNumber: 119,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-lang-key": "prod_add_cart_added",
                                        children: "Eklendi"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                        lineNumber: 120,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true) : hasVariantSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                        lineNumber: 124,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-lang-key": "prod_add_to_cart",
                                        children: "Sepete Ekle"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                        lineNumber: 125,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-lang-key": "prod_select_option",
                                        children: "Seçenek Seç"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                        lineNumber: 129,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                                        lineNumber: 130,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                            lineNumber: 107,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                    lineNumber: 61,
                    columnNumber: 25
                }, this)
            }, "sticky-cart", false, {
                fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
                lineNumber: 50,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
            lineNumber: 48,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Mobile/StickyAddToCart.tsx",
        lineNumber: 47,
        columnNumber: 9
    }, this);
}
_s(StickyAddToCart, "XEjccyqYgi0sBThxZqPWDwz0DZ8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$useStickyCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStickyCart"]
    ];
});
_c = StickyAddToCart;
var _c;
__turbopack_context__.k.register(_c, "StickyAddToCart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/ProductBreadcrumb.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductBreadcrumb",
    ()=>ProductBreadcrumb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
function ProductBreadcrumb({ items }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                "aria-label": "Breadcrumb",
                className: "flex items-center gap-2 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "hidden md:flex items-center gap-2 list-none p-0 m-0",
                        children: items.map((item, i)=>{
                            const isLast = i === items.length - 1;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-center gap-2",
                                children: [
                                    i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-border",
                                        style: {
                                            fontSize: '12px'
                                        },
                                        children: "›"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductBreadcrumb.tsx",
                                        lineNumber: 18,
                                        columnNumber: 43
                                    }, this),
                                    isLast || !item.href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-foreground text-[12px]",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductBreadcrumb.tsx",
                                        lineNumber: 20,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: "text-muted-foreground hover:text-selis-gold transition-colors duration-150 text-[12px] no-underline",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductBreadcrumb.tsx",
                                        lineNumber: 22,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductBreadcrumb.tsx",
                                lineNumber: 17,
                                columnNumber: 29
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductBreadcrumb.tsx",
                        lineNumber: 13,
                        columnNumber: 17
                    }, this),
                    items.length >= 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: items[items.length - 2].href ?? '/',
                        className: "flex md:hidden items-center gap-1 transition-colors duration-150",
                        style: {
                            fontSize: '12px',
                            color: '#999',
                            textDecoration: 'none'
                        },
                        children: [
                            "‹ ",
                            items[items.length - 2].label
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductBreadcrumb.tsx",
                        lineNumber: 32,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductBreadcrumb.tsx",
                lineNumber: 11,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: items.map((item, i)=>({
                                '@type': 'ListItem',
                                position: i + 1,
                                name: item.label,
                                ...item.href ? {
                                    item: item.href
                                } : {}
                            }))
                    })
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductBreadcrumb.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_c = ProductBreadcrumb;
var _c;
__turbopack_context__.k.register(_c, "ProductBreadcrumb");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductTitle",
    ()=>ProductTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ProductTitle({ brand, name, sku, rating, slug }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const average = rating?.average || 4.8;
    const count = rating?.count || 127;
    const full = Math.floor(average);
    const hasHalf = average - full >= 0.3;
    const handleShare = async ()=>{
        if (navigator.share) {
            await navigator.share({
                title: name,
                url: window.location.href
            });
        } else {
            await navigator.clipboard.writeText(window.location.href);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "uppercase font-medium",
                        style: {
                            fontSize: '11px',
                            letterSpacing: '0.25em',
                            color: 'var(--selis-gold)'
                        },
                        children: brand
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        style: {
                            fontSize: '11px'
                        },
                        children: [
                            "SKU: ",
                            sku
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                        lineNumber: 28,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "mt-2 text-3xl md:text-4xl text-foreground",
                style: {
                    fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
                    fontWeight: 400,
                    lineHeight: 1.15
                },
                children: name
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 mt-3 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-0.5",
                        children: Array.from({
                            length: 5
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                size: 14,
                                fill: i < full ? '#C9A96E' : i === full && hasHalf ? '#C9A96E' : 'transparent',
                                stroke: i < full || i === full && hasHalf ? '#C9A96E' : 'currentColor',
                                className: i < full || i === full && hasHalf ? '' : 'text-border',
                                strokeWidth: 1.5,
                                style: i === full && hasHalf ? {
                                    clipPath: 'inset(0 50% 0 0)'
                                } : undefined
                            }, i, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                                lineNumber: 40,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-bold text-foreground",
                        children: average
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                        lineNumber: 49,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `/urun/${slug}#reviews`,
                        className: "text-sm text-muted-foreground hover:text-selis-gold transition-colors duration-150",
                        style: {
                            textDecoration: 'none'
                        },
                        children: [
                            "(",
                            count,
                            " ",
                            t('pdp_reviews_short') || 'değerlendirme',
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                        lineNumber: 50,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-border",
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleShare,
                        "aria-label": t('pdp_share') || 'Paylaş',
                        className: "flex items-center gap-1 text-muted-foreground hover:text-selis-gold transition-colors duration-150 bg-transparent border-none cursor-pointer text-[13px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                                lineNumber: 55,
                                columnNumber: 21
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('pdp_share') || 'Paylaş'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                                lineNumber: 55,
                                columnNumber: 42
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
_s(ProductTitle, "xTA27ds7Z+fTM4rUKUamcPNer0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = ProductTitle;
var _c;
__turbopack_context__.k.register(_c, "ProductTitle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductPrice",
    ()=>ProductPrice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ProductPrice({ price, originalPrice }) {
    _s();
    const { formatPrice, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const discount = originalPrice ? Math.round((originalPrice - price) / originalPrice * 100) : 0;
    const monthly = Math.ceil(price / 36);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        initial: {
                            scale: 1.05,
                            color: '#C9A96E'
                        },
                        animate: {
                            scale: 1,
                            color: 'var(--foreground)'
                        },
                        transition: {
                            duration: 0.3
                        },
                        className: "text-3xl font-bold",
                        style: {
                            fontVariantNumeric: 'tabular-nums'
                        },
                        children: formatPrice(price)
                    }, price, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx",
                        lineNumber: 21,
                        columnNumber: 17
                    }, this),
                    originalPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg line-through text-muted-foreground",
                                children: formatPrice(originalPrice)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx",
                                lineNumber: 33,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] font-bold px-2 py-0.5 rounded-sm bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                                children: [
                                    "-%",
                                    discount
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx",
                                lineNumber: 34,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, this),
            price >= 5000 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[12px] mt-2 text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: t('pdp_installment_hint_1') || 'veya 36 aya kadar taksit —'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx",
                        lineNumber: 42,
                        columnNumber: 21
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: [
                            t('pdp_monthly_from') || 'Aylık',
                            " ",
                            formatPrice(monthly),
                            t('pdp_monthly_suffix') || "'den"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx",
                        lineNumber: 42,
                        columnNumber: 96
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx",
                lineNumber: 41,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] mt-1 text-muted-foreground/60 uppercase tracking-widest",
                children: t('pdp_vat_included') || 'KDV dahil fiyattır'
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx",
                lineNumber: 47,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx",
        lineNumber: 18,
        columnNumber: 9
    }, this);
}
_s(ProductPrice, "Cb0lkbmlbwjjVF2CbhNRbhvherQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = ProductPrice;
var _c;
__turbopack_context__.k.register(_c, "ProductPrice");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorSelector",
    ()=>ColorSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ColorSelector({ colors, selectedId, onSelect }) {
    _s();
    const [tooltip, setTooltip] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selected = colors.find((c)=>c.id === selectedId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "uppercase font-medium text-muted-foreground",
                        style: {
                            fontSize: '12px',
                            letterSpacing: '0.15em'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-lang-key": "pdp_color",
                                children: "Renk"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                                lineNumber: 18,
                                columnNumber: 133
                            }, this),
                            ":"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                        lineNumber: 18,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px] font-medium text-foreground",
                        children: selected?.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                        lineNumber: 19,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2.5 mt-3",
                role: "radiogroup",
                "aria-label": "Renk seçin",
                children: colors.map((c)=>{
                    const isActive = c.id === selectedId;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                role: "radio",
                                "aria-checked": isActive,
                                "aria-label": `${c.name} rengini seç${!c.inStock ? ' (stokta yok)' : ''}`,
                                disabled: !c.inStock,
                                onClick: ()=>c.inStock && c.id && onSelect(c.id),
                                onMouseEnter: ()=>c.id && setTooltip(c.id),
                                onMouseLeave: ()=>setTooltip(null),
                                className: "relative overflow-hidden flex items-center justify-center transition-transform duration-150",
                                style: {
                                    width: 40,
                                    height: 40,
                                    borderRadius: '4px',
                                    background: c.hex,
                                    cursor: c.inStock ? 'pointer' : 'not-allowed',
                                    border: isActive ? '1.5px solid #C9A96E' : '1.5px solid transparent',
                                    boxShadow: isActive ? '0 0 0 3px rgba(201,169,110,0.25), inset 0 0 0 1px rgba(0,0,0,0.1)' : 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                                    opacity: c.inStock ? 1 : 0.3,
                                    transform: isActive ? 'scale(1.08)' : 'scale(1)'
                                },
                                children: [
                                    isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        size: 16,
                                        color: "white",
                                        strokeWidth: 2.5,
                                        style: {
                                            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                                        lineNumber: 41,
                                        columnNumber: 46
                                    }, this),
                                    !c.inStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "absolute inset-0 w-full h-full",
                                        viewBox: "0 0 40 40",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "0",
                                            y1: "40",
                                            x2: "40",
                                            y2: "0",
                                            stroke: "#E53935",
                                            strokeWidth: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                                            lineNumber: 43,
                                            columnNumber: 105
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                                        lineNumber: 43,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                                lineNumber: 26,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: tooltip === c.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.8,
                                        y: 4
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        scale: 0.8
                                    },
                                    transition: {
                                        duration: 0.15
                                    },
                                    className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-sm whitespace-nowrap pointer-events-none",
                                    style: {
                                        fontSize: '10px',
                                        background: '#1C1C1E',
                                        color: 'white',
                                        zIndex: 20
                                    },
                                    children: c.inStock ? c.name : `${c.name} — Stokta yok`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                                    lineNumber: 48,
                                    columnNumber: 37
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                                lineNumber: 46,
                                columnNumber: 29
                            }, this)
                        ]
                    }, c.id, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                        lineNumber: 25,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_s(ColorSelector, "XaDrOWOd0VLN4F3dKO6gAHepmT8=");
_c = ColorSelector;
var _c;
__turbopack_context__.k.register(_c, "ColorSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/ProductVariants/SizeSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SizeSelector",
    ()=>SizeSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function SizeSelector({ sizes, selectedId, onSelect, onOpenGuide }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "uppercase font-medium text-muted-foreground",
                        style: {
                            fontSize: '12px',
                            letterSpacing: '0.15em'
                        },
                        "data-lang-key": "pdp_size",
                        children: "Boyut:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/SizeSelector.tsx",
                        lineNumber: 10,
                        columnNumber: 17
                    }, this),
                    onOpenGuide && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onOpenGuide,
                        className: "text-[12px] transition-colors duration-150",
                        style: {
                            color: '#C9A96E',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                        },
                        children: "📏 Boyut Rehberi"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/SizeSelector.tsx",
                        lineNumber: 12,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/SizeSelector.tsx",
                lineNumber: 9,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2 mt-3",
                children: sizes.map((s)=>{
                    const isActive = s.id === selectedId;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: !s.inStock,
                        onClick: ()=>s.inStock && onSelect(s.id),
                        className: `px-4 py-2 font-medium transition-all duration-200 border rounded-sm text-[12px] ${isActive ? 'bg-foreground text-background border-foreground' : 'bg-transparent text-foreground border-border'} ${s.inStock ? 'cursor-pointer' : 'cursor-not-allowed opacity-40 line-through'}`,
                        children: s.label
                    }, s.id, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/SizeSelector.tsx",
                        lineNumber: 21,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/SizeSelector.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/ProductVariants/SizeSelector.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
_c = SizeSelector;
var _c;
__turbopack_context__.k.register(_c, "SizeSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StockIndicator",
    ()=>StockIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function StockIndicator({ stock }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    if (stock > 10) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[12px] font-medium",
                    style: {
                        color: '#4CAF50'
                    },
                    children: [
                        "● ",
                        t('stock_in_stock') || 'Stokta var'
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
                    lineNumber: 12,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[11px] text-muted-foreground",
                    children: t('stock_shipped_immediately') || 'Hemen kargoya verilir'
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
                    lineNumber: 13,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
            lineNumber: 11,
            columnNumber: 13
        }, this);
    }
    if (stock > 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative text-[12px] font-medium",
                        style: {
                            color: '#FF9800'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute inset-0 animate-ping rounded-full",
                                style: {
                                    background: '#FF9800',
                                    opacity: 0.3
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
                                lineNumber: 23,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative",
                                children: [
                                    "⚠ ",
                                    t('stock_low_stock_msg', {
                                        count: stock
                                    }) || `Son ${stock} adet kaldı!`
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
                                lineNumber: 24,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
                        lineNumber: 22,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
                    lineNumber: 21,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-2 w-full rounded-full overflow-hidden h-[4px] bg-muted",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-full rounded-full",
                        style: {
                            width: `${stock / 10 * 100}%`,
                            background: 'linear-gradient(90deg, #E53935, #FF9800)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
                        lineNumber: 28,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
                    lineNumber: 27,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
            lineNumber: 20,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[12px] font-medium",
                style: {
                    color: '#E53935'
                },
                children: [
                    "✗ ",
                    t('stock_out_of_stock') || 'Stokta yok'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "mt-2 w-full py-2 text-[12px] font-medium transition-colors duration-200 border border-border rounded-sm bg-transparent text-foreground cursor-pointer",
                children: [
                    "🔔 ",
                    t('stock_notify_btn') || 'Stok Gelince Haber Ver'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx",
        lineNumber: 35,
        columnNumber: 9
    }, this);
}
_s(StockIndicator, "xTA27ds7Z+fTM4rUKUamcPNer0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = StockIndicator;
var _c;
__turbopack_context__.k.register(_c, "StockIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/QuantitySelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QuantitySelector",
    ()=>QuantitySelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
function QuantitySelector({ value, onChange, max = 99 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center mt-4",
        role: "group",
        "aria-label": "Adet seçici",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                disabled: value <= 1,
                onClick: ()=>onChange(value - 1),
                "aria-label": "Azalt",
                className: `flex items-center justify-center font-light text-lg transition-colors duration-150 border border-border rounded-l-sm bg-transparent ${value <= 1 ? 'cursor-not-allowed text-muted-foreground/30' : 'cursor-pointer text-foreground hover:bg-muted'}`,
                style: {
                    width: 40,
                    height: 40
                },
                children: "−"
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/QuantitySelector.tsx",
                lineNumber: 10,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 1.15
                },
                animate: {
                    scale: 1
                },
                transition: {
                    duration: 0.15
                },
                className: "flex items-center justify-center font-medium border-t border-b border-border text-[15px] text-foreground",
                style: {
                    width: 56,
                    height: 40
                },
                children: value
            }, value, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/QuantitySelector.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                disabled: value >= max,
                onClick: ()=>onChange(value + 1),
                "aria-label": "Arttır",
                className: `flex items-center justify-center font-light text-lg transition-colors duration-150 border border-border rounded-r-sm bg-transparent ${value >= max ? 'cursor-not-allowed text-muted-foreground/30' : 'cursor-pointer text-foreground hover:bg-muted'}`,
                style: {
                    width: 40,
                    height: 40
                },
                children: "+"
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/QuantitySelector.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/QuantitySelector.tsx",
        lineNumber: 9,
        columnNumber: 9
    }, this);
}
_c = QuantitySelector;
var _c;
__turbopack_context__.k.register(_c, "QuantitySelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionButtons",
    ()=>ActionButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2d$arrows$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompareArrows$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/git-compare-arrows.js [app-client] (ecmascript) <export default as GitCompareArrows>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const ActionButtons = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(({ productName, isWishlisted, isCompared, inStock, onAddToCart, onToggleWishlist, onToggleCompare }, ref)=>{
    _s();
    const [cartState, setCartState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const confettiParticles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ActionButtons.useMemo[confettiParticles]": ()=>Array.from({
                length: 12
            }).map({
                "ActionButtons.useMemo[confettiParticles]": ()=>({
                        x: (Math.random() - 0.5) * 200,
                        y: -(Math.random() * 150 + 50),
                        rotate: Math.random() * 360
                    })
            }["ActionButtons.useMemo[confettiParticles]"])
    }["ActionButtons.useMemo[confettiParticles]"], []);
    const handleCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ActionButtons.useCallback[handleCart]": ()=>{
            if (cartState !== 'idle' || !inStock) return;
            setCartState('loading');
            onAddToCart();
            setTimeout({
                "ActionButtons.useCallback[handleCart]": ()=>{
                    setCartState('success');
                    setTimeout({
                        "ActionButtons.useCallback[handleCart]": ()=>setCartState('idle')
                    }["ActionButtons.useCallback[handleCart]"], 1200);
                }
            }["ActionButtons.useCallback[handleCart]"], 1000);
        }
    }["ActionButtons.useCallback[handleCart]"], [
        cartState,
        inStock,
        onAddToCart
    ]);
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const cartBg = cartState === 'success' ? '#2E7D32' : inStock ? 'var(--foreground)' : 'var(--muted)';
    const cartTextKey = cartState === 'loading' ? 'pdp_adding' : cartState === 'success' ? 'cart_success_added' : inStock ? 'pdp_add_to_cart' : 'pdp_out_of_stock';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: ref,
                onClick: handleCart,
                disabled: cartState === 'loading' || !inStock,
                "aria-label": `${productName} sepete ekle`,
                className: `flex-1 h-14 flex items-center justify-center gap-3 transition-colors ${!inStock ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : cartState === 'success' ? 'bg-[#30D158] text-white' : 'bg-[#1C1C1E] text-[#F5F0EB] hover:bg-[#2C2C2E]'}`,
                children: [
                    cartState === 'loading' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-4 h-4 rounded-full border-2 border-[#F5F0EB]/30 border-t-[#F5F0EB] animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                        lineNumber: 56,
                        columnNumber: 49
                    }, ("TURBOPACK compile-time value", void 0)),
                    cartState === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        initial: {
                            scale: 0
                        },
                        animate: {
                            scale: 1
                        },
                        transition: {
                            type: 'spring',
                            stiffness: 500,
                            damping: 15
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                            lineNumber: 57,
                            columnNumber: 169
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                        lineNumber: 57,
                        columnNumber: 49
                    }, ("TURBOPACK compile-time value", void 0)),
                    cartState === 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                        lineNumber: 58,
                        columnNumber: 46
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "data-lang-key": cartTextKey,
                        children: t(cartTextKey)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                        lineNumber: 59,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                lineNumber: 44,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: cartState === 'success' && confettiParticles.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        className: "fixed pointer-events-none",
                        style: {
                            zIndex: 60,
                            left: '50%',
                            bottom: '30%'
                        },
                        initial: {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            scale: 1
                        },
                        animate: {
                            opacity: 0,
                            x: p.x,
                            y: p.y,
                            scale: 0,
                            rotate: p.rotate
                        },
                        exit: {
                            opacity: 0
                        },
                        transition: {
                            duration: 0.8,
                            ease: 'easeOut'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "block w-2 h-2 rounded-sm",
                            style: {
                                background: [
                                    '#C9A96E',
                                    '#4CAF50',
                                    '#F5F0EB',
                                    'var(--foreground)'
                                ][i % 4]
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                            lineNumber: 72,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0))
                    }, i, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                        lineNumber: 67,
                        columnNumber: 25
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                lineNumber: 65,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 mt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.preventDefault();
                            onToggleWishlist();
                        },
                        "aria-label": isWishlisted ? 'Favorilerden çıkar' : 'Favorilere ekle',
                        className: "flex-1 py-3.5 flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-sm",
                        style: {
                            fontSize: '12px',
                            border: `1.5px solid ${isWishlisted ? '#E53935' : 'var(--border)'}`,
                            background: 'transparent',
                            color: isWishlisted ? '#E53935' : 'var(--foreground)',
                            cursor: 'pointer'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                size: 16,
                                fill: isWishlisted ? '#E53935' : 'transparent',
                                stroke: isWishlisted ? '#E53935' : 'currentColor'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                                lineNumber: 83,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-lang-key": isWishlisted ? 'prod_wishlisted' : 'prod_add_wishlist',
                                children: isWishlisted ? t('prod_wishlisted') : t('prod_add_wishlist')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                                lineNumber: 84,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                        lineNumber: 79,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.preventDefault();
                            onToggleCompare();
                        },
                        className: "flex-1 py-3.5 flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-sm",
                        style: {
                            fontSize: '12px',
                            border: `1.5px solid ${isCompared ? '#C9A96E' : 'var(--border)'}`,
                            background: isCompared ? 'var(--accent)' : 'transparent',
                            color: isCompared ? '#C9A96E' : 'var(--foreground)',
                            cursor: 'pointer'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$compare$2d$arrows$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitCompareArrows$3e$__["GitCompareArrows"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                                lineNumber: 89,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-lang-key": isCompared ? 'prod_compared' : 'prod_add_compare',
                                children: isCompared ? t('prod_compared') : t('prod_add_compare')
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                                lineNumber: 90,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                        lineNumber: 86,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
                lineNumber: 78,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx",
        lineNumber: 43,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0));
}, "MlMBCd4eVacAIOKlwVFS1X1RHH8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
})), "MlMBCd4eVacAIOKlwVFS1X1RHH8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c1 = ActionButtons;
ActionButtons.displayName = 'ActionButtons';
var _c, _c1;
__turbopack_context__.k.register(_c, "ActionButtons$forwardRef");
__turbopack_context__.k.register(_c1, "ActionButtons");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeliveryInfo",
    ()=>DeliveryInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function DeliveryInfo({ deliveryDays = 14, hasQuickShip = false, price }) {
    _s();
    const { t, language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() + deliveryDays);
    const end = new Date(now);
    end.setDate(end.getDate() + deliveryDays + 2);
    // Map SELIS languages to actual BCP 47 locales
    const locales = {
        tr: 'tr-TR',
        en: 'en-US',
        fr: 'fr-FR',
        ar: 'ar-SA',
        de: 'de-DE'
    };
    const locale = locales[language] || 'tr-TR';
    const fmt = (d)=>d.toLocaleDateString(locale, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    const rows = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                size: 16
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx",
                lineNumber: 20,
                columnNumber: 17
            }, this),
            titleKey: price >= 5000 ? 'pdp_free_shipping' : 'pdp_shipping',
            title: price >= 5000 ? 'Ücretsiz Kargo' : 'Kargo',
            subKey: price >= 5000 ? 'pdp_free_shipping_sub' : 'pdp_shipping_sub',
            sub: price >= 5000 ? '₺5.000 ve üzeri siparişlerde' : 'Kargo ücreti ödeme adımında hesaplanır',
            color: 'var(--selis-primary)'
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                size: 16
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx",
                lineNumber: 21,
                columnNumber: 17
            }, this),
            titleKey: 'pdp_est_delivery',
            title: 'Tahmini Teslimat',
            sub: `${fmt(start)} — ${fmt(end)}`,
            color: 'var(--selis-primary)'
        },
        ...hasQuickShip ? [
            {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx",
                    lineNumber: 22,
                    columnNumber: 37
                }, this),
                titleKey: 'pdp_fast_delivery',
                title: 'Hızlı Teslimat',
                subKey: 'pdp_fast_delivery_sub',
                sub: '2 iş günü — +₺299',
                color: '#4CAF50'
            }
        ] : [],
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"], {
                size: 16
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx",
                lineNumber: 23,
                columnNumber: 17
            }, this),
            titleKey: 'pdp_free_install',
            title: 'Ücretsiz Kurulum',
            subKey: 'pdp_free_install_sub',
            sub: 'Profesyonel montaj hizmeti dahil',
            color: 'var(--selis-primary)'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 pt-6",
        style: {
            borderTop: '1px solid var(--border)'
        },
        children: rows.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-3 py-3",
                style: {
                    borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: r.color,
                            marginTop: 2
                        },
                        children: r.icon
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx",
                        lineNumber: 30,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] font-medium",
                                style: {
                                    color: r.color
                                },
                                children: t(r.titleKey) || r.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx",
                                lineNumber: 32,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] text-muted-foreground",
                                children: r.subKey ? t(r.subKey) || r.sub : r.sub
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx",
                                lineNumber: 33,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx",
                        lineNumber: 31,
                        columnNumber: 21
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx",
                lineNumber: 29,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, this);
}
_s(DeliveryInfo, "E7mOsZQmQ36+yvLdMrFtH0DD+QU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = DeliveryInfo;
var _c;
__turbopack_context__.k.register(_c, "DeliveryInfo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InstallmentInfo",
    ()=>InstallmentInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const BANKS = [
    'Ziraat',
    'Yapı Kredi',
    'Garanti'
];
const INSTALLMENTS = [
    1,
    3,
    6,
    12,
    24,
    36
];
const RATES = {
    Ziraat: {
        1: 0,
        3: 0.026,
        6: 0.053,
        12: 0.107,
        24: 0.20,
        36: 0.24
    },
    'Yapı Kredi': {
        1: 0,
        3: 0.03,
        6: 0.06,
        12: 0.12,
        24: 0.22,
        36: 0.28
    },
    Garanti: {
        1: 0,
        3: 0.028,
        6: 0.055,
        12: 0.11,
        24: 0.21,
        36: 0.26
    }
};
function InstallmentInfo({ price }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [bank, setBank] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Ziraat');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setIsOpen(!isOpen),
                className: "text-[12px] font-medium transition-colors duration-150",
                style: {
                    color: '#C9A96E',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: t('pdp_view_installments') || 'Taksit seçeneklerini gör'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                        lineNumber: 26,
                        columnNumber: 17
                    }, this),
                    " ",
                    isOpen ? '▴' : '▾'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                lineNumber: 24,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                    transition: {
                        duration: 0.3
                    },
                    className: "overflow-hidden mt-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-1 mb-3",
                            children: BANKS.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setBank(b),
                                    className: `px-3 py-1.5 text-[11px] font-medium transition-colors duration-150 rounded-sm border-none cursor-pointer ${bank === b ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'}`,
                                    children: b
                                }, b, false, {
                                    fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                    lineNumber: 36,
                                    columnNumber: 33
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                            lineNumber: 34,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-[12px] border-collapse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-left py-2 px-3 font-medium text-muted-foreground",
                                                children: t('pdp_installment') || 'Taksit'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                                lineNumber: 50,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-right py-2 px-3 font-medium text-muted-foreground",
                                                children: t('pdp_monthly') || 'Aylık'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                                lineNumber: 51,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "text-right py-2 px-3 font-medium text-muted-foreground",
                                                children: t('pdp_total') || 'Toplam'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                                lineNumber: 52,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                        lineNumber: 49,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                    lineNumber: 48,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: INSTALLMENTS.map((n, i)=>{
                                        const rate = RATES[bank][n] ?? 0;
                                        const total = Math.round(price * (1 + rate));
                                        const monthly = Math.round(total / n);
                                        const isBest = n === 1;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: `${isBest ? 'bg-primary/5' : i % 2 === 0 ? 'bg-muted/10' : 'bg-transparent'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2.5 px-3 text-foreground",
                                                    children: n === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t('pdp_single_payment') || 'Tek çekim'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                                        lineNumber: 64,
                                                        columnNumber: 60
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            n,
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: t('pdp_n_installment') || 'Taksit'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                                                lineNumber: 64,
                                                                columnNumber: 126
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                                        lineNumber: 64,
                                                        columnNumber: 116
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                                    lineNumber: 63,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2.5 px-3 text-right font-medium text-foreground",
                                                    children: [
                                                        "₺",
                                                        monthly.toLocaleString('tr-TR')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-2.5 px-3 text-right text-muted-foreground",
                                                    children: [
                                                        "₺",
                                                        total.toLocaleString('tr-TR')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, n, true, {
                                            fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                            lineNumber: 62,
                                            columnNumber: 41
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                                    lineNumber: 55,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                            lineNumber: 47,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                    lineNumber: 31,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
                lineNumber: 29,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx",
        lineNumber: 23,
        columnNumber: 9
    }, this);
}
_s(InstallmentInfo, "t9fzk/RYPQOQ9NhRbpLy73yLs00=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = InstallmentInfo;
var _c;
__turbopack_context__.k.register(_c, "InstallmentInfo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrustBadges",
    ()=>TrustBadges
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
'use client';
;
;
const BADGES = [
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
            lineNumber: 6,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0)),
        titleKey: 'pdp_badge_1_title',
        title: 'Güvenli Ödeme',
        subKey: 'pdp_badge_1_sub',
        sub: '256-bit SSL şifreleme'
    },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
            lineNumber: 7,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0)),
        titleKey: 'pdp_badge_2_title',
        title: '30 Gün İade',
        subKey: 'pdp_badge_2_sub',
        sub: 'Koşulsuz iade garantisi'
    },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
            lineNumber: 8,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0)),
        titleKey: 'pdp_badge_3_title',
        title: '5 Yıl Garanti',
        subKey: 'pdp_badge_3_sub',
        sub: 'Tüm mobilya ürünlerinde'
    },
    {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
            lineNumber: 9,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0)),
        titleKey: 'pdp_badge_4_title',
        title: '4.8/5 Müşteri Puanı',
        subKey: 'pdp_badge_4_sub',
        sub: '12.500+ değerlendirme'
    }
];
function TrustBadges() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 pt-6 border-t border-dashed border-border",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: BADGES.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                color: '#C9A96E'
                            },
                            children: b.icon
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
                            lineNumber: 18,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] font-medium text-foreground",
                                    "data-lang-key": b.titleKey,
                                    children: b.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
                                    lineNumber: 20,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-muted-foreground",
                                    "data-lang-key": b.subKey,
                                    children: b.sub
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
                                    lineNumber: 21,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
                            lineNumber: 19,
                            columnNumber: 25
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
                    lineNumber: 17,
                    columnNumber: 21
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
            lineNumber: 15,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx",
        lineNumber: 14,
        columnNumber: 9
    }, this);
}
_c = TrustBadges;
var _c;
__turbopack_context__.k.register(_c, "TrustBadges");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductCard/useWishlist.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFavorites",
    ()=>useFavorites,
    "useWishlist",
    ()=>useWishlist
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const STORAGE_KEY = 'selis_wishlist';
function getWishlist() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch  {
        return [];
    }
}
function saveWishlist(ids) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}
function useWishlist(productId) {
    _s();
    const [isWishlisted, setIsWishlisted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWishlist.useEffect": ()=>{
            setIsWishlisted(getWishlist().includes(productId));
        }
    }["useWishlist.useEffect"], [
        productId
    ]);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWishlist.useCallback[toggle]": ()=>{
            const list = getWishlist();
            let next;
            if (list.includes(productId)) {
                next = list.filter({
                    "useWishlist.useCallback[toggle]": (id)=>id !== productId
                }["useWishlist.useCallback[toggle]"]);
            } else {
                next = [
                    ...list,
                    productId
                ];
            }
            saveWishlist(next);
            setIsWishlisted(next.includes(productId));
        }
    }["useWishlist.useCallback[toggle]"], [
        productId
    ]);
    return {
        isWishlisted,
        toggle
    };
}
_s(useWishlist, "L+f5e7cTICzp3oHZfqVzVsSg64Q=");
function useFavorites() {
    _s1();
    const [favorites, setFavorites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useFavorites.useEffect": ()=>{
            setFavorites(getWishlist());
            // Listen for storage changes in other tabs
            const handleStorage = {
                "useFavorites.useEffect.handleStorage": ()=>setFavorites(getWishlist())
            }["useFavorites.useEffect.handleStorage"];
            window.addEventListener('storage', handleStorage);
            return ({
                "useFavorites.useEffect": ()=>window.removeEventListener('storage', handleStorage)
            })["useFavorites.useEffect"];
        }
    }["useFavorites.useEffect"], []);
    return {
        favorites
    };
}
_s1(useFavorites, "gYNGUuNbE7AW8shO5JZPpsJJ/gw=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductInfo/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductInfo",
    ()=>ProductInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ProductBreadcrumb$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/ProductBreadcrumb.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ProductTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/ProductTitle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ProductPrice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/ProductPrice.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ProductVariants$2f$ColorSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/ProductVariants/ColorSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ProductVariants$2f$SizeSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/ProductVariants/SizeSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$StockIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/StockIndicator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$QuantitySelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/QuantitySelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ActionButtons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/ActionButtons.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$DeliveryInfo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/DeliveryInfo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$InstallmentInfo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/InstallmentInfo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$TrustBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/TrustBadges.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$useWishlist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductCard/useWishlist.ts [app-client] (ecmascript)");
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
;
;
;
;
;
;
const SIZES_SAMPLE = [
    {
        id: 's1',
        label: '240×160 cm',
        inStock: true
    },
    {
        id: 's2',
        label: '280×190 cm',
        inStock: true
    },
    {
        id: 's3',
        label: '320×220 cm',
        inStock: false
    }
];
function ProductInfo({ product, selectedColorId, onColorChange, buttonRef }) {
    _s();
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedSize, setSelectedSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('s1');
    const [isCompared, setIsCompared] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { isWishlisted, toggle: toggleWishlist } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$useWishlist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlist"])(product.id);
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const stock = 5; // placeholder for actual stock
    const selectedColor = product.colors.find((c)=>c.id === selectedColorId);
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    // Map category slugs to translation keys
    const categoryKeyMap = {
        'oturma-odasi': 'cat_living_room',
        'yatak-odasi': 'cat_bedroom',
        'yemek-odasi': 'cat_dining',
        'calisma-odasi': 'cat_office',
        'aydinlatma': 'cat_lighting',
        'dekorasyon': 'cat_decoration',
        'genc-cocuk-odasi': 'cat_youth'
    };
    const categoryKey = product.categorySlug ? categoryKeyMap[product.categorySlug] : undefined;
    const categoryLabel = categoryKey ? t(categoryKey) : product.category || 'Oturma Odası';
    const breadcrumbs = [
        {
            label: t('common_home'),
            href: '/'
        },
        {
            label: categoryLabel,
            href: `/kategori/${product.categorySlug || 'oturma-odasi'}`
        },
        {
            label: product.name
        }
    ];
    const handleAddToCart = ()=>{
        addItem({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice ?? product.price,
            image: selectedColor?.image ?? product.colors[0]?.image ?? '',
            href: `/urun/${product.slug}`
        }, {
            quantity,
            selectedColor: selectedColor?.name ?? product.colors[0]?.name
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ProductBreadcrumb$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductBreadcrumb"], {
                items: breadcrumbs
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ProductTitle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductTitle"], {
                brand: product.brand,
                name: product.name,
                sku: `SLS-${product.slug.toUpperCase().slice(0, 8)}`,
                rating: product.rating,
                slug: product.slug
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ProductPrice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductPrice"], {
                price: product.price,
                originalPrice: product.originalPrice
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, this),
            product.colors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ProductVariants$2f$ColorSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorSelector"], {
                colors: product.colors,
                selectedId: selectedColorId,
                onSelect: onColorChange
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 83,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ProductVariants$2f$SizeSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SizeSelector"], {
                sizes: SIZES_SAMPLE,
                selectedId: selectedSize,
                onSelect: setSelectedSize
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 86,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$StockIndicator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StockIndicator"], {
                stock: stock
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 87,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$QuantitySelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuantitySelector"], {
                value: quantity,
                onChange: setQuantity,
                max: stock > 0 ? stock : 0
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$ActionButtons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionButtons"], {
                ref: buttonRef,
                productName: product.name,
                isWishlisted: isWishlisted,
                isCompared: isCompared,
                inStock: stock > 0,
                onAddToCart: handleAddToCart,
                onToggleWishlist: toggleWishlist,
                onToggleCompare: ()=>setIsCompared((p)=>!p)
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 90,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$DeliveryInfo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeliveryInfo"], {
                deliveryDays: product.deliveryDays,
                hasQuickShip: product.hasQuickShip,
                price: product.price
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 101,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$InstallmentInfo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstallmentInfo"], {
                price: product.price
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 102,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$TrustBadges$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TrustBadges"], {}, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
                lineNumber: 103,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductInfo/index.tsx",
        lineNumber: 77,
        columnNumber: 9
    }, this);
}
_s(ProductInfo, "GY5EcS/6M/FcYa70GYfVCw/6mAU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2f$useWishlist$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWishlist"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = ProductInfo;
var _c;
__turbopack_context__.k.register(_c, "ProductInfo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductTabs/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductTabs",
    ()=>ProductTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ProductTabs({ tabs }) {
    _s();
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(tabs[0]?.id ?? '');
    const active = tabs.find((t)=>t.id === activeId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "reviews",
        className: "mt-16 pt-12 border-t border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex overflow-x-auto border-b border-border",
                style: {
                    scrollbarWidth: 'none'
                },
                role: "tablist",
                children: tabs.map((tab)=>{
                    const isActive = tab.id === activeId;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        role: "tab",
                        "aria-selected": isActive,
                        onClick: ()=>setActiveId(tab.id),
                        className: "px-6 py-4 font-medium whitespace-nowrap transition-colors duration-200 bg-transparent cursor-pointer border-none border-b-2",
                        style: {
                            fontSize: '13px',
                            color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                            borderBottomColor: isActive ? 'var(--selis-gold)' : 'transparent'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-lang-key": tab.labelKey,
                                children: tab.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/index.tsx",
                                lineNumber: 27,
                                columnNumber: 29
                            }, this),
                            tab.count !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-1",
                                style: {
                                    color: '#C9A96E'
                                },
                                children: [
                                    "(",
                                    tab.count,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/index.tsx",
                                lineNumber: 27,
                                columnNumber: 110
                            }, this)
                        ]
                    }, tab.id, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/index.tsx",
                        lineNumber: 20,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/index.tsx",
                lineNumber: 16,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 8
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -8
                    },
                    transition: {
                        duration: 0.2
                    },
                    className: "pt-8",
                    children: active?.content
                }, activeId, false, {
                    fileName: "[project]/src/components/ProductDetail/ProductTabs/index.tsx",
                    lineNumber: 35,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/index.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductTabs/index.tsx",
        lineNumber: 14,
        columnNumber: 9
    }, this);
}
_s(ProductTabs, "OWSswY2F2P0cUMb6WoxZNJlxoQQ=");
_c = ProductTabs;
var _c;
__turbopack_context__.k.register(_c, "ProductTabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DescriptionTab",
    ()=>DescriptionTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const FEATURES = [
    {
        key: 'pdp_feature_1',
        text: 'El yapımı ahşap iskelet'
    },
    {
        key: 'pdp_feature_2',
        text: 'Yüksek yoğunluklu sünger dolgu'
    },
    {
        key: 'pdp_feature_3',
        text: 'Çıkarılabilir ve yıkanabilir kılıf'
    },
    {
        key: 'pdp_feature_4',
        text: 'OEKO-TEX® sertifikalı kumaş'
    },
    {
        key: 'pdp_feature_5',
        text: 'Solmaya dayanıklı boyama'
    },
    {
        key: 'pdp_feature_6',
        text: 'Anti-alerjik iç dolgu'
    }
];
function DescriptionTab({ description }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const text = description || 'Luna Köşe Koltuk, yaşam alanınıza premium bir dokunuş katmak için el yapımı masif meşe iskelet üzerine inşa edilmiştir. Yüksek yoğunluklu sünger dolgusu, uzun yıllar boyunca konforunu korurken, OEKO-TEX® sertifikalı kadife kumaşı zarif ve güvenli bir kullanım sunar. Modüler tasarımı sayesinde odanızın boyutuna göre özelleştirilebilir.\n\nKoltuğun çıkarılabilir ve yıkanabilir kılıfları, bakımı son derece pratik hale getirir. Türkiye\'de yerel ustalar tarafından el işçiliğiyle üretilen bu parça, zamansız estetiği ve dayanıklılığıyla dikkat çeker.';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid md:grid-cols-5 gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        style: {
                            maxHeight: expanded ? 'none' : '200px',
                            overflow: 'hidden'
                        },
                        children: [
                            text.split('\n\n').map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[14px] leading-relaxed mb-4 text-muted-foreground",
                                    children: p
                                }, i, false, {
                                    fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                                    lineNumber: 30,
                                    columnNumber: 25
                                }, this)),
                            !expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-background to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                                lineNumber: 33,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                        lineNumber: 28,
                        columnNumber: 17
                    }, this),
                    !expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setExpanded(true),
                        className: "mt-2 text-[13px] font-medium",
                        style: {
                            color: '#C9A96E',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: t('pdp_show_more') || 'Daha Fazla Göster ▾'
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                            lineNumber: 38,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                        lineNumber: 37,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:col-span-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg mb-4 text-foreground font-normal",
                        style: {
                            fontFamily: 'var(--font-playfair, serif)'
                        },
                        children: t('pdp_highlighted_features') || 'Öne Çıkan Özellikler'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                        lineNumber: 45,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-3",
                        children: FEATURES.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        size: 16,
                                        className: "text-selis-gold mt-[2px] shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                                        lineNumber: 49,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13px] text-muted-foreground",
                                        children: t(f.key) || f.text
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                                        lineNumber: 50,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                                lineNumber: 48,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                        lineNumber: 46,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
                lineNumber: 44,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx",
        lineNumber: 25,
        columnNumber: 9
    }, this);
}
_s(DescriptionTab, "lxrRZPJ5JWGon+jrbIc6bgpRuQ4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = DescriptionTab;
var _c;
__turbopack_context__.k.register(_c, "DescriptionTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductTabs/SpecsTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SpecsTab",
    ()=>SpecsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const SPECS = [
    [
        'pdp_spec_dimensions',
        '280 × 180 × 85 cm (En×Boy×H)'
    ],
    [
        'pdp_spec_seat_height',
        '42 cm'
    ],
    [
        'pdp_spec_weight',
        '68 kg'
    ],
    [
        'pdp_spec_material',
        'Masif Meşe + Kadife Kumaş'
    ],
    [
        'pdp_spec_color',
        'Açık Gri'
    ],
    [
        'pdp_spec_warranty',
        '5 Yıl'
    ],
    [
        'pdp_spec_origin',
        'Türkiye'
    ],
    [
        'pdp_spec_certs',
        'OEKO-TEX®, ISO 9001'
    ]
];
function SpecsTab() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full text-[13px]",
            style: {
                borderCollapse: 'collapse'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                children: SPECS.map(([labelKey, value], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: i % 2 === 0 ? 'bg-muted/30' : 'bg-transparent',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-3 px-4 font-medium text-muted-foreground w-[40%]",
                                style: {
                                    fontSize: '13px'
                                },
                                children: t(labelKey)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/SpecsTab.tsx",
                                lineNumber: 24,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "py-3 px-4 text-foreground",
                                style: {
                                    fontSize: '13px'
                                },
                                children: value
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/SpecsTab.tsx",
                                lineNumber: 25,
                                columnNumber: 29
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/SpecsTab.tsx",
                        lineNumber: 23,
                        columnNumber: 25
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/SpecsTab.tsx",
                lineNumber: 21,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ProductDetail/ProductTabs/SpecsTab.tsx",
            lineNumber: 20,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ProductDetail/ProductTabs/SpecsTab.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
_s(SpecsTab, "xTA27ds7Z+fTM4rUKUamcPNer0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = SpecsTab;
var _c;
__turbopack_context__.k.register(_c, "SpecsTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeliveryTab",
    ()=>DeliveryTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function DeliveryTab() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const STEPS = [
        {
            label: t('pdp_delivery_step_1') || 'Sipariş Verildi',
            icon: '📦',
            done: true
        },
        {
            label: t('pdp_delivery_step_2') || 'Hazırlanıyor',
            icon: '🔧',
            done: false
        },
        {
            label: t('pdp_delivery_step_3') || 'Kargoda',
            icon: '🚚',
            done: false
        },
        {
            label: t('pdp_delivery_step_4') || 'Teslim Edildi',
            icon: '✅',
            done: false
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg mb-6 text-foreground font-normal",
                style: {
                    fontFamily: 'var(--font-playfair, serif)'
                },
                children: t('pdp_delivery_title') || 'Teslimat Süreci'
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-10",
                children: STEPS.map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center text-center flex-1 relative",
                        children: [
                            i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-4 right-1/2 w-full h-px translate-x-1/2",
                                style: {
                                    background: step.done ? '#C9A96E' : 'var(--border)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 23,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm",
                                style: {
                                    background: step.done ? '#C9A96E' : 'var(--muted)',
                                    color: step.done ? 'white' : 'var(--muted-foreground)'
                                },
                                children: step.icon
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 25,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] mt-2 font-medium",
                                style: {
                                    color: step.done ? 'var(--foreground)' : 'var(--muted-foreground)'
                                },
                                children: step.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 29,
                                columnNumber: 25
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                        lineNumber: 21,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-[14px] font-medium mb-2 text-foreground",
                                children: t('pdp_delivery_times_title') || 'Büyükşehir Teslimat Süreleri'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 37,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] text-muted-foreground",
                                children: t('pdp_delivery_times_desc') || 'İstanbul, Ankara, İzmir: 3-5 iş günü · Diğer büyükşehirler: 5-7 iş günü · Diğer iller: 7-10 iş günü'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 38,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                        lineNumber: 36,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-[14px] font-medium mb-2 text-foreground",
                                children: t('pdp_delivery_pkg_title') || 'Paketleme & Sigorta'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 41,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] text-muted-foreground",
                                children: t('pdp_delivery_pkg_desc') || 'Tüm ürünler hasar sigortası ile gönderilir. Özel koruyucu ambalaj ile paketlenir.'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 42,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                        lineNumber: 40,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-[14px] font-medium mb-2 text-foreground",
                                children: t('pdp_delivery_install_title') || 'Montaj Hizmeti'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 45,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] text-muted-foreground",
                                children: t('pdp_delivery_install_desc') || 'Profesyonel montaj ekibimiz ürününüzü yerine monte eder. Bu hizmet ücretsizdir.'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 46,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                        lineNumber: 44,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-[14px] font-medium mb-2 text-foreground",
                                children: t('pdp_delivery_return_title') || 'İade Süreci'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 49,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[13px] text-muted-foreground",
                                children: t('pdp_delivery_return_desc') || '30 gün içinde koşulsuz iade hakkınız bulunmaktadır. İade kargo ücreti tarafımıza aittir.'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                                lineNumber: 50,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                        lineNumber: 48,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_s(DeliveryTab, "xTA27ds7Z+fTM4rUKUamcPNer0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = DeliveryTab;
var _c;
__turbopack_context__.k.register(_c, "DeliveryTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReviewSummary",
    ()=>ReviewSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
'use client';
;
;
function ReviewSummary({ average, count, distribution, onFilter }) {
    const full = Math.floor(average);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col sm:flex-row gap-8 mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center sm:text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-6xl font-bold text-foreground",
                        children: average
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                        lineNumber: 14,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center sm:justify-start gap-0.5 mt-1",
                        children: Array.from({
                            length: 5
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                size: 16,
                                fill: i < full ? '#C9A96E' : 'transparent',
                                stroke: i < full ? '#C9A96E' : 'var(--border)',
                                strokeWidth: 1.5
                            }, i, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                                lineNumber: 17,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                        lineNumber: 15,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mt-1 text-muted-foreground",
                        children: [
                            count,
                            " değerlendirme"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                        lineNumber: 20,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                lineNumber: 13,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 space-y-1.5",
                children: [
                    5,
                    4,
                    3,
                    2,
                    1
                ].map((stars)=>{
                    const val = distribution[stars - 1] ?? 0;
                    const pct = count > 0 ? val / count * 100 : 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onFilter?.(stars),
                        className: "flex items-center gap-2 w-full group bg-transparent border-none cursor-pointer py-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px] w-6 text-right text-muted-foreground",
                                children: [
                                    stars,
                                    " ★"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                                lineNumber: 31,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 h-2 rounded-full overflow-hidden bg-muted",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full transition-all duration-300 group-hover:opacity-80",
                                    style: {
                                        width: `${pct}%`,
                                        background: '#C9A96E'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                                    lineNumber: 33,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                                lineNumber: 32,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] w-8 text-right text-muted-foreground",
                                children: val
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                                lineNumber: 35,
                                columnNumber: 29
                            }, this)
                        ]
                    }, stars, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                        lineNumber: 29,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
                lineNumber: 24,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx",
        lineNumber: 11,
        columnNumber: 9
    }, this);
}
_c = ReviewSummary;
var _c;
__turbopack_context__.k.register(_c, "ReviewSummary");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReviewCard",
    ()=>ReviewCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-client] (ecmascript) <export default as ThumbsUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-down.js [app-client] (ecmascript) <export default as ThumbsDown>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function ReviewCard({ review }) {
    _s();
    const [helpfulCount, setHelpful] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(review.helpful);
    const [unhelpfulCount, setUnhelpful] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(review.unhelpful);
    const [voted, setVoted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-6 border-b border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-selis-gold text-white",
                                children: review.initials
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                                lineNumber: 32,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[13px] font-medium text-foreground",
                                        children: review.author
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                                        lineNumber: 36,
                                        columnNumber: 25
                                    }, this),
                                    review.verified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 text-[11px] text-green-600 dark:text-green-400",
                                        children: "✓ Doğrulanmış Satın Alma"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                                        lineNumber: 38,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                                lineNumber: 35,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] text-muted-foreground",
                        children: review.date
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                        lineNumber: 42,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-0.5 mt-2",
                children: Array.from({
                    length: 5
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                        size: 12,
                        fill: i < review.rating ? 'var(--selis-gold)' : 'transparent',
                        stroke: i < review.rating ? 'var(--selis-gold)' : 'var(--border)',
                        strokeWidth: 1.5
                    }, i, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                        lineNumber: 48,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                lineNumber: 46,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "text-[14px] font-medium mt-2 text-foreground",
                children: review.title
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[13px] leading-relaxed mt-2 text-muted-foreground",
                children: review.text
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                lineNumber: 54,
                columnNumber: 13
            }, this),
            review.variant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] mt-2 text-muted-foreground",
                children: [
                    "Satın alınan: ",
                    review.variant
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                lineNumber: 58,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 mt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px] text-muted-foreground",
                        children: "Yararlı mıydı?"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            if (voted !== 'up') {
                                setVoted('up');
                                setHelpful((h)=>h + 1);
                            }
                        },
                        className: `flex items-center gap-1 text-[12px] transition-colors duration-150 bg-transparent border-none cursor-pointer
                        ${voted === 'up' ? 'text-selis-gold' : 'text-muted-foreground hover:text-foreground'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__["ThumbsUp"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                                lineNumber: 68,
                                columnNumber: 21
                            }, this),
                            " Evet (",
                            helpfulCount,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            if (voted !== 'down') {
                                setVoted('down');
                                setUnhelpful((h)=>h + 1);
                            }
                        },
                        className: `flex items-center gap-1 text-[12px] transition-colors duration-150 bg-transparent border-none cursor-pointer
                        ${voted === 'down' ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsDown$3e$__["ThumbsDown"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                                lineNumber: 74,
                                columnNumber: 21
                            }, this),
                            " Hayır (",
                            unhelpfulCount,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
                lineNumber: 62,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
}
_s(ReviewCard, "t7xzFUghWJr0s1N05Xop2rJD9P8=");
_c = ReviewCard;
var _c;
__turbopack_context__.k.register(_c, "ReviewCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/ProductTabs/ReviewsTab.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReviewsTab",
    ()=>ReviewsTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$ReviewSummary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductTabs/ReviewSummary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$ReviewCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductTabs/ReviewCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const MOCK_REVIEWS = [
    {
        id: 'r1',
        author: 'Ayşe Y.',
        initials: 'AY',
        verified: true,
        date: '15 Şubat 2026',
        rating: 5,
        title: 'Harika kalite, çok memnunum!',
        text: 'Koltuk tam beklediğim gibi geldi. Kumaş kalitesi mükemmel, oturma konforu harika. Montaj ekibi de çok profesyoneldi. Kesinlikle tavsiye ederim.',
        variant: 'Açık Gri | 280×190 cm',
        helpful: 23,
        unhelpful: 2
    },
    {
        id: 'r2',
        author: 'Mehmet K.',
        initials: 'MK',
        verified: true,
        date: '10 Şubat 2026',
        rating: 5,
        title: 'Premium kalite, her kuruşuna değer',
        text: 'İkinci defa SELIS\'dan mobilya alıyorum. Luna koltuğun konforu gerçekten üst düzey. Ailem de çok beğendi.',
        variant: 'Vizon | 240×160 cm',
        helpful: 18,
        unhelpful: 1
    },
    {
        id: 'r3',
        author: 'Elif D.',
        initials: 'ED',
        verified: true,
        date: '3 Şubat 2026',
        rating: 4,
        title: 'Güzel ürün, teslimat biraz geç',
        text: 'Koltuk çok kaliteli ve konforlu. Tek sıkıntı teslimatın 2 gün geç gelmesiydi ama ürünle ilgili hiçbir şikayetim yok.',
        variant: 'Krem | 280×190 cm',
        helpful: 11,
        unhelpful: 3
    },
    {
        id: 'r4',
        author: 'Can B.',
        initials: 'CB',
        verified: false,
        date: '28 Ocak 2026',
        rating: 5,
        title: 'Şık ve rahat',
        text: 'Oturma odamıza çok yakıştı. Misafirlerimiz hep soruyor nerede aldığımızı.',
        helpful: 8,
        unhelpful: 0
    }
];
function ReviewsTab() {
    _s();
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const filtered = filter ? MOCK_REVIEWS.filter((r)=>r.rating === filter) : MOCK_REVIEWS;
    const distribution = [
        0,
        1,
        3,
        10,
        73
    ].reverse(); // [73, 10, 3, 1, 0] → 5★,4★,3★,2★,1★ indexes
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$ReviewSummary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReviewSummary"], {
                average: 4.8,
                count: 127,
                distribution: [
                    0,
                    1,
                    3,
                    10,
                    73
                ],
                onFilter: (s)=>setFilter(s === filter ? null : s)
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewsTab.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-6 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px] text-muted-foreground",
                        children: "Filtrele:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewsTab.tsx",
                        lineNumber: 26,
                        columnNumber: 17
                    }, this),
                    [
                        null,
                        5,
                        4
                    ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setFilter(v === filter ? null : v),
                            className: `px-4 py-1.5 rounded-full text-[11px] font-medium transition-colors duration-150 border-none cursor-pointer
                            ${filter === v ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`,
                            children: v === null ? 'Tümü' : `${v}★`
                        }, String(v), false, {
                            fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewsTab.tsx",
                            lineNumber: 28,
                            columnNumber: 21
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewsTab.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: filtered.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$ReviewCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReviewCard"], {
                        review: r
                    }, r.id, false, {
                        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewsTab.tsx",
                        lineNumber: 40,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewsTab.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/ProductTabs/ReviewsTab.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
_s(ReviewsTab, "uTzraowczxwo2zUItQ/4Rhe6iJA=");
_c = ReviewsTab;
var _c;
__turbopack_context__.k.register(_c, "ReviewsTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/CompleteTheLook.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompleteTheLook",
    ()=>CompleteTheLook
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function CompleteTheLook({ products }) {
    _s();
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const { t, formatPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    if (!products || products.length === 0) return null;
    const total = products.reduce((s, i)=>s + i.price, 0);
    const handleAddAll = ()=>{
        products.forEach((item)=>{
            addItem({
                id: item.id,
                name: item.name,
                brand: item.brand || 'SELIS',
                price: item.price,
                originalPrice: item.originalPrice ?? item.price,
                image: item.colors?.[0]?.image || item.images?.[0] || '/images/products/luna-sofa.jpg',
                href: `/urun/${item.slug}`
            });
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-16 pt-12",
        style: {
            borderTop: '1px solid #F0EDE8'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                "data-lang-key": "pdp_combine_with",
                className: "text-2xl mb-1",
                style: {
                    fontFamily: 'var(--font-playfair, serif)',
                    fontWeight: 400,
                    color: '#1C1C1E'
                },
                children: t('pdp_combine_with')
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                lineNumber: 37,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                "data-lang-key": "pdp_combine_desc",
                className: "text-[13px] mb-8",
                style: {
                    color: '#999'
                },
                children: t('pdp_combine_desc')
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 overflow-x-auto pb-4",
                style: {
                    scrollbarWidth: 'none'
                },
                children: products.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/urun/${item.slug}`,
                        className: "shrink-0 group block transition-shadow duration-200",
                        style: {
                            width: 180,
                            textDecoration: 'none',
                            borderRadius: '2px',
                            border: '1px solid rgba(0,0,0,0.06)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative overflow-hidden",
                                style: {
                                    aspectRatio: '1',
                                    background: '#F5F0EB'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: item.colors?.[0]?.image || item.images?.[0] || '/images/products/luna-sofa.jpg',
                                    alt: item.name,
                                    fill: true,
                                    className: "object-cover group-hover:scale-105 transition-transform duration-300",
                                    sizes: "180px"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                                    lineNumber: 46,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                                lineNumber: 45,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] font-medium truncate",
                                        style: {
                                            color: '#1C1C1E'
                                        },
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                                        lineNumber: 49,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] font-bold mt-1",
                                        style: {
                                            color: '#1C1C1E'
                                        },
                                        children: formatPrice(item.price)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                                        lineNumber: 50,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                                lineNumber: 48,
                                columnNumber: 25
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                        lineNumber: 42,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                lineNumber: 40,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleAddAll,
                className: "mt-4 w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2 font-semibold tracking-wider uppercase transition-colors duration-200 rounded-sm",
                style: {
                    fontSize: '12px',
                    background: '#C9A96E',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "data-lang-key": "bundle_add_all_cart",
                        children: t('bundle_add_all_cart')
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    " — ",
                    formatPrice(total)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/CompleteTheLook.tsx",
        lineNumber: 36,
        columnNumber: 9
    }, this);
}
_s(CompleteTheLook, "KMacPEstwBMcAroWtEywEtEd1hA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = CompleteTheLook;
var _c;
__turbopack_context__.k.register(_c, "CompleteTheLook");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/RelatedProducts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RelatedProducts",
    ()=>RelatedProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function RelatedProducts({ products }) {
    _s();
    const { t, formatPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    if (!products || products.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-16 pt-12 border-t border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                "data-lang-key": "pdp_similar_products",
                className: "text-2xl mb-6 text-foreground font-normal",
                style: {
                    fontFamily: 'var(--font-playfair, serif)'
                },
                children: t('pdp_similar_products')
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/RelatedProducts.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                children: products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/urun/${p.slug}`,
                        className: "group block overflow-hidden transition-shadow duration-200 border border-border rounded-sm",
                        style: {
                            textDecoration: 'none'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative overflow-hidden bg-muted aspect-[3/4]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: p.colors?.[0]?.image || p.images?.[0] || '/images/products/luna-sofa.jpg',
                                    alt: p.name,
                                    fill: true,
                                    className: "object-cover group-hover:scale-105 transition-transform duration-300",
                                    sizes: "(max-width:768px) 50vw, 25vw"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/RelatedProducts.tsx",
                                    lineNumber: 25,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/RelatedProducts.tsx",
                                lineNumber: 24,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-wider mb-1",
                                        style: {
                                            color: '#C9A96E'
                                        },
                                        children: p.brand
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/RelatedProducts.tsx",
                                        lineNumber: 28,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] font-medium truncate text-foreground",
                                        children: p.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/RelatedProducts.tsx",
                                        lineNumber: 29,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[14px] font-bold mt-1 text-foreground",
                                        children: formatPrice(p.price)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/RelatedProducts.tsx",
                                        lineNumber: 30,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDetail/RelatedProducts.tsx",
                                lineNumber: 27,
                                columnNumber: 25
                            }, this)
                        ]
                    }, p.slug, true, {
                        fileName: "[project]/src/components/ProductDetail/RelatedProducts.tsx",
                        lineNumber: 21,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/RelatedProducts.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/RelatedProducts.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, this);
}
_s(RelatedProducts, "k0/Gy5p8qqVnMOIEV6hkiE1z6IA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = RelatedProducts;
var _c;
__turbopack_context__.k.register(_c, "RelatedProducts");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/hooks/useRecentlyViewed.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useRecentlyViewed",
    ()=>useRecentlyViewed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const KEY = 'selis_recently_viewed';
const MAX = 8;
function load() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch  {
        return [];
    }
}
function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
}
function useRecentlyViewed(current) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useRecentlyViewed.useEffect": ()=>{
            const stored = load();
            if (current) {
                const filtered = stored.filter({
                    "useRecentlyViewed.useEffect.filtered": (i)=>i.id !== current.id
                }["useRecentlyViewed.useEffect.filtered"]);
                const next = [
                    current,
                    ...filtered
                ].slice(0, MAX);
                save(next);
                setItems(next.filter({
                    "useRecentlyViewed.useEffect": (i)=>i.id !== current.id
                }["useRecentlyViewed.useEffect"]));
            } else {
                setItems(stored);
            }
        }
    }["useRecentlyViewed.useEffect"], [
        current?.id
    ]);
    return items;
}
_s(useRecentlyViewed, "E85yb7BhBnl3/OpymRdjFiQJ97s=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/RecentlyViewed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecentlyViewed",
    ()=>RecentlyViewed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$hooks$2f$useRecentlyViewed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/hooks/useRecentlyViewed.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function RecentlyViewed({ currentProduct }) {
    _s();
    const { t, formatPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$hooks$2f$useRecentlyViewed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRecentlyViewed"])(currentProduct);
    if (items.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-16 pt-12 border-t border-border",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                "data-lang-key": "pdp_recently_viewed",
                className: "text-2xl mb-6 text-foreground font-normal",
                style: {
                    fontFamily: 'var(--font-playfair, serif)'
                },
                children: t('pdp_recently_viewed')
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/RecentlyViewed.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 overflow-x-auto pb-4",
                style: {
                    scrollSnapType: 'x mandatory',
                    scrollbarWidth: 'none'
                },
                children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/urun/${item.slug}`,
                        className: "shrink-0 group block transition-shadow duration-200 border border-border rounded-sm overflow-hidden",
                        style: {
                            width: 160,
                            textDecoration: 'none',
                            scrollSnapAlign: 'start'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative overflow-hidden bg-muted aspect-[3/4]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: item.image,
                                    alt: item.name,
                                    fill: true,
                                    className: "object-cover group-hover:scale-105 transition-transform duration-300",
                                    sizes: "160px"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/RecentlyViewed.tsx",
                                    lineNumber: 24,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/RecentlyViewed.tsx",
                                lineNumber: 23,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] uppercase tracking-wider mb-1",
                                        style: {
                                            color: '#C9A96E'
                                        },
                                        children: item.brand
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/RecentlyViewed.tsx",
                                        lineNumber: 27,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] font-medium truncate text-foreground",
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/RecentlyViewed.tsx",
                                        lineNumber: 28,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[13px] font-bold mt-1 text-foreground",
                                        children: formatPrice(item.price)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductDetail/RecentlyViewed.tsx",
                                        lineNumber: 29,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductDetail/RecentlyViewed.tsx",
                                lineNumber: 26,
                                columnNumber: 25
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/components/ProductDetail/RecentlyViewed.tsx",
                        lineNumber: 20,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/RecentlyViewed.tsx",
                lineNumber: 18,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductDetail/RecentlyViewed.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_s(RecentlyViewed, "n6bArWqFCg6Bb2Ba8BFfaSWipxk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$hooks$2f$useRecentlyViewed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRecentlyViewed"]
    ];
});
_c = RecentlyViewed;
var _c;
__turbopack_context__.k.register(_c, "RecentlyViewed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProductDetail/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductDetail",
    ()=>ProductDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$ProductImageGallery$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Mobile/ProductImageGallery.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$StickyAddToCart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Mobile/StickyAddToCart.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductInfo/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductTabs/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$DescriptionTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductTabs/DescriptionTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$SpecsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductTabs/SpecsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$DeliveryTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductTabs/DeliveryTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$ReviewsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/ProductTabs/ReviewsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$CompleteTheLook$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/CompleteTheLook.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$RelatedProducts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/RelatedProducts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$RecentlyViewed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductDetail/RecentlyViewed.tsx [app-client] (ecmascript)");
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
;
;
;
;
function ProductDetail({ product, relatedProducts = [] }) {
    _s();
    const [selectedColorId, setSelectedColorId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(product.colors[0]?.id ?? '');
    const selectedColor = product.colors.find((c)=>c.id === selectedColorId);
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Build plain string array of images for the new gallery
    const images = product.colors.map((c)=>c.image).filter((img)=>!!img);
    if (product.colors[0]?.lifestyleImage) {
        images.push(product.colors[0].lifestyleImage);
    }
    const tabs = [
        {
            id: 'desc',
            labelKey: 'pdp_tab_desc',
            label: 'Açıklama',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$DescriptionTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DescriptionTab"], {
                description: product.description
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/index.tsx",
                lineNumber: 36,
                columnNumber: 77
            }, this)
        },
        {
            id: 'specs',
            labelKey: 'pdp_tab_specs',
            label: 'Özellikler',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$SpecsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SpecsTab"], {}, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/index.tsx",
                lineNumber: 37,
                columnNumber: 81
            }, this)
        },
        {
            id: 'delivery',
            labelKey: 'pdp_tab_delivery',
            label: 'Teslimat & Montaj',
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$DeliveryTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeliveryTab"], {}, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/index.tsx",
                lineNumber: 38,
                columnNumber: 94
            }, this)
        },
        {
            id: 'reviews',
            labelKey: 'pdp_tab_reviews',
            label: 'Yorumlar',
            count: product.rating?.count || 0,
            content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$ReviewsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReviewsTab"], {}, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/index.tsx",
                lineNumber: 39,
                columnNumber: 118
            }, this)
        }
    ];
    const handleAddToCart = ()=>{
        addItem({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            originalPrice: product.originalPrice ?? product.price,
            image: selectedColor?.image ?? product.colors[0]?.image ?? '',
            href: `/urun/${product.slug}`
        }, {
            selectedColor: selectedColor?.name ?? product.colors[0]?.name
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-[1400px] mx-auto px-0 md:px-8 pt-12 md:pt-20 pb-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-7",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$ProductImageGallery$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    images: images,
                                    productName: product.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/index.tsx",
                                    lineNumber: 65,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/index.tsx",
                                lineNumber: 64,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-5 px-4 md:px-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductInfo$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductInfo"], {
                                    product: product,
                                    selectedColorId: selectedColorId,
                                    onColorChange: setSelectedColorId,
                                    buttonRef: buttonRef
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductDetail/index.tsx",
                                    lineNumber: 68,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/index.tsx",
                                lineNumber: 67,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/index.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 md:px-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$ProductTabs$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductTabs"], {
                            tabs: tabs
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductDetail/index.tsx",
                            lineNumber: 79,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductDetail/index.tsx",
                        lineNumber: 78,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 md:px-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$CompleteTheLook$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompleteTheLook"], {
                                products: relatedProducts.slice(0, 3)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/index.tsx",
                                lineNumber: 84,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$RelatedProducts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RelatedProducts"], {
                                products: relatedProducts.slice(0, 4)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/index.tsx",
                                lineNumber: 85,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductDetail$2f$RecentlyViewed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecentlyViewed"], {
                                currentProduct: {
                                    id: product.id,
                                    slug: product.slug,
                                    name: product.name,
                                    image: selectedColor?.image ?? product.colors[0]?.image ?? '',
                                    price: product.price,
                                    brand: product.brand || 'SELIS'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductDetail/index.tsx",
                                lineNumber: 86,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductDetail/index.tsx",
                        lineNumber: 83,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductDetail/index.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Mobile$2f$StickyAddToCart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                productName: product.name,
                productImage: selectedColor?.image ?? product.colors[0]?.image ?? '',
                price: product.price,
                originalPrice: product.originalPrice,
                originalButtonRef: buttonRef,
                onAddToCart: (quantity)=>{
                    addItem({
                        id: product.id,
                        name: product.name,
                        brand: product.brand,
                        price: product.price,
                        originalPrice: product.originalPrice ?? product.price,
                        image: selectedColor?.image ?? product.colors[0]?.image ?? '',
                        href: `/urun/${product.slug}`
                    }, {
                        quantity,
                        selectedColor: selectedColor?.name ?? product.colors[0]?.name
                    });
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ProductDetail/index.tsx",
                lineNumber: 100,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(ProductDetail, "259Y+IeQRBSyeXUFGq5kkzZGq18=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = ProductDetail;
var _c;
__turbopack_context__.k.register(_c, "ProductDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Marketing/BundleOffer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BundleOffer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AnimatedPrice({ value }) {
    _s();
    const { formatPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
        initial: {
            opacity: 0,
            y: -8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.25,
            ease: 'easeOut'
        },
        className: "tabular-nums",
        children: formatPrice(value)
    }, value, false, {
        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
        lineNumber: 27,
        columnNumber: 9
    }, this);
}
_s(AnimatedPrice, "otdJlX8us5VjGvw7pwKVi11b6wY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = AnimatedPrice;
function BundleOffer({ mainProduct, relatedProducts, bundleDiscount = 0 }) {
    _s1();
    const { formatPrice, t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const allProducts = [
        mainProduct,
        ...relatedProducts
    ];
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set(allProducts.map({
        "BundleOffer.useState": (p)=>p.id
    }["BundleOffer.useState"])));
    const total = allProducts.filter((p)=>selected.has(p.id)).reduce((sum, p)=>sum + p.price, 0);
    const selectedCount = selected.size;
    const hasAll = selectedCount === allProducts.length;
    const hasSavings = hasAll && bundleDiscount > 0;
    const toggle = (id)=>{
        if (id === mainProduct.id) return; // ana ürün her zaman seçili
        setSelected((prev)=>{
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };
    const handleAddAll = ()=>{};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[#F5F0EB] dark:bg-card rounded-sm p-5 border border-[#E8E3DC] dark:border-border transition-colors",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                "data-lang-key": "bundle_offer_title",
                                className: "text-[10px] text-[#C9A96E] tracking-[0.25em] uppercase font-medium mb-0.5",
                                children: t('bundle_offer_title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                lineNumber: 72,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                "data-lang-key": "bundle_complete_collection",
                                className: "font-bold text-[#1C1C1E] dark:text-foreground text-base",
                                style: {
                                    fontFamily: 'var(--font-playfair), Playfair Display, serif'
                                },
                                children: t('bundle_complete_collection')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                lineNumber: 75,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                        lineNumber: 71,
                        columnNumber: 17
                    }, this),
                    !hasAll && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSelected(new Set(allProducts.map((p)=>p.id))),
                        className: "text-[11px] text-[#C9A96E] font-medium hover:underline",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "data-lang-key": "bundle_select_all",
                            children: t('bundle_select_all')
                        }, void 0, false, {
                            fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                            lineNumber: 85,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                        lineNumber: 81,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: allProducts.map((product, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                animate: {
                                    borderColor: selected.has(product.id) ? '#C9A96E' : '#E8E3DC',
                                    opacity: selected.has(product.id) ? 1 : 0.5
                                },
                                transition: {
                                    duration: 0.2
                                },
                                className: "relative bg-white dark:bg-muted border-2 rounded-sm overflow-hidden cursor-pointer group",
                                style: {
                                    width: 96,
                                    flexShrink: 0
                                },
                                onClick: ()=>toggle(product.id),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative h-20 bg-[#E8E3DC] dark:bg-card",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: product.image,
                                            alt: product.name,
                                            fill: true,
                                            sizes: "96px",
                                            className: "object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                            lineNumber: 106,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                        lineNumber: 105,
                                        columnNumber: 29
                                    }, this),
                                    product.isMain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-lang-key": "bundle_this_product",
                                        className: "absolute top-1 left-1 bg-[#1C1C1E] text-white text-[8px] px-1.5 py-0.5 rounded-sm font-medium",
                                        children: t('bundle_this_product')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                        lineNumber: 116,
                                        columnNumber: 33
                                    }, this),
                                    !product.isMain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-1 right-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${selected.has(product.id) ? 'bg-[#C9A96E] border-[#C9A96E]' : 'bg-white border-[#ccc]'}`,
                                            children: selected.has(product.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-2.5 h-2.5 text-white",
                                                fill: "none",
                                                viewBox: "0 0 12 12",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M2 6l3 3 5-5",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                                lineNumber: 125,
                                                columnNumber: 45
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                            lineNumber: 123,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                        lineNumber: 122,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-[#1C1C1E] dark:text-foreground font-medium leading-tight line-clamp-1",
                                                children: product.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                                lineNumber: 134,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-[#C9A96E] font-bold mt-0.5",
                                                children: formatPrice(product.price)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                                lineNumber: 137,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                        lineNumber: 133,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                lineNumber: 95,
                                columnNumber: 25
                            }, this),
                            idx < allProducts.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-6 h-6 rounded-full bg-white dark:bg-muted border border-[#E8E3DC] dark:border-border flex items-center justify-center flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-3 h-3 text-[#666] dark:text-muted-foreground"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                    lineNumber: 145,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                lineNumber: 144,
                                columnNumber: 29
                            }, this)
                        ]
                    }, product.id, true, {
                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                        lineNumber: 93,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                lineNumber: 91,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 pt-4 border-t border-[#E8E3DC] dark:border-border",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[12px] text-[#666] dark:text-muted-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "data-lang-key": "bundle_selected",
                                                children: t('bundle_selected')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                                lineNumber: 157,
                                                columnNumber: 29
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-[#1C1C1E] dark:text-foreground",
                                                children: [
                                                    selectedCount,
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-lang-key": "bundle_products",
                                                        children: t('bundle_products')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 181
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                                lineNumber: 157,
                                                columnNumber: 97
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                        lineNumber: 156,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl font-bold text-[#1C1C1E] dark:text-foreground",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            mode: "wait",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedPrice, {
                                                value: hasSavings ? total - bundleDiscount : total
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                                lineNumber: 161,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                            lineNumber: 160,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                        lineNumber: 159,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                lineNumber: 155,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: hasSavings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        scale: 0.9
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        scale: 0.9
                                    },
                                    className: "text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-[#666] dark:text-muted-foreground line-through",
                                            children: formatPrice(total)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                            lineNumber: 174,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-green-600 dark:text-green-400 font-semibold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "data-lang-key": "bundle_deal",
                                                    children: [
                                                        t('bundle_deal'),
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 37
                                                }, this),
                                                " ",
                                                formatPrice(total - bundleDiscount)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                            lineNumber: 175,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-green-600 dark:text-green-500",
                                            children: [
                                                formatPrice(bundleDiscount),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "data-lang-key": "bundle_savings",
                                                    children: t('bundle_savings')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 67
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                            lineNumber: 178,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                    lineNumber: 168,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                lineNumber: 166,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                        lineNumber: 154,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileTap: {
                            scale: 0.98
                        },
                        onClick: handleAddAll,
                        disabled: selectedCount === 0,
                        className: "w-full flex items-center justify-center gap-2 py-3 bg-[#C9A96E] text-white font-semibold text-[13px] rounded-sm hover:bg-[#B8915A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                lineNumber: 192,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-lang-key": "bundle_add_all_cart",
                                children: t('bundle_add_all_cart')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                                lineNumber: 193,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                        lineNumber: 186,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
                lineNumber: 153,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Marketing/BundleOffer.tsx",
        lineNumber: 68,
        columnNumber: 9
    }, this);
}
_s1(BundleOffer, "IGvkCSsJofFOT0X9/aGWDFWi/cA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c1 = BundleOffer;
var _c, _c1;
__turbopack_context__.k.register(_c, "AnimatedPrice");
__turbopack_context__.k.register(_c1, "BundleOffer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Marketing/StockNotifyForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StockNotifyForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function StockNotifyForm({ productId, productName }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [channels, setChannels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set([
        'email'
    ]));
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [done, setDone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const toggleChannel = (ch)=>{
        setChannels((prev)=>{
            const next = new Set(prev);
            if (next.has(ch)) {
                if (next.size === 1) return prev; // en az 1 seçili
                next.delete(ch);
            } else {
                next.add(ch);
            }
            return next;
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            await fetch('/api/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId,
                    productName,
                    email,
                    phone,
                    channels: Array.from(channels)
                })
            });
            // localStorage'a kaydet
            const notifyList = JSON.parse(localStorage.getItem('notifyList') ?? '[]');
            if (!notifyList.includes(productId)) {
                localStorage.setItem('notifyList', JSON.stringify([
                    ...notifyList,
                    productId
                ]));
            }
            setDone(true);
        } catch  {
        // graceful
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            !done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen((o)=>!o),
                className: "flex items-center gap-2 px-5 py-2.5 border-2 border-[#C9A96E] text-[#C9A96E] text-[13px] font-semibold rounded-sm hover:bg-[#C9A96E] hover:text-white transition-all duration-200 group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                        className: "w-4 h-4 group-hover:animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                        lineNumber: 65,
                        columnNumber: 21
                    }, this),
                    "Tekrar Gelince Haber Ver 🔔"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                lineNumber: 61,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: [
                    open && !done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].form, {
                        onSubmit: handleSubmit,
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
                        transition: {
                            duration: 0.3,
                            ease: 'easeInOut'
                        },
                        className: "overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 p-4 bg-[#F5F0EB] rounded-sm border border-[#E8E3DC]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12px] text-[#666] mb-3",
                                    children: "Bu ürün stoka girdiğinde size bildirelim."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                    lineNumber: 81,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            value: email,
                                            onChange: (e)=>setEmail(e.target.value),
                                            required: true,
                                            placeholder: "e-posta@adresiniz.com",
                                            className: "flex-1 border border-[#E8E3DC] rounded-sm px-3 py-2 text-[12px] bg-white focus:outline-none focus:border-[#C9A96E] transition-colors"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                            lineNumber: 87,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: loading,
                                            className: "flex-shrink-0 px-4 py-2 bg-[#1C1C1E] text-white text-[12px] font-semibold rounded-sm hover:bg-[#333] transition-colors disabled:opacity-50",
                                            children: loading ? '...' : 'Bildir'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                            lineNumber: 95,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                    lineNumber: 86,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2 mb-3",
                                    children: [
                                        {
                                            key: 'email',
                                            label: 'E-posta bildirimi'
                                        },
                                        {
                                            key: 'sms',
                                            label: 'SMS bildirimi'
                                        },
                                        {
                                            key: 'whatsapp',
                                            label: 'WhatsApp bildirimi'
                                        }
                                    ].map(({ key, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-2 text-[12px] text-[#444] cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: channels.has(key),
                                                    onChange: ()=>toggleChannel(key),
                                                    className: "accent-[#C9A96E]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 41
                                                }, this),
                                                label,
                                                key === 'sms' && channels.has('sms') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 ml-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                            className: "w-3 h-3 text-[#666]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "tel",
                                                            value: phone,
                                                            onChange: (e)=>setPhone(e.target.value),
                                                            placeholder: "+90 555 000 0000",
                                                            className: "border border-[#E8E3DC] rounded-sm px-2 py-1 text-[11px] w-36 focus:outline-none focus:border-[#C9A96E]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                                            lineNumber: 122,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                            lineNumber: 111,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                    lineNumber: 105,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-[#aaa]",
                                    children: "Stoka girdiğinde bir kez bildirim gönderilir. Başka e-posta almayacaksınız."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                    lineNumber: 135,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                            lineNumber: 80,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                        lineNumber: 72,
                        columnNumber: 21
                    }, this),
                    done && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.9
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        className: "flex items-center gap-2 mt-2 p-3 bg-green-50 border border-green-200 rounded-sm text-green-700 text-[13px] font-medium",
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
                                    damping: 10,
                                    stiffness: 200
                                },
                                className: "w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-3.5 h-3.5 text-white"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                    lineNumber: 155,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                                lineNumber: 149,
                                columnNumber: 25
                            }, this),
                            "Haberdar edileceksiniz ✓"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                        lineNumber: 144,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
                lineNumber: 70,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Marketing/StockNotifyForm.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, this);
}
_s(StockNotifyForm, "TuPAXeM8W6nTXF+pvC8Nwvbfb3I=");
_c = StockNotifyForm;
var _c;
__turbopack_context__.k.register(_c, "StockNotifyForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Marketing/LowStockBadge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LowStockBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function LowStockBadge({ stock }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    if (stock <= 0 || stock > 5) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            x: -8
        },
        animate: {
            opacity: 1,
            x: 0
        },
        className: "inline-flex items-center gap-1.5 bg-[#FFF3F3] border border-[#FFCDD2] text-[#E53935] text-[11px] font-semibold px-2.5 py-1 rounded-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                animate: {
                    scale: [
                        1,
                        1.2,
                        1
                    ]
                },
                transition: {
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 2
                },
                children: "⚠️"
            }, void 0, false, {
                fileName: "[project]/src/components/Marketing/LowStockBadge.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            t('pdp_low_stock', {
                count: stock
            })
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Marketing/LowStockBadge.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_s(LowStockBadge, "xTA27ds7Z+fTM4rUKUamcPNer0M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = LowStockBadge;
var _c;
__turbopack_context__.k.register(_c, "LowStockBadge");
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
]);

//# sourceMappingURL=src_components_12d79b70._.js.map