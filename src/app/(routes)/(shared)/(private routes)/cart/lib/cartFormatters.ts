export { formatMoney } from '@/shared/lib/formatters';

export const parsePrice = (price: string) => {
  const normalizedPrice = price.replace(',', '.').replace(/[^\d.]/g, '');
  const parsedPrice = Number.parseFloat(normalizedPrice);

  return Number.isNaN(parsedPrice) ? 0 : parsedPrice;
};
