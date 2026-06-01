import { Suspense } from 'react';

import PageTitle from '@/shared/ui/PageTitle';

import { PRODUCTS_PER_PAGE } from './config';
import {
  getCurrentPage,
  getProductQuery,
  hasActiveProductFilters,
  type MedicineSearchParams,
} from './lib';
import {
  MedicineFiltersForm,
  MedicineProducts,
  MedicineProductsSkeleton,
} from './ui';

type MedicinePageProps = {
  searchParams: MedicineSearchParams;
};

const MedicinePageContent = async ({ searchParams }: MedicinePageProps) => {
  const resolvedSearchParams = await searchParams;
  const query = getProductQuery(resolvedSearchParams);
  const page = getCurrentPage(resolvedSearchParams);
  const hasActiveFilters = hasActiveProductFilters(query);
  const skeletonProductsCount = Number(query.limit) || PRODUCTS_PER_PAGE;
  const productResultsKey = JSON.stringify({ page, ...query });

  return (
    <div className="bg-surface-muted">
      <section className="container | py-space-40 md:py-space-60 lg:[--container-max:1184px]">
        <PageTitle>Medicine</PageTitle>

        <MedicineFiltersForm
          initialCategory={query.category}
          initialName={query.name}
          discount={query.discount}
          limit={query.limit}
        />

        <Suspense
          key={productResultsKey}
          fallback={
            <MedicineProductsSkeleton
              count={skeletonProductsCount}
              showFilterSummary={hasActiveFilters}
            />
          }
        >
          <MedicineProducts
            hasActiveFilters={hasActiveFilters}
            page={page}
            query={query}
          />
        </Suspense>
      </section>
    </div>
  );
};

const MedicinePage = (props: MedicinePageProps) => {
  return (
    <Suspense
      fallback={
        <div className="bg-surface-muted">
          <section className="container | py-space-40 md:py-space-60 lg:[--container-max:1184px]">
            <PageTitle>Medicine</PageTitle>
            <MedicineProductsSkeleton
              count={PRODUCTS_PER_PAGE}
              showFilterSummary={false}
            />
          </section>
        </div>
      }
    >
      <MedicinePageContent {...props} />
    </Suspense>
  );
};

export { metadata } from './metadata';

export default MedicinePage;
