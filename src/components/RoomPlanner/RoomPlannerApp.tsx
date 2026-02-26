'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePlannerStore } from './plannerStore';

// We will build these shortly
import PlannerToolbar from './PlannerToolbar';
import PlannerBottomBar from './PlannerBottomBar';
import FurnitureLibrary from './FurnitureLibrary';
import RoomSettings from './RoomSettings';
import PlannerCanvas from './PlannerCanvas';

export default function RoomPlannerApp() {
    const [leftOpen, setLeftOpen] = useState(true);
    const [rightOpen, setRightOpen] = useState(true);

    return (
        <div className="relative w-full h-full flex flex-col bg-[#FAFAF9]" style={{ fontFamily: 'var(--font-sans, "Inter", sans-serif)' }}>

            {/* TOP TOOLBAR */}
            <PlannerToolbar
                leftOpen={leftOpen} setLeftOpen={setLeftOpen}
                rightOpen={rightOpen} setRightOpen={setRightOpen}
            />

            {/* MAIN WORKSPACE */}
            <div className="flex-1 flex overflow-hidden relative">

                {/* LEFT PANEL: LIBRARY */}
                <motion.aside
                    initial={{ width: 280 }}
                    animate={{ width: leftOpen ? 280 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-full bg-white border-r border-[#E8E3DC] flex-shrink-0 z-20 overflow-hidden"
                >
                    <div className="w-[280px] h-full flex flex-col">
                        <FurnitureLibrary onClose={() => setLeftOpen(false)} />
                    </div>
                </motion.aside>

                {/* CENTER CANVAS */}
                <main className="flex-1 relative bg-[#F0EDE8] overflow-hidden">
                    <PlannerCanvas />
                </main>

                {/* RIGHT PANEL: SETTINGS */}
                <motion.aside
                    initial={{ width: 300 }}
                    animate={{ width: rightOpen ? 300 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-full bg-white border-l border-[#E8E3DC] flex-shrink-0 z-20 overflow-hidden"
                >
                    <div className="w-[300px] h-full flex flex-col">
                        <RoomSettings onClose={() => setRightOpen(false)} />
                    </div>
                </motion.aside>

            </div>

            {/* BOTTOM BAR */}
            <PlannerBottomBar />

        </div>
    );
}
