import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { HeaderTone } from '../constants';

type HeaderLogoProps = {
  tone?: Extract<HeaderTone, 'default' | 'inverse' | 'sticky'>;
  className?: string;
};

export const HeaderLogo = ({
  tone = 'default',
  className,
}: HeaderLogoProps) => {
  const isInverse = tone === 'inverse';
  const isSticky = tone === 'sticky';
  const logoSmSrc = isInverse
    ? '/logos/e-pharmacy-logo-white-sm.svg'
    : '/logos/e-pharmacy-logo-green-sm.svg';
  const logoLgSrc = isInverse
    ? '/logos/e-pharmacy-logo-white-lg.svg'
    : '/logos/e-pharmacy-logo-green-lg.svg';

  return (
    <Link
      href="/home"
      className={cn(
        'flex items-center gap-3 rounded-2xl md:gap-space-14',
        'transition duration-fast ease-fast hover:opacity-80 focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-offset-[0.1875rem]',
        isInverse
          ? 'focus-visible:ring-neutral-0 focus-visible:ring-offset-header-brand-bg'
          : isSticky
            ? 'focus-visible:ring-brand-700 focus-visible:ring-offset-bg'
            : 'focus-visible:ring-brand-700 focus-visible:ring-offset-neutral-0',
        className,
      )}
    >
      <picture>
        <source media="(min-width: 48rem)" srcSet={logoLgSrc} />
        <img
          src={logoSmSrc}
          width={32}
          height={32}
          className="size-8 md:size-[2.75rem]"
          alt=""
        />
      </picture>
      <span
        className={cn(
          'text-16 font-semibold leading-150 md:text-20',
          isInverse
            ? 'text-text-inverse'
            : isSticky
              ? 'text-neutral-900'
              : 'text-text',
        )}
      >
        E-Pharmacy
      </span>
    </Link>
  );
};
