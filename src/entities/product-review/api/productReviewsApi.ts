import { ApiFetchError, fetchApiData } from '@/shared/api/apiFetch';
import { cacheTags } from '@/shared/cache/cacheTags';

import type {
  ApiProductReviewsPage,
  ProductReviewsPage,
  ProductReviewsSearchParams,
  ProductReviewsSummary,
} from '../model/types';

const getProductReviewsPath = (productId: string) =>
  `/products/${encodeURIComponent(productId)}/reviews`;

const getEmptyProductReviewsSummary = (): ProductReviewsSummary => ({
  averageRating: 0,
  totalReviews: 0,
  ratingBreakdown: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
});

export const getProductReviews = async (
  productId: string,
  { limit = 50, page = 1 }: ProductReviewsSearchParams = {},
): Promise<ProductReviewsPage> => {
  try {
    return await fetchApiData<ApiProductReviewsPage>({
      path: getProductReviewsPath(productId),
      params: { limit, page },
      revalidate: 120,
      tags: [
        cacheTags.productReviews,
        cacheTags.productReviewsByProduct(productId),
      ],
      errorMessage: 'Failed to fetch product reviews',
    });
  } catch (error) {
    if (error instanceof ApiFetchError && error.status === 404) {
      return {
        items: [],
        meta: {
          totalItems: 0,
          currentPage: page,
          perPage: limit,
          totalPages: 1,
        },
      };
    }

    throw error;
  }
};

export const getProductReviewsSummary = async (
  productId: string,
): Promise<ProductReviewsSummary> => {
  try {
    return await fetchApiData<ProductReviewsSummary>({
      path: `${getProductReviewsPath(productId)}/summary`,
      revalidate: 120,
      tags: [
        cacheTags.productReviews,
        cacheTags.productReviewsByProduct(productId),
      ],
      errorMessage: 'Failed to fetch product reviews summary',
    });
  } catch (error) {
    if (error instanceof ApiFetchError && error.status === 404) {
      return getEmptyProductReviewsSummary();
    }

    throw error;
  }
};
