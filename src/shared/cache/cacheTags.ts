const createEntityTag = (entity: string, id: string | number) =>
  `${entity}:${encodeURIComponent(String(id))}`;

export const cacheTags = {
  customerReviews: 'customer-reviews',
  medicineStores: 'medicine-stores',
  medicineStore: (storeId: string | number) =>
    createEntityTag('medicine-store', storeId),
  productReviews: 'product-reviews',
  productReviewsByProduct: (productId: string | number) =>
    createEntityTag('product-reviews', productId),
  products: 'products',
  product: (productId: string | number) =>
    createEntityTag('product', productId),
} as const;
