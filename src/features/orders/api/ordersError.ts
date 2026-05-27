import { AxiosError } from 'axios';

import {
  getApiErrorMessage,
  type ApiErrorResponse,
} from '@/shared/api/apiError';

export class OrdersApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrdersApiError';
  }
}

export const normalizeOrdersError = (
  error: unknown,
  fallbackMessage = 'Unable to load orders',
) => {
  if (error instanceof OrdersApiError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    return new OrdersApiError(getApiErrorMessage(data, fallbackMessage));
  }

  return new OrdersApiError(
    error instanceof Error ? error.message : fallbackMessage,
  );
};

export const getOrdersErrorMessage = (error: unknown) => {
  return normalizeOrdersError(error).message;
};
