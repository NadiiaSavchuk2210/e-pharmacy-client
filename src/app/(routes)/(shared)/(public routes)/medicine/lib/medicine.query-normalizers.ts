import type { ProductSearchParams } from '@/entities/product';

import {
  DESKTOP_PRODUCTS_PER_PAGE,
  allowedProductsPerPage,
  productCategories,
} from '../config';

export const normalizeDiscount = (discount?: string) => {
  if (!discount) {
    return undefined;
  }

  const normalizedDiscount = discount.trim().replace(/%$/, '');
  const parsedDiscount = Number.parseInt(normalizedDiscount, 10);

  if (
    Number.isNaN(parsedDiscount) ||
    parsedDiscount < 0 ||
    parsedDiscount > 100
  ) {
    return undefined;
  }

  return String(parsedDiscount);
};

export const normalizeLimit = (limit?: string) => {
  const parsedLimit = Number.parseInt(limit ?? '', 10);

  return allowedProductsPerPage.some((item) => item === parsedLimit)
    ? parsedLimit
    : DESKTOP_PRODUCTS_PER_PAGE;
};

export const normalizeCategory = (category?: string) =>
  productCategories.some((item) => item === category) ? category : undefined;

export const hasActiveProductFilters = (query: ProductSearchParams) =>
  Boolean(query.name || query.category || query.discount);
