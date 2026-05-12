import Link from 'next/link';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

const FooterLogo = ({ className }: Props) => {
  const logoSmSrc = '/logos/e-pharmacy-logo-white-sm.svg';

  const logoLgSrc = '/logos/e-pharmacy-logo-white-lg.svg';

  return (
    <Link
      href="/home"
      aria-label="E-Pharmacy home"
      className={cn(
        'flex w-fit items-center gap-3 rounded-2xl transition duration-fast ease-fast md:gap-3.5',
        'hover:opacity-80 focus-visible:outline-none focus-visible:ring-[0.25rem] focus-visible:ring-neutral-0 focus-visible:ring-offset-[0.1875rem] focus-visible:ring-offset-header-brand-bg active:opacity-70',
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
          'text-16 font-semibold tracking-[-0.03em] leading-150 text-text-inverse md:text-20 md:text-neutral-50',
        )}
      >
        E-Pharmacy
      </span>
    </Link>
  );
};

export default FooterLogo;
