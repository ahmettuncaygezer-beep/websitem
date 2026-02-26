import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Oda Planlayıcı | MAISON',
    description: 'MAISON lüks mobilyalarını kullanarak kendi odanızı tasarlayın. 2D interaktif oda planlayıcı.',
};

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
    // We already have the Header in LayoutWrapper. 
    // This layout simply restricts scroll so the planner fits perfectly on screen.
    return (
        <div className="planner-layout-wrapper w-full h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] overflow-hidden bg-[#FAFAF9]">
            {children}
        </div>
    );
}
