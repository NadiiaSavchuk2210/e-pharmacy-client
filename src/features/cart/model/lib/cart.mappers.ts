import { normalizeProduct } from '@/entities/product/lib/productMappers';

import type { ApiCart, Cart, CartItem } from '../types';

export const EMPTY_CART: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export const EMPTY_CART_ITEMS: CartItem[] = [];

const normalizeQuantity = (quantity: unknown) => {
  if (typeof quantity !== 'number' || !Number.isFinite(quantity)) {
    return 0;
  }

  return Math.max(0, Math.floor(quantity));
};

export const normalizeApiCart = (cart: ApiCart): Cart => {
  const items = cart.items.reduce<CartItem[]>((result, item) => {
    const quantity = normalizeQuantity(item.quantity);

    if (quantity < 1) {
      return result;
    }

    result.push({
      product: normalizeProduct(item.product),
      quantity,
    });

    return result;
  }, []);

  const totalItems = Number.isFinite(cart.totalItems)
    ? cart.totalItems
    : items.reduce((total, item) => total + item.quantity, 0);

  return {
    items,
    totalItems,
    totalPrice: Number.isFinite(cart.totalPrice) ? cart.totalPrice : 0,
  };
};
