import { cacheLife, cacheTag } from 'next/cache';

import {
  getProductById as fetchProductById,
  type Product,
} from '@/entities/product';
import { cacheTags } from '@/shared/cache/cacheTags';

export const getProductById = async (
  productId: string,
): Promise<Product | null> => {
  'use cache';

  cacheLife('hours');
  cacheTag(cacheTags.products, cacheTags.product(productId));

  return fetchProductById(productId);
};
