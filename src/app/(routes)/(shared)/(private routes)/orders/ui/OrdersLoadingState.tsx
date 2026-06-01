import { Skeleton } from '@/components/ui/skeleton';

const ORDER_SKELETON_COUNT = 3;

const OrderItemLineSkeleton = () => {
  return (
    <li className="grid gap-space-8 py-space-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
      <div className="min-w-0">
        <Skeleton className="mb-space-8 h-5 w-full max-w-[18rem]" />
        <Skeleton className="h-4 w-[8.5rem]" />
      </div>
      <Skeleton className="h-5 w-[5.5rem]" />
    </li>
  );
};

const OrderCardSkeleton = () => {
  return (
    <article className="rounded-[20px] border border-card-border bg-surface p-space-20 shadow-sm md:p-space-24">
      <header className="flex flex-col gap-space-14 border-b border-card-border pb-space-18 md:flex-row md:items-start md:justify-between md:gap-space-24">
        <div className="min-w-0">
          <Skeleton className="h-4 w-[8rem]" />
          <Skeleton className="mt-space-8 h-7 w-[13rem]" />
        </div>
        <Skeleton className="h-[2rem] w-[7rem] rounded-full" />
      </header>

      <div className="grid gap-space-20 py-space-20 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.45fr)] lg:gap-space-32">
        <div>
          <Skeleton className="mb-space-14 h-5 w-[5rem]" />
          <ul className="divide-y divide-card-border border-y border-card-border">
            {Array.from({ length: 2 }).map((_, index) => (
              <OrderItemLineSkeleton key={index} />
            ))}
          </ul>
        </div>

        <aside className="grid content-start gap-space-18">
          <div>
            <Skeleton className="mb-space-10 h-5 w-[6.75rem]" />
            <Skeleton className="h-5 w-[9rem]" />
          </div>

          <div className="border-t border-card-border pt-space-18">
            <Skeleton className="mb-space-10 h-5 w-[6.5rem]" />
            <Skeleton className="h-5 w-[10rem]" />
            <Skeleton className="mt-space-8 h-5 w-full max-w-[18rem]" />
            <Skeleton className="mt-space-8 h-5 w-[8rem]" />
          </div>
        </aside>
      </div>

      <div className="grid gap-space-8 border-t border-card-border pt-space-18 md:ml-auto md:max-w-[22rem]">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between gap-space-16">
            <Skeleton className="h-5 w-[7rem]" />
            <Skeleton className="h-5 w-[5rem]" />
          </div>
        ))}
        <Skeleton className="h-[3rem] rounded-[8px]" />
      </div>
    </article>
  );
};

const OrdersLoadingState = () => {
  return (
    <div aria-busy="true" aria-label="Loading orders" role="status">
      <span className="visually-hidden">Loading orders...</span>

      <div className="grid gap-space-20 md:gap-space-24">
        {Array.from({ length: ORDER_SKELETON_COUNT }).map((_, index) => (
          <OrderCardSkeleton key={index} />
        ))}
      </div>

      <div
        className="mt-space-40 flex flex-wrap items-center justify-center gap-space-4 md:mt-space-60 md:gap-space-8"
        aria-hidden="true"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="size-[35px] rounded-full md:size-[44px]"
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersLoadingState;
