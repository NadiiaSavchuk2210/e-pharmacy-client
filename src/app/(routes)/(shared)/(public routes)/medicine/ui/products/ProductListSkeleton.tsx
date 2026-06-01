import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

import { PRODUCTS_PER_PAGE } from '../../config';

type ProductListSkeletonProps = {
  count: number;
};

type ProductCardSkeletonProps = {
  className?: string;
};

const ProductCardSkeleton = ({ className }: ProductCardSkeletonProps) => (
  <li
    className={cn(
      'flex min-w-0 w-full flex-col gap-space-8 sm:w-[335px] md:w-[226px] lg:w-[280px]',
      className,
    )}
  >
    <Skeleton className="h-[300px] w-full rounded-[27px] border-[1.15px] border-brand-border bg-neutral-75 md:h-[260px] lg:h-[280px]" />

    <div className="flex min-h-[135px] flex-col gap-space-14 rounded-[20px] bg-surface p-space-20">
      <div className="flex items-start justify-between gap-space-16">
        <div className="min-w-0 flex-1">
          <Skeleton className="mb-space-8 h-[22px] w-full max-w-[168px] md:h-[25px]" />
          <Skeleton className="h-[18px] w-full max-w-[118px]" />
        </div>

        <Skeleton className="h-[22px] w-[64px] shrink-0 md:h-[25px]" />
      </div>

      <div className="mt-auto flex items-center justify-between gap-space-16">
        <Skeleton className="h-[34px] w-[108px] rounded-full" />
        <Skeleton className="h-[18px] w-[42px]" />
      </div>
    </div>
  </li>
);

const ProductListSkeleton = ({ count }: ProductListSkeletonProps) => {
  const skeletonItems = Array.from({ length: count });

  return (
    <section aria-label="Loading medicine products" aria-busy="true">
      <ul className="grid w-full grid-cols-1 justify-center gap-y-space-20 sm:grid-cols-[335px] md:grid-cols-[repeat(3,226px)] md:justify-between md:gap-y-space-32 lg:grid-cols-[repeat(4,280px)] lg:gap-y-space-40">
        {skeletonItems.map((_, index) => (
          <ProductCardSkeleton
            key={index}
            className={
              index >= PRODUCTS_PER_PAGE ? 'max-[89.999rem]:hidden' : ''
            }
          />
        ))}
      </ul>
    </section>
  );
};

export default ProductListSkeleton;
