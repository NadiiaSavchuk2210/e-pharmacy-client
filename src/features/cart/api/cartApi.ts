import { AxiosError } from 'axios';

import { apiClient } from '@/shared/api/apiClient';
import {
  type ApiSuccessResponse,
  unwrapApiResponse,
} from '@/shared/api/apiResponse';

import { normalizeApiCart } from '../model/lib';

import type {
  ApiCart,
  Cart,
  CheckoutCartPayload,
  CheckoutCartResponse,
  DeliveryQuote,
  DeliveryQuotePayload,
  UpdateCartPayload,
} from '../model/types';

const CART_PATH = '/api/cart';

type ApiErrorResponse = {
  message?: string | string[];
  error?: string;
};

export class CartApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartApiError';
  }
}

const getApiErrorMessage = (
  data: ApiErrorResponse | undefined,
  fallbackMessage: string,
) => {
  if (Array.isArray(data?.message)) {
    return data.message.join('\n');
  }

  return data?.message ?? data?.error ?? fallbackMessage;
};

export const normalizeCartError = (
  error: unknown,
  fallbackMessage = 'Unable to update cart',
) => {
  if (error instanceof CartApiError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    return new CartApiError(
      getApiErrorMessage(data, fallbackMessage),
    );
  }

  return new CartApiError(
    error instanceof Error ? error.message : fallbackMessage,
  );
};

export const getCartErrorMessage = (error: unknown) => {
  return normalizeCartError(error).message;
};

export const getCart = async (signal?: AbortSignal): Promise<Cart> => {
  try {
    const { data } = await apiClient.get<ApiSuccessResponse<ApiCart> | ApiCart>(
      CART_PATH,
      { signal },
    );

    return normalizeApiCart(unwrapApiResponse(data));
  } catch (error) {
    throw normalizeCartError(error, 'Unable to load cart');
  }
};

export const updateCart = async (
  payload: UpdateCartPayload,
): Promise<Cart> => {
  try {
    const { data } = await apiClient.put<ApiSuccessResponse<ApiCart> | ApiCart>(
      `${CART_PATH}/update`,
      payload,
    );

    return normalizeApiCart(unwrapApiResponse(data));
  } catch (error) {
    throw normalizeCartError(error);
  }
};

export const getDeliveryQuote = async (
  payload: DeliveryQuotePayload,
): Promise<DeliveryQuote> => {
  try {
    const { data } = await apiClient.post<
      ApiSuccessResponse<DeliveryQuote> | DeliveryQuote
    >(`${CART_PATH}/delivery-quote`, payload);

    return unwrapApiResponse(data);
  } catch (error) {
    throw normalizeCartError(error, 'Unable to calculate delivery');
  }
};

export const checkoutCart = async (
  payload: CheckoutCartPayload,
): Promise<CheckoutCartResponse> => {
  try {
    const { data } = await apiClient.post<
      ApiSuccessResponse<CheckoutCartResponse> | CheckoutCartResponse
    >(`${CART_PATH}/checkout`, payload);

    return unwrapApiResponse(data);
  } catch (error) {
    throw normalizeCartError(error, 'Unable to place order');
  }
};
