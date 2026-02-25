'use client';

import { useState, useCallback, useEffect } from 'react';
import { Undo2, Redo2, Grid3x3, Ruler, Magnet, Trash2, Save, Link, FileText } from 'lucide-react';
import { usePlannerStore } from '../store/plannerStore';
import { useHistoryStore } from '../store/historyStore';
import { useExport } from '../hooks/useExport';
import type { ViewMode } from '../types/planner.types';

const VIEWS: { id: ViewMode; label: string; icon: string }[] = [
    { id: '2d', label: '2D', icon: '⊡' },
    { id: '3d', label: '3D', icon: '◇' },
    { id: 'fpv', label: 'FPV', icon: '👁' },
];

interface Props {
    onSave: () => void;
    onShare: () => void;
}

export function Toolbar({ onSave, onShare }: Props) {
    const { viewMode, setViewMode, showGrid, toggleGrid, showMeasurements, toggleMeasurements, snapEnabled, toggleSnap, clearAll, planName, setPlanName, furniture, room } = usePlannerStore();
    const { canUndo, canRedo, undo, redo } = useHistoryStore();
    const { exportPDF } = useExport();
    const [editing, setEditing] = useState(false);
    const [nameVal, setNameVal] = useState(planName);

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                const prev = undo(usePlannerStore.getState().furniture);
                if (prev) usePlannerStore.setState({ furniture: prev });
            }
            if (e.ctrlKey && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
                e.preventDefault();
                const next = redo(usePlannerStore.getState().furniture);
                if (next) usePlannerStore.setState({ furniture: next });
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [undo, redo]);

    const handleUndo = () => {
        const prev = undo(usePlannerStore.getState().furniture);
        if (prev) usePlannerStore.setState({ furniture: prev });
    };
    const handleRedo = () => {
        const next = redo(usePlannerStore.getState().furniture);
        if (next) usePlannerStore.setState({ furniture: next });
    };

    const handlePDF = () => {
        exportPDF(planName, room, furniture.map((f) => ({ name: f.name, dimensions: f.dimensions, price: f.price })));
    };

    const toggleBtn = (active: boolean, onClick: () => void, icon: React.ReactNode, title: string) => (
        <button onClick={onClick} title={title}
            className="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-150"
            style={{ background: active ? '#F5F0EB' : 'transparent', color: active ? '#1C1C1E' : '#999', border: 'none', cursor: 'pointer' }}>
            {icon}
        </button>
    );

    return (
        <div className="flex items-center justify-between px-4 h-14" style={{ background: 'white', borderBottom: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>

            {/* LEFT — Logo + Plan name */}
            <div className="flex items-center gap-3">
                <span className="text-[14px] font-bold tracking-wider" style={{ color: '#C9A96E' }}>MAISON</span>
                <span style={{ color: '#DDD' }}>|</span>
                {editing ? (
                    <input value={nameVal}
                        onChange={(e) => setNameVal(e.target.value)}
                        onBlur={() => { setPlanName(nameVal); setEditing(false); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { setPlanName(nameVal); setEditing(false); } }}
                        className="text-[14px] font-medium px-1 py-0.5 outline-none rounded-sm"
                        style={{ color: '#1C1C1E', border: '1px solid #C9A96E', width: 180 }}
                        autoFocus />
                ) : (
                    <button onClick={() => { setNameVal(planName); setEditing(true); }}
                        className="text-[14px] font-medium" style={{ color: '#1C1C1E', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {planName}
                    </button>
                )}
            </div>

            {/* CENTER — View toggle + tools */}
            <div className="flex items-center gap-4">
                {/* View mode toggle */}
                <div className="flex rounded-md overflow-hidden" style={{ border: '1px solid #E8E3DC' }}>
                    {VIEWS.map((v) => (
                        <button key={v.id} onClick={() => setViewMode(v.id)}
                            className="px-3 py-1.5 text-[12px] font-medium transition-colors duration-150"
                            style={{
                                background: viewMode === v.id ? '#1C1C1E' : 'white',
                                color: viewMode === v.id ? 'white' : '#999',
                                border: 'none', cursor: 'pointer',
                            }}>
                            {v.icon} {v.label}
                        </button>
                    ))}
                </div>

                <span style={{ color: '#E8E3DC' }}>|</span>

                {/* Undo/Redo */}
                <button onClick={handleUndo} disabled={!canUndo()} title="Geri Al (Ctrl+Z)"
                    className="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-150"
                    style={{ background: 'transparent', color: canUndo() ? '#1C1C1E' : '#DDD', border: 'none', cursor: canUndo() ? 'pointer' : 'not-allowed' }}>
                    <Undo2 size={16} />
                </button>
                <button onClick={handleRedo} disabled={!canRedo()} title="Yenile (Ctrl+Y)"
                    className="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-150"
                    style={{ background: 'transparent', color: canRedo() ? '#1C1C1E' : '#DDD', border: 'none', cursor: canRedo() ? 'pointer' : 'not-allowed' }}>
                    <Redo2 size={16} />
                </button>

                <span style={{ color: '#E8E3DC' }}>|</span>

                {toggleBtn(showGrid, toggleGrid, <Grid3x3 size={16} />, 'Izgara')}
                {toggleBtn(showMeasurements, toggleMeasurements, <Ruler size={16} />, 'Ölçüler')}
                {toggleBtn(snapEnabled, toggleSnap, <Magnet size={16} />, 'Snap')}
            </div>

            {/* RIGHT — Actions */}
            <div className="flex items-center gap-2">
                <button onClick={clearAll} title="Temizle"
                    className="flex items-center gap-1 px-3 py-1.5 text-[12px] font-medium rounded-sm transition-colors duration-150"
                    style={{ color: '#999', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <Trash2 size={14} /> Temizle
                </button>
                <button onClick={onSave} title="Kaydet"
                    className="flex items-center gap-1 px-4 py-1.5 text-[12px] font-medium rounded-sm transition-colors duration-200"
                    style={{ color: '#1C1C1E', background: 'transparent', border: '1px solid #1C1C1E', cursor: 'pointer' }}>
                    <Save size={14} /> Kaydet
                </button>
                <button onClick={onShare} title="Paylaş"
                    className="flex items-center gap-1 px-3 py-1.5 text-[12px] font-medium rounded-sm transition-colors duration-150"
                    style={{ color: '#999', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                    <Link size={14} /> Paylaş
                </button>
                <button onClick={handlePDF} title="PDF İndir"
                    className="flex items-center gap-1 px-4 py-1.5 text-[12px] font-semibold rounded-sm transition-colors duration-200"
                    style={{ color: '#1C1C1E', background: '#C9A96E', border: 'none', cursor: 'pointer' }}>
                    <FileText size={14} /> PDF İndir
                </button>
            </div>
        </div>
    );
}
