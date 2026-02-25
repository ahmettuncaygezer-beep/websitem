'use client';

import { useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { usePlannerStore } from '../store/plannerStore';

export function CameraControls() {
    const room = usePlannerStore((s) => s.room);
    const controlsRef = useRef<any>(null);

    return (
        <OrbitControls
            ref={controlsRef}
            enablePan
            enableZoom
            enableRotate
            maxPolarAngle={Math.PI / 2.1}
            minDistance={2}
            maxDistance={15}
            target={[room.width / 2, 0, room.depth / 2]}
        />
    );
}
