import type { ProductSearchParams } from '@/entities/product';
import { getPaginationSearchParam } from '@/shared/lib/pagination';

import {
  normalizeCategory,
  normalizeDiscount,
  normalizeLimit,
} from './medicine.query-normalizers';

import type { MedicineSearchParamsRecord } from './medicine.search-params';

export const getProductQuery = (
  searchParams: MedicineSearchParamsRecord,
): ProductSearchParams => {
  const category = getPaginationSearchParam(searchParams, 'category')?.trim();
  const name = getPaginationSearchParam(searchParams, 'name')?.trim();
  const discount = normalizeDiscount(
    getPaginationSearchParam(searchParams, 'discount'),
  );
  const limit = normalizeLimit(getPaginationSearchParam(searchParams, 'limit'));

  return {
    category: normalizeCategory(category),
    name: name || undefined,
    discount,
    limit,
  };
};
