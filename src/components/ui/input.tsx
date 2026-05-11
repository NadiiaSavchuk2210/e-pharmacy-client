import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        'h-11 w-full rounded-2xl border border-input-border bg-input-bg px-space-16 text-text outline-none transition-colors duration-fast ease-fast placeholder:text-text-subtle focus:border-input-border-focus disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
