'use client';

import { useState, useCallback, useMemo } from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { getCollisions } from '../hooks/useCollision';
import * as THREE from 'three';

interface Props {
    item: import('../types/planner.types').PlacedFurniture;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onMove: (id: string, pos: { x: number; z: number }) => void;
}

export function FurnitureModel({ item, isSelected, onSelect, onMove }: Props) {
    const [hovered, setHovered] = useState(false);
    const w = item.dimensions.width * item.scale;
    const h = item.dimensions.height * item.scale;
    const d = item.dimensions.depth * item.scale;

    const color = useMemo(() => new THREE.Color(item.color), [item.color]);
    const emissive = hovered || isSelected ? 0.08 : 0;

    return (
        <group
            position={[item.position.x, h / 2, item.position.z]}
            rotation={[0, (item.rotation * Math.PI) / 180, 0]}
        >
            {/* Main body */}
            <mesh
                castShadow receiveShadow
                onClick={(e) => { e.stopPropagation(); onSelect(item.id); }}
                onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
            >
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial
                    color={color} roughness={0.6} metalness={0.1}
                    emissive={isSelected ? '#2196F3' : color}
                    emissiveIntensity={emissive}
                />
            </mesh>

            {/* Selection outline */}
            {isSelected && (
                <mesh>
                    <boxGeometry args={[w + 0.04, h + 0.04, d + 0.04]} />
                    <meshBasicMaterial color="#2196F3" wireframe transparent opacity={0.5} />
                </mesh>
            )}

            {/* Ground shadow/halo */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -h / 2 + 0.01, 0]}>
                <planeGeometry args={[w + 0.1, d + 0.1]} />
                <meshBasicMaterial
                    color={isSelected ? '#2196F3' : '#000'}
                    transparent opacity={isSelected ? 0.12 : 0.06}
                />
            </mesh>
        </group>
    );
}
