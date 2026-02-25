import type { PlacedFurniture, RoomDimensions } from '../types/planner.types';

export function checkCollision(a: PlacedFurniture, b: PlacedFurniture): boolean {
    const aRad = a.rotation * (Math.PI / 180);
    const bRad = b.rotation * (Math.PI / 180);
    const aW = (a.rotation % 180 === 0 ? a.dimensions.width : a.dimensions.depth) * a.scale / 2;
    const aD = (a.rotation % 180 === 0 ? a.dimensions.depth : a.dimensions.width) * a.scale / 2;
    const bW = (b.rotation % 180 === 0 ? b.dimensions.width : b.dimensions.depth) * b.scale / 2;
    const bD = (b.rotation % 180 === 0 ? b.dimensions.depth : b.dimensions.width) * b.scale / 2;

    return !(
        a.position.x + aW < b.position.x - bW ||
        a.position.x - aW > b.position.x + bW ||
        a.position.z + aD < b.position.z - bD ||
        a.position.z - aD > b.position.z + bD
    );
}

export function getCollisions(furniture: PlacedFurniture[]): Set<string> {
    const colliding = new Set<string>();
    for (let i = 0; i < furniture.length; i++) {
        for (let j = i + 1; j < furniture.length; j++) {
            if (checkCollision(furniture[i], furniture[j])) {
                colliding.add(furniture[i].id);
                colliding.add(furniture[j].id);
            }
        }
    }
    return colliding;
}

export function clampToRoom(pos: { x: number; z: number }, dim: { width: number; depth: number }, rotation: number, room: RoomDimensions, scale: number) {
    const w = (rotation % 180 === 0 ? dim.width : dim.depth) * scale / 2;
    const d = (rotation % 180 === 0 ? dim.depth : dim.width) * scale / 2;
    return {
        x: Math.max(w, Math.min(room.width - w, pos.x)),
        z: Math.max(d, Math.min(room.depth - d, pos.z)),
    };
}
