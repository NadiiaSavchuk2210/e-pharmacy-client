import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type PageTitleProps = {
  children: ReactNode;
  className?: string;
};

const PageTitle = ({ children, className }: PageTitleProps) => {
  return (
    <h1
      className={cn(
        'mb-space-40 font-semibold text-28 leading-space-32 text-text md:mb-space-32',
        className,
      )}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
