'use client';

import Link from 'next/link';

import {
  getDiscountLabel,
  getPriceLabel,
  type Product,
} from '@/entities/product';
import { ProductCartActions } from '@/shared/ui/ProductCartActions';

import ProductImage from './ProductImage';

type ProductCardProps = {
  product: Product;
  imageEager?: boolean;
  isAddToCartPending?: boolean;
  onAddToCart: (product: Product) => void;
};

const ProductCard = ({
  product,
  imageEager = false,
  isAddToCartPending = false,
  onAddToCart,
}: ProductCardProps) => {
  const discountLabel = getDiscountLabel(product.discount);

  return (
    <li className="group flex min-w-0 w-full flex-col gap-space-8 transition-transform duration-[650ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.01] focus-within:scale-[1.01] sm:w-[335px] md:w-[226px] lg:w-[280px]">
      <article className="contents">
        <Link
          href={`/product/${product.id}`}
          aria-label={`View details for ${product.name}`}
          className="relative block h-[300px] w-full overflow-hidden rounded-[27px] [border:1.15px_solid_rgba(89,_177,_122,_0.6)] bg-[#F7F7F7] transition-shadow duration-base hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:h-[260px] lg:h-[280px]"
        >
          <ProductImage
            src={product.photo}
            alt={product.name}
            eager={imageEager}
          />

          {discountLabel ? (
            <span className="absolute left-space-16 top-space-16 rounded-full bg-danger-500 px-space-12 py-space-4 text-12 font-semibold leading-space-16 text-text-inverse">
              -{discountLabel}
            </span>
          ) : null}
        </Link>

        <div className="flex min-h-[135px] flex-col gap-space-14 rounded-[20px] bg-surface p-space-20">
          <div className="flex items-start justify-between gap-space-16">
            <div className="min-w-0">
              <h3 className="mb-space-4 text-16 font-semibold leading-space-22 text-text md:text-18 md:leading-space-25 overflow-x-auto">
                {product.name}
              </h3>
              <p className="text-12 leading-space-18 text-secondary-text">
                {product.suppliers}
              </p>
            </div>

            <span className="shrink-0 text-16 font-semibold leading-space-22 text-text md:text-18 md:leading-space-25">
              {getPriceLabel(product.price)}
            </span>
          </div>

          <div className="flex items-center justify-between gap-space-16">
            <ProductCartActions
              actionLabel={isAddToCartPending ? 'Adding...' : 'Add to cart'}
              actionAriaLabel={`Add ${product.name} to cart`}
              actionVariant="primary"
              actionSize="pill"
              actionDisabled={isAddToCartPending}
              onAction={() => onAddToCart(product)}
              className="justify-start"
              classNames={{
                actionButton:
                  'min-h-[34px] min-w-[108px] border-0 px-space-16 py-space-10 text-14 font-medium leading-space-14',
              }}
            />

            <Link
              href={`/product/${product.id}`}
              aria-label={`View details for ${product.name}`}
              className="text-12 leading-space-18 text-text underline underline-offset-4 [text-decoration-skip-ink:none] transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              Details
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
};

export default ProductCard;
