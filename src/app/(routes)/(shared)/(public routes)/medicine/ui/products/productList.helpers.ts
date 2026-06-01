import type { Product } from '@/entities/product';

const PRODUCT_REVEAL_DELAY_MS = 75;
const MAX_PRODUCT_REVEAL_INDEX = 11;

export const getProductListKey = (product: Product) =>
  product.apiId ?? product.id;

export const getProductRevealDelay = (index: number) =>
  `${Math.min(index, MAX_PRODUCT_REVEAL_INDEX) * PRODUCT_REVEAL_DELAY_MS}ms`;

export const getUniqueProductsById = (products: Product[]) => {
  const seenProductIds = new Set<string>();

  return products.filter((product) => {
    const productId = getProductListKey(product);

    if (seenProductIds.has(productId)) {
      return false;
    }

    seenProductIds.add(productId);
    return true;
  });
};
