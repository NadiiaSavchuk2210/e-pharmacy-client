import Image from 'next/image';
import Link from 'next/link';

import {
  getDiscountLabel,
  getPriceLabel,
  type Product,
} from '@/entities/product';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const discountLabel = getDiscountLabel(product.discount);

  return (
    <li className="group overflow-hidden rounded-[27px] border border-card-border bg-bg-subtle shadow-sm transition-[background-color,border-color,box-shadow,scale] duration-[650ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-[1.01] hover:border-accent hover:bg-accent-soft hover:shadow-md focus-within:scale-[1.01] focus-within:border-accent focus-within:bg-accent-soft focus-within:shadow-md">
      <Link href={`/product/${product.id}`} className="block h-full">
        <div className="relative aspect-[4/3] bg-surface-muted">
          <Image
            src={product.photo}
            alt={product.name}
            fill
            sizes="(min-width: 1440px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-contain p-space-20 transition-transform duration-[650ms] group-hover:scale-105"
          />

          {discountLabel ? (
            <span className="absolute left-space-16 top-space-16 rounded-full bg-danger-500 px-space-12 py-space-4 text-12 font-semibold leading-space-16 text-text-inverse">
              -{discountLabel}
            </span>
          ) : null}
        </div>

        <div className="flex min-h-[174px] flex-col gap-space-14 p-space-20">
          <div className="flex flex-1 flex-col gap-space-8">
            <p className="text-12 font-semibold uppercase leading-space-16 text-brand-700">
              {product.category}
            </p>
            <h2 className="line-clamp-2 text-18 font-semibold leading-space-22 text-text">
              {product.name}
            </h2>
            <p className="line-clamp-1 text-14 leading-space-18 text-text-subtle">
              {product.suppliers}
            </p>
          </div>

          <div className="flex items-center justify-between gap-space-14">
            <span className="text-20 font-semibold leading-space-28 text-text">
              {getPriceLabel(product.price)}
            </span>
            <span className="rounded-full bg-brand-100 px-space-12 py-space-4 text-12 font-semibold leading-space-16 text-brand-700">
              {product.stock}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ProductCard;
