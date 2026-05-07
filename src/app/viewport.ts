import { THEME_COLOR } from '@/shared/constants/constants';

import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME_COLOR },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d0e' },
  ],
  colorScheme: 'light dark',
};
