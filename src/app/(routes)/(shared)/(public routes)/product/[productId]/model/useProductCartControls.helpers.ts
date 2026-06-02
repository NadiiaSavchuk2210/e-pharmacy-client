export const getInitialQuantity = (availableQuantity: number | null) =>
  availableQuantity === 0 ? 0 : 1;

export const getIncreasedQuantity = (
  currentQuantity: number,
  availableQuantity: number | null,
) => {
  if (typeof availableQuantity === 'number') {
    return Math.min(availableQuantity, currentQuantity + 1);
  }

  return currentQuantity + 1;
};

export const getDecreasedQuantity = (currentQuantity: number) =>
  Math.max(1, currentQuantity - 1);

export const getQuantityWithinAvailability = (
  quantity: number,
  availableQuantity: number | null,
) => {
  if (availableQuantity === 0) {
    return 0;
  }

  const normalizedQuantity = Math.max(1, Math.floor(quantity));

  if (typeof availableQuantity === 'number') {
    return Math.min(availableQuantity, normalizedQuantity);
  }

  return normalizedQuantity;
};

export const getAddToCartSuccessMessage = (
  productName: string,
  quantity: number,
) =>
  quantity === 1
    ? `${productName} added to cart`
    : `${quantity} ${productName} added to cart`;
