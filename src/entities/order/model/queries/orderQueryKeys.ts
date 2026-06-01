export const orderQueryKeys = {
  all: ['orders'] as const,
  currentUser: (
    userId: string | null | undefined,
    page = 1,
    limit = 3,
  ) =>
    [
      ...orderQueryKeys.all,
      'currentUser',
      userId ?? 'anonymous',
      { page, limit },
    ] as const,
};
