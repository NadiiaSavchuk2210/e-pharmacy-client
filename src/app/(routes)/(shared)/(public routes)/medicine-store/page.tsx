import { redirect } from 'next/navigation';

import {
  getMedicineStoresPage,
  MedicineStoresList,
} from '@/entities/medicine-store';

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

const MedicineStorePage = async ({ searchParams }: MedicineStorePageProps) => {
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
      <h1 className="mb-space-40 font-semibold text-28 leading-space-32 text-text md:mb-space-32">
        Medicine store
      </h1>

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

export { metadata } from './metadata';

export default MedicineStorePage;
