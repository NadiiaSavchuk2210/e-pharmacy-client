'use client';

import type { Product } from '@/entities/product';

const CART_STORAGE_KEY = 'e-pharmacy.cart';

export type CartItem = {
  product: Product;
  quantity: number;
};

type UserCarts = Record<string, CartItem[]>;

const getProductCartId = (product: Product) => product.apiId ?? product.id;

const readUserCarts = (): UserCarts => {
  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);

    return storedValue ? (JSON.parse(storedValue) as UserCarts) : {};
  } catch {
    return {};
  }
};

const writeUserCarts = (carts: UserCarts) => {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carts));
};

export const addProductToUserCart = (userId: string, product: Product) => {
  const carts = readUserCarts();
  const userCart = carts[userId] ?? [];
  const productCartId = getProductCartId(product);
  const existingItemIndex = userCart.findIndex(
    (item) => getProductCartId(item.product) === productCartId,
  );

  let nextCart: CartItem[];

  if (existingItemIndex >= 0) {
    nextCart = userCart.map((item, index) => {
      if (index !== existingItemIndex) {
        return item;
      }

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    });
  } else {
    nextCart = [
      ...userCart,
      {
        product,
        quantity: 1,
      },
    ];
  }

  writeUserCarts({
    ...carts,
    [userId]: nextCart,
  });

  return nextCart;
};
