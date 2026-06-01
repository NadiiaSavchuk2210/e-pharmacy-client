import { Skeleton } from '@/components/ui/skeleton';

const ProductOverviewSkeleton = () => {
  return (
    <section
      aria-label="Loading product details"
      className="flex w-full flex-col gap-space-8 md:flex-row md:gap-space-16 lg:w-[364px] lg:flex-col lg:gap-space-20"
    >
      <Skeleton className="relative aspect-square w-full rounded-[27px] border-[1.15px] border-brand-border bg-neutral-75 dark:bg-neutral-0 md:h-[284px] md:w-[364px] lg:h-[337px]" />

      <div className="rounded-[20px] bg-surface p-space-20 shadow-sm md:flex-1 md:p-space-32 lg:w-full lg:p-space-20">
        <div className="mb-space-32 flex items-start justify-between gap-space-16 md:mb-[66px] md:flex-col md:gap-space-32 lg:mb-[40px] lg:flex-row">
          <div className="min-w-0 flex-1">
            <Skeleton className="mb-space-8 h-[22px] w-full max-w-[220px] md:h-[28px]" />
            <Skeleton className="h-[18px] w-[148px]" />
            <Skeleton className="mt-space-8 h-[18px] w-[172px]" />
          </div>

          <Skeleton className="h-[22px] w-[88px] shrink-0 md:h-[28px]" />
        </div>

        <div className="flex flex-wrap gap-space-12">
          <Skeleton className="h-[44px] min-w-[108px] rounded-full md:min-h-[40px] lg:h-[44px]" />
          <Skeleton className="min-h-[44px] min-w-[140px] rounded-full md:min-h-[40px] lg:min-h-[44px]" />
        </div>
      </div>
    </section>
  );
};

export default ProductOverviewSkeleton;
