import {
  BASE_URL,
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: SITE_NAME,

  title: {
    default: 'E-Pharmacy — Online Medicine Store',
    template: '%s | E-Pharmacy',
  },

  description:
    'E-Pharmacy is a modern online platform for ordering medicines. Find nearby pharmacies, browse products, and get fast delivery to your home.',

  keywords: [
    'pharmacy',
    'online pharmacy',
    'medicine',
    'drug store',
    'healthcare',
    'buy medicine online',
    'pharmacy delivery',
  ],

  authors: [{ name: 'E-Pharmacy Team' }],
  creator: 'E-Pharmacy',
  publisher: 'E-Pharmacy',
  referrer: 'origin-when-cross-origin',

  manifest: '/site.webmanifest',

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },

  openGraph: {
    title: 'E-Pharmacy — Online Medicine Store',
    description:
      'Order medicine online, explore nearby pharmacies, and enjoy fast and secure delivery.',
    url: '/',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'E-Pharmacy — Online Medicine Store',
    description:
      'Find medicines, explore pharmacies, and order online quickly and easily.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'default',
  },

  formatDetection: {
    telephone: false,
  },

  category: 'healthcare',
};
