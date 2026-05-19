import { cacheLife, cacheTag } from 'next/cache';

import {
  getProductById as fetchProductById,
  type Product,
} from '@/entities/product';

export const getProductById = async (
  productId: string,
): Promise<Product | null> => {
  'use cache';

  cacheLife('hours');
  cacheTag(`product:${productId}`);

  return fetchProductById(productId);
};

export type { Product };
