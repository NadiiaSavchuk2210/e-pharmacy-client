import { cacheLife, cacheTag } from 'next/cache';

export type Product = {
  id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
};

const placeholderProducts: Record<string, Product> = {
  '0': {
    id: '0',
    photo: 'https://i.ibb.co/bLKP624/5-15-1000x1000-min.jpg',
    name: 'Aspirin',
    suppliers: 'Square',
    stock: '12',
    price: '89.66',
    category: 'Medicine',
  },
};

export const getProductById = async (productId: string): Promise<Product> => {
  'use cache';

  cacheLife('hours');
  cacheTag(`product:${productId}`);

  return placeholderProducts[productId] ?? {
    ...placeholderProducts['0'],
    id: productId,
  };
};
