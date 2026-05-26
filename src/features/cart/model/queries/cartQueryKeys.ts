export const cartQueryKeys = {
  all: ['cart'] as const,
  current: (userId: string | null | undefined) =>
    [...cartQueryKeys.all, 'current', userId ?? 'anonymous'] as const,
  deliveryQuote: (
    address: string,
    subtotal: number | null | undefined,
  ) => [...cartQueryKeys.all, 'deliveryQuote', address, subtotal ?? 0] as const,
};
