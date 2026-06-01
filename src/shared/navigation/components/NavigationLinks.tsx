import Link from 'next/link';

import { cn } from '@/lib/utils';

import { NAV_LINKS, type NavigationLink } from '../constants';

type NavigationLinkState = {
  index: number;
  isActive: boolean;
};

type ClassNameValue =
  | string
  | undefined
  | ((link: NavigationLink, state: NavigationLinkState) => string | undefined);

type NavigationLinksProps = {
  pathname?: string;
  links?: readonly NavigationLink[];
  className?: string;
  itemClassName?: ClassNameValue;
  linkClassName?: ClassNameValue;
  labelClassName?: ClassNameValue;
  onNavigate?: () => void;
};

const resolveClassName = (
  className: ClassNameValue,
  link: NavigationLink,
  state: NavigationLinkState,
) => {
  return typeof className === 'function' ? className(link, state) : className;
};

export const NavigationLinks = ({
  pathname,
  links = NAV_LINKS,
  className,
  itemClassName,
  linkClassName,
  labelClassName,
  onNavigate,
}: NavigationLinksProps) => {
  return (
    <ul className={className}>
      {links.map((link, index) => {
        const state = {
          index,
          isActive: pathname === link.href,
        };

        return (
          <li
            key={link.href}
            className={resolveClassName(itemClassName, link, state)}
          >
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={state.isActive ? 'page' : undefined}
              className={resolveClassName(linkClassName, link, state)}
            >
              <span className={cn(resolveClassName(labelClassName, link, state))}>
                {link.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
