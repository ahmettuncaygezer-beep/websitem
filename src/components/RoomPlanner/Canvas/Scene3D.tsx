'use client';

import { Canvas as R3FCanvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Room } from './Room';
import { Lighting } from './Lighting';
import { CameraControls } from './CameraControls';
import { FurnitureModel } from './FurnitureModel';
import { usePlannerStore } from '../store/plannerStore';

export function Scene3D() {
    const { room, furniture, selectedId, selectFurniture, updateFurniture } = usePlannerStore();

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        try {
            const data = JSON.parse(e.dataTransfer.getData('application/json'));
            usePlannerStore.getState().addFurniture(data, { x: room.width / 2, y: 0, z: room.depth / 2 });
        } catch { /* ignore */ }
    };

    return (
        <div className="w-full h-full" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
            <R3FCanvas
                shadows
                camera={{ position: [room.width + 2, room.height + 3, room.depth + 2], fov: 50 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                dpr={[1, 2]}
                onClick={() => selectFurniture(null)}
            >
                <color attach="background" args={['#E8E4DF']} />
                <fog attach="fog" args={['#E8E4DF', 12, 25]} />

                <Lighting />
                <Room />
                <CameraControls />

                {furniture.filter((f) => f.isVisible).map((f) => (
                    <FurnitureModel
                        key={f.id}
                        item={f}
                        isSelected={f.id === selectedId}
                        onSelect={selectFurniture}
                        onMove={(id, pos) => updateFurniture(id, { position: { x: pos.x, y: 0, z: pos.z } })}
                    />
                ))}
            </R3FCanvas>
        </div>
    );
}
