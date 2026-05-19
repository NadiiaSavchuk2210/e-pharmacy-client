export {
  getProductById,
  getProducts,
} from './api/productsApi';
export {
  getDiscountLabel,
  getPriceLabel,
} from './lib/formatProductLabels';

export type {
  ApiProduct,
  ApiProductPage,
  Product,
  ProductPage,
  ProductPageMeta,
  ProductSearchParams,
} from './model/types';
