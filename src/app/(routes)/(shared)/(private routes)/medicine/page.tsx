import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getProducts } from '@/entities/product';

import Pagination from './components/Pagination';
import ProductCard from './components/ProductCard';
import { productCategories } from './medicine.constants';
import {
  getCurrentPage,
  getMedicinePageHref,
  getProductQuery,
  hasActiveProductFilters,
  type MedicineSearchParams,
} from './medicine.query';

type MedicinePageProps = {
  searchParams: MedicineSearchParams;
};

const MedicinePage = async ({ searchParams }: MedicinePageProps) => {
  const resolvedSearchParams = await searchParams;
  const query = getProductQuery(resolvedSearchParams);
  const page = getCurrentPage(resolvedSearchParams);
  const { items: products, meta } = await getProducts({ ...query, page });
  const totalPages = meta.totalPages;
  const currentPage = meta.totalItems > 0 ? meta.currentPage : 1;
  const hasActiveFilters = hasActiveProductFilters(query);

  if (meta.totalItems > 0 && page > totalPages) {
    redirect(getMedicinePageHref(query, totalPages));
  }

  return (
    <section className="container | py-space-40 md:py-space-60 lg:[--container-max:1184px]">
      <div className="mb-space-32 flex flex-col gap-space-14 md:mb-space-40">
        <h1 className="text-28 font-semibold leading-space-32 text-text md:text-40 md:leading-space-48">
          Medicine
        </h1>
        <p className="max-w-[38rem] text-14 leading-space-18 text-text-muted md:text-16 md:leading-space-20">
          Search medicines by name, category, or promo discount.
        </p>
      </div>

      <form
        action="/medicine"
        className="mb-space-32 grid gap-space-14 rounded-[27px] border border-border bg-surface-muted p-space-16 md:grid-cols-[1fr_13rem_auto] md:items-end md:p-space-20"
      >
        <label className="flex flex-col gap-space-8">
          <span className="text-12 font-semibold uppercase leading-space-16 text-text-weak">
            Search
          </span>
          <input
            name="name"
            type="search"
            defaultValue={query.name}
            placeholder="Enter medicine name"
            className="h-[46px] rounded-4xl border border-input-border bg-input-bg px-space-18 text-14 leading-space-18 text-text outline-none transition-colors placeholder:text-text-subtle focus:border-input-border-focus"
          />
        </label>

        <label className="flex flex-col gap-space-8">
          <span className="text-12 font-semibold uppercase leading-space-16 text-text-weak">
            Category
          </span>
          <select
            name="category"
            defaultValue={query.category ?? ''}
            className="h-[46px] rounded-4xl border border-input-border bg-input-bg px-space-18 text-14 leading-space-18 text-text outline-none transition-colors focus:border-input-border-focus"
          >
            <option value="">All categories</option>
            {productCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        {query.discount ? (
          <input type="hidden" name="discount" value={query.discount} />
        ) : null}

        <Button type="submit" variant="primary" size="pill" className="w-full">
          Search
        </Button>
      </form>

      <div className="mb-space-24 flex flex-col gap-space-14 md:flex-row md:items-center md:justify-between">
        <p className="text-14 leading-space-18 text-text-muted">
          {query.discount
            ? `Products with ${query.discount}% discount`
            : 'Products found'}
          <span className="text-text-weak">: {meta.totalItems}</span>
        </p>

        {hasActiveFilters ? (
          <Link
            href="/medicine"
            className="text-14 font-medium leading-space-18 text-brand-700 transition-colors hover:text-brand-500"
          >
            Clear filters
          </Link>
        ) : null}
      </div>

      {products.length > 0 ? (
        <>
          <ul className="grid gap-space-20 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={`${product.apiId ?? product.id}-${currentPage}-${index}`}
                product={product}
              />
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            query={query}
          />
        </>
      ) : (
        <div className="rounded-[27px] border border-border bg-surface-muted p-space-32 text-center">
          <h2 className="mb-space-8 text-20 font-semibold leading-space-28 text-text">
            No medicines found
          </h2>
          <p className="text-14 leading-space-18 text-text-muted">
            Try another search term or clear the active filters.
          </p>
        </div>
      )}
    </section>
  );
};

export { metadata } from './metadata';

export default MedicinePage;
