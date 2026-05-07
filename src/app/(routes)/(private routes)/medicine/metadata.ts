import {
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicine',

  description:
    'Search medicines, filter products by category, explore detailed product information, and add medicines to your cart with E-Pharmacy.',

  keywords: [
    'medicine',
    'medicines',
    'pharmacy products',
    'buy medicine',
    'online medicine',
    'medical products',
    'medicine catalog',
    'healthcare products',
    'medicine search',
  ],

  alternates: {
    canonical: '/medicine',
  },

  openGraph: {
    title: 'Medicine | E-Pharmacy',
    description:
      'Browse medicines, search products, apply filters, and manage your online pharmacy shopping easily.',
    url: '/medicine',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Medicine | E-Pharmacy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Medicine | E-Pharmacy',
    description: 'Search and explore medicines online with E-Pharmacy.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: false,
    follow: false,
  },

  category: 'healthcare',
};
