import type { Product } from '../model/types';

export const getDiscountLabel = (discount: Product['discount']) => {
  if (discount === undefined || discount === null || discount === '') {
    return null;
  }

  const discountText = String(discount).trim();

  if (!discountText || discountText === '0') {
    return null;
  }

  return discountText.endsWith('%') ? discountText : `${discountText}%`;
};

export const getPriceLabel = (price: string) => {
  const trimmedPrice = price.trim();

  return /^[^\d]/.test(trimmedPrice) ? trimmedPrice : `$${trimmedPrice}`;
};
