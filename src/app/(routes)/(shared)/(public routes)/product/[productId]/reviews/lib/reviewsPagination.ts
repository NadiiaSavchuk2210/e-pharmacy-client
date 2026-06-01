import {
  createPageHref,
  getCurrentPage,
  type PaginationRouteSearchParams,
  type PaginationSearchParamsRecord,
} from '@/shared/lib/pagination';

export const REVIEWS_PER_PAGE = 4;

export type ReviewsSearchParamsRecord = PaginationSearchParamsRecord;

export type ReviewsSearchParams =
  PaginationRouteSearchParams<ReviewsSearchParamsRecord>;

export const getCurrentReviewPage = (
  searchParams: ReviewsSearchParamsRecord,
) => getCurrentPage(searchParams);

export const getProductReviewsPageHref = (
  productId: string,
  page: number,
) => {
  const pathname = `/product/${productId}/reviews`;

  return createPageHref(pathname)(page);
};
