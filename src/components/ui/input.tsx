import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        'h-[2.75rem] w-full rounded-4xl border border-[rgba(29,30,33,0.1)] bg-white px-[1.125rem] py-[0.8125rem] font-sans text-12 font-normal leading-[1.5] text-[#1d1e21] outline-none transition-colors duration-fast ease-fast placeholder:text-12 placeholder:font-normal placeholder:leading-[1.5] placeholder:text-[rgba(29,30,33,0.4)] active:border-[#59b17a] focus:border-[#59b17a] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
