import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getProducts } from '@/entities/product';
import PageTitle from '@/shared/ui/PageTitle';

import MedicineFiltersForm from './components/MedicineFiltersForm';
import MedicinePageSizeSync from './components/MedicinePageSizeSync';
import Pagination from './components/Pagination';
import ProductList from './components/ProductList';
import {
  getCurrentPage,
  getMedicinePageHref,
  getProductQuery,
  hasActiveProductFilters,
  type MedicineSearchParams,
} from './medicine.query';

type MedicinePageProps = {
  searchParams: MedicineSearchParams;
};

const MedicinePage = async ({ searchParams }: MedicinePageProps) => {
  const resolvedSearchParams = await searchParams;
  const query = getProductQuery(resolvedSearchParams);
  const page = getCurrentPage(resolvedSearchParams);
  const { items: products, meta } = await getProducts({ ...query, page });
  const totalPages = meta.totalPages;
  const currentPage = meta.totalItems > 0 ? meta.currentPage : 1;
  const hasActiveFilters = hasActiveProductFilters(query);

  if (meta.totalItems > 0 && page > totalPages) {
    redirect(getMedicinePageHref(query, totalPages));
  }

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

        <Suspense fallback={null}>
          <MedicinePageSizeSync />
        </Suspense>

        {hasActiveFilters ? (
          <div className="mb-space-24 flex flex-col gap-space-14 md:flex-row md:items-center md:justify-between">
            <p className="text-14 leading-space-18 text-text-muted">
              {query.discount
                ? `Products with ${query.discount}% discount`
                : 'Products found'}
              <span className="text-text-weak">: {meta.totalItems}</span>
            </p>

            <Link
              href={getMedicinePageHref({ limit: query.limit }, 1)}
              className="text-14 font-medium leading-space-18 text-brand-700 transition-colors hover:text-brand-500"
            >
              Clear filters
            </Link>
          </div>
        ) : null}

        {products.length > 0 ? (
          <>
            <ProductList products={products} currentPage={currentPage} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              query={query}
            />
          </>
        ) : (
          <div className="rounded-[27px] border border-border bg-surface-muted p-space-32 text-center">
            <h2 className="mb-space-8 text-20 font-semibold leading-space-28 text-text">
              Nothing was found for your request
            </h2>
            <p className="text-14 leading-space-18 text-text-muted">
              Try another search term or clear the active filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export { metadata } from './metadata';

export default MedicinePage;
