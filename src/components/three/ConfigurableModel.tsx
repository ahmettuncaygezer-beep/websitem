'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, Color } from 'three';
import * as THREE from 'three';

interface ConfigurableModelProps {
    fabricColor?: string;
    legColor?: string;
    armrestType?: string;
}

export function ConfigurableModel({
    fabricColor = '#E5E4E2',
    legColor = '#D2B48C',
    armrestType = 'standard'
}: ConfigurableModelProps) {
    const meshRef = useRef<THREE.Group>(null);

    // Create materials dynamically based on props
    const fabricMaterial = useMemo(() => new MeshStandardMaterial({
        color: new Color(fabricColor),
        roughness: 0.8,
        metalness: 0.1,
    }), [fabricColor]);

    const woodMaterial = useMemo(() => new MeshStandardMaterial({
        color: new Color(legColor),
        roughness: 0.3,
        metalness: 0.0,
    }), [legColor]);

    return (
        <group ref={meshRef} dispose={null} scale={1.5}>
            {/* Simulated Sofa / Chair Base */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow material={fabricMaterial}>
                <boxGeometry args={[2, 0.8, 1.2]} />
            </mesh>

            {/* Backrest */}
            <mesh position={[0, 0.6, -0.45]} castShadow receiveShadow material={fabricMaterial}>
                <boxGeometry args={[2, 1.2, 0.3]} />
            </mesh>

            {/* Armrests */}
            <mesh
                position={[-1.15, 0.3, 0]}
                castShadow
                receiveShadow
                material={fabricMaterial}
            >
                <boxGeometry args={[armrestType === 'wide' ? 0.4 : 0.2, 0.6, 1.2]} />
            </mesh>
            <mesh
                position={[1.15, 0.3, 0]}
                castShadow
                receiveShadow
                material={fabricMaterial}
            >
                <boxGeometry args={[armrestType === 'wide' ? 0.4 : 0.2, 0.6, 1.2]} />
            </mesh>

            {/* Legs */}
            {[[-0.8, -0.6, 0.4], [0.8, -0.6, 0.4], [-0.8, -0.6, -0.4], [0.8, -0.6, -0.4]].map((pos, i) => (
                <mesh
                    key={i}
                    position={pos as [number, number, number]}
                    castShadow
                    material={woodMaterial}
                >
                    <cylinderGeometry args={[0.05, 0.03, 0.4]} />
                </mesh>
            ))}
        </group>
    );
}
