import { Skeleton } from '@/components/ui/skeleton';

const CartCheckoutFormSkeleton = () => {
  return (
    <section
      className="flex min-w-0 flex-col gap-space-40 rounded-[27px] bg-surface px-space-20 py-space-20 max-[374px]:gap-space-32 max-[374px]:rounded-[20px] max-[374px]:px-space-16 md:px-[78px] md:py-space-40 lg:p-space-40"
      aria-label="Loading checkout form"
    >
      <div className="flex flex-col gap-space-12 lg:gap-space-14">
        <Skeleton className="h-[22px] w-[172px]" />
        <div className="grid gap-space-8">
          <Skeleton className="h-4 w-full max-w-[420px]" />
          <Skeleton className="h-4 w-full max-w-[360px]" />
        </div>
      </div>

      <div className="grid gap-space-12 md:grid-cols-2 md:gap-x-space-14 md:gap-y-space-20 md:max-w-[534px]">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-space-8">
            <Skeleton className="ml-space-18 h-[18px] w-20" />
            <Skeleton className="h-10 rounded-4xl md:h-[44px]" />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-space-8">
        <Skeleton className="ml-space-18 h-[18px] w-24" />
        <Skeleton className="h-[116px] rounded-[1.375rem]" />
      </div>

      <div className="border-t border-card-border" aria-hidden="true" />

      <div>
        <Skeleton className="mb-space-14 h-[22px] w-[148px]" />
        <Skeleton className="mb-space-20 h-4 w-full max-w-[416px]" />
        <div className="grid gap-space-12">
          <Skeleton className="h-5 w-[164px]" />
          <Skeleton className="h-5 w-[92px]" />
        </div>
      </div>

      <div className="border-t border-card-border" aria-hidden="true" />

      <div className="flex flex-col gap-space-20">
        <div>
          <Skeleton className="mb-space-14 h-[22px] w-[120px]" />
          <Skeleton className="h-4 w-full max-w-[428px]" />
        </div>
        <Skeleton className="h-[58px] rounded-[8px]" />
        <Skeleton className="h-[76px] rounded-[8px]" />
        <Skeleton className="h-[44px] w-[141px] rounded-full" />
      </div>
    </section>
  );
};

const CartItemSkeleton = () => {
  return (
    <li className="border-b border-card-border py-space-20 first:pt-0 last:border-b-0">
      <div className="grid grid-cols-[74px_minmax(0,1fr)] gap-x-space-12 gap-y-space-16 md:grid-cols-[86px_minmax(0,1fr)] md:gap-x-space-16">
        <Skeleton className="row-span-2 aspect-square rounded-[12px]" />
        <div className="min-w-0">
          <Skeleton className="mb-space-8 h-5 w-full max-w-[220px]" />
          <Skeleton className="h-4 w-[128px]" />
        </div>
        <Skeleton className="h-5 w-[76px]" />
        <div className="col-span-2 flex items-center justify-between gap-space-8 md:gap-space-12">
          <Skeleton className="h-[32px] w-[95px] rounded-full md:h-[44px] md:w-[108px]" />
          <Skeleton className="h-[32px] w-[89px] rounded-full" />
        </div>
      </div>
    </li>
  );
};

const CartProductsSkeleton = () => {
  return (
    <section
      className="min-w-0 lg:sticky lg:top-[7rem] lg:pt-space-40"
      aria-label="Loading selected products"
    >
      <ul className="flex flex-col">
        {Array.from({ length: 3 }).map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </ul>
    </section>
  );
};

const CartLoadingState = () => {
  return (
    <div
      className="grid gap-space-80 max-[374px]:gap-space-48 md:gap-[64px] lg:grid-cols-[minmax(0,628px)_minmax(0,1fr)] lg:items-start lg:gap-x-[96px] lg:gap-y-0"
      aria-busy="true"
      aria-label="Loading cart"
    >
      <CartCheckoutFormSkeleton />
      <CartProductsSkeleton />
    </div>
  );
};

export default CartLoadingState;
