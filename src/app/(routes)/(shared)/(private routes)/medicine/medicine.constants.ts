export const DESKTOP_PRODUCTS_PER_PAGE = 12;
export const PRODUCTS_PER_PAGE = 9;

export const allowedProductsPerPage = [
  PRODUCTS_PER_PAGE,
  DESKTOP_PRODUCTS_PER_PAGE,
] as const;

export const productCategories = [
  'Medicine',
  'Heart',
  'Head',
  'Hand',
  'Leg',
  'Dental Care',
  'Skin Care',
] as const;
