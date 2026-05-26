import { cn } from '@/lib/utils';

import type { HeaderInteractiveTone } from '../constants';

const headerAuthFocusClassNames: Record<HeaderInteractiveTone, string> = {
  brand:
    'focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-brand-700 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-neutral-0 dark:focus-visible:ring-text dark:focus-visible:ring-offset-bg',
  inverse:
    'focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-neutral-0 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-header-brand-bg',
  sticky:
    'focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-brand-700 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-bg dark:focus-visible:ring-text',
};

const registerButtonToneClassNames: Partial<Record<HeaderInteractiveTone, string>> =
  {
    brand:
      'border-brand-700/50 text-brand-700 hover:border-brand-700 hover:bg-brand-700 hover:text-text-inverse focus-visible:border-brand-700 focus-visible:bg-brand-700 focus-visible:text-text-inverse dark:border-text/45 dark:text-text dark:hover:border-text dark:hover:bg-text dark:hover:text-bg dark:focus-visible:border-text dark:focus-visible:bg-text dark:focus-visible:text-bg',
    sticky:
      'border-neutral-900/45 text-neutral-900 hover:border-brand-700 hover:bg-brand-700 hover:text-text-inverse focus-visible:border-brand-700 focus-visible:bg-brand-700 focus-visible:text-text-inverse active:border-brand-700 active:bg-brand-700 active:text-text-inverse dark:border-text/45 dark:text-text dark:hover:border-text dark:hover:bg-text dark:hover:text-bg dark:focus-visible:border-text dark:focus-visible:bg-text dark:focus-visible:text-bg dark:active:border-text dark:active:bg-text dark:active:text-bg',
  };

const loginButtonToneClassNames: Partial<Record<HeaderInteractiveTone, string>> =
  {
    brand:
      'text-brand-700 hover:text-brand-700 focus-visible:text-brand-700 active:text-brand-700 dark:text-text dark:hover:text-text dark:focus-visible:text-text dark:active:text-text',
    sticky:
      'text-neutral-900 hover:text-brand-700 focus-visible:text-brand-700 active:text-brand-700 dark:text-text dark:hover:text-text dark:focus-visible:text-text dark:active:text-text',
  };

export const getHeaderRegisterButtonClassName = (
  tone: HeaderInteractiveTone,
) => {
  return cn(headerAuthFocusClassNames[tone], registerButtonToneClassNames[tone]);
};

export const getHeaderLoginButtonClassName = (
  tone: HeaderInteractiveTone,
) => {
  return cn(headerAuthFocusClassNames[tone], loginButtonToneClassNames[tone]);
};
