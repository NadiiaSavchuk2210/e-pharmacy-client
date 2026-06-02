'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import type { Product } from '@/entities/product';
import { useAuth } from '@/features/auth/model';
import {
  getCartErrorMessage,
  getCartProductId,
  useAddProductToUserCart,
  useUserCartItems,
} from '@/features/cart';

import {
  getAddToCartSuccessMessage,
  getDecreasedQuantity,
  getIncreasedQuantity,
  getInitialQuantity,
  getQuantityWithinAvailability,
} from './useProductCartControls.helpers';
import {
  getAvailableQuantity,
  getAvailableQuantityLabelFromQuantity,
} from '../lib/productAvailability';

export const useProductCartControls = (product: Product) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cartItems = useUserCartItems(user?.id);
  const stockQuantity = getAvailableQuantity(product.stock);
  const productId = getCartProductId(product);
  const cartProductQuantity = useMemo(
    () =>
      cartItems.find((item) => getCartProductId(item.product) === productId)
        ?.quantity ?? 0,
    [cartItems, productId],
  );
  const availableQuantity =
    typeof stockQuantity === 'number'
      ? Math.max(0, stockQuantity - cartProductQuantity)
      : stockQuantity;
  const [quantity, setQuantity] = useState(() =>
    getInitialQuantity(availableQuantity),
  );
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAddToCartPending, setIsAddToCartPending] = useState(false);
  const addProductToUserCart = useAddProductToUserCart();
  const selectedQuantity = getQuantityWithinAvailability(
    quantity,
    availableQuantity,
  );
  const isOutOfStock = availableQuantity === 0;
  const isMaxQuantitySelected =
    typeof availableQuantity === 'number' &&
    selectedQuantity >= availableQuantity;

  const redirectPath = useMemo(() => {
    const params = searchParams.toString();

    return params ? `${pathname}?${params}` : pathname;
  }, [pathname, searchParams]);

  const handleIncreaseQuantity = () => {
    setQuantity(getIncreasedQuantity(selectedQuantity, availableQuantity));
  };

  const handleDecreaseQuantity = () => {
    setQuantity(getDecreasedQuantity(selectedQuantity));
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error(`${product.name} is out of stock`);
      return;
    }

    if (!user) {
      setIsAuthDialogOpen(true);
      return;
    }

    setIsAddToCartPending(true);

    try {
      await addProductToUserCart(user.id, product, selectedQuantity);
      toast.success(getAddToCartSuccessMessage(product.name, selectedQuantity));
    } catch (error) {
      toast.error(getCartErrorMessage(error));
    } finally {
      setIsAddToCartPending(false);
    }
  };

  return {
    availableQuantityLabel: getAvailableQuantityLabelFromQuantity(
      availableQuantity,
      product.stock,
    ),
    handleAddToCart,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    isAddToCartPending,
    isAuthDialogOpen,
    isMaxQuantitySelected,
    isOutOfStock,
    quantity: selectedQuantity,
    redirectPath,
    setIsAuthDialogOpen,
  };
};
