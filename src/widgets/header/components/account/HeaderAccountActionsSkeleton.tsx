import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import type { HeaderInteractiveTone } from '../../constants';

type HeaderAccountActionsSkeletonProps = {
  className?: string;
  tone?: HeaderInteractiveTone;
};

export const HeaderAccountActionsSkeleton = ({
  className,
  tone = 'brand',
}: HeaderAccountActionsSkeletonProps) => {
  const skeletonClassName = tone === 'inverse' ? 'bg-neutral-0/25' : undefined;

  return (
    <div
      className={cn('items-center gap-space-12', className)}
      aria-label="Loading account actions"
    >
      <Skeleton
        className={cn('size-[2.75rem] rounded-full', skeletonClassName)}
      />
      <Skeleton
        className={cn('size-[2.75rem] rounded-full', skeletonClassName)}
      />
      <Skeleton
        className={cn(
          'h-[2.875rem] w-[7.1875rem] rounded-4xl',
          skeletonClassName,
        )}
      />
    </div>
  );
};
