import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type PaginationLinkProps = {
  href: string;
  label: string;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

const controlClassName =
  'flex size-[35px] items-center justify-center rounded-full border border-neutral-300 bg-bg text-text-muted transition-[background-color,border-color,color] duration-base hover:border-accent hover:bg-accent-soft hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:size-[44px]';

const disabledControlClassName =
  'pointer-events-none border-border text-text-subtle opacity-45';

const PaginationLink = ({
  href,
  label,
  disabled = false,
  children,
  className,
}: PaginationLinkProps) => {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={label}
        className={cn(controlClassName, disabledControlClassName, className)}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(controlClassName, className)}
    >
      {children}
    </Link>
  );
};

export default PaginationLink;
