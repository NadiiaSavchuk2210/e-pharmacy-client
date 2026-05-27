'use client';

import { useQuery } from '@tanstack/react-query';

import { orderQueryKeys } from '@/entities/order';
import { THIRTY_SECONDS_MS } from '@/shared/constants/time';

import { getOrders } from '../../api/ordersApi';

const ORDERS_QUERY_STALE_TIME_MS = THIRTY_SECONDS_MS;

export const useUserOrdersQuery = (userId: string | null | undefined) => {
  return useQuery({
    queryKey: orderQueryKeys.currentUser(userId),
    queryFn: ({ signal }) => getOrders(signal),
    enabled: Boolean(userId),
    placeholderData: { orders: [] },
    staleTime: ORDERS_QUERY_STALE_TIME_MS,
  });
};
