import {
  createPageHref,
  getCurrentPage,
  type PaginationRouteSearchParams,
  type PaginationSearchParamsRecord,
} from '@/shared/lib/pagination';

export type OrdersSearchParamsRecord = PaginationSearchParamsRecord;

export type OrdersRouteSearchParams =
  PaginationRouteSearchParams<OrdersSearchParamsRecord>;

export { getCurrentPage };

export const getOrdersPageHref = createPageHref('/orders');
