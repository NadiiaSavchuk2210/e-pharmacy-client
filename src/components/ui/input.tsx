import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        'h-[2.75rem] w-full rounded-4xl border border-input-border bg-input-bg px-[1.125rem] py-[0.8125rem] font-sans text-12 font-normal leading-[1.5] text-text outline-none transition-[border-color,box-shadow] duration-fast ease-fast placeholder:text-12 placeholder:font-normal placeholder:leading-[1.5] placeholder:text-text-weak hover:border-input-border-focus active:border-input-border-focus focus:border-input-border-focus focus-visible:border-input-border-focus focus-visible:ring-[3px] focus-visible:ring-input-border-focus/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-input-border aria-invalid:border-danger aria-invalid:hover:border-danger aria-invalid:focus:border-danger aria-invalid:focus-visible:border-danger aria-invalid:focus-visible:ring-danger/20',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
