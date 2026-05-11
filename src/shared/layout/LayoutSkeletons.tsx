import { Skeleton } from '@/components/ui/skeleton';

const HeaderSkeleton = () => {
  return (
    <header aria-label="Loading header">
      <div className="container | flex w-full items-center justify-between py-space-25 md:py-space-28 xl:py-8">
        <div className="flex items-center gap-3 md:gap-space-14">
          <Skeleton className="size-8 rounded-full md:size-[2.75rem]" />
          <Skeleton className="h-5 w-[7.25rem] md:h-6 md:w-[8.5rem]" />
        </div>

        <div className="hidden items-center gap-[0.125rem] xl:flex">
          <Skeleton className="h-[2.875rem] w-[5.5rem] rounded-4xl" />
          <Skeleton className="h-[2.875rem] w-[6.5rem] rounded-4xl" />
          <Skeleton className="h-[2.875rem] w-[5.75rem] rounded-4xl" />
        </div>

        <div className="hidden items-center gap-4 xl:flex">
          <Skeleton className="h-[2.875rem] w-[7.4375rem] rounded-4xl" />
          <Skeleton className="h-4 w-[2.75rem]" />
        </div>

        <Skeleton className="size-8 rounded-full xl:hidden" />
      </div>
    </header>
  );
};

const FooterSkeleton = () => {
  return (
    <footer aria-label="Loading footer" className="mt-auto">
      <div className="container | py-space-24">
        <Skeleton className="h-6 w-24" />
      </div>
    </footer>
  );
};

export { FooterSkeleton, HeaderSkeleton };
