import type { RevalidatePayload } from './route.types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const getIdValue = (value: unknown) => {
  if (typeof value === 'string') {
    const trimmedValue = value.trim();

    return trimmedValue || null;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return null;
};

export const getStringValue = (
  payload: RevalidatePayload,
  key: 'id' | 'productId',
) => {
  const value = payload[key];

  return getIdValue(value);
};

const getStringValues = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<string[]>((result, item) => {
    const id = getIdValue(item);

    if (id) {
      result.push(id);
    }

    return result;
  }, []);
};

const getProductIdFromOrderItem = (item: unknown) => {
  if (!isRecord(item)) {
    return null;
  }

  const productId = getIdValue(item.productId);

  if (productId) {
    return productId;
  }

  if (!isRecord(item.product)) {
    return null;
  }

  return getIdValue(item.product.id) ?? getIdValue(item.product._id);
};

const getProductIdsFromOrderItems = (items: unknown) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.reduce<string[]>((result, item) => {
    const productId = getProductIdFromOrderItem(item);

    if (productId) {
      result.push(productId);
    }

    return result;
  }, []);
};

export const getUniqueProductIds = (productIds: string[]) =>
  Array.from(new Set(productIds));

export const getProductIdsForOrder = (payload: RevalidatePayload) => {
  const orderItems = isRecord(payload.order) ? payload.order.items : undefined;

  return getUniqueProductIds([
    ...getStringValues(payload.productIds),
    ...getProductIdsFromOrderItems(payload.items),
    ...getProductIdsFromOrderItems(orderItems),
  ]);
};
