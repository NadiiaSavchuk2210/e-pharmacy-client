import type { ProductSearchParams } from '@/entities/product';

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
