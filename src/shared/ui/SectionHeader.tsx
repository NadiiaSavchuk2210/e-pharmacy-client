import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const SectionHeader = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        'mb-space-40 flex flex-col gap-space-14 text-center md:mb-space-64',
        className,
      )}
    >
      <h2
        className={cn(
          'font-semibold text-28 leading-space-32 text-text md:text-40 md:leading-space-48',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'text-14 leading-space-18 text-text-subtle md:text-16 md:leading-space-20',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeader;
