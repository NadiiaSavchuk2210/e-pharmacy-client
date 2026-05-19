import { ApiFetchError, fetchApiData } from '@/shared/api/apiFetch';

import { createProductSearchParams } from './productsApi.helpers';
import { normalizeProduct } from '../lib/productMappers';

import type {
  ApiProduct,
  ApiProductPage,
  Product,
  ProductPage,
  ProductSearchParams,
} from '../model/types';

export const getProducts = async ({
  category,
  name,
  discount,
  limit = '9',
  page,
}: ProductSearchParams = {}): Promise<ProductPage> => {
  const searchParams = createProductSearchParams({
    category,
    name,
    discount,
    limit,
    page,
  });

  const products = await fetchApiData<ApiProduct[] | ApiProductPage>({
    path: '/products',
    params: searchParams,
    revalidate: 120,
    errorMessage: 'Failed to fetch products',
  });

  if (Array.isArray(products)) {
    const items = products.map(normalizeProduct);

    return {
      items,
      meta: {
        totalItems: items.length,
        currentPage: 1,
        perPage: items.length,
        totalPages: 1,
      },
    };
  }

  return {
    ...products,
    items: products.items.map(normalizeProduct),
  };
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const product = await fetchApiData<ApiProduct>({
      path: `/products/${id}`,
      errorMessage: 'Failed to fetch product',
    });

    return normalizeProduct(product);
  } catch (error) {
    if (error instanceof ApiFetchError && error.status === 404) {
      return null;
    }

    throw error;
  }
};
