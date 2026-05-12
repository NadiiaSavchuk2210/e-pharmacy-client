import Link from 'next/link';
import { Fragment } from 'react';

import { cn } from '@/lib/utils';

import { FOOTER_LEGAL_LINKS } from '../constants';

interface FooterBottomProps {
  className?: string;
}

const FooterBottom = ({ className }: FooterBottomProps) => {
  return (
    <div
      className={cn(
        'border-t border-border-neutral-50-30 pt-space-20 md:pt-space-32 lg:pt-space-40',
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-space-10 font-normal leading-1 text-neutral-50 text-10 md:text-14 md:leading-18 md:gap-6 md:justify-center">
        <span>&copy; E-Pharmacy 2023. All Rights Reserved</span>

        {FOOTER_LEGAL_LINKS.map(({ href, label }) => (
          <Fragment key={href}>
            <span
              aria-hidden="true"
              className="h-2.5 w-px bg-border-inverse md:h-5"
            />
            <Link
              href={href}
              className="rounded-sm underline-offset-4 transition duration-base ease-base hover:text-neutral-0 hover:underline focus-visible:text-neutral-0 focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-neutral-0 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-header-brand-bg focus-visible:underline active:text-neutral-50"
            >
              {label}
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default FooterBottom;
