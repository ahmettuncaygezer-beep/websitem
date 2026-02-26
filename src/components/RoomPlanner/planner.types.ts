export type FurnitureCategory =
    | 'Sofa'
    | 'Chair'
    | 'Bed'
    | 'Table'
    | 'Wardrobe'
    | 'Lighting'
    | 'Decoration';

export type FloorType = 'wood' | 'marble' | 'carpet' | 'concrete' | 'ceramic';

export interface BoxDimensions {
    width: number; // in cm
    depth: number; // in cm
    height?: number; // optionally in cm
}

export interface PlannerProduct {
    id: string; // Product id
    name: string;
    category: FurnitureCategory;
    dimensions: BoxDimensions;
    price: number;
    image: string; // The image path (might fail if not existing)
    brand?: string;
    originalHref?: string;
}

export interface PlacedFurniture {
    id: string; // Unique nanoid instance id
    productId: string; // Maps to PlannerProduct.id
    name: string;
    category: FurnitureCategory;
    x: number; // in cm
    y: number; // in cm
    width: number; // in cm
    depth: number; // in cm
    rotation: number; // degrees 0-360
    color: string; // hex
    isLocked: boolean;
    zIndex: number;
    // We attach the full product info so the canvas item can render properly
    product: PlannerProduct;
}

export interface RoomSettings {
    width: number; // cm
    depth: number; // cm
    height: number; // cm
    floorType: FloorType;
    wallColor: string; // hex
    unit: 'meter' | 'cm' | 'feet';
}

export interface PlannerHistoryState {
    items: PlacedFurniture[];
    room: RoomSettings;
}
