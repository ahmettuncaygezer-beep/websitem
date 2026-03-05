import React from 'react';
import { SettingsNav } from '@/components/Admin/Settings/SettingsNav';

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col lg:flex-row h-full bg-[#141416]">
            <SettingsNav />
            <main className="flex-1 h-full overflow-y-auto p-4 md:p-6 lg:p-10 relative">
                <div className="max-w-[800px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
