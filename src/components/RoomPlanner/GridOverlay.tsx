import React from 'react';
import { usePlannerStore } from './plannerStore';

export default function GridOverlay() {
    const showGrid = usePlannerStore((s) => s.showGrid);
    const room = usePlannerStore((s) => s.room);

    if (!showGrid) return null;

    // A subtle 50cm grid
    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                backgroundSize: '50px 50px', // Assuming 1px = 1cm, so 50px = 50cm
                backgroundPosition: 'center',
                opacity: 0.8
            }}
        />
    );
}
