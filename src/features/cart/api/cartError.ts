import { AxiosError } from 'axios';

import {
  getApiErrorMessage,
  type ApiErrorResponse,
} from '@/shared/api/apiError';

export class CartApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartApiError';
  }
}

export const normalizeCartError = (
  error: unknown,
  fallbackMessage = 'Unable to update cart',
) => {
  if (error instanceof CartApiError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    return new CartApiError(getApiErrorMessage(data, fallbackMessage));
  }

  return new CartApiError(
    error instanceof Error ? error.message : fallbackMessage,
  );
};

export const getCartErrorMessage = (error: unknown) => {
  return normalizeCartError(error).message;
};
