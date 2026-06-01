import { ApiFetchError, fetchApiData } from '@/shared/api/apiFetch';

import type {
  ApiProductReviewsPage,
  ProductReviewsPage,
  ProductReviewsSearchParams,
} from '../model/types';

export const getProductReviews = async (
  productId: string,
  { limit = 50, page = 1 }: ProductReviewsSearchParams = {},
): Promise<ProductReviewsPage> => {
  try {
    return await fetchApiData<ApiProductReviewsPage>({
      path: `/products/${productId}/reviews`,
      params: { limit, page },
      revalidate: 120,
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
