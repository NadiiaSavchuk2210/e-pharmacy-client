import Link from 'next/link';

import { cn } from '@/lib/utils';

import { NAV_LINKS } from './constants';

type NavigationOrientation = 'horizontal' | 'vertical';
type NavigationLink = (typeof NAV_LINKS)[number];

type NavigationLinksProps = {
  pathname: string;
  className?: string;
  itemClassName?: string;
  linkClassName?: string;
  onNavigate?: () => void;
  orientation?: NavigationOrientation;
};

type HeaderNavigationProps = {
  pathname: string;
};

type NavigationItemProps = {
  link: NavigationLink;
  isActive: boolean;
  isVertical: boolean;
  itemClassName?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

const headerLinkClassName =
  'h-[2.875rem] min-w-[auto] px-[1rem] py-[1rem] text-14';

const listClassNames: Record<NavigationOrientation, string> = {
  horizontal: 'items-center gap-[0.125rem]',
  vertical: 'flex-col items-center gap-[0.1875rem]',
};

const itemClassNames: Record<NavigationOrientation, string> = {
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
  "text-text-inverse before:absolute before:inset-[0.375rem] before:rounded-4xl before:bg-accent before:content-[''] dark:before:bg-brand-700 hover:text-text-inverse focus-visible:text-text-inverse bg-neutral-0";

export const HeaderNavigation = ({ pathname }: HeaderNavigationProps) => {
  return (
    <nav className="hidden xl:block" aria-label="Primary navigation">
      <NavigationLinks pathname={pathname} linkClassName={headerLinkClassName} />
    </nav>
  );
};

export const NavigationLinks = ({
  pathname,
  className,
  itemClassName,
  linkClassName,
  onNavigate,
  orientation = 'horizontal',
}: NavigationLinksProps) => {
  const isVertical = orientation === 'vertical';

  return (
    <ul className={cn('flex', listClassNames[orientation], className)}>
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;

        return (
          <NavigationItem
            key={link.href}
            link={link}
            isActive={isActive}
            isVertical={isVertical}
            itemClassName={itemClassName}
            linkClassName={linkClassName}
            onNavigate={onNavigate}
          />
        );
      })}
    </ul>
  );
};

const NavigationItem = ({
  link,
  isActive,
  isVertical,
  itemClassName,
  linkClassName,
  onNavigate,
}: NavigationItemProps) => {
  const orientation = isVertical ? 'vertical' : 'horizontal';

  return (
    <li className={cn(itemClassNames[orientation], itemClassName)}>
      <Link
        href={link.href}
        onClick={onNavigate}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          linkBaseClassName,
          linkTextClassName,
          linkFocusClassName,
          isVertical
            ? 'focus-visible:ring-offset-header-brand-bg'
            : 'focus-visible:ring-offset-neutral-0',
          isActive && activeLinkClassName,
          linkClassName,
        )}
      >
        <span className="relative z-10">{link.label}</span>
      </Link>
    </li>
  );
};
