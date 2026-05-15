import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex h-[2.125rem] shrink-0 items-center justify-center rounded-lg px-space-16 py-space-8 font-sans text-12 font-semibold leading-[1.5] tracking-[-0.02em] uppercase',
  {
    variants: {
      variant: {
        open: 'w-[4.0625rem] bg-brand-100 text-brand-500',
        close: 'w-[4.4375rem] bg-danger-100 text-danger-500',
      },
    },
    defaultVariants: {
      variant: 'open',
    },
  },
);

function Badge({
  className,
  variant = 'open',
  children,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    >
      {children ?? variant}
    </span>
  );
}

export { Badge, badgeVariants };
