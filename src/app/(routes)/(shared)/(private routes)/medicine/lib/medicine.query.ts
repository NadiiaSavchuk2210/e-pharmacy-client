import type { ProductSearchParams } from '@/entities/product';

import {
  PRODUCTS_PER_PAGE,
  allowedProductsPerPage,
  productCategories,
} from '../config';

export type MedicineSearchParamsRecord = Record<
  string,
  string | string[] | undefined
>;

export type MedicineSearchParams = Promise<MedicineSearchParamsRecord>;

const getSearchParam = (
  searchParams: MedicineSearchParamsRecord,
  key: string,
) => {
  const value = searchParams[key];

  return Array.isArray(value) ? value[0] : value;
};

export const getCurrentPage = (
  searchParams: MedicineSearchParamsRecord,
) => {
  const page = getSearchParam(searchParams, 'page');
  const parsedPage = Number.parseInt(page ?? '', 10);

  return Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
};

const normalizeDiscount = (discount?: string) => {
  if (!discount) return undefined;

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

const normalizeLimit = (limit?: string) => {
  const parsedLimit = Number.parseInt(limit ?? '', 10);

  return allowedProductsPerPage.some((item) => item === parsedLimit)
    ? parsedLimit
    : PRODUCTS_PER_PAGE;
};

export const getProductQuery = (
  searchParams: MedicineSearchParamsRecord,
): ProductSearchParams => {
  const category = getSearchParam(searchParams, 'category')?.trim();
  const name = getSearchParam(searchParams, 'name')?.trim();
  const discount = normalizeDiscount(getSearchParam(searchParams, 'discount'));
  const limit = normalizeLimit(getSearchParam(searchParams, 'limit'));

  return {
    category: productCategories.some((item) => item === category)
      ? category
      : undefined,
    name: name || undefined,
    discount,
    limit,
  };
};

export const hasActiveProductFilters = (query: ProductSearchParams) =>
  Boolean(query.name || query.category || query.discount);

export const getMedicinePageHref = (
  query: ProductSearchParams,
  page: number,
) => {
  const searchParams = new URLSearchParams();

  if (query.name) {
    searchParams.set('name', query.name);
  }

  if (query.category) {
    searchParams.set('category', query.category);
  }

  if (query.discount !== undefined && query.discount !== '') {
    searchParams.set('discount', String(query.discount));
  }

  if (query.limit !== undefined && query.limit !== '') {
    searchParams.set('limit', String(query.limit));
  }

  if (page > 1) {
    searchParams.set('page', String(page));
  }

  const queryString = searchParams.toString();

  return queryString ? `/medicine?${queryString}` : '/medicine';
};
