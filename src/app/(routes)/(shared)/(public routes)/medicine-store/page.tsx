import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import {
  getMedicineStoresPage,
  MedicineStoresList,
} from '@/entities/medicine-store';
import PageTitle from '@/shared/ui/PageTitle';

import Pagination from './components/Pagination';
import {
  getCurrentPage,
  getMedicineStorePageHref,
  type MedicineStoreRouteSearchParams,
} from './medicine-store.query';

const MEDICINE_STORES_PER_PAGE = 9;

type MedicineStorePageProps = {
  searchParams: MedicineStoreRouteSearchParams;
};

const MedicineStorePageContent = async ({
  searchParams,
}: MedicineStorePageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = getCurrentPage(resolvedSearchParams);
  const { items: stores, meta } = await getMedicineStoresPage({
    limit: MEDICINE_STORES_PER_PAGE,
    page,
  });
  const totalPages = meta.totalPages;
  const currentPage = meta.totalItems > 0 ? meta.currentPage : 1;

  if (meta.totalItems > 0 && page > totalPages) {
    redirect(getMedicineStorePageHref(totalPages));
  }

  return (
    <section className="container | py-[39px] md:py-[52px] lg:py-[68px]">
      <PageTitle>Medicine store</PageTitle>

      {stores.length > 0 ? (
        <>
          <MedicineStoresList
            stores={stores}
            showVisitButton
            className="lg:gap-x-space-20 lg:gap-y-space-40"
          />

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <div className="rounded-[27px] border border-border bg-surface-muted p-space-32 text-center">
          <h2 className="mb-space-8 text-20 font-semibold leading-space-28 text-text">
            No medicine stores found
          </h2>
          <p className="text-14 leading-space-18 text-text-muted">
            Please check back later for available pharmacies.
          </p>
        </div>
      )}
    </section>
  );
};

const MedicineStorePage = (props: MedicineStorePageProps) => {
  return (
    <Suspense
      fallback={
        <section className="container | py-[39px] md:py-[52px] lg:py-[68px]">
          <PageTitle>Medicine store</PageTitle>
          <div className="grid grid-cols-1 gap-space-20 md:grid-cols-3 lg:gap-x-space-20 lg:gap-y-space-40">
            {Array.from({ length: MEDICINE_STORES_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="h-[202px] animate-pulse rounded-[27px] border border-card-border bg-card-bg"
              />
            ))}
          </div>
        </section>
      }
    >
      <MedicineStorePageContent {...props} />
    </Suspense>
  );
};

export { metadata } from './metadata';

export default MedicineStorePage;
