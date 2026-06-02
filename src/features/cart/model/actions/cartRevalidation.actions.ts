'use server';

import { updateTag } from 'next/cache';

import type { Order } from '@/entities/order';
import { cacheTags } from '@/shared/cache/cacheTags';

const getOrderProductIds = (order: Order) =>
  Array.from(
    new Set(
      order.items
        .map((item) => item.productId.trim())
        .filter((productId) => productId.length > 0),
    ),
  );

export const revalidateOrderProducts = async (order: Order) => {
  updateTag(cacheTags.products);

  getOrderProductIds(order).forEach((productId) => {
    updateTag(cacheTags.product(productId));
  });
};
