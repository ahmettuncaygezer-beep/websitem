'use client';

import React from 'react';
import { PageSection } from '@/lib/default-content';
import { HeroSection } from './HeroSection';
import { CategorySection } from '../CategorySection';
import FlashSaleStrip from '../Marketing/FlashSaleStrip';
import { NewArrivals } from './NewArrivals';
import { TrustBand } from './TrustBand';
import { PersonalizedShowcase } from './PersonalizedShowcase';
import StatsCounter from '../SocialProof/StatsCounter';
import MediaLogos from '../SocialProof/MediaLogos';
import InstagramFeed from '../SocialProof/InstagramFeed';
import TrustBadges from '../SocialProof/TrustBadges';

interface DynamicSectionProps {
    section: PageSection;
}

export function DynamicSection({ section }: DynamicSectionProps) {
    if (!section.isActive) return null;

    switch (section.type) {
        case 'hero':
            return <HeroSection content={section.content} />;

        case 'features':
            // Logic for features section (StatsCounter or similar)
            return <StatsCounter />;

        case 'featured-products':
            return <NewArrivals />;

        case 'campaign-strip':
            return <FlashSaleStrip />;

        case 'lookbook-banner':
            return <PersonalizedShowcase />;

        case 'testimonials':
            return <InstagramFeed />;

        case 'newsletter':
            return <TrustBadges />;

        default:
            return null;
    }
}
