import type { Metric } from 'web-vitals';

export type VitalName = 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';

interface VitalReport {
    name: VitalName;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    delta: number;
    id: string;
}

function getRating(name: VitalName, value: number): VitalReport['rating'] {
    const thresholds: Record<VitalName, [number, number]> = {
        LCP: [2500, 4000],
        CLS: [0.1, 0.25],
        INP: [200, 500],
        FCP: [1800, 3000],
        TTFB: [800, 1800],
    };
    const [good, poor] = thresholds[name];
    if (value <= good) return 'good';
    if (value <= poor) return 'needs-improvement';
    return 'poor';
}

function logVital(metric: Metric) {
    const name = metric.name as VitalName;
    const report: VitalReport = {
        name,
        value: Math.round(name === 'CLS' ? metric.value * 1000 : metric.value),
        rating: getRating(name, metric.value),
        delta: metric.delta,
        id: metric.id,
    };

    const colors: Record<VitalReport['rating'], string> = {
        good: '#4CAF50',
        'needs-improvement': '#FF9800',
        poor: '#E53935',
    };

    console.log(
        `%c[Web Vital] ${report.name}: ${report.value}${name === 'CLS' ? ' (×1000)' : 'ms'} — ${report.rating.toUpperCase()}`,
        `color: ${colors[report.rating]}; font-weight: bold;`
    );

    // Optional: send to analytics endpoint
    if (process.env.NEXT_PUBLIC_ANALYTICS_URL) {
        const body = JSON.stringify(report);
        const url = process.env.NEXT_PUBLIC_ANALYTICS_URL;
        if (navigator.sendBeacon) {
            navigator.sendBeacon(url, body);
        } else {
            fetch(url, { body, method: 'POST', keepalive: true }).catch(() => { });
        }
    }
}

export async function reportWebVitals() {
    if (typeof window === 'undefined') return;
    // web-vitals v4: onFID removed (replaced by INP)
    const { onCLS, onFCP, onINP, onLCP, onTTFB } = await import('web-vitals');
    onCLS(logVital);
    onFCP(logVital);
    onINP(logVital);
    onLCP(logVital);
    onTTFB(logVital);
}
