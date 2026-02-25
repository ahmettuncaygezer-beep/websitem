import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'optional',   // no layout shift
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'optional',
});

// Playfair Display — italic for typewriter gold line
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'optional',
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
import { CartProvider } from '@/context/CartContext';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${inter.variable} ${playfair.variable}`}>

      <body className="min-h-screen flex flex-col">
        <GlobalProvider>
          <CartProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </CartProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
