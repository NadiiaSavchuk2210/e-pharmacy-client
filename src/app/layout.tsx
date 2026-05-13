import 'modern-normalize';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import AppShell from '@/shared/layout/AppShell';

import './globals.css';
import QueryProvider from '../shared/api/QueryProvider';
import AppToaster from '../shared/ui/AppToaster';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryProvider>
          <Suspense>
            <AppShell>{children}</AppShell>
          </Suspense>
          <AppToaster />
        </QueryProvider>
      </body>
    </html>
  );
}

export { metadata } from './metadata';
export { viewport } from './viewport';
