import { Skeleton } from '@/components/ui/skeleton';

const ReviewCardSkeleton = () => {
  return (
    <li className="rounded-[20px] border border-solid border-neutral-100 px-space-28 py-space-14 dark:border-card-border">
      <div className="mb-space-14 flex gap-space-20">
        <Skeleton className="size-11 rounded-full" />

        <div className="flex flex-col gap-space-4">
          <Skeleton className="h-[22px] w-[144px] md:h-[25px]" />
          <Skeleton className="h-[18px] w-[76px]" />
        </div>

        <div className="ml-auto flex items-center gap-[6px] md:gap-space-8">
          <Skeleton className="h-4 w-[38px] md:h-5 md:w-[116px]" />
        </div>
      </div>

      <div className="space-y-space-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full max-w-[94%]" />
        <Skeleton className="h-4 w-full max-w-[72%]" />
      </div>
    </li>
  );
};

const ReviewsSkeleton = () => {
  return (
    <section aria-label="Loading product reviews">
      <ul className="flex flex-col gap-space-20">
        {Array.from({ length: 2 }).map((_, index) => (
          <ReviewCardSkeleton key={index} />
        ))}
      </ul>
    </section>
  );
};

export default ReviewsSkeleton;
