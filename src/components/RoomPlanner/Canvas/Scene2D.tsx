'use client';

import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { usePlannerStore } from '../store/plannerStore';
import { getCollisions, clampToRoom } from '../hooks/useCollision';
import { calcSnap } from '../hooks/useSnapping';

const SCALE = 80; // px per metre

export function Scene2D() {
    const { room, furniture, selectedId, showGrid, showMeasurements, snapEnabled } = usePlannerStore();
    const { selectFurniture, updateFurniture } = usePlannerStore();
    const svgRef = useRef<SVGSVGElement>(null);
    const [dragging, setDragging] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, z: 0 });
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 40, y: 40 });
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const [guides, setGuides] = useState<{ axis: 'x' | 'z'; pos: number; type: string }[]>([]);

    const collisions = useMemo(() => getCollisions(furniture), [furniture]);
    const W = room.width * SCALE;
    const D = room.depth * SCALE;

    const toSvg = useCallback((mx: number, mz: number) => ({ x: mx * SCALE, y: mz * SCALE }), []);

    // Mouse → metre coords
    const toMetres = useCallback((clientX: number, clientY: number) => {
        const svg = svgRef.current;
        if (!svg) return { x: 0, z: 0 };
        const rect = svg.getBoundingClientRect();
        return {
            x: (clientX - rect.left - pan.x) / (SCALE * zoom),
            z: (clientY - rect.top - pan.y) / (SCALE * zoom),
        };
    }, [pan, zoom]);

    // Drag
    const handleMouseDown = useCallback((id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const f = furniture.find((fi) => fi.id === id);
        if (!f || f.isLocked) return;
        selectFurniture(id);
        const m = toMetres(e.clientX, e.clientY);
        setDragOffset({ x: m.x - f.position.x, z: m.z - f.position.z });
        setDragging(id);
    }, [furniture, selectFurniture, toMetres]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (isPanning) {
            setPan((p) => ({ x: p.x + e.movementX, y: p.y + e.movementY }));
            return;
        }
        if (!dragging) return;
        const f = furniture.find((fi) => fi.id === dragging);
        if (!f) return;
        const m = toMetres(e.clientX, e.clientY);
        let nx = m.x - dragOffset.x;
        let nz = m.z - dragOffset.z;

        const effW = (f.rotation % 180 === 0 ? f.dimensions.width : f.dimensions.depth) * f.scale;
        const effD = (f.rotation % 180 === 0 ? f.dimensions.depth : f.dimensions.width) * f.scale;
        const snap = calcSnap({ x: nx, z: nz, w: effW, d: effD }, furniture.filter((o) => o.id !== dragging), room, snapEnabled);
        nx = snap.x; nz = snap.z;
        setGuides(snap.guides);

        const clamped = clampToRoom({ x: nx, z: nz }, f.dimensions, f.rotation, room, f.scale);
        updateFurniture(dragging, { position: { x: clamped.x, y: 0, z: clamped.z } });
    }, [dragging, isPanning, dragOffset, furniture, room, snapEnabled, toMetres, updateFurniture]);

    const handleMouseUp = useCallback(() => {
        setDragging(null);
        setIsPanning(false);
        setGuides([]);
    }, []);

    // Zoom wheel
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            setZoom((z) => Math.max(0.3, Math.min(3, z - e.deltaY * 0.001)));
        };
        svg.addEventListener('wheel', onWheel, { passive: false });
        return () => svg.removeEventListener('wheel', onWheel);
    }, []);

    // Space pan
    useEffect(() => {
        const down = (e: KeyboardEvent) => { if (e.code === 'Space') setIsPanning(true); };
        const up = (e: KeyboardEvent) => { if (e.code === 'Space') setIsPanning(false); };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
    }, []);

    // Drop from sidebar
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        try {
            const data = JSON.parse(e.dataTransfer.getData('application/json'));
            const m = toMetres(e.clientX, e.clientY);
            const clamped = clampToRoom({ x: m.x, z: m.z }, data.dimensions, 0, room, 1);
            usePlannerStore.getState().addFurniture(data, { x: clamped.x, y: 0, z: clamped.z });
        } catch { /* ignore */ }
    }, [room, toMetres]);

    return (
        <svg
            ref={svgRef}
            className="w-full h-full"
            style={{ background: '#FAFAF8', cursor: isPanning ? 'move' : dragging ? 'grabbing' : 'default' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => { if (!dragging) selectFurniture(null); }}
        >
            <g transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}>
                {/* Grid */}
                {showGrid && Array.from({ length: Math.ceil(room.width / 0.5) + 1 }).map((_, i) => (
                    <line key={`gx${i}`} x1={i * 0.5 * SCALE} y1={0} x2={i * 0.5 * SCALE} y2={D}
                        stroke={i % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.04)'} strokeWidth={i % 2 === 0 ? 0.5 : 0.3} />
                ))}
                {showGrid && Array.from({ length: Math.ceil(room.depth / 0.5) + 1 }).map((_, i) => (
                    <line key={`gz${i}`} x1={0} y1={i * 0.5 * SCALE} x2={W} y2={i * 0.5 * SCALE}
                        stroke={i % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.04)'} strokeWidth={i % 2 === 0 ? 0.5 : 0.3} />
                ))}

                {/* Room outline */}
                <rect x={0} y={0} width={W} height={D} fill="white" stroke="#1C1C1E" strokeWidth={3} />

                {/* Room dimensions */}
                {showMeasurements && (
                    <>
                        <text x={W / 2} y={-8} textAnchor="middle" fill="#C9A96E" fontSize={11} fontWeight={500}>{room.width.toFixed(1)} m</text>
                        <text x={-8} y={D / 2} textAnchor="middle" fill="#C9A96E" fontSize={11} fontWeight={500} transform={`rotate(-90, -8, ${D / 2})`}>{room.depth.toFixed(1)} m</text>
                    </>
                )}

                {/* Snap guides */}
                {guides.map((g, i) => (
                    <line key={i}
                        x1={g.axis === 'x' ? g.pos * SCALE : 0} y1={g.axis === 'z' ? g.pos * SCALE : 0}
                        x2={g.axis === 'x' ? g.pos * SCALE : W} y2={g.axis === 'z' ? g.pos * SCALE : D}
                        stroke={g.type === 'center' ? '#9C27B0' : '#2196F3'} strokeWidth={0.8} strokeDasharray="4 4" />
                ))}

                {/* Furniture */}
                {furniture.filter((f) => f.isVisible).map((f) => {
                    const effW = (f.rotation % 180 === 0 ? f.dimensions.width : f.dimensions.depth) * f.scale;
                    const effD = (f.rotation % 180 === 0 ? f.dimensions.depth : f.dimensions.width) * f.scale;
                    const px = f.position.x * SCALE;
                    const pz = f.position.z * SCALE;
                    const isColliding = collisions.has(f.id);
                    const isSelected = f.id === selectedId;

                    return (
                        <g key={f.id}
                            transform={`translate(${px},${pz}) rotate(${f.rotation})`}
                            onMouseDown={(e) => handleMouseDown(f.id, e)}
                            style={{ cursor: f.isLocked ? 'not-allowed' : 'grab' }}
                        >
                            {/* Shadow */}
                            <rect x={-effW / 2 * SCALE} y={-effD / 2 * SCALE} width={effW * SCALE} height={effD * SCALE} rx={3}
                                fill={isColliding ? 'rgba(229,57,53,0.15)' : f.color} fillOpacity={0.3}
                                stroke={isSelected ? '#2196F3' : isColliding ? '#E53935' : 'rgba(0,0,0,0.15)'}
                                strokeWidth={isSelected ? 2 : 1}
                                strokeDasharray={isSelected ? '6 3' : 'none'} />

                            {/* Label */}
                            <text x={0} y={4} textAnchor="middle" fill="#1C1C1E" fontSize={9} fontWeight={500} pointerEvents="none">
                                {f.name.length > 12 ? f.name.slice(0, 12) + '…' : f.name}
                            </text>

                            {/* Measurements */}
                            {showMeasurements && isSelected && (
                                <>
                                    <text x={0} y={effD / 2 * SCALE + 14} textAnchor="middle" fill="#C9A96E" fontSize={9}>
                                        {(f.dimensions.width * 100).toFixed(0)} cm
                                    </text>
                                    <text x={effW / 2 * SCALE + 8} y={4} textAnchor="start" fill="#C9A96E" fontSize={9} transform={`rotate(90, ${effW / 2 * SCALE + 8}, 4)`}>
                                        {(f.dimensions.depth * 100).toFixed(0)} cm
                                    </text>
                                </>
                            )}

                            {/* Rotation handle */}
                            {isSelected && !f.isLocked && (
                                <circle cx={0} cy={-effD / 2 * SCALE - 16} r={5} fill="#C9A96E" stroke="white" strokeWidth={1.5} style={{ cursor: 'pointer' }}
                                    onMouseDown={(e) => {
                                        e.stopPropagation();
                                        usePlannerStore.getState().rotateFurniture(f.id, 90);
                                    }} />
                            )}

                            {/* Lock icon */}
                            {f.isLocked && (
                                <text x={effW / 2 * SCALE - 2} y={-effD / 2 * SCALE + 12} fontSize={10}>🔒</text>
                            )}
                        </g>
                    );
                })}
            </g>

            {/* Zoom indicator */}
            <text x="100%" y="100%" dx={-12} dy={-8} textAnchor="end" fill="#999" fontSize={11}>
                {Math.round(zoom * 100)}%
            </text>
        </svg>
    );
}
