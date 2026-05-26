import { cn } from '@/lib/utils';

import type { HeaderInteractiveTone } from '../../constants';

type MobileMenuButtonClassNameOptions = {
  isOpen: boolean;
  tone: HeaderInteractiveTone;
};

type MobileMenuButtonLine = 'top' | 'middle' | 'bottom';

type MobileMenuButtonLineClassNameOptions = MobileMenuButtonClassNameOptions & {
  line: MobileMenuButtonLine;
};

const getMenuButtonFocusClassName = ({
  isOpen,
  tone,
}: MobileMenuButtonClassNameOptions) => {
  if (isOpen) {
    return 'hover:bg-neutral-0 focus-visible:bg-neutral-0 focus-visible:ring-neutral-0/80';
  }

  if (tone === 'sticky') {
    return 'focus-visible:ring-neutral-900/70 dark:focus-visible:ring-neutral-0/70';
  }

  if (tone === 'inverse') {
    return 'focus-visible:ring-neutral-0/70';
  }

  return 'focus-visible:ring-brand-700 dark:focus-visible:ring-neutral-0/70';
};

const getMenuButtonLineColorClassName = (tone: HeaderInteractiveTone) => {
  if (tone === 'inverse') return 'bg-neutral-0';
  if (tone === 'sticky') return 'bg-neutral-900 dark:bg-neutral-0';

  return 'bg-brand-700 dark:bg-neutral-0';
};

const getMenuButtonLineInteractiveClassName = ({
  isOpen,
  tone,
}: MobileMenuButtonClassNameOptions) => {
  if (isOpen) {
    return 'group-hover:bg-brand-700 group-focus-visible:bg-brand-700';
  }

  if (tone === 'sticky') {
    return 'group-hover:bg-brand-700 group-focus-visible:bg-brand-700 dark:group-hover:bg-neutral-0 dark:group-focus-visible:bg-neutral-0';
  }

  if (tone === 'inverse') {
    return 'group-hover:bg-neutral-900 group-focus-visible:bg-neutral-900';
  }

  return 'group-hover:bg-brand-700 group-focus-visible:bg-brand-700 dark:group-hover:bg-neutral-0 dark:group-focus-visible:bg-neutral-0';
};

const getClosedLinePositionClassName = (line: MobileMenuButtonLine) => {
  if (line === 'top') return '-translate-y-2';
  if (line === 'bottom') return 'translate-y-2';

  return undefined;
};

const getOpenLinePositionClassName = (line: MobileMenuButtonLine) => {
  if (line === 'top') return 'translate-y-0 rotate-45 bg-neutral-0';
  if (line === 'middle') return 'scale-x-0 opacity-0';

  return 'translate-y-0 -rotate-45 bg-neutral-0';
};

export const getMobileMenuButtonClassName = ({
  isOpen,
  tone,
}: MobileMenuButtonClassNameOptions) => {
  return cn(
    'group z-[60] flex size-8 cursor-pointer items-center justify-center rounded-full transition-[background-color,box-shadow,transform] duration-base ease-base xl:hidden',
    'focus-visible:outline-none focus-visible:ring-[0.1875rem] active:scale-95',
    getMenuButtonFocusClassName({ isOpen, tone }),
    isOpen ? 'fixed right-[1.25rem] top-[1.9375rem]' : 'relative',
  );
};

export const getMobileMenuButtonLineClassName = ({
  isOpen,
  line,
  tone,
}: MobileMenuButtonLineClassNameOptions) => {
  return cn(
    'absolute h-0.5 rounded-full transition-[background-color,opacity,transform] duration-base ease-base group-hover:opacity-100',
    isOpen ? 'w-6' : 'w-8',
    getMenuButtonLineColorClassName(tone),
    getMenuButtonLineInteractiveClassName({ isOpen, tone }),
    isOpen
      ? getOpenLinePositionClassName(line)
      : getClosedLinePositionClassName(line),
  );
};
