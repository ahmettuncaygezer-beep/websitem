import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MAISON — Premium Mobilya & Ev Dekorasyonu',
  description:
    'Evinizin yeni hikayesi. Lüks mobilya, aydınlatma ve dekorasyon ürünlerinde premium koleksiyonlar. BoConcept ve Cassina kalitesinde Türk tasarımı.',
  keywords: ['mobilya', 'lüks mobilya', 'ev dekorasyonu', 'koltuk', 'yatak', 'premium'],
  openGraph: {
    title: 'MAISON — Premium Mobilya & Ev Dekorasyonu',
    description: 'Evinizin yeni hikayesi. Lüks mobilya ve dekorasyon.',
    type: 'website',
    locale: 'tr_TR',
  },
};

import { GlobalProvider } from '@/context/GlobalContext';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <GlobalProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}
