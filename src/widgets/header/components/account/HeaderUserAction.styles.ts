import type { HeaderInteractiveTone } from '../../constants';

export const getHeaderUserActionToneClassName = (
  tone: HeaderInteractiveTone,
) => {
  if (tone === 'sticky') {
    return 'border-neutral-900/45 text-neutral-900 hover:border-brand-700 hover:bg-brand-700 hover:text-text-inverse focus-visible:border-brand-700 focus-visible:bg-brand-700 focus-visible:text-text-inverse active:border-brand-700 active:bg-brand-700 active:text-text-inverse focus-visible:ring-brand-700 focus-visible:ring-offset-bg dark:border-neutral-900/55 dark:text-neutral-900 dark:hover:border-brand-700 dark:hover:bg-brand-700 dark:hover:text-text-inverse dark:focus-visible:border-brand-700 dark:focus-visible:bg-brand-700 dark:focus-visible:text-text-inverse dark:focus-visible:ring-brand-700 dark:active:border-brand-700 dark:active:bg-brand-700 dark:active:text-text-inverse';
  }

  if (tone === 'inverse') {
    return 'border-border-inverse text-text-inverse hover:border-neutral-0 hover:bg-neutral-0 hover:text-brand-700 focus-visible:border-neutral-0 focus-visible:bg-neutral-0 focus-visible:text-brand-700';
  }

  return undefined;
};
