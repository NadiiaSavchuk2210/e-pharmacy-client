import type { OrdersResponse } from '@/entities/order';
import { apiClient } from '@/shared/api/apiClient';

import {
  getOrdersPageParams,
  normalizeOrdersResponse,
  type ApiOrdersResponse,
} from './ordersApi.helpers';
import { normalizeOrdersError } from './ordersError';

const ORDERS_PATH = '/api/orders';

type GetOrdersOptions = {
  limit?: string | number;
  page?: string | number;
  signal?: AbortSignal;
};

export const getOrders = async ({
  signal,
  ...pageParams
}: GetOrdersOptions = {}): Promise<OrdersResponse> => {
  const params = getOrdersPageParams(pageParams);

  try {
    const { data } = await apiClient.get<ApiOrdersResponse>(ORDERS_PATH, {
      params,
      signal,
    });

    return normalizeOrdersResponse(data, params);
  } catch (error) {
    throw normalizeOrdersError(error);
  }
};
