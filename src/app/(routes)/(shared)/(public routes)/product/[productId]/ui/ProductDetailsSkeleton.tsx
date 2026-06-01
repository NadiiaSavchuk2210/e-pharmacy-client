import ProductOverviewSkeleton from './ProductOverviewSkeleton';
import ProductTabsSkeleton from './ProductTabsSkeleton';
import ProductDescriptionSkeleton from '../description/ui/ProductDescriptionSkeleton';

const ProductDetailsSkeleton = () => {
  return (
    <div className="bg-surface-muted">
      <section className="container | py-space-44 md:pt-space-34 md:pb-space-120 lg:[--container-max:1184px]">
        <div className="flex flex-col items-start justify-start gap-space-8 md:gap-space-16 lg:flex-row lg:gap-space-20">
          <ProductOverviewSkeleton />
          <ProductTabsSkeleton>
            <ProductDescriptionSkeleton />
          </ProductTabsSkeleton>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsSkeleton;
