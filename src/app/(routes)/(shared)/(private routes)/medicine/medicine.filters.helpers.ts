import { productCategories } from './medicine.constants';

import type {
  MedicineFiltersFormProps,
  MedicineFiltersValues,
  ProductCategory,
} from './medicine.filters.types';

export const ALL_CATEGORIES_VALUE = 'all';

export const isProductCategory = (
  category?: string,
): category is ProductCategory => {
  return productCategories.some((item) => item === category);
};

export const getMedicineFiltersInitialValues = ({
  initialCategory,
  initialName = '',
}: Pick<
  MedicineFiltersFormProps,
  'initialCategory' | 'initialName'
>): MedicineFiltersValues => {
  return {
    category: isProductCategory(initialCategory) ? initialCategory : '',
    name: initialName,
  };
};

export const getMedicineFiltersHref = (
  values: MedicineFiltersValues,
  discount?: MedicineFiltersFormProps['discount'],
  limit?: MedicineFiltersFormProps['limit'],
) => {
  const searchParams = new URLSearchParams();
  const name = values.name.trim();

  if (values.category) {
    searchParams.set('category', values.category);
  }

  if (name) {
    searchParams.set('name', name);
  }

  if (discount !== undefined && discount !== '') {
    searchParams.set('discount', String(discount));
  }

  if (limit !== undefined && limit !== '') {
    searchParams.set('limit', String(limit));
  }

  const queryString = searchParams.toString();

  return queryString ? `/medicine?${queryString}` : '/medicine';
};
