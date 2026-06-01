import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getProducts, type ProductSearchParams } from '@/entities/product';

import { getMedicinePageHref } from '../../lib';
import MedicineEmptyState from '../MedicineEmptyState';
import ProductList from './ProductList';
import Pagination from '../pagination/Pagination';

type MedicineProductsProps = {
  hasActiveFilters: boolean;
  page: number;
  query: ProductSearchParams;
};

const MedicineProducts = async ({
  hasActiveFilters,
  page,
  query,
}: MedicineProductsProps) => {
  const { items: products, meta } = await getProducts({ ...query, page });
  const totalPages = meta.totalPages;
  const currentPage = meta.totalItems > 0 ? meta.currentPage : 1;

  if (meta.totalItems > 0 && page > totalPages) {
    redirect(getMedicinePageHref(query, totalPages));
  }

  return (
    <>
      {hasActiveFilters && (
        <div className="mb-space-24 flex flex-col gap-space-14 md:flex-row md:items-center md:justify-between">
          <p className="text-14 leading-space-18 text-text-muted">
            {query.discount
              ? `Products with ${query.discount}% discount`
              : 'Products found'}
            <span className="text-text-muted">: {meta.totalItems}</span>
          </p>

          <Link
            href={getMedicinePageHref({ limit: query.limit }, 1)}
            className="text-14 font-medium leading-space-18 text-brand-700 transition-colors hover:text-brand-500"
          >
            Clear filters
          </Link>
        </div>
      )}

      {products.length > 0 ? (
        <>
          <ProductList products={products} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            query={query}
          />
        </>
      ) : (
        <MedicineEmptyState />
      )}
    </>
  );
};

export default MedicineProducts;
