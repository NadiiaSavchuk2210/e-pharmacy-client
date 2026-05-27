export const orderQueryKeys = {
  all: ['orders'] as const,
  currentUser: (userId: string | null | undefined) =>
    [...orderQueryKeys.all, 'currentUser', userId ?? 'anonymous'] as const,
};
