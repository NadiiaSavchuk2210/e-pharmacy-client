import {
  OG_IMAGE_URL,
  SITE_NAME,
} from '@/shared/constants/constants';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description:
    'Create an E-Pharmacy account to order medicines online, manage prescriptions, and get fast healthcare delivery.',

  keywords: [
    'register',
    'sign up',
    'create account',
    'e-pharmacy registration',
    'online pharmacy account',
    'medicine delivery',
    'healthcare platform',
  ],

  alternates: {
    canonical: '/register',
  },

  openGraph: {
    title: 'Register | E-Pharmacy',
    description:
      'Join E-Pharmacy and access fast online medicine ordering and pharmacy services.',
    url: '/register',
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Register to E-Pharmacy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Register | E-Pharmacy',
    description:
      'Create your E-Pharmacy account and start ordering medicines online.',
    images: [OG_IMAGE_URL],
  },

  robots: {
    index: false,
    follow: true,
  },
};
