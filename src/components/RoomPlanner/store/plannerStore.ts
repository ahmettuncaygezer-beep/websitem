import { create } from 'zustand';
import type { RoomDimensions, PlacedFurniture, ViewMode, FurnitureCatalogItem } from '../types/planner.types';

interface PlannerStore {
    room: RoomDimensions;
    furniture: PlacedFurniture[];
    selectedId: string | null;
    viewMode: ViewMode;
    showGrid: boolean;
    showMeasurements: boolean;
    snapEnabled: boolean;
    planName: string;

    setRoom: (room: Partial<RoomDimensions>) => void;
    addFurniture: (item: FurnitureCatalogItem, position?: { x: number; y: number; z: number }) => void;
    removeFurniture: (id: string) => void;
    updateFurniture: (id: string, updates: Partial<PlacedFurniture>) => void;
    selectFurniture: (id: string | null) => void;
    rotateFurniture: (id: string, deg: number) => void;
    duplicateFurniture: (id: string) => void;
    setViewMode: (mode: ViewMode) => void;
    toggleGrid: () => void;
    toggleMeasurements: () => void;
    toggleSnap: () => void;
    setPlanName: (name: string) => void;
    clearAll: () => void;
    loadPlan: (state: { room: RoomDimensions; furniture: PlacedFurniture[]; planName: string }) => void;
}

export const usePlannerStore = create<PlannerStore>((set, get) => ({
    room: { width: 5, depth: 4, height: 2.6, wallColor: '#F5F0EB', floorType: 'parquet', floorColor: '#C4A882' },
    furniture: [],
    selectedId: null,
    viewMode: '2d',
    showGrid: true,
    showMeasurements: true,
    snapEnabled: true,
    planName: 'Yeni Oda Planım',

    setRoom: (updates) => set((s) => ({ room: { ...s.room, ...updates } })),

    addFurniture: (item, position) => {
        const r = get().room;
        const pos = position ?? { x: r.width / 2, y: 0, z: r.depth / 2 };
        const placed: PlacedFurniture = {
            id: crypto.randomUUID(),
            furnitureId: item.id,
            name: item.name,
            position: pos,
            rotation: 0,
            color: item.colors[0] ?? '#999',
            fabric: '',
            scale: 1,
            isLocked: false,
            isSelected: false,
            isVisible: true,
            dimensions: item.dimensions,
            price: item.price,
            thumbnail: item.thumbnail,
            category: item.category,
        };
        set((s) => ({ furniture: [...s.furniture, placed], selectedId: placed.id }));
    },

    removeFurniture: (id) => set((s) => ({
        furniture: s.furniture.filter((f) => f.id !== id),
        selectedId: s.selectedId === id ? null : s.selectedId,
    })),

    updateFurniture: (id, updates) => set((s) => ({
        furniture: s.furniture.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })),

    selectFurniture: (id) => set({ selectedId: id }),

    rotateFurniture: (id, deg) => set((s) => ({
        furniture: s.furniture.map((f) => (f.id === id ? { ...f, rotation: (f.rotation + deg) % 360 } : f)),
    })),

    duplicateFurniture: (id) => {
        const item = get().furniture.find((f) => f.id === id);
        if (!item) return;
        const clone: PlacedFurniture = {
            ...item,
            id: crypto.randomUUID(),
            position: { x: item.position.x + 0.5, y: item.position.y, z: item.position.z + 0.5 },
            isSelected: false,
            isLocked: false,
        };
        set((s) => ({ furniture: [...s.furniture, clone], selectedId: clone.id }));
    },

    setViewMode: (mode) => set({ viewMode: mode }),
    toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
    toggleMeasurements: () => set((s) => ({ showMeasurements: !s.showMeasurements })),
    toggleSnap: () => set((s) => ({ snapEnabled: !s.snapEnabled })),
    setPlanName: (name) => set({ planName: name }),
    clearAll: () => set({ furniture: [], selectedId: null }),
    loadPlan: (state) => set({ room: state.room, furniture: state.furniture, planName: state.planName, selectedId: null }),
}));
