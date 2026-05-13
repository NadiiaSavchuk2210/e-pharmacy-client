import {
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Order medicines online with E-Pharmacy, explore nearby pharmacy stores, and get healthcare products delivered quickly and securely.',
  keywords: [
    'online pharmacy',
    'medicine delivery',
    'buy medicine online',
    'pharmacy store',
    'healthcare products',
  ],
  alternates: {
    canonical: '/home',
  },
  openGraph: {
    title: 'Home | E-Pharmacy',
    description:
      'Browse medicines, find trusted pharmacies, and order healthcare products online with E-Pharmacy.',
    url: '/home',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'E-Pharmacy online medicine store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | E-Pharmacy',
    description:
      'Order medicines online and find trusted pharmacy stores with E-Pharmacy.',
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'healthcare',
};
