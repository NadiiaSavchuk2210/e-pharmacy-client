import {
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',

  description:
    'Review selected medicines, manage quantities, enter shipping information, choose a payment method, and place your order with E-Pharmacy.',

  keywords: [
    'cart',
    'shopping cart',
    'medicine cart',
    'checkout',
    'online pharmacy order',
    'medicine delivery',
    'place order',
    'healthcare products',
  ],

  alternates: {
    canonical: '/cart',
  },

  openGraph: {
    title: 'Cart | E-Pharmacy',
    description:
      'Manage your medicine order, delivery details, and checkout securely with E-Pharmacy.',
    url: '/cart',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Cart | E-Pharmacy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Cart | E-Pharmacy',
    description:
      'Complete your medicine purchase quickly and securely with E-Pharmacy.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: false,
    follow: false,
  },

  category: 'healthcare',
};
