'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { NavigationLinks } from '@/shared/navigation/components/NavigationLinks';

interface FooterNavigationProps {
  className?: string;
}

const FooterNavigation = ({ className }: FooterNavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label="Footer navigation">
      <NavigationLinks
        pathname={pathname}
        className="flex gap-space-32 items-start md:justify-end lg:gap-space-50"
        linkClassName={(_, { isActive }) =>
          cn(
            'rounded-sm text-14 font-semibold leading-1 text-text-inverse underline-offset-4 transition duration-base ease-base',
            'hover:text-neutral-0 hover:underline',
            'focus-visible:text-neutral-0 focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-neutral-0 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-header-brand-bg',
            'active:text-neutral-50',
            isActive && 'text-neutral-0 underline',
          )
        }
      />
    </nav>
  );
};

export default FooterNavigation;
