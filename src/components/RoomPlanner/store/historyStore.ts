import { create } from 'zustand';
import type { PlacedFurniture } from '../types/planner.types';

interface HistoryStore {
    past: PlacedFurniture[][];
    future: PlacedFurniture[][];
    push: (state: PlacedFurniture[]) => void;
    undo: (current: PlacedFurniture[]) => PlacedFurniture[] | null;
    redo: (current: PlacedFurniture[]) => PlacedFurniture[] | null;
    canUndo: () => boolean;
    canRedo: () => boolean;
}

const MAX = 50;

export const useHistoryStore = create<HistoryStore>((set, get) => ({
    past: [],
    future: [],

    push: (state) => set((s) => ({
        past: [...s.past.slice(-MAX + 1), state],
        future: [],
    })),

    undo: (current) => {
        const { past } = get();
        if (past.length === 0) return null;
        const prev = past[past.length - 1];
        set((s) => ({
            past: s.past.slice(0, -1),
            future: [current, ...s.future].slice(0, MAX),
        }));
        return prev;
    },

    redo: (current) => {
        const { future } = get();
        if (future.length === 0) return null;
        const next = future[0];
        set((s) => ({
            past: [...s.past, current].slice(-MAX),
            future: s.future.slice(1),
        }));
        return next;
    },

    canUndo: () => get().past.length > 0,
    canRedo: () => get().future.length > 0,
}));
