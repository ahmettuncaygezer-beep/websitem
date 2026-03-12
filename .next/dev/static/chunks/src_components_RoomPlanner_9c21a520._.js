(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/RoomPlanner/plannerStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePlannerStore",
    ()=>usePlannerStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const MAX_HISTORY = 50;
const DEFAULT_ROOM = {
    width: 500,
    depth: 400,
    height: 280,
    floorType: 'wood',
    wallColor: '#FFFFFF',
    unit: 'meter'
};
const usePlannerStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        items: [],
        room: DEFAULT_ROOM,
        selectedItemId: null,
        past: [],
        future: [],
        is2DMode: true,
        showGrid: true,
        planName: 'İsimsiz Plan',
        activeTool: 'select',
        saveToHistory: ()=>{
            const { items, room, past } = get();
            // Save current state to past, discarding future
            const currentState = {
                items: [
                    ...items
                ],
                room: {
                    ...room
                }
            };
            const newPast = [
                ...past,
                currentState
            ];
            if (newPast.length > MAX_HISTORY) {
                newPast.shift(); // remove oldest
            }
            set({
                past: newPast,
                future: []
            });
        },
        undo: ()=>{
            const { past, future, items, room } = get();
            if (past.length === 0) return;
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            const currentState = {
                items: JSON.parse(JSON.stringify(items)),
                room: JSON.parse(JSON.stringify(room))
            };
            set({
                items: previous.items,
                room: previous.room,
                past: newPast,
                future: [
                    currentState,
                    ...future
                ],
                selectedItemId: null // clear selection on undo to avoid bugs
            });
        },
        redo: ()=>{
            const { past, future, items, room } = get();
            if (future.length === 0) return;
            const next = future[0];
            const newFuture = future.slice(1);
            const currentState = {
                items: JSON.parse(JSON.stringify(items)),
                room: JSON.parse(JSON.stringify(room))
            };
            set({
                items: next.items,
                room: next.room,
                past: [
                    ...past,
                    currentState
                ],
                future: newFuture,
                selectedItemId: null
            });
        },
        addItem: (item)=>{
            get().saveToHistory();
            set((state)=>({
                    items: [
                        ...state.items,
                        item
                    ],
                    selectedItemId: item.id
                }));
        },
        updateItem: (id, updates)=>{
            // For continuous dragging operations, we usually don't save to history every pixel.
            // We might want UI components to call saveToHistory() *before* drag start instead.
            set((state)=>({
                    items: state.items.map((item)=>item.id === id ? {
                            ...item,
                            ...updates
                        } : item)
                }));
        },
        removeItem: (id)=>{
            get().saveToHistory();
            set((state)=>({
                    items: state.items.filter((item)=>item.id !== id),
                    selectedItemId: state.selectedItemId === id ? null : state.selectedItemId
                }));
        },
        duplicateItem: (id)=>{
            const state = get();
            const item = state.items.find((i)=>i.id === id);
            if (!item) return;
            state.saveToHistory();
            const newId = Math.random().toString(36).substr(2, 9);
            const duplicate = {
                ...item,
                id: newId,
                x: item.x + 20,
                y: item.y + 20
            };
            set({
                items: [
                    ...state.items,
                    duplicate
                ],
                selectedItemId: newId
            });
        },
        clearItems: ()=>{
            get().saveToHistory();
            set({
                items: [],
                selectedItemId: null
            });
        },
        setSelectedItem: (id)=>set({
                selectedItemId: id
            }),
        setPlanName: (name)=>set({
                planName: name
            }),
        setActiveTool: (tool)=>set({
                activeTool: tool
            }),
        updateRoom: (updates)=>{
            // Usually, we want to save history for room changes too, especially dimensions
            get().saveToHistory();
            set((state)=>({
                    room: {
                        ...state.room,
                        ...updates
                    }
                }));
        },
        toggleGrid: ()=>set((state)=>({
                    showGrid: !state.showGrid
                })),
        toggle3DMode: ()=>set((state)=>({
                    is2DMode: !state.is2DMode
                })),
        loadState: (data)=>{
            if (data && data.items && data.room) {
                set({
                    items: data.items,
                    room: data.room,
                    past: [],
                    future: [],
                    selectedItemId: null
                });
            }
        },
        loadPlan: (data)=>{
            set({
                items: data.furniture || [],
                room: data.room,
                planName: data.planName || 'Yeni Plan',
                past: [],
                future: [],
                selectedItemId: null
            });
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SavePlanModal",
    ()=>SavePlanModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/plannerStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function SavePlanModal({ open, onClose }) {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"].getState().planName);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SavePlanModal.useEffect": ()=>{
            if (open) {
                setName(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"].getState().planName);
                try {
                    setSaved(JSON.parse(localStorage.getItem('selis_plans') || '[]'));
                } catch  {
                    setSaved([]);
                }
            }
        }
    }["SavePlanModal.useEffect"], [
        open
    ]);
    const handleSave = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"].getState().setPlanName(name);
        const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"].getState();
        const plan = {
            name,
            date: new Date().toLocaleString('tr-TR'),
            state: {
                room: state.room,
                items: state.items,
                planName: name
            }
        };
        const plans = [
            plan,
            ...saved.filter((p)=>p.name !== name)
        ].slice(0, 10);
        localStorage.setItem('selis_plans', JSON.stringify(plans));
        setSaved(plans);
        onClose();
    };
    const handleLoad = (plan)=>{
        if (plan.state) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"].getState().loadPlan({
                room: plan.state.room,
                furniture: plan.state.items ?? [],
                planName: plan.name
            });
        }
        onClose();
    };
    const handleDelete = (planName)=>{
        const plans = saved.filter((p)=>p.name !== planName);
        localStorage.setItem('selis_plans', JSON.stringify(plans));
        setSaved(plans);
    };
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "fixed inset-0 flex items-center justify-center z-50",
            style: {
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0.95
                },
                animate: {
                    scale: 1
                },
                className: "w-full max-w-md mx-4 rounded-sm",
                style: {
                    background: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-6 py-4",
                        style: {
                            borderBottom: '1px solid #F0EDE8'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-[16px] font-semibold",
                                style: {
                                    color: '#1C1C1E'
                                },
                                "data-lang-key": "plan_save_title",
                                children: "Planı Kaydet"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                lineNumber: 55,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#999'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                    lineNumber: 56,
                                    columnNumber: 132
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                lineNumber: 56,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                        lineNumber: 54,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[12px] font-medium block mb-1",
                                        style: {
                                            color: '#999'
                                        },
                                        "data-lang-key": "plan_name_label",
                                        children: "Plan Adı"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                        lineNumber: 61,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: name,
                                        onChange: (e)=>setName(e.target.value),
                                        className: "w-full px-3 py-2.5 text-[14px] rounded-sm outline-none",
                                        style: {
                                            border: '1px solid #E8E3DC',
                                            color: '#1C1C1E'
                                        },
                                        onFocus: (e)=>e.target.style.borderColor = '#C9A96E',
                                        onBlur: (e)=>e.target.style.borderColor = '#E8E3DC'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                        lineNumber: 62,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                lineNumber: 60,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSave,
                                className: "w-full py-2.5 text-[13px] font-semibold rounded-sm transition-colors duration-200",
                                style: {
                                    background: '#1C1C1E',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer'
                                },
                                "data-lang-key": "plan_save_btn",
                                children: "Kaydet"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                lineNumber: 69,
                                columnNumber: 25
                            }, this),
                            saved.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-medium uppercase tracking-wider mb-2",
                                        style: {
                                            color: '#999'
                                        },
                                        "data-lang-key": "plan_saved_plans",
                                        children: "Kayıtlı Planlar"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                        lineNumber: 78,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 max-h-48 overflow-y-auto",
                                        style: {
                                            scrollbarWidth: 'thin'
                                        },
                                        children: saved.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between p-2 rounded-sm",
                                                style: {
                                                    background: '#FAFAF8'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[13px] font-medium",
                                                                style: {
                                                                    color: '#1C1C1E'
                                                                },
                                                                children: p.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                                                lineNumber: 83,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px]",
                                                                style: {
                                                                    color: '#999'
                                                                },
                                                                children: p.date
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                                                lineNumber: 84,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                                        lineNumber: 82,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleLoad(p),
                                                                className: "px-2 py-1 text-[11px] font-medium rounded-sm",
                                                                style: {
                                                                    background: '#C9A96E',
                                                                    color: '#1C1C1E',
                                                                    border: 'none',
                                                                    cursor: 'pointer'
                                                                },
                                                                "data-lang-key": "plan_load_btn",
                                                                children: "Yükle"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                                                lineNumber: 87,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleDelete(p.name),
                                                                className: "p-1 rounded-sm",
                                                                style: {
                                                                    background: 'transparent',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    color: '#999'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                                                    lineNumber: 91,
                                                                    columnNumber: 53
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                                                lineNumber: 89,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                                lineNumber: 81,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                        lineNumber: 79,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                                lineNumber: 77,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                        lineNumber: 59,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
                lineNumber: 53,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
            lineNumber: 50,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx",
        lineNumber: 49,
        columnNumber: 9
    }, this);
}
_s(SavePlanModal, "JeHbmj2U974A2g4vv5xv3aMSjls=");
_c = SavePlanModal;
var _c;
__turbopack_context__.k.register(_c, "SavePlanModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/Modals/ShareModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShareModal",
    ()=>ShareModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/plannerStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/html2canvas/dist/html2canvas.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function ShareModal({ open, onClose }) {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCapturing, setIsCapturing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleCapture = async ()=>{
        const area = document.querySelector('.bg-white.shadow-2xl') || document.querySelector('main');
        if (!area) return;
        setIsCapturing(true);
        try {
            const canvas = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$html2canvas$2f$dist$2f$html2canvas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(area, {
                useCORS: true,
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false
            });
            const link = document.createElement('a');
            link.download = `SELIS_Plan_${new Date().getTime()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.warn('Capture failed', err);
        } finally{
            setIsCapturing(false);
        }
    };
    const getShareUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ShareModal.useCallback[getShareUrl]": ()=>{
            const state = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"].getState();
            const data = {
                room: state.room,
                furniture: state.items,
                planName: state.planName
            };
            const encoded = btoa(encodeURIComponent(JSON.stringify(data)));
            return `${window.location.origin}/oda-planlayici?plan=${encoded}`;
        }
    }["ShareModal.useCallback[getShareUrl]"], []);
    const handleCopy = async ()=>{
        try {
            await navigator.clipboard.writeText(getShareUrl());
            setCopied(true);
            setTimeout(()=>setCopied(false), 2000);
        } catch  {}
    };
    if (!open) return null;
    const url = getShareUrl();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "fixed inset-0 flex items-center justify-center z-50",
            style: {
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0.95
                },
                animate: {
                    scale: 1
                },
                className: "w-full max-w-md mx-4 rounded-sm",
                style: {
                    background: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-6 py-4",
                        style: {
                            borderBottom: '1px solid #F0EDE8'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-[16px] font-semibold",
                                style: {
                                    color: '#1C1C1E'
                                },
                                "data-lang-key": "plan_share_title",
                                children: "Planı Paylaş"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                lineNumber: 62,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#999'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                    lineNumber: 63,
                                    columnNumber: 132
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                lineNumber: 63,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                        lineNumber: 61,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[12px] font-medium block mb-1",
                                        style: {
                                            color: '#999'
                                        },
                                        "data-lang-key": "plan_share_link",
                                        children: "Paylaşım Linki"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                        lineNumber: 69,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                readOnly: true,
                                                value: url,
                                                className: "flex-1 px-3 py-2 text-[12px] rounded-sm outline-none",
                                                style: {
                                                    border: '1px solid #E8E3DC',
                                                    color: '#666',
                                                    background: '#FAFAF8'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                                lineNumber: 71,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleCopy,
                                                className: "flex items-center gap-1 px-4 py-2 text-[12px] font-medium rounded-sm transition-colors duration-200",
                                                style: {
                                                    background: copied ? '#4CAF50' : '#1C1C1E',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                },
                                                children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                                            lineNumber: 77,
                                                            columnNumber: 49
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-lang-key": "plan_copied",
                                                            children: "Kopyalandı"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                                            lineNumber: 77,
                                                            columnNumber: 69
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                                            lineNumber: 77,
                                                            columnNumber: 128
                                                        }, this),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-lang-key": "plan_copy",
                                                            children: "Kopyala"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                                            lineNumber: 77,
                                                            columnNumber: 147
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                                lineNumber: 74,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                        lineNumber: 70,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                lineNumber: 68,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleCapture,
                                    disabled: isCapturing,
                                    className: "flex-1 py-2.5 flex items-center justify-center gap-2 text-[12px] font-medium rounded-sm border border-[#E8E3DC] hover:bg-[#F5F0EB] transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                            lineNumber: 89,
                                            columnNumber: 33
                                        }, this),
                                        " ",
                                        isCapturing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-lang-key": "plan_preparing",
                                            children: "Hazırlanıyor..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                            lineNumber: 89,
                                            columnNumber: 71
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-lang-key": "plan_download_img",
                                            children: "Görüntü İndir (PNG)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                            lineNumber: 89,
                                            columnNumber: 133
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                    lineNumber: 84,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                lineNumber: 83,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `https://wa.me/?text=${encodeURIComponent(`SELIS Oda Planım: ${url}`)}`,
                                        target: "_blank",
                                        rel: "noopener",
                                        className: "flex-1 py-2.5 text-center text-[12px] font-medium rounded-sm transition-colors duration-150",
                                        style: {
                                            background: '#25D366',
                                            color: 'white',
                                            textDecoration: 'none'
                                        },
                                        children: "WhatsApp"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                        lineNumber: 95,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: `mailto:?subject=SELIS Oda Planım&body=${encodeURIComponent(url)}`,
                                        className: "flex-1 py-2.5 text-center text-[12px] font-medium rounded-sm transition-colors duration-150",
                                        style: {
                                            background: '#1C1C1E',
                                            color: 'white',
                                            textDecoration: 'none'
                                        },
                                        children: "E-posta"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                        lineNumber: 100,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                                lineNumber: 94,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                        lineNumber: 66,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
                lineNumber: 60,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
            lineNumber: 57,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/RoomPlanner/Modals/ShareModal.tsx",
        lineNumber: 56,
        columnNumber: 9
    }, this);
}
_s(ShareModal, "rzIOLbff5AgEaOVSUpcAq9emOng=");
_c = ShareModal;
var _c;
__turbopack_context__.k.register(_c, "ShareModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlanSummaryModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/plannerStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function PlanSummaryModal({ open, onClose }) {
    _s();
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlanSummaryModal.usePlannerStore[items]": (s)=>s.items
    }["PlanSummaryModal.usePlannerStore[items]"]);
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const totalPrice = items.reduce((sum, item)=>sum + (item.product?.price || 0), 0);
    const handleFinish = ()=>{
        // Add all items to cart
        items.forEach((item)=>{
            if (item.product) {
                addItem({
                    id: item.product.id,
                    name: item.product.name,
                    brand: item.product.brand || 'SELIS Exclusive',
                    price: item.product.price,
                    image: item.product.image,
                    href: item.product.originalHref || `/urun/${item.product.id}`
                });
            }
        });
        // Success feedback and redirect
        router.push('/sepet');
    };
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "fixed inset-0 flex items-center justify-center z-[100] px-4",
            style: {
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    scale: 0.9,
                    y: 20
                },
                animate: {
                    scale: 1,
                    y: 0
                },
                className: "w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.2)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-32 bg-[#1C1C1E] flex items-center justify-center overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 opacity-20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                        lineNumber: 59,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(168,137,86,0.3),transparent)]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                        lineNumber: 60,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                lineNumber: 58,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "text-gold mx-auto mb-2",
                                        size: 32
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                        lineNumber: 63,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-white text-[18px] font-serif uppercase tracking-[0.2em]",
                                        "data-lang-key": "plan_summary_title",
                                        children: "Plan Özeti"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                        lineNumber: 64,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                lineNumber: 62,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                    lineNumber: 70,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                lineNumber: 66,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                        lineNumber: 57,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 max-h-[300px] overflow-y-auto mb-8 pr-2",
                                children: items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 p-3 rounded-xl bg-[#F8F6F3] border border-[#E8E3DC]/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-16 h-16 rounded-lg bg-white p-2 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: item.product?.image,
                                                    alt: "",
                                                    className: "w-full h-full object-contain"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                lineNumber: 79,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-[13px] font-semibold text-[#1C1C1E]",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                        lineNumber: 83,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] text-[#999]",
                                                        children: item.product?.brand || 'SELIS Exclusive'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                        lineNumber: 84,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                lineNumber: 82,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[13px] font-bold text-[#C9A96E]",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(item.product?.price || 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                lineNumber: 86,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                        lineNumber: 78,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                lineNumber: 76,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between py-4 border-t border-[#E8E3DC]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] text-[#666]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "data-lang-key": "plan_total_amount",
                                                children: "Toplam Tutar"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                lineNumber: 95,
                                                columnNumber: 33
                                            }, this),
                                            " (",
                                            items.length,
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "data-lang-key": "plan_product_count",
                                                children: "Ürün"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                lineNumber: 95,
                                                columnNumber: 109
                                            }, this),
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                        lineNumber: 94,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[20px] font-bold text-[#1C1C1E]",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(totalPrice)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                        lineNumber: 97,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                lineNumber: 93,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4 mt-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "py-4 text-[13px] font-bold uppercase tracking-widest text-[#1C1C1E] border border-[#E8E3DC] hover:bg-[#F8F6F3] rounded-sm transition-all",
                                        "data-lang-key": "plan_continue_edit",
                                        children: "Düzenlemeye Devam"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                        lineNumber: 102,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleFinish,
                                        className: "group relative py-4 bg-[#1C1C1E] text-white overflow-hidden rounded-sm transition-all hover:bg-[#C9A96E]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative z-10 flex items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-widest",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "data-lang-key": "plan_add_and_finish",
                                                    children: "Sepete Ekle & Bitir"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    size: 16,
                                                    className: "group-hover:translate-x-1 transition-transform"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                            lineNumber: 113,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                        lineNumber: 109,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                                lineNumber: 101,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                        lineNumber: 75,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
                lineNumber: 51,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
            lineNumber: 44,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx",
        lineNumber: 43,
        columnNumber: 9
    }, this);
}
_s(PlanSummaryModal, "y03aS9DwY9jbc1LnGR5dI1OZCdw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PlanSummaryModal;
var _c;
__turbopack_context__.k.register(_c, "PlanSummaryModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/PlannerToolbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlannerToolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/plannerStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/redo-2.js [app-client] (ecmascript) <export default as Redo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hand.js [app-client] (ecmascript) <export default as Hand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.js [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panel-left-close.js [app-client] (ecmascript) <export default as PanelLeftClose>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightClose$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panel-right-close.js [app-client] (ecmascript) <export default as PanelRightClose>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panel-left-open.js [app-client] (ecmascript) <export default as PanelLeftOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panel-right-open.js [app-client] (ecmascript) <export default as PanelRightOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3X3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid3X3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$Modals$2f$SavePlanModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/Modals/SavePlanModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$Modals$2f$ShareModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/Modals/ShareModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$Modals$2f$PlanSummaryModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PlannerToolbar({ leftOpen, setLeftOpen, rightOpen, setRightOpen }) {
    _s();
    const undo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerToolbar.usePlannerStore[undo]": (s)=>s.undo
    }["PlannerToolbar.usePlannerStore[undo]"]);
    const redo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerToolbar.usePlannerStore[redo]": (s)=>s.redo
    }["PlannerToolbar.usePlannerStore[redo]"]);
    const past = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerToolbar.usePlannerStore[past]": (s)=>s.past
    }["PlannerToolbar.usePlannerStore[past]"]);
    const future = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerToolbar.usePlannerStore[future]": (s)=>s.future
    }["PlannerToolbar.usePlannerStore[future]"]);
    const showGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerToolbar.usePlannerStore[showGrid]": (s)=>s.showGrid
    }["PlannerToolbar.usePlannerStore[showGrid]"]);
    const toggleGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerToolbar.usePlannerStore[toggleGrid]": (s)=>s.toggleGrid
    }["PlannerToolbar.usePlannerStore[toggleGrid]"]);
    const saveToHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerToolbar.usePlannerStore[saveToHistory]": (s)=>s.saveToHistory
    }["PlannerToolbar.usePlannerStore[saveToHistory]"]);
    const activeTool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerToolbar.usePlannerStore[activeTool]": (s)=>s.activeTool
    }["PlannerToolbar.usePlannerStore[activeTool]"]);
    const setActiveTool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerToolbar.usePlannerStore[setActiveTool]": (s)=>s.setActiveTool
    }["PlannerToolbar.usePlannerStore[setActiveTool]"]);
    const [isMounted, setIsMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [saveOpen, setSaveOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [shareOpen, setShareOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [summaryOpen, setSummaryOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "PlannerToolbar.useEffect": ()=>{
            setIsMounted(true);
        }
    }["PlannerToolbar.useEffect"], []);
    const handleSaveClick = ()=>{
        saveToHistory();
        setSaveOpen(true);
    };
    const handleShareClick = ()=>{
        setShareOpen(true);
    };
    const handleFinishClick = ()=>{
        setSummaryOpen(true);
    };
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "h-[52px] bg-white border-b border-[#E8E3DC] px-4 flex items-center justify-between flex-shrink-0 z-30",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setLeftOpen(!leftOpen),
                        className: "p-1.5 hover:bg-[#F5F0EB] rounded-sm text-[#666] transition-colors",
                        title: t('planner_toggle_library'),
                        children: isMounted ? leftOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__["PanelLeftClose"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 55,
                            columnNumber: 46
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftOpen$3e$__["PanelLeftOpen"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 55,
                            columnNumber: 77
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$left$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelLeftClose$3e$__["PanelLeftClose"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 55,
                            columnNumber: 108
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 54,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-4 bg-[#E8E3DC] mx-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 58,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: undo,
                        disabled: past.length === 0,
                        className: `p-1.5 rounded-sm transition-colors ${past.length > 0 ? 'text-[#1C1C1E] hover:bg-[#F5F0EB]' : 'text-[#CCC] cursor-not-allowed'}`,
                        title: t('planner_undo'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 61,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 60,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: redo,
                        disabled: future.length === 0,
                        className: `p-1.5 rounded-sm transition-colors ${future.length > 0 ? 'text-[#1C1C1E] hover:bg-[#F5F0EB]' : 'text-[#CCC] cursor-not-allowed'}`,
                        title: t('planner_redo'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__["Redo2"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 64,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-4 bg-[#E8E3DC] mx-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 67,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTool('select'),
                        className: `p-1.5 rounded-sm transition-colors ${activeTool === 'select' ? 'bg-[#F5F0EB] text-[#C9A96E]' : 'hover:bg-[#F5F0EB] text-[#666]'}`,
                        title: t('planner_tool_select'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 75,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTool('pan'),
                        className: `p-1.5 rounded-sm transition-colors ${activeTool === 'pan' ? 'bg-[#F5F0EB] text-[#C9A96E]' : 'hover:bg-[#F5F0EB] text-[#666]'}`,
                        title: t('planner_tool_pan'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 82,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 77,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTool('measure'),
                        className: `p-1.5 rounded-sm transition-colors ${activeTool === 'measure' ? 'bg-[#F5F0EB] text-[#C9A96E]' : 'hover:bg-[#F5F0EB] text-[#666]'}`,
                        title: t('planner_tool_measure'),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 89,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 84,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-4 bg-[#E8E3DC] mx-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 92,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-1.5 hover:bg-[#F5F0EB] text-[#666] rounded-sm transition-colors",
                        title: t('planner_toggle_grid'),
                        onClick: toggleGrid,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3X3$3e$__["Grid3X3"], {
                            size: 18,
                            className: isMounted && showGrid ? "text-[#C9A96E]" : ""
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 95,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 94,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:flex items-center gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[12px] font-medium tracking-wide text-[#999] uppercase",
                    "data-lang-key": "planner_title",
                    children: t('planner_title')
                }, void 0, false, {
                    fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                    lineNumber: 101,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                lineNumber: 100,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleShareClick,
                        className: "flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-[#1C1C1E] hover:bg-[#F5F0EB] rounded-sm transition-colors border border-transparent",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                                lineNumber: 112,
                                columnNumber: 21
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('planner_share')
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                                lineNumber: 112,
                                columnNumber: 42
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSaveClick,
                        className: "flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-[#1C1C1E] border border-[#E8E3DC] hover:border-[#C9A96E] rounded-sm transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                                lineNumber: 118,
                                columnNumber: 21
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('planner_save')
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                                lineNumber: 118,
                                columnNumber: 40
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 114,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleFinishClick,
                        className: "flex items-center gap-2 px-4 py-1.5 text-[12px] font-medium bg-[#1C1C1E] text-white hover:bg-[#C9A96E] rounded-sm transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                t('planner_finish'),
                                " →"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 124,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 120,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-4 bg-[#E8E3DC] mx-1"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 127,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setRightOpen(!rightOpen),
                        className: "p-1.5 hover:bg-[#F5F0EB] rounded-sm text-[#666] transition-colors",
                        title: t('planner_toggle_settings'),
                        children: isMounted ? rightOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightClose$3e$__["PanelRightClose"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 130,
                            columnNumber: 47
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightOpen$3e$__["PanelRightOpen"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 130,
                            columnNumber: 79
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panel$2d$right$2d$close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PanelRightClose$3e$__["PanelRightClose"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                            lineNumber: 130,
                            columnNumber: 111
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 129,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                lineNumber: 107,
                columnNumber: 13
            }, this),
            ("TURBOPACK compile-time value", "object") !== 'undefined' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$Modals$2f$SavePlanModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SavePlanModal"], {
                        open: saveOpen,
                        onClose: ()=>setSaveOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 137,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$Modals$2f$ShareModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShareModal"], {
                        open: shareOpen,
                        onClose: ()=>setShareOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 138,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$Modals$2f$PlanSummaryModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        open: summaryOpen,
                        onClose: ()=>setSummaryOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
                        lineNumber: 139,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/PlannerToolbar.tsx",
        lineNumber: 51,
        columnNumber: 9
    }, this);
}
_s(PlannerToolbar, "pJsHcEPdvzePiOXtsBLCdodmwYo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"]
    ];
});
_c = PlannerToolbar;
;
;
;
var _c;
__turbopack_context__.k.register(_c, "PlannerToolbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/PlannerBottomBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlannerBottomBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/plannerStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$Modals$2f$PlanSummaryModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/Modals/PlanSummaryModal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PlannerBottomBar() {
    _s();
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerBottomBar.usePlannerStore[items]": (s)=>s.items
    }["PlannerBottomBar.usePlannerStore[items]"]);
    const room = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerBottomBar.usePlannerStore[room]": (s)=>s.room
    }["PlannerBottomBar.usePlannerStore[room]"]);
    const totalPrice = items.reduce((sum, item)=>sum + (item.product?.price || 0), 0);
    const totalItems = items.length;
    // Room Area
    const area = (room.width / 100 * (room.depth / 100)).toFixed(1);
    const [summaryOpen, setSummaryOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "h-[64px] bg-white border-t border-[#E8E3DC] px-6 flex items-center justify-between flex-shrink-0 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13px] text-[#666]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-[#1C1C1E] font-medium",
                                children: totalItems
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                                lineNumber: 25,
                                columnNumber: 21
                            }, this),
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-lang-key": "planner_items_in_room",
                                children: "ürün odada yer alıyor"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                                lineNumber: 25,
                                columnNumber: 90
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                        lineNumber: 24,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[15px] font-bold text-[#C9A96E]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-lang-key": "planner_total",
                                children: "Toplam:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                                lineNumber: 28,
                                columnNumber: 21
                            }, this),
                            " ",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPrice"])(totalPrice)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                        lineNumber: 27,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                lineNumber: 23,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:flex items-center gap-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-[13px] text-[#666] bg-[#F5F0EB] px-4 py-1.5 rounded-full border border-[#E8E3DC]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                room.width / 100,
                                "m × ",
                                room.depth / 100,
                                "m"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                            lineNumber: 35,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-1 h-1 bg-[#CCC] rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                            lineNumber: 36,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold text-[#1C1C1E]",
                            children: [
                                area,
                                " m²"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                            lineNumber: 37,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                    lineNumber: 34,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setSummaryOpen(true),
                    disabled: totalItems === 0,
                    className: `flex items-center gap-2 px-6 py-2.5 text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 rounded-sm
                        ${totalItems > 0 ? 'bg-[#C9A96E] text-white hover:bg-[#B8915A] shadow-md hover:shadow-lg transform hover:-translate-y-0.5' : 'bg-[#F5F0EB] text-[#CCC] cursor-not-allowed'}
                    `,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                            lineNumber: 53,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "data-lang-key": "planner_add_all_cart",
                            children: "Hepsini Sepete Ekle"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                            lineNumber: 54,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                    lineNumber: 43,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$Modals$2f$PlanSummaryModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                open: summaryOpen,
                onClose: ()=>setSummaryOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
                lineNumber: 58,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/PlannerBottomBar.tsx",
        lineNumber: 21,
        columnNumber: 9
    }, this);
}
_s(PlannerBottomBar, "cLY9KGE6ybbVVc2hgWZKBRkujfA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"]
    ];
});
_c = PlannerBottomBar;
;
var _c;
__turbopack_context__.k.register(_c, "PlannerBottomBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/planner.data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "plannerMockData",
    ()=>plannerMockData
]);
const plannerMockData = [
    // SOFAS
    {
        id: 'luna-kose-koltuk',
        name: 'Luna Köşe Koltuk',
        category: 'Sofa',
        dimensions: {
            width: 320,
            depth: 180
        },
        price: 89990,
        image: '/images/products/luna-sofa.jpg',
        brand: 'SELIS Atelier',
        originalHref: '/urun/luna-kose-koltuk'
    },
    {
        id: 'serene-ikili-koltuk',
        name: 'Serene İkili Koltuk',
        category: 'Sofa',
        dimensions: {
            width: 195,
            depth: 95
        },
        price: 52990,
        image: '/images/products/serene-sofa.jpg',
        brand: 'SELIS Atelier',
        originalHref: '/urun/serene-ikili-koltuk'
    },
    // CHAIRS
    {
        id: 'aria-berjer',
        name: 'Aria Berjer',
        category: 'Chair',
        dimensions: {
            width: 78,
            depth: 82
        },
        price: 34990,
        image: '/images/products/aria-chair-1.jpg',
        brand: 'SELIS Atelier',
        originalHref: '/urun/aria-berjer'
    },
    {
        id: 'como-sandalye',
        name: 'Como Sandalye',
        category: 'Chair',
        dimensions: {
            width: 52,
            depth: 55
        },
        price: 8990,
        image: '/images/products/como-chair-1.jpg',
        brand: 'SELIS',
        originalHref: '/urun/como-sandalye'
    },
    // TABLES
    {
        id: 'nova-yemek-masasi',
        name: 'Nova Yemek Masası',
        category: 'Table',
        dimensions: {
            width: 220,
            depth: 100
        },
        price: 45990,
        image: '/images/products/nova-table-1.jpg',
        brand: 'SELIS',
        originalHref: '/urun/nova-yemek-masasi'
    },
    {
        id: 'orbit-sehpa',
        name: 'Orbit Sehpa',
        category: 'Table',
        dimensions: {
            width: 90,
            depth: 90
        },
        price: 18990,
        image: '/images/products/orbit-table-1.jpg',
        brand: 'SELIS',
        originalHref: '/urun/orbit-sehpa'
    },
    {
        id: 'oslo-calisma-masasi',
        name: 'Oslo Çalışma Masası',
        category: 'Table',
        dimensions: {
            width: 140,
            depth: 65
        },
        price: 24990,
        image: '/images/products/oslo-desk-1.jpg',
        brand: 'SELIS',
        originalHref: '/urun/oslo-calisma-masasi'
    },
    // BEDS
    {
        id: 'zen-yatak',
        name: 'Zen Yatak',
        category: 'Bed',
        dimensions: {
            width: 180,
            depth: 210
        },
        price: 42990,
        image: '/images/products/zen-bed-1.jpg',
        brand: 'SELIS',
        originalHref: '/urun/zen-yatak-basligi'
    },
    // WARDROBE (Using proxy for now, none precisely in original mock but adding a realistic one)
    {
        id: 'diva-konsol',
        name: 'Diva Konsol (Dolap)',
        category: 'Wardrobe',
        dimensions: {
            width: 200,
            depth: 45
        },
        price: 26990,
        image: '/images/products/diva-konsol.jpg',
        brand: 'SELIS',
        originalHref: '/urun/diva-konsol'
    },
    // LIGHTING
    {
        id: 'aura-lambader',
        name: 'Aura Lambader',
        category: 'Lighting',
        dimensions: {
            width: 45,
            depth: 45
        },
        price: 12990,
        image: '/images/products/aura-lamp-1.jpg',
        brand: 'SELIS Luce',
        originalHref: '/urun/aura-lambader'
    },
    {
        id: 'celestia-avize',
        name: 'Celestia Avize',
        category: 'Lighting',
        dimensions: {
            width: 80,
            depth: 80
        },
        price: 22990,
        image: '/images/products/celestia-chandelier-1.jpg',
        brand: 'SELIS Luce',
        originalHref: '/urun/celestia-avize'
    },
    // DECORATION
    {
        id: 'botanica-vazo-seti',
        name: 'Botanica Vazo Seti',
        category: 'Decoration',
        dimensions: {
            width: 30,
            depth: 30
        },
        price: 4990,
        image: '/images/products/botanica-vase-1.jpg',
        brand: 'SELIS Casa',
        originalHref: '/urun/botanica-vazo-seti'
    },
    {
        id: 'terra-hali',
        name: 'Terra Halı',
        category: 'Decoration',
        dimensions: {
            width: 300,
            depth: 200
        },
        price: 15990,
        image: '/images/products/terra-rug-1.jpg',
        brand: 'SELIS Casa',
        originalHref: '/urun/terra-hali'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/FurnitureSVGs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BedSVG",
    ()=>BedSVG,
    "ChairSVG",
    ()=>ChairSVG,
    "DecorationSVG",
    ()=>DecorationSVG,
    "LightingSVG",
    ()=>LightingSVG,
    "SofaSVG",
    ()=>SofaSVG,
    "TableSVG",
    ()=>TableSVG,
    "WardrobeSVG",
    ()=>WardrobeSVG,
    "getFallbackSVG",
    ()=>getFallbackSVG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const DEFAULT_FILL = '#C9A96E'; // Gold tone from system
const DEFAULT_STROKE = '#1C1C1E'; // Dark border
function SofaSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "none",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "20",
                width: "90",
                height: "60",
                rx: "4",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 19,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "5",
                width: "90",
                height: "15",
                rx: "4",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "20",
                width: "15",
                height: "60",
                rx: "2",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 23,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "80",
                y: "20",
                width: "15",
                height: "60",
                rx: "2",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
        lineNumber: 17,
        columnNumber: 9
    }, this);
}
_c = SofaSVG;
function ChairSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "none",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "15",
                y: "25",
                width: "70",
                height: "60",
                rx: "4",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "15",
                y: "5",
                width: "70",
                height: "20",
                rx: "4",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 36,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "25",
                width: "15",
                height: "50",
                rx: "2",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 38,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "80",
                y: "25",
                width: "15",
                height: "50",
                rx: "2",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 39,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
