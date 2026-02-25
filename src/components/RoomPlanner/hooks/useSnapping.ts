import type { PlacedFurniture, RoomDimensions } from '../types/planner.types';

const SNAP_DIST = 0.15; // metres

interface SnapResult {
    x: number;
    z: number;
    guides: { axis: 'x' | 'z'; pos: number; type: 'edge' | 'center' }[];
}

export function calcSnap(
    dragging: { x: number; z: number; w: number; d: number },
    others: PlacedFurniture[],
    room: RoomDimensions,
    enabled: boolean,
): SnapResult {
    if (!enabled) return { x: dragging.x, z: dragging.z, guides: [] };

    let sx = dragging.x;
    let sz = dragging.z;
    const guides: SnapResult['guides'] = [];
    const hw = dragging.w / 2;
    const hd = dragging.d / 2;

    // Snap to room center
    const cx = room.width / 2;
    const cz = room.depth / 2;
    if (Math.abs(dragging.x - cx) < SNAP_DIST) { sx = cx; guides.push({ axis: 'x', pos: cx, type: 'center' }); }
    if (Math.abs(dragging.z - cz) < SNAP_DIST) { sz = cz; guides.push({ axis: 'z', pos: cz, type: 'center' }); }

    // Snap to walls
    if (Math.abs(dragging.x - hw) < SNAP_DIST) { sx = hw; guides.push({ axis: 'x', pos: 0, type: 'edge' }); }
    if (Math.abs(dragging.x + hw - room.width) < SNAP_DIST) { sx = room.width - hw; guides.push({ axis: 'x', pos: room.width, type: 'edge' }); }
    if (Math.abs(dragging.z - hd) < SNAP_DIST) { sz = hd; guides.push({ axis: 'z', pos: 0, type: 'edge' }); }
    if (Math.abs(dragging.z + hd - room.depth) < SNAP_DIST) { sz = room.depth - hd; guides.push({ axis: 'z', pos: room.depth, type: 'edge' }); }

    // Snap to other furniture edges and centers
    for (const other of others) {
        const ow = (other.rotation % 180 === 0 ? other.dimensions.width : other.dimensions.depth) * other.scale / 2;
        const od = (other.rotation % 180 === 0 ? other.dimensions.depth : other.dimensions.width) * other.scale / 2;

        // X alignment
        if (Math.abs(dragging.x - other.position.x) < SNAP_DIST) { sx = other.position.x; guides.push({ axis: 'x', pos: other.position.x, type: 'center' }); }
        // Z alignment
        if (Math.abs(dragging.z - other.position.z) < SNAP_DIST) { sz = other.position.z; guides.push({ axis: 'z', pos: other.position.z, type: 'center' }); }
    }

    return { x: sx, z: sz, guides };
}
