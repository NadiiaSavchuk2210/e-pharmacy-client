import {
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log In',
  description:
    'Log in to your E-Pharmacy account to manage medicine orders, prescriptions, and pharmacy services online.',

  keywords: [
    'login',
    'sign in',
    'e-pharmacy login',
    'online pharmacy',
    'medicine delivery',
    'healthcare account',
    'pharmacy platform',
  ],

  alternates: {
    canonical: '/login',
  },

  openGraph: {
    title: 'Log In | E-Pharmacy',
    description:
      'Access your E-Pharmacy account and continue ordering medicines online.',
    url: '/login',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Log in to E-Pharmacy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Log In | E-Pharmacy',
    description: 'Securely log in to your E-Pharmacy account.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: false,
    follow: true,
  },
};
