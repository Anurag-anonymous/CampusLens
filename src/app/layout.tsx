import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { AppProviders } from '../components/providers/AppProviders';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const metadata: Metadata = {
  title: 'CampusLens - Discover Your Perfect College',
  description: 'Compare colleges, explore courses, check placements, and save favorites.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
