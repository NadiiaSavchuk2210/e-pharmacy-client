'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import type { Product } from '@/entities/product';
import { THIRTY_SECONDS_MS } from '@/shared/constants/time';

import {
  checkoutCart,
  getCart,
  getDeliveryQuote,
  updateCart,
} from '../../api/cartApi';
import {
  EMPTY_CART,
  EMPTY_CART_ITEMS,
  getCartProductId,
} from '../lib';
import { cartQueryKeys } from '../queries';

import type {
  Cart,
  CheckoutCartPayload,
  DeliveryQuotePayload,
  UpdateCartPayload,
} from '../types';

type UpdateUserCartMutationVariables = UpdateCartPayload & {
  userId?: string | null;
};

const CART_QUERY_STALE_TIME_MS = THIRTY_SECONDS_MS;

export const useUserCartQuery = (userId: string | null | undefined) => {
  return useQuery({
    queryKey: cartQueryKeys.current(userId),
    queryFn: ({ signal }) => getCart(signal),
    enabled: Boolean(userId),
    placeholderData: EMPTY_CART,
    staleTime: CART_QUERY_STALE_TIME_MS,
  });
};

export const useUpdateUserCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId: _userId,
      ...payload
    }: UpdateUserCartMutationVariables) => updateCart(payload),
    onSuccess: (cart, variables) => {
      if (variables.userId) {
        queryClient.setQueryData<Cart>(
          cartQueryKeys.current(variables.userId),
          cart,
        );
      }

      return queryClient.invalidateQueries({
        queryKey: cartQueryKeys.all,
      });
    },
  });
};

export const useCartDeliveryQuoteQuery = ({
  address,
  subtotal,
  enabled = true,
}: DeliveryQuotePayload & { enabled?: boolean }) => {
  const normalizedAddress = address.trim();

  return useQuery({
    queryKey: cartQueryKeys.deliveryQuote(normalizedAddress, subtotal),
    queryFn: () =>
      getDeliveryQuote({
        address: normalizedAddress,
        subtotal,
      }),
    enabled: enabled && normalizedAddress.length > 0,
    staleTime: CART_QUERY_STALE_TIME_MS,
  });
};

export const useCheckoutCartMutation = (
  userId: string | null | undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CheckoutCartPayload) => checkoutCart(payload),
    onSuccess: () => {
      if (userId) {
        queryClient.setQueryData<Cart>(cartQueryKeys.current(userId), EMPTY_CART);
      }

      return queryClient.invalidateQueries({
        queryKey: cartQueryKeys.all,
      });
    },
  });
};

export const useUserCartItems = (userId: string | null | undefined) => {
  const cartQuery = useUserCartQuery(userId);

  return cartQuery.data?.items ?? EMPTY_CART_ITEMS;
};

export const useUserCartItemsCount = (userId: string | null | undefined) => {
  const cartQuery = useUserCartQuery(userId);

  return cartQuery.data?.totalItems ?? 0;
};

export const useAddProductToUserCart = () => {
  const queryClient = useQueryClient();
  const updateCartMutation = useUpdateUserCartMutation();

  return async (userId: string, product: Product) => {
    const cartQueryKey = cartQueryKeys.current(userId);
    const currentCart =
      queryClient.getQueryData<Cart>(cartQueryKey) ??
      (await queryClient.fetchQuery({
        queryKey: cartQueryKey,
        queryFn: ({ signal }) => getCart(signal),
        staleTime: CART_QUERY_STALE_TIME_MS,
      })) ??
      EMPTY_CART;
    const productId = getCartProductId(product);
    const currentQuantity =
      currentCart.items.find(
        (item) => getCartProductId(item.product) === productId,
      )?.quantity ?? 0;
    const updatedCart = await updateCartMutation.mutateAsync({
      userId,
      productId,
      quantity: currentQuantity + 1,
    });

    return updatedCart.items;
  };
};

export const useSetUserCartItemQuantity = () => {
  const updateCartMutation = useUpdateUserCartMutation();

  return async (userId: string, productId: string, quantity: number) => {
    const updatedCart = await updateCartMutation.mutateAsync({
      userId,
      productId,
      quantity: Math.max(0, Math.floor(quantity)),
    });

    return updatedCart.items;
  };
};

export const useRemoveProductFromUserCart = () => {
  const updateCartMutation = useUpdateUserCartMutation();

  return async (userId: string, productId: string) => {
    const updatedCart = await updateCartMutation.mutateAsync({
      userId,
      productId,
      quantity: 0,
    });

    return updatedCart.items;
  };
};

export const useClearUserCart = () => {
  const queryClient = useQueryClient();

  return async (userId: string) => {
    const currentCart = queryClient.getQueryData<Cart>(
      cartQueryKeys.current(userId),
    );

    await Promise.all(
      (currentCart?.items ?? []).map((item) =>
        updateCart({
          productId: getCartProductId(item.product),
          quantity: 0,
        }),
      ),
    );

    queryClient.setQueryData<Cart>(cartQueryKeys.current(userId), EMPTY_CART);
    await queryClient.invalidateQueries({
      queryKey: cartQueryKeys.all,
    });
  };
};
