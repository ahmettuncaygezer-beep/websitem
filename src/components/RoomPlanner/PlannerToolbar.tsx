'use client';

import React from 'react';
import { usePlannerStore } from './plannerStore';
import { Undo2, Redo2, MousePointer2, Hand, Ruler, Square, DoorOpen, Expand, Share2, Save, PanelLeftClose, PanelRightClose, PanelLeftOpen, PanelRightOpen, Grid3X3 } from 'lucide-react';
import { useGlobal } from '@/context/GlobalContext';

interface Props {
    leftOpen: boolean;
    setLeftOpen: (v: boolean) => void;
    rightOpen: boolean;
    setRightOpen: (v: boolean) => void;
}

export default function PlannerToolbar({ leftOpen, setLeftOpen, rightOpen, setRightOpen }: Props) {
    const undo = usePlannerStore(s => s.undo);
    const redo = usePlannerStore(s => s.redo);
    const past = usePlannerStore(s => s.past);
    const future = usePlannerStore(s => s.future);
    const showGrid = usePlannerStore(s => s.showGrid);
    const toggleGrid = usePlannerStore(s => s.toggleGrid);
    const saveToHistory = usePlannerStore(s => s.saveToHistory);

    const [isMounted, setIsMounted] = React.useState(false);
    const [saveOpen, setSaveOpen] = React.useState(false);
    const [shareOpen, setShareOpen] = React.useState(false);
    const [summaryOpen, setSummaryOpen] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSaveClick = () => {
        saveToHistory();
        setSaveOpen(true);
    };

    const handleShareClick = () => {
        setShareOpen(true);
    };

    const handleFinishClick = () => {
        setSummaryOpen(true);
    };

    const { t } = useGlobal();

    return (
        <header className="h-[52px] bg-white border-b border-[#E8E3DC] px-4 flex items-center justify-between flex-shrink-0 z-30">
            {/* LEFT ACTIONS */}
            <div className="flex items-center gap-2">
                <button onClick={() => setLeftOpen(!leftOpen)} className="p-1.5 hover:bg-[#F5F0EB] rounded-sm text-[#666] transition-colors" data-lang-key="planner_toggle_library" data-lang-target="title" title={t('planner_toggle_library')}>
                    {isMounted ? (leftOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />) : <PanelLeftOpen size={18} />}
                </button>

                <div className="w-px h-4 bg-[#E8E3DC] mx-1" />

                <button onClick={undo} disabled={past.length === 0} className={`p-1.5 rounded-sm transition-colors ${past.length > 0 ? 'text-[#1C1C1E] hover:bg-[#F5F0EB]' : 'text-[#CCC] cursor-not-allowed'}`} data-lang-key="planner_undo" data-lang-target="title" title={t('planner_undo')}>
                    <Undo2 size={18} />
                </button>
                <button onClick={redo} disabled={future.length === 0} className={`p-1.5 rounded-sm transition-colors ${future.length > 0 ? 'text-[#1C1C1E] hover:bg-[#F5F0EB]' : 'text-[#CCC] cursor-not-allowed'}`} data-lang-key="planner_redo" data-lang-target="title" title={t('planner_redo')}>
                    <Redo2 size={18} />
                </button>

                <div className="w-px h-4 bg-[#E8E3DC] mx-1" />

                {/* Tools (visual only right now, functionality later) */}
                <button className="p-1.5 bg-[#F5F0EB] text-[#C9A96E] rounded-sm transition-colors" data-lang-key="planner_tool_select" data-lang-target="title" title={t('planner_tool_select')}>
                    <MousePointer2 size={18} />
                </button>
                <button className="p-1.5 hover:bg-[#F5F0EB] text-[#666] rounded-sm transition-colors" data-lang-key="planner_tool_pan" data-lang-target="title" title={t('planner_tool_pan')}>
                    <Hand size={18} />
                </button>
                <button className="p-1.5 hover:bg-[#F5F0EB] text-[#666] rounded-sm transition-colors" data-lang-key="planner_tool_measure" data-lang-target="title" title={t('planner_tool_measure')}>
                    <Ruler size={18} />
                </button>

                <div className="w-px h-4 bg-[#E8E3DC] mx-1" />

                <button className="p-1.5 hover:bg-[#F5F0EB] text-[#666] rounded-sm transition-colors" data-lang-key="planner_toggle_grid" data-lang-target="title" title={t('planner_toggle_grid')} onClick={toggleGrid}>
                    <Grid3X3 size={18} className={isMounted && showGrid ? "text-[#C9A96E]" : ""} />
                </button>
            </div>

            {/* CENTER TITLE */}
            <div className="hidden md:flex items-center gap-4">
                <span className="text-[12px] font-medium tracking-wide text-[#999] uppercase" data-lang-key="planner_title">
                    {t('planner_title')}
                </span>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
                <button
                    onClick={handleShareClick}
                    className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-[#1C1C1E] hover:bg-[#F5F0EB] rounded-sm transition-colors border border-transparent"
                >
                    <Share2 size={14} /> <span data-lang-key="planner_share">{t('planner_share')}</span>
                </button>
                <button
                    onClick={handleSaveClick}
                    className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-[#1C1C1E] border border-[#E8E3DC] hover:border-[#C9A96E] rounded-sm transition-colors"
                >
                    <Save size={14} /> <span data-lang-key="planner_save">{t('planner_save')}</span>
                </button>
                <button
                    onClick={handleFinishClick}
                    className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-medium bg-[#1C1C1E] text-white hover:bg-[#C9A96E] rounded-sm transition-colors"
                >
                    <span data-lang-key="planner_finish">{t('planner_finish')} &rarr;</span>
                </button>

                <div className="w-px h-4 bg-[#E8E3DC] mx-1" />

                <button onClick={() => setRightOpen(!rightOpen)} className="p-1.5 hover:bg-[#F5F0EB] rounded-sm text-[#666] transition-colors" data-lang-key="planner_toggle_settings" data-lang-target="title" title={t('planner_toggle_settings')}>
                    {rightOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
                </button>
            </div>

            {/* MODALS */}
            {typeof window !== 'undefined' && (
                <>
                    <SavePlanModal open={saveOpen} onClose={() => setSaveOpen(false)} />
                    <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
                    <PlanSummaryModal open={summaryOpen} onClose={() => setSummaryOpen(false)} />
                </>
            )}
        </header>
    );
}

import { SavePlanModal } from './Modals/SavePlanModal';
import { ShareModal } from './Modals/ShareModal';
import PlanSummaryModal from './Modals/PlanSummaryModal';
