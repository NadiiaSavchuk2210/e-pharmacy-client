import {
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Delivery',

  description:
    'Learn how E-Pharmacy keeps medicine delivery secure, careful, and reliable from checkout to arrival.',

  keywords: [
    'secure delivery',
    'medicine delivery',
    'pharmacy delivery',
    'healthcare delivery',
    'online pharmacy',
  ],

  alternates: {
    canonical: '/feature',
  },

  openGraph: {
    title: 'Secure Delivery | E-Pharmacy',
    description:
      'Discover E-Pharmacy secure delivery support for online medicine orders.',
    url: '/feature',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Secure Delivery | E-Pharmacy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Secure Delivery | E-Pharmacy',
    description:
      'Secure and reliable delivery for online medicine orders with E-Pharmacy.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'healthcare',
};
