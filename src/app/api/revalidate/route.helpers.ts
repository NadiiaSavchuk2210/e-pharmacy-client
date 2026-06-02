import { cacheTags } from '@/shared/cache/cacheTags';

import {
  getProductIdsForOrder,
  getStringValue,
  getUniqueProductIds,
} from './route.payload.helpers';

import type { RevalidatePayload } from './route.types';
import type { NextRequest } from 'next/server';

export const REVALIDATE_SECRET_HEADER = 'x-revalidate-secret';

export const getRevalidateSecret = () => process.env.REVALIDATE_SECRET?.trim();

export const readRevalidatePayload = async (request: NextRequest) => {
  try {
    return (await request.json()) as RevalidatePayload;
  } catch {
    return null;
  }
};

export const getTagsForRevalidatePayload = (payload: RevalidatePayload) => {
  switch (payload.type) {
    case 'product.created':
      return [cacheTags.products];

    case 'order.created': {
      const productId = getStringValue(payload, 'productId');
      const productIds = getProductIdsForOrder(payload);
      const affectedProductIds = getUniqueProductIds(
        productId ? [productId, ...productIds] : productIds,
      );

      return [
        cacheTags.products,
        ...affectedProductIds.map((id) => cacheTags.product(id)),
      ];
    }

    case 'product.deleted':
    case 'product.updated': {
      const productId = getStringValue(payload, 'id');

      return productId
        ? [cacheTags.products, cacheTags.product(productId)]
        : null;
    }

    case 'store.created':
      return [cacheTags.medicineStores];

    case 'store.deleted':
    case 'store.updated': {
      const storeId = getStringValue(payload, 'id');

      return storeId
        ? [cacheTags.medicineStores, cacheTags.medicineStore(storeId)]
        : null;
    }

    case 'customer-review.created':
    case 'customer-review.deleted':
    case 'customer-review.updated':
      return [cacheTags.customerReviews];

    case 'product-review.created':
    case 'product-review.deleted':
    case 'product-review.updated': {
      const productId = getStringValue(payload, 'productId');

      return productId
        ? [
            cacheTags.productReviews,
            cacheTags.productReviewsByProduct(productId),
            cacheTags.product(productId),
          ]
        : null;
    }

    default:
      return null;
  }
};
