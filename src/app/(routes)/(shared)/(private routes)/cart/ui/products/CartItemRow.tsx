import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { PRODUCT_IMAGE_PLACEHOLDER } from '@/entities/product';
import { type CartItem } from '@/features/cart';
import { Icon } from '@/shared/ui/Icon';

import { formatMoney, parsePrice } from '../../lib';

type CartItemRowProps = {
  item: CartItem;
  isDisabled: boolean;
  onQuantityChange: (item: CartItem, quantity: number) => void | Promise<void>;
};

const CartItemRow = ({
  item,
  isDisabled,
  onQuantityChange,
}: CartItemRowProps) => {
  const unitPrice = parsePrice(item.product.price);
  const itemTotal = unitPrice * item.quantity;
  const shouldRemoveOnDecrease = item.quantity <= 1;

  return (
    <li className="grid grid-cols-[120px_minmax(0,1fr)] gap-x-space-12 border-t border-border-muted py-space-20 first:border-t-0 first:pt-0 max-[374px]:grid-cols-[88px_minmax(0,1fr)] max-[374px]:gap-x-space-10 md:grid-cols-[122px_minmax(0,1fr)] md:gap-space-20">
      <div className="size-[120px] overflow-hidden rounded-[27px] border-[1.15px] border-neutral-100 bg-neutral-75 dark:border-card-border dark:bg-surface-muted dark:p-space-10 max-[374px]:size-[88px] max-[374px]:rounded-[20px] md:h-[133px] md:w-[122px]">
        <div className="relative h-full w-full dark:overflow-hidden dark:rounded-[20px] dark:bg-neutral-0">
          <Image
            src={item.product.photo || PRODUCT_IMAGE_PLACEHOLDER}
            alt={item.product.name}
            fill
            sizes="(min-width: 768px) 122px, (max-width: 374px) 88px, 120px"
            className="object-contain dark:p-space-8"
            unoptimized={item.product.photo === PRODUCT_IMAGE_PLACEHOLDER}
          />
        </div>
      </div>

      <div className="grid min-w-0 gap-space-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-space-16 md:gap-y-space-20">
        <div className="min-w-0">
          <h3
            className="mb-space-8 truncate text-16 font-semibold leading-space-22 text-text md:text-18 md:leading-space-25"
            title={item.product.name}
          >
            {item.product.name}
          </h3>
          <p
            className="truncate text-12 leading-space-14 text-text-muted md:text-14 md:leading-space-18"
            title={item.product.suppliers}
          >
            {item.product.suppliers}
          </p>
        </div>

        <p className="mb-[6px] text-12 font-medium leading-space-18 text-text md:mb-0 md:justify-self-end md:text-14 md:leading-space-20">
          {formatMoney(itemTotal)}
        </p>

        <div className="flex items-center justify-between gap-space-8 md:col-span-2 md:gap-space-12 max-[374px]:gap-space-4">
          <div
            className="flex h-[32px] w-[95px] items-center justify-center rounded-full border border-card-border bg-bg max-[374px]:w-[84px] md:h-[44px] md:min-w-[108px]"
            role="group"
            aria-label={`${item.product.name} quantity`}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 rounded-full text-brand-500 hover:bg-transparent hover:text-brand-700 focus-visible:bg-transparent max-[374px]:size-7 md:size-11"
              aria-label={`Increase ${item.product.name} quantity`}
              disabled={isDisabled}
              onClick={() => void onQuantityChange(item, item.quantity + 1)}
            >
              <Icon name="plus" className="size-4 max-[374px]:size-3.5 md:size-5" />
            </Button>

            <span className="flex min-w-[1.5rem] justify-center text-14 font-normal leading-space-20 text-text max-[374px]:min-w-[1.25rem] md:text-16 md:leading-space-20">
              {item.quantity}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 rounded-full text-brand-500 hover:bg-transparent hover:text-brand-700 focus-visible:bg-transparent max-[374px]:size-7 md:size-11"
              aria-label={
                shouldRemoveOnDecrease
                  ? `Remove ${item.product.name} from cart`
                  : `Decrease ${item.product.name} quantity`
              }
              disabled={isDisabled}
              onClick={() =>
                void onQuantityChange(item, Math.max(0, item.quantity - 1))
              }
            >
              <Icon name="minus" className="size-4 max-[374px]:size-3.5 md:size-5" />
            </Button>
          </div>

          <Button
            type="button"
            variant="delete"
            size="delete"
            className="h-[32px] w-[89px] text-14 font-medium max-[374px]:w-[74px] max-[374px]:text-12"
            aria-label={`Remove ${item.product.name} from cart`}
            disabled={isDisabled}
            onClick={() => void onQuantityChange(item, 0)}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
};

export default CartItemRow;
