'use client';

import { type FormikHelpers } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';

import type { AuthUser } from '@/features/auth/model';
import {
  getCartErrorMessage,
  getCartProductId,
  useCheckoutCartMutation,
  useUpdateUserCartMutation,
  type Cart,
  type CartItem,
} from '@/features/cart';

import {
  celebrateOrderSuccess,
  getCartCheckoutInitialValues,
  getCheckoutPayloadFromCartForm,
} from '../lib';

import type { CartCheckoutFormValues } from './cartForm.schema';

type UseCartPageActionsParams = {
  user: AuthUser | null | undefined;
  cart: Cart;
  onCheckoutSuccess?: () => void;
};

export const useCartPageActions = ({
  user,
  cart,
  onCheckoutSuccess,
}: UseCartPageActionsParams) => {
  const [pendingProductId, setPendingProductId] = useState<string | null>(null);
  const updateCartMutation = useUpdateUserCartMutation();
  const checkoutMutation = useCheckoutCartMutation(user?.id);
  const isCartBusy = updateCartMutation.isPending || checkoutMutation.isPending;

  const handleQuantityChange = async (item: CartItem, quantity: number) => {
    if (!user || isCartBusy) return;

    const productId = getCartProductId(item.product);
    const nextQuantity = Math.max(0, Math.floor(quantity));

    setPendingProductId(productId);

    try {
      await updateCartMutation.mutateAsync({
        userId: user.id,
        productId,
        quantity: nextQuantity,
      });
    } catch (error) {
      toast.error(getCartErrorMessage(error));
    } finally {
      setPendingProductId(null);
    }
  };

  const handleCheckoutSubmit = async (
    values: CartCheckoutFormValues,
    { resetForm, setStatus }: FormikHelpers<CartCheckoutFormValues>,
  ) => {
    if (cart.items.length === 0 || checkoutMutation.isPending) return;

    setStatus(undefined);

    try {
      const result = await checkoutMutation.mutateAsync(
        getCheckoutPayloadFromCartForm(values),
      );

      toast.success(`Order ${result.order.id} placed`);
      void celebrateOrderSuccess();
      onCheckoutSuccess?.();
      resetForm({
        values: getCartCheckoutInitialValues(user),
      });
    } catch (error) {
      const message = getCartErrorMessage(error);

      setStatus(message);
      toast.error(message);
    }
  };

  return {
    handleCheckoutSubmit,
    handleQuantityChange,
    isCartBusy,
    isCheckoutPending: checkoutMutation.isPending,
    pendingProductId,
  };
};
