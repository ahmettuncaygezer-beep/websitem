import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import { GlobalProvider } from '@/context/GlobalContext';
import { CartProvider } from '@/context/CartContext';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import NotificationQueue from '@/components/SocialProof/NotificationQueue';
import ExitIntentPopup from '@/components/Marketing/ExitIntentPopup';
import ComparisonTray from '@/components/Marketing/ComparisonTray';
import WebVitalsReporter from '@/components/Performance/WebVitalsReporter';
import PWAInstallBanner from '@/components/Performance/PWAInstallBanner';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/structured-data';
import { ToastProvider } from '@/components/ui/Toast/ToastProvider';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'optional',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'optional',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'optional',
});

export const metadata: Metadata = {
  title: {
    default: 'MAISON — Premium Mobilya & Ev Dekorasyonu',
    template: '%s | MAISON',
  },
  description:
    'Evinizin yeni hikayesi. Lüks mobilya, aydınlatma ve dekorasyon ürünlerinde premium koleksiyonlar. Türk tasarımı, dünya kalitesi.',
  keywords: ['mobilya', 'lüks mobilya', 'ev dekorasyonu', 'koltuk', 'yatak', 'premium', 'MAISON'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maisonmobilya.com'),
  openGraph: {
    title: 'MAISON — Premium Mobilya & Ev Dekorasyonu',
    description: 'Evinizin yeni hikayesi. Lüks mobilya ve dekorasyon.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'MAISON',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@maisonmobilya',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// FWOT (Flash of Wrong Theme) önleme scripti
// Bu inline script, sayfa render edilmeden önce çalışır
const DARK_MODE_SCRIPT = `
(function(){
  try {
    var stored = localStorage.getItem('colorScheme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {}
})();
`;

// Service Worker kayıt scripti
const SW_REGISTER_SCRIPT = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .catch(function(err) { console.warn('SW registration failed:', err); });
  });
}
`;

const orgSchema = generateOrganizationSchema();
const siteSchema = generateWebsiteSchema();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* FWOT Prevention — blocking inline script, must run before render */}
        <script dangerouslySetInnerHTML={{ __html: DARK_MODE_SCRIPT }} />

        {/* Hero image preload — LCP critical */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/main.webp"
          fetchPriority="high"
        />

        {/* DNS prefetch for common external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />

        {/* Organization + WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />

        {/* Service Worker registration */}
        <script dangerouslySetInnerHTML={{ __html: SW_REGISTER_SCRIPT }} />
      </head>

      <body className="min-h-screen flex flex-col bg-white dark:bg-[#1C1C1E] text-[#1C1C1E] dark:text-[#F5F0EB] transition-colors duration-300">
        <GlobalProvider>
          <CartProvider>
            <ToastProvider>
              <LayoutWrapper>{children}</LayoutWrapper>

              {/* Global UI */}
              <NotificationQueue />
              <ExitIntentPopup />
              <ComparisonTray />
              <PWAInstallBanner />

              {/* Performance monitoring (client-side, async) */}
              <WebVitalsReporter />
            </ToastProvider>
          </CartProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
