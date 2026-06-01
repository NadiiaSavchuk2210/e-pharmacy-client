import { Suspense, type ReactNode } from 'react';

import { getProductReviewsSummary } from '@/entities/product-review';

import ProductDescriptionSkeleton from './description/ui/ProductDescriptionSkeleton';
import { getProductById } from './product.data';
import Product from './ui/Product';
import ProductNotFoundState from './ui/ProductNotFoundState';
import ProductOverviewSkeleton from './ui/ProductOverviewSkeleton';
import ProductTabs from './ui/ProductTabs';
import ProductTabsSkeleton from './ui/ProductTabsSkeleton';

type Props = {
  children: ReactNode;
  params: Promise<{ productId: string }>;
};

const ProductLayoutContent = async ({ children, params }: Props) => {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return <ProductNotFoundState />;
  }

  const reviewsSummary = await getProductReviewsSummary(product.id);

  return (
    <div className="flex flex-col gap-space-8 md:gap-space-16 lg:flex-row lg:gap-space-20 items-start justify-start">
      <Product product={product} reviewsSummary={reviewsSummary} />
      <ProductTabs productId={product.id}>{children}</ProductTabs>
    </div>
  );
};

const Layout = (props: Props) => {
  return (
    <div className="bg-surface-muted">
      <section className="container | py-space-44 md:pt-space-34 md:pb-space-120 lg:[--container-max:1184px]">
        <Suspense
          fallback={
            <div className="flex flex-col items-start justify-start gap-space-8 md:gap-space-16 lg:flex-row lg:gap-space-20">
              <ProductOverviewSkeleton />
              <ProductTabsSkeleton>
                <ProductDescriptionSkeleton />
              </ProductTabsSkeleton>
            </div>
          }
        >
          <ProductLayoutContent {...props} />
        </Suspense>
      </section>
    </div>
  );
};

export default Layout;
