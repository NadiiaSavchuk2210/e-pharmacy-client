'use client';

import Image from 'next/image';

import {
  getPriceLabel,
  getProductImageSrc,
  PRODUCT_IMAGE_PLACEHOLDER,
  type Product as ProductType,
} from '@/entities/product';
import AuthRequiredDialog from '@/features/auth/ui/AuthRequiredDialog';
import { ProductCartActions } from '@/shared/ui/ProductCartActions';

import { useProductCartControls } from '../model/useProductCartControls';

type Props = {
  product: ProductType;
};

const Product = ({ product }: Props) => {
  const {
    availableQuantityLabel,
    handleAddToCart,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    isAddToCartPending,
    isAuthDialogOpen,
    isMaxQuantitySelected,
    isOutOfStock,
    quantity,
    redirectPath,
    setIsAuthDialogOpen,
  } = useProductCartControls(product);
  const imageSrc = getProductImageSrc(product.photo);
  const isPlaceholder = imageSrc === PRODUCT_IMAGE_PLACEHOLDER;

  return (
    <>
      <section
        aria-labelledby="product-overview-title"
        className="flex flex-col w-full gap-space-8 md:flex-row md:gap-space-16 lg:flex-col lg:gap-space-20 lg:w-[364px]"
      >
        <div className="w-full relative aspect-square overflow-hidden rounded-[27px] border-[1.15px] border-brand-border bg-neutral-75 dark:bg-neutral-0 md:w-[364px] md:h-[284px] lg:w-[364px] lg:h-[337px]">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(min-width: 1440px) 380px, (min-width: 768px) 364px, 335px"
            priority
            className="object-contain p-space-32 md:p-space-40"
            unoptimized={isPlaceholder}
          />
        </div>

        <div className="rounded-[20px] bg-surface p-space-20 shadow-sm md:flex-1 md:p-space-32 lg:w-full lg:p-space-20">
          <div className="mb-space-32 flex items-start justify-between gap-space-16 md:flex-col md:gap-space-32 md:mb-[66px] lg:flex-row lg:mb-[40px]">
            <div className="min-w-0">
              <h1
                id="product-overview-title"
                className="mb-space-4 text-16 font-semibold leading-space-22 text-text md:text-20 md:leading-space-28"
              >
                {product.name}
              </h1>
              <p className="text-12 leading-space-18 text-secondary-text">
                Brand: {product.suppliers}
              </p>
              <p
                className={`mt-space-8 text-12 font-medium leading-space-18 ${
                  isOutOfStock ? 'text-danger' : 'text-brand-700'
                }`}
              >
                Available quantity: {availableQuantityLabel}
              </p>
            </div>

            <p className="shrink-0 text-16 font-semibold leading-space-22 text-text md:text-20 md:leading-space-28">
              {getPriceLabel(product.price)}
            </p>
          </div>

          <ProductCartActions
            quantity={quantity}
            quantityAriaLabel={`${product.name} quantity`}
            increaseAriaLabel={`Increase ${product.name} quantity`}
            decreaseAriaLabel={`Decrease ${product.name} quantity`}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            increaseDisabled={isOutOfStock || isMaxQuantitySelected}
            decreaseDisabled={isOutOfStock || quantity <= 1}
            quantityDisabled={isOutOfStock}
            actionLabel={
              isOutOfStock
                ? 'Out of stock'
                : isAddToCartPending
                  ? 'Adding...'
                  : 'Add to cart'
            }
            actionAriaLabel={
              isOutOfStock
                ? `${product.name} is out of stock`
                : `Add ${quantity} ${product.name} to cart`
            }
            onAction={handleAddToCart}
            actionVariant="primary"
            actionSize="pill"
            disabled={isAddToCartPending}
            actionDisabled={isOutOfStock}
            className="flex-wrap gap-space-12"
            classNames={{
              quantityControl:
                'h-[44px] min-w-[108px] md:min-h-[40px] lg:h-[44px]',
              quantityButton: 'size-10 md:size-9 lg:size-11',
              quantityIcon: 'size-5',
              quantityValue: 'text-16 leading-space-20',
              actionButton:
                'min-h-[44px] min-w-[140px] px-0 py-0 text-14 font-medium leading-space-18 md:min-h-[40px] lg:min-h-[44px]',
            }}
          />
        </div>
      </section>

      <AuthRequiredDialog
        open={isAuthDialogOpen}
        onOpenChange={setIsAuthDialogOpen}
        redirectPath={redirectPath}
      />
    </>
  );
};

export default Product;
