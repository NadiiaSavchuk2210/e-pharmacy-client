import * as Yup from 'yup';

import { productCategories } from './medicine.constants';

export const medicineFiltersSchema = Yup.object({
  category: Yup.string()
    .oneOf(['', ...productCategories], 'Choose a valid product category')
    .default(''),
  name: Yup.string()
    .trim()
    .max(80, 'Search medicine must be 80 characters or less')
    .default(''),
});
