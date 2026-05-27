import {
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My orders',

  description:
    'Review your E-Pharmacy order history, delivery details, payment method, totals, and order status.',

  keywords: [
    'orders',
    'order history',
    'medicine orders',
    'pharmacy orders',
    'delivery status',
    'purchase history',
  ],

  alternates: {
    canonical: '/orders',
  },

  openGraph: {
    title: 'My orders | E-Pharmacy',
    description:
      'Track your E-Pharmacy order history, status, delivery, payment, and totals.',
    url: '/orders',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'My orders | E-Pharmacy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'My orders | E-Pharmacy',
    description:
      'View your E-Pharmacy order history and order status in one place.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: false,
    follow: false,
  },

  category: 'healthcare',
};
