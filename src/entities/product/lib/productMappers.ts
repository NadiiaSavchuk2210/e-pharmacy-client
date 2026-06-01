import { getProductImageSrc } from './productImages';

import type { ApiProduct, Product } from '../model/types';

export const normalizeProduct = (product: ApiProduct): Product => {
  const { _id, id, ...productFields } = product;

  return {
    ...productFields,
    id: String(id ?? _id ?? ''),
    apiId: _id ? String(_id) : undefined,
    photo: getProductImageSrc(productFields.photo),
  };
};
