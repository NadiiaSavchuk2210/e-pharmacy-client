import 'modern-normalize';
import { Inter } from 'next/font/google';

import SharedLayout from '@/shared/layout/SharedLayout';

import './globals.css';

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
        <SharedLayout>{children}</SharedLayout>
      </body>
    </html>
  );
}

export { metadata } from './metadata';
export { viewport } from './viewport';
