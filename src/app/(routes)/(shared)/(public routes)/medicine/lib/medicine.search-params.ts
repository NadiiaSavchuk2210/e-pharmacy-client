import {
  getCurrentPage as getPaginationCurrentPage,
  type PaginationRouteSearchParams,
  type PaginationSearchParamsRecord,
} from '@/shared/lib/pagination';

export type MedicineSearchParamsRecord = PaginationSearchParamsRecord;

export type MedicineSearchParams =
  PaginationRouteSearchParams<MedicineSearchParamsRecord>;

export const getCurrentPage = (
  searchParams: MedicineSearchParamsRecord,
) => getPaginationCurrentPage(searchParams);
