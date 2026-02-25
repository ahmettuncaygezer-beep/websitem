'use client';

import { useState, useEffect } from 'react';
import { FurniturePanel } from './FurniturePanel';
import { CanvasArea } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { Toolbar } from './Toolbar';
import { CartSummary } from './CartSummary';
import { RoomSetupModal } from './Modals/RoomSetupModal';
import { SavePlanModal } from './Modals/SavePlanModal';
import { ShareModal } from './Modals/ShareModal';
import { usePlannerStore } from './store/plannerStore';

export default function RoomPlanner() {
    const [showSetup, setShowSetup] = useState(false);
    const [showSave, setShowSave] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [mobileTab, setMobileTab] = useState<'furniture' | 'properties' | 'cart' | null>(null);

    // Show setup wizard on first visit
    useEffect(() => {
        const hasVisited = localStorage.getItem('maison_planner_visited');
        if (!hasVisited) {
            setShowSetup(true);
            localStorage.setItem('maison_planner_visited', '1');
        }
    }, []);

    // Load plan from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const planData = params.get('plan');
        if (planData) {
            try {
                const data = JSON.parse(decodeURIComponent(atob(planData)));
                usePlannerStore.getState().loadPlan(data);
            } catch { /* ignore */ }
        }
    }, []);

    // Auto-save every 30s
    useEffect(() => {
        const interval = setInterval(() => {
            const state = usePlannerStore.getState();
            if (state.furniture.length > 0) {
                localStorage.setItem('maison_planner_autosave', JSON.stringify({
                    room: state.room, furniture: state.furniture, planName: state.planName,
                }));
            }
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col" style={{ background: '#F8F6F3' }}>
            {/* Toolbar */}
            <Toolbar onSave={() => setShowSave(true)} onShare={() => setShowShare(true)} />

            {/* Main area — desktop: 3 columns, mobile: canvas only */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left — Furniture Panel (desktop only) */}
                <div className="hidden md:block" style={{ width: 280, flexShrink: 0 }}>
                    <FurniturePanel />
                </div>

                {/* Center — Canvas */}
                <div className="flex-1 relative">
                    <CanvasArea />
                </div>

                {/* Right — Properties Panel (desktop only) */}
                <div className="hidden md:block" style={{ width: 280, flexShrink: 0 }}>
                    <PropertiesPanel />
                </div>
            </div>

            {/* Bottom — Cart Summary */}
            <CartSummary />

            {/* Mobile tab bar */}
            <div className="md:hidden flex" style={{ background: 'white', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                {(['furniture', 'properties', 'cart'] as const).map((tab) => {
                    const icons: Record<string, string> = { furniture: '🛋', properties: '⚙️', cart: '🛒' };
                    const labels: Record<string, string> = { furniture: 'Mobilyalar', properties: 'Özellikler', cart: 'Sepet' };
                    return (
                        <button key={tab} onClick={() => setMobileTab(mobileTab === tab ? null : tab)}
                            className="flex-1 py-3 flex flex-col items-center gap-1"
                            style={{ background: mobileTab === tab ? '#F5F0EB' : 'transparent', border: 'none', cursor: 'pointer' }}>
                            <span className="text-[16px]">{icons[tab]}</span>
                            <span className="text-[10px] font-medium" style={{ color: mobileTab === tab ? '#1C1C1E' : '#999' }}>{labels[tab]}</span>
                        </button>
                    );
                })}
            </div>

            {/* Mobile bottom sheet */}
            {mobileTab && (
                <div className="md:hidden fixed bottom-14 left-0 right-0 bg-white shadow-2xl rounded-t-xl overflow-y-auto"
                    style={{ maxHeight: '60vh', zIndex: 30, borderTop: '2px solid #C9A96E' }}>
                    {mobileTab === 'furniture' && <FurniturePanel />}
                    {mobileTab === 'properties' && <PropertiesPanel />}
                    {mobileTab === 'cart' && <CartSummary />}
                </div>
            )}

            {/* Modals */}
            <RoomSetupModal open={showSetup} onClose={() => setShowSetup(false)} />
            <SavePlanModal open={showSave} onClose={() => setShowSave(false)} />
            <ShareModal open={showShare} onClose={() => setShowShare(false)} />
        </div>
    );
}
