import {
  createPageHref,
  getCurrentPage,
  type PaginationRouteSearchParams,
  type PaginationSearchParamsRecord,
} from '@/shared/lib/pagination';

export type MedicineStoreSearchParamsRecord = PaginationSearchParamsRecord;

export type MedicineStoreRouteSearchParams =
  PaginationRouteSearchParams<MedicineStoreSearchParamsRecord>;

export { getCurrentPage };

export const getMedicineStorePageHref = createPageHref('/medicine-store');
