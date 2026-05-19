import type { ProductSearchParams } from '../model/types';

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
