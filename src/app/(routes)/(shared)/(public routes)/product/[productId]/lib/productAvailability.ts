const parseProductStock = (stock: string) => {
  const parsedStock = Number.parseInt(stock, 10);

  return Number.isNaN(parsedStock) || parsedStock < 0 ? null : parsedStock;
};

export const getAvailableQuantity = (stock: string) => parseProductStock(stock);

export const getAvailableQuantityLabel = (stock: string) => {
  const availableQuantity = getAvailableQuantity(stock);

  if (availableQuantity === null) {
    return stock.trim() || 'Not specified';
  }

  if (availableQuantity === 0) {
    return 'Out of stock';
  }

  return `${availableQuantity} available`;
};
