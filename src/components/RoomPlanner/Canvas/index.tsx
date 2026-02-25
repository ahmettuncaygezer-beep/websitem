'use client';

import dynamic from 'next/dynamic';
import { usePlannerStore } from '../store/plannerStore';
import { Scene2D } from './Scene2D';

const Scene3D = dynamic(() => import('./Scene3D').then((m) => ({ default: m.Scene3D })), { ssr: false });

export function CanvasArea() {
    const viewMode = usePlannerStore((s) => s.viewMode);

    return (
        <div className="relative w-full h-full overflow-hidden" style={{ background: '#FAFAF8' }}>
            {viewMode === '2d' && <Scene2D />}
            {(viewMode === '3d' || viewMode === 'fpv') && <Scene3D />}

            {viewMode === 'fpv' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-sm"
                    style={{ background: 'rgba(28,28,30,0.8)', color: 'white', fontSize: 12, zIndex: 10 }}>
                    WASD ile hareket et · Mouse ile bak · ESC ile çık
                </div>
            )}
        </div>
    );
}
