import {
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',

  description:
    'Read the E-Pharmacy privacy policy for information about customer data, orders, service providers, security, and account choices.',

  alternates: {
    canonical: '/privacy-policy',
  },

  openGraph: {
    title: 'Privacy Policy | E-Pharmacy',
    description:
      'Learn how E-Pharmacy handles customer information for accounts, orders, delivery, security, and support.',
    url: '/privacy-policy',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Privacy Policy | E-Pharmacy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | E-Pharmacy',
    description:
      'Customer data, account, order, delivery, and security information for E-Pharmacy.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'healthcare',
};
