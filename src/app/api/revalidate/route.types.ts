export type RevalidateId = string | number;

export type RevalidateEventType =
  | 'customer-review.created'
  | 'customer-review.deleted'
  | 'customer-review.updated'
  | 'order.created'
  | 'product-review.created'
  | 'product-review.deleted'
  | 'product-review.updated'
  | 'product.created'
  | 'product.deleted'
  | 'product.updated'
  | 'store.created'
  | 'store.deleted'
  | 'store.updated';

export type RevalidateOrderItem = {
  productId?: RevalidateId;
  product?: {
    _id?: RevalidateId;
    id?: RevalidateId;
  };
};

export type RevalidateOrder = {
  items?: RevalidateOrderItem[];
};

export type RevalidatePayload = {
  id?: RevalidateId;
  items?: RevalidateOrderItem[];
  order?: RevalidateOrder;
  productId?: RevalidateId;
  productIds?: RevalidateId[];
  type?: RevalidateEventType;
};
