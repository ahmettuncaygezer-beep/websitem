'use client';

import { WelcomeCard } from './WelcomeCard';
import { StatsGrid } from './StatsGrid';
import { RecentOrders } from './RecentOrders';
import { SpendingChart } from './SpendingChart';
import { RewardsSummary } from './RewardsSummary';
import { QuickActions } from './QuickActions';
import { PersonalizedBanner } from './PersonalizedBanner';

export function Dashboard() {
    return (
        <div>
            <WelcomeCard />
            <StatsGrid />
            <RecentOrders />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SpendingChart />
                <RewardsSummary />
            </div>
            <QuickActions />
            <PersonalizedBanner />
        </div>
    );
}
