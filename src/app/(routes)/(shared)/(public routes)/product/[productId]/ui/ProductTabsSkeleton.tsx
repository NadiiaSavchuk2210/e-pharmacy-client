import { Skeleton } from '@/components/ui/skeleton';

import { productTabsContainerClassName } from './productTabs.styles';

import type { ReactNode } from 'react';

type ProductTabsSkeletonProps = {
  children: ReactNode;
};

const ProductTabsSkeleton = ({ children }: ProductTabsSkeletonProps) => {
  return (
    <div
      aria-label="Loading product tabs"
      className={productTabsContainerClassName}
    >
      <div className="mb-space-24 flex h-auto justify-start gap-space-8 md:mb-space-32 lg:mb-space-40">
        <Skeleton className="h-[33px] w-[102px] rounded-full" />
        <Skeleton className="h-[33px] w-[82px] rounded-full" />
      </div>

      {children}
    </div>
  );
};

export default ProductTabsSkeleton;
