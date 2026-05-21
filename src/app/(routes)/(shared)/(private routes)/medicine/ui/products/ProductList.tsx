import type { Product } from '@/entities/product';

import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
  currentPage: number;
};

const ProductList = ({ products, currentPage }: ProductListProps) => (
  <section aria-labelledby="medicine-products-title">
    <h2 id="medicine-products-title" className="visually-hidden">
      Products List
    </h2>

    <ul className="grid grid-cols-[335px] justify-center gap-y-space-20 md:grid-cols-[repeat(3,226px)] md:justify-between md:gap-y-space-32 lg:grid-cols-[repeat(4,280px)] lg:gap-y-space-40">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.apiId ?? product.id}-${currentPage}-${index}`}
          product={product}
          imageEager={index === 0}
        />
      ))}
    </ul>
  </section>
);

export default ProductList;
