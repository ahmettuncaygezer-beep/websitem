'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { usePlannerStore } from '../store/plannerStore';

export function Room() {
    const { room } = usePlannerStore();
    const { width, depth, height, wallColor, floorColor, floorType } = room;

    // Simple procedural floor texture
    const floorMat = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 512;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = floorColor;
        ctx.fillRect(0, 0, 512, 512);

        if (floorType === 'parquet') {
            ctx.strokeStyle = 'rgba(0,0,0,0.08)';
            for (let i = 0; i < 512; i += 32) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke(); }
            for (let i = 0; i < 512; i += 64) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke(); }
        } else if (floorType === 'marble') {
            ctx.strokeStyle = 'rgba(0,0,0,0.03)';
            for (let i = 0; i < 20; i++) {
                ctx.beginPath(); ctx.moveTo(Math.random() * 512, Math.random() * 512);
                ctx.lineTo(Math.random() * 512, Math.random() * 512); ctx.stroke();
            }
        }

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(width, depth);
        return tex;
    }, [floorColor, floorType, width, depth]);

    return (
        <group>
            {/* Floor */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[width / 2, 0, depth / 2]}>
                <planeGeometry args={[width, depth]} />
                <meshStandardMaterial map={floorMat} roughness={0.8} metalness={0.05} />
            </mesh>

            {/* Back wall */}
            <mesh receiveShadow castShadow position={[width / 2, height / 2, 0]}>
                <boxGeometry args={[width, height, 0.08]} />
                <meshStandardMaterial color={wallColor} roughness={0.9} />
            </mesh>

            {/* Left wall */}
            <mesh receiveShadow castShadow position={[0, height / 2, depth / 2]}>
                <boxGeometry args={[0.08, height, depth]} />
                <meshStandardMaterial color={wallColor} roughness={0.9} />
            </mesh>

            {/* Right wall (transparent for visibility) */}
            <mesh position={[width, height / 2, depth / 2]}>
                <boxGeometry args={[0.08, height, depth]} />
                <meshStandardMaterial color={wallColor} roughness={0.9} transparent opacity={0.3} />
            </mesh>

            {/* Front wall (mostly transparent) */}
            <mesh position={[width / 2, height / 2, depth]}>
                <boxGeometry args={[width, height, 0.08]} />
                <meshStandardMaterial color={wallColor} roughness={0.9} transparent opacity={0.15} />
            </mesh>
        </group>
    );
}
