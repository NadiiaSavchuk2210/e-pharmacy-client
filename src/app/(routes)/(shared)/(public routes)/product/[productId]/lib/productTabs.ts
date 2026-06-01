export const productTabs = [
  {
    value: 'description',
    label: 'Description',
  },
  {
    value: 'reviews',
    label: 'Reviews',
  },
] as const;

type ProductTabValue = (typeof productTabs)[number]['value'];

export const getProductTabHref = (
  productId: string,
  tab: ProductTabValue,
) => `/product/${productId}/${tab}`;

export const isProductTabValue = (value: string): value is ProductTabValue =>
  productTabs.some((tab) => tab.value === value);

export const getActiveProductTab = (
  segment: string | null,
): ProductTabValue => {
  if (segment === 'reviews') {
    return 'reviews';
  }

  return 'description';
};