_c1 = ChairSVG;
function BedSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "none",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "25",
                width: "90",
                height: "70",
                rx: "2",
                fill: "#FAFAF9",
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "5",
                width: "90",
                height: "20",
                rx: "2",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 50,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "30",
                cy: "35",
                rx: "15",
                ry: "8",
                fill: "#FFFFFF",
                stroke: strokeColor,
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "70",
                cy: "35",
                rx: "15",
                ry: "8",
                fill: "#FFFFFF",
                stroke: strokeColor,
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 53,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 50 Q 50 60 95 50 L 95 95 L 5 95 Z",
                fill: fillColor,
                opacity: "0.8",
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 55,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
        lineNumber: 46,
        columnNumber: 9
    }, this);
}
_c2 = BedSVG;
function TableSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "none",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "10",
                cy: "10",
                r: "4",
                fill: strokeColor
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 64,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "90",
                cy: "10",
                r: "4",
                fill: strokeColor
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 65,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "10",
                cy: "90",
                r: "4",
                fill: strokeColor
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 66,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "90",
                cy: "90",
                r: "4",
                fill: strokeColor
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 67,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "5",
                width: "90",
                height: "90",
                rx: "2",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 69,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
        lineNumber: 62,
        columnNumber: 9
    }, this);
}
_c3 = TableSVG;
function WardrobeSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "none",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "5",
                width: "90",
                height: "90",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "35",
                y1: "5",
                x2: "35",
                y2: "95",
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "65",
                y1: "5",
                x2: "65",
                y2: "95",
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 81,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "30",
                y1: "45",
                x2: "30",
                y2: "55",
                stroke: strokeColor,
                strokeWidth: "2",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 83,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "40",
                y1: "45",
                x2: "40",
                y2: "55",
                stroke: strokeColor,
                strokeWidth: "2",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 84,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "60",
                y1: "45",
                x2: "60",
                y2: "55",
                stroke: strokeColor,
                strokeWidth: "2",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 85,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "70",
                y1: "45",
                x2: "70",
                y2: "55",
                stroke: strokeColor,
                strokeWidth: "2",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 86,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
        lineNumber: 76,
        columnNumber: 9
    }, this);
}
_c4 = WardrobeSVG;
function LightingSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid meet",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "50",
                cy: "50",
                r: "40",
                fill: "transparent",
                stroke: strokeColor,
                strokeWidth: "1",
                strokeDasharray: "4 4"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 95,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "50",
                cy: "50",
                r: "15",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 97,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "50",
                y1: "15",
                x2: "50",
                y2: "30",
                stroke: fillColor,
                strokeWidth: "3",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 99,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "50",
                y1: "70",
                x2: "50",
                y2: "85",
                stroke: fillColor,
                strokeWidth: "3",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 100,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "15",
                y1: "50",
                x2: "30",
                y2: "50",
                stroke: fillColor,
                strokeWidth: "3",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 101,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "70",
                y1: "50",
                x2: "85",
                y2: "50",
                stroke: fillColor,
                strokeWidth: "3",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 102,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
        lineNumber: 93,
        columnNumber: 9
    }, this);
}
_c5 = LightingSVG;
function DecorationSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: width,
        height: height,
        viewBox: "0 0 100 100",
        preserveAspectRatio: "none",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "5",
                y: "15",
                width: "90",
                height: "70",
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 111,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "50",
                cy: "50",
                r: "20",
                fill: "transparent",
                stroke: strokeColor,
                strokeWidth: "2",
                opacity: "0.3"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 112,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M 5 25 L 95 25 M 5 75 L 95 75",
                stroke: strokeColor,
                strokeWidth: "1",
                opacity: "0.3",
                strokeDasharray: "4 4"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 113,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "20",
                x2: "5",
                y2: "20",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 115,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "30",
                x2: "5",
                y2: "30",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "40",
                x2: "5",
                y2: "40",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 117,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "50",
                x2: "5",
                y2: "50",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 118,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "60",
                x2: "5",
                y2: "60",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 119,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "70",
                x2: "5",
                y2: "70",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 120,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "0",
                y1: "80",
                x2: "5",
                y2: "80",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 121,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "95",
                y1: "20",
                x2: "100",
                y2: "20",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 122,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "95",
                y1: "30",
                x2: "100",
                y2: "30",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 123,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "95",
                y1: "40",
                x2: "100",
                y2: "40",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 124,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "95",
                y1: "50",
                x2: "100",
                y2: "50",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 125,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "95",
                y1: "60",
                x2: "100",
                y2: "60",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 126,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "95",
                y1: "70",
                x2: "100",
                y2: "70",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 127,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "95",
                y1: "80",
                x2: "100",
                y2: "80",
                stroke: strokeColor,
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 128,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
        lineNumber: 109,
        columnNumber: 9
    }, this);
}
_c6 = DecorationSVG;
function getFallbackSVG(category, props = {}) {
    switch(category){
        case 'Sofa':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SofaSVG, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 135,
                columnNumber: 29
            }, this);
        case 'Chair':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChairSVG, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 136,
                columnNumber: 30
            }, this);
        case 'Bed':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BedSVG, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 137,
                columnNumber: 28
            }, this);
        case 'Table':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TableSVG, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 138,
                columnNumber: 30
            }, this);
        case 'Wardrobe':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WardrobeSVG, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 139,
                columnNumber: 33
            }, this);
        case 'Lighting':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LightingSVG, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 140,
                columnNumber: 33
            }, this);
        case 'Decoration':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DecorationSVG, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 141,
                columnNumber: 35
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SofaSVG, {
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureSVGs.tsx",
                lineNumber: 142,
                columnNumber: 25
            }, this); // Safe default
    }
}
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "SofaSVG");
__turbopack_context__.k.register(_c1, "ChairSVG");
__turbopack_context__.k.register(_c2, "BedSVG");
__turbopack_context__.k.register(_c3, "TableSVG");
__turbopack_context__.k.register(_c4, "WardrobeSVG");
__turbopack_context__.k.register(_c5, "LightingSVG");
__turbopack_context__.k.register(_c6, "DecorationSVG");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/FurnitureCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FurnitureCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$FurnitureSVGs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/FurnitureSVGs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/plannerStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function FurnitureCard({ product }) {
    _s();
    const [imageFailed, setImageFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "FurnitureCard.usePlannerStore[addItem]": (state)=>state.addItem
    }["FurnitureCard.usePlannerStore[addItem]"]);
    const room = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "FurnitureCard.usePlannerStore[room]": (state)=>state.room
    }["FurnitureCard.usePlannerStore[room]"]);
    // Dimension formatting
    const dimText = `${product.dimensions.width}×${product.dimensions.depth} cm`;
    // Handle Add via Click
    const handleAddClick = ()=>{
        const nanoid = Math.random().toString(36).substring(2, 9);
        addItem({
            id: nanoid,
            productId: product.id,
            name: product.name,
            category: product.category,
            // Placed roughly in center of the room initially
            x: room.width / 2,
            y: room.depth / 2,
            width: product.dimensions.width,
            depth: product.dimensions.depth,
            rotation: 0,
            color: '#1C1C1E',
            isLocked: false,
            zIndex: 10,
            product: product
        });
    };
    // Handle Drag
    const handleDragStart = (e)=>{
        // We set the product JSON to be caught by the Canvas's onDrop
        e.dataTransfer.setData('application/json', JSON.stringify(product));
        e.dataTransfer.effectAllowed = 'copy';
        // Make the drag ghost slightly transparent
        const el = e.currentTarget;
        setTimeout(()=>{
            el.style.opacity = '0.5';
        }, 0);
    };
    const handleDragEnd = (e)=>{
        e.currentTarget.style.opacity = '1';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        draggable: true,
        onDragStart: handleDragStart,
        onDragEnd: handleDragEnd,
        className: "group relative bg-white border border-[#E8E3DC]/60 rounded-xl overflow-hidden flex flex-col cursor-grab active:cursor-grabbing hover:border-[#C9A96E]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full aspect-[4/3] bg-gradient-to-b from-[#FAFAF9] to-white flex items-center justify-center p-4",
                children: [
                    !imageFailed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: product.image,
                        alt: product.name,
                        className: "w-full h-full object-contain drop-shadow-sm",
                        onError: ()=>setImageFailed(true),
                        draggable: false
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                        lineNumber: 67,
                        columnNumber: 21
                    }, this) : // SVG Placeholder exactly as requested
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-full flex items-center justify-center opacity-70",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$FurnitureSVGs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFallbackSVG"])(product.category, {
                            width: '80%',
                            height: '80%'
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                        lineNumber: 76,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute top-3 right-3 bg-white/80 backdrop-blur-md border border-white/50 text-[#1C1C1E] text-[9px] font-bold px-2 py-1 rounded-full z-10 shadow-sm tracking-wide",
                        children: dimText
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                        lineNumber: 82,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-white/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAddClick,
                                className: "w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1C1C1E] hover:bg-[#C9A96E] hover:text-white hover:scale-110 transition-all duration-300",
                                title: "Odaya Ekle",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                                    lineNumber: 93,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                                lineNumber: 88,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white hover:scale-110 transition-all duration-300",
                                title: "Önizle",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                                    lineNumber: 99,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                                lineNumber: 95,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                        lineNumber: 87,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 bg-white flex flex-col border-t border-[#E8E3DC]/30",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13px] font-bold text-[#1C1C1E] truncate mb-0.5",
                        children: product.name
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                        lineNumber: 106,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] text-[#999] font-medium mb-2",
                        children: product.category
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                        lineNumber: 107,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[13px] font-black text-[#C9A96E]",
                        children: new Intl.NumberFormat('tr-TR', {
                            style: 'currency',
                            currency: 'TRY',
                            minimumFractionDigits: 0
                        }).format(product.price)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                        lineNumber: 108,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
                lineNumber: 105,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/FurnitureCard.tsx",
        lineNumber: 56,
        columnNumber: 9
    }, this);
}
_s(FurnitureCard, "Ny75Nky9+YXEPoKPQo0vpJc/DbM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"]
    ];
});
_c = FurnitureCard;
var _c;
__turbopack_context__.k.register(_c, "FurnitureCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/FurnitureLibrary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FurnitureLibrary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$planner$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/planner.data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$FurnitureCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/FurnitureCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const CATEGORIES = [
    {
        label: 'Tümü',
        value: 'All',
        langKey: 'planner_tab_all'
    },
    {
        label: 'Koltuklar',
        value: 'Sofa',
        langKey: 'planner_tab_sofas'
    },
    {
        label: 'Sandalye',
        value: 'Chair',
        langKey: 'planner_tab_chairs'
    },
    {
        label: 'Yatak',
        value: 'Bed',
        langKey: 'planner_tab_beds'
    },
    {
        label: 'Masa',
        value: 'Table',
        langKey: 'planner_tab_tables'
    },
    {
        label: 'Gardırop',
        value: 'Wardrobe',
        langKey: 'planner_tab_wardrobes'
    },
    {
        label: 'Aydınlatma',
        value: 'Lighting',
        langKey: 'planner_tab_lighting'
    },
    {
        label: 'Dekorasyon',
        value: 'Decoration',
        langKey: 'planner_tab_decor'
    }
];
function FurnitureLibrary({ onClose }) {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('All');
    // Filter logic
    const filteredProducts = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$planner$2e$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["plannerMockData"].filter((product)=>{
        const matchesTab = activeTab === 'All' || product.category === activeTab;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-[#FAFAF9] relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-5 border-b border-[#E8E3DC]/60 bg-white/95 backdrop-blur-md sticky top-0 z-20 shadow-[0_2px_10px_rgba(0,0,0,0.02)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-[15px] font-semibold text-[#1C1C1E] tracking-wide",
                        "data-lang-key": "planner_library",
                        children: "Kütüphane"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                        lineNumber: 35,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "text-[#999] hover:bg-[#F5F0EB] p-1.5 rounded-full hover:text-[#1C1C1E] transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                            lineNumber: 37,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                        lineNumber: 36,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                lineNumber: 34,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-4 border-b border-[#E8E3DC]/60 bg-white/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex items-center group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "absolute left-4 text-[#999] group-focus-within:text-[#C9A96E] transition-colors",
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Mobilya ara...",
                            "data-lang-key": "planner_search",
                            value: searchQuery,
                            onChange: (e)=>setSearchQuery(e.target.value),
                            className: "w-full bg-[#f8f6f3] border border-transparent rounded-full py-2.5 pl-11 pr-10 text-[13px] text-[#1C1C1E] focus:outline-none focus:bg-white focus:border-[#C9A96E] focus:ring-4 focus:ring-[#C9A96E]/10 transition-all placeholder-[#999]"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                            lineNumber: 45,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                    lineNumber: 43,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                lineNumber: 42,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex overflow-x-auto hide-scrollbar border-b border-[#E8E3DC]/60 bg-white px-2",
                children: CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab(cat.value),
                        className: `flex-shrink-0 px-4 py-3 text-[12px] whitespace-nowrap transition-all border-b-2 font-medium relative
                            ${activeTab === cat.value ? 'border-[#C9A96E] text-[#C9A96E]' : 'border-transparent text-[#999] hover:text-[#1C1C1E] hover:bg-[#FAFAF9] rounded-t-lg'}
                        `,
                        "data-lang-key": cat.langKey,
                        children: cat.label
                    }, cat.label, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                        lineNumber: 59,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-5 custom-scrollbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: filteredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$FurnitureCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                product: product
                            }, product.id, false, {
                                fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                                lineNumber: 79,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                        lineNumber: 77,
                        columnNumber: 17
                    }, this),
                    filteredProducts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-10 text-center text-[#999] text-[13px]",
                        "data-lang-key": "planner_not_found",
                        children: "Aradığınız kriterlere uygun ürün bulunamadı."
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                        lineNumber: 83,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
                lineNumber: 76,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/FurnitureLibrary.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
_s(FurnitureLibrary, "0JCn/FLfn49wWFLDvBe/kQXsnF4=");
_c = FurnitureLibrary;
var _c;
__turbopack_context__.k.register(_c, "FurnitureLibrary");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/RoomSettings.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoomSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$diagonal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveDiagonal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/move-diagonal.js [app-client] (ecmascript) <export default as MoveDiagonal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-client] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/plannerStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/GlobalContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCart.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const FLOOR_TYPES = [
    {
        id: 'wood',
        name: 'Parke',
        nameKey: 'planner_floor_wood',
        icon: '🟫'
    },
    {
        id: 'marble',
        name: 'Mermer',
        nameKey: 'planner_floor_marble',
        icon: '🩶'
    },
    {
        id: 'carpet',
        name: 'Halı',
        nameKey: 'planner_floor_carpet',
        icon: '🟤'
    },
    {
        id: 'concrete',
        name: 'Beton',
        nameKey: 'planner_floor_concrete',
        icon: '⬜'
    },
    {
        id: 'ceramic',
        name: 'Seramik',
        nameKey: 'planner_floor_ceramic',
        icon: '🟨'
    }
];
const WALL_COLORS = [
    '#FFFFFF',
    '#F5F0EB',
    '#E8E4E0',
    '#A3A3A3',
    '#D4B896',
    '#E0F2FE',
    '#0D9488',
    '#1E3A8A',
    '#FCE7F3',
    '#C2410C',
    '#4D7C0F',
    '#1C1C1E'
];
function RoomSettings({ onClose }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('room');
    // Store data
    const room = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "RoomSettings.usePlannerStore[room]": (s)=>s.room
    }["RoomSettings.usePlannerStore[room]"]);
    const updateRoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "RoomSettings.usePlannerStore[updateRoom]": (s)=>s.updateRoom
    }["RoomSettings.usePlannerStore[updateRoom]"]);
    const selectedItemId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "RoomSettings.usePlannerStore[selectedItemId]": (s)=>s.selectedItemId
    }["RoomSettings.usePlannerStore[selectedItemId]"]);
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "RoomSettings.usePlannerStore[items]": (s)=>s.items
    }["RoomSettings.usePlannerStore[items]"]);
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "RoomSettings.usePlannerStore[updateItem]": (s)=>s.updateItem
    }["RoomSettings.usePlannerStore[updateItem]"]);
    const removeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "RoomSettings.usePlannerStore[removeItem]": (s)=>s.removeItem
    }["RoomSettings.usePlannerStore[removeItem]"]);
    const duplicateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "RoomSettings.usePlannerStore[duplicateItem]": (s)=>s.duplicateItem
    }["RoomSettings.usePlannerStore[duplicateItem]"]);
    const selectedItem = items.find((i)=>i.id === selectedItemId);
    // If an item is selected, we could auto-switch to 'item' tab, but letting the user switch is fine.
    // For better UX, let's force switch when selectedItem changes to non-null
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "RoomSettings.useEffect": ()=>{
            if (selectedItemId) setActiveTab('item');
            else setActiveTab('room');
        }
    }["RoomSettings.useEffect"], [
        selectedItemId
    ]);
    const { t, formatPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"])();
    const { addItem } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const handleAddToCart = ()=>{
        if (!selectedItem || !selectedItem.product) return;
        addItem({
            id: selectedItem.product.id,
            name: selectedItem.product.name,
            brand: selectedItem.product.brand || 'SELIS Exclusive',
            price: selectedItem.product.price,
            image: selectedItem.product.image,
            href: selectedItem.product.originalHref || `/urun/${selectedItem.product.id}`
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-[#FAFAF9] relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col border-b border-[#E8E3DC]/60 bg-white/95 backdrop-blur-md sticky top-0 z-20 flex-shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.02)]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-5 pb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-[15px] font-semibold text-[#1C1C1E] tracking-wide",
                                "data-lang-key": "planner_properties",
                                children: t('planner_properties')
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                lineNumber: 65,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "text-[#999] hover:bg-[#F5F0EB] p-1.5 rounded-full hover:text-[#1C1C1E] transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                    lineNumber: 67,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                lineNumber: 66,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                        lineNumber: 64,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex px-5 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('room'),
                                className: `pb-3 text-[13px] font-medium transition-colors border-b-[2px] ${activeTab === 'room' ? 'border-[#C9A96E] text-[#1C1C1E]' : 'border-transparent text-[#999] hover:text-[#1C1C1E]'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "data-lang-key": "planner_prop_room",
                                    children: t('planner_prop_room')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                    lineNumber: 75,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                lineNumber: 71,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('item'),
                                className: `pb-3 text-[13px] font-medium transition-colors border-b-[2px] flex items-center gap-1.5 relative ${activeTab === 'item' ? 'border-[#C9A96E] text-[#1C1C1E]' : 'border-transparent text-[#999] hover:text-[#1C1C1E]'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-lang-key": "planner_prop_selected",
                                        children: t('planner_prop_selected')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                        lineNumber: 81,
                                        columnNumber: 25
                                    }, this),
                                    selectedItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-1.5 h-1.5 rounded-full bg-[#C9A96E] absolute -right-3 top-1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                        lineNumber: 82,
                                        columnNumber: 42
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                lineNumber: 77,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                        lineNumber: 70,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-5 custom-scrollbar relative",
                children: [
                    activeTab === 'room' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[12px] font-bold tracking-wider text-[#999] uppercase mb-4",
                                        "data-lang-key": "planner_dimensions",
                                        children: t('planner_dimensions')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                        lineNumber: 94,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[13px] font-medium text-[#1C1C1E]",
                                                                "data-lang-key": "planner_width",
                                                                children: t('planner_width')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                                lineNumber: 99,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[12px] text-[#666]",
                                                                children: [
                                                                    room.width / 100,
                                                                    " m"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                                lineNumber: 100,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: "200",
                                                        max: "1500",
                                                        step: "50",
                                                        value: room.width,
                                                        onChange: (e)=>updateRoom({
                                                                width: Number(e.target.value)
                                                            }),
                                                        className: "w-full h-1 bg-[#E8E3DC] rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                lineNumber: 97,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center mb-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "text-[13px] font-medium text-[#1C1C1E]",
                                                                "data-lang-key": "planner_length",
                                                                children: t('planner_length')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                                lineNumber: 111,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[12px] text-[#666]",
                                                                children: [
                                                                    room.depth / 100,
                                                                    " m"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                                lineNumber: 112,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "range",
                                                        min: "200",
                                                        max: "1200",
                                                        step: "50",
                                                        value: room.depth,
                                                        onChange: (e)=>updateRoom({
                                                                depth: Number(e.target.value)
                                                            }),
                                                        className: "w-full h-1 bg-[#E8E3DC] rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                        lineNumber: 114,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                lineNumber: 109,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                        lineNumber: 96,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                lineNumber: 93,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white p-5 rounded-xl border border-[#E8E3DC] shadow-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[11px] font-bold tracking-widest text-[#999] uppercase mb-4",
                                        "data-lang-key": "planner_floor_type",
                                        children: t('planner_floor_type')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                        lineNumber: 126,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: FLOOR_TYPES.map((floor)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>updateRoom({
                                                        floorType: floor.id
                                                    }),
                                                className: `flex flex-col items-center justify-center py-4 border rounded-lg transition-all duration-300
                                            ${room.floorType === floor.id ? 'border-[#C9A96E] bg-[#C9A96E]/5 ring-1 ring-[#C9A96E]' : 'border-[#E8E3DC] bg-white hover:border-[#C9A96E]/50 hover:shadow-md'}
                                        `,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-2xl mb-2 transition-transform duration-300 ${room.floorType === floor.id && 'scale-110'}`,
                                                        children: floor.icon
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 41
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-[12px] ${room.floorType === floor.id ? 'font-semibold text-[#1C1C1E]' : 'font-medium text-[#666]'}`,
                                                        "data-lang-key": floor.nameKey,
                                                        children: t(floor.nameKey) || floor.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, floor.id, true, {
                                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                lineNumber: 129,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                        lineNumber: 127,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                lineNumber: 125,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[12px] font-bold tracking-wider text-[#999] uppercase mb-4",
                                        "data-lang-key": "planner_wall_color",
                                        children: t('planner_wall_color')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                        lineNumber: 145,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-4 gap-3",
                                        children: WALL_COLORS.map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>updateRoom({
                                                        wallColor: color
                                                    }),
                                                style: {
                                                    backgroundColor: color
                                                },
                                                className: `w-10 h-10 rounded-full border-2 transition-transform duration-200
                                            ${room.wallColor === color ? 'border-[#1C1C1E] scale-110 shadow-md' : 'border-black/10 hover:scale-105'}
                                        `,
                                                title: color
                                            }, color, false, {
                                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                lineNumber: 148,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                        lineNumber: 146,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                lineNumber: 144,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                        lineNumber: 91,
                        columnNumber: 21
                    }, this),
                    activeTab === 'item' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-in fade-in slide-in-from-bottom-2 duration-300 h-full",
                        children: !selectedItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center justify-center h-full text-center text-[#999]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$diagonal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveDiagonal$3e$__["MoveDiagonal"], {
                                    size: 32,
                                    className: "mb-3 opacity-20"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                    lineNumber: 167,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[13px]",
                                    "data-lang-key": "planner_select_item",
                                    children: t('planner_select_item')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                    lineNumber: 168,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                            lineNumber: 166,
                            columnNumber: 29
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 bg-white p-4 rounded-xl border border-[#E8E3DC] shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-[#FAFAF9] rounded-lg flex items-center justify-center p-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: selectedItem.product.image,
                                                alt: "",
                                                className: "object-contain w-full h-full drop-shadow-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                lineNumber: 175,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                            lineNumber: 174,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-[14px] font-bold text-[#1C1C1E] leading-tight mb-1",
                                                    children: selectedItem.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 178,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[12px] text-[#999] font-medium",
                                                    children: [
                                                        selectedItem.width,
                                                        "×",
                                                        selectedItem.depth,
                                                        " cm"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                            lineNumber: 177,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                    lineNumber: 173,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>duplicateItem(selectedItem.id),
                                            className: "flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#E8E3DC] bg-white rounded-lg text-[13px] font-medium text-[#1C1C1E] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 41
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "data-lang-key": "planner_duplicate",
                                                    children: t('planner_duplicate')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 60
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                            lineNumber: 185,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>removeItem(selectedItem.id),
                                            className: "flex-1 flex items-center justify-center gap-2 py-2.5 border border-red-100 text-red-600 bg-red-50/50 rounded-lg text-[13px] font-medium hover:bg-red-50 hover:border-red-200 transition-all shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 41
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "data-lang-key": "planner_delete",
                                                    children: t('planner_delete')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 62
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                            lineNumber: 188,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                    lineNumber: 184,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-[12px] font-bold tracking-wider text-[#999] uppercase mb-3",
                                            "data-lang-key": "planner_pos_size",
                                            children: t('planner_pos_size')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                            lineNumber: 195,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] text-[#666] mb-1 block",
                                                            "data-lang-key": "planner_x_pos",
                                                            children: t('planner_x_pos')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                            lineNumber: 199,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: Math.round(selectedItem.x),
                                                            onChange: (e)=>updateItem(selectedItem.id, {
                                                                    x: Number(e.target.value)
                                                                }),
                                                            className: "w-full bg-white border border-[#E8E3DC] rounded-sm py-1.5 px-3 text-[13px]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] text-[#666] mb-1 block",
                                                            "data-lang-key": "planner_y_pos",
                                                            children: t('planner_y_pos')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                            lineNumber: 203,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: Math.round(selectedItem.y),
                                                            onChange: (e)=>updateItem(selectedItem.id, {
                                                                    y: Number(e.target.value)
                                                                }),
                                                            className: "w-full bg-white border border-[#E8E3DC] rounded-sm py-1.5 px-3 text-[13px]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                            lineNumber: 204,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                            lineNumber: 197,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] text-[#666] mb-1 block",
                                                            "data-lang-key": "planner_width_cm",
                                                            children: t('planner_width_cm')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: Math.round(selectedItem.width),
                                                            onChange: (e)=>updateItem(selectedItem.id, {
                                                                    width: Number(e.target.value)
                                                                }),
                                                            className: "w-full bg-white border border-[#E8E3DC] rounded-sm py-1.5 px-3 text-[13px]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] text-[#666] mb-1 block",
                                                            "data-lang-key": "planner_depth_cm",
                                                            children: t('planner_depth_cm')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            value: Math.round(selectedItem.depth),
                                                            onChange: (e)=>updateItem(selectedItem.id, {
                                                                    depth: Number(e.target.value)
                                                                }),
                                                            className: "w-full bg-white border border-[#E8E3DC] rounded-sm py-1.5 px-3 text-[13px]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                            lineNumber: 215,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                            lineNumber: 208,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[11px] text-[#666] flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                                                                    size: 12
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                                    lineNumber: 221,
                                                                    columnNumber: 112
                                                                }, this),
                                                                " ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    "data-lang-key": "planner_rotate",
                                                                    children: t('planner_rotate')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                                    lineNumber: 221,
                                                                    columnNumber: 135
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                            lineNumber: 221,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[12px]",
                                                            children: [
                                                                Math.round(selectedItem.rotation),
                                                                "°"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                            lineNumber: 222,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "range",
                                                    min: "0",
                                                    max: "360",
                                                    value: selectedItem.rotation,
                                                    onChange: (e)=>updateItem(selectedItem.id, {
                                                            rotation: Number(e.target.value)
                                                        }),
                                                    className: "w-full h-1 bg-[#E8E3DC] rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                            lineNumber: 219,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                    lineNumber: 194,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-4 border-t border-[#E8E3DC]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAddToCart,
                                        className: "w-full py-3 bg-[#1C1C1E] text-white rounded-sm text-[13px] font-semibold hover:bg-[#C9A96E] transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "data-lang-key": "planner_add_cart",
                                                children: t('planner_add_cart')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                                lineNumber: 238,
                                                columnNumber: 41
                                            }, this),
                                            " — ",
                                            formatPrice(selectedItem.product.price)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                        lineNumber: 234,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                                    lineNumber: 233,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                            lineNumber: 171,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                        lineNumber: 164,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
                lineNumber: 88,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/RoomSettings.tsx",
        lineNumber: 61,
        columnNumber: 9
    }, this);
}
_s(RoomSettings, "cCWqEPPe/Fcciuw4SCCmCKwIo7Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$GlobalContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGlobal"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = RoomSettings;
var _c;
__turbopack_context__.k.register(_c, "RoomSettings");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/PlacedItemControls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlacedItemControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-client] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
;
;
function PlacedItemControls({ item, onRotate, onDuplicate, onRemove, onResizeStart }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 pointer-events-none",
        style: {
            zIndex: 100
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-x-[-2px] inset-y-[-2px] border-[1.5px] border-[#C9A96E] rounded-sm ring-4 ring-[#C9A96E]/20"
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 17,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-[1.5px] border-[#C9A96E] rounded-full shadow-md pointer-events-auto cursor-nwse-resize hover:scale-125 transition-transform",
                onPointerDown: (e)=>onResizeStart('nw', e)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 20,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-[1.5px] border-[#C9A96E] rounded-full shadow-md pointer-events-auto cursor-nesw-resize hover:scale-125 transition-transform",
                onPointerDown: (e)=>onResizeStart('ne', e)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 21,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-[1.5px] border-[#C9A96E] rounded-full shadow-md pointer-events-auto cursor-nesw-resize hover:scale-125 transition-transform",
                onPointerDown: (e)=>onResizeStart('sw', e)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-[1.5px] border-[#C9A96E] rounded-full shadow-md pointer-events-auto cursor-nwse-resize hover:scale-125 transition-transform",
                onPointerDown: (e)=>onResizeStart('se', e)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 23,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-[5px] bg-white border-[1px] border-[#C9A96E] rounded-full pointer-events-auto cursor-ns-resize",
                onPointerDown: (e)=>onResizeStart('n', e)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 26,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-[5px] bg-white border-[1px] border-[#C9A96E] rounded-full pointer-events-auto cursor-ns-resize",
                onPointerDown: (e)=>onResizeStart('s', e)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 27,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-1/2 -left-1.5 -translate-y-1/2 w-[5px] h-4 bg-white border-[1px] border-[#C9A96E] rounded-full pointer-events-auto cursor-ew-resize",
                onPointerDown: (e)=>onResizeStart('w', e)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 28,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-1/2 -right-1.5 -translate-y-1/2 w-[5px] h-4 bg-white border-[1px] border-[#C9A96E] rounded-full pointer-events-auto cursor-ew-resize",
                onPointerDown: (e)=>onResizeStart('e', e)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 29,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-14 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/90 backdrop-blur-md border border-[#E8E3DC] rounded-full flex items-center justify-center text-[#1C1C1E] pointer-events-auto cursor-crosshair shadow-lg hover:scale-110 transition-transform relative group",
                onPointerDown: (e)=>{
                    e.stopPropagation();
                    const startY = e.clientY;
                    const startRot = item.rotation;
                    const handleMove = (moveEvent)=>{
                        const dy = moveEvent.clientY - startY;
                        onRotate(startRot + dy);
                    };
                    const handleUp = ()=>{
                        window.removeEventListener('pointermove', handleMove);
                        window.removeEventListener('pointerup', handleUp);
                    };
                    window.addEventListener('pointermove', handleMove);
                    window.addEventListener('pointerup', handleUp);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-px h-[23px] bg-[#C9A96E]/50 absolute top-[100%] left-1/2 -translate-x-1/2 group-hover:bg-[#C9A96E]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                        lineNumber: 52,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                        size: 14,
                        className: "group-hover:text-[#C9A96E] transition-colors"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-[80px] left-1/2 -translate-x-1/2 flex bg-[#1C1C1E]/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/10 overflow-hidden pointer-events-auto transform scale-90 sm:scale-100 origin-center transition-transform",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        title: "Çoğalt (Ctrl+D)",
                        onClick: (e)=>{
                            e.stopPropagation();
                            onDuplicate();
                        },
                        className: "px-4 py-2.5 hover:bg-[#C9A96E] text-white transition-colors border-r border-white/10 flex items-center justify-center gap-1.5 font-medium text-[11px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                                lineNumber: 59,
                                columnNumber: 21
                            }, this),
                            " Çoğalt"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                        lineNumber: 58,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        title: "Sil (Delete)",
                        onClick: (e)=>{
                            e.stopPropagation();
                            onRemove();
                        },
                        className: "px-4 py-2.5 hover:bg-red-500 text-white transition-colors flex items-center justify-center gap-1.5 font-medium text-[11px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                                lineNumber: 62,
                                columnNumber: 21
                            }, this),
                            " Sil"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                        lineNumber: 61,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
                lineNumber: 57,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/PlacedItemControls.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_c = PlacedItemControls;
var _c;
__turbopack_context__.k.register(_c, "PlacedItemControls");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/FurnitureItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FurnitureItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/plannerStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$FurnitureSVGs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/FurnitureSVGs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$PlacedItemControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/PlacedItemControls.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function FurnitureItem({ item, scale, isSelected, onSelect, onUpdate, onRemove, onDuplicate }) {
    _s();
    const [imageFailed, setImageFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const saveToHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "FurnitureItem.usePlannerStore[saveToHistory]": (s)=>s.saveToHistory
    }["FurnitureItem.usePlannerStore[saveToHistory]"]);
    const dragX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const dragY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    // Resize Logic
    const handleResizeStart = (edge, e)=>{
        e.stopPropagation();
        saveToHistory();
        const startX = e.clientX;
        const startY = e.clientY;
        const startW = item.width;
        const startH = item.depth;
        const startLeft = item.x;
        const startTop = item.y;
        // Note: resizing while rotated requires complex trigonometry.
        // For simplicity in a 2D web planner, we'll implement simple unrotated resizing math here,
        // or let the user reset rotation first. Given constraints, simple math:
        const handlePointerMove = (moveEv)=>{
            const dx = moveEv.clientX - startX;
            const dy = moveEv.clientY - startY;
            let newW = startW;
            let newH = startH;
            let newX = startLeft;
            let newY = startTop;
            if (edge.includes('e')) newW = Math.max(20, startW + dx);
            if (edge.includes('w')) {
                newW = Math.max(20, startW - dx);
                newX = startLeft + (startW - newW);
            }
            if (edge.includes('s')) newH = Math.max(20, startH + dy);
            if (edge.includes('n')) {
                newH = Math.max(20, startH - dy);
                newY = startTop + (startH - newH);
            }
            onUpdate({
                width: newW,
                depth: newH,
                x: newX,
                y: newY
            });
        };
        const handlePointerUp = ()=>{
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };
    const handleDragEnd = (e, info)=>{
        // Sürükleme bittiğinde toplam yer değiştirmeyi hesaplayıp store'u güncelliyoruz
        const dx = info.offset.x / scale;
        const dy = info.offset.y / scale;
        onUpdate({
            x: item.x + dx,
            y: item.y + dy
        });
        // Reset transform to avoid double displacement when re-render sets new left/top
        // Framer motion does this by default if we don't bind to motion values
        dragX.set(0);
        dragY.set(0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        ref: containerRef,
        drag: !item.isLocked,
        dragMomentum: false,
        dragElastic: 0,
        onDragStart: ()=>{
            onSelect();
            saveToHistory();
        },
        onDragEnd: handleDragEnd,
        onPointerDown: (e)=>{
            e.stopPropagation();
            onSelect();
        },
        style: {
            position: 'absolute',
            left: item.x * scale,
            top: item.y * scale,
            width: item.width * scale,
            height: item.depth * scale,
            rotate: item.rotation,
            zIndex: isSelected ? 50 : item.zIndex,
            touchAction: 'none',
            x: dragX,
            y: dragY
        },
        className: "group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-full h-full relative cursor-grab active:cursor-grabbing transition-all duration-300 ${!isSelected && 'group-hover:scale-[1.03]'}`,
                children: !imageFailed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: item.product?.image,
                    alt: "",
                    className: `w-full h-full object-contain pointer-events-none transition-all duration-300 ${isSelected ? 'drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]' : 'drop-shadow-[0_5px_15px_rgba(0,0,0,0.15)] group-hover:drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]'}`,
                    onError: ()=>setImageFailed(true),
                    draggable: false
                }, void 0, false, {
                    fileName: "[project]/src/components/RoomPlanner/FurnitureItem.tsx",
                    lineNumber: 132,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `w-full h-full pointer-events-none transition-all duration-300 ${isSelected ? 'drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)]' : 'opacity-95 drop-shadow-[0_5px_15px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]'}`,
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$FurnitureSVGs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFallbackSVG"])(item.category, {
                        width: '100%',
                        height: '100%',
                        fillColor: item.color,
                        strokeColor: '#1C1C1E'
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/RoomPlanner/FurnitureItem.tsx",
                    lineNumber: 140,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureItem.tsx",
                lineNumber: 130,
                columnNumber: 13
            }, this),
            isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$PlacedItemControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                item: item,
                onRotate: (deg)=>onUpdate({
                        rotation: deg
                    }),
                onDuplicate: ()=>onDuplicate(),
                onRemove: ()=>onRemove(),
                onResizeStart: handleResizeStart
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/FurnitureItem.tsx",
                lineNumber: 148,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/FurnitureItem.tsx",
        lineNumber: 101,
        columnNumber: 9
    }, this);
}
_s(FurnitureItem, "HnLqqfmLZfN9sWfGrNdiSdb/3qM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"]
    ];
});
_c = FurnitureItem;
var _c;
__turbopack_context__.k.register(_c, "FurnitureItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/PlannerCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlannerCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/plannerStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$FurnitureItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/FurnitureItem.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hand.js [app-client] (ecmascript) <export default as Hand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const MemoizedFurnitureItems = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function MemoizedFurnitureItems({ items, scale, selectedItemId, setSelectedItem, updateItem, removeItem, duplicateItem }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$FurnitureItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                item: item,
                scale: scale,
                isSelected: selectedItemId === item.id,
                onSelect: ()=>setSelectedItem(item.id),
                onUpdate: (updates)=>updateItem(item.id, updates),
                onRemove: ()=>removeItem(item.id),
                onDuplicate: ()=>duplicateItem(item.id)
            }, item.id, false, {
                fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                lineNumber: 27,
                columnNumber: 17
            }, this))
    }, void 0, false);
});
_c = MemoizedFurnitureItems;
function PlannerCanvas() {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const workspaceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Store
    const room = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[room]": (s)=>s.room
    }["PlannerCanvas.usePlannerStore[room]"]);
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[items]": (s)=>s.items
    }["PlannerCanvas.usePlannerStore[items]"]);
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[addItem]": (s)=>s.addItem
    }["PlannerCanvas.usePlannerStore[addItem]"]);
    const setSelectedItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[setSelectedItem]": (s)=>s.setSelectedItem
    }["PlannerCanvas.usePlannerStore[setSelectedItem]"]);
    const selectedItemId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[selectedItemId]": (s)=>s.selectedItemId
    }["PlannerCanvas.usePlannerStore[selectedItemId]"]);
    const removeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[removeItem]": (s)=>s.removeItem
    }["PlannerCanvas.usePlannerStore[removeItem]"]);
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[updateItem]": (s)=>s.updateItem
    }["PlannerCanvas.usePlannerStore[updateItem]"]);
    const showGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[showGrid]": (s)=>s.showGrid
    }["PlannerCanvas.usePlannerStore[showGrid]"]);
    const duplicateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[duplicateItem]": (s)=>s.duplicateItem
    }["PlannerCanvas.usePlannerStore[duplicateItem]"]);
    const undo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[undo]": (s)=>s.undo
    }["PlannerCanvas.usePlannerStore[undo]"]);
    const redo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[redo]": (s)=>s.redo
    }["PlannerCanvas.usePlannerStore[redo]"]);
    const toggleGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[toggleGrid]": (s)=>s.toggleGrid
    }["PlannerCanvas.usePlannerStore[toggleGrid]"]);
    const activeTool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"])({
        "PlannerCanvas.usePlannerStore[activeTool]": (s)=>s.activeTool
    }["PlannerCanvas.usePlannerStore[activeTool]"]);
    // Pan & Zoom State
    const [scale, setScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pan, setPan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [isPanning, setIsPanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Measure Tool State
    const [measureStart, setMeasureStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [measureEnd, setMeasureEnd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isMeasuring, setIsMeasuring] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlannerCanvas.useEffect": ()=>{
            if (activeTool !== 'measure') {
                setMeasureStart(null);
                setMeasureEnd(null);
                setIsMeasuring(false);
            }
        }
    }["PlannerCanvas.useEffect"], [
        activeTool
    ]);
    // Initial centering
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlannerCanvas.useEffect": ()=>{
            if (containerRef.current) {
                const containerW = containerRef.current.clientWidth;
                const containerH = containerRef.current.clientHeight;
                // Center the room at 100% scale
                setPan({
                    x: (containerW - room.width) / 2,
                    y: (containerH - room.depth) / 2
                });
                // Try to fit bounds
                const minScaleV = (containerH - 100) / room.depth;
                const minScaleH = (containerW - 100) / room.width;
                const bestScale = Math.min(minScaleV, minScaleH, 1);
                setScale(bestScale);
            }
        }
    }["PlannerCanvas.useEffect"], [
        room.width,
        room.depth
    ]);
    // Keyboard Shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlannerCanvas.useEffect": ()=>{
            const handleKeyDown = {
                "PlannerCanvas.useEffect.handleKeyDown": (e)=>{
                    // Delete
                    if ((e.key === 'Delete' || e.key === 'Backspace') && selectedItemId) {
                        // Ignore if we are typing in an input
                        if (document.activeElement?.tagName === 'INPUT') return;
                        removeItem(selectedItemId);
                    }
                    // Undo / Redo
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
                        if (e.shiftKey) redo();
                        else undo();
                    }
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
                        redo();
                    }
                    // Duplicate
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd' && selectedItemId) {
                        e.preventDefault();
                        duplicateItem(selectedItemId);
                    }
                    // Grid Toggle
                    if (e.key.toLowerCase() === 'g') {
                        // Ignore if we are typing in an input
                        if (document.activeElement?.tagName === 'INPUT') return;
                        toggleGrid();
                    }
                    // Escape to deselect
                    if (e.key === 'Escape') {
                        setSelectedItem(null);
                    }
                }
            }["PlannerCanvas.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "PlannerCanvas.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["PlannerCanvas.useEffect"];
        }
    }["PlannerCanvas.useEffect"], [
        selectedItemId,
        removeItem,
        undo,
        redo,
        duplicateItem,
        toggleGrid,
        setSelectedItem
    ]);
    // Zoom via wheel
    const handleWheel = (e)=>{
        if (e.ctrlKey || e.metaKey) {
            // Zoom (Pinch or Ctrl+Scroll)
            e.preventDefault();
            const delta = e.deltaY * -0.005;
            let newScale = scale + delta;
            newScale = Math.max(0.25, Math.min(newScale, 4)); // clamp 25% to 400%
            setScale(newScale);
        } else {
            // Pan via trackpad
            setPan((prev)=>({
                    x: prev.x - e.deltaX,
                    y: prev.y - e.deltaY
                }));
        }
    };
    // Pan via Middle Mouse Button or Space + Drag
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlannerCanvas.useEffect": ()=>{
            const handleSpaceDown = {
                "PlannerCanvas.useEffect.handleSpaceDown": (e)=>{
                    if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT') {
                        e.preventDefault();
                        document.body.style.cursor = 'grab';
                    }
                }
            }["PlannerCanvas.useEffect.handleSpaceDown"];
            const handleSpaceUp = {
                "PlannerCanvas.useEffect.handleSpaceUp": (e)=>{
                    if (e.code === 'Space') {
                        document.body.style.cursor = 'default';
                    }
                }
            }["PlannerCanvas.useEffect.handleSpaceUp"];
            window.addEventListener('keydown', handleSpaceDown);
            window.addEventListener('keyup', handleSpaceUp);
            return ({
                "PlannerCanvas.useEffect": ()=>{
                    window.removeEventListener('keydown', handleSpaceDown);
                    window.removeEventListener('keyup', handleSpaceUp);
                }
            })["PlannerCanvas.useEffect"];
        }
    }["PlannerCanvas.useEffect"], []);
    const handlePointerDown = (e)=>{
        if (e.button === 1 || e.shiftKey || e.button === 0 && activeTool === 'pan') {
            setIsPanning(true);
            e.currentTarget.setPointerCapture(e.pointerId);
        } else if (e.button === 0 && activeTool === 'measure') {
            if (workspaceRef.current) {
                const rect = workspaceRef.current.getBoundingClientRect();
                const x = (e.clientX - rect.left) / scale;
                const y = (e.clientY - rect.top) / scale;
                setMeasureStart({
                    x,
                    y
                });
                setMeasureEnd({
                    x,
                    y
                });
                setIsMeasuring(true);
                e.currentTarget.setPointerCapture(e.pointerId);
            }
        } else {
            // Left click on empty space = deselect
            if (e.target === workspaceRef.current || e.target === containerRef.current) {
                setSelectedItem(null);
            }
        }
    };
    const handlePointerMove = (e)=>{
        if (isPanning) {
            setPan((prev)=>({
                    x: prev.x + e.movementX,
                    y: prev.y + e.movementY
                }));
        } else if (isMeasuring && workspaceRef.current) {
            const rect = workspaceRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / scale;
            const y = (e.clientY - rect.top) / scale;
            setMeasureEnd({
                x,
                y
            });
        }
    };
    const handlePointerUp = (e)=>{
        if (isPanning) {
            setIsPanning(false);
            e.currentTarget.releasePointerCapture(e.pointerId);
        } else if (isMeasuring) {
            setIsMeasuring(false);
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    };
    // Handle Drop from Library
    const handleDrop = (e)=>{
        e.preventDefault();
        try {
            const dataStr = e.dataTransfer.getData('application/json');
            if (dataStr) {
                const product = JSON.parse(dataStr);
                // Calculate drop coordinates relative to the ROOM itself, considering scale and pan
                // The e.clientX is relative to the viewport.
                if (workspaceRef.current) {
                    const rect = workspaceRef.current.getBoundingClientRect();
                    // rect.left/top includes the scale and translations
                    const dropX = (e.clientX - rect.left) / scale;
                    const dropY = (e.clientY - rect.top) / scale;
                    const nanoid = Math.random().toString(36).substring(2, 9);
                    addItem({
                        id: nanoid,
                        productId: product.id,
                        name: product.name,
                        category: product.category,
                        // Center the item exactly where the mouse dropped
                        x: dropX - product.dimensions.width / 2,
                        y: dropY - product.dimensions.depth / 2,
                        width: product.dimensions.width,
                        depth: product.dimensions.depth,
                        rotation: 0,
                        color: '#1C1C1E',
                        isLocked: false,
                        zIndex: 10,
                        product: product
                    });
                }
            }
        } catch (err) {
            console.warn('Invalid drop payload', err);
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };
    const floorTextures = {
        'wood': 'url(/images/planner/wood-floor.jpg), linear-gradient(to right, rgba(212,184,150,0.2), rgba(212,184,150,0.2))',
        'marble': 'repeating-linear-gradient(45deg, rgba(232,228,224,1) 0%, rgba(240,238,236,1) 5%, rgba(232,228,224,1) 10%)',
        'carpet': 'radial-gradient(ellipse at center, rgba(160,150,140,0.2) 0%, rgba(140,130,120,0.4) 100%), repeating-radial-gradient(rgba(0,0,0,0.03) 1px, transparent 2px)',
        'concrete': 'linear-gradient(rgba(200,196,192,1), rgba(200,196,192,1)), url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=)',
        'ceramic': 'repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 80px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.03) 0, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 80px)'
    };
    const floorBg = floorTextures[room.floorType] || floorTextures['wood'];
    const floorColor = room.floorType === 'carpet' ? '#B5A090' : room.floorType === 'ceramic' ? '#E5E0DB' : 'transparent';
    // 50cm grid pattern
    const renderGrid = ()=>{
        if (!showGrid) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                id: "grid-pattern",
                width: 50 * scale,
                height: 50 * scale,
                patternUnits: "userSpaceOnUse",
                x: pan.x % (50 * scale),
                y: pan.y % (50 * scale),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: `M ${50 * scale} 0 L 0 0 0 ${50 * scale}`,
                    fill: "none",
                    stroke: "rgba(0,0,0,0.08)",
                    strokeWidth: "1",
                    strokeDasharray: "4 4"
                }, void 0, false, {
                    fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                    lineNumber: 288,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                lineNumber: 280,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
            lineNumber: 279,
            columnNumber: 13
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: `flex-1 relative bg-[#F8F6F3] overflow-hidden hover:opacity-100 ${activeTool === 'pan' ? isPanning ? 'cursor-grabbing' : 'cursor-grab' : activeTool === 'measure' ? 'cursor-crosshair' : 'cursor-default'} h-full`,
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onWheel: handleWheel,
        onDragOver: (e)=>e.preventDefault(),
        onDrop: handleDrop,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: workspaceRef,
                className: "absolute inset-0 transition-transform duration-75 ease-out",
                style: {
                    transform: `translate(${pan.x}px, ${pan.y}px)`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative bg-white transition-all duration-300 ring-1 ring-black/5",
                    style: {
                        width: room.width * scale,
                        height: room.depth * scale,
                        backgroundColor: room.wallColor,
                        // Visual floor style
                        backgroundImage: room.floorType === 'wood' ? 'url(/images/planner/wood-floor.jpg)' : floorBg,
                        backgroundSize: room.floorType === 'wood' ? '200px' : room.floorType === 'ceramic' ? '113px' : 'auto',
                        boxShadow: '0 40px 100px -20px rgba(0,0,0,0.25), inset 0 0 60px rgba(0,0,0,0.06)',
                        borderRadius: '4px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "absolute inset-0 w-full h-full pointer-events-none",
                            children: [
                                renderGrid(),
                                showGrid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    width: "100%",
                                    height: "100%",
                                    fill: "url(#grid-pattern)"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                    lineNumber: 337,
                                    columnNumber: 38
                                }, this),
                                measureStart && measureEnd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: measureStart.x,
                                            y1: measureStart.y,
                                            x2: measureEnd.x,
                                            y2: measureEnd.y,
                                            stroke: "#C9A96E",
                                            strokeWidth: "2",
                                            strokeDasharray: "4 4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                            lineNumber: 342,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: measureStart.x,
                                            cy: measureStart.y,
                                            r: "4",
                                            fill: "#C9A96E"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                            lineNumber: 347,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: measureEnd.x,
                                            cy: measureEnd.y,
                                            r: "4",
                                            fill: "#C9A96E"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                            lineNumber: 348,
                                            columnNumber: 33
                                        }, this),
                                        (()=>{
                                            const dist = Math.sqrt(Math.pow(measureEnd.x - measureStart.x, 2) + Math.pow(measureEnd.y - measureStart.y, 2));
                                            if (dist < 5) return null;
                                            const midX = (measureStart.x + measureEnd.x) / 2;
                                            const midY = (measureStart.y + measureEnd.y) / 2;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                transform: `translate(${midX}, ${midY})`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                        x: "-35",
                                                        y: "-12",
                                                        width: "70",
                                                        height: "24",
                                                        rx: "12",
                                                        fill: "#1C1C1E"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                        x: "0",
                                                        y: "4",
                                                        fill: "white",
                                                        fontSize: "11",
                                                        fontWeight: "bold",
                                                        textAnchor: "middle",
                                                        children: [
                                                            Math.round(dist),
                                                            " cm"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                                lineNumber: 357,
                                                columnNumber: 41
                                            }, this);
                                        })()
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                    lineNumber: 341,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                            lineNumber: 335,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MemoizedFurnitureItems, {
                            items: items,
                            scale: scale,
                            selectedItemId: selectedItemId,
                            setSelectedItem: setSelectedItem,
                            updateItem: updateItem,
                            removeItem: removeItem,
                            duplicateItem: duplicateItem
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                            lineNumber: 370,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                    lineNumber: 321,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                lineNumber: 313,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-8 right-8 flex flex-col gap-3 z-40",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setScale((s)=>Math.min(s + 0.1, 3)),
                        className: "w-11 h-11 bg-white/90 backdrop-blur-md shadow-xl rounded-full flex items-center justify-center text-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white transition-all duration-300 border border-white/50 group",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            size: 18,
                            className: "group-active:scale-90 transition-transform"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                            lineNumber: 385,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                        lineNumber: 384,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg text-[11px] font-bold text-center border border-white/50 text-[#1C1C1E] mx-auto w-full",
                        children: [
                            "%",
                            Math.round(scale * 100)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                        lineNumber: 387,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setScale((s)=>Math.max(s - 0.1, 0.2)),
                        className: "w-11 h-11 bg-white/90 backdrop-blur-md shadow-xl rounded-full flex items-center justify-center text-[#1C1C1E] hover:bg-[#1C1C1E] hover:text-white transition-all duration-300 border border-white/50 group",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                            size: 18,
                            className: "group-active:scale-90 transition-transform"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                            lineNumber: 391,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                        lineNumber: 390,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                lineNumber: 383,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-8 left-8 pointer-events-none z-40",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#1C1C1E]/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 shadow-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[10px] text-white/50 uppercase font-bold tracking-widest mb-3",
                            "data-lang-key": "planner_controls",
                            children: "KONTROLLER"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                            lineNumber: 398,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[12px] text-white flex items-center gap-2 font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"], {
                                            size: 14,
                                            className: "text-[#C9A96E]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                            lineNumber: 400,
                                            columnNumber: 102
                                        }, this),
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-lang-target": "title",
                                            title: "Pan: Boşluk + Sürükle | Shift + Tıkla",
                                            children: "Pan: Boşluk / Shift"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                            lineNumber: 400,
                                            columnNumber: 148
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                    lineNumber: 400,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-px h-4 bg-white/15"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                    lineNumber: 401,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[12px] text-white flex items-center gap-2 font-medium",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"], {
                                            size: 14,
                                            className: "text-[#C9A96E]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                            lineNumber: 402,
                                            columnNumber: 102
                                        }, this),
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-lang-target": "title",
                                            title: "Zoom: Scroll | Ctrl + Scroll",
                                            children: "Zoom: Scroll"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                            lineNumber: 402,
                                            columnNumber: 157
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                                    lineNumber: 402,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                            lineNumber: 399,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                    lineNumber: 397,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
                lineNumber: 396,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/PlannerCanvas.tsx",
        lineNumber: 303,
        columnNumber: 9
    }, this);
}
_s(PlannerCanvas, "rlv9MUb4YhTTxXpCTVFxfqIlMGg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$plannerStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlannerStore"]
    ];
});
_c1 = PlannerCanvas;
var _c, _c1;
__turbopack_context__.k.register(_c, "MemoizedFurnitureItems");
__turbopack_context__.k.register(_c1, "PlannerCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/RoomPlanner/RoomPlannerApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoomPlannerApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
// We will build these shortly
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$PlannerToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/PlannerToolbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$PlannerBottomBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/PlannerBottomBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$FurnitureLibrary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/FurnitureLibrary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$RoomSettings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/RoomSettings.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$PlannerCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/RoomPlanner/PlannerCanvas.tsx [app-client] (ecmascript)");
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
function RoomPlannerApp() {
    _s();
    const [leftOpen, setLeftOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [rightOpen, setRightOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full flex flex-col bg-[#FAFAF9]",
        style: {
            fontFamily: 'var(--font-sans, "Inter", sans-serif)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$PlannerToolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                leftOpen: leftOpen,
                setLeftOpen: setLeftOpen,
                rightOpen: rightOpen,
                setRightOpen: setRightOpen
            }, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].aside, {
                        initial: {
                            width: 280
                        },
                        animate: {
                            width: leftOpen ? 280 : 0
                        },
                        transition: {
                            duration: 0.3,
                            ease: 'easeOut'
                        },
                        className: "h-full bg-white border-r border-[#E8E3DC] flex-shrink-0 z-20 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-[280px] h-full flex flex-col",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$FurnitureLibrary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClose: ()=>setLeftOpen(false)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                                lineNumber: 38,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                            lineNumber: 37,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 relative bg-[#F0EDE8] overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$PlannerCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                            lineNumber: 44,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                        lineNumber: 43,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].aside, {
                        initial: {
                            width: 300
                        },
                        animate: {
                            width: rightOpen ? 300 : 0
                        },
                        transition: {
                            duration: 0.3,
                            ease: 'easeOut'
                        },
                        className: "h-full bg-white border-l border-[#E8E3DC] flex-shrink-0 z-20 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-[300px] h-full flex flex-col",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$RoomSettings$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                onClose: ()=>setRightOpen(false)
                            }, void 0, false, {
                                fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                                lineNumber: 55,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                            lineNumber: 54,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                        lineNumber: 48,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                lineNumber: 28,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$RoomPlanner$2f$PlannerBottomBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
                lineNumber: 62,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RoomPlanner/RoomPlannerApp.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, this);
}
_s(RoomPlannerApp, "n1NS7sycToBvoPxGpQeQ4cd8DC8=");
_c = RoomPlannerApp;
var _c;
__turbopack_context__.k.register(_c, "RoomPlannerApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_RoomPlanner_9c21a520._.js.map