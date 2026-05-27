'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { orderQueryKeys } from '@/entities/order';
import type { Product } from '@/entities/product';

import {
  checkoutCart,
  getCart,
  getDeliveryQuote,
  updateCart,
} from '../../api/cartApi';
import { EMPTY_CART, EMPTY_CART_ITEMS, getCartProductId } from '../lib';
import { CART_QUERY_STALE_TIME_MS, cartQueryKeys } from '../queries';

import type {
  DeliveryQuoteQueryParams,
  UpdateUserCartMutationVariables,
} from './cartHook.types';
import type { Cart, CheckoutCartPayload } from '../types';

const getCartItemQuantity = (cart: Cart, productId: string) => {
  return (
    cart.items.find((item) => getCartProductId(item.product) === productId)
      ?.quantity ?? 0
  );
};

const normalizeCartQuantity = (quantity: number) => {
  return Math.max(0, Math.floor(quantity));
};

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
  cartTotalPrice,
  enabled = true,
}: DeliveryQuoteQueryParams) => {
  const normalizedAddress = address.trim();

  return useQuery({
    queryKey: cartQueryKeys.deliveryQuote(normalizedAddress, cartTotalPrice),
    queryFn: () =>
      getDeliveryQuote({
        address: normalizedAddress,
      }),
    enabled: enabled && normalizedAddress.length > 0,
    staleTime: CART_QUERY_STALE_TIME_MS,
  });
};

export const useCheckoutCartMutation = (userId: string | null | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CheckoutCartPayload) => checkoutCart(payload),
    onSuccess: () => {
      if (userId) {
        queryClient.setQueryData<Cart>(
          cartQueryKeys.current(userId),
          EMPTY_CART,
        );
      }

      return Promise.all([
        queryClient.invalidateQueries({ queryKey: orderQueryKeys.all }),
        queryClient.invalidateQueries({ queryKey: cartQueryKeys.all }),
      ]);
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
    const currentQuantity = getCartItemQuantity(currentCart, productId);
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
      quantity: normalizeCartQuantity(quantity),
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

    for (const item of currentCart?.items ?? []) {
      await updateCart({
        productId: getCartProductId(item.product),
        quantity: 0,
      });
    }

    queryClient.setQueryData<Cart>(cartQueryKeys.current(userId), EMPTY_CART);
    await queryClient.invalidateQueries({
      queryKey: cartQueryKeys.all,
    });
  };
};
