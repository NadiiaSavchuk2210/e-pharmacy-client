'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import type { Product } from '@/entities/product';
import { useAuth } from '@/features/auth/model';
import { getCartErrorMessage, useAddProductToUserCart } from '@/features/cart';

import {
  getAddToCartSuccessMessage,
  getDecreasedQuantity,
  getIncreasedQuantity,
  getInitialQuantity,
} from './useProductCartControls.helpers';
import {
  getAvailableQuantity,
  getAvailableQuantityLabel,
} from '../lib/productAvailability';

export const useProductCartControls = (product: Product) => {
  const { user } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const availableQuantity = getAvailableQuantity(product.stock);
  const [quantity, setQuantity] = useState(() =>
    getInitialQuantity(availableQuantity),
  );
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAddToCartPending, setIsAddToCartPending] = useState(false);
  const addProductToUserCart = useAddProductToUserCart();
  const isOutOfStock = availableQuantity === 0;
  const isMaxQuantitySelected =
    typeof availableQuantity === 'number' && quantity >= availableQuantity;

  const redirectPath = useMemo(() => {
    const params = searchParams.toString();

    return params ? `${pathname}?${params}` : pathname;
  }, [pathname, searchParams]);

  const handleIncreaseQuantity = () => {
    setQuantity((currentQuantity) =>
      getIncreasedQuantity(currentQuantity, availableQuantity),
    );
  };

  const handleDecreaseQuantity = () => {
    setQuantity(getDecreasedQuantity);
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
      await addProductToUserCart(user.id, product, quantity);
      toast.success(getAddToCartSuccessMessage(product.name, quantity));
    } catch (error) {
      toast.error(getCartErrorMessage(error));
    } finally {
      setIsAddToCartPending(false);
    }
  };

  return {
    availableQuantityLabel: getAvailableQuantityLabel(product.stock),
    handleAddToCart,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    isAddToCartPending,
    isAuthDialogOpen,
    isMaxQuantitySelected,
    isOutOfStock,
    quantity,
    redirectPath,
    setIsAuthDialogOpen,
  };
};
