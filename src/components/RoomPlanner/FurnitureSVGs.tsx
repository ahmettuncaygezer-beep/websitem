import React from 'react';
import { FurnitureCategory } from './planner.types';

interface SVGProps {
    width?: string | number;
    height?: string | number;
    fillColor?: string;
    strokeColor?: string;
    className?: string;
}

const DEFAULT_FILL = '#C9A96E'; // Gold tone from system
const DEFAULT_STROKE = '#1C1C1E'; // Dark border

export function SofaSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }: SVGProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* Main body */}
            <rect x="5" y="20" width="90" height="60" rx="4" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            {/* Backrest */}
            <rect x="5" y="5" width="90" height="15" rx="4" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            {/* Left Armrest */}
            <rect x="5" y="20" width="15" height="60" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            {/* Right Armrest */}
            <rect x="80" y="20" width="15" height="60" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        </svg>
    );
}

export function ChairSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }: SVGProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* Main body */}
            <rect x="15" y="25" width="70" height="60" rx="4" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            {/* Backrest */}
            <rect x="15" y="5" width="70" height="20" rx="4" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            {/* Armrests */}
            <rect x="5" y="25" width="15" height="50" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <rect x="80" y="25" width="15" height="50" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        </svg>
    );
}

export function BedSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }: SVGProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* Main mattress */}
            <rect x="5" y="25" width="90" height="70" rx="2" fill="#FAFAF9" stroke={strokeColor} strokeWidth="2" />
            {/* Headboard */}
            <rect x="5" y="5" width="90" height="20" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            {/* Pillows */}
            <ellipse cx="30" cy="35" rx="15" ry="8" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.5" />
            <ellipse cx="70" cy="35" rx="15" ry="8" fill="#FFFFFF" stroke={strokeColor} strokeWidth="1.5" />
            {/* Duvet fold */}
            <path d="M5 50 Q 50 60 95 50 L 95 95 L 5 95 Z" fill={fillColor} opacity="0.8" stroke={strokeColor} strokeWidth="2" />
        </svg>
    );
}

export function TableSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }: SVGProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* 4 Legs underneath */}
            <circle cx="10" cy="10" r="4" fill={strokeColor} />
            <circle cx="90" cy="10" r="4" fill={strokeColor} />
            <circle cx="10" cy="90" r="4" fill={strokeColor} />
            <circle cx="90" cy="90" r="4" fill={strokeColor} />
            {/* Main tabletop */}
            <rect x="5" y="5" width="90" height="90" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
        </svg>
    );
}

export function WardrobeSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }: SVGProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* Main outline */}
            <rect x="5" y="5" width="90" height="90" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            {/* Door splits */}
            <line x1="35" y1="5" x2="35" y2="95" stroke={strokeColor} strokeWidth="2" />
            <line x1="65" y1="5" x2="65" y2="95" stroke={strokeColor} strokeWidth="2" />
            {/* Handles */}
            <line x1="30" y1="45" x2="30" y2="55" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="45" x2="40" y2="55" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="45" x2="60" y2="55" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="70" y1="45" x2="70" y2="55" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export function LightingSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }: SVGProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className={className}>
            {/* Base */}
            <circle cx="50" cy="50" r="40" fill="transparent" stroke={strokeColor} strokeWidth="1" strokeDasharray="4 4" />
            {/* Center light core */}
            <circle cx="50" cy="50" r="15" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            {/* Rays */}
            <line x1="50" y1="15" x2="50" y2="30" stroke={fillColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="70" x2="50" y2="85" stroke={fillColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="50" x2="30" y2="50" stroke={fillColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="70" y1="50" x2="85" y2="50" stroke={fillColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}

export function DecorationSVG({ width = '100%', height = '100%', fillColor = DEFAULT_FILL, strokeColor = DEFAULT_STROKE, className }: SVGProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none" className={className}>
            {/* Rug or plant representation - let's make a beautiful rug pattern */}
            <rect x="5" y="15" width="90" height="70" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <circle cx="50" cy="50" r="20" fill="transparent" stroke={strokeColor} strokeWidth="2" opacity="0.3" />
            <path d="M 5 25 L 95 25 M 5 75 L 95 75" stroke={strokeColor} strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
            {/* Fringes */}
            <line x1="0" y1="20" x2="5" y2="20" stroke={strokeColor} strokeWidth="1" />
            <line x1="0" y1="30" x2="5" y2="30" stroke={strokeColor} strokeWidth="1" />
            <line x1="0" y1="40" x2="5" y2="40" stroke={strokeColor} strokeWidth="1" />
            <line x1="0" y1="50" x2="5" y2="50" stroke={strokeColor} strokeWidth="1" />
            <line x1="0" y1="60" x2="5" y2="60" stroke={strokeColor} strokeWidth="1" />
            <line x1="0" y1="70" x2="5" y2="70" stroke={strokeColor} strokeWidth="1" />
            <line x1="0" y1="80" x2="5" y2="80" stroke={strokeColor} strokeWidth="1" />
            <line x1="95" y1="20" x2="100" y2="20" stroke={strokeColor} strokeWidth="1" />
            <line x1="95" y1="30" x2="100" y2="30" stroke={strokeColor} strokeWidth="1" />
            <line x1="95" y1="40" x2="100" y2="40" stroke={strokeColor} strokeWidth="1" />
            <line x1="95" y1="50" x2="100" y2="50" stroke={strokeColor} strokeWidth="1" />
            <line x1="95" y1="60" x2="100" y2="60" stroke={strokeColor} strokeWidth="1" />
            <line x1="95" y1="70" x2="100" y2="70" stroke={strokeColor} strokeWidth="1" />
            <line x1="95" y1="80" x2="100" y2="80" stroke={strokeColor} strokeWidth="1" />
        </svg>
    );
}

export function getFallbackSVG(category: FurnitureCategory, props: SVGProps = {}) {
    switch (category) {
        case 'Sofa': return <SofaSVG {...props} />;
        case 'Chair': return <ChairSVG {...props} />;
        case 'Bed': return <BedSVG {...props} />;
        case 'Table': return <TableSVG {...props} />;
        case 'Wardrobe': return <WardrobeSVG {...props} />;
        case 'Lighting': return <LightingSVG {...props} />;
        case 'Decoration': return <DecorationSVG {...props} />;
        default: return <SofaSVG {...props} />; // Safe default
    }
}
