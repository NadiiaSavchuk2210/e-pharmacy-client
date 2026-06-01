import { cacheTags } from '@/shared/cache/cacheTags';

import type { NextRequest } from 'next/server';

export const REVALIDATE_SECRET_HEADER = 'x-revalidate-secret';

type RevalidatePayload = {
  id?: unknown;
  productId?: unknown;
  type?: unknown;
};

const getStringValue = (
  payload: RevalidatePayload,
  key: 'id' | 'productId',
) => {
  const value = payload[key];

  return typeof value === 'string' && value.trim() ? value.trim() : null;
};

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
