'use client';

import { useQuery } from '@tanstack/react-query';

import { orderQueryKeys, type OrdersResponse } from '@/entities/order';
import { THIRTY_SECONDS_MS } from '@/shared/constants/time';

import { getOrders } from '../../api/ordersApi';
import { ORDERS_PER_PAGE } from '../../config';

const ORDERS_QUERY_STALE_TIME_MS = THIRTY_SECONDS_MS;

type UseUserOrdersQueryOptions = {
  page?: number;
  limit?: number;
};

const getEmptyOrdersResponse = (
  page: number,
  limit: number,
): OrdersResponse => ({
  orders: [],
  meta: {
    totalItems: 0,
    currentPage: page,
    perPage: limit,
    totalPages: 1,
  },
});

export const useUserOrdersQuery = (
  userId: string | null | undefined,
  options: UseUserOrdersQueryOptions = {},
) => {
  const { page = 1, limit = ORDERS_PER_PAGE } = options;

  return useQuery({
    queryKey: orderQueryKeys.currentUser(userId, page, limit),
    queryFn: ({ signal }) => getOrders({ limit, page, signal }),
    enabled: Boolean(userId),
    placeholderData: (previousData) =>
      previousData ?? getEmptyOrdersResponse(page, limit),
    staleTime: ORDERS_QUERY_STALE_TIME_MS,
  });
};
