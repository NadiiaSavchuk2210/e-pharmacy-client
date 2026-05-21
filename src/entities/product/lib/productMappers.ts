import { getProductImageSrc } from './productImages';

import type { ApiProduct, Product } from '../model/types';

export const normalizeProduct = (product: ApiProduct): Product => {
  const { _id, id, ...productFields } = product;

  return {
    ...productFields,
    id: String(id),
    apiId: _id,
    photo: getProductImageSrc(productFields.photo),
  };
};
