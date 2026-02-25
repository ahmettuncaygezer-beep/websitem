'use client';

import { usePlannerStore } from '../store/plannerStore';

export function Lighting() {
    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[5, 8, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={20}
                shadow-camera-near={0.1}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <pointLight position={[-3, 3, -3]} intensity={0.3} />
            <hemisphereLight args={['#F5F0EB', '#C4A882', 0.3]} />
        </>
    );
}
