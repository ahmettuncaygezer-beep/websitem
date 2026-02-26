import { create } from 'zustand';
import { PlacedFurniture, RoomSettings, PlannerHistoryState } from './planner.types';

interface PlannerState {
    // Current State
    items: PlacedFurniture[];
    room: RoomSettings;
    selectedItemId: string | null;

    // History (Undo / Redo)
    past: PlannerHistoryState[];
    future: PlannerHistoryState[];

    // UI State
    is2DMode: boolean; // default true
    showGrid: boolean; // default true

    // Actions - Items
    addItem: (item: PlacedFurniture) => void;
    updateItem: (id: string, updates: Partial<PlacedFurniture>) => void;
    removeItem: (id: string) => void;
    duplicateItem: (id: string) => void;
    clearItems: () => void;
    setSelectedItem: (id: string | null) => void;

    // Actions - Room
    updateRoom: (updates: Partial<RoomSettings>) => void;

    // Actions - UI
    toggleGrid: () => void;
    toggle3DMode: () => void; // maybe later

    // History Actions
    undo: () => void;
    redo: () => void;
    saveToHistory: () => void;

    // Save/Load raw state string for LocalStorage
    loadState: (data: any) => void;
}

const MAX_HISTORY = 50;

const DEFAULT_ROOM: RoomSettings = {
    width: 500, // 5m
    depth: 400, // 4m
    height: 280, // 2.8m
    floorType: 'wood',
    wallColor: '#FFFFFF',
    unit: 'meter'
};

export const usePlannerStore = create<PlannerState>((set, get) => ({
    items: [],
    room: DEFAULT_ROOM,
    selectedItemId: null,
    past: [],
    future: [],
    is2DMode: true,
    showGrid: true,

    saveToHistory: () => {
        const { items, room, past } = get();
        // Save current state to past, discarding future
        const currentState: PlannerHistoryState = {
            items: [...items],
            room: { ...room }
        };
        const newPast = [...past, currentState];
        if (newPast.length > MAX_HISTORY) {
            newPast.shift(); // remove oldest
        }
        set({ past: newPast, future: [] });
    },

    undo: () => {
        const { past, future, items, room } = get();
        if (past.length === 0) return;

        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        const currentState: PlannerHistoryState = {
            items: JSON.parse(JSON.stringify(items)),
            room: JSON.parse(JSON.stringify(room))
        };

        set({
            items: previous.items,
            room: previous.room,
            past: newPast,
            future: [currentState, ...future],
            selectedItemId: null // clear selection on undo to avoid bugs
        });
    },

    redo: () => {
        const { past, future, items, room } = get();
        if (future.length === 0) return;

        const next = future[0];
        const newFuture = future.slice(1);

        const currentState: PlannerHistoryState = {
            items: JSON.parse(JSON.stringify(items)),
            room: JSON.parse(JSON.stringify(room))
        };

        set({
            items: next.items,
            room: next.room,
            past: [...past, currentState],
            future: newFuture,
            selectedItemId: null
        });
    },

    addItem: (item) => {
        get().saveToHistory();
        set((state) => ({ items: [...state.items, item], selectedItemId: item.id }));
    },

    updateItem: (id, updates) => {
        // For continuous dragging operations, we usually don't save to history every pixel.
        // We might want UI components to call saveToHistory() *before* drag start instead.
        set((state) => ({
            items: state.items.map(item => item.id === id ? { ...item, ...updates } : item)
        }));
    },

    removeItem: (id) => {
        get().saveToHistory();
        set((state) => ({
            items: state.items.filter(item => item.id !== id),
            selectedItemId: state.selectedItemId === id ? null : state.selectedItemId
        }));
    },

    duplicateItem: (id) => {
        const state = get();
        const item = state.items.find(i => i.id === id);
        if (!item) return;

        state.saveToHistory();
        const newId = Math.random().toString(36).substr(2, 9);
        const duplicate: PlacedFurniture = {
            ...item,
            id: newId,
            x: item.x + 20, // offset slightly
            y: item.y + 20
        };
        set({ items: [...state.items, duplicate], selectedItemId: newId });
    },

    clearItems: () => {
        get().saveToHistory();
        set({ items: [], selectedItemId: null });
    },

    setSelectedItem: (id) => set({ selectedItemId: id }),

    updateRoom: (updates) => {
        // Usually, we want to save history for room changes too, especially dimensions
        get().saveToHistory();
        set((state) => ({ room: { ...state.room, ...updates } }));
    },

    toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
    toggle3DMode: () => set((state) => ({ is2DMode: !state.is2DMode })),

    loadState: (data) => {
        if (data && data.items && data.room) {
            set({
                items: data.items,
                room: data.room,
                past: [],
                future: [],
                selectedItemId: null
            });
        }
    }
}));
