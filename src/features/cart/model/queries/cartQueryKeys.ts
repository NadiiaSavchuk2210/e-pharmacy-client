export const cartQueryKeys = {
  all: ['cart'] as const,
  current: (userId: string | null | undefined) =>
    [...cartQueryKeys.all, 'current', userId ?? 'anonymous'] as const,
  deliveryQuote: (
    address: string,
    cartTotalPrice: number | null | undefined,
  ) =>
    [
      ...cartQueryKeys.all,
      'deliveryQuote',
      address,
      cartTotalPrice ?? 0,
    ] as const,
};
