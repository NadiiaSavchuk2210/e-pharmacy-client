import type {
  DeliveryQuotePayload,
  UpdateCartPayload,
} from '../types';

export type UpdateUserCartMutationVariables = UpdateCartPayload & {
  userId?: string | null;
};

export type DeliveryQuoteQueryParams = DeliveryQuotePayload & {
  cartTotalPrice?: number | null;
  enabled?: boolean;
};
