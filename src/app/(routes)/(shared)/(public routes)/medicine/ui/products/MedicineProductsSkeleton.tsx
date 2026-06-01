import { Skeleton } from '@/components/ui/skeleton';

import ProductListSkeleton from './ProductListSkeleton';

type MedicineProductsSkeletonProps = {
  count: number;
  showFilterSummary: boolean;
};

const MedicineProductsSkeleton = ({
  count,
  showFilterSummary,
}: MedicineProductsSkeletonProps) => (
  <>
    {showFilterSummary ? (
      <div className="mb-space-24 flex flex-col gap-space-14 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-[18px] w-[156px]" />
        <Skeleton className="h-[18px] w-[78px]" />
      </div>
    ) : null}

    <ProductListSkeleton count={count} />
  </>
);

export default MedicineProductsSkeleton;
