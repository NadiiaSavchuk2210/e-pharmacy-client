import { apiClient } from '@/shared/api/apiClient';
import {
  type ApiSuccessResponse,
  unwrapApiResponse,
} from '@/shared/api/apiResponse';

import { normalizeCartError } from './cartError';
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

export {
  CartApiError,
  getCartErrorMessage,
  normalizeCartError,
} from './cartError';
