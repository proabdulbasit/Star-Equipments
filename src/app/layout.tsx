import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'sonner';
import ScrollToTopOnRouteChange from '@/components/ScrollToTopOnRouteChange';
import { Inter } from 'next/font/google';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Star Equipment Sales - Premium Towing Equipment',
  description:
    'Premium towing equipment and parts from Star Equipment Sales. Browse our collection of NRC parts, B/A products, clothing, and Towmate accessories.',
  openGraph: {
    title: 'Star Equipment Sales - Premium Towing Equipment',
    description:
      'Premium towing equipment and parts from Star Equipment Sales. Browse our collection of NRC parts, B/A products, clothing, and Towmate accessories.',
    type: 'website',
    images: [
      {
        url: '/assets/Homepage/caraosuel3.jpg',
        width: 1200,
        height: 630,
        alt: 'Star Equipment Sales',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased ${inter.className}`}
        >
          <Toaster />
          <Header />
          {children}
          <Footer />

          <ScrollToTopOnRouteChange />
        </body>
      </CartProvider>
    </html>
  );
}
