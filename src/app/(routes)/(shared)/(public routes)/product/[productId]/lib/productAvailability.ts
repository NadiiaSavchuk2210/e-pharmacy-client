const parseProductStock = (stock: string) => {
  const parsedStock = Number.parseInt(stock, 10);

  return Number.isNaN(parsedStock) || parsedStock < 0 ? null : parsedStock;
};

export const getAvailableQuantity = (stock: string) => parseProductStock(stock);

export const getAvailableQuantityLabelFromQuantity = (
  availableQuantity: number | null,
  fallbackStock: string,
) => {
  if (availableQuantity === null) {
    return fallbackStock.trim() || 'Not specified';
  }

  if (availableQuantity === 0) {
    return 'Out of stock';
  }

  return `${availableQuantity} available`;
};

export const getAvailableQuantityLabel = (stock: string) =>
  getAvailableQuantityLabelFromQuantity(getAvailableQuantity(stock), stock);
