import { cn } from '@/lib/utils';

export type HeaderNavigationOrientation = 'horizontal' | 'vertical';

type HeaderNavigationLinkState = {
  isActive: boolean;
  isVertical: boolean;
};

export const headerNavigationLinkClassName =
  'h-[2.875rem] min-w-[auto] px-[1rem] py-[1rem] text-14';

export const headerNavigationListClassNames: Record<
  HeaderNavigationOrientation,
  string
> = {
  horizontal: 'items-center gap-[0.125rem]',
  vertical: 'flex-col items-center gap-[0.1875rem]',
};

export const headerNavigationItemClassNames: Record<
  HeaderNavigationOrientation,
  string
> = {
  horizontal:
    "relative -mt-[0.0625rem] first:mt-0 w-fit after:absolute after:right-[-0.25rem] after:top-[0.9375rem] after:z-10 after:h-3.5 after:w-1.5 after:border-y after:border-x-0 after:border-neutral-350 after:bg-neutral-0 after:content-[''] last:after:hidden",
  vertical:
    "relative -mt-[0.0625rem] first:mt-0 w-fit after:absolute after:left-1/2 after:top-[2.46875rem] after:z-10 after:h-space-15 after:w-1 after:-translate-x-1/2 after:rotate-90 after:border-y after:border-x-0 after:border-neutral-350 after:bg-neutral-0 after:content-[''] last:after:hidden",
};

const linkBaseClassName =
  'relative flex items-center justify-center overflow-hidden rounded-4xl border-1 border-neutral-350 bg-neutral-0';

const linkTextClassName =
  'text-14 font-normal leading-1 text-neutral-700 shadow-sm transition duration-base ease-base';

const linkFocusClassName =
  'hover:text-brand-700 focus-visible:z-20 focus-visible:text-brand-700 focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-brand-700 focus-visible:ring-offset-[0.1875rem]';

const activeLinkClassName =
  "bg-neutral-0 text-text-inverse before:absolute before:inset-[0.375rem] before:rounded-4xl before:bg-accent before:content-[''] hover:text-text-inverse focus-visible:text-text-inverse dark:before:bg-brand-700";

export const getHeaderNavigationLinkClassName = ({
  isActive,
  isVertical,
}: HeaderNavigationLinkState) => {
  return cn(
    linkBaseClassName,
    linkTextClassName,
    linkFocusClassName,
    isVertical
      ? 'focus-visible:ring-offset-header-brand-bg'
      : 'focus-visible:ring-offset-neutral-0',
    isActive && activeLinkClassName,
  );
};
