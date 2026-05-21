import type { productCategories } from '../config';

export type ProductCategory = (typeof productCategories)[number];

export type MedicineFiltersValues = {
  category: '' | ProductCategory;
  name: string;
};

export type MedicineFiltersFormProps = {
  initialCategory?: string;
  initialName?: string;
  discount?: string | number;
  limit?: string | number;
};
