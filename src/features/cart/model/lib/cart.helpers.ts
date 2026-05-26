import type { Product } from '@/entities/product';

export const getCartProductId = (product: Product) =>
  product.apiId ?? product.id;
