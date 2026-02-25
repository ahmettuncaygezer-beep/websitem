'use client';

import { VideoBackground } from './VideoBackground';
import { GlassCard } from './GlassCard';
import { ScrollIndicator } from './ScrollIndicator';
import { VideoModal } from './VideoModal';
import { useParallax } from './useParallax';

export function HeroSection() {
    const parallaxOffset = useParallax(0.4);

    return (
        <section
            // Mobile: 100svh (iOS-safe), tablet+: 100vh with minimum heights
            className="relative overflow-hidden
                 h-[100svh] min-h-[560px]
                 md:h-screen md:min-h-[600px]
                 xl:min-h-[700px]"
            aria-label="MAISON Hero"
        >
            {/* Background: fades in at 0.0s (800ms) */}
            <VideoBackground parallaxOffset={parallaxOffset} />

            {/* Centered glass card — owns all copy and staggered animations */}
            <GlassCard />

            {/* Bottom-right play button + modal, appears at 2.0s */}
            <VideoModal />

            {/* Bottom-center scroll indicator, appears at 2.0s */}
            <ScrollIndicator />
        </section>
    );
}
