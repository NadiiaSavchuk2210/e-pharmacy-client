export {
  getProductById,
  getProducts,
} from './api/productsApi';
export {
  getDiscountLabel,
  getPriceLabel,
} from './lib/formatProductLabels';
export {
  getProductImageSrc,
  PRODUCT_IMAGE_PLACEHOLDER,
} from './lib/productImages';

export type {
  ApiProduct,
  ApiProductPage,
  Product,
  ProductDescriptionSection,
  ProductPage,
  ProductPageMeta,
  ProductSearchParams,
} from './model/types';
