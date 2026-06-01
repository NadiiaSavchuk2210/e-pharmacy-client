import { fetchApiData } from '@/shared/api/apiFetch';

import type {
  ApiProduct,
  ApiProductPage,
  ProductSearchParams,
} from '../model/types';

type ApiProductsResponse = ApiProduct[] | ApiProductPage;

export const fetchApiProductsResponse = (params?: URLSearchParams) =>
  fetchApiData<ApiProductsResponse>({
    path: '/products',
    params,
    revalidate: 120,
    errorMessage: 'Failed to fetch products',
  });

export const createProductSearchParams = ({
  category,
  name,
  discount,
  limit = '9',
  page,
}: ProductSearchParams = {}) => {
  const searchParams = new URLSearchParams({ limit: String(limit) });

  if (category) {
    searchParams.set('category', category);
  }

  if (name) {
    searchParams.set('name', name);
  }

  if (discount !== undefined && discount !== '') {
    searchParams.set('discount', String(discount));
  }

  if (page !== undefined && page !== '') {
    searchParams.set('page', String(page));
  }

  return searchParams;
};
