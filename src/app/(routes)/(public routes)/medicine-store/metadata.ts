import {
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medicine Store',

  description:
    'Browse trusted pharmacies, check store availability, ratings, contact information, and visit online medicine stores with E-Pharmacy.',

  keywords: [
    'medicine store',
    'online pharmacy',
    'pharmacy stores',
    'buy medicine online',
    'healthcare',
    'pharmacy catalog',
    'medicine delivery',
    'drug store',
  ],

  alternates: {
    canonical: '/medicine-store',
  },

  openGraph: {
    title: 'Medicine Store | E-Pharmacy',
    description:
      'Explore pharmacy stores, view ratings and opening status, and find medicines online with E-Pharmacy.',
    url: '/medicine-store',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Medicine Store | E-Pharmacy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Medicine Store | E-Pharmacy',
    description:
      'Find trusted online pharmacies and explore available medicine stores.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'healthcare',
};
