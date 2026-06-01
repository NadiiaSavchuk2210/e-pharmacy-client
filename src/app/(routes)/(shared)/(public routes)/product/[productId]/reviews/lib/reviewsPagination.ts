export const REVIEWS_PER_PAGE = 4;

export type ReviewsSearchParamsRecord = Record<
  string,
  string | string[] | undefined
>;

export type ReviewsSearchParams = Promise<ReviewsSearchParamsRecord>;

export const getCurrentReviewPage = (
  searchParams: ReviewsSearchParamsRecord,
) => {
  const value = searchParams.page;
  const page = Array.isArray(value) ? value[0] : value;
  const parsedPage = Number.parseInt(page ?? '', 10);

  return Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
};

export const getProductReviewsPageHref = (
  productId: string,
  page: number,
) => {
  const pathname = `/product/${productId}/reviews`;

  if (page <= 1) {
    return pathname;
  }

  return `${pathname}?page=${page}`;
};
