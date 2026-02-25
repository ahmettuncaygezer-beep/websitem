export interface RoomDimensions {
    width: number;
    depth: number;
    height: number;
    wallColor: string;
    floorType: 'parquet' | 'marble' | 'carpet' | 'concrete' | 'ceramic';
    floorColor: string;
}

export interface PlacedFurniture {
    id: string;
    furnitureId: string;
    name: string;
    position: { x: number; y: number; z: number };
    rotation: number;
    color: string;
    fabric: string;
    scale: number;
    isLocked: boolean;
    isSelected: boolean;
    isVisible: boolean;
    dimensions: { width: number; depth: number; height: number };
    price: number;
    thumbnail: string;
    category: string;
}

export interface FurnitureCatalogItem {
    id: string;
    name: string;
    category: string;
    price: number;
    thumbnail: string;
    dimensions: { width: number; depth: number; height: number };
    colors: string[];
}

export type ViewMode = '3d' | '2d' | 'fpv';

export interface PlannerState {
    room: RoomDimensions;
    furniture: PlacedFurniture[];
    selectedId: string | null;
    viewMode: ViewMode;
    showGrid: boolean;
    showMeasurements: boolean;
    snapEnabled: boolean;
    planName: string;
}
