import type { OrdersResponse } from '@/entities/order';
import { apiClient } from '@/shared/api/apiClient';

import { normalizeOrdersError } from './ordersError';

const ORDERS_PATH = '/api/orders';

export const getOrders = async (
  signal?: AbortSignal,
): Promise<OrdersResponse> => {
  try {
    const { data } = await apiClient.get<OrdersResponse>(ORDERS_PATH, {
      signal,
    });

    return {
      orders: Array.isArray(data.orders) ? data.orders : [],
    };
  } catch (error) {
    throw normalizeOrdersError(error);
  }
};
