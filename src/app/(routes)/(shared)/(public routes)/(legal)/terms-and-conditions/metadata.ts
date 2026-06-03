import {
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',

  description:
    'Read the E-Pharmacy terms and conditions for using the service, managing accounts, placing orders, and reviewing delivery information.',

  alternates: {
    canonical: '/terms-and-conditions',
  },

  openGraph: {
    title: 'Terms and Conditions | E-Pharmacy',
    description:
      'The basic terms for accounts, orders, payments, delivery, and use of the E-Pharmacy service.',
    url: '/terms-and-conditions',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Terms and Conditions | E-Pharmacy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions | E-Pharmacy',
    description:
      'Service rules for E-Pharmacy accounts, orders, payments, delivery, and platform use.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'healthcare',
};
